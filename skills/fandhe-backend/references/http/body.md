# body

body フレーミングの意味解釈（sans-IO）。`parse_request_head` が構文的に正しいと判定したヘッダ列から「body を何バイト読むべきか」を決定する。実際の chunked デコードは行わず、意味決定のみを行う。

## Signature / Usage

```rust
pub const MAX_BODY_BYTES: u64 = 1024 * 1024;

pub enum BodyLength {
    None,
    Fixed(u64),
    Chunked,
}

pub enum BodyError {
    TransferEncodingUnsupported,
    ContentLengthWithChunked,
    DuplicateContentLength,
    InvalidContentLength,
    BodyTooLarge,
}

pub fn body_length(head: &RequestHead) -> Result<BodyLength, BodyError>;
pub fn body_length_with_limit(head: &RequestHead, max_body_bytes: u64) -> Result<BodyLength, BodyError>;
```

```rust
use fandhe_backend_http::body::{body_length, BodyLength};
use fandhe_backend_http::request::{parse_request_head, ParseOutcome};

let buf = b"POST /items HTTP/1.1\r\nContent-Length: 4\r\n\r\nabcd";
let head = match parse_request_head(buf).unwrap() {
    ParseOutcome::Complete { head, .. } => head,
    ParseOutcome::Incomplete => unreachable!(),
};
assert_eq!(body_length(&head), Ok(BodyLength::Fixed(4)));
```

## Options / Props

| Name | Type | Description |
| --- | --- | --- |
| `MAX_BODY_BYTES` | `u64` (1 MiB) | body の既定許容バイト数上限。`Server::max_body_bytes` で上書き可 |
| `body_length_with_limit` の `max_body_bytes` | `u64` | 上限を引数化した版。`max_body_bytes == 0` は body を持つリクエストを一律拒否（body なしは引き続き受理） |

## Notes

- `Transfer-Encoding` は HTTP/1.1 かつヘッダが単独 1 行・値が OWS trim 後に ASCII 大小無視で厳密に `chunked` のみである場合に限り `BodyLength::Chunked` として受理する
- HTTP/1.0 での指定・`gzip` 等の他 coding・複数 `Transfer-Encoding` ヘッダはすべて `TransferEncodingUnsupported` として拒否する
- `chunked` を受理する場合、`Content-Length` が同時に存在すれば `ContentLengthWithChunked` として拒否する（RFC 9112 §6.3 のリクエストスマグリング対策）
- `Content-Length` は 2 個以上存在すれば値が同一でも `DuplicateContentLength` として一律拒否する
- `Content-Length` の値は ASCII digit のみで構成される非負整数であることを要求（符号・空白・カンマ区切り・空文字列・オーバーフローは `InvalidContentLength`）
- 極端な大きい上限値（`u64::MAX` 等）は拒否せずそのまま使う（上限緩和は呼び出し元の責務）

## Related

- [request](./request.md)
- [chunked](./chunked.md)
- [connection](./connection.md)
