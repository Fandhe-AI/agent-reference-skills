---
source: https://docs.rs/crate/fandhe-vector-db-engine/0.1.0/source/src/buffer_pool.rs
---

# buffer_pool

バッチ経路（`batch_search.rs`・`batch_fallback.rs`）の中間バッファを、サイズクラス別のフリーリスト・総量上限・グローバル LRU 自動破棄で管理するバッファプール（TASK-157、対象ビヘイビア: CORE-15）。`run_batch_search` が呼び出しのたびに 1 行分の f32 デコード先（`row_buf`）を確保・破棄していたのを避けるため、スクラッチバッファをプールへ返却・再取得する経路を提供する。

## Signature / Usage

```rust,ignore
/// BufferPool のエラー（fail-closed）。メッセージは英語（プログラム出力文字列）。
#[derive(Debug, Clone, PartialEq)]
pub enum BufferPoolError {
    /// 要求要素数が呼び出し元の指定した max_elems（batch_search.rs::MAX_BATCH_DIM 等、
    /// 既存の検証済み上限）を超過した。
    RequestTooLarge { len: usize, max: usize },
    /// サイズクラスの算出・容量計算が usize の範囲を超えた（理論上 max_elems が
    /// 極端に大きい呼び出し元でのみ起こりうる、アロケーション前の fail-closed 拒否）。
    RequestOverflow,
    /// Vec::try_reserve_exact がメモリ不足で失敗した（arena.rs::try_reserve_exact と
    /// 同方針。abort させず Result で伝播する）。
    AllocationFailed(String),
}
```

## Notes

- 公開 API は `BufferPoolError` のみ。`class_bytes` / `size_class_for` / `PooledBuffer` / `BufferPool`（`new` / `retained_bytes` / `peak_retained_bytes` / `acquire` / `release` を含む）はすべて `pub(crate)` のため未掲載（クレート外非公開、docs.rs source 実測）。
- サイズクラスは 2 のべき乗刻み。総量上限（`quota_bytes`）は呼び出し元が構築時に決める設定値で、環境変数・接続パラメータ等の外部入力からは到達できない（CORE-12 と同じ「上書き機構自体を設けない」方針を踏襲、と rustdoc に明記）。超過解放時はクラスを問わず解放時刻が最も古いバッファから破棄する（グローバル LRU）。

## Related

- [arena](./arena.md)
- [storage](./storage.md)
