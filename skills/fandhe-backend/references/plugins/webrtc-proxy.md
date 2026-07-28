# webrtc-proxy

WebRTC シグナリングプロキシプラグイン（TASK-8.2-2）。別プロセスに切り出した WebRTC サービスへ SDP Offer/Answer を中継し、`webrtc-rs` 系の巨大依存をコア・他プラグインの監査対象から隔離する。

- feature 名: `webrtc-proxy`
- crate 名: `fandhe-backend-plugin-webrtc-proxy`（crates/plugin-webrtc-proxy）
- 配線パターン: パスインターセプト型（`try_intercept`）。プラグイン境界パターン第 1 号

## 登録方法

`fandhe_backend_core::server::Server::webrtc_proxy` へ `ProxyConfig` を登録する。`POST /rtc/offer` をパスインターセプトし、`forward_offer` が静的設定された上流 WebRTC サービスへ HTTP/1.1 で中継する。

```rust,ignore
let config = ProxyConfig::new("127.0.0.1:9000");
```

## Signature

```rust,ignore
pub async fn try_handle_rtc_offer(head: &RequestHead, body: &[u8], config: &ProxyConfig) -> Option<Response>;
```

## Config

`ProxyConfig`（`ProxyConfig::new(upstream_addr)` で構築、他は `with_*` で上書き。型は `ProxyConfig` のフィールド型に対応）。

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `upstream_addr`（コンストラクタ引数） | `String` | 空文字列（`Default` 時。実運用では必ず `new` で指定） | 上流アドレス（`host:port`） |
| `with_upstream_path(path)` | `String` | `/rtc/offer`（`DEFAULT_UPSTREAM_PATH`） | 上流へ転送するリクエストパス |
| `with_connect_timeout(Duration)` | `Duration` | `3 秒`（`DEFAULT_CONNECT_TIMEOUT`） | 上流への接続確立タイムアウト |
| `with_request_timeout(Duration)` | `Duration` | `5 秒`（`DEFAULT_REQUEST_TIMEOUT`） | 上流応答受信タイムアウト |
| `with_max_offer_bytes(usize)` | `usize` | `64 * 1024`（64 KiB、`DEFAULT_MAX_PAYLOAD_BYTES`） | クライアントから受理する SDP Offer の最大バイト数 |
| `with_max_answer_bytes(usize)` | `usize` | `64 * 1024`（64 KiB、`DEFAULT_MAX_PAYLOAD_BYTES`） | 上流から受理する SDP Answer の最大バイト数 |

## Notes

- 上流アドレスはビルド時・起動時の `ProxyConfig` による静的設定のみで決定し、リクエスト内容からは導出しない（SSRF 防止）
- `crates/plugin-webrtc`（in-process 実装、`webrtc-rs` 依存）とはクレート境界で完全に分離しており、本クレートは `webrtc-rs` に一切依存しない
- MVP では TLS/mTLS 非対応。プライベートネットワーク内の HTTP/1.1 サーバを前提とする

## Related

- [webrtc](./webrtc.md)
- [websocket](./websocket.md)
- [graphql](./graphql.md)
