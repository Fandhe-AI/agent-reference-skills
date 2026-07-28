# custom Middleware extension point

`Middleware` 拡張点（`on_request` / `on_response`）を自作し、`Server::middleware` で登録する最小例。

```toml
[dependencies]
fandhe-backend-core = "0.1.0"
fandhe-backend-http = "0.1.0"
fandhe-backend-routes = "0.1.0"
tokio = { version = "1", features = ["rt-multi-thread", "macros"] }
```

```rust
use fandhe_backend_core::{Middleware, Server};
use fandhe_backend_http::request::RequestHead;
use fandhe_backend_routes::Router;
use std::sync::atomic::{AtomicUsize, Ordering};
use std::time::Duration;

struct CountingMiddleware {
    requests: AtomicUsize,
}

impl Middleware for CountingMiddleware {
    fn name(&self) -> &'static str {
        "counting-middleware"
    }

    fn on_request(&self, _head: &RequestHead) {
        self.requests.fetch_add(1, Ordering::Relaxed);
    }

    fn on_response(&self, _head: &RequestHead, _elapsed: Duration) {}
}

#[tokio::main]
async fn main() -> std::io::Result<()> {
    let router = Router::new().route("GET", "/", |_head, _body| {
        fandhe_backend_http::response::Response::new(200, b"ok\n".to_vec())
    });

    let server = Server::new()
        .handler(router)
        .middleware(CountingMiddleware { requests: AtomicUsize::new(0) });

    let bound = server.bind("127.0.0.1:3000").await?;
    bound.run().await
}
```

## Notes

- `Middleware` は同期 API。実装内で同期ブロッキング I/O を行ってはならない（コアのリクエストループから直接呼ばれるため、ブロッキングはスループットに直結する）
- I/O が必要な場合は `on_request` / `on_response` を非同期チャネル（`tokio::sync::mpsc` 等）への送信に留め、実際のファイル・ネットワーク I/O は別タスクで行う（プロダクション実装は `fandhe-backend-plugin-tracing` の `TracingMiddleware` を参照）
- `Middleware` は `head` を変更してはならない契約だが、コアは型でこれを強制しない
- 複数登録した場合、登録順に `on_request` / `on_response` が呼ばれる。委譲が成立した接続（WebSocket 等）では `on_response` は呼ばれない
