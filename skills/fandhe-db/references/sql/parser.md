---
source: https://docs.rs/crate/fandhe-db-engine/0.2.0/source/src/sql/parser.rs
---

# sql::parser

SQL 表層の束縛層（TASK-75、SQL-1〜4）。`allowlist::validate_statement` が返す `ValidatedStatement`（構造は許可リストを通過済みだが、列名・リテラル値の意味論的妥当性は未検証）を `catalog.rs` の `TableSchema` と照合して意味論的に検証し、`exec` が直接実行できる `BoundStatement` へ変換する。未知の列名・列型不一致・ベクトルリテラルの不正形式・非有限値・次元不一致・LIMIT 範囲外・hybrid の 2 引数形などは `SqlSurfaceError::InvalidInput`（22000）または、アロケーション前のサイズ上限超過は `SqlSurfaceError::PayloadTooLarge`（54000）で fail-closed に拒否する。

## Signature / Usage

~~~rust,ignore
//! SQL 表層の束縛層（TASK-75、対象ビヘイビア: SQL-1, SQL-2, SQL-3, SQL-4。
//! ポインタ: `docs/spec/05-tasks.md` TASK-75・`docs/spec/04-behavior/sql-surface.md`）。
//!
//! 責務境界: [`allowlist::validate_statement`](crate::sql::allowlist::validate_statement)
//! が返す [`ValidatedStatement`](crate::sql::allowlist::ValidatedStatement)
//! （構造は許可リストを通過済みだが、列名・リテラル値の意味論的妥当性は未検証）を、
//! `catalog.rs` の [`TableSchema`] と照合して意味論的に検証し、[`exec`](crate::sql::exec)
//! が直接実行できる [`BoundStatement`] へ変換する。ここで検出する違反
//! （未知の列名・列型不一致・ベクトルリテラルの不正形式・非有限値・次元不一致・
//! `LIMIT` 範囲外・hybrid の 2 引数形など「受理構文だが値が不正」）は
//! [`SqlSurfaceError::InvalidInput`]（`22000`）または、アロケーション前のサイズ上限
//! 超過は [`SqlSurfaceError::PayloadTooLarge`]（`54000`）で fail-closed に拒否する。
//!
//! `unwrap`/`expect`/添字アクセス `[]` を使わず `get()`・`checked_*` で untrusted な
//! リテラル文字列を解析する（`.claude/rules/coding-rust.md`「untrusted 入力の扱い」）。

use crate::catalog::{ColumnType, TableSchema};
use crate::declarative_filter::{self, DeclarativeFilter, MetadataFilter};
use crate::sql::allowlist::{
    FunctionArg, InsertLiteral, OrderByForm, Projection, ValidatedInsert, ValidatedStatement,
    WherePredicate,
};
use crate::sql::plan::EvaluationOrder;
use crate::sql::udf_call::Expr;
use crate::sql::using_operation_id::OperationId;
use crate::sql::allowlist::SqlSurfaceError;
use crate::sql::mode::{self, SearchMode};

/// ベクトルリテラルの生バイト長上限（SQL-1）。アロケーション（`Vec<f32>` の確保・
/// カンマ分割）に入る前にこの長さで拒否する。
const MAX_VECTOR_LITERAL_BYTES: usize = 64 * 1024;

/// 投影対象の 1 列。`Id` は疑似列（`crate::storage::Row::id` 由来。スキーマの列では
/// ないため `column_index` を持たない）。`Column` の `index` は `TableSchema::columns`
/// の列順インデックス。`VECTOR` 列の位置は常に `row_codec::Value::Null` が入るため、
/// `exec.rs` はその位置を投影する際 `storage::Row::embedding` を別途参照する。
/// **TASK-79（SQL-9）で追加した破壊的変更（BREAKING CHANGE）**: `Computed` variant を
/// 追加した（宣言的 UDF・組み込み関数呼び出しを結果列位置で束縛した式）。
#[derive(Debug, Clone, PartialEq)]
pub enum ProjectedColumn {
    Id,
    Column {
        index: usize,
        name: String,
    },
    /// 式項目（TASK-79・SQL-9）。`name` は `AS <alias>` の指定値、省略時は関数名。
    Computed {
        name: String,
        expr: crate::sql::udf_call::BoundExpr,
    },
}

/// DISTANCE 段のランキング方式。C1/C2/C3（純粋・スカラー条件付き・RLS 適用 Top-k）は
/// `Distance`、C4（ハイブリッド）は `Hybrid` を使う（SQL-1〜4）。
#[derive(Debug, Clone, PartialEq)]
pub enum Ranking {
    Distance {
        query: Vec<f32>,
    },
    Hybrid {
        query: Vec<f32>,
        text_column_index: usize,
        query_text: String,
    },
}

/// 束縛済みの SQL 文（`exec::execute_statement` が直接実行する入力形）。
///
/// **TASK-161 で意図的に非公開化した破壊的変更（BREAKING CHANGE）**: 全フィールドを
/// `pub` から `pub(crate)` へ変更し `#[non_exhaustive]` を付与した。構築は
/// `BoundStatement::new` / `BoundStatement::with_mode`、読み取りは `BoundStatement::table`
/// 等の各アクセサーメソッドを使う。
#[derive(Debug, Clone, PartialEq)]
#[non_exhaustive]
pub struct BoundStatement {
    pub(crate) table: String,
    pub(crate) projection: Vec<ProjectedColumn>,
    /// SCALAR 段で適用するメタデータフィルタ（等価・前方一致、TASK-147・EXT-3）。
    /// **TASK-147 で追加した破壊的変更（BREAKING CHANGE）**: 旧 `scalar_filters:
    /// Vec<ScalarEq>`（等価専用）を `declarative_filter::MetadataFilter`
    /// （汎用 API。等価・前方一致の両方を表す）へ置換し、フィールド名も
    /// `metadata_filters` へ改名した。
    pub(crate) metadata_filters: Vec<MetadataFilter>,
    /// `WHERE` 句に `visible()` 呼び出し形が含まれていたか（SQL-3・RLS-7 参照）。
    /// **実行側の RLS 適用はこの値の有無に依存しない**（`exec.rs` は無条件に
    /// `PolicyContext::is_visible` を適用する）。本フィールドは束縛結果の可観測性
    /// （テスト・診断）のためだけに保持する。
    pub(crate) rls_predicate_present: bool,
    /// `WHERE` の式述語（TASK-79・SQL-9）。UDF インライン展開済みで、レジストリを
    /// 参照せず単独で評価できる。
    pub(crate) expr_filters: Vec<crate::sql::udf_call::BoundExpr>,
    /// `expr_filters` をステップ列コンパイルした実行形（Issue #353）。
    /// `expr_filters` と要素数・評価順が 1 対 1 対応する。`sql::exec` の SCALAR 段
    /// 行フックはこちらを評価する。`expr_filters` フィールド自体は EXPLAIN・
    /// テスト等の可観測性のため残置し、実行経路からは参照しない。
    pub(crate) expr_filter_programs: Vec<crate::sql::expr_program::ExprProgram>,
    pub(crate) ranking: Ranking,
    pub(crate) limit: usize,
    /// 取得モードの優先順位解決結果（TASK-161・SQL-12）。クエリ句 `USING MODE`
    /// とセッション変数から `crate::sql::mode::resolve_mode` が決定する。
    /// カーネル選択（`dispatch.rs`）の入力には含めない（`precision` の実行契約は
    /// TASK-162・SEARCH-9 の管轄。`sql::exec` が本フィールドを見て実行可否を判定する）。
    pub(crate) mode: crate::sql::mode::ResolvedMode,
    /// `HINT ORDER(...)` で指定された評価順序（TASK-76・SQL-7）。`allowlist` が
    /// 検証済みの `EvaluationOrder` をそのまま素通しする。
    pub(crate) evaluation_order: EvaluationOrder,
}

impl BoundStatement {
    /// クレート外から構築するための constructor（TASK-161 で `mode` フィールドを
    /// 追加する以前の既存フィールド相当の引数を取る）。`mode` は
    /// `resolve_mode(None, None)`（クエリ句・セッション変数いずれも未指定時の既定値、
    /// `recall`・`ModeSource::Default`）で構築され、必要なら `Self::with_mode` を
    /// 続けて呼ぶ。
    pub fn new(
        table: String,
        projection: Vec<ProjectedColumn>,
        metadata_filters: Vec<MetadataFilter>,
        rls_predicate_present: bool,
        ranking: Ranking,
        limit: usize,
        evaluation_order: EvaluationOrder,
    ) -> Self { /* ... */ }

    /// `mode`（TASK-161・SQL-12）を設定したコピーを返すビルダー的メソッド。
    #[must_use]
    pub fn with_mode(mut self, mode: crate::sql::mode::ResolvedMode) -> Self { /* ... */ }

    /// 束縛対象のテーブル名。
    pub fn table(&self) -> &str { &self.table }

    /// 投影対象の列一覧（`Row::id` 疑似列を含みうる）。
    pub fn projection(&self) -> &[ProjectedColumn] { &self.projection }

    /// SCALAR 段で適用するメタデータフィルタ一覧（等価・前方一致、TASK-147・EXT-3）。
    pub fn metadata_filters(&self) -> &[MetadataFilter] { &self.metadata_filters }

    /// `WHERE` 句に `visible()` 呼び出し形が含まれていたか（SQL-3・RLS-7 参照）。
    /// **実行側の RLS 適用はこの値の有無に依存しない**（可観測性のためだけの値）。
    pub fn rls_predicate_present(&self) -> bool { self.rls_predicate_present }

    /// `WHERE` の式述語（TASK-79・SQL-9）。UDF インライン展開済み。
    pub fn expr_filters(&self) -> &[crate::sql::udf_call::BoundExpr] { &self.expr_filters }

    /// DISTANCE 段のランキング方式。
    pub fn ranking(&self) -> &Ranking { &self.ranking }

    /// `LIMIT` 句の値。
    pub fn limit(&self) -> usize { self.limit }

    /// 取得モードの優先順位解決結果（TASK-161・SQL-12）。
    pub fn mode(&self) -> crate::sql::mode::ResolvedMode { self.mode }

    /// `HINT ORDER(...)` で指定された評価順序（TASK-76・SQL-7）。
    pub fn evaluation_order(&self) -> EvaluationOrder { self.evaluation_order }
}

/// 束縛済みの INSERT 文（SQL-10、TASK-80。`exec::execute_insert` が直接実行する
/// 入力形）。テナント・可視性はここでは決定しない（`exec::execute_insert` が
/// サーバー側で `PolicyContext` から導出・固定する。security.md P0
/// 「クライアント指定のテナントを信用しない」）。
#[derive(Debug, Clone, PartialEq)]
pub struct BoundInsert {
    pub table: String,
    /// 行キー（疑似列 `id`。列リストへの指定必須）。
    pub id: u64,
    /// `schema.columns` の列順に対応する値列（`id` 疑似列は含まない）。
    pub values: Vec<crate::row_codec::Value>,
    /// TASK-92（RECOVER-1）: `ValidatedInsert.operation_id` をそのまま素通しする。
    /// `LedgerMode::Ledgered`（既定）では `sql::allowlist::validate_insert` が既に
    /// `None` を `23502` で拒否済みのため常に `Some`。`CompareOnlyWithoutLedger`
    /// でのみ `None` になり得る。
    pub operation_id: Option<OperationId>,
}

/// `[f1,f2,...]` 形式のベクトルリテラルを解析する（SQL-1）。
///
/// 検証順序: (1) 生バイト長が `MAX_VECTOR_LITERAL_BYTES` を超えないこと
/// （超過は `SqlSurfaceError::PayloadTooLarge`。カンマ分割・`Vec<f32>` 確保より前に
/// 行う）。(2) `[`〜`]` で囲まれていること。(3) 各要素が `f32` としてパース可能かつ
/// 有限であること。(4) 要素数が `expected_dim` と一致すること。(2)〜(4) の違反は
/// `SqlSurfaceError::InvalidInput`。
pub fn parse_vector_literal(literal: &str, expected_dim: u32) -> Result<Vec<f32>, SqlSurfaceError>

/// スキーマの唯一の `VECTOR` 列（インデックス・宣言次元）を返す。`VECTOR` 列を
/// 持たないテーブルは束縛不能（`catalog.rs::validate_schema` が「`VECTOR` 列は
/// 高々 1 つ」を DDL 時点で強制済みのため、複数該当は構造上起こらない）。
/// `sql::using_plan`（TASK-77・SQL-5）が `Embedder` の返すベクトルの次元検証にも
/// 使うため `pub(crate)`。
pub(crate) fn vector_column(schema: &TableSchema) -> Result<(usize, u32), SqlSurfaceError>

/// `name` に一致する `Text` 列のインデックスを返す（`id` 疑似列は対象外）。
/// `sql::using_plan`（TASK-77・SQL-5）が本文列（規約列 `body`）の解決にも使う
/// ため `pub(crate)`。
pub(crate) fn text_column_index(
    schema: &TableSchema,
    name: &str,
) -> Result<usize, SqlSurfaceError>

/// SELECT リストの許可形状（`Projection`）を束縛する共通ヘルパー（TASK-77・
/// SQL-5 で `bind_in_session` から切り出した。`USING PLAN` 経路（`sql::using_plan`）も
/// 同一の投影列解決規則（実カラム優先・疑似列 `id`・`AS` エイリアス付き式項目）を
/// 必要とするため、この 1 箇所に集約する）。
pub(crate) fn bind_projection(
    projection: &Projection,
    schema: &TableSchema,
    udfs: &crate::sql::udf_call::UdfRegistry,
    node_budget: &mut usize,
) -> Result<Vec<ProjectedColumn>, SqlSurfaceError>

/// `WHERE` 句の許可述語列（`WherePredicate`）を束縛する共通ヘルパー
/// （TASK-166・SQL-13 で `bind_in_session` から切り出した。検索 SELECT
/// （`bind_in_session`）・集計 SELECT（`bind_aggregate`）の両方が同一の
/// 意味論（等価・前方一致条件は `declarative_filter::bind_all` に集約、`visible()`
/// はフラグのみ、式述語は `Bool` 型を要求）で WHERE を解釈する必要があるため、
/// 挙動を複製せずこの 1 箇所に集約する。戻り値は
/// `(metadata_filters, expr_filters, rls_predicate_present)` の組。
pub(crate) fn bind_where_predicates(
    where_predicates: &[WherePredicate],
    schema: &TableSchema,
    udfs: &crate::sql::udf_call::UdfRegistry,
    node_budget: &mut usize,
) -> Result<
    (
        Vec<MetadataFilter>,
        Vec<crate::sql::udf_call::BoundExpr>,
        bool,
    ),
    SqlSurfaceError,
>

pub fn bind(
    stmt: &ValidatedStatement,
    schema: &TableSchema,
) -> Result<BoundStatement, SqlSurfaceError> {
    bind_with_session(stmt, schema, None)
}

/// 検索 `SELECT`（`ORDER BY`／`USING PLAN` いずれの経路も含む）の `LIMIT`
/// 生値 `raw` を検証し、`1..=`[`crate::core::MAX_SEARCH_K`] の範囲内であることを
/// 確認した `usize` を返す（`bind_in_session`・`crate::sql::using_plan::
/// bind_expansion`・`core.rs::EngineCore::execute_sql_in_session` の `USING PLAN`
/// 分岐が同一の検証ロジック・エラー文言・`wire_code`（`22000`）を共有する
/// 単一実装。`core.rs` 側は `plan_using_plan_expansion`〔辞書スナップショット
/// 構築・LLM クエリ展開・再埋め込み〕という高コスト I/O より前に本関数を呼び、
/// `bind_expansion` 側の呼び出しは多層防御として残す。codex-review P1 指摘
/// 対応、PR #266: 高コスト処理の後段でのみ検証すると、`LIMIT 0`／`LIMIT
/// 4294967295` のような必ず拒否される入力でも untrusted 入力によるリソース
/// 増幅を許してしまう）。
pub(crate) fn validate_search_limit(raw: u32) -> Result<usize, SqlSurfaceError>

/// `ValidatedStatement` を `schema` と `session_mode`（呼び出し元の
/// `SessionState::search_mode`）と照合して `BoundStatement` へ束縛する（TASK-161 の
/// 公開 API）。UDF レジストリを持たないエントリポイント向けの後方互換 API で、
/// `bind_in_session`（TASK-79）へ空レジストリで委譲する。
pub fn bind_with_session(
    stmt: &ValidatedStatement,
    schema: &TableSchema,
    session_mode: Option<SearchMode>,
) -> Result<BoundStatement, SqlSurfaceError>

/// `ValidatedStatement` を `schema`・`session_mode`・UDF レジストリ `udfs`
/// （呼び出し元の `SessionState::udfs`）と照合して `BoundStatement` へ束縛する
/// （TASK-79・SQL-9 の公開 API。TASK-161 の `bind_with_session` を UDF 呼び出しの
/// 束縛（結果列・`WHERE` 式述語）へ拡張したもの）。`stmt.search_mode`（クエリ句
/// `USING MODE` の生リテラル）を `SearchMode::parse_literal` で検証し、
/// `session_mode` とあわせて `mode::resolve_mode` で優先順位解決する（クエリ句 >
/// セッション変数 > 既定）。クエリ句のリテラルが `recall`／`precision` 以外の場合は
/// `SqlSurfaceError::InvalidInput`（`22000`。構文上受理された値が不正）で
/// fail-closed に拒否し、黙って既定モードへ落とさない。
pub fn bind_in_session(
    stmt: &ValidatedStatement,
    schema: &TableSchema,
    session_mode: Option<SearchMode>,
    udfs: &crate::sql::udf_call::UdfRegistry,
) -> Result<BoundStatement, SqlSurfaceError>

/// `ValidatedInsert` を `schema` と照合して `BoundInsert` へ束縛する
/// （SQL-10、TASK-80 の公開 API）。
///
/// 検出する違反はすべて `SqlSurfaceError::InvalidInput`（`22000`）: 列名重複・
/// 列リストに疑似列 `id` を含まない・`id` 値が `u64` として解釈不能（範囲外を含む）・
/// 未知の列名・列型とリテラル種別の不一致（`VECTOR` 列に数値、`TEXT` 列にベクトル
/// リテラルを渡す等）・非 nullable 列の欠落。ベクトルリテラル自体の形式・次元・
/// 64 KiB 上限は既存の `parse_vector_literal` をそのまま再利用する。
///
/// テナント・可視性はここで解決しない（`exec::execute_insert` の責務。クライアント
/// が列リストへ `tenant_id`・可視性ラベル相当の名前を指定しても、スキーマ上の
/// 実列として照合されるだけで RLS フィールドへは書き込まれない）。
pub fn bind_insert(
    stmt: &ValidatedInsert,
    schema: &TableSchema,
) -> Result<BoundInsert, SqlSurfaceError>

/// ファイル形 `INSERT` の束縛結果（TASK-120・対象ビヘイビア: INDEX-1, INDEX-2）。
///
/// `sql::exec::execute_file_insert` → `incremental::index_file` へ渡され、`path`/`body`
/// はそのままチャンク化の入力になる。`template_values` はスキーマ列順で、
/// `path`/`body`/VECTOR 列の位置は必ず `Value::Null`（各チャンク行の構築時に
/// 上書きされるプレースホルダ。本文全文を残さないことでチャンク数分の複製増幅を
/// 避ける）、それ以外の Text 列（例 `lang`）は全チャンク行へ複製される値を保持する。
#[derive(Debug, Clone)]
pub struct BoundFileInsert {
    pub table: String,
    pub path: String,
    pub body: String,
    pub path_column_index: usize,
    pub body_column_index: usize,
    pub vector_column_index: usize,
    pub template_values: Vec<crate::row_codec::Value>,
    /// TASK-92（RECOVER-1）: `BoundInsert::operation_id` と同じく
    /// `ValidatedInsert.operation_id` をそのまま素通しする。
    pub operation_id: Option<OperationId>,
}

/// [`OnConflictAction::DoUpdate`] の SET 右辺を束縛した形（SQL-20・TASK-193、Issue #872）。
#[derive(Debug, Clone, PartialEq)]
pub enum BoundUpsertValue {
    /// `BoundInsert::values` の列インデックス（同じ行の束縛済み値を指す）。
    Excluded(usize),
    Literal(crate::row_codec::Value),
}

/// 束縛済みの `ON CONFLICT ... DO NOTHING | DO UPDATE SET ...`（SQL-20・TASK-193、Issue #872）。
#[derive(Debug, Clone, PartialEq)]
pub enum BoundConflictAction {
    DoNothing,
    /// (`schema.columns` の対象列インデックス, 右辺) 対応。宣言順を保持する。
    DoUpdate(Vec<(usize, BoundUpsertValue)>),
}

/// 束縛済みの `ON CONFLICT` 対象（TABLE-16、Issue #1074）。
#[derive(Debug, Clone, PartialEq)]
pub enum BoundConflictTarget {
    /// `ON CONFLICT (id)`。
    RowId,
    /// `ON CONFLICT (<col>[, <col>]*)` が、宣言済み UNIQUE 制約のいずれかの構成列
    /// **集合**と一致した場合の解決結果。`Vec<usize>` は `schema.columns` に対する
    /// 論理インデックスで、解決した制約の宣言順（対象リストに書いた順ではない）。
    Unique(Vec<usize>),
}

/// 束縛済みの UPSERT 文（SQL-20・TASK-193、Issue #872）。`rows` は 1 件以上で、
/// `action` は全行が共有する衝突分岐。
#[derive(Debug, Clone, PartialEq)]
pub struct BoundUpsert {
    pub table: String,
    pub rows: Vec<BoundInsert>,
    pub target: BoundConflictTarget,
    pub action: BoundConflictAction,
    pub operation_id: Option<OperationId>,
}

/// [`bind_insert_form`] の束縛結果。行形（既存の 1 行 1 ID `INSERT`）・複数行形
/// （SQL-16、TASK-190。複数行 `VALUES` を持つ行形）・ファイル形（TASK-120。
/// サーバー側チャンク化・ベクトル化を経由する `INSERT`）・UPSERT（SQL-20・
/// TASK-193、Issue #872）を区別する。
#[derive(Debug, Clone)]
pub enum BoundInsertForm {
    Row(BoundInsert),
    /// 複数行 `VALUES (...), (...), ...`（SQL-16、TASK-190）を束縛した行の並び
    /// （投入順を保持）。全行が同一テーブル・同一 `operation_id`。実行は
    /// `sql::exec::execute_insert_batch_with_schema` が NoSQL 表層の `rows[]` と共有する。
    RowBatch(Vec<BoundInsert>),
    File(BoundFileInsert),
    /// `ON CONFLICT ... DO NOTHING | DO UPDATE SET ...`（SQL-20・TASK-193）。
    /// 単一行・複数行 `VALUES` のいずれも本 variant を経由する。
    Upsert(BoundUpsert),
}

/// `ValidatedInsert` の列リストから行形・ファイル形いずれの `INSERT` かを束縛段階で
/// 判別し、対応する束縛結果を返す（TASK-120・対象ビヘイビア: INDEX-1, INDEX-2。
/// 複数行 `VALUES` の受理は SQL-16・TASK-190）。
///
/// 判別規則（すべて満たす場合のみファイル形。行数には依存しない）:
/// - 列リストに疑似列 `id` を含まない
/// - 列リストに、スキーマ上 `VECTOR` 型である列を含まない
/// - 列リストに Text 列 `path` と `body` を両方含む
///
/// いずれか 1 つでも欠ける場合は行形として扱う。ファイル形と判定されたにもかかわらず
/// 複数行 `VALUES` を持つ文は `42601` で拒否する。行形は `stmt.rows.len() == 1` なら
/// 既存の [`bind_insert`] へそのまま委譲し外部観測可能な挙動をビット同一に保ち、
/// `> 1` なら各行を束縛して [`BoundInsertForm::RowBatch`] を返す（束縛失敗はどの行で
/// 失敗したかに関わらず全体を `Err` として拒否し、部分成功はしない）。
/// `ON CONFLICT` は判別規則より前に分岐し、ファイル形との併用は `42601` で拒否する。
pub fn bind_insert_form(
    stmt: &ValidatedInsert,
    schema: &TableSchema,
) -> Result<BoundInsertForm, SqlSurfaceError>

/// 集計項目 1 つの引数を意味論的に解決した結果（TASK-166・SQL-13）。
/// `sql::aggregate::execute_aggregate` はこの enum だけを見て走査中の 1 行から
/// 集計対象値を取り出す（`schema`・`udfs` を再度参照しない自己完結な形）。
#[derive(Debug, Clone, PartialEq)]
pub(crate) enum AggregateInput {
    /// `COUNT(*)`・`COUNT(id)`・`COUNT(<Scalar 型の式>)` のいずれか。可視行はすべて
    /// 対象（NULL・非存在の概念がない）。`VECTOR` 列の裸の列参照は nullable 属性を
    /// 持つため対象外（`AggregateInput::VectorColumnPresence`）。
    AllVisible,
    /// 疑似列 `id`（`SUM`/`AVG`/`MIN`/`MAX`）。`f64` へ変換せず `u64` の
    /// `checked_add` で正確に演算する（ERR-2 が新設する `22003` で桁あふれを
    /// fail-closed に拒否するため）。
    IdU64,
    /// `TEXT` 列の裸の列参照（`schema.columns` の添字）。`COUNT`（非 NULL 行数）・
    /// `MIN`/`MAX`（バイト順・NULL 無視）でのみ使う（`SUM`/`AVG` は型不整合として
    /// 拒否済み）。
    TextColumn(usize),
    /// 上記以外の `Scalar` 型に束縛された式（列参照 `id` 単体を除く。`vec_norm(...)`
    /// 等の組み込み関数・宣言的 UDF 呼び出し・四則演算）。`program`（束縛時に
    /// ステップ列コンパイル済み、Issue #353）を行ループで評価する。`source` は
    /// 元の `BoundExpr`（EXPLAIN・テストの可観測性のため残置。実行経路は
    /// `program` のみを見る）。
    ScalarExpr {
        source: crate::sql::udf_call::BoundExpr,
        program: crate::sql::expr_program::ExprProgram,
    },
    /// `VECTOR` 列の裸の列参照（`COUNT` 限定）。`ALTER TABLE ADD COLUMN`（TABLE-5）で
    /// 追加された nullable な `VECTOR` 列の可能性があり、値が未設定の可視行は
    /// NULL として `COUNT` から除外する。
    VectorColumnPresence,
}

/// 束縛済みの集計項目 1 つ（TASK-166・SQL-13）。
#[derive(Debug, Clone, PartialEq)]
pub(crate) struct BoundAggregateItem {
    pub(crate) func: crate::sql::allowlist::AggregateFunc,
    pub(crate) input: AggregateInput,
    /// `AS <alias>` の指定値、省略時は関数名小文字（`AggregateFunc::default_alias`）。
    pub(crate) name: String,
}

/// SELECT リストの出力列 1 つ（TASK-167・SQL-14）。`GROUP BY` なしの単一行集計
/// （TASK-166・SQL-13）では `bind_aggregate` が `items` の宣言順で自動生成し、既存
/// 挙動を変えない。`GROUP BY` ありの場合は `AggregateSelectItem::GroupKey`／
/// `Aggregate` の並び順をそのまま反映する。
#[derive(Debug, Clone, PartialEq)]
pub(crate) enum ProjectionColumn {
    /// `GROUP BY` 列の値（`sql::group_by::GroupKey` から復元）。
    GroupKey { name: String },
    /// `items[item_index]` の集計結果。
    Aggregate { item_index: usize, name: String },
}

/// HAVING 述語 1 つを束縛した形（TASK-167・SQL-14）。`item_index` は
/// `BoundAggregate::items` の添字。
#[derive(Debug, Clone, Copy, PartialEq)]
pub(crate) struct BoundHaving {
    pub(crate) item_index: usize,
    pub(crate) op: crate::sql::udf_call::BinOp,
    pub(crate) literal: f64,
}

/// `ORDER BY` 対象を束縛した形（TASK-167・SQL-14）。
#[derive(Debug, Clone, Copy, PartialEq)]
pub(crate) enum OrderTarget {
    GroupKey,
    Aggregate(usize),
}

#[derive(Debug, Clone, Copy, PartialEq)]
pub(crate) struct BoundOrderBy {
    pub(crate) target: OrderTarget,
    pub(crate) descending: bool,
}

/// 束縛済みの `GROUP BY` 句（TASK-167・SQL-14）。`column_index` は `schema.columns`
/// の添字（束縛段で `TEXT` 列であることを確認済み）。
#[derive(Debug, Clone, PartialEq)]
pub(crate) struct BoundGroupBy {
    pub(crate) column_index: usize,
    pub(crate) having: Vec<BoundHaving>,
    pub(crate) order_by: Option<BoundOrderBy>,
    pub(crate) limit: Option<usize>,
}

/// 束縛済みの集計 SELECT 文（TASK-166・SQL-13。TASK-167・SQL-14 で `group_by`・
/// `projection` を追加）。`crate::sql::aggregate::execute_aggregate` が直接実行する
/// 入力形。`BoundStatement` と異なり検索固有のフィールド（`ranking`・`limit`・
/// `mode`・`evaluation_order`）を持たない。
#[derive(Debug, Clone, PartialEq)]
pub(crate) struct BoundAggregate {
    pub(crate) table: String,
    /// 集計項目（アキュムレータを持つ項目のみ。`GroupKey` 項目は含まない）。
    pub(crate) items: Vec<BoundAggregateItem>,
    pub(crate) metadata_filters: Vec<MetadataFilter>,
    pub(crate) expr_filters: Vec<crate::sql::udf_call::BoundExpr>,
    /// `expr_filters` をステップ列コンパイルした実行形（Issue #353。
    /// `BoundStatement::expr_filter_programs` と同じ 1 対 1 対応の契約）。
    pub(crate) expr_filter_programs: Vec<crate::sql::expr_program::ExprProgram>,
    pub(crate) rls_predicate_present: bool,
    /// 出力列順（`items` とは独立。`GROUP BY` の有無によらず常に構築する）。
    pub(crate) projection: Vec<ProjectionColumn>,
    /// `GROUP BY` 句（TASK-167・SQL-14）。`None` なら TASK-166・SQL-13 の単一行集計。
    pub(crate) group_by: Option<BoundGroupBy>,
}

/// `crate::sql::allowlist::ValidatedAggregate` を `schema`・UDF レジストリ `udfs`
/// と照合して `BoundAggregate` へ束縛する（TASK-166・SQL-13 の公開 API。
/// TASK-167・SQL-14 で `GROUP BY`/`HAVING`/`ORDER BY`/`LIMIT` の束縛を追加）。
/// `WHERE` 句の意味論は `bind_where_predicates` を検索 SELECT（`bind_in_session`）と
/// 共有する。式ノード予算（`crate::sql::udf_call::MAX_EXPR_NODES`）は集計項目＋
/// `WHERE` の全式項目で 1 文につき共有する（`bind_in_session` と同じ歯止め）。
pub(crate) fn bind_aggregate(
    stmt: &crate::sql::allowlist::ValidatedAggregate,
    schema: &TableSchema,
    udfs: &crate::sql::udf_call::UdfRegistry,
) -> Result<BoundAggregate, SqlSurfaceError>

/// 束縛済みの広域取得（ソートなしのフィルタ取得）`SELECT` 文（Issue #454）。
/// `crate::sql::scan::execute_scan` が直接実行する入力形。`BoundStatement` と
/// 異なりランキング段固有のフィールド（`ranking`・`mode`・`evaluation_order`）を
/// 持たない。
#[derive(Debug, Clone, PartialEq)]
pub(crate) struct BoundScan {
    pub(crate) table: String,
    pub(crate) projection: Vec<ProjectedColumn>,
    pub(crate) metadata_filters: Vec<MetadataFilter>,
    pub(crate) expr_filters: Vec<crate::sql::udf_call::BoundExpr>,
    /// `expr_filters` をステップ列コンパイルした実行形（Issue #353。同じ 1 対 1
    /// 対応の契約）。
    pub(crate) expr_filter_programs: Vec<crate::sql::expr_program::ExprProgram>,
    /// `LIMIT` の検証済み値（`1..=core::MAX_SEARCH_K`。`validate_search_limit`）。
    pub(crate) limit: usize,
}

/// `crate::sql::allowlist::ValidatedScan` を `schema`・UDF レジストリ `udfs` と
/// 照合して `BoundScan` へ束縛する（Issue #454 の公開 API）。投影・`WHERE` の
/// 意味論は検索 SELECT（`bind_in_session`）・集計 SELECT（`bind_aggregate`）と
/// 共有する（`bind_projection`・`bind_where_predicates`）。ランキング段
/// （`ORDER BY`・`USING PLAN`）・取得モード（`USING MODE`）は関与しない
/// （`crate::sql::allowlist::ValidatedScan` が構造上持たないため）。
pub(crate) fn bind_scan(
    stmt: &crate::sql::allowlist::ValidatedScan,
    schema: &TableSchema,
    udfs: &crate::sql::udf_call::UdfRegistry,
) -> Result<BoundScan, SqlSurfaceError>
~~~

0.2.0 の `parser.rs` で追加・公開化された項目（シグネチャのみ。0.1.0 の上記ブロックには無い。`BoundAggregate` / `BoundScan` などは 0.2.0 では `pub`（`new` / `with_*` / アクセサ付き）で、`BoundStatement` は `with_where_filters` / `or_filters()` を、`BoundScan` / `BoundAggregate` は `with_or_filters` / `or_filters()` を持ち、`WHERE ... OR` 群をサポートする）:

~~~rust,ignore
/// 束縛済みの単一行・`id` 指定形 `DELETE` 文（SQL-18・TASK-191）。
#[derive(Debug, Clone, PartialEq)]
pub struct BoundDelete {
    pub table: String,
    pub id: u64,
    pub operation_id: Option<OperationId>,
}
pub fn bind_delete(stmt: &ValidatedDelete) -> Result<BoundDelete, SqlSurfaceError>

pub struct BoundPredicateDelete { /* private */ }   // table() / metadata_filters() / expr_filters() / or_filters() / has_where_filters() / operation_id()
pub fn bind_predicate_delete(
    stmt: &ValidatedPredicateDelete,
    schema: &TableSchema,
    udfs: &crate::sql::udf_call::UdfRegistry,
) -> Result<BoundPredicateDelete, SqlSurfaceError>

pub struct BoundUpdate { /* 単一行・id 指定形 UPDATE の束縛結果 */ }
pub fn bind_update(
    stmt: &crate::sql::allowlist::ValidatedUpdate,
    schema: &TableSchema,
) -> Result<BoundUpdate, SqlSurfaceError>

pub struct BoundPredicateUpdate { /* private */ }   // table() / assignments() / metadata_filters() / expr_filters() / or_filters() / operation_id()
pub enum BoundUpdateForm { /* 単一行形 / 述語形 */ }
pub fn bind_update_form(
    stmt: &crate::sql::allowlist::ValidatedUpdateForm,
    schema: &TableSchema,
    udfs: &crate::sql::udf_call::UdfRegistry,
) -> Result<BoundUpdateForm, SqlSurfaceError>

pub fn bind_returning(
    returning: Option<&Projection>,
    schema: &TableSchema,
) -> Result<Option<Vec<ProjectedColumn>>, SqlSurfaceError>
pub fn bind_column_projection(
    columns: Option<&[String]>,
    schema: &TableSchema,
) -> Result<Vec<ProjectedColumn>, SqlSurfaceError>
pub fn bind_vector_values(values: &[f32], schema: &TableSchema) -> Result<Vec<f32>, SqlSurfaceError>
pub fn bind_body_text_column(schema: &TableSchema) -> Result<usize, SqlSurfaceError>
pub fn parse_array_literal(
    literal: &str,
    array_ty: impl std::borrow::Borrow<crate::catalog::ArrayType>,
) -> Result<crate::row_codec::ArrayValue, SqlSurfaceError>
pub fn validate_search_limit(raw: u32) -> Result<usize, SqlSurfaceError>    // 0.2.0 では pub
pub fn validate_search_offset(raw: u32) -> Result<usize, SqlSurfaceError>

/// DML の資源上限（Issue #997）。既定は両フィールドとも `None`（上限なし）。
#[derive(Debug, Clone, Copy, Default)]
pub struct DmlLimits {
    pub max_affected_rows: Option<std::num::NonZeroUsize>,
    pub max_insert_rows_per_statement: Option<std::num::NonZeroUsize>,
}
pub const MIN_DML_ROW_LIMIT: usize = 1;
pub const MAX_DML_ROW_LIMIT: usize = crate::tenant::MAX_SCANNED_ROWS;   // 1_000_000
pub fn check_dml_affected_rows_with_limit(
    count: usize,
    limit: Option<std::num::NonZeroUsize>,
) -> Result<(), SqlSurfaceError>
pub fn validate_dml_row_limit(value: usize) -> Result<std::num::NonZeroUsize, DmlRowLimitOutOfRange>

/// 分割実行 DML（Issue #1128・#1129。ADR partitioned-dml §15.2）のプロセス全体の設定値。
#[derive(Debug, Clone, Copy, PartialEq, Eq)]
pub struct PartitionedDmlLimits {
    pub chunk_rows: std::num::NonZeroUsize,              // 既定 1,000（1..=1,000,000）
    pub scan_budget_rows: std::num::NonZeroUsize,        // 既定 100,000（1..=MAX_SCANNED_ROWS）
    pub max_writer_hold: std::time::Duration,            // 既定 1 秒（100..=5,000 ms）
    pub interrupted_record_limit: std::num::NonZeroU64,  // 既定 1,000（1..=1,000,000）
    pub max_jobs_per_tenant: std::num::NonZeroUsize,     // 既定 1（1..=64。全体の上限以下）
    pub max_jobs_total: std::num::NonZeroUsize,          // 既定 4（1..=64）
}
impl PartitionedDmlLimits { pub fn validate(&self) -> Result<(), PartitionedDmlLimitsError> }
pub const DEFAULT_PARTITIONED_CHUNK_ROWS: usize = 1_000;
pub const DEFAULT_PARTITIONED_SCAN_BUDGET_ROWS: usize = 100_000;
pub const DEFAULT_PARTITIONED_MAX_HOLD_MS: u64 = 1_000;
pub const DEFAULT_PARTITIONED_INTERRUPTED_RECORD_LIMIT: u64 = 1_000;
pub const DEFAULT_PARTITIONED_MAX_JOBS_PER_TENANT: usize = 1;
pub const DEFAULT_PARTITIONED_MAX_JOBS_TOTAL: usize = 4;
pub const MAX_PARTITIONED_JOBS: usize = 64;
// 範囲検証: validate_partitioned_chunk_rows / validate_partitioned_scan_budget /
// validate_partitioned_max_jobs / validate_partitioned_interrupted_record_limit / validate_partitioned_max_hold_ms
~~~

## Notes

- Migration (0.1.0 → 0.2.0): `BoundInsertForm` に新 variant `RowBatch(Vec<BoundInsert>)`（複数行 `VALUES`。SQL-16・TASK-190）と `Upsert(BoundUpsert)`（`ON CONFLICT`。SQL-20・TASK-193）が追加された。この enum を網羅的に `match` していた利用側コードは、新 variant への対応を追加しないとコンパイルできない（CHANGELOG 0.2.0: `RowBatch` の追加が破壊的変更として記載されている）。単一行 `INSERT` の外部観測可能な挙動（wire プロトコル応答・`wire_code`）は不変（`bind_insert_form` は `stmt.rows.len() == 1` のとき既存の `bind_insert` へ委譲する）。`ValidatedInsert.values` → `rows` の変更は allowlist ページを参照。
- 0.2.0 では 0.1.0 で `pub(crate)` だった `BoundAggregate` / `BoundScan`（および `validate_search_limit`）が `pub` になり、`BoundScan::with_order_by` / `with_offset`（スカラー ORDER BY・OFFSET）、`BoundAggregate::new_grouped_by_columns`（複数列 `GROUP BY`）/ `with_group_order_by` / `with_group_offset`、`HavingOp` / `HavingSpec` などが追加された。上のフェンス内の `BoundAggregate` / `BoundScan` / `AggregateInput` は 0.1.0 時点の `pub(crate)` 定義の転記で、0.2.0 の定義とは異なる（詳細は `parser.rs` 参照）。
- `MetadataFilter` / `DeclarativeFilter` は `crate::declarative_filter` からの import（`use crate::declarative_filter::{self, DeclarativeFilter, MetadataFilter};`）。定義自体は本 scope 外（extensions scope）の管轄。
- `ProjectedColumn::Computed` / `BoundExpr` / `ExprProgram` / `UdfRegistry` / `BinOp` の実体は sql-execution scope（`udf_call.rs` / `expr_program.rs`）の管轄。
- `bind_aggregate` / `bind_scan`（`pub(crate)`）と集計・広域取得向けの `BoundAggregate` / `BoundScan` 型定義は `parser.rs` 内に定義されているため本ページに含めた。これらの実行消費（`AggregateInput` の評価等、`sql::aggregate::execute_aggregate_with_cache` / `sql::group_by`）は sql-execution scope の管轄。
- 上記フェンス内の doc comment（`AggregateInput`・`BoundAggregate` の verbatim 引用箇所）が言及する `sql::aggregate::execute_aggregate` は 0.1.0 ソースの doc comment に残る旧名の verbatim 引用。`Grep 'fn execute_aggregate\b'`（`src/engine/src/sql/aggregate.rs`）で該当なしを確認済みで、現行の実体は `sql::aggregate::execute_aggregate_with_cache`（関数名変更後もコメントが追従していないソース側の記述漏れ。本ページの転記誤りではない）。
- `bind_group_by_clause`（`GroupByClause` → `BoundGroupBy` の束縛）は private 関数のためシグネチャのみ本ファイルに存在するが、詳細な実装は今回のフェンスには含めていない（`HAVING`/`ORDER BY` の対象名解決規則に触れる複雑な関数のため、TASK-167・SQL-14 関連の詳細は原文参照）。
- Distinct from `mssql` (node-mssql, T-SQL client) / `drizzle` (TypeScript ORM) / `supabase` (Postgres): binding here is schema-checked against this engine's own `TableSchema`, not a general relational catalog.

## Related

- [allowlist](./allowlist.md)
- [using-plan](./using-plan.md)
- [mode](./mode.md)
- [plan](./plan.md)
- [scan](./scan.md)
