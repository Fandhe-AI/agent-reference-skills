# webrtc

in-process WebRTC プラグイン（TASK-8.1）。SDP Offer/Answer・データチャネル確立を `webrtc-rs` でプロセス内完結させる。REQ-8 の MVP 推奨（別プロセス切り出し、`webrtc-proxy`）とは対照的な高攻撃表面の選択肢であり、クレート境界で完全に分離する。

- feature 名: `webrtc`
- crate 名: `fandhe-backend-plugin-webrtc`（crates/plugin-webrtc）
- 配線パターン: パスインターセプト型（`try_intercept`）。`webrtc-proxy` と同時に登録された場合は `webrtc-proxy` が優先される

## Signature / Usage

`fandhe_backend_core::server::Server::webrtc` へ `WebRtcConfig` を登録する。`POST /rtc/offer` をパスインターセプトし、SDP Offer から `PeerConnection` を生成、非トリクル ICE で SDP Answer を返す。

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
| `with_max_peer_connections(usize)` | `usize` | `64`（`DEFAULT_MAX_PEER_CONNECTIONS`） | 同時に保持する `PeerConnection` 数の上限 |
| `with_signaling_timeout(Duration)` | `Duration` | `10 秒`（`DEFAULT_SIGNALING_TIMEOUT`） | シグナリング全体のタイムアウト |
| `with_max_data_channels_per_connection(usize)`（v0.6.0 で追加） | `usize` | `16` | 1 接続あたりに同時に開けるデータチャネル数の上限。超過分は即 close され、接続と既存チャネルは維持される。`0` は無制限。getter は `max_data_channels_per_connection()` |
| `with_data_channel_send_buffer_limit(usize)`（v0.6.0 で追加） | `usize` | `1024 * 1024`（1 MiB / チャネル） | データチャネル 1 本あたりの送信バッファ上限（バイト）。`PeerConnection` の生成時に webrtc へ配線する。上限到達時は `DataChannel::send` が空きを待つバックプレッシャで、エラーや切断は起きない。`0` は無制限。N 本のチャネルを持つ接続は最大 N × 上限を保持しうる。getter は `data_channel_send_buffer_limit()` |
| `with_udp_bind_addrs(Vec<String>)`（v0.6.0 で追加） | `Vec<String>` | `["0.0.0.0:0"]` | ICE が使う UDP バインドアドレス。getter は `udp_bind_addrs() -> &[String]` |

## Notes

- Migration (v0.5.0 → v0.6.0): 既定値が変わった。(1) データチャネル数は無制限から 16 本になった（17 本以上を使う場合は `with_max_data_channels_per_connection(0)` で無制限に戻すか上限を明示）。(2) 送信バッファ上限は無制限から 1 チャネルあたり 1 MiB になった（`with_data_channel_send_buffer_limit(0)` で戻せる。1 MiB を超える単一メッセージもバッファが空なら送信される）。(3) 内部の `webrtc`（webrtc-rs）が 0.17 系から 0.21 系へ移行し、UDP は既定で `0.0.0.0:0` のみにバインドする。0.17 系の既定は IPv4 と IPv6 の両方の ICE 候補を集めていたため、既定では IPv4 のみに狭まる。従来の挙動に戻すには `with_udp_bind_addrs(vec!["0.0.0.0:0".to_owned(), "[::]:0".to_owned()])` を明示する（バインドできなかったアドレスは webrtc 側でスキップされ、1 つでもバインドできれば接続は生成できる）
- `with_udp_bind_addrs` の各要素は `SocketAddr`（`ip:port`）として解釈できる必要があり、ホスト名は受け付けない（ブロッキングの名前解決がドライバ上で走るため）。空のリスト、または解釈できない要素を含む設定は既定値へ戻らず、`POST /rtc/offer` が枠の予約前に `500`（`{"error":"peer_connection_init_failed"}`）で拒否する（フェイルクローズ）
- webrtc-rs 0.21 系（v0.6.0 で 0.17 系から移行）: `webrtc` の型は公開 API に出ておらず、`POST /rtc/offer` のワイヤ契約（JSON）も変わらない。0.21 は `close()` せずに drop するとドライバと UDP ソケットが残るため、接続の枠を除去する全経路（シグナリングの失敗・タイムアウト、呼び出し元 Future の drop、終端状態の検知、drain）で `close()` も行う。`PeerConnection` の生成はキャンセルされない所有タスクで完了まで走らせ、生成中にタイムアウトやキャンセルが起きても生成タスクが pc を `close()` して枠を解放する。`close_active_peers` / `drain_for_shutdown` は待ち時間の上限を超えても `close()` を中断せず切り離したタスクで完了まで続ける。設計は `docs/design/webrtc-rs-version-strategy.md`（https://github.com/fandhe-ai/fandhe-backend/blob/9a75278f68d7fb537867787ee83fc1b550dd2ca8/docs/design/webrtc-rs-version-strategy.md）
- Security (v0.6.0): `webrtc` 0.17 系が `dtls` 経由で引いていた `crypto-bigint 0.5.5` の脆弱性 RUSTSEC-2026-0387 を、0.21 系への移行で解消した（0.21 系は `crypto-bigint` を依存グラフに含まない）
- `webrtc-rs` の依存インパクト（以下の数値は 0.17.1 系での PoC-5 計測値で、0.21 系への移行後は再計測していない）: 依存 +189 クレート・バイナリサイズ約 10.4 倍・`unsafe` Functions 約 2.2 倍という桁違いの依存インパクトを持つ（PoC-5）。REQ-8 は WebRTC を要するサービスの別プロセス切り出し（[webrtc-proxy](./webrtc-proxy.md)）を MVP 推奨とし、本プラグインは対照的な in-process 選択肢
- ICE 接続性チェックはクライアント SDP 由来のアドレスへ UDP 送信を発生させ得る。STUN/TURN は設定しない（`RTCConfiguration::default()`）
- 同時接続数上限は「判定と予約枠登録を単一ロック区間で行う」ことで TOCTOU を防ぐ。上限到達時は 503 で拒否（フェイルクローズ）
- `crates/plugin-webrtc-proxy` とはクレート境界で完全に分離しており、相互に依存しない

## Related

- [webrtc-proxy](./webrtc-proxy.md)
- [websocket](./websocket.md)
- [graphql](./graphql.md)
