# minimal server

`Server` + `Router` を組み合わせた最小構成の HTTP サーバ。

```toml
[dependencies]
fandhe-backend-core = "0.4.0"
fandhe-backend-http = "0.4.0"
fandhe-backend-routes = "0.4.0"
tokio = { version = "1", features = ["rt-multi-thread", "macros"] }
```

```rust
use fandhe_backend_core::Server;
use fandhe_backend_http::response::Response;
use fandhe_backend_routes::Router;

#[tokio::main]
async fn main() -> std::io::Result<()> {
    let router = Router::new()
        .route("GET", "/", |_head, _body| {
            Response::new(200, b"hello fandhe-backend\n".to_vec())
        })
        .route("GET", "/health", |_head, _body| {
            Response::new(200, b"ok\n".to_vec())
        });

    let server = Server::new().handler(router);
    let bound = server.bind("127.0.0.1:3000").await?;
    println!("listening on http://{}", bound.local_addr()?);
    bound.run().await
}
```

```bash
curl -v http://127.0.0.1:3000/            # 200 応答
curl -v http://127.0.0.1:3000/health      # 200 応答
curl -v -X POST http://127.0.0.1:3000/    # 405 応答（/ は GET のみ登録）
curl -v http://127.0.0.1:3000/missing     # 404 応答（未登録パス）
```

## Notes

- `127.0.0.1` 固定でループバックにのみ待ち受ける。外部公開時はバインドアドレスを明示的に変更する必要がある
- `Router` は `impl Handler for Router` により `Server::handler` にそのまま渡せる
- 本番運用では `bound.run()`（シグナル無視）ではなく `bound.run_until(shutdown)` を使う（[graceful-shutdown.md](./graceful-shutdown.md) 参照）
