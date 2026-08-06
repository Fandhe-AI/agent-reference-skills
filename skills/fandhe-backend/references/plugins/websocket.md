# websocket

WebSocket プラグイン（TASK-4.1）。コアの `UpgradeHandler` 拡張点から委譲された接続に対し、RFC 6455 ハンドシェイクの検証・101 応答の送出・`tokio-tungstenite` へのフレーミング委譲を行う。

- feature 名: `websocket`
- crate 名: `fandhe-backend-plugin-websocket`（crates/plugin-websocket）
- 配線パターン: UpgradeHandler 型（`try_handle_upgrade`）。`UpgradeHandler` trait を実装するアダプタ（`WebSocketUpgradeAdapter`）はコア側（`crates/core/src/server.rs`）に置かれる

## Signature / Usage

`Server::websocket(config)`（コア側 API）へ `WebSocketConfig` を登録する。マッチ確定時はコアが専用タスクを `tokio::spawn` し、`OwnedSemaphorePermit` をそのタスクへ move する（同時接続数上限の維持）。

```rust,ignore
pub fn matches(head: &RequestHead, config: &WebSocketConfig) -> bool;

// v0.3.0 BREAKING: 第 5 引数 cancel を追加（issue #492）
pub async fn handle_upgrade<S, C>(
    stream: S,
    head: &RequestHead,
    leftover: Vec<u8>,
    config: &WebSocketConfig,
    cancel: C,
) -> Result<(), WsError>
where
    S: AsyncRead + AsyncWrite + Unpin,
    C: Future<Output = ()>;
```

キャンセル不要な呼び出しでは `cancel` に `std::future::pending::<()>()` を渡す。

## Options / Props

`WebSocketConfig`（`with_*` メソッドで構築、`Default` あり。型は `WebSocketConfig` の各 `pub` フィールドに対応）。

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `with_path(path)` | `String` | `/ws` | アップグレードを受け付ける request-target |
| `with_max_message_size(usize)` | `usize` | `1024 * 1024`（1 MiB） | 受信メッセージ（フレーム結合後）の最大バイト数 |
| `with_max_frame_size(usize)` | `usize` | `256 * 1024`（256 KiB） | 受信する単一フレームの最大バイト数 |
| `with_idle_timeout(Duration)` / `without_idle_timeout()` | `Option<Duration>` | `Some(60 秒)`（fail-safe で有効） | フレーム受信アイドルタイムアウト |
| `with_handler(H: WsMessageHandler)` | `Arc<dyn WsMessageHandler>` | `EchoHandler`（`default_handler()`、後方互換） | Text/Binary メッセージ受信ごとに呼ばれるユーザー定義ハンドラ |
| `with_close_grace(Duration)` | `Duration` | `10 秒`（`DEFAULT_CLOSE_GRACE`、v0.3.0 で追加、issue #500） | Close ハンドシェイクの猶予期間。サーバー側 Close フレーム送出からクライアント応答/EOF 待ちまでの上限 |

## Notes

- これは Rust 製 fandhe-backend の API であり、JS/TS の `hono` や Go の `go-echo` の同名機能（WebSocket ハンドラ）とは別物
- `crates/plugin-websocket` 自体は `fandhe-backend-core` に依存しない非循環パターン。`UpgradeHandler` 実装アダプタはコア側に置く
- `max_message_size`/`max_frame_size` 超過はプロトコルエラーとしてクローズ（メモリ枯渇 DoS 対策）。`idle_timeout` は無通信接続を正常な Close ハンドシェイクで切断する（リソース枯渇 DoS 対策）
- ユーザーハンドラは `WsMessageHandler` trait（`crates/plugin-websocket` 側で定義、コアへの逆依存は発生しない）。メッセージごとに直列 `await` される
- v0.3.0: `handle_upgrade` に世代キャンセル用の `cancel: Future<Output = ()>` を追加（issue #492）。`cancel` が発火すると close code 1001（Going Away）の Close フレームを送出し、クライアント応答は `close_grace`（既定 10 秒）で有界に待つ。`with_close_grace` は `Duration::ZERO` や既定より大幅に大きい値もクランプせず受け付けるため、正常終了と資源保護のバランスは呼び出し側の責任になる

## Related

- [webrtc](./webrtc.md)
- [webrtc-proxy](./webrtc-proxy.md)
- [graphql](./graphql.md)
