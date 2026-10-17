---
source: https://docs.rs/crate/fandhe-db-engine/0.2.0/source/src/sql/generation_key.rs
---

# sql::generation_key

実行計画の複数テーブル対応基盤（SQL-28・RLS-10、TASK-212、Issue #924）その 2: 複数テーブルの `(table, generation)` 集合を鍵とする汎用の世代整合キャッシュ `GenerationKeyedCache`。

## Signature / Usage

```rust,ignore
//! 既存の 5 キャッシュ（`SqlArenaCache`・`SparseIndexCache`・`ScalarIndex`・
//! `VisibleBitmapCache`・`hnsw_cache`）はいずれも単一テーブルの `(table, ctx)` を鍵に
//! 持つ。本モジュールはそれらと同じ fail-closed 契約（`lookup`/`insert` の
//! 非対称・世代不一致時の破棄条件）を、複数テーブルの鍵集合へ一般化して
//! **一度だけ**実装する。本 Issue では既存 5 キャッシュをこちらへ移行しない
//! （性能不変を優先。`docs/design/multi-relation-plan-foundation.md` 参照）。

#[derive(Debug, Clone, Copy, Default)]
pub struct GenerationKeyedCacheStats {
    pub hits: u64,
    pub misses: u64,
    pub stale_evictions: u64,
    pub capacity_evictions: u64,
    pub entries: usize,
}

#[derive(Debug, Clone, PartialEq, Eq)]
pub struct TableGenerationKey {
    ctx: PolicyContext,
    tables: Vec<(String, u64)>,
}

impl TableGenerationKey {
    pub fn capture(
        read_txn: &impl crate::storage::read_source::ReadSource,
        ctx: PolicyContext,
        tables: &[&str],
    ) -> crate::catalog::Result<Self>;
    pub fn table_names(&self) -> impl Iterator<Item = &str>;
    pub fn involves(&self, table: &str) -> bool;
}

pub trait ApproxHeapBytes {
    fn approx_heap_bytes(&self) -> usize;
}

pub struct GenerationKeyedCache<V> { /* state, seq, hits, misses, ... */ }

impl<V: ApproxHeapBytes> GenerationKeyedCache<V> {
    pub fn new(total_bytes_limit: usize) -> Self;
    pub fn lookup(
        &self,
        storage: &Storage,
        read_txn: &redb::ReadTransaction,
        ctx: &PolicyContext,
        key: &TableGenerationKey,
    ) -> Option<Arc<V>>;
    pub fn insert(&self, storage: &Storage, key: TableGenerationKey, value: V) -> Arc<V>;
    pub fn stats(&self) -> GenerationKeyedCacheStats;
}
```

## Options / Props

| Name | Value | Description |
|------|-------|-------------|
| `MAX_ENTRIES` | 32 | エントリ数上限（既存キャッシュ群と同じ DoS 対策方針。Issue #363・#357） |
| `total_bytes_limit` | `new` の引数 | 保持エントリの概算バイト量合計の上限（`crate::arena::MAX_ARENA_TOTAL_BYTES` と同じ桁を渡す想定） |
| `TableGenerationKey::capture` | — | 単一の `read_txn` から `tables` 全件の世代を確定。テーブル名は昇順ソート・重複除去。空は `CatalogError::Invalid`、`MAX_TABLE_REFS` 超過も `Invalid`（`Vec` 確保前に検証） |

## Notes

- 出典は `fandhe-db-engine` 0.2.0（git SHA `dc888f6ea146d3078153d64a6848f5c8cf044431`）の `src/sql/generation_key.rs`（全485行、テスト除く先頭 327 行）。公開アイテムのシグネチャと主要 doc comment の抜粋で、private の `matches` / `is_strictly_stale` / `key_table_matches` と本体は掲載していない
- `lookup` / `insert` は非対称契約: `lookup` はロック毒化・世代読み取り失敗を「見つからなかった」として扱い（fail-closed）、`insert` はキャッシュ反映を諦める場合（挿入対象自身が既に stale・ロック毒化・容量超過）でも戻り値は常に `Arc<V>`
- `insert` の世代不一致による一括破棄は、挿入キーのテーブルのいずれかを含みそのテーブルの世代が食い違うエントリに限る（無関係なテーブルのみのエントリは巻き添えにしない）。容量超過時は `last_used` が最小のエントリから追い出す（`capacity_evictions`）
- 統計はテナント ID・行 ID 等の機微情報を含まない
- `relation_snapshot` が `RelationSnapshotCache = GenerationKeyedCache<RelationSnapshot>` として使用する
- distinct from `upstash` / `tanstack-query`: fandhe-db 内部のテーブル世代ベースのキャッシュであり、外部 KV やクエリキャッシュライブラリとは別物

## Related

- [relation-snapshot](./relation-snapshot.md)
- [visible-cache](./visible-cache.md)
- [arena-cache](./arena-cache.md)
