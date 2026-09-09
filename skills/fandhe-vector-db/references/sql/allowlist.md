---
source: https://docs.rs/crate/fandhe-vector-db-engine/0.1.0/source/src/sql/allowlist.rs
---

# sql::allowlist

AST 許可リスト検証（TASK-74・SQL-8・ERR-2）。`lexer` が返すトークン列を、明示的に許可した形状だけに一致するか再帰下降で判定する。期待しない字句・構文は個別に検出せず、期待する位置に来ないというだけで構造的に拒否する（fail-closed。未知・未対応構文は既定で拒否側に落ちる）。受理側（実在テーブルに対する検索・取得の実行）は本モジュールの管轄外（`sql::parser` / `sql::exec` が担う）。

## Signature / Usage

~~~rust,ignore
//! AST 許可リスト検証（TASK-74・SQL-8・ERR-2 参照。docs/spec/05-tasks.md・
//! docs/spec/04-behavior/sql-surface.md・docs/spec/04-behavior/error-format.md）。
//!
//! 責務境界: [`lexer`](crate::sql::lexer) が返すトークン列を、明示的に許可した
//! 形状だけに一致するか再帰下降で判定する。**許可リスト**として実装するため、
//! 期待しない字句・構文は個別に検出せず、期待する位置に来ないというだけで
//! 構造的に拒否する（fail-closed。未知・未対応構文は既定で拒否側に落ちる）。
//!
//! 受理側（実在テーブルに対する検索・取得の実行）は本モジュールの管轄外で、
//! 後続タスクが [`ValidatedStatement`] を土台に実装する。本モジュールは
//! 「許可形状の構造判定を通過させる」ところまでに責務を留める。

use crate::error_format::{ClassifiedError, ErrorClass};
use crate::recovery::required_op_id::LedgerMode;
use crate::sql::lexer::{self, Keyword, LexError, Token};
use crate::sql::plan::{self, EvaluationOrder, Stage};
use crate::sql::udf_call::{
    BinOp, Expr, MAX_CALL_ARGS, MAX_EXPR_DEPTH, MAX_EXPR_NODES, MAX_UDF_PARAMS,
};
use crate::sql::using_operation_id::OperationId;

/// ORDER BY の関数呼び出し形で許可する関数名を照合する（大文字小文字を区別しない）。
/// 未知の名前は fail-closed に拒否し、識別子であれば任意の名前を関数呼び出しとして
/// 受理してしまう構造上の抜け穴を作らない。
fn is_allowed_order_by_function_name(name: &str) -> bool {
    matches!(name.to_ascii_uppercase().as_str(), "HYBRID_RRF" | "HYBRID")
}

/// WHERE の述語呼び出し形（空引数）で許可する述語名を照合する（大文字小文字を
/// 区別しない）。未知の名前は fail-closed に拒否する。
fn is_allowed_where_predicate_name(name: &str) -> bool {
    matches!(name.to_ascii_uppercase().as_str(), "VISIBLE")
}

/// 集計関数（TASK-166・SQL-13）で許可する関数名を照合する（大文字小文字を区別
/// しない）。未知の名前は fail-closed に拒否する（[`is_allowed_where_predicate_name`]
/// と同方針）。`sql::udf_call::is_reserved_function_name` から名前空間一本化の
/// ため参照される（CREATE FUNCTION での集計関数名との衝突を防ぐ。Cursor Bugbot
/// 指摘対応・PR #229）。
pub(crate) fn is_aggregate_function_name(name: &str) -> bool {
    matches!(
        name.to_ascii_uppercase().as_str(),
        "COUNT" | "SUM" | "AVG" | "MIN" | "MAX"
    )
}

/// SQL 表層のエラー型。ERR-2 参照（docs/spec/04-behavior/error-format.md）。
/// engine 全体の共通エラー型統合は他タスクの管轄のため、本モジュールローカルの
/// 型として定義する。
#[derive(Debug, Clone)]
pub enum SqlSurfaceError {
    /// 許可リスト外の構文（構文解析失敗を含む）。
    UnsupportedSyntax { detail: String },
    /// FROM に指定したテーブルがスキーマカタログに存在しない。
    UndefinedTable { name: String },
    /// カタログ照会（`TableLookup`）側の内部エラー（redb I/O 等）。受理・拒否のいずれにも
    /// 倒さず、fail-closed にエラー伝播する（`.claude/rules/security.md`
    /// 「不安全な設計」対応）。
    Internal { detail: String },
    /// 構造は許可リストを通過したが、束縛（`sql::parser::bind`、TASK-75）が値・引数を
    /// 意味論的に不正と判定した（未知の列名・列型不一致・ベクトルリテラルの不正形式・
    /// 非有限値・次元不一致、`LIMIT` 範囲外、hybrid の 2 引数形（実行不能）等。ERR-2:
    /// `22000`）。
    InvalidInput { detail: String },
    /// untrusted 入力のサイズがアロケーション前の上限を超過した（ベクトルリテラル
    /// 64 KiB 超過、候補集合の容量上限超過等。ERR-2: `54000`）。
    PayloadTooLarge { detail: String },
    /// 書き込み系 SQL 文の文末専用句 `USING OPERATION_ID '<id>'`（SQL-10、TASK-80）の
    /// 省略（空文字値を含む）。RECOVER-1 の必須化ガードの前段として、SQL 表層が
    /// 書き込みトランザクションを開始する**前**に構造検証段階で fail-closed に
    /// 拒否する（ERR-2: `23502`）。
    MissingOperationId,
    /// INSERT 先の行 `id` が**呼び出し元テナントの名前空間内で**既に使われている
    /// （`tenant::insert_typed_row` の [`crate::tenant::TenantWriteError::IdConflict`]
    /// を SQL 表層へ写像したもの。ERR-2: `23505`）。行ストアの物理キーは
    /// `(tenant_id, id)` で名前空間化されているため（TABLE-12・RLS-9）、他テナントが
    /// 同じ `id` を保持していても本 variant にはならない。`operation_id` 単位の
    /// 冪等判定（台帳による重複拒否・内容不一致検出）は [`SqlSurfaceError::DuplicateOperationId`]・
    /// [`SqlSurfaceError::OperationIdContentMismatch`] が担う（TASK-101・RECOVER-10。
    /// TASK-94・RECOVER-3 の重複拒否契約を包含する）。
    IdConflict,
    /// `operation_id` 台帳（TASK-93）に記録済みの `operation_id` へ、**内容が一致する**
    /// 書き込みが再送された（TASK-101・対象ビヘイビア: RECOVER-10。
    /// [`crate::tenant::TenantWriteError::DuplicateOperationId`] の写像。ERR-2: `23505`）。
    /// 行キー衝突（[`SqlSurfaceError::IdConflict`]）とは別の固定文言を返し、クライアント
    /// が両者を取り違えないようにする。
    DuplicateOperationId,
    /// 台帳に記録済みの `operation_id` へ、**内容が異なる**書き込みが再送された、
    /// または内容一致を証明できない旧フォーマットの台帳エントリへ再送された
    /// （TASK-101・RECOVER-10。[`crate::tenant::TenantWriteError::OperationIdContentMismatch`]
    /// の写像。ERR-3（TASK-154）: `22023`。他のいかなる分類（特に `23505`）にも写像しない
    /// ことは `tests/error_format_err3.rs` で検証する。fail-closed:
    /// commit 済み確定の根拠にしない）。
    OperationIdContentMismatch,
    /// 集計関数（`COUNT`/`SUM`/`AVG`/`MIN`/`MAX`、TASK-166・SQL-13）の数値演算が
    /// `u64`/`f64` の表現範囲を超過した（`checked_add` 失敗・`f64` 側の非有限値化）。
    /// 黙って wrap・非有限値化せず fail-closed に拒否する（`.claude/rules/coding-rust.md`
    /// 「整数演算は checked_*/saturating_* を使う」対応）。`22003` は ERR-2
    /// （`docs/spec/04-behavior/error-format.md`）の表に未掲載のコードであり、
    /// SQL-13 が ERR-2 の拡張規則に基づいて独自定義する。
    NumericOutOfRange { detail: String },
}

impl SqlSurfaceError {
    /// ERR-2（docs/spec/04-behavior/error-format.md）の wire_code 写像。
    /// TASK-152 で単一真実源化した [`ClassifiedError::wire_code`] へ委譲する
    /// （既存の返値は 1 つも変えない。委譲先は `error_class()` の `match` のみを
    /// 単一の判定点として持つ）。
    pub fn wire_code(&self) -> &'static str {
        ClassifiedError::wire_code(self)
    }

    /// クライアント（wire 層 `ErrorResponse`）へそのまま返してよい文言を返す。
    /// `Internal`（`wire_code() == "XX000"`）は redb I/O エラー等の内部ストレージ
    /// 詳細を保持しているため固定の一般化メッセージへ丸め、それ以外の variant は
    /// 通常の `Display` 文言（テナント越境の存在情報を含まないよう各コンストラクタ
    /// 側で既に切り詰め・一般化済み）をそのまま返す（security.md P0「private
    /// 情報の漏えい」対応。`wire-server::simple_query` はエラー応答の整形時に
    /// `to_string()` ではなく必ずこちらを使うこと）。TASK-152 で
    /// [`ClassifiedError::client_message`] へ委譲する（返値は不変）。
    pub fn client_message(&self) -> String {
        ClassifiedError::client_message(self)
    }

    /// `pub(crate)`: `sql::allowlist::Parser::parse_operation_id_clause`・
    /// `sql::using_operation_id::OperationId::parse` が文末句の省略（空文字値を
    /// 含む）を報告するために使う（SQL-10、TASK-80）。
    pub(crate) fn missing_operation_id() -> Self {
        SqlSurfaceError::MissingOperationId
    }

    /// `pub(crate)`: `catalog.rs::impl TableLookup for Storage` が `CatalogError::Invalid`
    /// を `42601` へ写像する際にも、同じ切り詰め規約を経由させるために公開する。
    pub(crate) fn unsupported(detail: impl Into<String>) -> Self { /* ... */ }

    /// `pub(crate)`: `sql::parser::bind`（TASK-75）が束縛時の値・引数不正を報告するために
    /// 使う。他の variant と同じ切り詰め規約を経由する。
    pub(crate) fn invalid_input(detail: impl Into<String>) -> Self { /* ... */ }

    /// `pub(crate)`: `sql::parser::bind`・`sql::exec`（TASK-75）がアロケーション前の
    /// サイズ上限超過を報告するために使う。
    pub(crate) fn payload_too_large(detail: impl Into<String>) -> Self { /* ... */ }

    /// `pub(crate)`: `sql::aggregate`（TASK-166・SQL-13）が集計の数値演算オーバー
    /// フロー（`u64` の `checked_add` 失敗・`f64` の非有限値化）を報告するために使う。
    pub(crate) fn numeric_out_of_range(detail: impl Into<String>) -> Self { /* ... */ }
}

/// TASK-152（ERR-2）: `wire_code` 写像の単一真実源 [`ErrorClass`] へ委譲する。
/// variant → `ErrorClass` の対応は既存 `wire_code()` の返値と 1:1 で一致させ、
/// 委譲化で応答コードを変えない（`IdConflict` は行 `id` 衝突であり、原因を問わない
/// 一意制約違反の分類 [`ErrorClass::UniqueViolation`]（`23505`）へ写像する）。
impl ClassifiedError for SqlSurfaceError {
    fn error_class(&self) -> ErrorClass {
        match self {
            SqlSurfaceError::UnsupportedSyntax { .. } => ErrorClass::UnsupportedSqlSyntax,
            SqlSurfaceError::UndefinedTable { .. } => ErrorClass::TableNotFound,
            SqlSurfaceError::Internal { .. } => ErrorClass::InternalError,
            SqlSurfaceError::InvalidInput { .. } => ErrorClass::InvalidInput,
            SqlSurfaceError::PayloadTooLarge { .. } => ErrorClass::PayloadTooLarge,
            SqlSurfaceError::MissingOperationId => ErrorClass::MissingOperationId,
            SqlSurfaceError::IdConflict => ErrorClass::UniqueViolation,
            SqlSurfaceError::DuplicateOperationId => ErrorClass::UniqueViolation,
            SqlSurfaceError::NumericOutOfRange { .. } => ErrorClass::NumericOutOfRange,
            SqlSurfaceError::OperationIdContentMismatch => ErrorClass::OperationIdContentMismatch,
        }
    }

    fn client_message(&self) -> String {
        match self {
            SqlSurfaceError::Internal { .. } => "internal error".to_string(),
            other => other.to_string(),
        }
    }
}

/// FROM に指定したテーブルがスキーマカタログに実在するかを確認するための抽象。
/// `catalog.rs::Storage` に対して実装し（`impl TableLookup for Storage`）、
/// allowlist の単体テストを実 `redb` ストレージ非依存で書けるようにする軽量な境界。
pub trait TableLookup {
    /// `name` が定義済みテーブルなら `Ok(true)`、未定義なら `Ok(false)`。
    /// カタログ照会自体が失敗した場合（redb I/O 等）は `Err` とし、
    /// 存在するとも存在しないとも判定しない（fail-closed）。
    fn table_exists(&self, name: &str) -> Result<bool, SqlSurfaceError>;
}

/// ORDER BY 関数呼び出し形（`FunctionCall`, TASK-75）の 1 引数。本モジュールは
/// トークン種別（識別子／文字列リテラル）のみを構造として保持し、列名としての
/// 妥当性・リテラルの意味論的解釈は `sql::parser::bind`（TASK-75）の責務とする。
#[derive(Debug, Clone, PartialEq, Eq)]
pub enum FunctionArg {
    Ident(String),
    StringLiteral(String),
}

/// `ORDER BY` 式の許可形状。TASK-74・SQL-8 参照（docs/spec/05-tasks.md）。
/// TASK-75 でリテラル値・関数引数を保持するよう拡張した（構造判定だけでなく、
/// 後続の束縛（`sql::parser::bind`）がベクトルリテラル解析・hybrid 引数解釈に使う）。
///
/// **TASK-77（SQL-5）で追加した破壊的変更（BREAKING CHANGE、codex-review P1 指摘対応、
/// PR #266）**: `UsingPlan` variant を追加した。本 enum は `#[non_exhaustive]` を
/// 付けていない公開型のため、この型に対して網羅的 `match` を書いている下流コードは
/// 本バージョンで追加された variant に対応するまでコンパイルが通らなくなる
/// （[`WherePredicate`] の `Expression`（TASK-79）・`Prefix`（TASK-147）追加時と同じ
/// 既存の破壊的変更運用に倣う）。移行方針: 既存の網羅的 `match` に `UsingPlan` の腕
/// （`USING PLAN` 文には意味を持つフィールドが無く、通常到達しない防御的経路として
/// 扱ってよい）を追加する。spec 側の定義変更は不要（TASK-77・SQL-5 のスコープ内の
/// 追加であり、`docs/spec/05-tasks.md` の対応タスクに包含される）。
#[derive(Debug, Clone, PartialEq, Eq)]
pub enum OrderByForm {
    /// 距離演算子形（`<列> <=> '<ベクトルリテラル>'`）。
    Distance { column: String, literal: String },
    /// 関数呼び出し形。引数トークン列は構造（括弧の対応・許可トークン種別のみ）を
    /// 保持し、個数・意味の解釈は `sql::parser::bind` が行う（TASK-75 時点で
    /// `hybrid_rrf`/`HYBRID` は 2 引数形・4 引数形の両方を構造上受理するが、
    /// 実行可能（束縛成功）なのは 4 引数形のみ。2 引数形は構造は受理しつつ束縛時に
    /// `SqlSurfaceError::InvalidInput`（`22000`）で拒否する。既存 2 引数形の
    /// マーシャリング・許可リスト受理そのものは変更しない）。
    FunctionCall {
        name: String,
        args: Vec<FunctionArg>,
    },
    /// `USING PLAN('<query>')`（TASK-77・SQL-5）が選ばれた文のプレースホルダ。
    /// `ORDER BY` 節自体が構文上存在しない（`USING PLAN` は `ORDER BY` と相互排他）
    /// ため意味を持つフィールドを持たず、ランキングは
    /// [`ValidatedStatement::using_plan`] から `sql::using_plan` が独立に導出する。
    /// `sql::parser::bind_ranking` はこの variant に到達すると内部エラーで拒否する
    /// （到達は `core.rs` の分岐が壊れた場合のみの防御的経路）。
    UsingPlan,
}

/// WHERE 句の許可形状。名前を照合する述語呼び出し形は、許可された名前
/// （[`is_allowed_where_predicate_name`]）のみを通過させる。
///
/// **TASK-79（SQL-9）で追加した破壊的変更（BREAKING CHANGE）**: `Expression`
/// variant を追加した（宣言的 UDF・組み込み関数呼び出しを含む比較式
/// `<expr> <cmp> <expr>`。式の意味論検証は `sql::parser::bind_in_session` の責務）。
///
/// **TASK-147（EXT-3）で追加した破壊的変更（BREAKING CHANGE）**: `Prefix` variant
/// を追加した（`<col> LIKE '<prefix>%'` の前方一致条件。網羅的 `match` を持つ
/// 外部コードは要対応）。パターン文字列は無加工で保持し、意味論的な検証
/// （末尾 `%` のみ許可・空 prefix 拒否等）は `declarative_filter::parse_prefix_pattern`
/// （`sql::parser::bind_in_session` から呼ばれる）の責務とする。
#[derive(Debug, Clone, PartialEq, Eq)]
pub enum WherePredicate {
    /// 列と文字列リテラルの等価条件（TASK-75: リテラル値を保持する）。
    Equality { column: String, value: String },
    /// 前方一致条件（TASK-147・EXT-3）。`LIKE` は [`Keyword`] へ追加せず、TASK-80 と
    /// 同じ「`Token::Ident` をパーサー位置でのみ文脈照合」方式にして `like` という
    /// 列名を壊さない（`Parser::parse_where` 参照）。
    Prefix { column: String, pattern: String },
    /// 許可された名前の述語呼び出し形（空引数）。
    PredicateCall { name: String },
    /// 式の比較述語（TASK-79・SQL-9）。`Expr::Binary` の比較演算子（`> < >= <= =`）
    /// を頂点に持つ木のみを許可する（`parse_where` が構造的に保証する）。
    Expression(Expr),
}

/// SELECT リストの 1 項目（TASK-79・SQL-9 で式項目を追加する際の共通表現）。
#[derive(Debug, Clone, PartialEq, Eq)]
pub enum SelectItem {
    /// 既存の単純な列名項目（`*` 展開・裸の列名）。
    Column(String),
    /// 関数呼び出しを頂点に持つ式項目（TASK-79・SQL-9: 宣言的 UDF・組み込み関数の
    /// 結果列位置での呼び出し）。`alias` 省略時の列名は `sql::parser` が関数名から
    /// 導出する。
    Expr { expr: Expr, alias: Option<String> },
}

/// SELECT リストの許可形状（TASK-75）。`*`・単純な列名リストに加え、TASK-79（SQL-9）
/// で式項目（少なくとも 1 項目が関数呼び出しを含む形）を [`Items`] として追加した。
/// 全項目が単純な列名の場合は従来どおり [`Columns`] のまま（後方互換）。
///
/// **TASK-79（SQL-9）で追加した破壊的変更（BREAKING CHANGE）**: `Items` variant を
/// 追加した。
#[derive(Debug, Clone, PartialEq, Eq)]
pub enum Projection {
    All,
    Columns(Vec<String>),
    Items(Vec<SelectItem>),
}

/// 許可形状の構造判定を通過した SQL 文（後続タスクのパーサー・実行計画の土台）。
/// 本モジュールが保証するのはここまでの構造情報のみで、列名・リテラル値の意味論的な
/// 妥当性は検証しない（`sql::parser::bind` の責務）。
///
/// **TASK-161 で意図的に非公開化した破壊的変更（BREAKING CHANGE）**: 全フィールドを
/// `pub` から `pub(crate)` へ変更し `#[non_exhaustive]` を付与した。構築は
/// [`ValidatedStatement::new`]／[`ValidatedStatement::with_search_mode`]、読み取りは
/// [`ValidatedStatement::table_name`] 等の各アクセサーメソッドを使う。
#[derive(Debug, Clone, PartialEq, Eq)]
#[non_exhaustive]
pub struct ValidatedStatement {
    /// FROM に指定され、カタログ存在確認を通過したテーブル名。
    pub(crate) table_name: String,
    pub(crate) projection: Projection,
    pub(crate) order_by: OrderByForm,
    /// WHERE 句に含まれる述語（AND 結合順）。空なら WHERE 句なし。
    pub(crate) where_predicates: Vec<WherePredicate>,
    pub(crate) limit: u32,
    /// `LIMIT` 直後の文末専用句 `USING MODE '<literal>'`（TASK-161・SQL-12）の生
    /// リテラル値。省略時は `None`。値の意味論的妥当性（`recall`／`precision` の
    /// 2 値のみ有効）は本モジュールの管轄外で、`sql::mode::SearchMode::parse_literal`
    /// を経由する `sql::parser::bind_with_session` が検証する。
    pub(crate) search_mode: Option<String>,
    /// `HINT ORDER(...)` で指定された評価順序（TASK-76・SQL-7）。未指定時は
    /// [`EvaluationOrder::DEFAULT`]（既存 TASK-75 の固定順 RLS→SCALAR→DISTANCE）。
    pub(crate) evaluation_order: EvaluationOrder,
    /// `USING PLAN('<query>')`（TASK-77・SQL-5）で指定された自然言語クエリの生
    /// リテラル値。省略時は `None`。`ORDER BY` と相互排他（`Some` のとき
    /// `order_by` は必ず [`OrderByForm::UsingPlan`]）。値の展開（LLM クエリ
    /// プランニング、TASK-110・PLAN-1）・ハイブリッド実行形への束縛は
    /// `sql::using_plan` の管轄で、本モジュールは構文構造の受理までを担う。
    pub(crate) using_plan: Option<String>,
}

impl ValidatedStatement {
    /// クレート外から構築するための constructor（TASK-161 で `search_mode`
    /// フィールドを追加する以前の既存フィールド相当の引数を取る）。`search_mode`
    /// は未指定（`None`）で構築され、必要なら [`Self::with_search_mode`] を続けて
    /// 呼ぶ。
    pub fn new(
        table_name: String,
        projection: Projection,
        order_by: OrderByForm,
        where_predicates: Vec<WherePredicate>,
        limit: u32,
        evaluation_order: EvaluationOrder,
    ) -> Self { /* ... */ }

    /// `search_mode`（TASK-161・SQL-12）を設定したコピーを返すビルダー的メソッド。
    #[must_use]
    pub fn with_search_mode(mut self, search_mode: Option<String>) -> Self { /* ... */ }

    /// `using_plan`（TASK-77・SQL-5）を設定したコピーを返すビルダー的メソッド。
    ///
    /// **不変条件**（codex-review P1 指摘対応、PR #266）: `using_plan` に `Some`
    /// を渡した場合、`order_by` を無条件で [`OrderByForm::UsingPlan`] へ揃える。
    /// `None` を渡した場合は `order_by` を変更しない。
    #[must_use]
    pub fn with_using_plan(mut self, using_plan: Option<String>) -> Self { /* ... */ }

    /// FROM に指定され、カタログ存在確認を通過したテーブル名。
    pub fn table_name(&self) -> &str { &self.table_name }

    /// SELECT リストの許可形状。
    pub fn projection(&self) -> &Projection { &self.projection }

    /// ORDER BY 句の許可形状。
    pub fn order_by(&self) -> &OrderByForm { &self.order_by }

    /// WHERE 句に含まれる述語（AND 結合順）。空なら WHERE 句なし。
    pub fn where_predicates(&self) -> &[WherePredicate] { &self.where_predicates }

    /// `LIMIT` 句の値。
    pub fn limit(&self) -> u32 { self.limit }

    /// `USING MODE '<literal>'`（TASK-161・SQL-12）の生リテラル値。未指定時は `None`。
    pub fn search_mode(&self) -> Option<&str> { self.search_mode.as_deref() }

    /// `HINT ORDER(...)` で指定された評価順序（TASK-76・SQL-7）。
    pub fn evaluation_order(&self) -> EvaluationOrder { self.evaluation_order }

    /// `USING PLAN('<query>')`（TASK-77・SQL-5）の生リテラル値。未指定時は `None`。
    pub fn using_plan(&self) -> Option<&str> { self.using_plan.as_deref() }
}

/// [`validate_sql`]（TASK-161 の公開 API）が返す statement 種別。`SELECT` 以外の
/// 文が増えても [`ValidatedStatement`] 自体は SELECT 専用の構造を保つため、
/// 統一的な enum で包む。
/// **TASK-79（SQL-9）で追加した破壊的変更（BREAKING CHANGE）**: `CreateFunction`
/// variant を追加した。`Aggregate` variant が `GroupByClause`（TASK-167・SQL-14）
/// 経由で `f64`（HAVING リテラル）を保持するため `Eq` は導出しない
/// （`PartialEq` のみ。`Statement` の値比較はテストでのみ使う）。
#[derive(Debug, Clone, PartialEq)]
pub enum Statement {
    Select(ValidatedStatement),
    /// `SET search_mode = '<literal>'`（TASK-161・SQL-12）。カタログ照会を必要と
    /// しないためテーブル存在確認は行わない。
    SetSearchMode {
        value: String,
    },
    /// `CREATE FUNCTION <name>(<param>[, <param>...]) AS <expr>`（TASK-79・SQL-9）。
    /// カタログ照会を必要としない（セッションのみに影響するため FROM テーブルの
    /// 存在確認は行わない）。
    CreateFunction {
        name: String,
        params: Vec<String>,
        body: Expr,
    },
    /// 集計関数のみを結果列とする `GROUP BY` なし・単一行結果の `SELECT`
    /// （TASK-166・SQL-13。C6a）。`FROM` 単一テーブルのカタログ存在確認を通過済み。
    Aggregate(ValidatedAggregate),
    /// `EXPLAIN SELECT ... USING PLAN('<query>') ...`（TASK-78・SQL-6）。`USING PLAN`
    /// を伴う検索 SELECT の前置のみを受理し（`using_plan()` が必ず `Some`）、
    /// `FROM` 単一テーブルのカタログ存在確認を通過済み。`USING PLAN` を伴わない
    /// 通常 SELECT・集計・`SET`・`CREATE FUNCTION` への `EXPLAIN` 前置は許可リスト外
    /// として `42601` で拒否する。
    Explain(ValidatedStatement),
    /// `SELECT <投影> FROM <table> [WHERE ...] LIMIT n`（`ORDER BY`・`USING PLAN`
    /// のいずれも伴わない、ソートなしのフィルタ取得。Issue #454）。`FROM` 単一
    /// テーブルのカタログ存在確認を通過済み。契約の詳細は
    /// `docs/design/wide-retrieval-scan.md`（spec ビヘイビア ID は SQL-15・
    /// TASK-170 として付与済み〔vector-db-spec#12〕。確定化は TASK-170 が担う）参照。
    ///
    /// **本 variant の追加は破壊的変更（BREAKING CHANGE）**: 既存の網羅的
    /// `match` はワイルドカードアームの追加が必要。
    Scan(ValidatedScan),
}

/// 集計関数の種別（TASK-166・SQL-13）。関数名は [`is_aggregate_function_name`] で
/// 大文字小文字を区別せず照合済み。
#[derive(Debug, Clone, Copy, PartialEq, Eq)]
pub enum AggregateFunc {
    Count,
    Sum,
    Avg,
    Min,
    Max,
}

impl AggregateFunc {
    /// `AS <alias>` を省略した場合の既定結果列名（関数名の小文字）。
    pub(crate) fn default_alias(self) -> &'static str {
        match self {
            AggregateFunc::Count => "count",
            AggregateFunc::Sum => "sum",
            AggregateFunc::Avg => "avg",
            AggregateFunc::Min => "min",
            AggregateFunc::Max => "max",
        }
    }
}

/// 集計関数の引数（TASK-166・SQL-13）。`Star` は `COUNT(*)` 専用（`Parser::parse_aggregate_item`
/// が `COUNT` 以外での出現を構造的に拒否する）。
#[derive(Debug, Clone, PartialEq, Eq)]
pub enum AggregateArg {
    Star,
    Expr(Expr),
}

/// SELECT リストの集計項目 1 つ（TASK-166・SQL-13）。`alias` 省略時の列名は
/// [`AggregateFunc::default_alias`] を使う（`sql::parser::bind_aggregate` の責務）。
#[derive(Debug, Clone, PartialEq, Eq)]
pub struct AggregateItem {
    pub(crate) func: AggregateFunc,
    pub(crate) arg: AggregateArg,
    pub(crate) alias: Option<String>,
}

/// 集計 `SELECT` リストの 1 項目（TASK-167・SQL-14 で `AggregateItem` 単独から拡張）。
/// `GroupKey` は `GROUP BY` 句がある場合にのみ現れ、`GROUP BY` 列と同名の裸の
/// 識別子（任意で `AS <alias>`）だけを構造上受理する。
#[derive(Debug, Clone, PartialEq, Eq)]
pub enum AggregateSelectItem {
    Aggregate(AggregateItem),
    /// `column` は SELECT リストに書かれた識別子そのもの（構文解析時点では
    /// まだ `GROUP BY` 句を読んでいないため）。`GROUP BY` 句の列名と一致するかは
    /// `parse_aggregate_shape` が全体を読み終えた後に検査する。
    GroupKey {
        column: String,
        alias: Option<String>,
    },
}

/// `HAVING` 述語 1 つ（TASK-167・SQL-14）。左辺は SELECT リストに現れる集計項目の
/// 実効名（別名または既定名）への参照のみを許可し、右辺は数値リテラルに限定する
/// （集計関数呼び出し形の直接記述・列同士の比較・文字列リテラルはいずれも許可
/// リスト外）。意味論的な名前解決（存在確認・型検査）は
/// `sql::parser::bind_aggregate` の責務。
#[derive(Debug, Clone, PartialEq)]
pub struct HavingPredicate {
    pub(crate) item_name: String,
    pub(crate) op: BinOp,
    pub(crate) literal: f64,
}

/// `GROUP BY` 集計の `ORDER BY` 対象（TASK-167・SQL-14）。`GROUP BY` 列名、または
/// SELECT リストの集計項目の実効名のいずれかの識別子を指す（解決は
/// `sql::parser::bind_aggregate`）。
#[derive(Debug, Clone, PartialEq, Eq)]
pub struct AggregateOrderBy {
    pub(crate) target: String,
    pub(crate) descending: bool,
}

/// `GROUP BY <column> [HAVING ...] [ORDER BY ...] [LIMIT ...]`（TASK-167・SQL-14）の
/// 許可形状。`column` はカタログ照会前の識別子のまま保持し（`TEXT` 列限定等の
/// 意味論的検査は束縛段）、`having`/`order_by`/`limit` はいずれも省略可能。
#[derive(Debug, Clone, PartialEq)]
pub struct GroupByClause {
    pub(crate) column: String,
    pub(crate) having: Vec<HavingPredicate>,
    pub(crate) order_by: Option<AggregateOrderBy>,
    pub(crate) limit: Option<u32>,
}

/// 許可形状の構造判定を通過した集計 `SELECT` 文（TASK-166・SQL-13。TASK-167・
/// SQL-14 で `GROUP BY`/`HAVING`/`ORDER BY`/`LIMIT` を追加）。フィールドは
/// `pub(crate)`（クレート外からの直読み・直書き不可。カプセル化の方針は
/// [`ValidatedStatement`] と同じ）。
#[derive(Debug, Clone, PartialEq)]
pub struct ValidatedAggregate {
    pub(crate) table_name: String,
    /// SELECT リスト項目（順序保持。1..=MAX_AGGREGATE_ITEMS）。
    pub(crate) items: Vec<AggregateSelectItem>,
    pub(crate) where_predicates: Vec<WherePredicate>,
    /// `GROUP BY` 句（TASK-167・SQL-14）。`None` なら TASK-166・SQL-13 の
    /// 単一行集計（既存の受理形）のまま。
    pub(crate) group_by: Option<GroupByClause>,
}

impl ValidatedAggregate {
    pub fn table_name(&self) -> &str { &self.table_name }
    pub fn items(&self) -> &[AggregateSelectItem] { &self.items }
    pub fn where_predicates(&self) -> &[WherePredicate] { &self.where_predicates }
    /// `GROUP BY` 句（TASK-167・SQL-14）。`None` なら `GROUP BY` なしの単一行集計。
    pub fn group_by(&self) -> Option<&GroupByClause> { self.group_by.as_ref() }
}

/// 許可形状の構造判定を通過した広域取得（ソートなしのフィルタ取得）`SELECT` 文
/// （Issue #454）。ランキング段（`ORDER BY`・`USING PLAN`）・取得モード
/// （`USING MODE`）・評価順（`HINT ORDER`）のいずれも持たない（構文上 `LIMIT n`
/// の直後は文末のみを許可する）。フィールドは `pub(crate)`。
#[derive(Debug, Clone, PartialEq, Eq)]
pub struct ValidatedScan {
    pub(crate) table_name: String,
    /// [`ValidatedStatement::projection`] と同一の意味論（`*`・列名リスト・式項目）
    /// を共有する。
    pub(crate) projection: Projection,
    pub(crate) where_predicates: Vec<WherePredicate>,
    /// `LIMIT` 句の値。可視かつ WHERE を満たす行を先頭から最大この件数だけ返す
    /// （早期終了。順序保証はスナップショット内の物理走査順のみで、`ORDER BY`
    /// 相当の意味的順序は持たない）。
    pub(crate) limit: u32,
}

impl ValidatedScan {
    pub fn table_name(&self) -> &str { &self.table_name }
    pub fn projection(&self) -> &Projection { &self.projection }
    pub fn where_predicates(&self) -> &[WherePredicate] { &self.where_predicates }
    /// `LIMIT` 句の値（構造検証済みの生値。範囲検証は `sql::parser::validate_search_limit`
    /// が束縛時に行う）。
    pub fn limit(&self) -> u32 { self.limit }
}

/// INSERT の VALUES リストの 1 リテラル（SQL-10、TASK-80）。トークン種別
/// （文字列リテラル／数値）のみを構造として保持し、列型との照合・意味論的解釈は
/// `sql::parser::bind_insert` の責務とする。
#[derive(Debug, Clone, PartialEq)]
pub enum InsertLiteral {
    String(String),
    Number(String),
}

/// 許可形状の構造判定を通過した INSERT 文（SQL-10、TASK-80）。受理する形は
/// `INSERT INTO <table> (<col>[, <col>]*) VALUES (<lit>[, <lit>]*)
/// USING OPERATION_ID '<id>' [;]` の単一行形のみ（複数行 VALUES・RETURNING・
/// 可視性ラベル指定は許可リスト外）。
#[derive(Debug, Clone, PartialEq)]
pub struct ValidatedInsert {
    /// INTO に指定され、カタログ存在確認を通過したテーブル名。
    pub table_name: String,
    /// 列リストの宣言順（`columns[i]` は `values[i]` に対応する）。
    pub columns: Vec<String>,
    pub values: Vec<InsertLiteral>,
    /// 文末専用句で搬送された、検証済みの `operation_id`（SQL-10）。句の欠落・明示
    /// `NULL` はいずれも `None`（TASK-92・RECOVER-1）。`validate_insert` は
    /// `LedgerMode::Ledgered`（既定）では `None` を書き込みトランザクション開始前に
    /// `23502` で拒否するため、この構成では常に `Some` になる。
    /// `LedgerMode::CompareOnlyWithoutLedger` では `None` を許す。
    pub operation_id: Option<OperationId>,
}

/// SQL 文をトークン化し、許可リスト形式で構造検証する（TASK-161 の公開 API。
/// TASK-74 の `validate_statement` を `SELECT`／`SET search_mode`／
/// `CREATE FUNCTION`（TASK-79・SQL-9）の 3 statement 種別へ拡張したもの）。先頭
/// トークンで statement 種別を判定し、`SELECT` のみ `lookup` を通じて FROM テーブルの
/// カタログ存在確認まで行う（`SET`・`CREATE FUNCTION` はカタログ照会を要しない）。
///
/// 検証順序（決定的。同一入力には常に同一の [`SqlSurfaceError`] を返す）:
/// 1. 字句解析（入力長・トークン数上限を含む。失敗は [`SqlSurfaceError::UnsupportedSyntax`]）
/// 2. 構造の許可リスト判定（失敗は `UnsupportedSyntax`）
/// 3. `SELECT` の場合のみ、FROM 単一テーブルのカタログ存在確認
///    （不存在は [`SqlSurfaceError::UndefinedTable`]）
pub fn validate_sql(sql: &str, lookup: &impl TableLookup) -> Result<Statement, SqlSurfaceError>

/// INSERT 文をトークン化し、許可リスト形式で構造検証してから、`lookup` を通じて
/// INTO テーブルがカタログに実在するかを確認する（SQL-10、TASK-80 の公開 API）。
/// `validate_statement`（SELECT 専用、TASK-74）とは独立したエントリポイントとする
/// （SELECT 文に `USING OPERATION_ID` を付けた入力は `validate_statement` 側の
/// `expect_end_of_statement` が余剰トークンとして `42601` で拒否するため、
/// SELECT/INSERT を誤って混同受理する経路は構造的に存在しない）。
///
/// 検証順序は決定的（同一入力には常に同一の [`SqlSurfaceError`] を返す）。
/// `operation_id` 必須化ガード（`mode.require`。TASK-92・RECOVER-1）を含む段階構成の
/// 詳細は `recovery::required_op_id` モジュールドキュメント参照。
pub fn validate_insert(
    sql: &str,
    lookup: &impl TableLookup,
    mode: LedgerMode,
) -> Result<ValidatedInsert, SqlSurfaceError>
~~~

### 許可されている関数・述語名（大文字小文字を区別しない）

| カテゴリ | 許可名 | 用途 |
| --- | --- | --- |
| ORDER BY 関数呼び出し形 | `HYBRID_RRF`, `HYBRID` | ハイブリッド検索ランキング（C4） |
| WHERE 述語呼び出し形（空引数） | `VISIBLE` | RLS 可視性述語（`WHERE visible()`） |
| 集計関数 | `COUNT`, `SUM`, `AVG`, `MIN`, `MAX` | 集計 SELECT（TASK-166・SQL-13） |

## Options / Props

`wire_code()` は `ClassifiedError::wire_code`（`crate::error_format`、本 scope 外）へ委譲する薄いラッパーのため、数値コードの単一真実源はそちらが持つ。以下は `allowlist.rs` 内のドキュメントコメント・エラーコンストラクタのコメントに verbatim で現れる記述を転記したもの（`error_format.rs` 側での実測はしていない）。

| SqlSurfaceError variant | コメントに記載された wire_code |
| --- | --- |
| `InvalidInput` | `22000` |
| `PayloadTooLarge` | `54000` |
| `MissingOperationId` | `23502` |
| `IdConflict` | `23505`（`ErrorClass::UniqueViolation` へ写像） |
| `DuplicateOperationId` | `23505`（`ErrorClass::UniqueViolation` へ写像） |
| `OperationIdContentMismatch` | `22023`（ERR-3。他のいかなる分類、特に `23505` にも写像しないことを `tests/error_format_err3.rs` で検証） |
| `NumericOutOfRange` | `22003`（ERR-2 表に未掲載で SQL-13 が独自定義） |
| `UnsupportedSyntax` | `42601`（`sql::plan::PlanError` 経由の `HINT ORDER` 違反コメント、`sql::using_operation_id` 等複数箇所のコメントで一貫して言及） |
| `UndefinedTable` | `42P01`（`Statement::Explain` の doc comment で言及） |
| `Internal` | `XX000`（`sql::using_plan` の doc comment で言及。プランナー未注入・埋め込み未注入・LLM 応答異常の分類として使う） |

## Notes

- `LedgerMode` は `crate::recovery::required_op_id::LedgerMode` からの import で、本モジュールでは定義されない（storage/recovery scope の管轄）。`validate_sql` は `LedgerMode` を引数に取らない（`Statement` 全種別で共通）。`validate_insert` のみ `mode: LedgerMode` を取る（書き込み系のみ `operation_id` 必須化判断が必要なため）。
- `Parser<'a>`（再帰下降パーサー本体）は本ファイル内で完全に非公開（`struct Parser` もそのフィールド・メソッドもすべて非 `pub`）。クレート外に公開される解析エントリポイントは `validate_sql` / `validate_insert` のみ。
- `BinOp` / `Expr` / `MAX_CALL_ARGS` / `MAX_EXPR_DEPTH` / `MAX_EXPR_NODES` / `MAX_UDF_PARAMS` は `crate::sql::udf_call` からの import（sql-execution scope の管轄）。`OperationId` は `crate::sql::using_operation_id`（本 scope、[using-operation-id.md](./using-operation-id.md) 参照）。`EvaluationOrder` / `Stage` は `crate::sql::plan`（本 scope、[plan.md](./plan.md) 参照）。
- 許可リストは「拒否リスト」ではなく「既知形状のみ許可」の構造。未知の関数名・述語名は fail-closed に拒否される。
- spec 側の詳細な意味論的検証ルール一覧（private `vector-db-spec`）は非公開のため未記載。
- Distinct from `mssql` (node-mssql, T-SQL client) / `drizzle` (TypeScript ORM) / `supabase` (Postgres): this is a hand-rolled allowlist parser, not a general SQL grammar; PostgreSQL wire-protocol compatibility does not imply PostgreSQL SQL compatibility.

## Related

- [lexer](./lexer.md)
- [parser](./parser.md)
- [using-plan](./using-plan.md)
- [using-operation-id](./using-operation-id.md)
- [plan](./plan.md)
