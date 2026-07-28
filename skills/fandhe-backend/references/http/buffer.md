# buffer

接続単位で再利用する読み取りバッファ。`connection::read_request` の呼び出し元（コアの接続受理ループ）が 1 コネクションにつき `RecvBuffer` を 1 つ保持し、繰り返し `read_request` へ渡す契約。

## Signature / Usage

```rust
pub struct RecvBuffer { /* 非公開: buf: Vec<u8>, pos: usize */ }

impl RecvBuffer {
    pub fn new() -> Self;
    pub fn unread(&self) -> &[u8];
    pub fn capacity(&self) -> usize;
}
```

```rust
use fandhe_backend_http::buffer::RecvBuffer;

let buf = RecvBuffer::new();
assert!(buf.unread().is_empty());
```

## Options / Props

| Name | Type | Description |
| --- | --- | --- |
| `unread()` | `&[u8]` | まだ消費されていないバイト列（パイプライン残余を含む）。`parse_request_head` の入力としてそのまま渡せる |
| `capacity()` | `usize` | 内部バッファの現在の容量。縮小ポリシーの観測・監視補助用 |

## Notes

- 遅延コンパクション: 消費済みバイトはカーソル前進のみで扱い、パイプライン残余がある場合のみ次回読み取り直前に先頭詰めする（非パイプラインの典型ケースでは memmove がゼロになる）
- ゼロ埋め回避: 追加読み取りは `Vec::reserve` + `AsyncReadExt::read_buf` でスペア容量へ直接書き込み、`resize` によるゼロ埋めを行わない
- 内部定数 `READ_CHUNK_BYTES`（8 KiB）は一括読み取りするチャンクサイズ、`MAX_RETAINED_CAPACITY`（64 KiB）はリクエスト処理完了時に容量をこの上限まで縮小する閾値（大 body 処理後の keep-alive 接続でのメモリ滞留を防ぐ）
- `consume` / `take_exact` / `reserve_for_read` / `shrink_if_oversized` / `read_chunk` は `pub(crate)` であり、外部からは `unread()` / `capacity()` のみ利用可能

## Related

- [connection](./connection.md)
- [request](./request.md)
