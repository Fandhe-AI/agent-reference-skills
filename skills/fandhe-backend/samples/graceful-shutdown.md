# graceful shutdown

`BoundServer::run_until(shutdown)` と `Server::shutdown_grace_period` で、Ctrl-C 受信後に in-flight リクエストの完了を待ってから終了する例。

```toml
[dependencies]
fandhe-backend-core = "0.4.0"
fandhe-backend-http = "0.4.0"
fandhe-backend-routes = "0.4.0"
tokio = { version = "1", features = ["rt-multi-thread", "macros", "signal"] }
```

```rust
use fandhe_backend_core::Server;
use fandhe_backend_http::response::Response;
use fandhe_backend_routes::Router;

#[tokio::main]
async fn main() -> std::io::Result<()> {
    let router = Router::new().route("GET", "/", |_head, _body| {
        Response::new(200, b"ok\n".to_vec())
    });

    let server = Server::new()
        .handler(router)
        .shutdown_grace_period(std::time::Duration::from_secs(10));
    let bound = server.bind("127.0.0.1:3000").await?;

    bound
        .run_until(async {
            tokio::signal::ctrl_c()
                .await
                .expect("Ctrl-C シグナルハンドラの登録に失敗しました");
            println!("シャットダウンシグナルを受信しました");
        })
        .await
}
```

```bash
cargo run
curl -v http://127.0.0.1:3000/    # 200 応答
# Ctrl-C を送ると新規接続の受理を止め、in-flight 完了を待って終了する
```

## Notes

- shutdown Future 完了後は「accept 停止 → in-flight 完了待ち（既定 30 秒、`shutdown_grace_period` で変更可）→ 上限超過時は強制クローズ」の順で処理する
- `shutdown` は `Future<Output = ()>` であれば何でもよい。シグナル源はコアで扱わず利用者が任意の Future として渡す設計（SIGTERM 等は `tokio::signal::unix::signal` で組み立てた Future を渡せばよい）
- `run()` は `run_until(std::future::pending::<()>())` への薄い委譲。ベンチ・使い捨て実行以外は本番運用で `run_until` の利用を推奨する
- shutdown フラグ受信後に到着した WebSocket 等の Upgrade リクエストは委譲せず 503 で拒否する
