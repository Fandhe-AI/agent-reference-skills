---
source: https://docs.rs/crate/fandhe-vector-db-engine/0.1.0/source/src/sql/aggregate.rs
---

# sql::aggregate

集計 SELECT（`GROUP BY` なし・単一行結果、TASK-166・SQL-13）の実行本体。`GROUP BY` ありは `sql::group_by::execute_grouped_aggregate` が担う。`crate::arena::VectorArena` は使わず、対象テーブルの行テーブルをストリーミングで走査して O(1) メモリで単一行の `QueryResult` を組み立てる。

## Signature / Usage

```rust,ignore
//! 集計 SELECT（`GROUP BY` なし・単一行結果、TASK-166・SQL-13）の実行本体。
//! `GROUP BY` ありの複数行実行は `crate::sql::group_by::execute_grouped_aggregate`
//! （TASK-167・SQL-14）が担い、`execute_aggregate` は `BoundAggregate::group_by`
//! の有無で振り分けるだけの薄い分岐を持つ。
//!
//! 責務境界: `crate::sql::parser::bind_aggregate` が返す `BoundAggregate` を受け取り、
//! 対象テーブルの行テーブル（`user_rows/{table}`）をストリーミングで（可視行の
//! embedding・metadata を一度に確保せず、行ごとに判定・集約・破棄する O(1) メモリで）
//! 走査して単一行の `crate::sql::exec::QueryResult` を組み立てる。
//! `core.rs::EngineCore::execute_sql_in_session` の `Statement::Aggregate` アームから
//! 呼ばれる。
//!
//! `crate::arena::VectorArena`（既存の検索 SELECT 実行経路）は使わない: アリーナは
//! スキーマに `VECTOR` 列が必須で、かつ可視行の embedding を全件バッファへ確保する
//! ため、`VECTOR` 列を持たないテーブルの集計や大規模テーブルの `COUNT(*)` には
//! 過剰（メモリ）かつ非対応。
//!
//! RLS 適用順序は `crate::arena` モジュールの走査ループと同一の規約に揃える:
//! 行ヘッダから `tenant_id`・`visibility`・本体デコード再開オフセットを取り出し
//! （`crate::storage::decode_row_header`）、`crate::policy::PolicyContext::is_visible`
//! が `false` を返す行は embedding・metadata を一切デコードせずスキップする。

/// 型不整合・NULL 契約違反等の意味論的問題ではなく、`bind_aggregate` の型検査を
/// 通過したはずの `(AggregateFunc, AggregateInput)` の組み合わせが
/// `Accumulator::new` の網羅から漏れていた場合に返す（実装バグの検出用）。
pub(crate) fn accumulator_bug(detail: &str) -> SqlSurfaceError;

/// 可視行 1 件から取り出した `VECTOR` 列の値のビュー（Issue #350）。
pub(crate) struct RowVector<'a> {
    pub(crate) dim: u32,
    pub(crate) values: Option<&'a [f32]>,
}

/// `BoundAggregate` が実際に参照する列集合（Issue #350）。
pub(crate) struct ReferencedColumns {
    scalar_mask: Vec<bool>,
    needs_embedding: bool,
    needs_vector_presence: bool,
    has_scalar_reference: bool,
}

impl ReferencedColumns {
    pub(crate) fn derive(
        schema: &TableSchema,
        items: &[crate::sql::parser::BoundAggregateItem],
        metadata_filters: &[declarative_filter::MetadataFilter],
        expr_filters: &[BoundExpr],
        extra_scalar_index: Option<usize>,
    ) -> Self;
    pub(crate) fn scalar_mask(&self) -> &[bool];
    pub(crate) fn needs_embedding(&self) -> bool;
}

pub(crate) enum DecodeTier {
    /// `COUNT(*)`・`COUNT(id)`・`SUM`/`AVG`/`MIN`/`MAX(id)` のみ・`WHERE` 述語なし・
    /// `GROUP BY` なしの場合に限り選択する。`GROUP BY` はグループキー列を必ず読む
    /// 必要があるため到達しない。
    Fast,
    /// dim・metadata（マスク済み `scan_scalar_columns_masked`）まで。embedding は
    /// 構造検証のみで `Vec<f32>` へ確保しない。
    DimAndScalar,
    /// embedding を含む完全デコード。
    Embedding,
}

/// 集計項目 1 つの実行時アキュムレータ（TASK-166・SQL-13）。すべて O(1) 状態。
pub(crate) enum Accumulator {
    /// `COUNT(*)`・`COUNT(id)`・`COUNT(<VECTOR 列>)`・`COUNT(<Scalar 式>)`。
    Count(u64),
    /// `SUM(id)`。`checked_add` で正確に演算し、超過は `SqlSurfaceError::numeric_out_of_range`。
    IdSum(Option<u64>),
    /// `AVG(id)`。合計は `u64` で正確に保持し、`finish` で `f64` 化して除算する。
    IdAvg { sum: Option<u64>, count: u64 },
    IdMin(Option<u64>),
    IdMax(Option<u64>),
    /// `SUM(<Scalar 式>)`。加算のたびに `is_finite()` を検査する。
    FloatSum(Option<f64>),
    FloatAvg { sum: Option<f64>, count: u64 },
    /// `MIN(<Scalar 式>)`。`f64` は全順序を持たないため `total_cmp` で比較する。
    FloatMin(Option<f64>),
    FloatMax(Option<f64>),
    /// `MIN(<TEXT 列>)`。バイト順比較（`str::lt`/`str::gt`）。
    TextMin(Option<String>),
    TextMax(Option<String>),
}

impl Accumulator {
    pub(crate) fn new(func: AggregateFunc, input: &AggregateInput) -> Result<Self, SqlSurfaceError>;

    /// 可視行 1 件を観測して状態を更新する。`scanned` は同じ行の
    /// `row_codec::scan_scalar_columns_masked` 結果（借用のまま。`vector` が
    /// `values: None` を持つ場合は embedding 未デコードのため、そこへ到達する
    /// `ScalarExpr` は `accumulator_bug` で fail-closed に拒否する）。`scratch` は
    /// `crate::sql::expr_program::ExprProgram::eval` が使うスクラッチスタック
    /// （呼び出し元の行ループの外で確保し使い回す。Issue #353）。
    pub(crate) fn observe(
        &mut self,
        input: &AggregateInput,
        id: u64,
        vector: &RowVector<'_>,
        scanned: &[Option<&str>],
        scratch: &mut Vec<StackValue>,
    ) -> Result<(), SqlSurfaceError>;

    pub(crate) fn text_len(&self) -> usize;
    pub(crate) fn finish(self) -> Cell;
}

pub(crate) fn try_clone_str(value: &str) -> Result<String, SqlSurfaceError>;
pub(crate) fn storage_internal(e: impl Into<StorageError>) -> SqlSurfaceError;

/// `BoundAggregate` を実行し、単一行の `QueryResult` を返す（TASK-166・SQL-13）。
/// `Statement::Aggregate` の唯一の生産用エントリポイント（`core.rs`）はこの関数を
/// 使う（キャッシュを渡さない場合は `None`）。`GROUP BY` ありは
/// `crate::sql::group_by::execute_grouped_aggregate` へ分岐する。
///
/// Issue #478: `GROUP BY` なし・`WHERE` なしの `DecodeTier::Fast` に限り、
/// `visible_cache`（`crate::sql::visible_cache::VisibleBitmapCache`）が同一テーブル
/// 世代でヒットすれば `user_rows/{table}` を一切開かずに `visible_ids` を反復して
/// 集計する。ミス時は従来どおり全行走査するが、その走査に相乗りしてスナップ
/// ショットを構築し `insert` する。
pub(crate) fn execute_aggregate_with_cache(
    read_txn: &redb::ReadTransaction,
    ctx: &PolicyContext,
    schema: &TableSchema,
    bound: &BoundAggregate,
    visible_cache: Option<crate::sql::visible_cache::VisibleCacheAccess<'_>>,
    arena_cache: Option<crate::sql::arena_cache::ArenaCacheAccess<'_>>,
    scalar_cache: Option<crate::sql::scalar_index::ScalarCacheAccess<'_>>,
) -> Result<QueryResult, SqlSurfaceError>;

/// Issue #475: `WHERE` なし・索引対応述語のみの `WHERE` を持つ `GROUP BY` の候補
/// 走査形が使う、`ScalarIndex` 由来のスナップショット・索引を用意する（キャッシュ
/// ヒットならそのまま、ミスなら `capture_scalar_index_snapshot` で構築して両
/// キャッシュへ登録する）。`aggregate.rs`（`GROUP BY` なし）と `sql::group_by`
/// （`GROUP BY` あり）が共有する（crate 内公開）。
#[allow(clippy::too_many_arguments)]
pub(crate) fn ensure_scalar_index_snapshot(
    read_txn: &redb::ReadTransaction,
    ctx: &PolicyContext,
    schema: &TableSchema,
    table: &str,
    expected_dim: u32,
    arena_access: &crate::sql::arena_cache::ArenaCacheAccess<'_>,
    scalar_access: &crate::sql::scalar_index::ScalarCacheAccess<'_>,
) -> Option<(
    std::sync::Arc<crate::sql::arena_cache::SqlArenaSnapshot>,
    std::sync::Arc<crate::sql::scalar_index::ScalarIndex>,
)>;

/// Issue #475: `ScalarIndex::resolve_candidates` が絞った候補スロット（`snapshot`
/// 上の添字）を走査し、可視行と同じ SCALAR 段・集計判定を適用する。索引は候補を
/// 「絞る」ことしかできないため、ここで `matches_all`・式述語を候補行にも再適用
/// する（`sql::exec` の SELECT 経路と同じ多層防御）。
pub(crate) fn observe_candidate_slots(
    snapshot: &crate::sql::arena_cache::SqlArenaSnapshot,
    slots: &[u32],
    schema: &TableSchema,
    bound: &BoundAggregate,
    referenced: &ReferencedColumns,
    accumulators: &mut [Accumulator],
) -> Result<(), SqlSurfaceError>;
```

## Notes

- main が pin SHA（`7022d112e79760dca916480599553fcac256b5fb`）で保存したソース（`src/engine/src/sql/aggregate.rs`）から Read で verbatim 転記した（`Accumulator::observe` のシグネチャ・doc comment を含む）
- **`execute_aggregate` は旧名（PR #204 codex-review 第4ラウンド P1 対応）**: 上記フェンス内のモジュール doc comment（14行目相当「`execute_aggregate` は `BoundAggregate::group_by` の有無で振り分けるだけの薄い分岐を持つ」）は verbatim 引用のため `execute_aggregate` という関数名を含むが、`src/engine/src/sql/aggregate.rs` の `pub` 関数を確認するとこの名前の関数は 0.1.0 に存在しない。実体は本ページの `pub(crate) fn execute_aggregate_with_cache`（`GROUP BY` の有無で `sql::group_by::execute_grouped_aggregate` へ分岐する当該関数そのもの）であり、`core.rs::EngineCore` もこれを直接呼ぶ
- 関連 ADR: [`aggregate-decode-skip`](https://raw.githubusercontent.com/Fandhe-AI/vector-db/7022d112e79760dca916480599553fcac256b5fb/docs/design/aggregate-decode-skip.md)（Issue #350・Accepted。集計経路の embedding 非参照デコードスキップと必要列限定デコード = `DecodeTier` 設計そのもの）、[`scalar-index-aggregate`](https://raw.githubusercontent.com/Fandhe-AI/vector-db/7022d112e79760dca916480599553fcac256b5fb/docs/design/scalar-index-aggregate.md)（Issue #475。集計・`GROUP BY` 経路をスカラー列二次索引へ結線する設計 = `ensure_scalar_index_snapshot` / `observe_candidate_slots` の根拠）
- distinct from `mssql` / `drizzle` の集計クエリ（`GROUP BY` / 集約関数の SQL 方言そのものではなく、engine 内部のストリーミング集計実装）

## Related

- [group-by](./group-by.md)
- [exec](./exec.md)
- [scalar-index](./scalar-index.md)
- [visible-cache](./visible-cache.md)
