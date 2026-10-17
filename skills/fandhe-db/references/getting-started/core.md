---
source: https://docs.rs/crate/fandhe-db-engine/0.2.0/source/src/core.rs
---

# core

`engine::core` はプロトコル非依存のコア API 層（TASK-124・対象ビヘイビア: CORE-1）。`VectorCore` trait は `wire-server`（pg wire v3）や将来の他プロトコル実装が依存すべき最小インターフェースとして設計されている。ただし現行の `wire-server`（`simple_query.rs` / `server.rs`）は実際には `VectorCore` trait ではなく具象型 `EngineCore`（`&EngineCore` / `Arc<EngineCore>`）に直接依存しており、`EngineCore::execute_sql_in_session` 等 `VectorCore` trait に含まれない `EngineCore` 固有メソッドを呼び出している（詳細は `## Notes` 参照）。

## Signature / Usage

`VectorCore` trait と製品実装 `EngineCore`:

~~~rust,ignore
/// wire-server が依存する唯一の窓口（CORE-1）。
pub trait VectorCore: Send + Sync {
    fn search(
        &self,
        ctx: &PolicyContext,
        table: &str,
        query: &[f32],
        k: usize,
    ) -> Result<Vec<SearchHit>, CoreError>;

    fn get_row(
        &self,
        ctx: &PolicyContext,
        table: &str,
        tenant_id: &str,
        id: u64,
    ) -> Result<Row, CoreError>;
}

/// [`VectorCore`] の製品実装。
pub struct EngineCore {
    storage: Storage,
    provider: Box<dyn SearchProvider>,
    prefilter_cache: PrefilterCache,
    precision_policy: crate::precision::PrecisionPolicy,
    embedder: Option<Box<dyn crate::embedding::Embedder>>,
    query_planner: Option<PlannerBinding>,
    incremental_config: crate::incremental::IncrementalConfig,
    ledger_mode: LedgerMode,
    batch_limits: crate::batch_limits::BatchLimits,
    transaction_limits: crate::sql::transaction::TransactionLimits,
    dml_limits: crate::sql::parser::DmlLimits,
    partitioned_dml_limits: crate::sql::parser::PartitionedDmlLimits,
    dictionary_cache: DictionaryCache,
    dictionary_config: crate::dictionary::DictionaryConfig,
    sparse_index_cache: crate::sql::sparse_cache::SparseIndexCache,
    sql_arena_cache: crate::sql::arena_cache::SqlArenaCache,
    scalar_index_cache: crate::sql::scalar_index::ScalarIndexCache,
    visible_bitmap_cache: crate::sql::visible_cache::VisibleBitmapCache,
    search_engine_kind: Option<crate::search_engine::SearchEngineKind>,
    hnsw_state: Option<HnswEngineState>,
    index_catalog_gate_cache: crate::catalog::IndexCatalogGateCache,
    hnsw_scope: crate::search_engine::HnswScope,
    explain_index_name_scans: std::sync::atomic::AtomicU64,
}
~~~

`EngineCore` の公開メソッド（シグネチャのみ）:

~~~rust,ignore
/// 指定パスの `redb` データベースを開き、既定の検索エンジン
/// （[`crate::search_engine::default_engine`]）を注入した `EngineCore` を構築する。
pub fn open(path: impl AsRef<Path>) -> Result<Self, CoreError>

/// [`Self::open`] の durability 版（Issue #849・構築時オプション）。既定値
/// （[`crate::storage::WriteDurability::default`]）を渡した場合は [`Self::open`] と同一の挙動。
pub fn open_with_durability(
    path: impl AsRef<Path>,
    durability: crate::storage::WriteDurability,
) -> Result<Self, CoreError>

/// 検索 provider を差し替えて構築する（テスト・将来の GPU/ANN provider 導入用）。
/// [`Self::search_engine_kind`] は常に `None`。
pub fn with_provider(
    path: impl AsRef<Path>,
    provider: Box<dyn SearchProvider>,
) -> Result<Self, CoreError>

/// 指定パスの `redb` データベースを開き、`kind` が構築する検索エンジンを注入して構築する（Issue #407・opt-in 経路）。
pub fn open_with_engine(
    path: impl AsRef<Path>,
    kind: crate::search_engine::SearchEngineKind,
) -> Result<Self, OpenWithEngineError>

/// 既に開いた `Storage` の所有権を受け取って構築する。`search_engine_kind` は常に `None`。
pub fn from_storage(storage: Storage, provider: Box<dyn SearchProvider>) -> Self

/// [`Self::from_storage`] の `kind` 版（Issue #407）。infallible。
pub fn from_storage_with_engine(
    storage: Storage,
    kind: crate::search_engine::SearchEngineKind,
) -> Self

/// ファイル形 `INSERT` のベクトル埋め込み（TASK-120）注入点を設定する。
pub fn with_embedder(mut self, embedder: Box<dyn crate::embedding::Embedder>) -> Self

/// LLM クエリプランニング（TASK-110・PLAN-1）の単一クライアント注入点を設定する。
pub fn with_query_planner(mut self, client: Box<dyn crate::query_planner::LlmClient>) -> Self

/// LLM クエリプランニング（TASK-115・PLAN-8）のティア別クライアント注入を設定する。
pub fn with_tiered_query_planner(mut self, planner: crate::tiering::TieredPlanner) -> Self

/// ファイル形 `INSERT` のチャンク化設定（TASK-120）を差し替える。
pub fn with_incremental_config(mut self, config: crate::incremental::IncrementalConfig) -> Self

/// `operation_id` 必須化ガード（TASK-92）を制御する ledger mode を設定する。
pub fn with_ledger_mode(mut self, mode: LedgerMode) -> Self

/// 一括投入（複数ファイル）に対する 4 種の処理量上限（TASK-122）を設定する。
pub fn with_batch_limits(mut self, limits: crate::batch_limits::BatchLimits) -> Self

/// `precision` モード実行契約（TASK-162・SEARCH-9）のサーバー側設定を差し替える。
pub fn with_precision_policy(mut self, policy: crate::precision::PrecisionPolicy) -> Self

/// 辞書的情報源抽出の設定（TASK-109・PLAN-5）を差し替える。
pub fn with_dictionary_config(mut self, config: crate::dictionary::DictionaryConfig) -> Self

/// 明示トランザクション（SQL-31・TASK-221）の持続時間・文数の上限を差し替える。
pub fn with_transaction_limits(
    mut self,
    limits: crate::sql::transaction::TransactionLimits,
) -> Self

/// 述語形 UPDATE/DELETE の 1 文あたり影響行数上限・複数行 `VALUES` の行数上限を差し替える（Issue #997）。
pub fn with_dml_limits(mut self, limits: crate::sql::parser::DmlLimits) -> Self

/// 分割実行 DML の設定（チャンク幅・走査予算・writer 保持時間など。Issue #1128）を差し替える。
pub fn with_partitioned_dml_limits(
    mut self,
    limits: crate::sql::parser::PartitionedDmlLimits,
) -> Self
pub fn partitioned_dml_limits(&self) -> crate::sql::parser::PartitionedDmlLimits

/// HNSW opt-in 時に HNSW 経路を使うテーブルの範囲を差し替える（Issue #1065。既定 `HnswScope::All`）。
pub fn with_hnsw_scope(mut self, scope: crate::search_engine::HnswScope) -> Self
pub fn hnsw_scope(&self) -> crate::search_engine::HnswScope

/// 辞書スナップショット（世代整合キャッシュ経由）を取得する。
pub fn dictionary_snapshot(
    &self,
    ctx: &PolicyContext,
    table: &str,
) -> Result<Arc<crate::dictionary::Dictionary>, CoreError>

/// 観測用統計（テナント ID・行 ID 等の機微情報は含まない。`VectorCore` trait には載せない固有メソッド）。
pub fn sparse_index_cache_stats(&self) -> crate::sql::sparse_cache::SparseIndexCacheStats
pub fn sql_arena_cache_stats(&self) -> crate::sql::arena_cache::SqlArenaCacheStats
pub fn scalar_index_cache_stats(&self) -> crate::sql::scalar_index::ScalarIndexCacheStats
pub fn visible_bitmap_cache_stats(&self) -> crate::sql::visible_cache::VisibleBitmapCacheStats
pub fn hnsw_index_cache_stats(&self) -> crate::sql::hnsw_cache::HnswIndexCacheStats
pub fn index_catalog_gate_cache_stats(&self) -> crate::catalog::IndexCatalogGateCacheStats
pub fn explain_index_name_scan_stats(&self) -> ExplainIndexNameScanStats

/// `table` に対して `query` の Top-k 検索を行う（CORE-2・CORE-10）。
pub fn search(
    &self,
    ctx: &PolicyContext,
    table: &str,
    query: &[f32],
    k: usize,
) -> Result<Vec<SearchHit>, CoreError>

/// クエリベクトル未生成の検索（LLM 展開後・再埋め込み実施）を行う（TASK-114・PLAN-10）。
pub fn plan_and_embed_query(
    &self,
    ctx: &PolicyContext,
    table: &str,
    query_text: &str,
    k: usize,
) -> Result<Vec<SearchHit>, CoreError>

/// 自然言語 `question` を LLM クエリプランニングで展開する（TASK-110・PLAN-1）。
pub fn plan_query(
    &self,
    ctx: &PolicyContext,
    table: &str,
    question: &str,
) -> Result<crate::query_planner::QueryExpansion, CoreError>

/// `plan_query` に加え、`PlannerBinding::Tiered` 構成では質問類型・ティア（TASK-115・PLAN-8）も返す。
pub fn plan_query_with_classification(
    &self,
    ctx: &PolicyContext,
    table: &str,
    question: &str,
) -> Result<
    (
        crate::query_planner::QueryExpansion,
        Option<crate::tiering::Classification>,
    ),
    CoreError,
>

/// 明示指定（`query_mode`・`session_mode`）とプランナー推定から実効モードまで解決して返す（TASK-164・PLAN-11）。
pub fn plan_query_with_mode(
    &self,
    ctx: &PolicyContext,
    table: &str,
    question: &str,
    query_mode: Option<crate::sql::mode::SearchMode>,
    session_mode: Option<crate::sql::mode::SearchMode>,
) -> Result<crate::query_planner::PlannedQuery, CoreError>

/// `USING PLAN` 展開をパース・LLM 展開・再埋め込みまで実行する（TASK-114・PLAN-10）。
pub fn plan_using_plan_expansion(
    &self,
    ctx: &PolicyContext,
    table: &str,
    using_plan_text: &str,
) -> Result<UsingPlanExpansionResult, CoreError>

/// `table` から `id` の行を 1 件取得する（CORE-3）。
pub fn get_row(
    &self,
    ctx: &PolicyContext,
    table: &str,
    tenant_id: &str,
    id: u64,
) -> Result<Row, CoreError>

/// [`PrefilterCache`] の観測用統計（TASK-169・対象ビヘイビア: RLS-1〜4）を取得する。
pub fn prefilter_cache_stats(&self) -> PrefilterCacheStats

/// 構築時に明示指定された [`crate::search_engine::SearchEngineKind`] を返す（Issue #407）。
pub fn search_engine_kind(&self) -> Option<crate::search_engine::SearchEngineKind>

/// SQL 表層の単一文実行エントリポイント（TASK-75、対象ビヘイビア: SQL-1〜4）。
/// `VectorCore` trait への昇格は行わない固有メソッドとする（`crates/engine/api/
/// core_api.snapshot`・`make core-api-check` が対象とするのは `VectorCore`
/// trait 本体のみのため、本メソッドの追加はコア API シグネチャ安定性チェックに
/// 影響しない。trait への統合可否は wire 統合タスク（TASK-68〜73）が判断する）。
///
/// `sql::allowlist::validate_statement`（構造検証）→
/// `sql::parser::bind`（意味論検証・束縛）→ `sql::exec::execute_statement`
/// （RLS→SCALAR→DISTANCE 固定順の実行）の順に呼ぶ。RLS 適用は `ctx` の下で
/// 無条件に行われ、SQL 文中の `visible()` 呼び出しの有無に依存しない（SQL-3・
/// RLS-7。`sql::exec` のモジュールドキュメント参照）。
///
/// スキーマ取得（`bind` 用）・候補走査（`sql::exec::execute_statement` 内の
/// `VectorArena::build_filtered_with_rows_in_txn`）を単一の `read_txn`
/// （同一スナップショット）上で行う（Issue #56 レビュー指摘対応・codex P1:
/// 以前は `Storage::get_table_schema` が別トランザクションでスキーマを取得し、
/// `execute_statement` がさらに別トランザクションで行走査していたため、この間に
/// `alter_table_add_column` がコミットされると、`bind` が束縛した旧スキーマで
/// 新スナップショットの行を検索することになり、新設列の欠落や `row_codec`
/// デコード失敗（`XX000` 相当）を招き得た。`catalog::get_table_schema_in_txn` で
/// スキーマを取得したのと同一の `read_txn` を `execute_statement` へ渡すことで、
/// スキーマ取得・bind・候補走査を単一スナップショットへ閉じ込める）。
pub fn execute_sql(
    &self,
    ctx: &PolicyContext,
    sql: &str,
) -> Result<crate::sql::exec::QueryResult, crate::sql::allowlist::SqlSurfaceError>

pub fn execute_sql_in_session(
    &self,
    ctx: &PolicyContext,
    session: &mut crate::sql::mode::SessionState,
    sql: &str,
) -> Result<crate::sql::SqlOutcome, crate::sql::allowlist::SqlSurfaceError>

/// SQL 表層の単一 INSERT 文実行エントリポイント（TASK-80、対象ビヘイビア:
/// SQL-10）。`execute_sql`（TASK-75、SELECT 専用）とは独立した固有メソッドと
/// する。`VectorCore` trait への昇格は行わない（`crates/engine/api/
/// core_api.snapshot` が対象とするのは `VectorCore` trait 本体のみのため、
/// 本メソッドの追加はコア API シグネチャ安定性チェックに影響しない。
/// `execute_sql` と同じ理由）。
///
/// `sql::allowlist::validate_insert`（構造検証。文末専用句
/// `USING OPERATION_ID '<id>'` の省略（明示 `NULL` を含む）は、`self.ledger_mode`
/// が `LedgerMode::Ledgered`（既定）である限りこの段階で `23502` として拒否され、
/// 書き込みトランザクションは一切開始されない。TASK-92・対象ビヘイビア:
/// RECOVER-1）→ `Storage::get_table_schema`（スキーマ取得）→
/// `sql::parser::bind_insert`（意味論検証・束縛）→ `sql::exec::execute_insert`
/// （単一 write トランザクションでの実行）の順に呼ぶ。
pub fn execute_insert_sql(
    &self,
    ctx: &PolicyContext,
    sql: &str,
) -> Result<crate::sql::exec::InsertOutcome, crate::sql::allowlist::SqlSurfaceError>

/// SQL 表層のバッチ INSERT 実行エントリポイント（TASK-122、対象ビヘイビア:
/// INDEX-4）。[`Self::execute_insert_sql`] の複数ファイル版で、複数ファイルを
/// 1 バッチとして受け取る engine ローカル API の入口（1 文 = 1 ファイルの
/// 検証済み `INSERT` 文の列（`sqls`）を 1 バッチとして受け取る。行形の
/// 複数行 `VALUES`（SQL-16、TASK-190）はこの API とは別経路——`sql::parser::
/// BoundInsertForm::RowBatch` を経由し、ファイル形が混在した場合と同じく
/// 本メソッドは行形を一切受理しない）。`VectorCore` trait への昇格は行わない
/// （`execute_insert_sql` と同じ理由）。
///
/// 手順:
/// 1. `sqls` が空なら `22000`（invalid input）で拒否する。
/// 2. 各文を `sql::allowlist::validate_insert`（`operation_id` 必須化ガード
///    （TASK-92・RECOVER-1）を含む）→ `sql::parser::bind_insert_form` で束縛する。
///    **全文がファイル形であることを要求**し、行形が 1 件でも混在したら `22000`
///    で拒否する（黙って別セマンティクスへ丸めない）。
/// 3. 束縛結果から `operation_id` を `self.ledger_mode.resolve` で台帳書き込み
///    指示へ解決し（TASK-93・RECOVER-2。行形・単一ファイル形と同じ契約）、
///    `incremental::index_file_batch` へまとめて委譲する。一括投入 4 上限
///    （`self.batch_limits`。TASK-122）の判定自体は `index_file_batch` が
///    埋め込み・write トランザクションのいずれよりも前に行う契約
///    （`batch_limits.rs`・`incremental.rs` モジュールドキュメント参照）。
///
/// 上限超過時は redb・インメモリ索引・`operation_id` 台帳のいずれも変更されない
/// （`incremental::index_file_batch` の副作用ゼロ契約）。上限非起因の途中失敗
/// （例: 2 ファイル目の埋め込み失敗）は文単位セマンティクスとなり、既に処理済みの
/// 先行ファイルはそのまま索引化された状態で残る（`incremental::index_file_batch`
/// ドキュメント参照）。
pub fn execute_insert_sql_batch(
    &self,
    ctx: &PolicyContext,
    sqls: &[&str],
) -> Result<Vec<crate::sql::exec::InsertOutcome>, crate::sql::allowlist::SqlSurfaceError>
~~~

0.2.0 で追加された SQL 実行系の `EngineCore` メソッド（シグネチャのみ。0.1.0 に無いもの）:

~~~rust,ignore
// 拡張クエリプロトコル（Parse / Bind / Describe / Execute。WIRE-11・WIRE-12）用の 2 段階 API
pub fn parse_sql(&self, sql: &str) -> Result<ParsedSql, crate::sql::allowlist::SqlSurfaceError>
pub fn parse_sql_prepared(&self, sql: &str) -> Result<PreparedSql, crate::sql::allowlist::SqlSurfaceError>
pub fn bind_prepared(
    &self,
    prepared: &PreparedSql,
    values: &[Option<Vec<u8>>],
) -> Result<ParsedSql, crate::sql::allowlist::SqlSurfaceError>
pub fn describe_parsed_in_session(
    &self,
    session: &crate::sql::mode::SessionState,
    parsed: &ParsedSql,
) -> Result<Option<Vec<crate::sql::exec::ColumnMeta>>, crate::sql::allowlist::SqlSurfaceError>
pub fn describe_parsed_in_txn(
    &self,
    session: &crate::sql::mode::SessionState,
    txn: &crate::sql::transaction::SessionTransaction<'_>,
    parsed: &ParsedSql,
) -> Result<Option<Vec<crate::sql::exec::ColumnMeta>>, crate::sql::allowlist::SqlSurfaceError>
pub fn describe_prepared_in_session(
    &self,
    session: &crate::sql::mode::SessionState,
    prepared: &PreparedSql,
) -> Result<Option<Vec<crate::sql::exec::ColumnMeta>>, crate::sql::allowlist::SqlSurfaceError>
pub fn execute_parsed_in_session(
    &self,
    ctx: &PolicyContext,
    session: &mut crate::sql::mode::SessionState,
    parsed: &ParsedSql,
) -> Result<crate::sql::SqlOutcome, crate::sql::allowlist::SqlSurfaceError>

// 明示・暗黙トランザクション（SQL-31・TASK-221・WIRE-16）
pub fn new_session_transaction(&self) -> crate::sql::transaction::SessionTransaction<'_>
pub fn begin_implicit_transaction<'e>(
    &'e self,
    txn: &mut crate::sql::transaction::SessionTransaction<'e>,
    session: &crate::sql::mode::SessionState,
) -> Result<(), crate::sql::allowlist::SqlSurfaceError>
pub fn execute_sql_in_txn<'e>(
    &'e self,
    ctx: &PolicyContext,
    session: &mut crate::sql::mode::SessionState,
    txn: &mut crate::sql::transaction::SessionTransaction<'e>,
    sql: &str,
) -> Result<crate::sql::SqlOutcome, crate::sql::allowlist::SqlSurfaceError>
pub fn execute_parsed_in_txn<'e>(
    &'e self,
    ctx: &PolicyContext,
    session: &mut crate::sql::mode::SessionState,
    txn: &mut crate::sql::transaction::SessionTransaction<'e>,
    parsed: &ParsedSql,
) -> Result<crate::sql::SqlOutcome, crate::sql::allowlist::SqlSurfaceError>

// COPY（Issue #939・WIRE-17）
pub fn begin_copy(
    &self,
    ctx: &PolicyContext,
    session: &crate::sql::mode::SessionState,
    sql: &str,
) -> Result<CopyPlan, crate::sql::allowlist::SqlSurfaceError>
pub fn begin_copy_in_txn<'e>(
    &'e self,
    ctx: &PolicyContext,
    session: &crate::sql::mode::SessionState,
    txn: &mut crate::sql::transaction::SessionTransaction<'e>,
    sql: &str,
) -> Result<CopyPlan, crate::sql::allowlist::SqlSurfaceError>
pub fn commit_copy_in(
    &self,
    ctx: &PolicyContext,
    batch: crate::sql::copy::CopyInBatch,
) -> Result<crate::sql::exec::InsertOutcome, crate::sql::allowlist::SqlSurfaceError>
pub fn commit_copy_in_txn<'e>(
    &'e self,
    ctx: &PolicyContext,
    txn: &mut crate::sql::transaction::SessionTransaction<'e>,
    batch: crate::sql::copy::CopyInBatch,
) -> Result<crate::sql::exec::InsertOutcome, crate::sql::allowlist::SqlSurfaceError>

// SQL テキスト経由の DML / DDL 入口（INSERT 以外）
pub fn execute_update_sql(&self, ctx: &PolicyContext, sql: &str)
    -> Result<crate::sql::exec::UpdateOutcome, crate::sql::allowlist::SqlSurfaceError>
pub fn execute_delete_sql(&self, ctx: &PolicyContext, sql: &str)
    -> Result<crate::sql::exec::DeleteOutcome, crate::sql::allowlist::SqlSurfaceError>
pub fn execute_truncate_sql(&self, ctx: &PolicyContext, sql: &str)
    -> Result<crate::sql::exec::TruncateOutcome, crate::sql::allowlist::SqlSurfaceError>

// 分割実行 DML（Issue #1129）の進捗照会・取り消し
pub fn show_partitioned_dml_in_session(
    &self,
    ctx: &PolicyContext,
    table: &str,
    operation_id: &crate::recovery::required_op_id::OperationId,
) -> Result<crate::sql::exec::QueryResult, crate::sql::allowlist::SqlSurfaceError>
pub fn cancel_partitioned_dml_in_session(
    &self,
    ctx: &PolicyContext,
    table: &str,
    operation_id: &crate::recovery::required_op_id::OperationId,
) -> Result<crate::sql::exec::QueryResult, crate::sql::allowlist::SqlSurfaceError>

// 整合性検査（読み取り専用）
pub fn verify_unique_index_read_only(
    &self,
    ctx: &PolicyContext,
    table: &str,
) -> Result<(), crate::tenant::TenantWriteError>

// NoSQL 表層（HTTP）向けの束縛済み入口。`bind` クロージャで SQL テキストを組み立てずに束縛する
pub fn execute_bound_search_in_session<F>(&self, ctx: &PolicyContext, session: &crate::sql::mode::SessionState, table: &str, bind: F) -> Result<crate::sql::exec::QueryResult, crate::sql::allowlist::SqlSurfaceError>
pub fn execute_bound_plan_search_in_session<F>(&self, ctx: &PolicyContext, session: &crate::sql::mode::SessionState, table: &str, question: &str, mode_literal: Option<&str>, limit: u32, bind: F) -> Result<crate::sql::exec::QueryResult, crate::sql::allowlist::SqlSurfaceError>
pub fn execute_bound_scan_in_session<F>(&self, ctx: &PolicyContext, session: &crate::sql::mode::SessionState, table: &str, bind: F) -> Result<crate::sql::exec::QueryResult, crate::sql::allowlist::SqlSurfaceError>
pub fn execute_bound_aggregate_in_session<F>(&self, ctx: &PolicyContext, session: &crate::sql::mode::SessionState, table: &str, bind: F) -> Result<crate::sql::exec::QueryResult, crate::sql::allowlist::SqlSurfaceError>
pub fn execute_bound_insert_in_session<F>(&self, ctx: &PolicyContext, table: &str, row_count: usize, operation_id: Option<&crate::recovery::required_op_id::OperationId>, bind: F) -> Result<crate::sql::exec::InsertOutcome, crate::sql::allowlist::SqlSurfaceError>
pub fn execute_bound_update_in_session<F>(&self, ctx: &PolicyContext, table: &str, operation_id: Option<&crate::recovery::required_op_id::OperationId>, bind: F) -> Result<crate::sql::exec::UpdateOutcome, crate::sql::allowlist::SqlSurfaceError>
pub fn execute_bound_delete_in_session(&self, ctx: &PolicyContext, bound: &crate::sql::parser::BoundDelete) -> Result<crate::sql::exec::DeleteOutcome, crate::sql::allowlist::SqlSurfaceError>
pub fn execute_bound_predicate_update_in_session<F>(&self, ctx: &PolicyContext, table: &str, operation_id: Option<&crate::recovery::required_op_id::OperationId>, bind: F) -> Result<crate::sql::exec::UpdateOutcome, crate::sql::allowlist::SqlSurfaceError>
pub fn execute_bound_predicate_delete_in_session<F>(&self, ctx: &PolicyContext, table: &str, operation_id: Option<&crate::recovery::required_op_id::OperationId>, bind: F) -> Result<crate::sql::exec::DeleteOutcome, crate::sql::allowlist::SqlSurfaceError>
pub fn execute_bound_partitioned_update_in_session<F>(&self, ctx: &PolicyContext, table: &str, operation_id: Option<&crate::recovery::required_op_id::OperationId>, chunk_rows: Option<std::num::NonZeroUsize>, bind: F) -> Result<crate::sql::exec::UpdateOutcome, crate::sql::allowlist::SqlSurfaceError>
pub fn execute_bound_partitioned_delete_in_session<F>(&self, ctx: &PolicyContext, table: &str, operation_id: Option<&crate::recovery::required_op_id::OperationId>, chunk_rows: Option<std::num::NonZeroUsize>, bind: F) -> Result<crate::sql::exec::DeleteOutcome, crate::sql::allowlist::SqlSurfaceError>
pub fn explain_bound_search_in_session<F>(&self, _ctx: &PolicyContext, session: &crate::sql::mode::SessionState, table: &str, bind: F) -> Result<crate::sql::exec::QueryResult, crate::sql::allowlist::SqlSurfaceError>
pub fn explain_bound_scan_in_session<F>(&self, _ctx: &PolicyContext, session: &crate::sql::mode::SessionState, table: &str, bind: F) -> Result<crate::sql::exec::QueryResult, crate::sql::allowlist::SqlSurfaceError>
pub fn explain_bound_aggregate_in_session<F>(&self, _ctx: &PolicyContext, session: &crate::sql::mode::SessionState, table: &str, bind: F) -> Result<crate::sql::exec::QueryResult, crate::sql::allowlist::SqlSurfaceError>
pub fn explain_bound_plan_in_session<F, E>(&self, ctx: &PolicyContext, session: &crate::sql::mode::SessionState, table: &str, question: &str, mode_literal: Option<&str>, bind: F) -> Result<crate::sql::exec::QueryResult, E>
~~~

0.2.0 で追加された `pub` 型:

~~~rust,ignore
/// [`EngineCore::begin_copy`]（Issue #939・WIRE-17）の戻り値。
#[derive(Debug)]
pub enum CopyPlan {
    From(crate::sql::copy::CopyInSession),
    To(crate::sql::allowlist::CopyFormat, crate::sql::exec::QueryResult),
}

/// [`EngineCore::parse_sql`] の結果（束縛前の検証済み構文形）。
#[derive(Debug, Clone, PartialEq)]
#[non_exhaustive]
pub enum ParsedSql {
    Statement(crate::sql::allowlist::Statement),
    Insert(crate::sql::allowlist::ValidatedInsert),
    Truncate(crate::sql::allowlist::ValidatedTruncate),
    Delete(crate::sql::allowlist::DeleteStatement),
    Update(crate::sql::allowlist::ValidatedUpdateForm),
    Transaction(crate::sql::transaction::TxnControl),
    DropTable(crate::sql::allowlist::ValidatedDropTable),
    CreateTable(crate::sql::allowlist::ValidatedCreateTable),
    Cursor(crate::sql::cursor::CursorStatement),
    Partitioned(crate::sql::partitioned::PartitionedControl),
    AlterTable(crate::sql::allowlist::ValidatedAlterTable),
    CreateView(crate::sql::allowlist::ValidatedCreateView),
    DropView(crate::sql::allowlist::ValidatedDropView),
    CreateIndex(crate::sql::allowlist::ValidatedCreateIndex),
    DropIndex(crate::sql::allowlist::ValidatedDropIndex),
    CreateType(crate::sql::allowlist::ValidatedCreateType),
    DropType(crate::sql::allowlist::ValidatedDropType),
}

/// [`EngineCore::parse_sql_prepared`] の結果（`$n` を含む SQL の束縛前テンプレート。Issue #935・WIRE-12）。
/// フィールドは非公開。
#[derive(Debug, Clone)]
pub struct PreparedSql { /* private */ }

impl PreparedSql {
    pub fn param_types(&self) -> &[crate::sql::params::PreparedParamType]
    pub fn parsed_if_unparameterized(&self) -> Option<&ParsedSql>
    pub fn expanded_bound_bytes(&self, values: &[Option<Vec<u8>>]) -> usize
    pub fn param_count(&self) -> u16
}

/// NoSQL 表層 `plan` 検索の束縛済み部品（TASK-186・NOSQL-2）。
#[derive(Debug, Clone, PartialEq)]
#[non_exhaustive]
pub struct PlanSearchBinding { /* private */ }

impl PlanSearchBinding {
    pub fn new(
        projection: Vec<crate::sql::parser::ProjectedColumn>,
        metadata_filters: Vec<crate::declarative_filter::MetadataFilter>,
    ) -> Self
    #[must_use]
    pub fn with_where_filters(
        mut self,
        expr_filters: Vec<crate::sql::udf_call::BoundExpr>,
        or_filters: Vec<crate::sql::where_tree::BoundOrGroup>,
    ) -> Self
}

/// `catalog::explain_index_names_in_txn` によるカタログ全件走査の累計回数（観測用。機微情報なし）。
#[derive(Debug, Clone, Copy, Default)]
pub struct ExplainIndexNameScanStats {
    pub scans: u64,
}
~~~

エラー型:

~~~rust,ignore
/// `VectorCore` 公開 API のエラー型。
#[derive(Debug)]
pub enum CoreError {
    Storage(StorageError),
    Catalog(CatalogError),
    Arena(ArenaError),
    Kernel(KernelError),
    Policy(PolicyError),
    InvalidK { k: usize },
    NotFound,
    ProviderResultRejected,
    Dispatch(DispatchError),
    GpuPathUnavailable,
    QueryPlannerUnavailable,
    QueryPlanning(crate::query_planner::PlanError),
    EmbedderUnavailable,
    QueryEmbedding(crate::embedding::EmbedError),
}

/// [`EngineCore::open_with_engine`] 専用のエラー型（Issue #407）。
#[derive(Debug)]
pub enum OpenWithEngineError {
    Storage(StorageError),
    SearchEngine(crate::search_engine::SearchEngineError),
}
~~~

## Options / Props

| Name (`EngineCore` builder method) | Purpose |
|------|------|
| `with_provider`（`path` を取る関連コンストラクタ。`self` ビルダーではない） | 検索 provider を直接注入して構築（CORE-13。`open_with_engine` / `from_storage` と同じ構築系） |
| `with_embedder` | ファイル形 `INSERT` のベクトル埋め込み注入 |
| `with_query_planner` / `with_tiered_query_planner` | LLM クエリ展開クライアントの注入（単一 / ティア別） |
| `with_incremental_config` | ファイル形 `INSERT` のチャンク化設定 |
| `with_ledger_mode` | `operation_id` 必須化ガード |
| `with_batch_limits` | 一括投入の処理量上限 |
| `with_precision_policy` | `precision` モード実行契約のサーバー側設定 |
| `with_dictionary_config` | 辞書的情報源抽出の設定 |
| `with_transaction_limits` | 明示トランザクション（SQL-31）の持続時間・文数の上限 |
| `with_dml_limits` | 述語形 UPDATE/DELETE の影響行数上限・複数行 `VALUES` の行数上限（Issue #997。CLI `--max-dml-affected-rows` / `--max-insert-rows`） |
| `with_partitioned_dml_limits` | 分割実行 DML の資源上限（Issue #1128。CLI `--partitioned-dml-*`） |
| `with_hnsw_scope` | HNSW opt-in 時に HNSW を使うテーブルの範囲（`HnswScope::All` / `Declared`。CLI `--hnsw-scope`） |

| Name (`EngineCore` SQL 実行メソッド) | Purpose |
|------|------|
| `execute_sql` | SQL 表層の単一文実行エントリポイント（TASK-75, SQL-1〜4）。セッション変数なしの後方互換 API |
| `execute_sql_in_session` | セッション（`SessionState`）を伴う SQL 実行エントリポイント（TASK-82, SQL-10）。`INSERT` を検出した場合は `execute_insert_sql` 相当の経路へ委譲 |
| `execute_insert_sql` | 単一 `INSERT` 文実行エントリポイント（TASK-80, SQL-10） |
| `execute_insert_sql_batch` | 複数ファイルを 1 バッチとする `INSERT` 実行エントリポイント（TASK-122, INDEX-4） |
| `execute_update_sql` / `execute_delete_sql` / `execute_truncate_sql` | SQL テキストによる `UPDATE` / `DELETE` / `TRUNCATE` の入口（0.2.0 追加） |
| `parse_sql` → `execute_parsed_in_session` / `describe_parsed_in_session` | 拡張クエリプロトコル用の 2 段階 API（Parse と Execute / Describe を分離。0.2.0 追加） |
| `parse_sql_prepared` → `bind_prepared` / `describe_prepared_in_session` | `$n` パラメータ付き SQL の Parse / Bind / Describe（WIRE-12。0.2.0 追加） |
| `new_session_transaction` / `begin_implicit_transaction` / `execute_sql_in_txn` / `execute_parsed_in_txn` | 明示・暗黙トランザクション（SQL-31・WIRE-16。0.2.0 追加） |
| `begin_copy` / `commit_copy_in`（`_in_txn` 版あり） | `COPY FROM STDIN` / `TO STDOUT`（WIRE-17。0.2.0 追加） |
| `execute_bound_*_in_session` / `explain_bound_*_in_session` | NoSQL 表層（HTTP）向けの束縛済み実行・EXPLAIN 入口（0.2.0 追加） |
| `show_partitioned_dml_in_session` / `cancel_partitioned_dml_in_session` | 分割実行 DML の進捗照会・取り消し（0.2.0 追加） |

## Notes

- `VectorCore` trait は 2 メソッド（`search` / `get_row`）のみの object-safe な最小インターフェース。設計意図はこの trait のみに `wire-server` を依存させることでプロトコル非依存を構造的に担保することだが、**現行の `wire-server` 実装はこの設計意図どおりにはなっていない**: `wire-server/src/simple_query.rs`（`use engine::core::EngineCore;`・`engine: &EngineCore` 引数）と `wire-server/src/server.rs`（`use engine::core::EngineCore;`・`engine: Arc<EngineCore>` フィールド）はいずれも具象型 `EngineCore` に直接依存しており、`VectorCore` trait には無い `EngineCore::execute_sql_in_session`（SQL 実行、TASK-82・SQL-10）を呼び出している。`VectorCore` trait 経由の疎結合は `EngineCore::search` / `EngineCore::get_row` の 2 メソッドに限った設計上の窓口であり、SQL 表層を含む wire-server の実際の呼び出し経路は `EngineCore` 固有 API に依存している。
- `execute_sql` は TASK-75（SQL-1〜4）由来の後方互換 API で、セッション変数を持たないため `SET search_mode` 等セッションを要する statement は受理しない。`execute_sql_in_session` は TASK-82（SQL-10）で `INSERT` 実行経路（`execute_insert_sql` への委譲）をセッション経由の SQL 実行に接続したエントリポイントで、直前に doc comment を持たない（private ヘルパー `read_txn_with_schema` の直後に定義されている）。
- `execute_insert_sql` / `execute_insert_sql_batch` はいずれも `execute_sql` とは独立した固有メソッドで、`VectorCore` trait へは昇格しない（`crates/engine/api/core_api.snapshot` の対象は `VectorCore` trait 本体のみのため、コア API シグネチャ安定性チェックに影響しない）。`execute_insert_sql_batch` は全文がファイル形であることを要求し、行形が 1 件でも混在すると `22000` で拒否する。一括投入上限超過時は redb・インメモリ索引・`operation_id` 台帳のいずれも変更されない（副作用ゼロ契約）。
- これら 4 メソッドの詳細な実行順序契約（`sql-execution` カテゴリで扱う `sql::exec::execute_statement` / `sql::parser::bind` 等の内部処理）はこのページの対象外。
- `CacheEntry` / `CacheState` / `DictCacheEntry` / `DictCacheState` / `PlannerBinding` / `UsingPlanExpansionResult` / `HnswEngineState` はいずれも非公開（`pub` なし）の内部型。
- `ParsedSql` は `#[non_exhaustive]` （0.2.0 時点で 17 variant）。クレート外の `match` にはワイルドカードアーム（`_ =>`）が必須のため、variant 追加で外部の正しい `match` は壊れない（原文 doc: 「variant を増やしても、クレート外の網羅 `match` を破壊的変更にしないため」）。DDL 系 variant（`DropTable` / `CreateTable` / `AlterTable` / `CreateView` / `DropView` / `CreateIndex` / `DropIndex` / `CreateType` / `DropType`）・`Cursor`・`Partitioned` の doc にある BREAKING CHANGE 注記（Issue #902 / #899 / WIRE-15・TASK-218 / #1129）は、クレート内の網羅 `match`（`EngineCore`）を更新したことの記録。`execute_parsed_in_session` はトランザクション文脈を持たないため `Transaction` / `Cursor` variant を拒否し、トランザクション対応の入口は `execute_sql_in_txn` / `execute_parsed_in_txn`。
- DDL（`CREATE TABLE` / `DROP TABLE` / `ALTER TABLE` / `CREATE VIEW` / `DROP VIEW` / `CREATE INDEX` / `DROP INDEX` / `CREATE TYPE` / `DROP TYPE`）の実行権限ゲートは `execute_parsed_in_session` が担う（wire-server CLI `--ddl-allowed-users`。未指定は全ユーザー拒否）。
- 0.1.0 のページでは `open` / `from_storage` / `from_storage_with_engine` / `with_provider` / `plan_query` のシグネチャを実際のソースと異なる形で転記していた。0.2.0 のソース（上記ブロック）で修正済み: `from_storage` は `provider` 引数を取り、`from_storage_with_engine` は infallible（戻り値 `Self`）、`with_provider` は `path` を取る関連関数（`Result<Self, CoreError>`）、`plan_query` は `ctx` / `table` / `question` を取る。`open` の戻り値は `CoreError`（`OpenWithEngineError` を返すのは `open_with_engine` のみ）。
- Migration (0.1.0 → 0.2.0): 新規 `open_with_durability`（`WriteDurability` を受ける構築時オプション）。`ParsedSql` / `CopyPlan` / `PreparedSql` / `PlanSearchBinding` は新規型。`plan_query_with_classification` / `plan_query_with_mode` / `dictionary_snapshot` / `hnsw_index_cache_stats` は 0.1.0 のソースにも存在したが 0.1.0 のページには未掲載だった（0.2.0 で `index_catalog_gate_cache_stats` / `explain_index_name_scan_stats` が新規）。API の追加差分は `crates/engine/api/core_api.snapshot`（`make core-api-check` の対象）で確認できる。
- `StorageError` の新 variant は `core.rs` ではなく `storage.rs` で定義される。storage ページを参照。
- `EngineCore` のフィールドは全て非公開（private）。フィールドへの直接アクセスはできず、`with_*` ビルダーメソッドと公開メソッドのみが公開 API。
- `PrefilterCache` は `pub(crate)`（クレート内部限定）。

## Related

- [lib](./lib.md)
- [error-format](./error-format.md)
