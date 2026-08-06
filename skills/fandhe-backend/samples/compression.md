# gzip compression

`compression` feature の `CompressionConfig` + `Server::compression` で、条件を満たすレスポンスを gzip 圧縮するレスポンス後処理型プラグインの配線例。

```toml
[dependencies]
fandhe-backend-core = { version = "0.3.0", features = ["compression"] }
fandhe-backend-http = "0.3.0"
fandhe-backend-routes = "0.3.0"
fandhe-backend-plugin-compression = "0.3.0"
tokio = { version = "1", features = ["rt-multi-thread", "macros"] }
```

```rust
use fandhe_backend_core::Server;
use fandhe_backend_http::response::Response;
use fandhe_backend_plugin_compression::CompressionConfig;
use fandhe_backend_routes::Router;

#[tokio::main]
async fn main() -> std::io::Result<()> {
    let router = Router::new().route("GET", "/large", |_head, _body| {
        Response::new(200, "x".repeat(2048).into_bytes()).with_content_type("text/plain")
    });

    let server = Server::new()
        .handler(router)
        .compression(CompressionConfig::builder().build());

    let bound = server.bind("127.0.0.1:3000").await?;
    bound.run().await
}
```

```bash
# 閾値以上の text/plain・Accept-Encoding: gzip → Content-Encoding: gzip
curl -si http://127.0.0.1:3000/large -H 'Accept-Encoding: gzip' | head -20

# Accept-Encoding なし → 無圧縮のまま
curl -si http://127.0.0.1:3000/large
```

## Notes

- `Server::compression` は CORS と同じ「レスポンス後処理型」シームで配線する。複数登録時は CORS → 圧縮の順に適用される
- `CompressionConfig::builder()` は最小圧縮対象サイズ `min_size`（既定 1024 バイト）・圧縮対象 `Content-Type` リスト `compressible_types`（既定 `text/*`・`application/json` 等）を提供する
- 秘密情報を含みやすいレスポンスは BREACH 類似の情報漏洩リスクがあるため、対象 `Content-Type` から除外することを推奨する
- `Server::compression` を未登録のまま `compression` feature を有効化しても完全にフォールスルーする（opt-in）
