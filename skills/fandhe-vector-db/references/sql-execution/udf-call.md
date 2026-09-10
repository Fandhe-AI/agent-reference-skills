---
source: https://docs.rs/crate/fandhe-vector-db-engine/0.1.0/source/src/sql/udf_call.rs
---

# sql::udf_call

宣言的 UDF 呼び出しの式層（TASK-79、対象ビヘイビア: SQL-9）。`CREATE FUNCTION <name>(<params>) AS <expr>` で定義した宣言的 UDF を `SELECT` の結果列・`WHERE` 条件のいずれの位置からも単一文で呼び出せるようにする式 AST・レジストリ・束縛・評価を提供する。

## Signature / Usage

```rust,ignore
//! 責務境界:
//! - 構文（`Expr`）は `sql::allowlist::Parser` が組み立て、列名・関数名の意味論的な
//!   妥当性は検証しない（許可リスト層の既存分業を踏襲）。
//! - 束縛（`bind_expr`）は `sql::parser` の束縛段から呼ばれ、列参照の解決・関数名の
//!   解決（組み込み／登録済み UDF）・静的型検査・UDF 本体のインライン展開を行う。
//!   展開後は `BoundExpr`（レジストリを参照しない自己完結した木）になる。
//! - 評価（`eval`）は `sql::exec` の RLS→SCALAR 段のフック（結果列・`WHERE` の両方
//!   から呼ばれる）・投影段から呼ばれる。可視行にしか到達しない前提を `eval` 自体は
//!   検査しない（呼び出し元の契約）。
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
pub const MAX_EXPR_NODES: usize = 1024;
/// セッションが保持できる UDF 定義数上限（宣言的・WASM 合算。`54000`）。
pub const MAX_SESSION_UDFS: usize = 64;

pub(crate) fn parse_number_literal(raw: &str) -> Result<f64, SqlSurfaceError>;

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
    Number(String),
    Ident(String),
    Call { name: String, args: Vec<Expr> },
    Binary {
        op: BinOp,
        lhs: Box<Expr>,
        rhs: Box<Expr>,
    },
}

/// 束縛済み（列参照・関数呼び出しの解決、UDF 本体のインライン展開が完了した）式。
#[derive(Debug, Clone)]
pub enum BoundExpr {
    Number(f64),
    IdRef,
    VectorRef,
    Builtin {
        f: BuiltinFn,
        args: Vec<BoundExpr>,
    },
    Binary {
        op: BinOp,
        lhs: Box<BoundExpr>,
        rhs: Box<BoundExpr>,
    },
    WasmCall {
        name: String,
        backend: Arc<dyn WasmUdfBackend>,
        args: Vec<BoundExpr>,
    },
}

pub enum ExprType {
    Scalar,
    Vector,
    Bool,
}

/// 評価結果の値。`Vector` は `Cow<'a, [f32]>`（Issue #352）で保持する。`VectorRef`
/// （テーブルの `VECTOR` 列をそのまま参照する式）の評価は行データを複製せず
/// `Cow::Borrowed` を返し、`vec_div`・vector×scalar 演算のように新しいベクトルを
/// 構築する評価だけが `Cow::Owned` を返す。
pub enum ExprValue<'a> {
    Scalar(f64),
    Vector(Cow<'a, [f32]>),
    Bool(bool),
}

/// `ExprValue::Vector` を所有 `Vec<f32>` へ変換する（投影段など、評価結果を行
/// データより長く保持する必要がある呼び出し元向け）。`Cow::Owned` はそのまま move
/// するため確保が発生しない。`Cow::Borrowed` は `Vec::to_vec()` ではなく
/// `try_reserve_exact` で確保し、OOM 時は `54000` で fail-closed に拒否する。
pub fn into_owned_vector(v: Cow<'_, [f32]>) -> Result<Vec<f32>, SqlSurfaceError>;

#[derive(Debug, Clone, Copy, PartialEq, Eq)]
pub enum BuiltinFn {
    /// `vec_norm(v: Vector) -> Scalar`（L2 ノルム）。
    VecNorm,
    /// `vec_sum(v: Vector) -> Scalar`（成分和）。
    VecSum,
    /// `vec_div(v: Vector, s: Scalar) -> Vector`（成分ごとの除算）。
    VecDiv,
}

pub(crate) fn builtin_signature(f: BuiltinFn) -> (&'static [ExprType], ExprType);
/// 組み込み関数の arity（`builtin_signature` が返す引数個数）の上限。
pub(crate) const MAX_BUILTIN_ARITY: usize = 2;

#[derive(Debug, Clone, PartialEq)]
pub struct UdfDefinition {
    pub params: Vec<String>,
    pub body: Expr,
}

/// セッション単位の UDF レジストリ（`sql::mode::SessionState` が保持する）。
#[derive(Debug, Clone, Default)]
pub struct UdfRegistry {
    defs: std::collections::BTreeMap<String, UdfDefinition>,
    wasm: std::collections::BTreeMap<String, Arc<dyn WasmUdfBackend>>,
}

/// `CREATE FUNCTION <name>(<params>) AS <body>` を検証してセッションのレジストリへ
/// 登録する（`core.rs::EngineCore::execute_sql_in_session` の `CreateFunction` 分岐から
/// 呼ばれる）。
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

/// `embedding` アクセスは束縛段で `VectorRef` に一元化されている（本モジュールの
/// `eval` 参照。`Builtin`/`Binary`/`WasmCall` は自身では embedding を持たず引数式の
/// 評価結果のみを使う）ため、全 variant を網羅する `match`（`_` 禁止）で判定すれば
/// 過小評価が起きない。呼び出し元（`sql::aggregate.rs`／`sql::group_by.rs`）はこの
/// 判定結果に基づき embedding のデコードそのものをスキップする。
pub(crate) fn references_embedding(expr: &BoundExpr) -> bool;

/// `Expr` を意味論的に束縛する（`sql::parser::bind_in_session` から呼ばれる公開
/// API）。列参照は `schema` から、UDF 呼び出しは `registry` から解決し、UDF は
/// インライン展開して自己完結した `BoundExpr` を返す。`node_budget` は展開後の
/// ノード数上限（`MAX_EXPR_NODES`）を、呼び出し全体（1 つの `SELECT`/`WHERE` 式
/// 項目）で共有する。
pub fn bind_expr(
    expr: &Expr,
    schema: &TableSchema,
    registry: &UdfRegistry,
    node_budget: &mut usize,
) -> Result<(BoundExpr, ExprType), SqlSurfaceError>;

/// 行 `id`（`u64`）を `ExprValue::Scalar`（`f64`）へ変換する前に、`f64` の 52 bit
/// 仮数部で正確に表現できる範囲（`2^53` 以下）かを確認する。これを超える `id` を
/// 無条件に `as f64` で丸めると、`WHERE id = <literal>` のような等価述語が精度欠落
/// により別 ID の行にも一致しうる（fail-closed: 黙って丸めず `22000` で拒否する）。
pub(crate) fn id_as_finite_scalar(id: u64) -> Result<f64, SqlSurfaceError>;

/// 行コンテキスト（行 `id`・その行の `VECTOR` 列の embedding）で束縛済み式を評価
/// する。`sql::exec` の RLS→SCALAR 段のフック（`WHERE` の式述語）・投影段（結果列
/// の式）の両方から呼ばれる。呼び出し元は、可視行（RLS-8 の暗黙適用を通過した行）
/// にのみ到達させる契約を守ること（本関数自体はその契約を検査しない）。
///
/// fail-closed: 0 除算・非有限値（NaN/∞）の生成は黙って 0 や NULL に丸めず、行単位
/// で `Err`（`22000`）として伝播する。
pub fn eval<'a>(
    expr: &BoundExpr,
    id: u64,
    embedding: &'a [f32],
) -> Result<ExprValue<'a>, SqlSurfaceError>;

/// `args` の要素数が `builtin_signature` の arity と不一致な場合（束縛段の不変条件
/// が崩れた場合の保険）は `Internal` として拒否する。
pub(crate) fn apply_builtin<'a>(
    f: BuiltinFn,
    args: &mut [Option<ExprValue<'a>>],
) -> Result<ExprValue<'a>, SqlSurfaceError>;

/// 2 項演算を値ベースで評価する（引数式の再帰評価は行わない）。再帰 `eval` の
/// `BoundExpr::Binary` 分岐と `sql::expr_program::ExprProgram::eval` の
/// `ExprStep::Binary` 分岐が共有する（Issue #353）。
pub(crate) fn eval_binary<'a>(
    op: BinOp,
    l: ExprValue<'a>,
    r: ExprValue<'a>,
) -> Result<ExprValue<'a>, SqlSurfaceError>;

/// 非有限値（NaN/∞）を fail-closed に拒否してスカラー値へ包む共通ヘルパー。
/// `sql::expr_program::ExprProgram::eval` の `WasmCall` ステップも共有する
/// （Issue #353）。
pub(crate) fn finite_scalar<'a>(v: f64, fn_name: &str) -> Result<ExprValue<'a>, SqlSurfaceError>;
```

## Notes

- 上記は main が pin SHA（`7022d112e79760dca916480599553fcac256b5fb`）で保存したソース（`src/engine/src/sql/udf_call.rs`）から Read で verbatim 転記・突き合わせ済み。初版（WebFetch のみ）では `bind_expr` と `references_embedding` の doc comment が取り違えられており（`bind_expr` に付いていたのは実際は `references_embedding` の doc）、また `eval` を誤って `pub(crate)` と記載していた（実際は `pub`）。本改訂でいずれも修正した
- `define_wasm_function` は WASM UDF（`extensions/wasm-udf` scope 対象）との接点。本 scope（sql-execution）は宣言的 UDF の式評価のみを扱う
- Distinct from `mssql` / `drizzle` UDFs: not a DB engine stored function / SQL dialect extension, but the engine's internal declarative expression compilation layer.

## Related

- [expr-program](./expr-program.md)
- [exec](./exec.md)
