---
source: https://docs.rs/crate/fandhe-db-engine/0.2.0/source/src/sql/explain.rs
---

# sql::explain

`EXPLAIN`（TASK-78・SQL-6）応答の構築。`core.rs::EngineCore::execute_sql_in_session` の `Statement::Explain` アームが LLM クエリ展開・モード解決（`EngineCore::plan_query_with_mode`）した結果（`PlannedQuery`）と、検索エンジン種別・ANN 静的適用判定（`ExplainEngine`、Issue #411）を受け取り、クライアントが確認できる `QUERY PLAN` 単一列の `QueryResult` へ決定的に整形する。純粋な整形ロジックのみを持ち、DB I/O・LLM 呼び出しは行わない。

## Signature / Usage

~~~rust,ignore
//! `EXPLAIN`（TASK-78・SQL-6）応答の構築。`core.rs::EngineCore::
//! execute_sql_in_session` の `Statement::Explain` アームが LLM クエリ展開・
//! モード解決（`EngineCore::plan_query_with_mode`、TASK-164・PLAN-11）した結果
//! （[`PlannedQuery`]）と、検索エンジン種別・ANN 静的適用判定
//! （[`ExplainEngine`]、Issue #411）を受け取り、クライアントが確認できる
//! `QUERY PLAN` 単一列の [`QueryResult`] へ決定的に整形するところまでを担う。
//!
//! 責務境界: 本モジュールは純粋な整形ロジックのみを持つ（DB I/O・LLM 呼び出しは
//! 行わない。呼び出し元 `core.rs` が LLM 展開・モード解決・[`ExplainEngine`] の
//! 組み立てを完了させたうえで [`build_explain_result`] を呼ぶ）。`EXPLAIN` は
//! 検索本体（ハイブリッド実行）を実行しないため、行の `id`/`score` は実在行を
//! 持たない疑似値（`0`）とする。`engine:`／`ann_plan:` 行も実行時の縮退結果では
//! なく、クエリ形状とエンジン設定から決まる**静的判定**
//! （`sql::hnsw_cache::classify_ann_plan`）をそのまま報告する（実行時
//! fail-closed 縮退・hybrid 再取得ラウンド数は対象外。可視カーディナリティ・
//! 閾値・行数等のテナント存在情報に繋がる数値は一切含めない。security.md
//! 「テナント境界」対応）。
//!
//! 行内容は SQL-6・SQL-12（TASK-161・PLAN-11）が要求する「展開後の検索語・
//! ソフトヒント・解決済み実効モードと指定元」に、Issue #411 で「使用エンジン・
//! ANN パラメータ・適用判定」を追記したもの。決定的順序・英語表記（プログラム
//! 出力文字列は英語）で並べる。一度出した行の形式・順序は**安定契約**として
//! 今後変更しない（`sql::mode::ModeSource::as_str` のドキュメントコメントと
//! 同じ方針）。既存 6 行（`search_terms[i]`…`mode_source`）は不変、新規行は
//! `mode_source` の直後へ追記のみで既定エンジン時の出力は変更前と後方互換
//! （TASK-164 で `mode_source` を追加した前例と同じ方針）。security.md P0:
//! LLM プロンプト本文・生応答本文は含めず、厳格パース済みの構造化フィールド
//! （[`crate::query_planner::QueryExpansion`]）のみを使う。
//!
//! `docs/design/explain-search-engine-exposure.md` に露出する行・語彙・
//! 露出しない値と理由をまとめる。
//!
//! Issue #1066（TASK-206・INDEX-7・SQL-6・SQL-27）: `ann_plan:`／`scalar_plan:`
//! 行は、索引経路を使う場合に限り既存トークンの末尾へ `index=<name>[,<name>...]`
//! （昇順・重複排除・`,` 区切り）を条件付きで追記する（安定契約。行の追加・
//! 順序変更はしない）。付与条件・被覆判定は `core.rs::EngineCore::
//! explain_engine_for` 系が持ち、本モジュールは [`ExplainIndexNames`]・
//! [`append_index_suffix`] による整形のみを担う。索引名は
//! `catalog::validate_identifier` を満たす（`,`・空白・改行を含み得ない）ため
//! 区切り文字として安全に使える。
//!
//! TASK-186・NOSQL-10 の前提として Issue #730 で [`ExplainEngine`]・
//! [`build_explain_result`] を公開 API へ昇格した（`BoundScan`／`BoundAggregate`
//! と同じ「同作法」）。外部から [`PlannedQuery`] を得るには
//! `EngineCore::plan_query_with_mode`（`pub`）を使う（`PlannedQuery::new` 自体は
//! `pub(crate)` のまま。対象外）。[`ExplainEngine`] は `Self::new` で構築し、
//! `EXPLAIN` が検索本体を実行しない契約（本ファイル冒頭「責務境界」参照）は
//! 呼び出し元にも求められる。

use crate::query_planner::PlannedQuery;
use crate::search_engine::SearchEngineKind;
use crate::sql::exec::{Cell, ColumnMeta, QueryResult, ResultRow};
use crate::sql::hnsw_cache::AnnPlan;
use crate::sql::scalar_plan::ScalarPlan;

/// `EXPLAIN` 応答の列名（安定契約。一度出したら変えない）。
const QUERY_PLAN_COLUMN: &str = "QUERY PLAN";

/// ソフトヒント未指定時の固定表記（安定契約）。
const NONE_LABEL: &str = "(none)";

/// `search_engine_kind()` が `None`（provider を直接注入する `with_provider`／
/// `from_storage` 経由。`kind` との対応を構造的に検証できない）の場合の固定表記
/// （安定契約）。ヒント未指定の [`NONE_LABEL`] と意味が異なるため区別する。
const CUSTOM_PROVIDER_LABEL: &str = "(custom_provider)";

/// `EXPLAIN` の `engine:`／`hnsw_params:`／`ann_plan:` 行（Issue #411）を組み立てる
/// ための入力。呼び出し元 `core.rs::EngineCore::execute_sql_in_session` の
/// `Statement::Explain` アームが、実行時に executor（`sql::exec`）が使うのと同じ
/// 源泉（`EngineCore::search_engine_kind()`・`sql::hnsw_cache::classify_ann_plan`）
/// から組み立てる。
#[derive(Debug, Clone, Copy)]
#[non_exhaustive]
pub struct ExplainEngine {
    /// [`crate::core::EngineCore::search_engine_kind`] の戻り値そのまま。
    pub(crate) kind: Option<SearchEngineKind>,
    /// [`crate::sql::hnsw_cache::classify_ann_plan`] の判定結果（静的判定）。
    pub(crate) ann_plan: AnnPlan,
    /// [`crate::sql::scalar_plan::classify_scalar_plan`] の判定結果
    /// （静的判定。Issue #474）。
    pub(crate) scalar_plan: ScalarPlan,
}

impl ExplainEngine {
    /// [`build_explain_result`] の入力を組み立てる（TASK-186・NOSQL-10 の前提。
    /// Issue #730）。`kind`・`ann_plan`・`scalar_plan` はいずれも
    /// `core.rs::EngineCore::execute_sql_in_session` の `Statement::Explain` アーム
    /// が SQL `EXPLAIN` 経路で使うのと同じ源泉（`EngineCore::search_engine_kind()`・
    /// [`crate::sql::hnsw_cache::classify_ann_plan`]・
    /// [`crate::sql::scalar_plan::classify_scalar_plan`]）から組み立てる想定
    /// （呼び出し元がこの単一情報源を経由しない値を渡した場合、`EXPLAIN` の
    /// 出力と一致しなくなる）。
    pub fn new(kind: Option<SearchEngineKind>, ann_plan: AnnPlan, scalar_plan: ScalarPlan) -> Self { /* ... */ }

    /// [`crate::core::EngineCore::search_engine_kind`] の戻り値そのまま。
    pub fn kind(&self) -> Option<SearchEngineKind> { /* ... */ }

    /// ANN（HNSW）経路の静的適用判定（Issue #411）。
    pub fn ann_plan(&self) -> AnnPlan { /* ... */ }

    /// SCALAR 索引の静的適用判定（Issue #474）。
    pub fn scalar_plan(&self) -> ScalarPlan { /* ... */ }
}

/// `EXPLAIN` の `ann_plan:`／`scalar_plan:` 行へ注記する使用索引名（Issue #1066・
/// TASK-206・INDEX-7・SQL-6・SQL-27）。呼び出し元 `core.rs::EngineCore` が
/// カタログ宣言・HNSW ゲート判定・スカラー列被覆判定から組み立てる（判定
/// ロジック自体はここに置かない。本型は整形専用のデータの入れ物）。
/// [`Self::new`] で正規化（ソート・重複排除・識別子検証）するため、
/// [`Self::ann`]／[`Self::scalar`] は常に昇順・重複なしの識別子列を返す。
#[derive(Debug, Clone, Default, PartialEq, Eq)]
#[non_exhaustive]
pub struct ExplainIndexNames {
    pub(crate) ann: Vec<String>,
    pub(crate) scalar: Vec<String>,
}

impl ExplainIndexNames {
    /// `ann`／`scalar` それぞれを正規化して組み立てる。要素に
    /// `catalog::validate_identifier` を満たさないものが 1 つでも含まれる側は、
    /// 未検証の文字列を `QUERY PLAN` 応答へ出さないため fail-closed に空へ倒す。
    pub fn new(ann: Vec<String>, scalar: Vec<String>) -> Self { /* ... */ }

    /// `ann_plan:` 行に注記する索引名（昇順・重複なし）。
    pub fn ann(&self) -> &[String] { /* ... */ }

    /// `scalar_plan:` 行に注記する索引名（昇順・重複なし）。
    pub fn scalar(&self) -> &[String] { /* ... */ }
}

/// `USING PLAN` の `WHERE` 束縛結果から決まる、束縛の副産物である形状情報
/// （旧 `sql::using_plan::PreCheckShape` を TASK-186・NOSQL-10 の前提として
/// `sql::explain` の公開型へ昇格したもの。Issue #765）。
#[derive(Debug, Clone, Copy, PartialEq, Eq)]
#[non_exhaustive]
pub struct ExplainShape { /* private fields */ }

impl ExplainShape {
    /// `metadata_filters`／`expr_filters`（`USING PLAN` の `WHERE` 束縛結果）から
    /// 組み立てる。`USING PLAN` は `HINT ORDER` を受理しないため SCALAR 段は常に
    /// DISTANCE 段より先に評価される契約に基づき、`scalar_prefilter: true` 固定で
    /// `classify_scalar_plan` を呼ぶ。`or_filters`（TASK-208・SQL-24、Issue #912）は
    /// `WHERE` の `OR` 群で、`filters_empty` の判定に含める
    /// （**BREAKING CHANGE**: 引数を追加した。OR を持たない既存呼び出しは `&[]` を渡す）。
    pub fn from_filters(
        metadata_filters: &[MetadataFilter],
        expr_filters: &[BoundExpr],
        or_filters: &[crate::sql::where_tree::BoundOrGroup],
    ) -> Self { /* ... */ }

    /// `ann_plan:` 行（Issue #411）が要求する形状情報。
    pub fn filters_empty(&self) -> bool { /* ... */ }

    /// `scalar_plan:` 行（Issue #474）が要求する静的判定。
    pub fn scalar_plan(&self) -> ScalarPlan { /* ... */ }
}

/// 集計・広域取得の走査方式（Issue #922・SQL-27）。`access_path:` 行の値になる
/// 閉じた語彙（pub(crate)）。
pub(crate) enum AccessPath {
    VisibleBitmapCache,           // "visible_bitmap_cache"
    ScalarIndexCandidates,        // "scalar_index_candidates"
    ScalarIndexGroupEnumeration,  // "scalar_index_group_enumeration"
    FullScan,                     // "full_scan"
}

/// `ExplainEngine::kind` を `engine:` 行の値（閉じた語彙・snake_case）へ変換する。
fn engine_token(kind: Option<SearchEngineKind>) -> &'static str {
    match kind {
        None => CUSTOM_PROVIDER_LABEL,
        Some(SearchEngineKind::CpuScalarBruteForce) => "cpu_scalar_brute_force",
        Some(SearchEngineKind::ParallelBruteForce) => "parallel_brute_force",
        Some(SearchEngineKind::Hnsw(_)) => "hnsw",
    }
}

/// `AnnPlan` を `ann_plan:` 行の値（閉じた語彙・snake_case）へ変換する。
fn ann_plan_token(plan: AnnPlan) -> &'static str {
    match plan {
        AnnPlan::PlainScanEngine => "plain_scan_engine",
        AnnPlan::PlainScanPrecision => "plain_scan_precision",
        AnnPlan::HnswFullVisible => "hnsw_full_visible",
        AnnPlan::HnswSubset => "hnsw_subset",
        AnnPlan::UnknownCustomProvider => "unknown_custom_provider",
    }
}

/// `ScalarPlan` を `scalar_plan:` 行の値（閉じた語彙・snake_case）へ変換する
/// （Issue #474）。
fn scalar_plan_token(plan: ScalarPlan) -> &'static str {
    match plan {
        ScalarPlan::PlainScan => "plain_scan",
        ScalarPlan::IndexEquality => "index_equality",
        ScalarPlan::IndexPrefix => "index_prefix",
        ScalarPlan::IndexIdRange => "index_id_range",
        ScalarPlan::IndexTypedRange => "index_typed_range",
        ScalarPlan::IndexInList => "index_in_list",
        ScalarPlan::IndexConjunction => "index_conjunction",
    }
}

/// `PlannedQuery`（LLM 展開結果＋解決済み実効モード）と `ExplainEngine`
/// （使用エンジン・ANN 静的判定〔Issue #411〕・SCALAR 索引静的判定
/// 〔Issue #474〕）から `EXPLAIN` の `QueryResult` を決定的に構築する
/// （副作用なし。同一入力には常に同一の行を返す）。
/// 行順序: `search_terms[i]`（展開結果の件数分）→ `path_hint` → `kind_hint` →
/// `mode` → `mode_source` → `engine` → （`engine: hnsw` のときのみ）
/// `hnsw_params` → `ann_plan` → `scalar_plan`。
pub fn build_explain_result(planned: &PlannedQuery, engine: &ExplainEngine) -> QueryResult

/// [`build_explain_result`] の使用索引名付き版（Issue #1066・TASK-206・
/// INDEX-7・SQL-6・SQL-27）。`names` が [`ExplainIndexNames::default()`]
/// （両側とも空）のときは [`build_explain_result`] とビット同一の出力になる
/// （後方互換。宣言・opt-in がない既定エンジン時の出力は変わらない）。
pub fn build_explain_result_with_indexes(
    planned: &PlannedQuery,
    engine: &ExplainEngine,
    names: &ExplainIndexNames,
) -> QueryResult

/// `EXPLAIN SELECT ...`（`USING PLAN` を伴わない検索 SELECT。`ORDER BY <=>`・
/// `HYBRID`。Issue #922・SQL-27）の [`QueryResult`] を構築する。行順序:
/// `mode` → `mode_source` → `engine` → （`engine: hnsw` のときのみ）
/// `hnsw_params` → `ann_plan` → `scalar_plan`。
pub(crate) fn build_search_explain_result(
    mode: ResolvedMode,
    engine: &ExplainEngine,
    names: &ExplainIndexNames,
) -> QueryResult

/// `EXPLAIN SELECT <集計>`・`EXPLAIN SELECT ... LIMIT n`（集計・広域取得。
/// Issue #922・SQL-27）の [`QueryResult`] を構築する。行順序: `scalar_plan` →
/// `access_path`。`mode`・`mode_source`・`engine`・`ann_plan` は出さない
/// （広域取得は `search_mode` を参照せず、どちらの文にもランキング段が無い
/// ため `mode:` を出すと誤情報になる）。
pub(crate) fn build_relational_explain_result(
    scalar_plan: ScalarPlan,
    access_path: AccessPath,
    names: &ExplainIndexNames,
) -> QueryResult
~~~

### 露出する語彙（`engine_token` / `ann_plan_token` / `scalar_plan_token` の match から機械抽出）

| 行 | 取りうる値 |
| --- | --- |
| `engine:` | `cpu_scalar_brute_force`, `parallel_brute_force`, `hnsw`, `(custom_provider)` |
| `ann_plan:` | `plain_scan_engine`, `plain_scan_precision`, `hnsw_full_visible`, `hnsw_subset`, `unknown_custom_provider` |
| `scalar_plan:` | `plain_scan`, `index_equality`, `index_prefix`, `index_id_range`, `index_typed_range`, `index_in_list`, `index_conjunction` |
| `access_path:`（集計・広域取得の `EXPLAIN` のみ） | `visible_bitmap_cache`, `scalar_index_candidates`, `scalar_index_group_enumeration`, `full_scan` |
| `ann_plan:`／`scalar_plan:` 末尾の ` index=<name>[,<name>...]`（索引経路を使う場合のみ） | カタログ宣言された索引名（昇順・重複なし。`ExplainIndexNames` が正規化） |
| `hnsw_params:`（`engine: hnsw` のときのみ追加） | `m=<u32>,ef_construction=<u32>,ef_search=<u32>,resident=<...>,sparse_visited_max=<usize>`（`ValidatedHnswParams::get()` の静的設定値。実行時の自動縮退結果は含まない） |

## Notes

- `EXPLAIN` は検索本体（ハイブリッド実行）を実行しないため、行の `id`/`score` は実在行を持たない疑似値（`0`）とする。
- 行順序（安定契約）: `search_terms[i]`（件数分）→ `path_hint` → `kind_hint` → `mode` → `mode_source` → `engine` →（`engine: hnsw` のときのみ）`hnsw_params` → `ann_plan` → `scalar_plan`。既存 6 行（`search_terms[i]`…`mode_source`）は不変、新規行は `mode_source` の直後へ追記のみ。
- security.md P0: LLM プロンプト本文・生応答本文は含めず、厳格パース済みの構造化フィールド（`QueryExpansion`）のみを使う。
- ADR `docs/design/explain-search-engine-exposure.md`（pin SHA `dc888f6ea146d3078153d64a6848f5c8cf044431`）に、露出する行・語彙・露出しない値と理由がまとめられている。ソースコードの `match` から実測した上表の語彙とは別に、意図的に非開示なのは実行時の動的挙動（plain scan への強制切り替え、可視カーディナリティ、テーブル行数、キャッシュ状態、インデックスノード数、hybrid モードの再取得ラウンド数、`full_scan_ratio` / `acorn_max_visible_ratio` 等の切替閾値、`acorn_searches` / `acorn_expansions` の実行時カウンタ）で、「`EXPLAIN` は検索本体を実行しない」という既存契約と「存在情報の副次漏えい」の構造的防止のため（ADR 本文の具体的な文言は本 scope では要約のみとし、原文の verbatim 引用はしていない）。
- Migration (0.1.0 → 0.2.0): `sql::explain` は `pub(crate)` から `pub` に昇格し、`ExplainEngine`（`#[non_exhaustive]`、`ExplainEngine::new` + `kind()` / `ann_plan()` / `scalar_plan()`）・`ExplainIndexNames`・`ExplainShape`・`build_explain_result`・`build_explain_result_with_indexes` が公開 API になった（TASK-186・NOSQL-10 の前提。Issue #730）。`ExplainEngine` / `ExplainIndexNames` / `ExplainShape` は `#[non_exhaustive]` のためクレート外からは `new` / `from_filters` 経由で構築する。`EXPLAIN` の対象は通常検索（`USING PLAN` の有無いずれも）・集計・広域取得へ拡大した（Issue #922・SQL-27。`allowlist::ExplainTarget`）。`USING PLAN` を伴わない検索は `search_terms[i]` / `path_hint` / `kind_hint` を出さず `mode` から始まり、集計・広域取得は `scalar_plan` → `access_path` の 2 行のみ。
- `SearchEngineKind` / `AnnPlan` / `ScalarPlan` / `PlannedQuery` / `QueryResult` / `Cell` / `ColumnMeta` / `ResultRow` の型実体は本 scope 外（search / sql-execution scope）の管轄のため、参照のみ記載する。
- Distinct from `mssql` (node-mssql, T-SQL client) / `drizzle` (TypeScript ORM) / `supabase` (Postgres): `EXPLAIN` here reports LLM query-expansion and static ANN/SCALAR plan classification via a closed vocabulary, not a relational query optimizer's cost-based plan.

## Related

- [using-plan](./using-plan.md)
- [mode](./mode.md)
