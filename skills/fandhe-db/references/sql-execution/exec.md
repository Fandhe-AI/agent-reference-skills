---
source: https://docs.rs/crate/fandhe-vector-db-engine/0.1.0/source/src/sql/exec.rs
---

# sql::exec

SQL 表層の実行計画層（TASK-75・TASK-76）。`parser::bind` が返す `BoundStatement` を、既定順序 **RLS → SCALAR → DISTANCE**、または `HINT ORDER(...)` が指定した順序で実行する。`core.rs::EngineCore::execute_sql` からのみ呼ばれる想定で、`Storage` / `SearchProvider` / `PolicyContext` を束ねる。

## Signature / Usage

```rust,ignore
//! SQL 表層の実行計画層（TASK-75・TASK-76、対象ビヘイビア: SQL-1, SQL-2, SQL-3, SQL-4,
//! SQL-7。ポインタ: `docs/spec/05-tasks.md` TASK-75・TASK-76・
//! `docs/spec/04-behavior/sql-surface.md`・`docs/spec/04-behavior/rls.md` RLS-5）。
//!
//! 責務境界: `parser::bind` が返す `BoundStatement` を、既定順序 **RLS → SCALAR → DISTANCE**、
//! または `HINT ORDER(...)` が指定した順序（`crate::sql::plan::EvaluationOrder`）で実行する。
//! 順序が実効を持つのは SCALAR と DISTANCE の相対位置のみ（`crate::sql::plan::ExecutionPlan`
//! 参照）: SCALAR が先なら候補構築時に等価条件を事前適用し（従来どおり正確に `limit` 件）、
//! DISTANCE が先なら DISTANCE 段の後で等価条件を事後適用する（`limit` 未満になり得る。
//! under-fetch の救済（オーバーサンプル等）は本モジュールの管轄外）。
//!
//! RLS は **`HINT ORDER` の内容に関係なく**、唯一の実効的な防御である候補構築時の暗黙事前
//! フィルタ（`VectorArena::build_filtered_with_rows_in_txn` の `predicate`。`WHERE` 句の
//! `visible()` 呼び出し（`BoundStatement::rls_predicate_present`）の有無に**関係なく**無条件に
//! 適用する。SQL-3・RLS-7・RLS-8）を必ず経由する。この事前フィルタの述語は RLS の暗黙適用
//! フック（`crate::rls::ImplicitRlsHook`）経由で取得する（TASK-137・RLS-6, RLS-7）。加えて
//! `crate::rls::RlsSafetyNet`（TASK-136・RLS-5）を最終結果へ無条件に適用するが、この安全網は
//! 事前フィルタと同じ `arena`（既に `ctx.is_visible` を通過済みの候補集合）由来のラベルで
//! 再判定するため、現状の実行経路では不可視行を追加で落とすことはない。無効化できない構造に
//! してあるのは、候補集合の構築元が将来広がった場合の defense-in-depth としてで、「独立した
//! 2 つの検査が効いている」という意味ではない（詳細は `plan.rs` のモジュールドキュメント
//! 参照）。`HINT ORDER` で RLS 段を後段に置いても、事前フィルタの適用そのものは外れない
//! （security.md P0「テナント分離の検査を外す/緩める/バイパス経路を作らない」）。安全網通過
//! 済みの `hits` は `crate::rls::RlsVerifiedHits`（witness 型）としてのみ投影段へ渡り、生の
//! `Vec<(u64, f64)>` から投影へ到達する経路は型として存在しない。
//!
//! `core.rs::EngineCore::execute_sql`（TASK-75 で追加する固有メソッド。`VectorCore` trait は
//! 不変）からのみ呼ばれる想定で、`Storage`・`SearchProvider`・`PolicyContext` を束ねる。

/// 投影結果 1 セル。`row_codec::Value` の公開 enum は変更せず、`id` 疑似列
/// （`u64`）を表現するため独自の enum を持つ。
/// **TASK-79（SQL-9）で追加した破壊的変更（BREAKING CHANGE）**: `Float`・`Bool`
/// variant を追加した（宣言的 UDF・組み込み関数呼び出しの結果列。`row_codec::Value`
/// は変更しない方針を踏襲する）。
#[derive(Debug, Clone, PartialEq)]
pub enum Cell {
    Null,
    Integer(u64),
    Text(String),
    Vector(Vec<f32>),
    /// 式項目（TASK-79・SQL-9）の `Scalar` 型評価結果。
    Float(f64),
    /// 式項目（TASK-79・SQL-9）の `Bool` 型評価結果。
    Bool(bool),
}

/// 投影結果の列メタデータ。`Id` は疑似列（`ColumnType` を持たない）。
///
/// **TASK-79（SQL-9）で追加した破壊的変更（BREAKING CHANGE）**: `Computed` variant を
/// 追加した。
#[derive(Debug, Clone, PartialEq)]
pub enum ColumnMeta {
    Id,
    Scalar {
        name: String,
        ty: ColumnType,
    },
    /// 式項目（TASK-79・SQL-9）。`ColumnType` を持たない（`Cell::Float`/`Cell::Bool`/
    /// `Cell::Vector` のいずれになるかは実行時の評価結果の型による）。
    Computed {
        name: String,
    },
}

/// 投影結果 1 行。
#[derive(Debug, Clone, PartialEq)]
pub struct ResultRow {
    pub id: u64,
    pub score: f64,
    pub cells: Vec<Cell>,
}

/// `EngineCore::execute_sql` の成功応答。
#[derive(Debug, Clone, PartialEq)]
pub struct QueryResult {
    pub columns: Vec<ColumnMeta>,
    pub rows: Vec<ResultRow>,
}

/// `EngineCore::execute_insert_sql` の成功応答（SQL-10、TASK-80）。行形 `INSERT` は
/// 単一行のみを受理するため `rows_affected` は常に `1` になるが、
/// `INSERT 0 1` 相当の wire 応答（TASK-73）へ写像しやすいよう件数フィールドとして
/// 保持する。ファイル形 `INSERT`（TASK-120・INDEX-1, INDEX-2）は複数チャンク行を
/// 書き込むため `incremental` に計測・件数を保持し、行形では常に `None`。
#[derive(Debug, Clone, Copy, PartialEq, Eq)]
pub struct InsertOutcome {
    pub rows_affected: u64,
    pub incremental: Option<crate::incremental::IndexOutcome>,
}

/// `BoundStatement` を実行する（TASK-75 の公開 API）。`read_txn`・`schema` は呼び出し元
/// （`core.rs::EngineCore::execute_sql`）が単一の read トランザクション上で
/// `catalog::get_table_schema_in_txn` により取得し、`sql::parser::bind` へ渡したのと同一の
/// ものを渡す契約とする（Issue #56 レビュー指摘対応・codex P1: スキーマ取得（`bind` 用）と
/// 候補走査（`VectorArena::build_filtered_with_rows_in_txn`）が別 read トランザクションに
/// 分かれていると、その間に並行 DDL がコミットされた場合、`bind` が束縛した旧スキーマで
/// 新スナップショットの行を走査することになり、新設列の欠落やデコード失敗が生じ得た）。
///
/// `sparse_cache`（Issue #357）は hybrid ランキング（`Ranking::Hybrid`）かつ
/// `bound.metadata_filters`・`bound.expr_filters` がともに空のクエリに限り経由する。
/// `arena_cache`（Issue #363）が `Some` の場合、候補構築を同一テーブル世代内で再利用する。
/// `hnsw_cache`（Issue #408）は `Ranking::Distance` かつフィルタが空のクエリに限り経由する。
/// `sparse_cache`・`arena_cache`・`hnsw_cache` の 3 引数を追加した結果 `clippy::
/// too_many_arguments` の閾値（7）を超えるため、`pub(crate)` 専用の内部関数としてここで
/// 許容する（公開 API である `execute_statement` は従来どおり 6 引数のまま）。
///
/// crate 内部専用（`pub(crate)`）。`sql::sparse_cache::SparseCacheAccess`・
/// `sql::arena_cache::ArenaCacheAccess` が属するモジュールはいずれも `pub(crate)` であり、
/// 両型は crate 外から構築不能。公開 API としては下記の `execute_statement`（従来
/// シグネチャを維持し両方に `None` を渡す薄いラッパー）のみを経由させる。
#[allow(clippy::too_many_arguments)]
pub(crate) fn execute_statement_with_cache(
    read_txn: &redb::ReadTransaction,
    provider: &dyn SearchProvider,
    ctx: &PolicyContext,
    schema: &TableSchema,
    bound: &BoundStatement,
    precision_policy: &crate::precision::PrecisionPolicy,
    sparse_cache: Option<crate::sql::sparse_cache::SparseCacheAccess<'_>>,
    arena_cache: Option<crate::sql::arena_cache::ArenaCacheAccess<'_>>,
    hnsw_cache: Option<crate::sql::hnsw_cache::HnswCacheAccess<'_>>,
    scalar_cache: Option<crate::sql::scalar_index::ScalarCacheAccess<'_>>,
) -> Result<QueryResult, SqlSurfaceError>;

/// `BoundStatement` を実行する（TASK-75 の公開 API）。従来の 6 引数シグネチャを維持する
/// 薄いラッパー（Issue #357・#363 レビュー指摘対応・AGENTS.md「公開 API・エラー契約の
/// 互換性（P1）」: `execute_statement_with_cache` へ `SparseCacheAccess`・`ArenaCacheAccess`
/// を追加した際、両型が属するモジュールがいずれも `pub(crate)` のため crate 外から構築
/// 不能になり、本関数を呼べなくなる破壊的変更を招いていた）。本ラッパーは両方に `None` を
/// 渡し、それぞれのキャッシュ最適化を経由しない従来どおりの新規構築のみの経路として動作
/// する。crate 内部のキャッシュ経路（`core.rs`）は `execute_statement_with_cache` を直接呼ぶ。
pub fn execute_statement(
    read_txn: &redb::ReadTransaction,
    provider: &dyn SearchProvider,
    ctx: &PolicyContext,
    schema: &TableSchema,
    bound: &BoundStatement,
    precision_policy: &crate::precision::PrecisionPolicy,
) -> Result<QueryResult, SqlSurfaceError>;

/// **ベンチ計測専用**（非既定 feature `bench-internals`。Issue #660・PR #668
/// codex-review 指摘対応）。`project_rows` のうち `ProjectedColumn::Id` のみを対象とした
/// 投影経路を、`RlsSafetyNet::apply` 通過後の hits に対して単体で再現する。
/// `execute_statement` からは呼ばれない（production 経路は引き続き `project_rows` のみを
/// 通る）。
#[cfg(feature = "bench-internals")]
pub fn project_id_only_rows(
    verified: RlsVerifiedHits,
    arena: &VectorArena,
) -> Result<Vec<ResultRow>, SqlSurfaceError>;

/// `crate::sql::parser::BoundInsert` を実行する（SQL-10、TASK-80）。`core.rs::
/// EngineCore::execute_insert_sql` からのみ呼ばれる想定で、`Storage`・`PolicyContext` を
/// 束ねる（`execute_statement` と対称の役割）。クレート外へ公開する契約は持たず、可視性は
/// `pub(crate)` に留める。
///
/// 単一の write トランザクションで完結し、既存 `id` への黙った上書きは行わない。重複検出の
/// スコープは呼び出し元テナントの名前空間内に閉じる:
/// - 同一テナント内の `id` 重複は `SqlSurfaceError::IdConflict`（`23505`）
/// - 同一 `(tenant_id, table, operation_id)` への 2 回目以降の書き込みは
///   `SqlSurfaceError::DuplicateOperationId`（`23505`。TASK-94・RECOVER-3）
/// - 他テナントが同じ `id`／`operation_id` を保持していても本経路は成功する（存在オラクル
///   にならない）
pub(crate) fn execute_insert(
    storage: &crate::storage::Storage,
    ctx: &PolicyContext,
    bound: &crate::sql::parser::BoundInsert,
    ledger_mode: crate::recovery::required_op_id::LedgerMode,
) -> Result<InsertOutcome, SqlSurfaceError>;

/// ファイル形 `INSERT`（TASK-120・INDEX-1, INDEX-2）を実行する。`sql::parser::
/// bind_insert_form` が判別した `BoundFileInsert` を受け取り、`incremental::index_file`
/// へ委譲する。`embedder` が未設定（`None`）の場合は fail-closed に拒否する。可視性:
/// `operation_id` 必須化ガードは呼び出し元 `core::EngineCore::execute_insert_sql` が適用
/// 済みであり、本関数自体はガードを持たない。クレート外へ公開すると `BoundFileInsert` を
/// 直接構築してガードを迂回できるため `pub(crate)` に閉じる。
pub(crate) fn execute_file_insert(
    storage: &crate::storage::Storage,
    ctx: &PolicyContext,
    embedder: Option<&dyn crate::embedding::Embedder>,
    config: &crate::incremental::IncrementalConfig,
    bound: &crate::sql::parser::BoundFileInsert,
    ledger_mode: crate::recovery::required_op_id::LedgerMode,
) -> Result<InsertOutcome, SqlSurfaceError>;

/// `crate::incremental::BatchIncrementalError` を SQL 表層のエラー契約へ写像する
/// （TASK-122・INDEX-4。`core::EngineCore::execute_insert_sql_batch` の唯一の呼び出し元）。
/// 一括投入上限（`crate::batch_limits::BatchLimitsError`）は全 variant が `54000`
/// （`payload_too_large`。ERR-2・TASK-152）へ写像する。
pub(crate) fn map_batch_incremental_error(
    e: crate::incremental::BatchIncrementalError,
) -> SqlSurfaceError;
```

## Notes

- 上記は main が pin SHA（`7022d112e79760dca916480599553fcac256b5fb`）で保存したソース（`src/engine/src/sql/exec.rs`、全2500行超）から Read で verbatim 転記した公開・crate内トップレベル項目（`Cell` / `ColumnMeta` / `ResultRow` / `QueryResult` / `InsertOutcome` / `execute_statement_with_cache` / `execute_statement` / `project_id_only_rows` / `execute_insert` / `execute_file_insert` / `map_batch_incremental_error` の 11 件）。当初 WebFetch のみで作成した際は `execute_statement`（公開 API 本体）・`project_id_only_rows`・`execute_insert`・`execute_file_insert`・`map_batch_incremental_error` の 5 件が欠落しており、本改訂で補った
- private ヘルパー関数（`project_rows` 等）・型変換の内部実装は未転記
- **`DuplicateOperationId`（`23505`）の記述は現行契約とは不完全（PR #204 codex-review 第3ラウンド P1 対応）**: 上記フェンス内の `execute_insert` doc comment は「同一 `(tenant_id, table, operation_id)` への 2 回目以降の書き込みは `DuplicateOperationId`（`23505`）」と述べ、末尾で「内容不一致検出（同一 `operation_id`・異なる内容）は TASK-101・RECOVER-10 の管轄で**未提供**」と明記しているが、これは TASK-101 着手前の旧い記述が同一ファイル内に取り残されたものである。**現行の 0.1.0 実装では TASK-101・RECOVER-10 は実装済み**で、`execute_insert` 自身の同一ファイル内のエラー写像コメント（`TenantWriteError::DuplicateOperationId => SqlSurfaceError::DuplicateOperationId` の直前）が「台帳照合（TASK-101・RECOVER-10）: 同一 operation_id・同一内容の再送は `23505`、内容不一致（v1 レガシーエントリへの再送を含む）は `22023` へ写像する」と明記しており、こちらが現行契約。すなわち **同一 `operation_id` への再送は、内容が一致する場合のみ `23505`（`DuplicateOperationId`）、内容が不一致、または内容ハッシュを保持しない v1 レガシー台帳エントリで一致を証明できない場合は `22023`（`OperationIdContentMismatch`）** となる（`src/engine/src/tenant.rs` の `TenantWriteError::OperationIdContentMismatch`・`src/engine/src/recovery/ledger.rs` の `LedgerRecordError::ContentMismatch`／v1 レガシーエントリの扱い・`src/engine/src/recovery/content_hash.rs` のモジュール doc で確認）。`security/tenant.md`・`sql/allowlist.md`（他 scope）の記述と整合させること
- ADR `operation-id-ledger.md`（Issue #81・TASK-93）は「内容正規化ハッシュ・不一致検出（`22023`）（TASK-101）」を「本タスクのスコープ外（後続タスクの管轄）」と記す旧い時点の文書であり、TASK-101 が実装済みの現在は完了済みスコープとして読む
- ADR（`sql-arena-generation-cache` / `aggregate-decode-skip` / `expr-step-compilation`）は本文中で直接引用していないため個別に明記しない
- spec 非公開（`docs/spec/04-behavior/sql-surface.md` 等へのポインタのみ確認でき、本文は private repo のため未記載）
- Distinct from `mssql` / `drizzle` / `supabase`: this is the engine's internal execution layer, not a SQL dialect or ORM.

## Related

- [aggregate](./aggregate.md)
- [scalar-index](./scalar-index.md)
- [arena-cache](./arena-cache.md)
- [hnsw-cache](./hnsw-cache.md)
- [sparse-cache](./sparse-cache.md)
