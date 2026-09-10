---
source: https://docs.rs/crate/fandhe-vector-db-engine/0.1.0/source/src/core.rs
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
    dictionary_cache: DictionaryCache,
    dictionary_config: crate::dictionary::DictionaryConfig,
    sparse_index_cache: crate::sql::sparse_cache::SparseIndexCache,
    sql_arena_cache: crate::sql::arena_cache::SqlArenaCache,
    scalar_index_cache: crate::sql::scalar_index::ScalarIndexCache,
    visible_bitmap_cache: crate::sql::visible_cache::VisibleBitmapCache,
    search_engine_kind: Option<crate::search_engine::SearchEngineKind>,
}
~~~

`EngineCore` の公開メソッド（シグネチャのみ）:

~~~rust,ignore
/// `VectorCore` の製品実装。永続化・カタログ・アリーナ構築・検索 provider を束ねる。
pub fn open<P: AsRef<Path>>(db_path: P) -> Result<Self, OpenWithEngineError>

/// [`Self::open`] と同じ初期化、ただし既に開かれた [`Storage`] から構築する。
pub fn from_storage(storage: Storage) -> Self

/// `db_path` を開き、指定 [`crate::search_engine::SearchEngineKind`] で検索 provider を初期化する。
pub fn open_with_engine<P: AsRef<Path>>(
    db_path: P,
    kind: crate::search_engine::SearchEngineKind,
) -> Result<Self, OpenWithEngineError>

/// [`Self::open_with_engine`] と同じ初期化、ただし既に開かれた [`Storage`] から構築する。
pub fn from_storage_with_engine(
    storage: Storage,
    kind: crate::search_engine::SearchEngineKind,
) -> Result<Self, OpenWithEngineError>

/// 検索 provider を差し替える（CORE-13。[`Self::open`] の既定 provider 以外を使う場合）。
pub fn with_provider(mut self, provider: Box<dyn SearchProvider>) -> Self

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

/// クエリテキストを LLM で展開する（TASK-110・PLAN-1）。
pub fn plan_query(&self, query_text: &str) -> Result<crate::query_planner::QueryExpansion, CoreError>

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
/// 1 バッチとして受け取る engine ローカル API の入口（SQL 表層に複数文・複数行
/// VALUES の構文拡張は導入しない。1 文 = 1 ファイルの検証済み `INSERT` 文の列
/// （`sqls`）を 1 バッチとして受け取る）。`VectorCore` trait への昇格は行わない
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
| `with_provider` | 検索 provider の差し替え（CORE-13） |
| `with_embedder` | ファイル形 `INSERT` のベクトル埋め込み注入 |
| `with_query_planner` / `with_tiered_query_planner` | LLM クエリ展開クライアントの注入（単一 / ティア別） |
| `with_incremental_config` | ファイル形 `INSERT` のチャンク化設定 |
| `with_ledger_mode` | `operation_id` 必須化ガード |
| `with_batch_limits` | 一括投入の処理量上限 |
| `with_precision_policy` | `precision` モード実行契約のサーバー側設定 |
| `with_dictionary_config` | 辞書的情報源抽出の設定 |

| Name (`EngineCore` SQL 実行メソッド) | Purpose |
|------|------|
| `execute_sql` | SQL 表層の単一文実行エントリポイント（TASK-75, SQL-1〜4）。セッション変数なしの後方互換 API |
| `execute_sql_in_session` | セッション（`SessionState`）を伴う SQL 実行エントリポイント（TASK-82, SQL-10）。`INSERT` を検出した場合は `execute_insert_sql` 相当の経路へ委譲 |
| `execute_insert_sql` | 単一 `INSERT` 文実行エントリポイント（TASK-80, SQL-10） |
| `execute_insert_sql_batch` | 複数ファイルを 1 バッチとする `INSERT` 実行エントリポイント（TASK-122, INDEX-4） |

## Notes

- `VectorCore` trait は 2 メソッド（`search` / `get_row`）のみの object-safe な最小インターフェース。設計意図はこの trait のみに `wire-server` を依存させることでプロトコル非依存を構造的に担保することだが、**現行の `wire-server` 実装はこの設計意図どおりにはなっていない**: `wire-server/src/simple_query.rs`（`use engine::core::EngineCore;`・`engine: &EngineCore` 引数）と `wire-server/src/server.rs`（`use engine::core::EngineCore;`・`engine: Arc<EngineCore>` フィールド）はいずれも具象型 `EngineCore` に直接依存しており、`VectorCore` trait には無い `EngineCore::execute_sql_in_session`（SQL 実行、TASK-82・SQL-10）を呼び出している。`VectorCore` trait 経由の疎結合は `EngineCore::search` / `EngineCore::get_row` の 2 メソッドに限った設計上の窓口であり、SQL 表層を含む wire-server の実際の呼び出し経路は `EngineCore` 固有 API に依存している。
- `execute_sql` は TASK-75（SQL-1〜4）由来の後方互換 API で、セッション変数を持たないため `SET search_mode` 等セッションを要する statement は受理しない。`execute_sql_in_session` は TASK-82（SQL-10）で `INSERT` 実行経路（`execute_insert_sql` への委譲）をセッション経由の SQL 実行に接続したエントリポイントで、直前に doc comment を持たない（private ヘルパー `read_txn_with_schema` の直後に定義されている）。
- `execute_insert_sql` / `execute_insert_sql_batch` はいずれも `execute_sql` とは独立した固有メソッドで、`VectorCore` trait へは昇格しない（`crates/engine/api/core_api.snapshot` の対象は `VectorCore` trait 本体のみのため、コア API シグネチャ安定性チェックに影響しない）。`execute_insert_sql_batch` は全文がファイル形であることを要求し、行形が 1 件でも混在すると `22000` で拒否する。一括投入上限超過時は redb・インメモリ索引・`operation_id` 台帳のいずれも変更されない（副作用ゼロ契約）。
- これら 4 メソッドの詳細な実行順序契約（`sql-execution` カテゴリで扱う `sql::exec::execute_statement` / `sql::parser::bind` 等の内部処理）はこのページの対象外。
- `CacheEntry` / `CacheState` / `DictCacheEntry` / `DictCacheState` / `PlannerBinding` / `UsingPlanExpansionResult` はいずれも非公開（`pub` なし）の内部型。
- `EngineCore` のフィールドは全て非公開（private）。フィールドへの直接アクセスはできず、`with_*` ビルダーメソッドと公開メソッドのみが公開 API。
- `PrefilterCache` は `pub(crate)`（クレート内部限定）。

## Related

- [lib](./lib.md)
- [error-format](./error-format.md)
