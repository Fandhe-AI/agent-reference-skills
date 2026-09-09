---
source: https://docs.rs/crate/fandhe-vector-db-engine/0.1.0/source/src/sql/scalar_index.rs
---

# sql::scalar_index

`sql::exec` の SCALAR 段（`WHERE` の等価・前方一致・`id` 単純比較条件）が全行走査（O(N)）の代わりに参照する、スカラー列二次索引の構築・テーブル世代整合キャッシュ・候補削減 API（Issue #473・#474）。対応 ADR: `scalar-secondary-index`。

## Signature / Usage

```rust,ignore
//! 消費経路: 本モジュールの照会 API（`ScalarIndex::candidates_for`・
//! `ScalarIndex::candidates_id_range`・`ScalarIndex::resolve_candidates`）は
//! `sql::exec::execute_statement_with_cache` の SCALAR 事前フィルタから、索引
//! 対応述語（`sql::scalar_plan::classify_scalar_plan` が `PlainScan` 以外へ
//! 分類した形状）を持つクエリに限って消費される。索引は候補スロットを「絞る」
//! ことしかできず「通す」ことはできないため、候補行にも `on_visible_row`
//! （`matches_all`＋式述語）が引き続き適用される。
//!
//! データモデル（`ScalarIndex`）: 構築元は `crate::sql::arena_cache::SqlArenaSnapshot`
//! （RLS 段適用済み・ctx 可視行のみを含むスナップショット）。索引のスロット番号は
//! このスナップショットのスロット（`snapshot.arena().ids()[slot]`／
//! `snapshot.metadata()[slot]` の添字）。`TEXT` 列ごとに値の辞書（バイト列昇順）と、
//! 値ごとの一致スロット列（CSR: `offsets`/`slots`）・等価直引き用 `HashMap` を持つ。
//! 加えて全行 `id` が `crate::sql::udf_call::id_as_finite_scalar` を満たす場合に限り、
//! `id` 昇順の順序索引（`id_index`）を保持する（1 件でも `id > 2^53` があれば
//! `None`。fail-closed）。`NULL` 値はいずれの索引にもエントリを作らない。
//!
//! 列単位の索引対象除外（Issue #632）: `TEXT` 列は平均値長（非 `NULL` 値の累積
//! バイト量 ÷ 件数）が `MAX_SCALAR_INDEX_COLUMN_AVG_TEXT_LEN` を超えた時点で、
//! それ以降一切複製・索引化されず `ColumnType::Vector` の列と同じ「未索引」
//! （`columns[i] = None`）へ合流する（列単位の fail-soft な縮退。構築全体は失敗
//! しない）。
//!
//! キャッシュ（`ScalarIndexCache`）: キー・世代源泉・fail-closed 契約は
//! `crate::sql::arena_cache::SqlArenaCache`（Issue #363）と同型
//! （`(table, ctx)` 完全一致 × テーブル単位世代）。ただし `ScalarIndexCache::insert`
//! は `SqlArenaCache::insert` とは意図的に非対称で、`core.rs::PrefilterCache::insert`
//! （Issue #280）と同じく世代不一致・ロック毒化・世代読み取り失敗をすべて `None`
//! として扱い、キャッシュへ反映しないだけでなく呼び出し元へも一切渡さない
//! （本索引はまだ誰にも消費されない派生データのため）。
//!
//! fail-closed の適用範囲: RLS 可視行のみから構築するため候補は構造的に可視集合の
//! 部分集合になる。構築失敗・容量超過・`id` 桁あふれはいずれも「索引なし」への
//! 縮退であり、クエリの成否・結果には影響しない。

/// `ScalarIndex::build` の失敗要因。いずれも呼び出し元（`sql::exec`）が「索引
/// なし」へ縮退する契機として扱うのみで、クエリ自体を失敗させない。
#[derive(Debug)]
pub(crate) enum ScalarIndexBuildError {
    /// スロット番号が `u32` に収まらない（`crate::arena::MAX_ARENA_ROWS` は
    /// `u32::MAX` 未満のため通常到達しないが、多層防御として検査する）。
    SlotOverflow,
    /// untrusted な行 metadata のデコードに失敗した。
    RowDecode(crate::row_codec::RowCodecError),
    /// アロケーション失敗（`try_reserve` 系）。
    AllocationFailed,
    /// 構築結果の概算バイト量が `MAX_SCALAR_INDEX_BYTES` を超えた。
    TooLarge,
}

/// `ScalarIndex::resolve_candidates` の結果（Issue #474: `sql::exec` が候補削減
/// を行うか全走査へ縮退するかの唯一の分岐点）。
pub(crate) enum CandidateResolution {
    /// 交差済み候補スロット（昇順）を使う。空 `Vec` は「一致 0 件」。
    Use(Vec<u32>),
    /// 索引対応述語のうち 1 つ以上が「列未索引」または `id_index` が `None`
    /// で判定不能だったため、索引を一切使わず全走査へ縮退する。
    FallbackNoIndex,
    /// 交差後の候補比が選択度切替閾値を超えた（索引経路より全走査が有利と
    /// 判断）ため縮退する。
    FallbackSelectivity,
}

/// `crate::sql::arena_cache::SqlArenaSnapshot` から構築するスカラー列二次索引本体。
pub(crate) struct ScalarIndex {
    built_ctx: PolicyContext,
    built_table_generation: u64,
    row_count: usize,
    /// `schema.columns` と同じ長さ・順序。`TEXT` 列のみ `Some`。
    columns: Vec<Option<TextColumnIndex>>,
    /// `id` 昇順に整列した `(id, slot)`。全行が `id_as_finite_scalar` を満たす
    /// 場合のみ `Some`（1 件でも `id > 2^53` があれば `None`）。
    id_index: Option<Vec<(u64, u32)>>,
    approx_bytes: usize,
}

impl ScalarIndex {
    /// `schema` と `snapshot`（RLS 段適用済みスナップショット）から索引を構築する。
    pub(crate) fn build(
        schema: &TableSchema,
        snapshot: &SqlArenaSnapshot,
    ) -> Result<Self, ScalarIndexBuildError>;

    /// `MetadataFilter` を評価し、一致スロットの昇順 `Vec<u32>` を返す。列が `TEXT`
    /// でない・未知の列は `None`。一致 0 件は `Some(vec![])`（`None` と区別する）。
    pub(crate) fn candidates_for(&self, filter: &MetadataFilter) -> Option<Vec<u32>>;

    /// `id` に対する範囲述語向け照会。`id_index` が `None` の場合は `None`。
    pub(crate) fn candidates_id_range(
        &self,
        lower: std::ops::Bound<u64>,
        upper: std::ops::Bound<u64>,
    ) -> Option<Vec<u32>>;

    /// `metadata_filters` と `id_preds`（`sql::scalar_plan::classify_scalar_plan` が
    /// `PlainScan` 以外へ分類した述語のみを渡す契約）から候補スロット集合を導出する
    /// （Issue #474）。
    pub(crate) fn resolve_candidates(
        &self,
        metadata_filters: &[MetadataFilter],
        id_preds: &[crate::sql::scalar_plan::IdPredicate],
    ) -> CandidateResolution;

    /// `column_index` 列（`TEXT` 列限定）の値ごとのグループを、値のバイト列昇順で
    /// 列挙する（Issue #475: `sql::group_by` の `WHERE` なし `GROUP BY` 列挙形が使う）。
    pub(crate) fn column_groups(
        &self,
        column_index: usize,
    ) -> Option<impl Iterator<Item = (&str, &[u32])> + '_>;
}

#[derive(Debug, Clone, Copy, Default)]
pub struct ScalarIndexCacheStats {
    pub hits: u64,
    pub misses: u64,
    pub stale_evictions: u64,
    pub capacity_evictions: u64,
    pub builds: u64,
    pub build_failures: u64,
    pub entries: usize,
    /// Issue #474: `sql::exec` が索引経路を実際に消費してクエリを実行した回数。
    pub index_scans: u64,
    /// Issue #654: `index_scans` のうち、候補行を `VectorArena` へ複製せずキャッシュ
    /// 済みスナップショットの `VectorArena` を借用したまま直接探索できた回数。
    pub index_mask_scans: u64,
    /// Issue #474: 索引対応述語を持つクエリで全走査へ縮退した回数。
    pub plain_scan_fallbacks: u64,
    /// Issue #475: `sql::aggregate`／`sql::group_by` が索引経路を実際に消費して
    /// 集計クエリを実行した回数。
    pub aggregate_index_scans: u64,
    /// Issue #475: 集計・`GROUP BY` クエリが索引対応述語・形状を持ちながら全走査へ
    /// 縮退した回数。
    pub aggregate_plain_scan_fallbacks: u64,
}

pub(crate) struct ScalarIndexCache {
    state: RwLock<ScalarIndexCacheState>,
    seq: AtomicU64,
    hits: AtomicU64,
    misses: AtomicU64,
    stale_evictions: AtomicU64,
    capacity_evictions: AtomicU64,
    builds: AtomicU64,
    build_failures: AtomicU64,
    index_scans: AtomicU64,
    index_mask_scans: AtomicU64,
    plain_scan_fallbacks: AtomicU64,
    aggregate_index_scans: AtomicU64,
    aggregate_plain_scan_fallbacks: AtomicU64,
}

/// `(table, ctx)` に一致し、`read_txn` のスナップショットにおけるテーブル世代と
/// 整合するエントリを探す（fail-closed。`SqlArenaCache::lookup` と同じ方針）。
pub(crate) fn lookup(
    &self,
    storage: &Storage,
    read_txn: &redb::ReadTransaction,
    table: &str,
    ctx: &PolicyContext,
) -> Option<Arc<ScalarIndex>>;

/// 新規構築した索引を挿入する。**戻り値は `Option<Arc<ScalarIndex>>`**（他 2
/// キャッシュの `insert` と異なり `Arc` 直接ではない。モジュールドキュメント
/// 「意図的に非対称」参照 — 世代不一致・ロック毒化時は呼び出し元へも一切渡さない）。
pub(crate) fn insert(
    &self,
    storage: &Storage,
    table: &str,
    ctx: &PolicyContext,
    index: ScalarIndex,
) -> Option<Arc<ScalarIndex>>;

pub(crate) struct ScalarCacheAccess<'a> {
    pub(crate) storage: &'a Storage,
    pub(crate) cache: &'a ScalarIndexCache,
}
```

## Notes

- main が pin SHA（`7022d112e79760dca916480599553fcac256b5fb`）で保存したソース（`src/engine/src/sql/scalar_index.rs`、約140KB）から Read で verbatim 転記・突き合わせ済み。`ScalarIndex::build` 等のメソッド本体・`ScalarIndexCache::lookup` / `insert` の関数本体は転記範囲を絞った（シグネチャ・doc comment は転記済み。本体ロジックは未転記）
- 関連 ADR（すべて `https://raw.githubusercontent.com/Fandhe-AI/vector-db/7022d112e79760dca916480599553fcac256b5fb/docs/design/<name>.md`）: [`scalar-secondary-index`](https://raw.githubusercontent.com/Fandhe-AI/vector-db/7022d112e79760dca916480599553fcac256b5fb/docs/design/scalar-secondary-index.md)（Issue #359・Accepted 提案。本モジュール全体の設計検討）、[`scalar-index-generation-cache`](https://raw.githubusercontent.com/Fandhe-AI/vector-db/7022d112e79760dca916480599553fcac256b5fb/docs/design/scalar-index-generation-cache.md)（Issue #473。索引構築とテーブル世代整合キャッシュ = `ScalarIndex::build` / `ScalarIndexCache`）、[`scalar-index-prune`](https://raw.githubusercontent.com/Fandhe-AI/vector-db/7022d112e79760dca916480599553fcac256b5fb/docs/design/scalar-index-prune.md)（Issue #474。`WHERE` 事前フィルタの等価・範囲述語を索引経路へ結線 = `resolve_candidates` の根拠）、[`scalar-index-aggregate`](https://raw.githubusercontent.com/Fandhe-AI/vector-db/7022d112e79760dca916480599553fcac256b5fb/docs/design/scalar-index-aggregate.md)（Issue #475。集計・`GROUP BY` 経路への結線 = `column_groups` の根拠）、[`scalar-index-mask-search`](https://raw.githubusercontent.com/Fandhe-AI/vector-db/7022d112e79760dca916480599553fcac256b5fb/docs/design/scalar-index-mask-search.md)（Issue #654・実装済み。候補集合を id マスクで直接探索し arena 複製を回避 = `index_mask_scans` 統計の根拠）
- spec 参照（`docs/spec/04-behavior/data-model.md` TABLE-12 等）はポインタのみで本文非公開のため未記載
- Distinct from `mssql` / `drizzle` / `supabase` secondary indexes: not a persistent SQL engine index, but a query-scoped table-generation-consistent cache internal to the engine.

## Related

- [exec](./exec.md)
- [scalar-plan](./scalar-plan.md)
- [arena-cache](./arena-cache.md)
