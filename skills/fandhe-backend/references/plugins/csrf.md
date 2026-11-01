# csrf

CSRF 検査ゲートプラグイン（REQ-17、イシュー #825）。Cookie 認証の画面（素の `<form method="post">` を受けるハンドラ）を守るため、状態を変える要求の送信元をハンドラ到達前に一律検査する `CsrfGate` を提供する。

- crate 名: `fandhe-backend-plugin-csrf`（v0.5.0 で初公開）
- 拡張点: `RequestGate`（`Server::gate(...)` に登録）
- 依存方向: プラグイン → コアの一方向。コア側に feature や再エクスポートは追加しない（登録しない構成では依存・コード・バイナリ増ゼロ）。外部依存なし、`#![forbid(unsafe_code)]`
- 判定はヘッダの 1 回走査のみで、I/O・ロック・`.await`・ヒープ確保を行わない

## Signature / Usage

```rust
use fandhe_backend_plugin_csrf::CsrfGate;

let gate = CsrfGate::builder()
    .allow_origin("https://app.example.com")
    .exempt_path("/token")
    .build()
    .unwrap();
// `Server::new(...).gate(gate)` のように登録する。
```

```rust
impl CsrfGate {
    pub fn builder() -> CsrfGateBuilder;
}

impl CsrfGateBuilder {
    pub fn allow_origin(self, origin: impl Into<String>) -> Self;
    pub fn exempt_path(self, path: impl Into<String>) -> Self;
    pub fn build(self) -> Result<CsrfGate, CsrfConfigError>;
}

impl RequestGate for CsrfGate {
    fn name(&self) -> &'static str; // "csrf-gate"
    fn check(
        &self,
        head: &RequestHead,
        _ctx: &GateContext,
        _extensions: &mut fandhe_backend_core::extension::RequestExtensions, // v0.6.0 で追加（値は載せない）
    ) -> GateOutcome;
}
```

登録順（CSRF ゲートを先に、認証ゲートをその後に）:

```rust
let csrf = CsrfGate::builder().allow_origin("https://app.example.com").build().unwrap();
let _server = Server::new()
    .gate(csrf) // 1. 送信元の検査（安価・副作用なし）
    .gate(Auth); // 2. 資格情報の検査
```

## Options / Props

`CsrfGateBuilder`（`CsrfGate::builder()` 経由）。

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `allow_origin(origin)` | `impl Into<String>`（複数回呼び出し可） | 空（`Sec-Fetch-Site` のみで判定） | 許可オリジンを 1 件追加（例 `https://app.example.com`、`http://localhost:8080`）。ブラウザがシリアライズする形のみ有効 |
| `exempt_path(path)` | `impl Into<String>`（複数回呼び出し可） | 空 | CSRF 検査を行わないパスを追加。`RequestHead::path()` との完全一致のみ（接頭辞一致ではない。クエリ文字列は無視） |
| `build()` | `Result<CsrfGate, CsrfConfigError>` | — | 件数上限・形式を検証して構築 |

定数:

| Name | Value | Description |
| --- | --- | --- |
| `MAX_ALLOWED_ORIGINS` | `64` | 許可オリジン数の上限 |
| `MAX_EXEMPT_PATHS` | `64` | 除外パス数の上限 |
| `MAX_ENTRY_LEN` | `2048` | 許可オリジン・除外パス 1 件あたりの最大バイト長 |

`CsrfConfigError`（`#[non_exhaustive]`、`Display` は入力値を含めず位置のみ示す）:

| Variant | Description |
| --- | --- |
| `InvalidOrigin { index }` | `index` 番目（登録順 0 起点）の許可オリジンが不正な形式 |
| `InvalidExemptPath { index }` | `index` 番目の除外パスが不正な形式 |
| `TooManyOrigins` | 許可オリジン数が `MAX_ALLOWED_ORIGINS` を超えた |
| `TooManyExemptPaths` | 除外パス数が `MAX_EXEMPT_PATHS` を超えた |

判定規則（上から順に評価）:

| # | 条件 | 結果 |
| --- | --- | --- |
| 1 | メソッドが `GET` / `HEAD` / `OPTIONS`（大文字小文字区別の完全一致） | 許可（`get` や拡張メソッドは検査対象） |
| 2 | パスが除外パスと完全一致 | 許可 |
| 3 | `Sec-Fetch-Site` が 2 件以上 | 拒否 |
| 3 | `Sec-Fetch-Site` が 1 件で `same-origin` / `none`（大文字小文字区別） | 許可（`Origin` は参照しない） |
| 3 | `Sec-Fetch-Site` が 1 件でそれ以外（`same-site`・`cross-site`・空値・未知値） | 拒否 |
| 4 | `Sec-Fetch-Site` なし、`Origin` が 1 件でバイト完全一致で許可リストに含まれる | 許可 |
| 4 | `Sec-Fetch-Site` なし、`Origin: null`・重複・不一致 | 拒否 |
| 5 | どちらのヘッダも無い | 拒否（フェイルクローズ） |

## Notes

- これは Rust 製 fandhe-backend の API であり、JS/TS の `hono`（csrf ミドルウェア）や Go の `go-echo` の同名機能とは別物。トークン（ダブルサブミット等）方式ではなく、`Sec-Fetch-Site` / `Origin` による送信元検査
- 拒否は常に同一の `403`・本文なし（`Content-Length: 0`、`Content-Type` なし）・ヘッダ値を反映しない応答で、理由を返さない
- `Sec-Fetch-*` を優先する理由: forbidden header name のためブラウザ上のスクリプトから偽造できない。ブラウザ以外のクライアントは自由に付けられるが、被害者の Cookie を持たないため CSRF の脅威モデル外。`same-site` を拒否するのはサブドメイン乗っ取りで防御が崩れるのを避けるため
- 除外パスは完全一致のみ。照合キーは `RequestHead::path()`（最初の `?` より前、% デコードも末尾スラッシュ正規化もしない）。`/token?x=1` は除外されるが、`/token/`・`/tokenX`・`/token/extra`・`/tok%65n`・絶対形式の target は除外されず検査を受ける
- 重複ヘッダは曖昧さをフェイルクローズに倒して拒否する
- `Origin` の比較は `plugin-cors` と同じ正規化なしのバイト完全一致。構築時にブラウザのシリアライズ形（小文字 scheme・小文字ホスト・既定ポート省略・パスなし）であることを検証し、決して一致しない設定ミスを構築エラーにする。`null`・`*`・末尾スラッシュ・既定ポート（`https://a.example:443` 等）・大文字ホスト・非正規形 IPv4（`http://127.1` 等）・非正規形 IPv6 リテラルは `InvalidOrigin`。`http://a.example:443` や `https://[::1]:8443`、末尾ドット 1 個の FQDN（`https://app.example.com.`）は有効。除外パスは `/` 始まり・`?` `#` 空白・非 ASCII を含まないこと（違反は `InvalidExemptPath`）
- `allow_origin` を 1 件も登録しない構成も構築できる。その場合は `Sec-Fetch-Site` のみで判定し、`Sec-Fetch-Site` が無い要求は `Origin` が付いていても許可されない
- ゲートはサーバ全体に効き、ルートごとに付け外しできない
- ブラウザ以外のクライアント（OIDC の token endpoint、Bearer で呼ぶ API 等）は `Sec-Fetch-Site` も `Origin` も送らないため 403 になる。該当パスは `exempt_path`（完全一致）で除外する。除外で飛ばされるのは CSRF の検査だけで、後ろの認証ゲートは評価される
- 登録順: Cookie 認証の画面では CSRF ゲートを先に、認証ゲート（`JwtGate`・Cookie セッションを検証する利用者独自のゲート等）を後に登録することを推奨。複数ゲートは AND 結合で、順序で変わるのは「どの拒否応答が返るか」と「後ろのゲートが評価されるか」だけ（順序の誤りで CSRF 防御が抜けることはない）。最初の拒否で短絡し後ろの `check` は呼ばれないため、偽造要求が資格情報を評価するゲートの副作用に届かず、署名検証等のコストも払わせない。`GET` / `HEAD` / `OPTIONS` は本ゲートを素通りするためこの利点は及ばない
- `JwtGate` は `Authorization: Bearer` のみを見て Cookie は見ない。Cookie の画面と Bearer の API を 1 サーバに混在させて `JwtGate` を全体登録すると、Cookie の画面の要求も 401 になる。パス単位の使い分けは現状コアにもゲートにも無い
- Migration (v0.5.0 → v0.6.0): コアの `RequestGate::check` に第 3 引数 `extensions: &mut RequestExtensions` が加わった（BREAKING）。`CsrfGate` はシグネチャの追随のみで、挙動と判定規則は変わらず `extensions` に値も入れない。`check` を直接呼ぶテストは `gate.check(&head, &ctx, &mut RequestExtensions::new())` のように空の器を渡す（`RequestExtensions` は `fandhe_backend_core::extension` から使える）
- 設計の詳細は `docs/design/plugin-boundary.md` 5.6.6 節（https://github.com/fandhe-ai/fandhe-backend/blob/9a75278f68d7fb537867787ee83fc1b550dd2ca8/docs/design/plugin-boundary.md）
- 出典: https://docs.rs/crate/fandhe-backend-plugin-csrf/0.6.1/source/src/lib.rs

## Related

- [jwt](./jwt.md)
- [cors](./cors.md)
