---
source: https://docs.rs/crate/fandhe-vector-db-engine/0.1.0/source/src/sql/visible_cache.rs
---

# sql::visible_cache

`sql::aggregate::execute_aggregate` 専用の可視行テーブル世代整合キャッシュ（Issue #478）。RLS 通過行の `id` 集合のみ（embedding・metadata は含まない）をキャッシュし、`COUNT(*)` 等の集計クエリで走査を省略する。

## Signature / Usage

```rust,ignore
/// `VisibleBitmapCache` の観測用統計（Issue #478）。テナント ID・行 ID・可視件数
/// 等の機微情報は一切含まない（`SqlArenaCacheStats`・`SparseIndexCacheStats` と
/// 同じ方針）。
#[derive(Debug, Clone, Copy, Default)]
pub struct VisibleBitmapCacheStats {
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

/// `sql::aggregate::execute_aggregate` が構築・再利用する可視行スナップショット。
/// `visible_ids` は物理走査順（`table.iter()` の複合キー `(tenant_id, id)` 昇順）に
/// 現れた可視行の `id` だけを保持し、embedding・metadata は一切含まない。
pub(crate) struct VisibleSnapshot {
    visible_ids: Vec<u64>,
    built_ctx: PolicyContext,
    built_table_generation: u64,
}

pub(crate) fn visible_ids(&self) -> &[u64];
fn built_ctx(&self) -> &PolicyContext;
fn built_table_generation(&self) -> u64;
/// キャッシュ容量判定用の概算バイト量。
fn approx_heap_bytes(&self) -> usize;

/// `VisibleSnapshot` を 1 行ずつ組み立てるビルダー。呼び出し元
/// （`sql::aggregate::execute_aggregate` の走査ループ）は、可視行と判定し
/// TABLE-12 の tenant 整合検査を通した行についてのみ `mark_visible` を呼ぶ
/// （不可視行・整合検査失敗行は呼ばない）。
pub(crate) struct VisibleSnapshotBuilder { /* ... */ }

pub(crate) fn new() -> Self;

/// テスト専用: 容量上限を注入したビルダーを構築する。`mark_visible`／`finish` の
/// 容量超過契約（DoS 対策のフォールバック）を、`MAX_VISIBLE_SNAPSHOT_ROWS`
/// （100 万件）そのものを投入せずに検証するためのフック。
#[cfg(test)]
fn with_capacity_for_test(capacity: usize) -> Self;

/// 可視行かつ TABLE-12 検査済みの `id` を記録する。上限超過後は記録を止め
/// `finish` が `None` を返すようにする（DoS 対策・容量超過時は非登録で
/// フォールバックする契約。走査・集計自体は呼び出し元が続行する）。
pub(crate) fn mark_visible(&mut self, id: u64);

/// 走査が正常に完了した場合にのみ呼ぶ。`ctx`・`table_generation` を添えて
/// `VisibleSnapshot` を確定する。容量超過時は `None`（非登録。呼び出し元は
/// 集計結果を返すのみでキャッシュへは反映しない）。
pub(crate) fn finish(
    self,
    built_ctx: PolicyContext,
    built_table_generation: u64,
) -> Option<VisibleSnapshot>;

/// `sql::aggregate::execute_aggregate` 専用の可視行テーブル世代整合キャッシュ本体。
pub(crate) struct VisibleBitmapCache { /* ... */ }

pub(crate) fn new() -> Self;

/// `(table, ctx)` に一致し、`read_txn` のスナップショットにおけるテーブル世代と
/// 整合するエントリを探す。ロック毒化・世代読み取り失敗はいずれも「見つから
/// なかった」として扱う（fail-closed。`SqlArenaCache::lookup` と同じ方針・同じ
/// 世代不一致時の破棄条件）。
pub(crate) fn lookup(
    &self,
    storage: &Storage,
    read_txn: &redb::ReadTransaction,
    table: &str,
    ctx: &PolicyContext,
) -> Option<Arc<VisibleSnapshot>>;

/// 新規構築したスナップショットを挿入する。挿入対象自身が既に古い場合・ロック
/// 毒化時・容量超過時はキャッシュへ反映しない（`SqlArenaCache::insert` と同じ
/// fail-closed 契約）。呼び出し元は戻り値を使わない（集計結果は同一走査で既に
/// 確定済みのため、`SqlArenaCache` と異なり `Arc` を呼び出し元へ返す必要がない）。
pub(crate) fn insert(
    &self,
    storage: &Storage,
    table: &str,
    ctx: &PolicyContext,
    snapshot: VisibleSnapshot,
);

pub(crate) fn stats(&self) -> VisibleBitmapCacheStats;

/// `sql::aggregate::execute_aggregate` へ渡すキャッシュアクセス束（`storage` は
/// 世代再読取用、`cache` は本体。`sql::arena_cache::ArenaCacheAccess` と同じ理由・
/// 構造）。
pub(crate) struct VisibleCacheAccess<'a> {
    pub(crate) storage: &'a Storage,
    pub(crate) cache: &'a VisibleBitmapCache,
}
```

## Notes

- `VisibleBitmapCacheStats` のみ `pub`（`EngineCore::visible_bitmap_cache_stats` の固有 API として公開）。他の型（`VisibleSnapshot` / `VisibleSnapshotBuilder` / `VisibleBitmapCache` / `VisibleCacheAccess`）はすべて `pub(crate)` であり `fandhe-vector-db-engine` の公開 API（`fandhe-vector-db` crate）からは到達しない
- `MAX_VISIBLE_SNAPSHOT_ROWS` は `crate::arena::MAX_ARENA_ROWS` と同値の定数（本ファイル内で `const MAX_VISIBLE_SNAPSHOT_ROWS: usize = MAX_ARENA_ROWS;` と定義。`MAX_ARENA_ROWS` 自体の具体値は `arena.rs` 側にあり本 scope では未確認）
- 関連 ADR: [`visible-bitmap-cache`](https://raw.githubusercontent.com/Fandhe-AI/vector-db/7022d112e79760dca916480599553fcac256b5fb/docs/design/visible-bitmap-cache.md)（Issue #478・Accepted。可視ビットマップの世代整合キャッシュ = 本モジュールそのものの設計 ADR。スコープを Fast tier 集計へ限定。前提 Issue #464）、[`visible-bitmap-cache-verification`](https://raw.githubusercontent.com/Fandhe-AI/vector-db/7022d112e79760dca916480599553fcac256b5fb/docs/design/visible-bitmap-cache-verification.md)（Issue #479。非漏えい・前後比較検証）
- Distinct from `mssql` / `drizzle` / `supabase` visibility / row-level security: an RLS bitmap cache implementation, not a SQL dialect visibility syntax.

## Related

- [aggregate](./aggregate.md)
- [arena-cache](./arena-cache.md)
