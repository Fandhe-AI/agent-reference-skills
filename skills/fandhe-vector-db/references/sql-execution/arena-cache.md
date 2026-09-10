---
source: https://docs.rs/crate/fandhe-vector-db-engine/0.1.0/source/src/sql/arena_cache.rs
---

# sql::arena_cache

SQL 表層（`sql::exec::execute_statement_with_cache`）専用の `VectorArena` 世代整合キャッシュ本体。RLS 段のみを適用して構築したアリーナと行 metadata の複製を、テーブル世代が変わらない限り再利用する（Issue #363）。

## Signature / Usage

```rust,ignore
/// `SqlArenaCache` のエントリ数上限（Issue #363。`core.rs::PrefilterCache`
/// （TASK-169）と同じ DoS 対策方針を踏襲する）。
const MAX_SQL_ARENA_CACHE_ENTRIES: usize = 32;

/// `SqlArenaCache` が保持するスナップショット群（アリーナ本体＋行 metadata 複製）の
/// 概算バイト量の合計上限（`core.rs::MAX_PREFILTER_CACHE_TOTAL_BYTES` と同じ桁に
/// 揃える）。
const MAX_SQL_ARENA_CACHE_TOTAL_BYTES: usize = crate::arena::MAX_ARENA_TOTAL_BYTES;

/// `SqlArenaCache` の観測用統計（Issue #363）。テナント ID・行 ID 等の機微情報は
/// 一切含まない。
#[derive(Debug, Clone, Copy, Default)]
pub struct SqlArenaCacheStats {
    /// キャッシュヒット数（テーブル世代整合まで確認できた再利用）。
    pub hits: u64,
    /// キャッシュミス数（未登録、またはテーブル世代不一致で破棄した後の再構築）。
    pub misses: u64,
    /// テーブル世代不一致による破棄回数。
    pub stale_evictions: u64,
    /// 容量上限超過による LRU 追い出し回数。
    pub capacity_evictions: u64,
    /// 現在キャッシュが保持しているエントリ数。
    pub entries: usize,
}

/// `sql::exec::execute_statement_with_cache` が `SqlArenaCache` に格納・再利用する
/// スナップショット（Issue #363）。`arena`（RLS 段のみを適用して構築した
/// `VectorArena`）と `metadata`（`arena` とスロット添字が 1 対 1 に対応する行
/// metadata の複製）を一組で保持する。SCALAR 段（`WHERE`）はクエリごとに異なる
/// ため事前適用しない（キャッシュヒット時にクエリごと `on_visible_row` を再適用する）。
pub(crate) struct SqlArenaSnapshot { /* ... */ }

/// `sql::exec::execute_statement_with_cache`（キャッシュミス時）が、RLS 通過行の
/// 採取結果（`crate::arena::SqlArenaCaptureBuilder::finish`）とクエリ実行時の
/// `ctx`・テーブル世代からスナップショットを組み立てる。
pub(crate) fn new(
    arena: VectorArena,
    metadata: Vec<Vec<u8>>,
    built_ctx: PolicyContext,
    built_table_generation: u64,
) -> Self;

pub(crate) fn arena(&self) -> &VectorArena;
pub(crate) fn metadata(&self) -> &[Vec<u8>];

/// `crate::sql::scalar_index::ScalarIndex::build` が索引の世代整合キー
/// （`built_ctx`）をこのスナップショットから引き継ぐための crate 内公開
/// アクセサ（Issue #473）。
pub(crate) fn built_ctx_for_index(&self) -> &PolicyContext;

/// `crate::sql::scalar_index::ScalarIndex::build` が索引の世代整合キー
/// （`built_table_generation`）をこのスナップショットから引き継ぐための
/// crate 内公開アクセサ（Issue #473）。
pub(crate) fn built_table_generation_for_index(&self) -> u64;

/// SQL 表層（`sql::exec::execute_statement_with_cache`）専用の `VectorArena` 世代
/// 整合キャッシュ本体。
pub(crate) struct SqlArenaCache { /* ... */ }

pub(crate) fn new() -> Self;

/// `(table, ctx)` に一致し、`read_txn` のスナップショットにおけるテーブル世代と
/// 整合するエントリを探す。ロック毒化・世代読み取り失敗はいずれも「見つから
/// なかった」として扱う（fail-closed。`core.rs::PrefilterCache::lookup` と同じ
/// 方針）。
///
/// `read_txn` は呼び出し元がこのクエリ全体で使う単一の read トランザクション
/// そのものを渡す契約とする（新規トランザクションを開かない）。
///
/// 世代不一致時の破棄条件（Issue #363 レビュー指摘対応・Cursor Bugbot 指摘。
/// Issue #357・`sql::sparse_cache::SparseIndexCache::lookup` と同じ契約）:
/// `read_txn` は呼び出し元ごとに異なるスナップショット（古い可能性がある）で
/// あり、`current_generation`（`read_txn` から読んだ世代）より新しいエントリが
/// 存在し得る。そのエントリは見つけ次第破棄はせず、`storage` から読んだ「真に
/// 最新の」世代と比較し、エントリがそれより厳密に古い場合
/// （`built_table_generation < true_current_generation`）に限り stale と判定して
/// 破棄する。
pub(crate) fn lookup(
    &self,
    storage: &Storage,
    read_txn: &redb::ReadTransaction,
    table: &str,
    ctx: &PolicyContext,
) -> Option<Arc<SqlArenaSnapshot>>;

/// 新規構築したスナップショットを挿入する。`storage` から新規に読んだテーブル
/// 世代と `snapshot.built_table_generation()` が一致しない場合（並行書き込みで
/// 挿入対象自身が既に古い）・世代を確認できない場合はキャッシュへの反映のみを
/// 諦める（`sql::sparse_cache::SparseIndexCache::insert` と同じ fail-closed 契約）。
///
/// 戻り値は常に `Arc<SqlArenaSnapshot>`（`Option` ではない）。キャッシュへ反映
/// できるかどうかに関わらず、呼び出し元は返されたスナップショットを「このクエリの
/// スナップショットから自分で構築した結果」としてそのまま使ってよい。
pub(crate) fn insert(
    &self,
    storage: &Storage,
    table: &str,
    ctx: &PolicyContext,
    snapshot: SqlArenaSnapshot,
) -> Arc<SqlArenaSnapshot>;

pub(crate) fn stats(&self) -> SqlArenaCacheStats;

/// `sql::exec::execute_statement_with_cache` へ渡すキャッシュアクセス束
/// （Issue #363）。`storage`（世代再読取用）と `cache` 本体を 1 引数へ束ねる
/// ことで、`execute_statement` の引数数を clippy の `too_many_arguments` 閾値内に
/// 保つ（`sql::sparse_cache::SparseCacheAccess` と同じ理由・構造）。impl メソッド
/// を持たない単純なフィールド束（`storage` / `cache` の 2 pub フィールド）。
pub(crate) struct ArenaCacheAccess<'a> { /* ... */ }
```

## Notes

- `SqlArenaCacheStats` のみ `pub`（`EngineCore::sql_arena_cache_stats` の固有 API として公開）。`SqlArenaSnapshot` / `SqlArenaCache` / `ArenaCacheAccess` はすべて `pub(crate)` であり `fandhe-vector-db-engine` の公開 API（`fandhe-vector-db` crate）からは到達しない
- `insert` の戻り値が常に `Arc<SqlArenaSnapshot>`（`Option` ではない）である fail-closed 契約は `sql::sparse_cache::SparseIndexCache::insert` と同型
- 関連 ADR: [`sql-arena-generation-cache`](https://raw.githubusercontent.com/Fandhe-AI/vector-db/7022d112e79760dca916480599553fcac256b5fb/docs/design/sql-arena-generation-cache.md)（Issue #363・Accepted。SQL 表層 `VectorArena` のテーブル世代整合キャッシュ化 = 本モジュールそのものの設計 ADR。`core.rs::PrefilterCache`〔TASK-169〕を前提とする）
- Distinct from `mssql` / `drizzle` / `supabase` connection pools / arena management: not a DB client pool, but a query-scoped table-generation-consistent cache for an RLS-applied arena internal to the engine.

## Related

- [scalar-index](./scalar-index.md)
- [exec](./exec.md)
- [visible-cache](./visible-cache.md)
