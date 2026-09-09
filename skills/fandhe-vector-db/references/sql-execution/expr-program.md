---
source: https://docs.rs/crate/fandhe-vector-db-engine/0.1.0/source/src/sql/expr_program.rs
---

# sql::expr_program

束縛済み式 1 本を平坦なステップ列へコンパイルし、行ループでは明示スタック（`scratch`）で線形実行する（再帰しない）実行表現。`ExprStep::PushVector` 等のドキュメント参照。

## Signature / Usage

```rust,ignore
/// ステップ列 1 個分の命令（密な enum。`ExprProgram::eval` の行ループでは
/// `match` による線形ディスパッチのみを行い、再帰しない）。
pub(crate) enum ExprStep {
    /// 定数畳み込み済みのスカラー値（数値リテラル、またはリテラルのみから
    /// なる算術部分式の畳み込み結果）。
    ConstScalar(f64),
    /// 定数畳み込み済みの真偽値（リテラルのみからなる比較部分式の畳み込み結果）。
    ConstBool(bool),
    /// 行 `id` を `id_as_finite_scalar` 経由でスカラー値として push する。
    PushId,
    /// テーブルの `VECTOR` 列（行の `embedding`）への参照を push する。スタック
    /// 格納値は `StackValue::VectorRef`（マーカーのみ。借用そのものは保持しない）
    /// で、実際の `Cow::Borrowed(embedding)` は `ExprProgram::eval` が当該ステップ
    /// を消費する時点で `embedding` 引数から都度組み立てる（`sql::udf_call::eval`
    /// の `BoundExpr::VectorRef` 分岐と同じ契約）。
    PushVector,
    /// 組み込み関数呼び出し。arity 分（`udf_call::builtin_signature`）をスタック
    /// から pop し、`apply_builtin` へ渡す。
    Builtin(BuiltinFn),
    /// 2 項演算。rhs・lhs の順にスタックから pop し `crate::sql::udf_call::
    /// eval_binary` へ渡す。
    Binary(BinOp),
    /// WASM UDF 呼び出し（ABI 固定: `(Vector, Scalar) -> Scalar`。TASK-149・
    /// EXT-5）。scalar 引数（後に push された方）から先に pop する。
    WasmCall { backend: Arc<dyn WasmUdfBackend> },
}

/// `ExprProgram::eval` の明示スタックが積む値表現。`ExprValue<'a>` と異なり行
/// embedding への借用をスタック要素の型として持たない（`ExprStep::PushVector`
/// 参照）。これにより `Vec<StackValue>` は行ごとに変わる借用ライフタイムに紐付か
/// ず、呼び出し元の行ループの外で 1 回だけ確保し使い回せる（Issue #353・PR #373
/// codex-review 指摘対応）。
#[derive(Debug, Clone, PartialEq)]
pub(crate) enum StackValue {
    Scalar(f64),
    Bool(bool),
    /// 現在評価中の行の `embedding` への参照を表すマーカー（`ExprStep::
    /// PushVector` が push する）。実体は `ExprProgram::eval` の
    /// `embedding: &'a [f32]` 引数から都度解決する。
    VectorRef,
    /// 組み込み関数・二項演算が新規構築したベクトル（例: `vec_div`・vector×scalar
    /// 演算）。行データとは独立した所有データのため、そのままスタックへ持ち回れる。
    VectorOwned(Vec<f32>),
}

/// 束縛済み式 1 本をコンパイルした平坦なステップ列。束縛時（`sql::parser::bind_*`
/// 経由）に 1 回だけ構築し、行ループでは `ExprProgram::eval` を呼ぶだけにすることで、
/// 行ごとの再帰ツリーウォーク・enum マッチの分岐分散をなくす。
pub(crate) struct ExprProgram { /* ... */ }

/// `BoundExpr` 木を平坦なステップ列へコンパイルする（束縛時に 1 回だけ呼ぶ想定。
/// `sql::parser::bind_where_predicates` 等から呼ばれる）。
pub(crate) fn compile(expr: &BoundExpr) -> ExprProgram;

/// ステップ列を明示スタック（`scratch`）で線形実行する（再帰しない）。`scratch` は
/// 呼び出し元の行ループの外で確保し、行ごとに使い回す想定（呼び出し前に空である
/// 必要はない。本関数の先頭で `clear` する）。
///
/// エラー契約は再帰 `eval`（`crate::sql::udf_call::eval`）と同一: スタック
/// underflow・型不一致は `SqlSurfaceError::Internal`（固定文言。束縛段の不変条件が
/// 崩れた場合の保険であり、束縛済み式に対しては通常発生しない）、0 除算・非有限
/// 値・確保失敗はそれぞれ既存の `22000`／`54000` 写像を共有する（`apply_builtin`・
/// `crate::sql::udf_call::eval_binary` 経由）。
///
/// `scratch` は行に依存しない借用のない値表現（`StackValue`）を積むため、
/// `embedding` の借用ライフタイム `'a` に紐付かない。呼び出し元は `scratch` を
/// 行ループの外で 1 回だけ確保し、行ごとに使い回してよい（PR #373 codex-review
/// 指摘対応。以前は `Vec<ExprValue<'a>>` をスタックに使っていた）。
pub(crate) fn eval<'a>(
    &self,
    id: u64,
    embedding: &'a [f32],
    scratch: &mut Vec<StackValue>,
) -> Result<ExprValue<'a>, SqlSurfaceError>;
```

## Notes

- crate 内部 API: 本ファイルの全公開項目は `pub(crate)` であり、`fandhe-vector-db-engine` の公開 API（`fandhe-vector-db` crate）からは到達しない
- 上記は main が pin SHA（`7022d112e79760dca916480599553fcac256b5fb`）で保存したソース（`src/engine/src/sql/expr_program.rs`）から Read で verbatim 転記した（`ExprStep` / `StackValue` の全バリアントを含む）
- 関連 ADR: [`expr-step-compilation`](https://raw.githubusercontent.com/Fandhe-AI/vector-db/7022d112e79760dca916480599553fcac256b5fb/docs/design/expr-step-compilation.md)（Issue #353。`sql::udf_call::eval` の再帰ツリーウォーク評価をステップ列コンパイル化する設計 = 本モジュールそのものの根拠 ADR）
- Distinct from `mssql` / `drizzle` expression evaluation: not a SQL dialect expression compiler, but the engine's internal non-recursive expression execution representation.

## Related

- [udf-call](./udf-call.md)
- [exec](./exec.md)
