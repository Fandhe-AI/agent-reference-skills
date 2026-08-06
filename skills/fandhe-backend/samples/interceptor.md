# Interceptor extension point

`Interceptor` 拡張点（`intercept` によるリダイレクト返却 + `map_response` によるレスポンス改変）を自作し、`Server::interceptor` で登録する最小例。

```toml
[dependencies]
fandhe-backend-core = "0.3.0"
fandhe-backend-http = "0.3.0"
fandhe-backend-routes = "0.3.0"
tokio = { version = "1", features = ["rt-multi-thread", "macros"] }
```

```rust
use fandhe_backend_core::{Interceptor, Server};
use fandhe_backend_http::request::RequestHead;
use fandhe_backend_http::response::Response;
use fandhe_backend_routes::Router;

/// 末尾 "/" のパスを、それを除いたパスへ 301 リダイレクトする（クエリ文字列は保持）。
struct TrailingSlashRedirect;

impl Interceptor for TrailingSlashRedirect {
    fn name(&self) -> &'static str {
        "trailing-slash-redirect"
    }

    fn intercept(&self, head: &RequestHead, _body: &[u8]) -> Option<Response> {
        let path = head.path();
        if path.len() > 1 && path.ends_with('/') {
            let mut target = path.trim_end_matches('/').to_string();
            if let Some(query) = head.query() {
                target.push('?');
                target.push_str(query);
            }
            Response::redirect(301, target).ok()
        } else {
            None
        }
    }
}

/// すべてのレスポンスにセキュリティヘッダを付与する。
struct SecurityHeaders;

impl Interceptor for SecurityHeaders {
    fn name(&self) -> &'static str {
        "security-headers"
    }

    fn map_response(&self, _head: &RequestHead, response: Response) -> Response {
        response
            .with_header("X-Content-Type-Options", "nosniff")
            .and_then(|r| r.with_header("X-Frame-Options", "DENY"))
            .expect("静的なヘッダ名・値は with_header の検証を必ず通る")
    }
}

#[tokio::main]
async fn main() -> std::io::Result<()> {
    let router = Router::new().route("GET", "/hello", |_head, _body| {
        Response::new(200, b"hello\n".to_vec())
    });

    let server = Server::new()
        .handler(router)
        // intercept は登録順に評価され最初の Some が採用される
        .interceptor(TrailingSlashRedirect)
        // map_response は登録順に逐次適用される
        .interceptor(SecurityHeaders);

    let bound = server.bind("127.0.0.1:3000").await?;
    bound.run().await
}
```

```bash
curl -si http://127.0.0.1:3000/hello    # 200 + X-Content-Type-Options / X-Frame-Options
curl -si http://127.0.0.1:3000/hello/   # 301 + Location: /hello（intercept が Router より先に応答を確定）
```

## Notes

- `intercept` は `RequestGate::check` の後・ルーティングの前に評価される。`Some(response)` を返すと以降の処理を打ち切り、その応答を確定させる。複数登録時は登録順に評価し最初の `Some` を採用する
- `map_response` は `Handler::handle` の後・CORS や圧縮などのレスポンス後処理の前に適用される。複数登録時は登録順に逐次適用され、各 Interceptor が前段の出力を受け取る
- ストリーミング応答（`Handler::handle_streaming`）に対する `map_response` はヘッダのみ反映され、ボディは対象外
- 同期 API（`async fn` を含まない）。実装内で同期ブロッキング I/O を行ってはならない
- `fandhe-backend-core` v0.2.0 で追加された拡張点。リダイレクト返却は `RequestGate`（許可/拒否のみ）では表現できないため、リダイレクト用途には `Interceptor::intercept` を使う（[request-gate-auth.md](./request-gate-auth.md) 参照）
