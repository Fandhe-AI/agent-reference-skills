# connection

keep-alive 判定・ソケット読み取りループ。`should_keep_alive` は `Connection` ヘッダと HTTP バージョンからの意味判定を行う sans-IO 純関数。`read_request` は `request::parse_request_head`（構文解析）と `body::body_length`（body フレーミング解釈）を組み合わせ、1 リクエスト分（ヘッド + body）をソケットから読み取る非同期関数であり、本クレートで唯一 tokio（`io-util`）に依存する箇所。

## Signature / Usage

```rust
pub struct Request {
    pub head: RequestHead,
    pub body: Vec<u8>,
}

pub enum RequestError {
    Parse(ParseError),
    Body(BodyError),
    Chunked(ChunkedError),
    UnexpectedEof,
    Io(std::io::Error),
}

pub fn should_keep_alive(head: &RequestHead) -> bool;

pub async fn read_request<R: AsyncRead + Unpin>(
    reader: &mut R,
    buf: &mut RecvBuffer,
) -> Result<Option<Request>, RequestError>;

pub async fn read_request_with_limit<R: AsyncRead + Unpin>(
    reader: &mut R,
    buf: &mut RecvBuffer,
    max_body_bytes: u64,
) -> Result<Option<Request>, RequestError>;
```

```rust
use fandhe_backend_http::buffer::RecvBuffer;
use fandhe_backend_http::connection::read_request;

let mut socket: &[u8] = b"GET / HTTP/1.1\r\nHost: example.com\r\n\r\n";
let mut buf = RecvBuffer::new();
let req = read_request(&mut socket, &mut buf).await.unwrap().unwrap();
assert_eq!(req.head.method(), "GET");
assert!(req.body.is_empty());
```

## Options / Props

| Name | Type | Description |
| --- | --- | --- |
| `should_keep_alive` の `head` | `&RequestHead` | HTTP/1.1 は `close` token が含まれない限り keep-alive（既定 true）。HTTP/1.0 は `keep-alive` token が含まれる場合のみ keep-alive（既定 false） |
| `read_request_with_limit` の `max_body_bytes` | `u64` | body 上限。`read_request` は既定値 `body::MAX_BODY_BYTES` を渡す薄い wrapper |
| `Request::head` / `body` | `RequestHead` / `Vec<u8>` | パース済みヘッドと `Content-Length` 分の body（body なしは空） |

## Notes

- `read_request` は `buf`（`RecvBuffer`）の未読領域が空の状態でヘッド読み取り前に EOF に達した場合は正常なコネクション終了として `Ok(None)` を返す。ヘッド途中・body 途中の EOF は `RequestError::UnexpectedEof`
- パイプライン済みの次リクエスト先頭バイトは `RecvBuffer` に残したまま返るため、呼び出し元は同じ `RecvBuffer` をそのまま次の呼び出しへ渡す契約
- `Connection` ヘッダは複数出現しうるため全件をカンマ区切り token に分解し、各 token を OWS trim・大小文字無視で比較する。HTTP/1.0 で `keep-alive, close` のように両方指定された場合は `close` を優先して接続を閉じる
- `body_length_with_limit` が `BodyLength::Chunked` を返した場合は `read_body_chunked` が `ChunkedDecoder` へ委譲する
- keep-alive 接続は同じ `RecvBuffer` を繰り返し使うため、リクエスト処理完了時に `buf.shrink_if_oversized()` で容量を有界化する（大 body 処理後のメモリ滞留対策）
- 読み取り・アイドルタイムアウト（スロークライアント対策）は本モジュールの責務外（コアの接続受理ループ側が扱う）

## Related

- [request](./request.md)
- [body](./body.md)
- [chunked](./chunked.md)
- [buffer](./buffer.md)
- [socket](./socket.md)
