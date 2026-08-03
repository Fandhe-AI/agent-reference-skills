# cors

CORS（Cross-Origin Resource Sharing）プラグイン。プリフライト応答の組み立てと実リクエストへのヘッダ付与を提供する（イシュー #305）。

- feature 名: `cors`
- crate 名: `fandhe-backend-plugin-cors`（crates/plugin-cors）
- 配線パターン: レスポンス後処理型（`crate::plugin::finalize_response`、`docs/design/plugin-boundary.md` 5.9 節）。3 拡張点 trait（Middleware/UpgradeHandler/RequestGate）には非該当

## Signature / Usage

プリフライトと実リクエストへのヘッダ付与を 2 層に分けて配線する。

- プリフライト（`OPTIONS` + `Origin` + `Access-Control-Request-Method`）: `fandhe_backend_routes::Router::options_fallback` へ利用者が `fandhe_backend_plugin_cors::preflight_response` を直接配線する
- 実リクエスト: コア側が `cors` feature 有効時のみ `apply_cors_headers` を `finalize_response` シーム経由で全レスポンスに適用する（`Server` への `CorsConfig` の登録方法はコア側 API を参照）

```rust,ignore
router.options_fallback(|head, allow, _body| {
    fandhe_backend_plugin_cors::preflight_response(head, allow, &config)
});
```

```rust,ignore
pub fn is_preflight(head: &RequestHead) -> bool;

pub fn preflight_response(
    head: &RequestHead,
    allow: &AllowedMethods,
    config: &CorsConfig,
) -> Response;

pub fn apply_cors_headers(head: &RequestHead, config: &CorsConfig, response: Response) -> Response;
```

## Options / Props

`CorsConfig`（`CorsConfig::builder()` 経由でのみ構築、`CorsConfigBuilder` のフィールド型に対応）。

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `allow_origin(origin)` | `Vec<String>` | 空（未登録、何も許可しない） | 許可オリジンを 1 件追加（完全一致・バイト一致、複数回呼び出し可） |
| `allow_any_origin()` | `bool` | `false` | `Access-Control-Allow-Origin: *` を有効化する明示 opt-in |
| `allow_methods(methods)` | `Option<Vec<String>>` | `None` | `Access-Control-Allow-Methods` を明示指定（未指定時は呼び出し元の `AllowedMethods` を反映） |
| `allow_headers(headers)` | `Vec<String>` | 空（出力しない） | `Access-Control-Allow-Headers` に列挙するヘッダ名 |
| `allow_credentials(bool)` | `bool` | `false` | `Access-Control-Allow-Credentials: true` を付与するか |
| `max_age(secs)` | `Option<u64>` | `None`（出力しない） | `Access-Control-Max-Age`（秒） |
| `expose_headers(headers)` | `Vec<String>` | 空（出力しない） | `Access-Control-Expose-Headers` に列挙するヘッダ名 |

`build()` は `allow_any_origin()` と `allow_credentials(true)` の併用のみを構築時に拒否する（`CorsConfigError::AnyOriginWithCredentials`）。

## Notes

- これは Rust 製 fandhe-backend の API であり、JS/TS の `hono` や Go の `go-echo` の同名機能（CORS ミドルウェア）とは別物
- フェイルクローズ設計: 許可オリジンは完全一致のみ、不許可 Origin はヘッダを一切付与しない（実リクエスト）か CORS ヘッダなしの `403`（プリフライト）で拒否理由を返さない
- `crates/plugin-cors` 自体は `fandhe-backend-core` に依存しない非循環パターン。コア側が `optional = true` + `dep:` 構文で依存する

## Related

- [compression](./compression.md)
- [static](./static.md)
