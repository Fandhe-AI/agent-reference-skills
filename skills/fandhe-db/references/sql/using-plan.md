---
source: https://docs.rs/crate/fandhe-db-engine/0.2.0/source/src/sql/using_plan.rs
---

# sql::using_plan

`USING PLAN('<query>')` 文末句（`ORDER BY` の代替。TASK-77、SQL-5）の実行時ディスパッチ。`sql::allowlist` が構造受理した自然言語クエリ（`ValidatedStatement::using_plan`）を、既存の LLM クエリ展開ロジック（`core.rs::EngineCore::plan_query`）が返した `QueryExpansion` から、既存 C4 ハイブリッド実行形（`sql::parser::Ranking::Hybrid`）を持つ `BoundStatement` へ一意に束縛する。

## Signature / Usage

~~~rust,ignore
pub(crate) const BODY_COLUMN_NAME: &str = "body";

/// question（クエリ句のリテラル値）と expansion（LLM 展開結果）から、
/// Ranking::Hybrid::query_text（hybrid_search の疎側〔全文検索側〕入力）に使う
/// 単一のテキストを決定的に構成する。密側（再埋め込みベクトル）には本関数の
/// 戻り値を使わない（密側は crate::query_planner::render_reembedding_text の
/// 既存規則に従う必要があるため）。
pub(crate) fn expanded_query_text(question: &str, expansion: &QueryExpansion) -> String

/// schema 内の規約列 BODY_COLUMN_NAME（TEXT）のインデックスを返す。欠落・型不一致は
/// SqlSurfaceError::invalid_input（22000）。
/// pub(crate)（Issue #764・TASK-186・NOSQL-2）: core.rs::EngineCore::
/// execute_bound_plan_search_in_session が束縛済み plan 検索（NoSQL 表層）の
/// text_column_index 解決に本関数をそのまま再利用する（bind_expansion と同一の
/// 本文列規約を共有し、第 2 の実装を作らない）。
/// TEXT 以外（Vector / Integer / BigInt / Real / Double / Boolean / Date / Timestamp /
/// Array / Bytea / Json / Jsonb / Enum / Numeric / Uuid）は
/// 「column "body" is not a TEXT column」の invalid_input（22000）で拒否する。
pub(crate) fn body_column_index(schema: &TableSchema) -> Result<usize, SqlSurfaceError>

/// plan_using_plan_expansion（辞書スナップショット構築・LLM クエリ展開・再埋め込み
/// という高コスト I/O）より前に、stmt が schema 上で構造的に束縛可能であることを
/// 検証する。束縛結果自体は破棄する（I/O 完了後に bind_expansion で改めて束縛）。
/// 0.2.0 の戻り値は PreCheckShape ではなく sql::explain の公開型 ExplainShape
/// （Issue #765。ExplainShape::from_filters へ委譲し、scalar_prefilter: true 固定）。
pub(crate) fn pre_check_bindable(
    stmt: &ValidatedStatement,
    schema: &TableSchema,
    udfs: &crate::sql::udf_call::UdfRegistry,
) -> Result<crate::sql::explain::ExplainShape, SqlSurfaceError>

/// stmt（using_plan() が Some である前提）・展開結果 expansion・埋め込み済みの
/// 再埋め込みクエリベクトル query_vector を schema へ束縛し、既存 C4 ハイブリッド
/// 実行形（Ranking::Hybrid）を持つ BoundStatement を構成する（TASK-77・SQL-5 の
/// 一意ディスパッチ先）。
pub(crate) fn bind_expansion(
    stmt: &ValidatedStatement,
    schema: &TableSchema,
    question: &str,
    expansion: &QueryExpansion,
    query_vector: Vec<f32>,
    udfs: &crate::sql::udf_call::UdfRegistry,
    resolved_mode: crate::sql::mode::ResolvedMode,
) -> Result<BoundStatement, SqlSurfaceError>
~~~

## Notes

- LLM 呼び出し・再埋め込みの実行自体は呼び出し元（`core.rs::EngineCore::execute_sql_in_session`）が行う。`EngineCore` の `embedder` / `query_planner` フィールドは private のため、本モジュールは束縛の純粋なロジックのみを持つ。
- fail-closed: 本文列（規約列 `BODY_COLUMN_NAME`）の欠落・型不一致は `SqlSurfaceError::invalid_input`（22000）で拒否する。プランナー未注入・埋め込み未注入・LLM 応答異常は呼び出し元が既存分類（XX000・`SqlSurfaceError::Internal`）のみで拒否する。エラーへプロンプト本文・LLM 応答本文は含めない。
- `QueryExpansion` / `render_reembedding_text` / `query_planner.rs` の実体は本 scope 外（search / sql-execution scope の管轄）のため参照のみ記載する。
- Migration (0.1.0 → 0.2.0): `pre_check_bindable` の戻り値は crate 内部の `PreCheckShape` から公開型 `sql::explain::ExplainShape` に変わった（旧 `PreCheckShape` は TASK-186・NOSQL-10 の前提として昇格。Issue #765）。`pre_check_bindable` 内で `bind_where_predicates` が `OR` 群（`or_filters`）も返すようになり、`ExplainShape::from_filters` の `filters_empty` 判定に含まれる（OR だけの `WHERE` が「フィルタなし」と誤認される fail-open を防ぐ。TASK-208・SQL-24）。`bind_expansion` のシグネチャは 0.1.0 と同一。
- ADR `docs/design/using-plan-precision-empty-result.md`（0.1.0 の pin SHA `7022d112e79760dca916480599553fcac256b5fb` 時点で確認した内容。0.2.0 の pin は `dc888f6ea146d3078153d64a6848f5c8cf044431`、ステータス Accepted・Issue #315 対応）は、実 Ollama 経由で `USING PLAN` が SQL エラーなしに毎回 0 行を返す事象を調査したドキュメント。決定的フィクスチャ（`RecordingEmbedder` 等のテスト二重）による再現では、`USING MODE 'precision'`（または `mode_hint: "precision"` の暗黙適用）時に `execute_sql_in_session` が `Ok(SqlOutcome::Query(result))` を返し `result.rows.is_empty()` が真になる（SQL エラーではなく空の正常応答。wire 層では `CommandComplete("SELECT 0")`、接続継続）ことを確認済み。同一クエリへ `USING MODE 'recall'` を明示すれば行が返る（positive control）。ただし ADR 自身が「実 Ollama 環境での `mode` 値・実埋め込み出力そのものは未確認」「Issue #315 の実事象がこの経路によるものかは**未確定**」と明記しており、この空集合契約は「原因候補・最有力仮説」の位置づけに留まる（決定的フィクスチャの範囲で SEARCH-9 の契約どおりの挙動として再現できることの確認であり、実環境での確定ではない）。確信度ゲートの計算自体（`precision.rs`）は search scope の管轄。
- Distinct from `mssql` (node-mssql, T-SQL client) / `drizzle` (TypeScript ORM) / `supabase` (Postgres): `USING PLAN(...)` is a proprietary clause substituting `ORDER BY` for LLM-driven query expansion, not standard SQL.

## Related

- [mode](./mode.md)
- [explain](./explain.md)
- [parser](./parser.md)
