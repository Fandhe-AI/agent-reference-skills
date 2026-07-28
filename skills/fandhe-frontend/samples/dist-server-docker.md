# Single-binary distribution server with route_request

`fandhe-frontend-dist-server` を通常の外部依存として使い、`route_request` を薄い hyper トランスポート層でラップして単一バイナリ配布する。

```rust
use fandhe_frontend_dist_server::assets::{active_mode, AssetMode};
use fandhe_frontend_dist_server::routes::route_request;
use http_body_util::Full;
use hyper::body::Bytes;
use hyper::{Method, Response};

const DEFAULT_BIND_ADDR: &str = "127.0.0.1:3100";

fn response_for(method: &Method, path: &str) -> Response<Full<Bytes>> {
    if method != Method::GET && method != Method::HEAD {
        return Response::builder()
            .status(405)
            .header(hyper::header::ALLOW, "GET, HEAD")
            .body(Full::new(Bytes::from_static(b"405 Method Not Allowed")))
            .unwrap();
    }

    let route_response = route_request(path);
    let mut builder = Response::builder().status(route_response.status);
    if let Some(headers) = builder.headers_mut() {
        headers.insert(
            hyper::header::CONTENT_TYPE,
            hyper::header::HeaderValue::from_static(route_response.content_type),
        );
    }
    builder.body(Full::new(Bytes::from(route_response.body))).unwrap()
}

fn bind_addr() -> String {
    std::env::var("FANDHE_FRONTEND_BIND_ADDR").unwrap_or_else(|_| DEFAULT_BIND_ADDR.to_string())
}

fn log_asset_mode() {
    eprintln!(
        "assets={}",
        match active_mode() {
            AssetMode::Embedded => "embedded",
            AssetMode::DevFilesystem => "dev-filesystem",
        }
    );
}
```

## Notes

- `route_request(path)` は HTTP に依存しない純粋関数（`fandhe-frontend-dist-server::routes`）。トランスポート層（hyper 等）はこの関数の戻り値（`status` / `content_type` / `body` / `cache_control`）から `Response` を組み立てるだけでよい。
- crates.io からの外部依存として利用する場合、`assets::lookup`（開発モード）・`assets::embedded_lookup`（本番モード）は自プロジェクト直下の `static/` を解決しない（debug/release 両方で実測確認済み）。プロジェクト固有の静的アセットは `include_bytes!` で自前配信する必要がある。
- 既定 bind アドレスはループバック（`127.0.0.1`）。外部公開するには `FANDHE_FRONTEND_BIND_ADDR` 環境変数の明示的なオプトインが必要。
