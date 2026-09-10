---
source: https://docs.rs/crate/fandhe-vector-db-engine/0.1.0/source/src/sql/scalar_plan.rs
---

# sql::scalar_plan

`WHERE` 条件の形状からスカラー索引が使える形状（`ScalarPlan`）を分類する軽量ロジック。`sql::scalar_index` の照会 API を呼ぶ前段の判定に使われる。

## Signature / Usage

```rust,ignore
pub(crate) enum ScalarPlan {
    /// 索引を使わず全可視行を走査する（既定）。
    PlainScan,
    /// 索引対応述語がちょうど 1 件で、`TEXT` 列の等価条件。
    IndexEquality,
    /// 索引対応述語がちょうど 1 件で、`TEXT` 列の前方一致条件。
    IndexPrefix,
    /// 索引対応述語がちょうど 1 件で、`id` に対する単純比較。
    IndexIdRange,
    /// 索引対応述語が 2 件以上（交差が必要）。
    IndexConjunction,
}

pub(crate) struct ScalarShapeInput<'a> {
    /// `ExecutionPlan::from_evaluation_order(..).scalar_prefilter`
    /// （SCALAR 段が DISTANCE 段より先に評価されるか）。`false`（`HINT ORDER`
    /// による DISTANCE 先行・SCALAR 事後フィルタ）では索引を使わない
    /// （`sql::exec` の事後フィルタ経路は索引化の対象外）。
    pub(crate) scalar_prefilter: bool,
    pub(crate) metadata_filters: &'a [MetadataFilter],
    pub(crate) expr_filters: &'a [BoundExpr],
}

pub(crate) struct IdPredicate {
    pub(crate) op: BinOp,
    pub(crate) literal: f64,
}

pub(crate) fn id_predicate_from_expr(expr: &BoundExpr) -> Option<IdPredicate>;

pub(crate) fn classify_scalar_plan(input: &ScalarShapeInput<'_>) -> ScalarPlan;

pub(crate) fn id_bounds(
    pred: &IdPredicate,
) -> Option<(std::ops::Bound<u64>, std::ops::Bound<u64>)>;
```

## Notes

- crate 内部 API: 本ファイルの全公開項目は `pub(crate)` であり、`fandhe-vector-db-engine` の公開 API（`fandhe-vector-db` crate）からは到達しない
- `HINT ORDER` で DISTANCE 段を SCALAR 段より先に評価する場合（`scalar_prefilter == false`）は索引を使わない（事後フィルタ経路は索引化の対象外）
- 関連 ADR: [`scalar-secondary-index`](https://raw.githubusercontent.com/Fandhe-AI/vector-db/7022d112e79760dca916480599553fcac256b5fb/docs/design/scalar-secondary-index.md)（Issue #359・Accepted 提案。索引全体の設計検討）、[`scalar-index-prune`](https://raw.githubusercontent.com/Fandhe-AI/vector-db/7022d112e79760dca916480599553fcac256b5fb/docs/design/scalar-index-prune.md)（Issue #474。`WHERE` 事前フィルタの述語形状を索引経路へ結線する設計 = `classify_scalar_plan` の分類結果の消費先）
- Distinct from `mssql` / `drizzle` query planners: not a SQL optimizer, but a lightweight classification of index-eligible predicate shapes only.

## Related

- [scalar-index](./scalar-index.md)
- [exec](./exec.md)
