---
source: https://docs.rs/crate/fandhe-db-engine/0.2.0/source/src/sql/expr_program.rs
---

# sql::expr_program

束縛済み式 1 本を平坦なステップ列へコンパイルし、行ループでは明示スタック（`scratch`）で線形実行する（再帰しない）実行表現。0.2.0 では `CASE`／`COALESCE`／`NULLIF` の分岐命令、文字列・`DATE`／`TIMESTAMP`・数値列参照のステップが加わった。`ExprStep::PushVector` 等のドキュメント参照。

## Signature / Usage

```rust,ignore
//! 束縛済み式（`crate::sql::udf_call::BoundExpr`）の行ループ実行を、毎行の再帰ツリーウォークから
//! 「束縛時に一度だけ平坦化したステップ列を、行ループでは明示スタックで線形実行する」形へ変える
//! （Issue #353・式評価のステップ列コンパイル化。WHERE 事前/事後フィルタ・投影の `Computed` 列・
//! 集計の `ScalarExpr` が共通で使う）。
//!
//! # 評価順序の保存
//! `BoundExpr::Binary` は lhs→rhs、`Builtin`/`WasmCall` の引数は左から右へ、いずれも無条件
//! （短絡評価なし）に評価する。`compile_node` の後行順（postorder）平坦化は、再帰 `eval` と
//! 同一の評価順・エラー発生順を厳密に保つ。
//!
//! # 定数畳み込み（defer-on-error）
//! 行に依存しない部分式（数値リテラルのみからなるスカラー算術・比較）は `try_fold_scalar` で
//! 束縛時に 1 回だけ評価し、結果を `ConstScalar`/`ConstBool` ステップへ置換する。畳み込み中に
//! エラーになる部分式（例: 定数 0 除算）は畳み込まず、平坦化のみ行って実行時評価に委ねる。
//! `WasmCall` は畳み込み対象に含めない。

/// ステップ列 1 個分の命令（密な enum。`ExprProgram::eval` の行ループでは
/// `match` による線形ディスパッチのみを行い、再帰しない）。
pub(crate) enum ExprStep {
    /// 定数畳み込み済みのスカラー値。
    ConstScalar(f64),
    /// 定数畳み込み済みの真偽値。
    ConstBool(bool),
    /// 行 `id` を `id_as_finite_scalar` 経由でスカラー値として push する。
    PushId,
    /// 行 `id`（`u64`）と整数 `value` を `i128` で厳密比較し真偽値を push する
    /// （`BoundExpr::IdCompare`。`f64` を経由しないため `2^53` 超でも `22003` にならない）。
    IdCompare { op: BinOp, value: i128 },
    /// テーブルの `VECTOR` 列（行の `embedding`）への参照を push する。`embedding` が空スライス
    /// （`VECTOR` 列が NULL。`dim == 0`）の行では `StackValue::Null` を push し、それ以外では
    /// `StackValue::VectorRef`（マーカーのみ。借用そのものは保持しない）を push する
    /// （Issue #921）。実際の `Cow::Borrowed(embedding)` は `ExprProgram::eval` が当該ステップを
    /// 消費する時点で `embedding` 引数から都度組み立てる。
    PushVector,
    /// 束縛済み文字列リテラルを push する（Issue #919・SQL-26）。
    ConstText(String),
    /// 行の `TEXT` 列参照を push する。スタック格納値は `StackValue::TextColumnRef`（マーカーのみ）で、
    /// 実際の値は `ExprProgram::eval` が `row_scalars` 引数から都度解決する。
    PushTextColumn(usize),
    /// 定数畳み込み対象外の `DATE` 定数（SQL-26。Issue #920）。
    ConstDate(i32),
    /// `TIMESTAMP` 版。
    ConstTimestamp(i64),
    /// 行の `DATE` 列参照を push する。
    PushDateColumn(usize),
    /// 行の `TIMESTAMP` 列参照を push する。
    PushTimestampColumn(usize),
    /// 行の数値列（INTEGER/BIGINT/REAL/DOUBLE）参照を push する（Issue #1075・
    /// TABLE-16 ポインタ。`CHECK` 制約の式述語束縛でのみ生成される。
    /// [`ExprStep::PushTextColumn`] と同じ「借用は行ループの外の引数から都度
    /// 復元する」設計）。
    PushNumericColumn(usize),
    /// 組み込み関数呼び出し。arity 分（`udf_call::builtin_signature`）をスタックから pop し、
    /// `apply_builtin` へ渡す。
    Builtin(BuiltinFn),
    /// 2 項演算。rhs・lhs の順にスタックから pop し `crate::sql::udf_call::eval_binary` へ渡す。
    Binary(BinOp),
    /// WASM UDF 呼び出し（ABI 固定: `(Vector, Scalar) -> Scalar`。TASK-149・EXT-5）。
    WasmCall { backend: Arc<dyn WasmUdfBackend> },
    /// 定数畳み込み済みの `NULL`（SQL-26。Issue #921）。
    ConstNull,
    /// 無条件の前方ジャンプ（`CASE` の各 WHEN 分岐末尾）。`target` は `steps` 内の絶対インデックス。
    /// 前方（`target > pc`）のみを許可し、実行が必ず停止することを構造的に保証する。
    Jump { target: usize },
    /// スタック先頭の Bool を pop し、`true` でなければ `target` へ飛ぶ（`CASE WHEN` の条件不成立分岐）。
    /// Bool 以外（`Null`＝UNKNOWN を含む）も「真でない」として同様に飛ぶ。
    JumpIfNotTrue { target: usize },
    /// スタック先頭を pop せず覗き見て、`Null` でなければ値を残したまま `target` へ飛ぶ
    /// （`COALESCE` の非 NULL 早期確定）。`Null` の場合は pop せず次の命令へフォールスルーする。
    JumpIfNotNull { target: usize },
    /// スタック先頭を pop して捨てる（`COALESCE` が NULL だった引数を捨てて次の引数の評価へ進むために使う）。
    Pop,
    /// `NULLIF(lhs, rhs)`。rhs・lhs の順に pop し、`crate::sql::udf_call::eval_nullif` へ渡す。
    NullIf,
}

/// `ExprProgram::eval` の明示スタックが積む値表現。`ExprValue<'a>` と異なり行 embedding への借用を
/// スタック要素の型として持たない（`ExprStep::PushVector` 参照）。これにより `Vec<StackValue>` は
/// 行ごとに変わる借用ライフタイムに紐付かず、呼び出し元の行ループの外で 1 回だけ確保し使い回せる
/// （Issue #353・PR #373 codex-review 指摘対応）。
#[derive(Debug, Clone, PartialEq)]
pub(crate) enum StackValue {
    Scalar(f64),
    Bool(bool),
    /// SQL `NULL`（Issue #919・SQL-26 の nullable TEXT 列・strict 関数の NULL 入力と、
    /// Issue #921・SQL-26 の `CASE`／`COALESCE`／`NULLIF` のいずれの評価結果からも生じる共有 variant）。
    Null,
    /// 現在評価中の行の `embedding` への参照を表すマーカー（`ExprStep::PushVector` が push する）。
    VectorRef,
    /// 組み込み関数・二項演算が新規構築したベクトル（例: `vec_div`・vector×scalar 演算）。
    VectorOwned(Vec<f32>),
    /// 文字列値（リテラル畳み込み・関数結果いずれも所有データ）。
    Text(String),
    /// 現在評価中の行の `TEXT` 列参照を表すマーカー（実体は `row_scalars` 引数から都度解決する）。
    TextColumnRef(usize),
    /// `DATE` 値（SQL-26。Issue #920）。
    Date(i32),
    /// `TIMESTAMP` 値。
    Timestamp(i64),
    /// 現在評価中の行の `DATE` 列参照を表すマーカー。
    DateColumnRef(usize),
    /// `TIMESTAMP` 版。
    TimestampColumnRef(usize),
    /// 現在評価中の行の数値列（INTEGER/BIGINT/REAL/DOUBLE）参照を表すマーカー（Issue #1075・TABLE-16 ポインタ）。
    NumericColumnRef(usize),
}

/// 束縛済み式 1 本をコンパイルした平坦なステップ列。束縛時（`sql::parser::bind_*` 経由）に 1 回だけ
/// 構築し、行ループでは `ExprProgram::eval` を呼ぶだけにすることで、行ごとの再帰ツリーウォーク・
/// enum マッチの分岐分散をなくす。
#[derive(Debug, Clone)]
pub(crate) struct ExprProgram {
    steps: Vec<ExprStep>,
    /// 実行時に値スタックが到達しうる最大深さ（コンパイル時に確定）。
    pub(crate) max_stack: usize,
}

impl ExprProgram {
    /// `BoundExpr` 木を平坦なステップ列へコンパイルする（束縛時に 1 回だけ呼ぶ想定。
    /// `sql::parser::bind_where_predicates` 等から呼ばれる）。
    pub(crate) fn compile(expr: &BoundExpr) -> ExprProgram;

    /// ステップ列を明示スタック（`scratch`）で線形実行する（再帰しない）。`scratch` は呼び出し元の行ループの外で
    /// 確保し、行ごとに使い回す想定（呼び出し前に空である必要はない。本関数の先頭で `clear` する）。
    ///
    /// エラー契約は再帰 `eval`（`crate::sql::udf_call::eval`）と同一: スタック underflow・型不一致は
    /// `SqlSurfaceError::Internal`（固定文言）、0 除算（`22012`）・非有限値（`22003`）・確保失敗（`54000`）は
    /// 既存の写像を共有する（`apply_builtin`・`crate::sql::udf_call::eval_binary` 経由）。
    ///
    /// `row_scalars` は [`udf_call::eval_with_scalars`] と同じ契約
    /// （`schema.columns` と同じ論理列インデックスの `TEXT` 値ビュー。`None` は
    /// 実 NULL）。`TextColumnRef` を含まない式（既存呼び出し元の大半）は
    /// 空スライスで呼べる。
    ///
    /// `CASE`／`COALESCE`（SQL-26。Issue #921）の分岐命令を実行するため、プログラムカウンタ（`pc`）によるループ
    /// とする。ジャンプ先は常に前方（`target > pc`）のみを許可し、`pc` は単調に増加するためループは必ず停止する。
    pub(crate) fn eval<'a>(
        &self,
        id: u64,
        embedding: &'a [f32],
        row_scalars: &'a [Option<ScalarRef<'a>>],
        scratch: &mut Vec<StackValue>,
    ) -> Result<ExprValue<'a>, SqlSurfaceError>;
}
```

## Notes

- crate 内部 API: 本ファイルの全公開項目は `pub(crate)` であり、`fandhe-db-engine` の公開 API（`fandhe-db` crate）からは到達しない
- Migration (0.1.0 → 0.2.0): `ExprProgram::eval` に `row_scalars: &'a [Option<ScalarRef<'a>>]` 引数が加わった（`compile` / `eval` はいずれも `impl ExprProgram` のメソッド）。`ExprStep` / `StackValue` に上記の variant が加わった。いずれも crate 内部のため外部コードへの影響はない
- 上記は `fandhe-db-engine` 0.2.0（git SHA `dc888f6ea146d3078153d64a6848f5c8cf044431`）の `src/sql/expr_program.rs` から `ExprStep` / `StackValue` の全 variant と `compile` / `eval` のシグネチャ・doc comment を更新した（`ExprProgram::eval` の本体、`compile_node` 等の private ヘルパー、`PartialEq` 実装は未転記）
- 上記 doc comment の空スライス条件は TextColumnRef だけに言及しているが、0.2.0 の `stack_to_expr_value`（同ファイル 251-293 行）は DateColumnRef / TimestampColumnRef / NumericColumnRef も `row_scalars` から解決し、範囲外なら `SqlSurfaceError::Internal` を返す。実際に空スライスで呼べるのは、行スカラー列参照（Text / Date / Timestamp / Numeric の各 ColumnRef）を一切含まない式に限られる（`udf_call::eval_with_scalars` の契約と同じ）
- `PushNumericColumn` の doc comment にある「`CHECK` 制約の式述語束縛でのみ生成される」は旧い記述。0.2.0 の `compile_node`（同ファイル 526-530 行）は `BoundExpr::ColumnRef` を常に `PushNumericColumn` へ変換し、`BoundExpr::ColumnRef` は `WHERE`／投影／`CHECK` の式束縛で共通に生成される（`udf_call.rs` 365-368 行、Issue #1183）
- 関連 ADR: [`expr-step-compilation`](https://raw.githubusercontent.com/Fandhe-AI/fandhe-db/dc888f6ea146d3078153d64a6848f5c8cf044431/docs/design/expr-step-compilation.md)（Issue #353。`sql::udf_call::eval` の再帰ツリーウォーク評価をステップ列コンパイル化する設計 = 本モジュールそのものの根拠 ADR）
- Distinct from `mssql` / `drizzle` expression evaluation: not a SQL dialect expression compiler, but the engine's internal non-recursive expression execution representation.

## Related

- [udf-call](./udf-call.md)
- [exec](./exec.md)
