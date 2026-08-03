# webrtc

in-process WebRTC プラグイン（TASK-8.1）。SDP Offer/Answer・データチャネル確立を `webrtc-rs` でプロセス内完結させる。REQ-8 の MVP 推奨（別プロセス切り出し、`webrtc-proxy`）とは対照的な高攻撃表面の選択肢であり、クレート境界で完全に分離する。

- feature 名: `webrtc`
- crate 名: `fandhe-backend-plugin-webrtc`（crates/plugin-webrtc）
- 配線パターン: パスインターセプト型（`try_intercept`）。`webrtc-proxy` と同時に登録された場合は `webrtc-proxy` が優先される

## Signature / Usage

`fandhe_backend_core::server::Server::webrtc` へ `WebRtcConfig` を登録する。`POST /rtc/offer` をパスインターセプトし、SDP Offer から `RTCPeerConnection` を生成、非トリクル ICE で SDP Answer を返す。

```rust,ignore
pub const OFFER_PATH: &str; // "/rtc/offer"

pub async fn try_handle_rtc_offer(
    head: &RequestHead,
    body: &[u8],
    config: &WebRtcConfig,
) -> Option<Response>;
```

## Options / Props

`WebRtcConfig`（`WebRtcConfig::new()` または `Default` で構築。型は `WebRtcConfig` のフィールド型に対応）。

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `with_max_offer_bytes(usize)` | `usize` | `64 * 1024`（64 KiB、`DEFAULT_MAX_OFFER_BYTES`） | SDP Offer の最大バイト数 |
| `with_max_peer_connections(usize)` | `usize` | `64`（`DEFAULT_MAX_PEER_CONNECTIONS`） | 同時に保持する `RTCPeerConnection` 数の上限 |
| `with_signaling_timeout(Duration)` | `Duration` | `10 秒`（`DEFAULT_SIGNALING_TIMEOUT`） | シグナリング全体のタイムアウト |

## Notes

- `webrtc-rs`（0.17.1 系）は依存 +189 クレート・バイナリサイズ約 10.4 倍・`unsafe` Functions 約 2.2 倍という桁違いの依存インパクトを持つ（PoC-5）。REQ-8 は WebRTC を要するサービスの別プロセス切り出し（[webrtc-proxy](./webrtc-proxy.md)）を MVP 推奨とし、本プラグインは対照的な in-process 選択肢
- ICE 接続性チェックはクライアント SDP 由来のアドレスへ UDP 送信を発生させ得る。STUN/TURN は設定しない（`RTCConfiguration::default()`）
- 同時接続数上限は「判定と予約枠登録を単一ロック区間で行う」ことで TOCTOU を防ぐ。上限到達時は 503 で拒否（フェイルクローズ）
- `crates/plugin-webrtc-proxy` とはクレート境界で完全に分離しており、相互に依存しない

## Related

- [webrtc-proxy](./webrtc-proxy.md)
- [websocket](./websocket.md)
- [graphql](./graphql.md)
