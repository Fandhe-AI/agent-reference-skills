---
source: https://docs.rs/crate/fandhe-db-engine/0.2.0/source/src/sql/aggregate.rs
---

# sql::aggregate

集計 SELECT（`GROUP BY` なし・単一行結果、TASK-166・SQL-13）の実行本体。`GROUP BY` ありは `sql::group_by::execute_grouped_aggregate` が担う。`crate::arena::VectorArena` は使わず、対象テーブルの行テーブルをストリーミングで走査して O(1) メモリで単一行の `QueryResult` を組み立てる。0.2.0 では `execute_aggregate` が engine クレート外向けの公開ラッパーとして追加された（TASK-186・NOSQL-4・NOSQL-5）。

## Signature / Usage

```rust,ignore
//! 集計 SELECT（`GROUP BY` なし・単一行結果、TASK-166・SQL-13）の実行本体。
//! `GROUP BY` ありの複数行実行は `crate::sql::group_by::execute_grouped_aggregate`
//! （TASK-167・SQL-14）が担い、`execute_aggregate_with_cache` は
//! `BoundAggregate::group_by` の有無で振り分けるだけの薄い分岐を持つ。
//! `execute_aggregate` は engine クレート外向けの公開ラッパー（TASK-186・
//! NOSQL-4・NOSQL-5）で `execute_aggregate_with_cache` へキャッシュ `None` で
//! 委譲するのみ。
//!
//! 責務境界: `crate::sql::parser::bind_aggregate` が返す
//! `crate::sql::parser::BoundAggregate` を受け取り、対象テーブルの行テーブル
//! （`user_rows/{table}`）を**ストリーミングで**（可視行の embedding・metadata を
//! 一度に確保せず、行ごとに判定・集約・破棄する O(1) メモリで）走査して単一行の
//! `crate::sql::exec::QueryResult` を組み立てる。`core.rs::EngineCore::execute_sql_in_session`
//! の `Statement::Aggregate` アームから呼ばれる。
//!
//! `crate::arena::VectorArena`（既存の検索 SELECT 実行経路）は使わない: アリーナは
//! スキーマに `VECTOR` 列が必須（`validated_vector_dim_in_txn`）で、かつ可視行の
//! embedding を全件バッファへ確保するため、`VECTOR` 列を持たないテーブルの集計や
//! 大規模テーブルの `COUNT(*)` には過剰（メモリ）かつ非対応（対象ビヘイビア:
//! SQL-13 は `VECTOR` 列なしテーブルでの集計を要求する）。
//!
//! RLS 適用順序は `crate::arena` モジュールの走査ループと同一の規約に揃える:
//! 行ヘッダから `tenant_id`・`visibility`・本体デコード再開オフセットを取り出し
//! （`crate::storage::decode_row_header`）、`crate::policy::PolicyContext::is_visible`
//! が `false` を返す行は embedding・metadata を一切デコードせずスキップする。
//! 可視行はまず物理キー側 `tenant_id`（`key_tenant`）とヘッダ側 `tenant_id` の
//! 整合検査（TABLE-12）を `tier` に関わらず必ず経てから、実際にクエリが参照する
//! データだけを段階的にデコードして SCALAR 段（`WHERE`）・集計へ進む
//! （`ReferencedColumns`・`DecodeTier` 参照。Issue #350）。`DecodeTier::Fast`・
//! `DecodeTier::DimAndScalar` は `storage::decode_row_dim_and_metadata_borrowed`
//! （ヒープ確保を伴わない構造検証・embedding 自体は `Vec<f32>` へ確保しない）を
//! 必ず通す（PR #369: `DecodeTier::Fast` が構造検証を省略すると破損した可視行を
//! 集計結果へ含めてしまう fail-open になるため）。`COUNT` 等の集計値から他テナント行の
//! 存在・件数を推測できないという契約（RLS-7・RLS-8）は、この「不可視行は集約対象に
//! 一切現れない」という走査自体の構造で担保する。

/// 型不整合・NULL 契約違反等の意味論的問題ではなく、`bind_aggregate` の型検査を
/// 通過したはずの `(AggregateFunc, AggregateInput)` の組み合わせが
/// `Accumulator::new` の網羅から漏れていた場合に返す（実装バグの検出用。
/// untrusted 入力起因ではないため `wire_code` は `XX000`）。
pub(crate) fn accumulator_bug(detail: &str) -> SqlSurfaceError;

/// 単一行集計（`GROUP BY` なし）の既定の結果バイト予算（PR #1049 レビュー指摘 P0 対応）。
/// `sql::cursor` の `DECLARE` 経由の呼び出しだけがより小さい予算
/// （`MAX_CURSOR_BYTES_PER_SESSION`）を明示的に渡す。
pub(crate) const MAX_AGGREGATE_RESULT_BYTES: usize = crate::arena::MAX_ARENA_TOTAL_BYTES;

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
    /// `items`・`metadata_filters`・`expr_filters` に加え、`GROUP BY` キー列
    /// （`extra_scalar_indices`。SQL-25 (d) で複数列 `GROUP BY` に対応するため
    /// `Option<usize>` からスライスへ拡張した。`GROUP BY` なしでは空スライス）から
    /// 参照列集合を導出する。
    pub(crate) fn derive(
        schema: &TableSchema,
        items: &[crate::sql::parser::BoundAggregateItem],
        metadata_filters: &[declarative_filter::MetadataFilter],
        expr_filters: &[BoundExpr],
        or_filters: &[crate::sql::where_tree::BoundOrGroup],
        extra_scalar_indices: &[usize],
    ) -> Self;
    pub(crate) fn scalar_mask(&self) -> &[bool];
    pub(crate) fn needs_embedding(&self) -> bool;
}

/// 可視行 1 件のデコード段階（Issue #350）。段階が進むほどデコードコストが増える
/// （`Fast` < `DimAndScalar` < `Embedding`）。可視性判定・TABLE-12 のキー/ヘッダ
/// tenant 整合検査はどの段階でも必ず行う。
pub(crate) enum DecodeTier {
    /// `COUNT(*)`・`COUNT(id)`・`SUM`/`AVG`/`MIN`/`MAX(id)` のみ・`WHERE` 述語なし・
    /// `GROUP BY` なしの場合に限り選択する。`DimAndScalar` との違いは metadata の
    /// `&str` 化・保持（`scan_scalar_columns_masked`）を省略する点のみ。
    Fast,
    /// dim・metadata（マスク済み `scan_scalar_columns_masked`）まで。embedding は
    /// 構造検証のみで `Vec<f32>` へ確保しない。
    DimAndScalar,
    /// embedding を含む完全デコード。
    Embedding,
}

/// 単一行集計（`GROUP BY` なし）の `DecodeTier` 選択本体（Issue #894 で抽出）。
pub(crate) fn select_decode_tier(referenced: &ReferencedColumns, has_expr_filters: bool) -> DecodeTier;

/// `EXPLAIN`（Issue #922・SQL-27）の集計文向け `scalar_plan`／`access_path` を決定する。
/// executor の実行時ゲートと同じ判定式から静的に導出する単一情報源。
/// `arena_cache`／`scalar_cache` の構築可否・ヒット/ミスという実行時の縮退結果は
/// テナント存在情報に繋がるため入力に含めない。
pub(crate) fn classify_aggregate_access(
    schema: &TableSchema,
    bound: &BoundAggregate,
    target: &Result<crate::sql::scalar_index::ScalarIndexTargetOwned, ()>,
) -> (
    crate::sql::scalar_plan::ScalarPlan,
    crate::sql::explain::AccessPath,
);

/// 集計項目 1 つの実行時アキュムレータ（TASK-166・SQL-13）。すべて O(1) 状態
/// （`TextMin`/`TextMax` のみ、新しい極値を更新するたびに高々 1 本の `String` を保持し直す）。
/// `Clone`（SQL-30・TASK-214、Issue #930）: `sql::window::execute_window_scan` が
/// ORDER BY ありのウィンドウ集計で `clone().finish()` によるスナップショットを取るために使う。
#[derive(Clone)]
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
    /// `SUM(<REAL 列>)`（Issue #1173）。累積は `f64` で行い、`finish` で `f32` へ丸める（範囲超過は `22003`）。
    RealSum(Option<f64>),
    FloatAvg { sum: Option<f64>, count: u64 },
    /// `MIN(<Scalar 式>)`。`f64` は全順序を持たないため `total_cmp` で比較する。
    FloatMin(Option<f64>),
    FloatMax(Option<f64>),
    /// `MIN(<TEXT 列>)`。バイト順比較（`str::lt`/`str::gt`）。
    TextMin(Option<String>),
    TextMax(Option<String>),
    /// `SUM(<INTEGER>/<BIGINT>)`（Issue #892・D2）。`i128` の `checked_add` で正確に累積し、
    /// `finish` で `i64` 範囲を検査する。
    IntSum(Option<i128>),
    /// `AVG(<INTEGER>/<BIGINT>)`（D3）。結果は `Cell::Float`。
    IntAvg { sum: Option<i128>, count: u64 },
    IntMin(Option<i64>),
    IntMax(Option<i64>),
    /// `SUM(<NUMERIC(p,s)>)`（D5）。`unscaled` を `i128` で累積し、`finish` で
    /// `Decimal::fits_precision(MAX_PRECISION)` を検査する。
    NumericSum { sum: Option<i128>, scale: u8 },
    /// `AVG(<NUMERIC(p,s)>)`（D6）。結果 scale は `max(s, min(16, 38 - (p - s)))`。
    NumericAvg { sum: Option<i128>, count: u64, precision: u8, scale: u8 },
    NumericMin { value: Option<i128>, scale: u8 },
    NumericMax { value: Option<i128>, scale: u8 },
    /// `MIN`/`MAX(<DATE>)`（D7）。1970-01-01 起点の日数（`i32`）。
    DateMin(Option<i32>),
    DateMax(Option<i32>),
    /// `MIN`/`MAX(<TIMESTAMP>)`。1970-01-01 起点のマイクロ秒（`i64`）。
    TimestampMin(Option<i64>),
    TimestampMax(Option<i64>),
    /// `COUNT(DISTINCT <expr>)`（SQL-25 (c)・TASK-209）。`seen` は正準化済みキーの集合、
    /// `bytes` はそのキーの累計バイト数。`HashSet` は標準の SipHash（ランダム鍵）で構築される。
    CountDistinct { seen: std::collections::HashSet<Vec<u8>>, bytes: usize },
}

impl Accumulator {
    /// `BoundAggregateItem` からアキュムレータを作る（SQL-25 (c)・TASK-209）。
    /// `item.distinct` が `true` なら `CountDistinct` を、それ以外は `Self::new` へ委譲する。
    pub(crate) fn for_item(item: &crate::sql::parser::BoundAggregateItem) -> Result<Self, SqlSurfaceError>;

    /// `CountDistinct` が現在保持しているエントリ数・累計バイト数（それ以外は常に `(0, 0)`）。
    pub(crate) fn distinct_footprint(&self) -> (usize, usize);

    pub(crate) fn new(func: AggregateFunc, input: &AggregateInput) -> Result<Self, SqlSurfaceError>;

    /// 可視行 1 件を観測して状態を更新する。`scanned` は同じ行の
    /// `row_codec::scan_scalar_columns_masked` 結果（借用のまま）。`vector` が
    /// `values: None` を持つ場合は embedding 未デコードのため、そこへ到達する
    /// `ScalarExpr` は `accumulator_bug` で fail-closed に拒否する。`scratch` は
    /// `ExprProgram::eval` が使うスクラッチスタック（行ループの外で確保し使い回す。Issue #353）。
    pub(crate) fn observe(
        &mut self,
        input: &AggregateInput,
        id: u64,
        vector: &RowVector<'_>,
        scanned: &[Option<row_codec::ScalarRef<'_>>],
        scratch: &mut Vec<StackValue>,
    ) -> Result<(), SqlSurfaceError>;

    pub(crate) fn observe_present_n(&mut self, n: u64) -> Result<(), SqlSurfaceError>;
    pub(crate) fn text_len(&self) -> usize;

    /// 空集合契約: `COUNT` は `0`、それ以外は `NULL`（PostgreSQL 互換）。
    /// Issue #892: `SUM(INTEGER/BIGINT)` の `i64` 範囲検査、`SUM`/`AVG(NUMERIC)` の
    /// 38 桁上限検査をここで確定的に行うため `Result` を返す（`22003`）。
    pub(crate) fn finish(self) -> Result<Cell, SqlSurfaceError>;
}

pub(crate) fn try_clone_str(value: &str) -> Result<String, SqlSurfaceError>;
pub(crate) fn storage_internal(e: impl Into<StorageError>) -> SqlSurfaceError;

/// `BoundAggregate` を実行する（TASK-186・NOSQL-4・NOSQL-5 の公開 API）。
/// `visible_cache`・`arena_cache`・`scalar_cache` の各型が属するモジュールがいずれも
/// `pub(crate)` のため crate 外から構築不能で、本関数はすべてに `None` を渡し
/// キャッシュ最適化を経由しない新規走査のみの経路として動作する。
pub fn execute_aggregate(
    read_txn: &impl crate::storage::read_source::ReadSource,
    ctx: &PolicyContext,
    schema: &TableSchema,
    bound: &BoundAggregate,
) -> Result<QueryResult, SqlSurfaceError>;

/// `BoundAggregate` を実行し、単一行の `QueryResult` を返す（TASK-166・SQL-13）。
/// `Statement::Aggregate` の唯一の生産用エントリポイント（`core.rs`）。`GROUP BY` ありは
/// `crate::sql::group_by::execute_grouped_aggregate` へ分岐する。
///
/// Issue #478: `GROUP BY` なし・`WHERE` なしの `DecodeTier::Fast` に限り、
/// `visible_cache` が同一テーブル世代でヒットすれば `user_rows/{table}` を一切開かずに
/// `visible_ids` を反復して集計する。ミス時は全行走査に相乗りしてスナップショットを構築し `insert` する。
///
/// 書き込みトランザクション由来（自トランザクションの未 commit 変更を読む経路。Issue #1179）では
/// テーブル世代キーのキャッシュを一切使わない。
#[allow(clippy::too_many_arguments)]
pub(crate) fn execute_aggregate_with_cache(
    read_txn: &impl crate::storage::read_source::ReadSource,
    ctx: &PolicyContext,
    schema: &TableSchema,
    bound: &BoundAggregate,
    // PR #1049 P0: 集計結果（`MIN`/`MAX(<TEXT 列>)` の累計バイト数。`GROUP BY` ありは
    // グループキー・TEXT 集計状態の累計）が、生成中に頭打ちになるようにする上限。
    // 通常は `MAX_AGGREGATE_RESULT_BYTES`、`DECLARE` の内側実行だけがより小さい
    // `MAX_CURSOR_BYTES_PER_SESSION` を渡す。
    max_result_bytes: usize,
    visible_cache: Option<crate::sql::visible_cache::VisibleCacheAccess<'_>>,
    arena_cache: Option<crate::sql::arena_cache::ArenaCacheAccess<'_>>,
    scalar_cache: Option<crate::sql::scalar_index::ScalarCacheAccess<'_>>,
) -> Result<QueryResult, SqlSurfaceError>;

/// 集計項目の結果列の静的型（Issue #1173。WIRE-13・TABLE-13 のポインタ）。
/// wire-server が型 OID を公告する根拠（`ColumnMeta::Computed` の `ty`）で、
/// `Accumulator::finish` が返す `Cell` の型と 1 対 1 に対応する唯一の情報源。
/// 例: `COUNT` → `BigInt`、`SUM/MIN/MAX(id)` → `Numeric { precision: 20, scale: 0 }`、
/// `AVG(id)` → `Double`、`SUM(INTEGER/BIGINT)` → `BigInt`、`SUM(REAL)` → `Real`。
pub(crate) fn aggregate_result_type(
    func: AggregateFunc,
    input: &AggregateInput,
) -> Option<crate::catalog::ColumnType>;

/// 集計（`GROUP BY` の有無を問わない）の出力列メタを `bound.projection` の列順で組み立てる
/// （Issue #1173）。実行経路と Describe（`sql::describe::aggregate_columns`）が共有する。
/// `GROUP BY` キー列の型は束縛したキー対象から導出する（Issue #1407）。
pub(crate) fn aggregate_projection_columns(
    bound: &BoundAggregate,
    schema: &TableSchema,
) -> Result<Vec<ColumnMeta>, SqlSurfaceError>;

pub(crate) fn count_star_only(items: &[crate::sql::parser::BoundAggregateItem]) -> bool;

/// Issue #475: `WHERE` なし・索引対応述語のみの `WHERE` を持つ `GROUP BY` の候補
/// 走査形が使う、`ScalarIndex` 由来のスナップショット・索引を用意する（キャッシュ
/// ヒットならそのまま、ミスなら構築して両キャッシュへ登録する）。
/// `aggregate.rs`（`GROUP BY` なし）と `sql::group_by`（`GROUP BY` あり）が共有する。
/// 索引宣言（Issue #1065）の解決は、実際に構築が必要になった場合にのみ行う。
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

/// Issue #475: `ScalarIndex::resolve_candidates` が絞った候補スロット（`snapshot` 上の添字）を
/// 走査し、可視行と同じ SCALAR 段・集計判定を適用する。索引は候補を「絞る」ことしかできないため、
/// ここで `matches_all`・式述語を候補行にも再適用する（多層防御）。
pub(crate) fn observe_candidate_slots(
    snapshot: &crate::sql::arena_cache::SqlArenaSnapshot,
    slots: &[u32],
    schema: &TableSchema,
    bound: &BoundAggregate,
    referenced: &ReferencedColumns,
    accumulators: &mut [Accumulator],
    // PR #1049 P0: `MIN`/`MAX(<TEXT 列>)` の累計バイト数予算（索引経由の候補走査は
    // 全走査ループと別の実行経路のため、同じ予算検査を独立して適用する）。
    max_result_bytes: usize,
) -> Result<(), SqlSurfaceError>;
```

## Notes

- 型定義とシグネチャは `fandhe-db-engine` 0.2.0（git SHA `dc888f6ea146d3078153d64a6848f5c8cf044431`）の `src/sql/aggregate.rs` から更新した（0.1.0 の pin SHA は `7022d112e79760dca916480599553fcac256b5fb`）。`Accumulator` の各 variant・`for_item`・`distinct_footprint`・`finish` / `execute_aggregate_with_cache` / `ensure_scalar_index_snapshot` の doc comment は要旨を転記しており、関数本体や `observe` 内部の型別分岐は未転記
- Migration (0.1.0 → 0.2.0): `execute_aggregate` が `pub` ラッパーとして新設された（0.1.0 に同名の関数は無く、0.1.0 の `execute_aggregate_with_cache` が実体だった）。`execute_aggregate_with_cache` は第 1 引数が `&impl ReadSource` に変わり、`max_result_bytes: usize` が追加された。`Accumulator::finish` は `Cell` ではなく `Result<Cell, SqlSurfaceError>` を返す。`Accumulator::observe` の `scanned` は `&[Option<&str>]` から `&[Option<row_codec::ScalarRef<'_>>]` へ変わった。`ReferencedColumns::derive` は `or_filters` を受け取り、`extra_scalar_index: Option<usize>` が `extra_scalar_indices: &[usize]` に変わった（複数列 `GROUP BY`。SQL-25 (d)）
- 集計対象の型が `INTEGER` / `BIGINT` / `REAL` / `DOUBLE PRECISION` / `NUMERIC` / `DATE` / `TIMESTAMP` 列へ拡大された（Issue #892）。`COUNT(DISTINCT <expr>)` に対応（SQL-25 (c)・TASK-209）。`SUM(id)` / `MIN` / `MAX(id)` の結果型は `NUMERIC(20,0)` として公告される（`aggregate_result_type`）
- 関連 ADR: [`aggregate-decode-skip`](https://raw.githubusercontent.com/Fandhe-AI/fandhe-db/dc888f6ea146d3078153d64a6848f5c8cf044431/docs/design/aggregate-decode-skip.md)（Issue #350・Accepted。集計経路の embedding 非参照デコードスキップと必要列限定デコード = `DecodeTier` 設計そのもの）、[`scalar-index-aggregate`](https://raw.githubusercontent.com/Fandhe-AI/fandhe-db/dc888f6ea146d3078153d64a6848f5c8cf044431/docs/design/scalar-index-aggregate.md)（Issue #475。集計・`GROUP BY` 経路をスカラー列二次索引へ結線する設計 = `ensure_scalar_index_snapshot` / `observe_candidate_slots` の根拠）。両 ADR は pin SHA `dc888f6` の `docs/design/` に存在することを確認した（本文の再転記はしていない）
- distinct from `mssql` / `drizzle` の集計クエリ（`GROUP BY` / 集約関数の SQL 方言そのものではなく、engine 内部のストリーミング集計実装）

## Related

- [group-by](./group-by.md)
- [exec](./exec.md)
- [scalar-index](./scalar-index.md)
- [visible-cache](./visible-cache.md)
