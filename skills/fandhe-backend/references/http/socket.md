# socket

接続受理直後の TCP ソケットオプション設定。feature `net`（既定 off）が有効なときのみコンパイル対象になる。

## Signature / Usage

```rust
pub fn configure_stream(stream: &tokio::net::TcpStream) -> std::io::Result<()>;
```

```rust
use fandhe_backend_http::socket::configure_stream;
use tokio::net::{TcpListener, TcpStream};

let listener = TcpListener::bind("127.0.0.1:0").await?;
// accept 後
let (stream, _) = listener.accept().await.unwrap();
configure_stream(&stream).unwrap();
assert!(stream.nodelay().unwrap());
```

## Options / Props

| Name | Type | Description |
| --- | --- | --- |
| `configure_stream` の `stream` | `&tokio::net::TcpStream` | `accept` 直後に呼ぶ想定。`TCP_NODELAY`（Nagle アルゴリズム無効化）を設定する |

## Notes

- コアの接続受理ループが `accept` 直後にこの関数を呼ぶ契約
- 小さいリクエスト／レスポンスを都度フラッシュする HTTP/1.1 の応答性を優先し、ACK 待ちによる遅延蓄積を避けるため既定で有効化する
- 失敗時はソケットオプション設定の失敗を握りつぶさず `io::Error` として伝播する。呼び出し元は該当接続のみをクローズし、accept ループ全体を継続できる（フェイルセーフ）
- 本クレートは `tokio::net` を `TcpStream` の 1 メソッド呼び出しのみに限定して利用する（pay-for-what-you-use）

## Related

- [connection](./connection.md)
