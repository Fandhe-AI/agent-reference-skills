# chunked

chunked transfer-coding のデコーダー / エンコーダー（RFC 9112 §7.1、sans-IO）。`body::body_length` が `BodyLength::Chunked` と判定したリクエストの body 部分をインクリメンタルに読み進めるための純粋な状態機械。

## Signature / Usage

```rust
pub const MAX_CHUNK_COUNT: u64 = 16_384;
pub const MAX_CHUNK_LINE_BYTES: usize = 256;

pub enum ChunkedError {
    InvalidChunkSize,
    ChunkLineTooLong,
    TooManyChunks,
    BodyTooLarge,
    TrailerUnsupported,
    InvalidLineTerminator,
}

pub enum DecodeOutcome {
    Complete { consumed: usize },
    Incomplete { consumed: usize },
}

pub struct ChunkedDecoder { /* 非公開 */ }
impl ChunkedDecoder {
    pub fn new() -> Self;
    pub fn with_max_body_bytes(max_body_bytes: u64) -> Self;
    pub fn decode(&mut self, input: &[u8], out: &mut Vec<u8>) -> Result<DecodeOutcome, ChunkedError>;
}

pub fn encode_chunk(data: &[u8], out: &mut Vec<u8>);
pub fn encode_terminator(out: &mut Vec<u8>);
```

```rust
use fandhe_backend_http::chunked::{ChunkedDecoder, DecodeOutcome};

let mut decoder = ChunkedDecoder::new();
let mut out = Vec::new();
let input = b"4\r\nWiki\r\n5\r\npedia\r\n0\r\n\r\n";
let outcome = decoder.decode(input, &mut out).unwrap();
assert_eq!(outcome, DecodeOutcome::Complete { consumed: input.len() });
assert_eq!(out, b"Wikipedia");
```

## Options / Props

| Name | Type | Description |
| --- | --- | --- |
| `MAX_CHUNK_COUNT` | `u64` (16,384) | 1 リクエストで許容するチャンク総数上限。超過は `TooManyChunks` |
| `MAX_CHUNK_LINE_BYTES` | `usize` (256) | chunk-size 行（拡張含む）の許容バイト数上限。超過は `ChunkLineTooLong` |
| `ChunkedDecoder::with_max_body_bytes` の引数 | `u64` | 復号後総量の上限。既定は `body::MAX_BODY_BYTES`（1 MiB）。`0` は chunk-data を一切含まないチャンク列のみ受理 |
| `encode_chunk` の `data` | `&[u8]` | 空データの場合は何も出力しない（`0\r\n\r\n` による誤終端を防止） |

## Notes

- 構文は CRLF 厳格（bare LF は拒否）、hex 桁は ASCII `0`-`9`/`a`-`f`/`A`-`F` のみ許容（リクエストスマグリング対策）
- 非空 trailer フィールドは受理しない（安全側デフォルト。最終チャンク直後の即 CRLF のみ受理）
- 復号後総量は `crate::body::MAX_BODY_BYTES` を再利用し、チャンク総数・chunk-size 行長も上限検査済み。いずれもバッファ確保前に検査する
- `decode` が `Incomplete` を返した場合、呼び出し元は追い読みしたバイト列を含む次の未読領域全体を同じデコーダーへ再度渡す契約（`consumed` 分は消費済み）
- `encode_chunk` / `encode_terminator` は `ChunkedDecoder` と対になるエンコーダー。`encode_chunk` は空データ時に無出力とし、終端は必ず `encode_terminator` を明示的に呼ぶ経路のみに限定する（ストリーミング途中の誤終端防止）

## Related

- [body](./body.md)
- [connection](./connection.md)
- [response](./response.md)
