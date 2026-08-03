# WebSocket message handler

`websocket` feature の `WebSocketConfig::with_handler` によるユーザー定義メッセージハンドラの配線例。

```toml
[dependencies]
fandhe-backend-core = { version = "0.2.0", features = ["websocket"] }
fandhe-backend-http = "0.2.0"
fandhe-backend-routes = "0.2.0"
fandhe-backend-plugin-websocket = "0.2.0"
tokio = { version = "1", features = ["rt-multi-thread", "macros", "signal"] }
futures-util = { version = "0.3", default-features = false, features = ["std"] }
```

```rust
use fandhe_backend_core::Server;
use fandhe_backend_http::response::Response;
use fandhe_backend_plugin_websocket::WebSocketConfig;
use fandhe_backend_plugin_websocket::handler::{
    WsHandlerError, WsMessage, WsMessageHandler, WsOutcome,
};
use fandhe_backend_routes::Router;
use futures_util::future::BoxFuture;

/// Text `"ping"` には `"pong"` を返し、Text `"bye"` にはサーバ起点 Close を
/// 返す。それ以外の Text/Binary はエコーで返す。
struct PingPongEchoHandler;

impl WsMessageHandler for PingPongEchoHandler {
    fn name(&self) -> &'static str {
        "ping-pong-echo"
    }

    fn on_message(&self, msg: WsMessage) -> BoxFuture<'_, Result<WsOutcome, WsHandlerError>> {
        Box::pin(async move {
            let outcome = match msg {
                WsMessage::Text(t) if t == "ping" => {
                    WsOutcome::Reply(vec![WsMessage::Text("pong".to_string())])
                }
                WsMessage::Text(t) if t == "bye" => WsOutcome::Close,
                other => WsOutcome::Reply(vec![other]),
            };
            Ok(outcome)
        })
    }
}

fn build_router() -> Router {
    Router::new().route("GET", "/", |_head, _body| {
        Response::new(200, b"connect to /ws\n".to_vec()).with_content_type("text/plain")
    })
}

#[tokio::main(flavor = "multi_thread")]
async fn main() -> std::io::Result<()> {
    let router = build_router();
    let ws_config = WebSocketConfig::default().with_handler(PingPongEchoHandler);
    let server = Server::new().handler(router).websocket(ws_config);

    let bound = server.bind("127.0.0.1:3000").await?;
    bound.run().await
}
```

```bash
# websocat 使用時。既定パス /ws
websocat ws://127.0.0.1:3000/ws
ping     # -> pong
hello    # -> hello（エコー）
bye      # -> サーバから Close
```

## Notes

- `WsMessageHandler::on_message` は `BoxFuture<'_, Result<WsOutcome, WsHandlerError>>` を返す。戻り値組み立てには `futures-util` の `BoxFuture` が必要
- WebSocket 配線自体は `Router` の責務範囲外。`Server::websocket(config)` で登録する
- `WebSocketConfig` のサイズ・アイドルタイムアウトは既定値（DoS 安全側、1 MiB / 256 KiB / 60 秒）から変更しない限り安全側に倒れる
- HTTP 側のルーティング（`GET /`）と WS 配線は同一 `Server` に共存できる
