# extensions

リクエスト単位の型付き拡張領域 `RequestExtensions`（v0.6.0 で追加、イシュー #924）。`RequestGate` が得た検証結果（例: 検証済み JWT の Claims）を、そのゲートを通過した同じリクエストのハンドラだけへ渡すための器。`RequestHead` が保持するためリクエストと同じ寿命になり、keep-alive の次リクエストや別接続へ値が漏れる経路を構造的に持たない。

> v0.6.0 で追加。同時に `fandhe-backend-core` の `RequestGate::check` に第 3 引数 `extensions: &mut RequestExtensions` が加わった（BREAKING、[`request-gate`](../core/request-gate.md) 側の変更）。`fandhe-backend-http` 側は追加のみで既存の型は壊れない（`RequestHead` の新フィールドは非公開）。

## Signature / Usage

```rust
// fandhe_backend_http::extensions
#[derive(Clone, Default)]
pub struct RequestExtensions { /* entries: Vec<(TypeId, Arc<dyn Any + Send + Sync>)>（非公開） */ }

impl RequestExtensions {
    pub fn new() -> Self;
    pub fn insert<T: Send + Sync + 'static>(&mut self, value: T) -> Result<(), T>;
    pub fn get<T: 'static>(&self) -> Option<&T>;
    pub fn get_shared<T: Send + Sync + 'static>(&self) -> Option<Arc<T>>;
    pub fn contains<T: 'static>(&self) -> bool;
    pub fn len(&self) -> usize;
    pub fn is_empty(&self) -> bool;
}

// fandhe_backend_http::request
impl RequestHead {
    pub fn extensions(&self) -> &RequestExtensions;
    pub fn extensions_mut(&mut self) -> &mut RequestExtensions;
}
```

基本操作（rustdoc の例）:

```rust
use fandhe_backend_http::extensions::RequestExtensions;

struct Principal(String);

let mut ext = RequestExtensions::new();
assert!(ext.insert(Principal("alice".to_string())).is_ok());
assert_eq!(ext.get::<Principal>().map(|p| p.0.as_str()), Some("alice"));

// 同じ型の 2 回目の insert は上書きせず値を返す（fail-closed）。
assert!(ext.insert(Principal("mallory".to_string())).is_err());
assert_eq!(ext.get::<Principal>().map(|p| p.0.as_str()), Some("alice"));
```

`RequestGate` からの受け渡し（コア側のシグネチャと、`CHANGELOG.md` [0.6.0] の移行手順に基づく）:

```rust
// ゲート側: check の第 3 引数に insert する（Err は拒否として扱う）
// fn check(&self, head: &RequestHead, ctx: &GateContext,
//          extensions: &mut RequestExtensions) -> GateOutcome
//
// ハンドラ側: &RequestHead から読む（読み取り専用）
// let principal = head.extensions().get::<Principal>();
```

`RequestHead` 経由の rustdoc 例:

```rust
let ParseOutcome::Complete { mut head, .. } =
    parse_request_head(b"GET / HTTP/1.1\r\n\r\n").unwrap()
else { unreachable!() };
head.extensions_mut().insert(42_u32).unwrap();
assert_eq!(head.extensions().get::<u32>(), Some(&42));
```

## Options / Props

| Name | Type | Description |
| --- | --- | --- |
| `RequestExtensions::new()` | `-> Self` | 空の拡張領域を作る（ヒープ確保なし） |
| `RequestExtensions::insert::<T>(value)` | `T: Send + Sync + 'static` → `Result<(), T>` | 型 `T` の値を登録。同じ型が既にあれば上書きせず `Err(value)` で返す。呼び出し側のゲートは `Err` を拒否として扱うこと（フェイルクローズ） |
| `RequestExtensions::get::<T>()` | `T: 'static` → `Option<&T>` | 型 `T` の値への参照。未登録なら `None` |
| `RequestExtensions::get_shared::<T>()` | `T: Send + Sync + 'static` → `Option<Arc<T>>` | 型 `T` の値を `Arc` で返す。`'static` な future を返す非同期ハンドラへ、値を複製せずに move するために使う |
| `RequestExtensions::contains::<T>()` | `T: 'static` → `bool` | 型 `T` の値が登録済みか |
| `RequestExtensions::len()` | `-> usize` | 登録件数 |
| `RequestExtensions::is_empty()` | `-> bool` | 1 件も登録されていなければ `true` |
| `RequestHead::extensions()` | `-> &RequestExtensions` | 拡張領域への共有参照。パーサー構築直後は常に空 |
| `RequestHead::extensions_mut()` | `-> &mut RequestExtensions` | 拡張領域への可変参照 |

## Notes

- 寿命: 値は 1 リクエストと同じ寿命。同じ接続の次のリクエスト（新しい `RequestHead`）・別接続・ゲート未登録の構成・`Reject` 後（器は drop され、拒否応答と `on_response_with_status` は空の head のまま）には届かない
- 書き込み口: 本番経路では `RequestGate::check` が受け取る `&mut RequestExtensions` のみ。コアは全ゲートが `Allow` を返し器が空でなければ `request.head.extensions_mut()` へ移す。ハンドラ・`Interceptor` 等の後段は `&RequestHead` しか持たないため読み取り専用
- 可視性: `Middleware::on_request`（ゲート前）では空。`RequestGate::check` は進行中の器（先行ゲートの値）を読み書きできる。`UpgradeHandler::matches`・`Interceptor::intercept` / `map_response`・`Handler`・Router のハンドラは値を読める。`Middleware::on_response_with_status` は通過時は値あり、拒否時は空
- 同型二重 `insert` は上書きせず `Err`。後から評価されるゲートが先のゲートの検証結果を差し替えることを防ぐ
- 値は型（`TypeId`）で引く。文字列キーによる衝突・なりすましはなく、クライアントが送るバイト列から値が入る経路もない（パーサーは常に空で構築する）。他ゲートや利用者コードによるなりすましを防ぐには、外部から構築できない newtype（非公開コンストラクタ）を入れる
- `Clone` は `Arc` の参照カウント複製のみで `T: Clone` は不要（`RequestHead: Clone` が WebSocket 委譲経路で使われるため）。`Default` も実装
- `Debug` は件数（`len`）だけを出し、値は出さない（Claims 等の機密を含みうるため）
- `RequestHead` の `PartialEq` は `extensions` を比較対象に含めない（ワイヤ上の値ではないため）
- `remove` / `get_mut` は意図的に提供しない。件数はゲート数程度の少数を前提に線形探索する。外部依存なし・`unsafe` なし
- 再エクスポート: `fandhe_backend_core::extension` と `fandhe-backend-core` の crate ルートから `RequestExtensions` を使える。`RequestGate::check` の第 3 引数としてコア側で使用する
- WebSocket: ハンドシェイクのフックは `WsHandshakeContext::head().extensions()` から読める。`WsOpenContext::extensions()` / `WsConnContext::extensions()` は `fandhe-backend-plugin-websocket` の追加 API（CHANGELOG 記載）で読み取り専用。ゲートが拒否した upgrade では `on_open` も 101 応答も発生しない
- 注意: WebSocket では値がセッション継続中ずっと保持され、JWT の `exp` はハンドシェイク時点でのみ検証される（設計書 `gate-request-extensions.md` §14.7「既知の限界」）
- 出典（`RequestExtensions` 本体・rustdoc 例）: https://docs.rs/crate/fandhe-backend-http/0.6.1/source/src/extensions.rs
- 出典（`RequestHead::extensions` / `extensions_mut`）: https://docs.rs/crate/fandhe-backend-http/0.6.1/source/src/request.rs
- 出典（core からの再エクスポート、`RequestGate::check` の第 3 引数）: https://docs.rs/crate/fandhe-backend-core/0.6.1/source/src/extension.rs
- 出典（設計書）: https://github.com/fandhe-ai/fandhe-backend/blob/9a75278f68d7fb537867787ee83fc1b550dd2ca8/docs/design/gate-request-extensions.md
- 出典（CHANGELOG）: https://github.com/fandhe-ai/fandhe-backend/blob/9a75278f68d7fb537867787ee83fc1b550dd2ca8/CHANGELOG.md

## Related

- [request](./request.md)
- [request-gate](../core/request-gate.md)
