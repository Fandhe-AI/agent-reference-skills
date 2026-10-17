---
source: https://docs.rs/crate/fandhe-db-engine/0.2.0/source/src/sql/scalar_plan.rs
---

# sql::scalar_plan

`WHERE` 条件の形状からスカラー索引が使える形状（`ScalarPlan`）を分類する軽量ロジック。`sql::scalar_index` の照会 API を呼ぶ前段の判定に使われる。0.2.0 では `ScalarPlan` / `ScalarShapeInput` / `classify_scalar_plan` が公開 API へ昇格し（Issue #730・TASK-186・NOSQL-10 の前提）、`sql` モジュールから再エクスポートされる。

## Signature / Usage

```rust,ignore
//! `sql::exec` の SCALAR 事前フィルタ述語が `sql::scalar_index::ScalarIndex`（Issue #473）を
//! 消費できる形状かどうかの静的判定（Issue #474。対応 ADR: `docs/design/scalar-secondary-index.md`
//! 「採用案（候補 B）の確定仕様」節）。
//!
//! `sql::hnsw_cache::classify_ann_plan`（Issue #411）と同型の純粋関数（`classify_scalar_plan`）
//! として設計する: `sql::exec`（実行時の索引消費・縮退判定）と `sql::explain`（`scalar_plan:` 行の
//! 静的表示）が同じ入力形状（`ScalarShapeInput`）から同じ分類を導出することで、両者の判定基準が
//! 実装として発散しない単一情報源にする。
//!
//! 索引対応述語の狭い定義: 索引が扱えるのは `bound.metadata_filters` すべてと、`bound.expr_filters`
//! のうち `id <op> <数値リテラル>` および `<数値列> <op> <数値リテラル>`（数値列は `INTEGER`／
//! `BIGINT`／`REAL`／`DOUBLE`。Issue #1359。`op` は `>`/`<`/`>=`/`<=`/`=`、左右いずれの位置でも可。
//! `BETWEEN` は 2 本の比較へ脱糖されるため交差になる）という狭い形だけである。`expr_filters` に
//! 1 つでもこの形に一致しない要素があれば、索引経路を一切使わない（`ScalarPlan::PlainScan` へ縮退）。
//! `WHERE visible()` は `rls_predicate_present` フラグのみを立て `metadata_filters`/`expr_filters` を
//! 増やさないため、この判定には現れない。

/// `classify_scalar_plan` の分類結果。閉じた語彙（`sql::explain` の `scalar_plan:` 行の値と 1 対 1）。
/// Issue #730 で公開 API へ昇格した（`#[non_exhaustive]` によりクレート外からの網羅 `match` を禁止する）。
#[derive(Debug, Clone, Copy, PartialEq, Eq)]
#[non_exhaustive]
pub enum ScalarPlan {
    /// 索引を使わず全可視行を走査する（既定）。
    PlainScan,
    /// 索引対応述語がちょうど 1 件で、`TEXT` 列の等価条件。
    IndexEquality,
    /// 索引対応述語がちょうど 1 件で、`TEXT` 列の前方一致条件。
    IndexPrefix,
    /// 索引対応述語がちょうど 1 件で、`id` に対する単純比較。
    IndexIdRange,
    /// 索引対応述語がちょうど 1 件で、`DATE`／`TIMESTAMP`／`NUMERIC`／`UUID`／`BYTEA` 列の範囲比較
    /// （`FilterOp::TypedCompare`。Issue #891・TASK-199 で production 結線済み・Issue #893 で二次索引へ接続済み。
    /// `BYTEA` は Issue #1257 で接続）。`FilterOp::Between`（SQL-24・TASK-208 ポインタ）も同じ分類へ合流する
    /// （`sql::scalar_index::ScalarIndex::candidates_for` が `Ge`∧`Le` の積で候補を導出する）。
    IndexTypedRange,
    /// 索引対応述語がちょうど 1 件で、`TEXT`／`ENUM` 列の `IN` 条件（`FilterOp::InText`。SQL-24・TASK-208 ポインタ）。
    IndexInList,
    /// 索引対応述語が 2 件以上（交差が必要）。
    IndexConjunction,
}

/// `classify_scalar_plan` の入力。`sql::exec`・`sql::using_plan::pre_check_bindable` の双方が同じ形へ組み立てる。
/// Issue #730 で公開 API へ昇格した（`#[non_exhaustive]` は付けない）。
pub struct ScalarShapeInput<'a> {
    /// `ExecutionPlan::from_evaluation_order(..).scalar_prefilter`（SCALAR 段が DISTANCE 段より先に評価されるか）。
    /// `false`（`HINT ORDER` による DISTANCE 先行・SCALAR 事後フィルタ）では索引を使わない。
    pub scalar_prefilter: bool,
    pub metadata_filters: &'a [MetadataFilter],
    pub expr_filters: &'a [BoundExpr],
    /// `WHERE` の `OR` 群（TASK-208・SQL-24、Issue #912）。
    ///
    /// **BREAKING CHANGE**: 本フィールドの追加は `ScalarShapeInput` を構造体リテラルで組み立てる既存コードの
    /// コンパイルを壊す（`#[non_exhaustive]` を付けていない `pub` 型のため）。移行方針: OR 群を持たない既存呼び出しは
    /// 空スライス（`&[]`）を渡す。
    ///
    /// 索引経路は現時点で OR 群の和集合計算に対応していないため `ScalarPlan::PlainScan` へ一律縮退する。ただし
    /// `WHERE` トップレベルの「同じ TEXT／ENUM 列への等価 OR」は束縛時に `InText` へ畳まれて `metadata_filters`
    /// 側へ移る（Issue #1305。NoSQL filter も Issue #1306 で同様）ため、ここへ届くのは畳めなかった OR 群だけ。
    pub or_filters: &'a [BoundOrGroup],
}

/// `id <op> <数値リテラル>` へ正規化した式述語（左右いずれの位置で束縛されていても `id` が左辺に来る形へ揃える。
/// 左右入替時は `op` を反転する: 例えば `5 > id` は `id < 5` と同値であるため `Lt` へ変換する）。
pub(crate) struct IdPredicate {
    pub(crate) op: BinOp,
    pub(crate) literal: f64,
}

/// 式述語（`expr_filters` の要素）のうち二次索引が解決できる形（Issue #1359）。分類側と候補解決側が異なる述語集合を
/// 見ると候補が上位集合になり条件外の行を返す（fail-open）ため、両者が必ずこの型を介して同じ集合を見る。
pub(crate) enum ExprIndexPredicate {
    /// `id <op> <数値リテラル>`。
    Id(IdPredicate),
    /// `<数値列> <op> <数値リテラル>`（`INTEGER`／`BIGINT`／`REAL`／`DOUBLE`。`column_index` は `schema.columns` 添字）。
    NumericColumn {
        column_index: usize,
        op: BinOp,
        literal: f64,
    },
}

/// `exprs` のうち数値列述語が参照する列添字（`schema.columns` 添字）を列挙する（Issue #1359）。`EXPLAIN` の静的判定が、
/// 索引宣言（`Declared`）の下で未宣言の数値列を含む計画を `PlainScan` へ降格させるために使う（`id` 述語は返さない）。
pub(crate) fn numeric_predicate_columns(exprs: &[BoundExpr]) -> impl Iterator<Item = usize> + '_;

/// `exprs`（`bound.expr_filters`）の全件が索引対応述語なら全件を返し、1 件でも非対応なら `None`（Issue #1359）。
/// 一部だけを落とす `filter_map` 形を作らせないための唯一の収集口。
pub(crate) fn collect_expr_index_predicates(exprs: &[BoundExpr]) -> Option<Vec<ExprIndexPredicate>>;

/// `ScalarShapeInput` から `ScalarPlan` を決定する（純粋関数・副作用なし）。`sql::exec`（索引消費の可否判定）と
/// `sql::explain`（`scalar_plan:` 行）がこの関数だけを単一情報源として使う。Issue #730 で公開 API へ昇格した。
/// `scalar_prefilter == false`・全フィルタ空・`or_filters` 非空はいずれも `PlainScan`。
pub fn classify_scalar_plan(input: &ScalarShapeInput<'_>) -> ScalarPlan;

/// `IdPredicate` を `(Bound<u64>, Bound<u64>)` へ変換する。`sql::udf_call::eval_binary` の
/// `(id as f64) op literal` 評価とビット同値になるよう導出する。`None` は「判定不能（呼び出し元は索引を使わず
/// 全走査へ縮退する）」であり「一致 0 件」ではない（非有限リテラルのみ）。「一致 0 件」は `lower > upper` の
/// 正準の空区間（`(Included(1), Included(0))`）で表す。
pub(crate) fn id_bounds(pred: &IdPredicate) -> Option<(std::ops::Bound<u64>, std::ops::Bound<u64>)>;

/// 数値列（`INTEGER`／`BIGINT`。`i64` キーの順序索引）の単純比較 `(v as f64) op literal` を、索引キー `v`
/// （値域は `|v| <= 2^53`）に対する `i64` 区間へ変換する（Issue #1359）。`id_bounds` と同じ正準の空区間で
/// 「一致 0 件」を表し、`None` は非有限リテラルのみ。
pub(crate) fn numeric_i64_bounds(
    op: BinOp,
    literal: f64,
) -> Option<(std::ops::Bound<i64>, std::ops::Bound<i64>)>;
```

## Notes

- 公開 API（`pub`）は `ScalarPlan` / `ScalarShapeInput` / `classify_scalar_plan` のみ（`sql` モジュールから `pub use scalar_plan::{classify_scalar_plan, ScalarPlan, ScalarShapeInput};` で再エクスポート）。`IdPredicate` / `ExprIndexPredicate` / `numeric_predicate_columns` / `collect_expr_index_predicates` / `id_bounds` / `numeric_i64_bounds` は `pub(crate)`。`scalar_plan` モジュール自体は `pub(crate)` のまま
- Migration (0.1.0 → 0.2.0): `ScalarPlan` に `IndexTypedRange` / `IndexInList` が加わり、`#[non_exhaustive]` が付いた。`ScalarShapeInput` に `or_filters: &'a [BoundOrGroup]` が加わった（BREAKING CHANGE。OR 群を持たない既存呼び出しは `&[]` を渡す）。`id_predicate_from_expr` は `ExprIndexPredicate`（`Id` / `NumericColumn`）ベースの `collect_expr_index_predicates` に置き換わった。索引対応の式述語に数値列比較が加わった
- `HINT ORDER` で DISTANCE 段を SCALAR 段より先に評価する場合（`scalar_prefilter == false`）は索引を使わない（事後フィルタ経路は索引化の対象外）
- 関連 ADR: [`scalar-secondary-index`](https://raw.githubusercontent.com/Fandhe-AI/fandhe-db/dc888f6ea146d3078153d64a6848f5c8cf044431/docs/design/scalar-secondary-index.md)（Issue #359・Accepted 提案。索引全体の設計検討）、[`scalar-index-prune`](https://raw.githubusercontent.com/Fandhe-AI/fandhe-db/dc888f6ea146d3078153d64a6848f5c8cf044431/docs/design/scalar-index-prune.md)（Issue #474。`WHERE` 事前フィルタの述語形状を索引経路へ結線する設計 = `classify_scalar_plan` の分類結果の消費先）
- `classify_scalar_plan` の本体の分岐（`TEXT` 等価・前方一致・`id` 範囲・型付き範囲・`IN`・交差の判別ロジック）は未転記。
- Distinct from `mssql` / `drizzle` query planners: not a SQL optimizer, but a lightweight classification of index-eligible predicate shapes only.

## Related

- [scalar-index](./scalar-index.md)
- [exec](./exec.md)
