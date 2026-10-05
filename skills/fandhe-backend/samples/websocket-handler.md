# WebSocket message handler

`websocket` feature の `WebSocketConfig` による配線例。`with_handler` のメッセージハンドラに加え、`with_path_pattern`（`{name}` パスパラメータ）・`with_handshake_check`（Origin 検査）・`with_ping_interval`（Ping keepalive）・`WsMessageHandler::on_open` / `on_close`・`WsSender`（サーバー起点 push）を組み合わせる。

```toml
[dependencies]
fandhe-backend-core = { version = "0.4.2", features = ["websocket"] }
fandhe-backend-http = "0.4.2"
fandhe-backend-routes = "0.4.2"
fandhe-backend-plugin-websocket = "0.4.2"
tokio = { version = "1", features = ["rt-multi-thread", "macros", "signal", "time", "sync"] }
```

```rust
use std::time::Duration;

use tokio::sync::mpsc;
use tokio::time::Instant;

use fandhe_backend_core::Server;
use fandhe_backend_http::response::Response;
use fandhe_backend_plugin_websocket::handler::{
    CloseReason, WsConnContext, WsHandlerError, WsMessage, WsMessageHandler, WsOpenContext,
    WsOutcome,
};
use fandhe_backend_plugin_websocket::{BoxFuture, WebSocketConfig, WsHandshakeContext};
use fandhe_backend_routes::Router;

/// Text `"ping"` には `"pong"`、`"bye"` にはサーバ起点 Close、それ以外はエコー。
/// 加えて接続の 5 秒後から 5 秒ごとにサーバー起点で tick を push する。
/// 切断ログは有界チャネル経由で別タスクが出力する。
struct RoomHandler {
    log: mpsc::Sender<String>,
}

impl WsMessageHandler for RoomHandler {
    fn name(&self) -> &'static str {
        "room"
    }

    // 101 応答送出後に一度だけ呼ばれる同期フック。await が要る処理は spawn で切り離す。
    fn on_open(&self, ctx: WsOpenContext) {
        let room = ctx.param("room").unwrap_or("unknown").to_string();
        let sender = ctx.sender().clone();
        tokio::spawn(async move {
            // interval の最初の tick は即時完了するため、interval_at で初回も 5 秒後にする
            let period = Duration::from_secs(5);
            let mut tick = tokio::time::interval_at(Instant::now() + period, period);
            let mut n = 0u64;
            loop {
                tokio::select! {
                    _ = sender.closed() => break,
                    _ = tick.tick() => {}
                }
                n += 1;
                if sender
                    .send(WsMessage::Text(format!("{room}: tick {n}")))
                    .await
                    .is_err()
                {
                    break;
                }
            }
        });
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

    // on_open を呼んだ接続についてのみ、終了時にちょうど 1 回呼ばれる同期フック。
    fn on_close(&self, ctx: &WsConnContext, reason: CloseReason) {
        // 同期フックはブロックしない: stderr へは直接書かず、満杯なら捨てて try_send で即返す
        let _ = self.log.try_send(format!("ws conn {} closed: {reason:?}", ctx.conn_id()));
    }
}

fn build_router() -> Router {
    Router::new().route("GET", "/", |_head, _body| {
        Response::new(200, b"connect to /ws/{room}\n".to_vec()).with_content_type("text/plain")
    })
}

#[tokio::main(flavor = "multi_thread")]
async fn main() -> std::io::Result<()> {
    // 出力は別タスクで行う（on_close は try_send するだけ）
    let (log_tx, mut log_rx) = mpsc::channel::<String>(64);
    tokio::spawn(async move {
        while let Some(line) = log_rx.recv().await {
            eprintln!("{line}");
        }
    });

    let ws_config = WebSocketConfig::default()
        // 既定パス /ws の代わりに {name} 付きパターンを登録する
        .with_path_pattern("/ws/{room}")
        .expect("パターンは先頭スラッシュ・パラメータ名とも妥当")
        // 30 秒ごとに Ping、送出から 10 秒以内に Pong が無ければ切断
        .with_ping_interval(Duration::from_secs(30), Duration::from_secs(10))
        .expect("interval / pong_timeout は 0 でない")
        // 101 応答の直前に一度だけ同期評価。Err の Response をそのまま返して upgrade しない
        .with_handshake_check(|ctx: &WsHandshakeContext<'_>| {
            match (ctx.header("origin"), ctx.param("room")) {
                (Some("http://localhost:5173"), Some(room))
                    if room.chars().all(|c| c.is_ascii_alphanumeric()) =>
                {
                    Ok(())
                }
                _ => Err(Response::empty(403)),
            }
        })
        .with_handler(RoomHandler { log: log_tx });

    let server = Server::new().handler(build_router()).websocket(ws_config);
    let bound = server.bind("127.0.0.1:3000").await?;
    bound
        .run_until(async {
            tokio::signal::ctrl_c().await.expect("Ctrl-C ハンドラ登録に失敗した");
        })
        .await
}
```

```bash
# websocat 使用時。パスは /ws/{room}、Origin ヘッダが handshake check の許可値と一致する必要がある
websocat --origin http://localhost:5173 ws://127.0.0.1:3000/ws/lobby
ping     # -> pong
hello    # -> hello（エコー）
bye      # -> サーバから Close
         # 接続の 5 秒後から 5 秒ごとに "lobby: tick N" が push される
```

## Notes

- `WsMessageHandler::on_message` は `BoxFuture<'_, Result<WsOutcome, WsHandlerError>>` を返す。`BoxFuture` は 0.4.2 でクレートルート（`fandhe_backend_plugin_websocket::BoxFuture`）に公開され、`futures-util` への直接依存が不要になった（`futures_util::future::BoxFuture` は同一型のため従来記述もそのまま動く）
- `WsSender`（0.4.1 追加）は `on_open` の `WsOpenContext::sender()` を `.clone()` して `tokio::spawn` へ move し、クライアントのメッセージを待たず任意タイミングで push する。送信キュー容量は既定 8（`with_outbound_capacity` で変更可）、満杯時の `send` は `.await` で待機し、待たずに判定したい場合は `try_send`。セッション終了後の `send` は `WsSendError` を返すため、spawn したタスクはそこで自発的に終了する。`sender.closed().await` / `is_closed()` による検知は `on_open` から spawn したタスク内でのみ使い、`on_message` 内でのインライン `await` は自己デッドロックする
- サーバー起点 Close は `on_message` の `WsOutcome::Close` に加え、`WsSender::close(code, reason).await`（`on_open` 由来のタスク等から可）でも開始できる。code は `1000..=1003` / `1007..=1009` / `1011..=1014` / `3000..=4999` のみ、reason は 123 バイト以内。違反は `WsCloseError`
- `on_close(&self, ctx: &WsConnContext, reason: CloseReason)` は `on_open` が呼ばれた接続でのみ終了時に 1 回呼ばれる同期フック。`CloseReason` は `#[non_exhaustive]` のため `match` にはワイルドカード腕が必要。ハンドシェイク失敗・101 送出前キャンセルでは `on_open` / `on_close` とも呼ばれない
- `with_ping_interval(interval, pong_timeout)` は `Result<Self, PingIntervalError>` を返し、どちらかが `Duration::ZERO` だと構築時に拒否される（既定は無効）。`idle_timeout` はクライアントからの受信でのみリセットされるため、push を受けるだけのクライアントの死活監視には本設定が必要。Pong タイムアウト切断は `CloseReason::PongTimeout`
- `with_handshake_check` は RFC 6455 検証通過後・101 送出前に一度だけ同期で評価される。`WsHandshakeContext::header` は同名ヘッダが重複していると `None` を返す（拒否側に倒れる）。拒否時の戻り値は 3xx（304 除く）/4xx/5xx の `Response`、それ以外のステータスは 400 に置換される。拒否しても `handle_upgrade` の戻り値は `Ok(())`。`peer_addr()` は非ソケット経路では `None`
- `with_path_pattern` は `Result<Self, PathPatternError>` を返し、既定の `/ws` を置き換える。`{name}` の値は % デコードされない生文字列で、`WsHandshakeContext::param` / `WsOpenContext::param` / `WsConnContext::param` から読める。メッセージごとの接続情報が要る場合は `on_message_with_ctx` を override する（`ctx.conn_id()` / `ctx.sender()` / `ctx.param()` / `ctx.peer_addr()` / `ctx.origin()` など）
- WebSocket 配線自体は `Router` の責務範囲外。`Server::websocket(config)` で登録し、HTTP 側のルーティング（`GET /`）と同一 `Server` に共存できる。`WebSocketConfig` のサイズ・アイドルタイムアウトは既定値（1 MiB / 256 KiB / 60 秒）から変更しない限り安全側に倒れる。上限超過は close code 1009 を送出して閉じる（0.4.2 修正）
- v0.3.0 (issue #499): `on_message` が返す `Future` は shutdown・rebind の drain 処理中、任意の await 点で drop されうる契約。完了保証が必要な副作用（DB 書き込み等）はこの Future の await に依存せず `tokio::spawn` で切り離す。キャンセルされた場合、意図した `WsOutcome::Reply` は送出されない
- `WebSocketConfig::with_close_grace(Duration)`（既定 10 秒）でクローズハンドシェイクの猶予期間を調整できる。`Duration::ZERO` や既定より大幅に長い値もクランプされずそのまま適用される
- `on_close` は同期フックのため `eprintln!` 等のブロックし得る処理を置かず、有界 `mpsc::Sender::try_send`（満杯時は破棄）で別タスクへ渡す。`tokio::time::interval` の最初の tick は即時完了するため、初回も遅らせたい場合は `interval_at(Instant::now() + period, period)` を使う
- 公式 `examples/with-websocket` は `PingPongEchoHandler` のみの最小構成（`with_handler` のみ・`PORT` 環境変数・`run_until` + Ctrl-C）。本サンプルはその上位構成で、`on_message` 部分は公式と同一（`on_open` の tick は `interval_at` で初回遅延、`on_close` は `try_send` + 別タスク出力にしており、いずれも公式 example からの変更点ではなく本サンプル独自の構成）
