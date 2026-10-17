---
source: https://docs.rs/crate/fandhe-db-wire-server/0.2.0/source/src/wire_stream.rs
---

# wire_stream

認証後の pg wire 接続ハンドラ（`handshake` / `simple_query` / `extended_query` / `copy` / `protocol_dispatch`）が読み書きするストリームの抽象（Issue #966）。平文 `TcpStream` と TLS 上のストリーム（`tls::stream::TlsStream`）のどちらでも同じハンドラロジックを走らせる。ハンドラ側は `&mut dyn WireStream` を受け取り、分岐・応答内容・順序は変えない。

## Signature / Usage

~~~rust,ignore
pub trait WireStream: Read + Write {
    fn read_timeout(&self) -> io::Result<Option<Duration>>;
    fn set_read_timeout(&mut self, timeout: Option<Duration>) -> io::Result<()>;
    fn set_write_timeout(&mut self, timeout: Option<Duration>) -> io::Result<()>;
    fn shutdown_both(&mut self) -> io::Result<()>;
    fn shutdown_write(&mut self) -> io::Result<()>;
    fn emergency_channel(&self) -> Option<TcpStream>;
    fn emergency_response_channel(&self, response: &[u8]) -> Option<(Vec<u8>, TcpStream)> {
        let clone = self.emergency_channel()?;
        Some((response.to_vec(), clone))
    }
    fn graceful_close(&mut self);
    fn tls_server_end_point(&self) -> Option<&[u8]> { None }
}

impl WireStream for TcpStream { /* ... */ }
~~~

## Options / Props

| Method | Description |
|--------|-------------|
| `read_timeout` | 現在の読み取りタイムアウト（`post_auth_loop` が接続全体の基準値として最初に読む） |
| `set_read_timeout` / `set_write_timeout` | タイムアウト設定。TLS 上でも内部 `TcpStream` のタイムアウトが効く |
| `shutdown_both` | 読み書き両方向を閉じる（fail-closed な即時切断） |
| `shutdown_write` | 書き込み方向のみ閉じる（`drain_and_close` の lingering close が FIN 送出後に読み捨てる） |
| `emergency_channel` | 緊急応答（RECOVER-6・panic フック）用の生ソケット複製。平文接続のみ `Some`、TLS は常に `None` |
| `emergency_response_channel` | 緊急応答の「送出済み形式のバイト列」と書き込み先ソケットの組。既定は `emergency_channel` を素通し（平文は従来とビット同一）、TLS は上書きして TLS レコードへ暗号化 |
| `graceful_close` | 接続終了時の best-effort な後始末（TLS は `close_notify`、平文は no-op） |
| `tls_server_end_point` | SCRAM-SHA-256-PLUS のチャネルバインディング値（RFC 5929 §4）。平文は常に `None`、既定実装も `None` |

## Notes

- `TcpStream` 実装の `graceful_close` は何もせず（既存挙動とビット同一）、`tls_server_end_point` は常に `None`。
- `tls_server_end_point` が `None` を返す実装では、`handshake.rs` が SCRAM-SHA-256-PLUS を機構リストへ提示せず、クライアントが `p=<cb-name>` を送っても `negotiate_channel_binding` が拒否する（fail-closed）。既定実装を `None` にしたのは下流の既存 `WireStream` 実装を破壊しないための互換維持。

## Related

- [tls.md](./tls.md)
- [handshake.md](./handshake.md)
- [auth.md](./auth.md)
- [protocol-dispatch.md](./protocol-dispatch.md)
