---
source: https://docs.rs/crate/fandhe-vector-db-wire-server/0.1.0/source/src/response_buffer.rs
---

# response_buffer

簡易クエリ応答（`RowDescription`/`DataRow`×N/`CommandComplete`/`ReadyForQuery`）を上限付きバッファへ束ね、行数に比例しない回数の `write_all` で送出するための組み立て器（Issue #481）。[simple-query.md](./simple-query.md) の `respond_query_result` が `RowDescription` を皮切りに各行を `push_frame` へ渡し、`CommandComplete`/`ReadyForQuery` まで積んでから最後に一度 `flush` する。ADR `wire-response-buffering`（Proposed、実装完了）によれば、1,000 行の応答が 1,003 回の `write_all` から 1 回に削減される。

上限（`MAX_RESPONSE_BUFFER_BYTES`）は「拒否」ではなく「フラッシュ閾値」である。バッファがこの値を超えそうになったら、まず溜まっている分を送出してから続ける（分割送出）。フレームは常に境界単位で扱い、分割してバッファへまたがせない。1 フレーム自体が上限を超える場合はバッファを経由せず直接 `write_all` する。

## Signature / Usage

~~~rust,ignore
pub(crate) struct ResponseBuffer {
    buf: Vec<u8>,
    cap: usize,
}

/// 上限 `cap` バイトのバッファを作る。初期確保は `hint` を `cap` で頭打ちにした値のみ使う
/// （untrusted 入力に基づく無制限 `Vec::with_capacity` を避ける）。
pub(crate) fn with_capacity_hint(cap: usize, hint: usize) -> Self

pub(crate) fn len(&self) -> usize
pub(crate) fn is_empty(&self) -> bool

/// `frame` を書き込むための開始位置を返す。呼び出し元は直後にフレームを直接エンコードし、
/// 失敗した場合は `truncate_to` で巻き戻す。
pub(crate) fn frame_start(&self) -> usize

pub(crate) fn as_mut_vec(&mut self) -> &mut Vec<u8>

/// `start`（`frame_start` が返した値）まで巻き戻す。部分フレームを絶対に送出しないための巻き戻し操作。
pub(crate) fn truncate_to(&mut self, start: usize)

/// 完成済みフレーム `frame` を積む。積んだ結果が上限を超え、かつバッファが非空なら先に `flush` する。
/// `frame` 単体が上限を超える場合はバッファへコピーせず `w` へ直接書く。
pub(crate) fn push_frame(&mut self, w: &mut impl Write, frame: &[u8]) -> io::Result<()>

/// 未送出バイトが有れば `write_all` で送出してクリアする。空なら何もしない。
pub(crate) fn flush(&mut self, w: &mut impl Write) -> io::Result<()>
~~~

## Notes

- モジュール全体が `pub(crate)`（crate 外非公開）。上限値の定義は [limits.md](./limits.md) の `MAX_RESPONSE_BUFFER_BYTES` を参照。
- untrusted 入力の扱い規約に従い、添字アクセス（`[]`）・`unwrap`/`expect` を使わず、長さ演算はすべて `checked_*`。
- ADR `wire-response-buffering` のステータスは Proposed（実装は完了しているが、ベンチマーク判定規約上の受入条件 (a) の評価が未了）。

## Related

- [result-encoder.md](./result-encoder.md)
- [limits.md](./limits.md)
- [simple-query.md](./simple-query.md)
