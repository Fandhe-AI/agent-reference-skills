---
source: https://docs.rs/crate/fandhe-vector-db-engine/0.1.0/source/src/sql/sparse_cache.rs
---

# sql::sparse_cache

`sql::exec::execute_statement_with_cache`（`pub(crate)`）が hybrid ランキングかつ metadata / expr フィルタが空のクエリに対してのみ参照する、BM25 疎索引（`SparseIndex`）のテーブル世代整合キャッシュ（Issue #357）。公開 API `pub fn execute_statement`（6 引数）はキャッシュ引数を持たず常に `None` を渡す薄いラッパーであり、本キャッシュを経由しない（`## Notes` 参照）。

## Signature / Usage

```rust,ignore
pub struct SparseIndexCacheStats {
    /// キャッシュヒット数（世代整合まで確認できた再利用）。
    pub hits: u64,
    /// `SparseIndexCache::insert` の呼び出し回数（未登録、または世代不一致で
    /// 破棄した後に新規索引を構築してキャッシュへ挿入を試みた回数）。lookup が
    /// ミスしても、対象クエリの疎コーパスが空（`sparse_docs.is_empty()`）で
    /// `SparseIndex::build` 自体を呼ばない場合や、`precision` の完全性ゲートで
    /// DISTANCE 検索自体を実行しない場合は `insert` を呼ばないため計上されない。
    pub misses: u64,
    /// 世代不一致による破棄回数（lookup 時の stale 検出 + insert 時の一括破棄）。
    pub stale_evictions: u64,
    /// 容量上限超過による LRU 追い出し回数。
    pub capacity_evictions: u64,
    /// 現在キャッシュが保持しているエントリ数。
    pub entries: usize,
}

/// `sql::exec::execute_statement` へ渡すキャッシュアクセス束（Issue #357）。
/// `storage`（`SparseIndexCache::insert` の世代再読取用）と `cache` 本体を 1 引数へ
/// 束ねることで、`execute_statement` の引数数を clippy の `too_many_arguments`
/// 閾値内に保つ。`execute_statement` が `pub fn` であるのに合わせ、構造体自体も
/// `pub`（フィールドは `pub(crate)`）。
pub struct SparseCacheAccess<'a> {
    pub(crate) storage: &'a Storage,
    pub(crate) cache: &'a SparseIndexCache,
}

pub(crate) fn new() -> Self;

/// `(table, ctx, text_column_index)` に一致し、`read_txn` のスナップショットに
/// おけるテーブル世代と整合するエントリを探す。ロック毒化・世代読み取り失敗は
/// いずれも「見つからなかった」として扱う（fail-closed）。
///
/// 世代不一致時の破棄条件（Issue #357 レビュー指摘対応・codex-review P2・
/// Cursor Bugbot 指摘）: `read_txn` は呼び出し元ごとに異なるスナップショット
/// （古い可能性がある）であり、`current_generation` より新しいエントリが存在し
/// 得る。エントリを見つけ次第破棄はせず、`storage` から読んだ「真に最新の」世代
/// と比較し、エントリがそれより厳密に古い場合（`entry.built_generation <
/// true_current_generation`）に限り stale と判定して破棄する。
pub(crate) fn lookup(
    &self,
    storage: &Storage,
    read_txn: &redb::ReadTransaction,
    table: &str,
    ctx: &PolicyContext,
    text_column_index: usize,
) -> Option<Arc<SparseIndex>>;

/// 新規構築した索引を挿入する。`built_generation` は呼び出し元が構築に使った
/// `read_txn` のスナップショットにおけるテーブル世代を渡す契約とする。
///
/// 戻り値は常に `Arc<SparseIndex>`（`Option` ではない）。キャッシュへ反映できる
/// かどうかに関わらず、呼び出し元は返された索引を「このクエリのスナップショット
/// から自分で構築した索引」としてそのまま使ってよい。世代が一致しない、または
/// ロック毒化・世代読み取り失敗の場合はキャッシュへの反映のみを諦め、`index` を
/// そのまま呼び出し元へ返す。
pub(crate) fn insert(
    &self,
    storage: &Storage,
    table: &str,
    ctx: &PolicyContext,
    text_column_index: usize,
    index: SparseIndex,
    built_generation: u64,
) -> Arc<SparseIndex>;

pub(crate) fn stats(&self) -> SparseIndexCacheStats;

/// `sql::exec::execute_statement` の hybrid 実行が参照する `SparseIndex` の
/// テーブル世代整合キャッシュ本体。
pub(crate) struct SparseIndexCache {
    state: RwLock<CacheState>,
    seq: AtomicU64,
    hits: AtomicU64,
    misses: AtomicU64,
    stale_evictions: AtomicU64,
    capacity_evictions: AtomicU64,
}
```

## Notes

- **現行契約の訂正（PR #204 codex-review P1 対応）**: 上記フェンス内の doc comment は `sql::exec::execute_statement` を rustdoc 原文のまま転記しているが、`exec.rs` の実際のシグネチャでは `Option<SparseCacheAccess<'_>>` を受け取るのは `pub(crate) fn execute_statement_with_cache` のみである。公開 API `pub fn execute_statement`（6 引数）はキャッシュ引数を一切持たず、内部で `execute_statement_with_cache` の 4 つのキャッシュ引数すべてに `None` を渡す薄いラッパー（`exec.md` 参照）。`core.rs::EngineCore::execute_sql` は `execute_statement_with_cache` を直接呼び、その場で `SparseCacheAccess { storage, cache }` を構築する
- **`pub` visibility の実態**: `SparseCacheAccess` は構造体としては `pub` 宣言だが、`sql.rs` で `pub(crate) mod sparse_cache;` と宣言されているため、この `pub` は crate 外からの到達可能性には寄与しない（外部から見えるのは `pub use sparse_cache::SparseIndexCacheStats;` で再エクスポートされた統計型のみ）。rustdoc の「`execute_statement` が `pub fn` であるのに合わせ、構造体自体も `pub`」という説明は、`execute_statement`／`execute_statement_with_cache` の分割（Issue #357・#363 レビュー指摘対応）以前の名残とみられ、現行コードの実態とは一致しない
- 関連 ADR: [`sparse-index-cache`](https://raw.githubusercontent.com/Fandhe-AI/vector-db/7022d112e79760dca916480599553fcac256b5fb/docs/design/sparse-index-cache.md)（Issue #357・Accepted。`SparseIndex` のテーブル世代整合キャッシュ = 本モジュールそのものの設計 ADR。`core.rs::PrefilterCache`〔TASK-169〕・`DictionaryCache`〔TASK-109〕と同型）、[`sparse-index-cache-verification`](https://raw.githubusercontent.com/Fandhe-AI/vector-db/7022d112e79760dca916480599553fcac256b5fb/docs/design/sparse-index-cache-verification.md)（Issue #358。疎索引キャッシュ導入後の Recall 非劣化・前後比較検証）
- Distinct from `mssql` / `drizzle` full-text search indexes: not a SQL engine FTS extension, but a BM25 sparse index cache internal to the engine.

## Related

- [exec](./exec.md)
- [hnsw-cache](./hnsw-cache.md)
