---
source: https://docs.rs/crate/fandhe-db-engine/0.2.0/source/src/sql/udf_call.rs
---

# sql::udf_call

宣言的 UDF 呼び出しの式層（TASK-79、対象ビヘイビア: SQL-9）。`CREATE FUNCTION <name>(<params>) AS <expr>` で定義した宣言的 UDF を `SELECT` の結果列・`WHERE` 条件のいずれの位置からも単一文で呼び出せるようにする式 AST・レジストリ・束縛・評価を提供する。0.2.0 では文字列・数値・日時の組み込み関数、`CASE` / `COALESCE` / `NULLIF`、`NULL`、`DATE` / `TIMESTAMP` リテラル、列参照（`TEXT` / `DATE` / `TIMESTAMP` / 数値列）が加わった（SQL-26）。

## Signature / Usage

```rust,ignore
//! 責務境界:
//! - 構文（`Expr`）は `sql::allowlist::Parser` が組み立て、列名・関数名の意味論的な
//!   妥当性は検証しない（許可リスト層の既存分業を踏襲）。
//! - 束縛（`bind_expr`）は `sql::parser` の束縛段から呼ばれ、列参照の解決・
//!   関数名の解決（組み込み／登録済み UDF）・静的型検査・UDF 本体のインライン展開を
//!   行う。展開後は `BoundExpr`（レジストリを参照しない自己完結した木）になる。
//! - 評価（`eval`）は `sql::exec` の RLS→SCALAR 段のフック（結果列・`WHERE` の
//!   両方から呼ばれる）・投影段から呼ばれる。可視行（RLS-8 の暗黙適用を通過した行）
//!   にしか到達しない前提を `eval` 自体は検査しない（呼び出し元の契約）。
//!
//! untrusted な SQL 入力を扱うため `unwrap`/`expect`/添字アクセス `[]` を使わない。
//! 0 除算・非有限値（NaN/∞）の生成は行単位で fail-closed に拒否し、黙って 0 や
//! NULL へ丸めない。

/// UDF 定義が持てるパラメータ数の上限（`54000` で拒否）。
pub const MAX_UDF_PARAMS: usize = 32;
/// 関数呼び出し（組み込み・UDF 問わず）1 回あたりの引数数上限（`54000`）。
pub const MAX_CALL_ARGS: usize = 32;
/// 式の構文解析時の再帰深さ上限（スタック消費の上限。`54000`）。
pub const MAX_EXPR_DEPTH: usize = 32;
/// UDF インライン展開後の式ノード数上限（多段呼び出しによる指数的膨張への歯止め）。
/// `sql::allowlist::Parser` はこれと同一の値を構文解析時のノード数予算
/// （`Parser::expr_node_budget`）としても共有する（`54000`）。
pub const MAX_EXPR_NODES: usize = 1024;
/// `CASE` 式 1 個が持てる `WHEN` 分岐数の上限（対象ビヘイビア: SQL-26。Issue #921）。
/// 構文段（`parse_case_expr`）と束縛段（`bind_case`）で独立に検査する（`54000`）。
pub const MAX_CASE_BRANCHES: usize = 64;
/// `CASE`／`COALESCE`／`NULLIF` の入れ子段数上限（SQL-26。Issue #921）。構文段では字面上の
/// ネストを、束縛段（`BindEnv::case_nesting`）では UDF 本体インライン展開後の実際のネストを、
/// それぞれ独立に検査する（`54000`）。
pub const MAX_CASE_NESTING: usize = 8;
/// セッションが保持できる UDF 定義数上限（宣言的・WASM 合算。`54000`）。
pub const MAX_SESSION_UDFS: usize = 64;

/// 数値リテラルの生文字列（符号なし）を `f64` へ束縛する（TASK-79・SQL-9 から TASK-167・SQL-14 が共有）。
/// `2^53` を超える整数は丸め変換の前に整数として検査して拒否する（fail-closed）。
pub(crate) fn parse_number_literal(raw: &str) -> Result<f64, SqlSurfaceError>;

/// 式の二項演算子。
#[derive(Debug, Clone, Copy, PartialEq, Eq, Hash)]
pub enum BinOp {
    Add,
    Sub,
    Mul,
    Div,
    Gt,
    Lt,
    Ge,
    Le,
    Eq,
}

/// 構文段の式 AST（`allowlist::Parser` が構築する。列名・関数名の意味論的妥当性は
/// 未検証）。`CREATE FUNCTION` の本体・`SELECT` の式項目・`WHERE` の式述語が共通で使う。
#[derive(Debug, Clone, PartialEq, Eq)]
pub enum Expr {
    /// 数値リテラル（`lexer::Token::Number` の生文字列。小数を許容）。
    Number(String),
    /// 文字列リテラル（Issue #919・SQL-26。値は字句段でクォート解除済み）。単独では TEXT 型として束縛する。
    /// 比較演算子の片側だけが文字列リテラルで反対側が数値のときに限り、PostgreSQL の unknown 型リテラルと
    /// 同様に反対側の型として解釈する（Issue #1408）。
    String(String),
    /// 識別子（列参照・UDF パラメータ参照のいずれかは束縛段で解決する）。
    Ident(String),
    /// 関数呼び出し（組み込みまたは登録済み UDF のいずれかは束縛段で解決する）。
    Call { name: String, args: Vec<Expr> },
    Binary {
        op: BinOp,
        lhs: Box<Expr>,
        rhs: Box<Expr>,
    },
    /// `NULL` リテラル（SQL-26。Issue #921）。束縛段は `CASE` の THEN／ELSE・`COALESCE`／`NULLIF` の引数の
    /// 3 箇所でのみ受理し、型を兄弟枝から単一化する。それ以外の位置（`id + NULL` 等）は `0A000` で拒否する。
    Null,
    /// 検索形 `CASE WHEN <cond> THEN <result> {WHEN ...} [ELSE <result>] END`（SQL-26）。
    Case {
        whens: Vec<(Expr, Expr)>,
        else_result: Option<Box<Expr>>,
    },
    /// `COALESCE(<arg>, ...)`。最初の非 NULL 引数を返す。
    Coalesce(Vec<Expr>),
    /// `NULLIF(<lhs>, <rhs>)`。両辺が等しければ NULL、異なれば `lhs` を返す。
    NullIf(Box<Expr>, Box<Expr>),
    /// `DATE '<literal>'`（SQL-26。Issue #920）。構文段で `crate::datetime::parse_date` 解析済みの値（1970-01-01 起点の日数）を保持する。
    DateLiteral(i32),
    /// `TIMESTAMP '<literal>'`（値は `crate::datetime::parse_timestamp` の解析結果＝マイクロ秒）。
    TimestampLiteral(i64),
}

/// 束縛済み（列参照・関数呼び出しの解決、UDF 本体のインライン展開が完了した）式。
/// レジストリを参照せずに単独で評価できる（`eval` の入力）。`PartialEq` は手動実装
/// （`WasmCall` のバックエンド同一性は `Arc::ptr_eq`）。
#[derive(Debug, Clone)]
pub enum BoundExpr {
    Number(f64),
    /// 文字列リテラル（束縛済み。Issue #919・SQL-26）。
    Text(String),
    /// nullable TEXT 列の参照（Issue #919・SQL-26）。`index` は `schema.columns` と同じ論理列インデックス。
    /// 評価時は呼び出し元が渡す行スカラー値（`eval_with_scalars` の `row_scalars`）から解決する。
    /// マスク外参照は実 NULL と取り違えず `Internal` として fail-closed に拒否する。
    TextColumnRef { index: usize },
    /// 疑似列 `id`（行 `id` を `f64` として扱う）。
    IdRef,
    /// 疑似列 `id` と整数 `value` の厳密比較（Issue #1352）。`u64` の行 `id` を `i128` へ無損失拡大して
    /// 整数のまま比較する（`2^53` 超でも `22003` にならない）。`op` は `Eq`／`Lt`／`Le`／`Gt`／`Ge` のみ。
    IdCompare { op: BinOp, value: i128 },
    /// テーブルの `VECTOR` 列参照（1 テーブルにつき高々 1 本、TABLE-1）。
    VectorRef,
    Builtin { f: BuiltinFn, args: Vec<BoundExpr> },
    Binary { op: BinOp, lhs: Box<BoundExpr>, rhs: Box<BoundExpr> },
    /// WASM UDF 呼び出し（TASK-149、対象ビヘイビア: EXT-5）。ABI は `(Vector, Scalar) -> Scalar` の 1 種類のみ（`args` は常に長さ 2）。
    WasmCall {
        name: String,
        backend: Arc<dyn WasmUdfBackend>,
        args: Vec<BoundExpr>,
    },
    /// `NULL`（SQL-26。Issue #921）。`bind_case`・`bind_coalesce`・`bind_nullif` の 3 箇所からのみ生成される。
    Null,
    /// 検索形 `CASE`。`else_result` は構文上の `ELSE` 省略時にも `BoundExpr::Null` を補って正規化済み。
    Case {
        whens: Vec<(BoundExpr, BoundExpr)>,
        else_result: Box<BoundExpr>,
    },
    /// `COALESCE`。
    Coalesce(Vec<BoundExpr>),
    /// `NULLIF`。両辺は常に `Scalar` 型（`bind_nullif` が検査済み）。
    NullIf { lhs: Box<BoundExpr>, rhs: Box<BoundExpr> },
    /// `DATE` 定数（SQL-26。Issue #920）。1970-01-01 起点の日数。
    Date(i32),
    /// `TIMESTAMP` 定数（マイクロ秒）。
    Timestamp(i64),
    /// nullable `DATE` 列の参照（`index` は `TextColumnRef` と同じ論理列インデックス系列）。
    DateColumnRef { index: usize },
    /// nullable `TIMESTAMP` 列の参照。
    TimestampColumnRef { index: usize },
    /// nullable な数値列（INTEGER/BIGINT/REAL/DOUBLE）の参照（Issue #1075・TABLE-16 ポインタ）。
    /// `WHERE`／投影／`CHECK` の式束縛（Issue #1183・SQL-24・SQL-26）で共通に生成される。
    ColumnRef { index: usize },
}

/// 束縛済み式の静的型。
#[derive(Debug, Clone, Copy, PartialEq, Eq)]
pub enum ExprType {
    Scalar,
    Vector,
    Bool,
    /// TEXT 値（Issue #919・SQL-26）。
    Text,
    /// `DATE` 値（SQL-26。Issue #920）。
    Date,
    /// `TIMESTAMP` 値。
    Timestamp,
}

/// 評価結果の値。`Vector` は `Cow<'a, [f32]>`（Issue #352）で保持する。`VectorRef` の評価は行データを複製せず
/// `Cow::Borrowed` を返し、`vec_div`・vector×scalar 演算のように新しいベクトルを構築する評価だけが
/// `Cow::Owned` で `try_reserve_exact`（fail-closed）による確保を行う。
#[derive(Debug, Clone, PartialEq)]
pub enum ExprValue<'a> {
    Scalar(f64),
    Vector(Cow<'a, [f32]>),
    Bool(bool),
    /// TEXT 値（Issue #919・SQL-26）。列参照は借用（`Cow::Borrowed`）、関数結果は所有（`Cow::Owned`）。
    Text(Cow<'a, str>),
    /// `DATE` 値（1970-01-01 起点の日数。SQL-26。Issue #920）。
    Date(i32),
    /// `TIMESTAMP` 値（マイクロ秒）。
    Timestamp(i64),
    /// SQL の NULL（Issue #919・SQL-26 と Issue #921・SQL-26 の共有 variant）。呼び出し元は PostgreSQL の
    /// 3 値論理に基づく UNKNOWN として扱う: `WHERE`/`CHECK` では非該当・充足、投影では `Cell::Null`、
    /// `SUM`/`AVG`/`MIN`/`MAX`/`COUNT(expr)` では当該行をスキップする。
    Null,
}

/// `ExprValue::Vector` を所有 `Vec<f32>` へ変換する（投影段など、評価結果を行データより長く保持する必要がある
/// 呼び出し元向け）。`Cow::Owned` はそのまま move するため確保が発生しない。`Cow::Borrowed` は
/// `try_reserve_exact` で確保し、OOM 時は `54000` で fail-closed に拒否する。
pub fn into_owned_vector(v: Cow<'_, [f32]>) -> Result<Vec<f32>, SqlSurfaceError>;

/// 組み込み関数（対象ビヘイビア SQL-9・SQL-26）。数値スカラー関数群（`Abs`〜`Sqrt`）の値レベルの計算は
/// `sql::numeric_fn` へ委譲し、本 enum は解決済み関数の識別子のみを保持する。
#[derive(Debug, Clone, Copy, PartialEq, Eq)]
pub enum BuiltinFn {
    /// `vec_norm(v: Vector) -> Scalar`（L2 ノルム）。
    VecNorm,
    /// `vec_sum(v: Vector) -> Scalar`（成分和）。
    VecSum,
    /// `vec_div(v: Vector, s: Scalar) -> Vector`（成分ごとの除算）。
    VecDiv,
    /// `lower(s: Text) -> Text`（Issue #919・SQL-26）。
    Lower,
    /// `upper(s: Text) -> Text`。
    Upper,
    /// `length(s: Text) -> Scalar`（文字数。Unicode スカラー値単位）。
    Length,
    /// `substr(s: Text, start: Scalar) -> Text`（`len` 省略形）。
    Substr2,
    /// `substr(s: Text, start: Scalar, len: Scalar) -> Text`。
    Substr3,
    /// `concat(a: Text, b: Text) -> Text`。可変長 `CONCAT` は束縛段（`bind_call`）でこの 2 引数版の左畳み込みへ展開する。
    Concat2,
    /// `trim(s: Text) -> Text`（半角空白のみ除去。PostgreSQL 既定）。
    Trim,
    /// `replace(s: Text, from: Text, to: Text) -> Text`。
    Replace,
    /// `position(haystack: Text, needle: Text) -> Scalar`（`POSITION(needle IN haystack)` 構文）。
    Position,
    /// `abs(x: Scalar) -> Scalar`。
    Abs,
    /// `round(x: Scalar) -> Scalar`（1 引数形。`round` は arity で `Round1`／`Round2` へオーバーロード解決される）。
    Round1,
    /// `round(x: Scalar, n: Scalar) -> Scalar`（2 引数形。小数点以下 `n` 桁）。
    Round2,
    /// `floor(x: Scalar) -> Scalar`。
    Floor,
    /// `ceil(x: Scalar) -> Scalar`（`ceiling` はこの variant の別名として解決される）。
    Ceil,
    /// `mod(x: Scalar, y: Scalar) -> Scalar`（剰余。符号は被除数に従う）。
    Mod,
    /// `power(x: Scalar, y: Scalar) -> Scalar`。
    Power,
    /// `sqrt(x: Scalar) -> Scalar`。
    Sqrt,
    /// `date_part(field: Text, src: Timestamp) -> Scalar`／`EXTRACT(field FROM src)`（SQL-26。Issue #920）。
    /// `field` は束縛時に解決済み（実行時の引数は `src` 1 個のみ）。
    DatePart(DatePartField),
    /// `date_trunc(unit: Text, src: Timestamp) -> Timestamp`（`unit` は束縛時に解決済み）。
    DateTrunc(DateTruncUnit),
    /// `DATE` を深夜 0 時の `TIMESTAMP` へ昇格する内部専用関数（`bind_call`／`bind_binary` が挿入する）。
    DateToTimestamp,
}

pub(crate) fn builtin_signature(f: BuiltinFn) -> (&'static [ExprType], ExprType);
pub(crate) fn is_builtin_function_name(name: &str) -> bool;
pub(crate) fn first_non_builtin_call(expr: &Expr) -> Option<&str>;
pub(crate) fn is_foldable_builtin(f: BuiltinFn) -> bool;
/// 組み込み関数の arity（`builtin_signature` が返す引数個数）の上限。0.1.0 では 2 だったが 0.2.0 では 3。
pub(crate) const MAX_BUILTIN_ARITY: usize = 3;

/// セッション内で登録された宣言的 UDF 1 件。
#[derive(Debug, Clone, PartialEq)]
pub struct UdfDefinition {
    pub params: Vec<String>,
    pub body: Expr,
}

/// セッション単位の UDF レジストリ（`sql::mode::SessionState` が保持する）。追記専用（再定義・`DROP` は許可しない）。
/// `PartialEq` は手動実装（WASM UDF は名前一致かつ `Arc::ptr_eq`）。
#[derive(Debug, Clone, Default)]
pub struct UdfRegistry {
    defs: std::collections::BTreeMap<String, UdfDefinition>,
    wasm: std::collections::BTreeMap<String, Arc<dyn WasmUdfBackend>>,
}

impl UdfRegistry {
    pub fn get(&self, name: &str) -> Option<&UdfDefinition>;
    /// 登録済みの WASM UDF バックエンドを名前で引く（`bind_call` の解決経路から呼ばれる）。
    pub fn get_wasm(&self, name: &str) -> Option<&Arc<dyn WasmUdfBackend>>;
    pub fn len(&self) -> usize;
    pub fn is_empty(&self) -> bool;
}

/// `CREATE FUNCTION <name>(<params>) AS <body>` を検証してセッションのレジストリへ登録する
/// （`core.rs::EngineCore::execute_sql_in_session` の `CreateFunction` 分岐から呼ばれる）。
/// 検証→登録の順を守り、失敗時は `registry` を一切変更しない。
///
/// 検証項目: 名前・パラメータ名が `catalog::validate_identifier` に適合、パラメータ重複なし、パラメータ数が
/// `MAX_UDF_PARAMS` 以内、名前が組み込み・既存許可名と非衝突（0.2.0 では `CASE`／`COALESCE`／`NULLIF` も予約）、
/// 同名の再定義でないこと、セッション UDF 数が `MAX_SESSION_UDFS` 未満、本体式がパラメータ参照・数値リテラル・
/// 算術/比較演算子・組み込み関数・登録済み UDF 呼び出しのみで構成される（列参照は拒否＝閉じた関数）。
pub fn define_function(
    registry: &mut UdfRegistry,
    name: &str,
    params: &[String],
    body: &Expr,
) -> Result<(), SqlSurfaceError>;

/// 検証済みの `Arc<dyn WasmUdfBackend>` をセッションのレジストリへ登録する
/// （TASK-149、対象ビヘイビア: EXT-5, EXT-6）。
pub fn define_wasm_function(
    registry: &mut UdfRegistry,
    name: &str,
    backend: Arc<dyn WasmUdfBackend>,
) -> Result<(), SqlSurfaceError>;

/// `embedding` アクセスは束縛段で `VectorRef` に一元化されているため、全 variant を網羅する `match`（`_` 禁止）で
/// 判定すれば過小評価が起きない。呼び出し元（`sql::aggregate.rs`／`sql::group_by.rs`）はこの判定結果に基づき
/// embedding のデコードそのものをスキップする。
pub(crate) fn references_embedding(expr: &BoundExpr) -> bool;

/// 式木が参照する列インデックスを `visit` へ渡す（`BoundOrGroup::visit_column_indices` のように事前に
/// マスク配列を確保できない呼び出し元向け）。
pub(crate) fn visit_referenced_scalar_columns(expr: &BoundExpr, visit: &mut dyn FnMut(usize));

/// 式木が参照する列（`TextColumnRef`／`DateColumnRef`／`TimestampColumnRef`／`ColumnRef`）を `mask` へ反映する
/// （`sql::aggregate::ReferencedColumns::derive`・`sql::scan`・`sql::exec`・`sql::check_constraint` が共有）。
/// 1 つでも参照すれば `true`。`BoundExpr` の全 variant を網羅する `match`（`_` 禁止）。
pub(crate) fn mark_referenced_scalar_columns(expr: &BoundExpr, mask: &mut [bool]) -> bool;

/// `id` と整数 `value` の厳密比較（`BoundExpr::IdCompare` の評価。`u64` の行 `id` を `i128` で比較する）。
pub(crate) fn id_compare(op: BinOp, id: u64, value: i128) -> bool;

/// `Expr` を意味論的に束縛する（`sql::parser::bind_in_session` から呼ばれる公開 API）。
/// 列参照は `schema` から、UDF 呼び出しは `registry` から解決し、UDF はインライン展開して
/// 自己完結した `BoundExpr` を返す。`node_budget` は展開後のノード数上限（`MAX_EXPR_NODES`）を、
/// 呼び出し全体（1 つの `SELECT`/`WHERE` 式項目）で共有する。
pub fn bind_expr(
    expr: &Expr,
    schema: &TableSchema,
    registry: &UdfRegistry,
    node_budget: &mut usize,
) -> Result<(BoundExpr, ExprType), SqlSurfaceError>;

/// 行 `id`（`u64`）を `ExprValue::Scalar`（`f64`）へ変換する前に、`f64` の 52 bit 仮数部で正確に表現できる範囲
/// （`2^53` 以下）かを確認する。これを超える `id` は `22003`（`NumericOutOfRange`。TABLE-16・ERR-2・Issue #1336）
/// で拒否する（0.1.0 では `22000`）。
pub(crate) fn id_as_finite_scalar(id: u64) -> Result<f64, SqlSurfaceError>;

/// `ScalarRef` の数値 variant（`Integer`／`BigInt`／`Real`／`Double`）を `BoundExpr::ColumnRef` の評価値として
/// `f64` へ変換する（Issue #1075・TABLE-16 ポインタ）。`BIGINT` の絶対値が `2^53` を超える場合は `22003` で拒否し、
/// 非有限値は `invalid_input`、数値以外の variant は `Internal` にする。
pub(crate) fn numeric_scalar_from_ref(v: &ScalarRef<'_>) -> Result<f64, SqlSurfaceError>;

/// 行コンテキスト（行 `id`・その行の `VECTOR` 列の embedding）で束縛済み式を評価する。`sql::exec` の
/// RLS→SCALAR 段のフック（`WHERE` の式述語）・投影段（結果列の式）の両方から呼ばれる。呼び出し元は、可視行
/// （RLS-8 の暗黙適用を通過した行）にのみ到達させる契約を守ること（本関数自体はその契約を検査しない）。
///
/// fail-closed: 0 除算・非有限値（NaN/∞）の生成は黙って 0 や NULL に丸めず、行単位で `Err` として伝播する
/// （0 除算は `22012`、あふれ・`f64` 正確表現域外は `22003`、その他は `22000`）。
/// `eval_with_scalars(expr, id, embedding, &[])` へ委譲する薄いラッパー。
pub fn eval<'a>(
    expr: &BoundExpr,
    id: u64,
    embedding: &'a [f32],
) -> Result<ExprValue<'a>, SqlSurfaceError>;

/// `eval` の行スカラー対応版（Issue #919・SQL-26、§3-7。`DATE`／`TIMESTAMP` 対応は Issue #920）。`row_scalars` は
/// `schema.columns` と同じ論理列インデックスを持つ行スカラー値のビューで、`BoundExpr::TextColumnRef`／
/// `DateColumnRef`／`TimestampColumnRef`／`ColumnRef` の解決に使う。`None` は実 NULL。`row_scalars` の長さが参照
/// インデックスに満たない場合・列の型と参照 variant が食い違う場合は `Internal` として fail-closed に拒否する。
pub(crate) fn eval_with_scalars<'a>(
    expr: &BoundExpr,
    id: u64,
    embedding: &'a [f32],
    row_scalars: &'a [Option<ScalarRef<'a>>],
) -> Result<ExprValue<'a>, SqlSurfaceError>;

/// `NULLIF` の評価（`sql::expr_program::ExprStep::NullIf` と再帰 `eval` が共有）。
pub(crate) fn eval_nullif<'a>(/* lhs, rhs */) -> Result<ExprValue<'a>, SqlSurfaceError>;

/// `args` の要素数が `builtin_signature` の arity と不一致な場合（束縛段の不変条件が崩れた場合の保険）は
/// `Internal` として拒否する。
pub(crate) fn apply_builtin<'a>(
    f: BuiltinFn,
    args: &mut [Option<ExprValue<'a>>],
) -> Result<ExprValue<'a>, SqlSurfaceError>;

/// 2 項演算を値ベースで評価する（引数式の再帰評価は行わない）。再帰 `eval` の `BoundExpr::Binary` 分岐と
/// `sql::expr_program::ExprProgram::eval` の `ExprStep::Binary` 分岐が共有する（Issue #353）。
pub(crate) fn eval_binary<'a>(
    op: BinOp,
    l: ExprValue<'a>,
    r: ExprValue<'a>,
) -> Result<ExprValue<'a>, SqlSurfaceError>;

/// 非有限値（NaN/∞）を fail-closed に拒否してスカラー値へ包む共通ヘルパー。
pub(crate) fn finite_scalar<'a>(v: f64, fn_name: &str) -> Result<ExprValue<'a>, SqlSurfaceError>;
```

## Notes

- Migration (0.1.0 → 0.2.0): `Expr` に `String` / `Null` / `Case` / `Coalesce` / `NullIf` / `DateLiteral` / `TimestampLiteral`、`BoundExpr` に `Text` / `TextColumnRef` / `IdCompare` / `Null` / `Case` / `Coalesce` / `NullIf` / `Date` / `Timestamp` / `DateColumnRef` / `TimestampColumnRef` / `ColumnRef`、`ExprType` に `Text` / `Date` / `Timestamp`、`ExprValue` に `Text` / `Date` / `Timestamp` / `Null`、`BuiltinFn` に文字列・数値・日時の関数が加わった。いずれも pub enum で `#[non_exhaustive]` ではないため、クレート外の網羅 `match` は追随が必要。`id_as_finite_scalar` の `2^53` 超過は `22000` から `22003` に変わった。`MAX_BUILTIN_ARITY` は 2 から 3 に変わった。`MAX_CASE_BRANCHES` / `MAX_CASE_NESTING` が加わった
- 上記は `fandhe-db-engine` 0.2.0（git SHA `dc888f6ea146d3078153d64a6848f5c8cf044431`）の `src/sql/udf_call.rs` の型定義・定数・公開関数のシグネチャと doc comment から更新した（`bind_expr_in` / `bind_call` / `bind_case` / `bind_binary` 等の内部束縛関数と各関数の本体は未転記）
- `define_wasm_function` は WASM UDF（`extensions/wasm-udf` scope 対象）との接点。本 scope（sql-execution）は宣言的 UDF の式評価のみを扱う
- Distinct from `mssql` / `drizzle` UDFs: not a DB engine stored function / SQL dialect extension, but the engine's internal declarative expression compilation layer.

## Related

- [expr-program](./expr-program.md)
- [exec](./exec.md)
