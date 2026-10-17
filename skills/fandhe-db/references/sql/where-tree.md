---
source: https://docs.rs/crate/fandhe-db-engine/0.2.0/source/src/sql/where_tree.rs
---

# sql::where_tree

`WHERE` 句の `OR` 結合・括弧グルーピングの束縛表現と評価（TASK-208・SQL-24・Issue #912）。構文木 `WherePredicate::Or` を `BoundOrGroup`／`BoundConjunction` へ再帰的に束縛し、各実行経路は `BoundOrGroup::matches` のみを呼ぶ（第 2 の評価器を作らない）。

## Signature / Usage

~~~rust,ignore
//! `WHERE` 句の `OR` 結合・括弧グルーピングの束縛表現と評価
//! （TASK-208・SQL-24、Issue #912）。
//!
//! 責務境界: `sql::allowlist::Parser` が構文木（[`crate::sql::allowlist::
//! WherePredicate::Or`]）を組み立て、`sql::parser::bind_where_predicates` が
//! 本モジュールの型（[`BoundOrGroup`]・[`BoundConjunction`]）へ再帰的に束縛する。
//! `sql::exec`・`sql::scan`・`sql::aggregate`・`sql::group_by` の各実行経路は
//! [`BoundOrGroup::matches`] のみを呼び、第 2 の評価器を作らない。
//!
//! 評価意味論: 分岐（`branches`）は宣言順に評価し、最初に真になった分岐で
//! 短絡する（`OR` の標準意味論）。1 分岐の中は `AND` と同じ短絡評価
//! （`metadata_filters` → `expr_filters` → 入れ子の `or_groups` の順）。
//! NULL・埋め込み欠如は既存の葉と同じく「不一致（false）」としてその葉だけを
//! false にする（`AND` のように行全体を除外しない。分岐の他の葉・他の分岐は
//! 評価を続ける）。

/// `OR` で結ぶ分岐の集合（束縛済み）。分岐は 2 個以上。
/// フィールドは非公開で、外部からは
/// [`crate::sql::parser::BoundStatement::or_filters`] 等のアクセサー経由でのみ
/// スライスとして参照できる。
#[derive(Debug, Clone, PartialEq)]
pub struct BoundOrGroup {
    pub(crate) branches: Vec<BoundConjunction>,
}

/// `AND` で結ぶ 1 分岐（束縛済み）。分岐の中にさらに `OR` 群を含められる
/// （`or_groups`。ネスト可）。
#[derive(Debug, Clone, PartialEq)]
pub struct BoundConjunction {
    pub(crate) metadata_filters: Vec<MetadataFilter>,
    pub(crate) expr_filters: Vec<BoundExpr>,
    expr_programs: Vec<ExprProgram>,
    pub(crate) or_groups: Vec<BoundOrGroup>,
}

impl BoundOrGroup {
    pub(crate) fn matches(
        &self,
        scanned: &[Option<ScalarRef<'_>>],
        id: u64,
        embedding: &[f32],
        dim: usize,
        scratch: &mut Vec<StackValue>,
    ) -> Result<bool, SqlSurfaceError>

    /// 全分岐が「同じ TEXT／ENUM 列への等価または `IN` 1 件だけ」の `OR` 群を、
    /// 1 本の `InText` フィルタへ畳んだものを返す（Issue #1305）。畳めない場合は `None`。
    pub(crate) fn as_same_column_text_in(&self) -> Option<MetadataFilter>
}
~~~

## Notes

- 上記フェンスは原文 module doc・型定義・主要メソッドの抜粋（`references_embedding`・`visit_column_indices`・`contains_expr`・`metadata_verdict`・`OrGroupMetadataVerdict` 等は省略）。公開型は `BoundOrGroup`・`BoundConjunction` のみで、メソッドは大半が `pub(crate)`。
- 索引経路（`sql::scalar_plan`・`sql::scalar_index`）は OR 群を含む述語を一律 `ScalarPlan::PlainScan` へ縮退させる（TASK-208 時点のスコープ）。ただし WHERE トップレベルの同じ列への等価 OR は束縛時に `InText` へ畳まれる（Issue #1305）。
- 式述語の `ExprProgram` は束縛時に 1 回だけコンパイルされ、行ループでは `eval` のみ。
- Distinct from `mssql` (node-mssql, T-SQL client) / `drizzle` (TypeScript ORM) / `supabase` (Postgres): evaluation is a two-valued short-circuit evaluator in which NULL/UNKNOWN is treated as false; negation is pushed down to leaves beforehand (see where-negation).

## Related

- [where-negation](./where-negation.md)
- [declarative-predicate](./declarative-predicate.md)
- [parser](./parser.md)
- [scan](./scan.md)
