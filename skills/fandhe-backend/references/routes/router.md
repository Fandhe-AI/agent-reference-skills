# Router

method + `target` の完全一致、および `{name}` パスパラメータでハンドラを解決する最小ルータ。`crates/core::server::Server::handler` にそのまま登録して使う（`impl Handler for Router`）。

## Signature / Usage

```rust
use fandhe_backend_routes::Router;
use fandhe_backend_http::response::Response;

let router = Router::new()
    .route("GET", "/", |_head, _body| Response::new(200, b"ok".to_vec()))
    .route("POST", "/todos", |_head, _body| Response::empty(201));
```

async ハンドラ:

```rust
let router = Router::new().route_async("GET", "/slow", |_head, _body| async {
    Response::new(200, b"ok".to_vec())
});
```

パスパラメータ:

```rust
let router = Router::new()
    .route_param("GET", "/hello/{name}", |_head, params, _body| {
        let name = params.get("name").unwrap_or("world");
        Response::new(200, format!("hello, {name}").into_bytes())
    })
    .unwrap();
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `new()` | `-> Self` | 空のルータを作る |
| `route(method, path, handler)` | `Fn(&RequestHead, &[u8]) -> Response` | 完全一致ルートを登録。同一 `(method, path)` の再登録は最後が有効 |
| `route_async(method, path, handler)` | `Fn(&RequestHead, &[u8]) -> Fut` | 完全一致ルートを async ハンドラで登録 |
| `route_param(method, pattern, handler)` | `Fn(&RequestHead, &PathParams<'_>, &[u8]) -> Response` | `{name}` / `{*name}` を含むパターンルートを登録。`Result<Self, RoutePatternError>` を返す |
| `route_param_async(method, pattern, handler)` | `Fn(&RequestHead, &PathParams<'_>, &[u8]) -> Fut` | パターンルートを async ハンドラで登録 |
| `options_fallback(handler)` | `Fn(&RequestHead, &AllowedMethods, &[u8]) -> Response` | OPTIONS プリフライトの opt-in フォールバック。未登録時は 405 + `Allow` のまま |
| `fallback(handler)` | `Fn(&RequestHead, &[u8]) -> Response` | 未マッチ（404）を委譲する共通フォールバック（`FallbackPolicy::NotFoundOnly` 相当） |
| `fallback_with(policy, handler)` | `FallbackPolicy, Fn(&RequestHead, &[u8]) -> Response` | フォールバックのポリシー明示版。`IncludeMethodNotAllowed` で 405 も委譲可能 |
| `merge(other)` | `Router -> Result<Router, RouterMergeError>` | v0.4.2 で追加（issue #722）。`self` と `other` を 1 つに合成する（`other` はムーブ）。衝突は `RouterMergeError` で検出 |
| `dispatch(head, body)` | `-> HandlerFuture` | method + `target` に一致するハンドラへ委譲する |

`FallbackPolicy`:

| Variant | Description |
|---------|-------------|
| `NotFoundOnly`（既定） | 404 のみ fallback へ委譲。405 は従来どおり `Allow` 付きで返す |
| `IncludeMethodNotAllowed` | 404 に加え 405 も fallback へ委譲（`Allow` は付与されない） |

`RouterMergeError`（`#[non_exhaustive]`、`Debug` / `Clone` / `PartialEq` / `Eq` / `Display` / `Error` 実装）:

| Variant | Description |
|---------|-------------|
| `DuplicateRoute { method, path }` | 静的ルートの `(method, path)` が self と other の両方に登録されている（method の大文字小文字は区別） |
| `DuplicateParamRoute { method, pattern }` | パラメータルートが method 一致かつセグメント形状等価で両方に登録されている。`pattern` は `{name}` / `{*name}` 形式で復元した self 側の表記 |
| `ConflictingFallback` | `fallback` / `fallback_with` が両方に登録されている |
| `ConflictingOptionsFallback` | `options_fallback` が両方に登録されている |

ルータ合成:

```rust
let todos = Router::new().route("GET", "/todos", |_h, _b| Response::new(200, b"todos".to_vec()));
let users = Router::new().route("GET", "/users", |_h, _b| Response::new(200, b"users".to_vec()));
let router = todos.merge(users).unwrap();
```

## Notes

- `merge`（v0.4.2）: 変更前に全件の衝突を検査するフェイルクローズ方式で、最初に見つかった衝突を `Err` で返す（`Err` の場合 self・other とも破棄される）。重複登録を黙って上書きしないことで意図しないハンドラ差し替えを防ぐ。`?` で `.merge(a)?.merge(b)?` と連鎖できる
- `merge` の衝突判定は self と other の間のみ。`/a/{id}` と `/a/{name}` のように名前だけが違うパラメータルートは衝突、`/a/{x}` と `/a/{*rest}` のように種別が異なるものは衝突ではない。衝突しない部分的な重なり（静的 `/a/b` とパラメータ `/a/{x}` 等）・method が異なる同一パスは既存の優先順位（静的 → パラメータ、登録順）で解決される
- `merge` の引き継ぎ: 静的ルートは path ごとに method を合併し 405 の `Allow` にも両方が集約される。パラメータルートは self が先・other が後（`Vec::extend`）。`fallback` / `options_fallback` は片方にのみあればそれ（`FallbackPolicy` 含む）を引き継ぎ、どちらも無ければ `None` のまま
- `fallback` は接頭辞に限定されず合成後のルータ全体に適用される。サブルータに付けた fallback は他のサブルータの未マッチにも効くため、合成後の最上位ルータで登録することを推奨する（接頭辞単位の fallback や `nest` はスコープ外）
- 同一 `Router` 内での再登録の既存意味論（`route` は後勝ち、`route_param` は登録順の先勝ち）は `merge` 追加後も変わらない
- 解決優先順位: 1) 静的ルート（完全一致）、2) パラメータルート（登録順に線形走査、最初の一致）、3) `fallback` 登録済みなら委譲、未登録なら 404/405
- `route`/`route_param` は登録時のみを想定し、実行時にルートを追加・削除する API は持たない
- % デコード・末尾スラッシュ正規化は一切行わない（パーサが渡したバイト列をそのまま比較）
- パス照合は `RequestHead::path()`（`target` 中の最初の `?` より前）に対して行う。クエリ文字列は `RequestHead::query()` でハンドラ側が参照する
- 405 応答には RFC 9110 §15.5.6 に従いソート済み・重複排除済みの `Allow` ヘッダを付与する
- 明示登録された OPTIONS ルートは常に `options_fallback` より優先される
- `dispatch` 自体は同期関数で `HandlerFuture` を返す（ルーティング解決は同期、ハンドラ本体の実行のみ非同期）

## Related

- [Path Patterns](./path-patterns.md)
