---
source: https://docs.rs/crate/fandhe-db-engine/0.2.0/source/src/sql/declarative_predicate.rs
---

# sql::declarative_predicate

NoSQL `filter` 語彙拡張（範囲比較・`IN`・`OR`。Issue #945・NOSQL-14）の束縛入口。SQL テキストを経由せず、小さな AST `DeclarativePredicate` から、SQL 表層の `WHERE` 束縛と同一の結果型を直接得る。

## Signature / Usage

~~~rust,ignore
//! NoSQL `filter` 語彙拡張（範囲比較・`IN`・`OR`。Issue #945・対象ビヘイビア:
//! `docs/spec/04-behavior/nosql-surface.md` NOSQL-14）の束縛入口。
//!
//! 責務境界: SQL 表層の `WHERE` 述語束縛（`sql::parser::bind_where_predicates`・
//! `sql::where_tree`）と**同一の**束縛結果型（`declarative_filter::MetadataFilter`・
//! `udf_call::BoundExpr`・`where_tree::BoundOrGroup`）を、SQL テキストを一切
//! 経由せず、本モジュールが定義する小さな AST（[`DeclarativePredicate`]）から
//! 直接得る。呼び出し文脈: `wire-server` の `http::query::filter`（NoSQL
//! `filter` 配列の JSON 束縛）が唯一の呼び出し元。...束縛後の実行経路
//! （`sql::exec`／`sql::scan`／`sql::aggregate`）は SQL 表層と完全に共有する。

/// クレート外（`wire-server`）が組み立てる、束縛前の述語ツリー 1 要素。
/// `&[DeclarativePredicate]`（本 enum を含むスライス）は常に `AND` 結合を表す
/// （SQL の `WHERE a AND b AND c` と同じ）。
#[derive(Debug, Clone, PartialEq)]
pub enum DeclarativePredicate {
    /// 宣言的（メタデータ）述語 1 件（等価・前方一致・範囲比較・`IN` 等）。
    Leaf(DeclarativeFilter),
    /// 式述語 1 件（`INTEGER`／`BIGINT`／`REAL`／`DOUBLE PRECISION` 列への
    /// 等価・範囲比較。式レーン）。束縛結果は [`ExprType::Bool`] でなければならない。
    Expr(Expr),
    /// `OR` で結ぶ分岐の集合（2 個以上。1 個の場合は呼び出し元が親の `AND` 列へ
    /// 平坦化してから渡す契約）。各分岐はそれ自体が `AND` で結ぶ列。
    Or(Vec<Vec<DeclarativePredicate>>),
}

pub struct BoundWhereFilters { /* metadata_filters, expr_filters, or_filters */ }

impl BoundWhereFilters {
    pub fn metadata_filters(&self) -> &[MetadataFilter]
    pub fn expr_filters(&self) -> &[BoundExpr]
    pub fn or_filters(&self) -> &[BoundOrGroup]
    /// 3 つ組へ分解する（`BoundScan::new`／`BoundAggregate::new` 等へそのまま渡す形）。
    pub fn into_parts(self) -> (Vec<MetadataFilter>, Vec<BoundExpr>, Vec<BoundOrGroup>)
}

/// [`DeclarativePredicate`] 列（1 つの `AND` 列）を `schema`・UDF レジストリ
/// `udfs` と照合して [`BoundWhereFilters`] へ束縛する（Issue #945・NOSQL-14 の公開 API）。
pub fn bind_declarative_predicates(
    preds: &[DeclarativePredicate],
    schema: &TableSchema,
    udfs: &UdfRegistry,
) -> Result<BoundWhereFilters, SqlSurfaceError>
~~~

## Notes

- 上記フェンスは原文の module doc・公開型・公開関数シグネチャの抜粋（`check_predicate_limits` と束縛本体は省略）。
- 上限は `declarative_filter::MAX_METADATA_FILTERS`（葉の総数）と `udf_call::MAX_EXPR_DEPTH`（`Or` のネスト深さ）をそのまま採用（二重定義しない）。超過は `54000`。
- `Or` は 2 分岐未満・空分岐を `22000` で拒否する。空の `AND` 列は恒真として評価されるため、`OR` 全体を無条件で真にさせない二次防御（一次防御は wire-server の JSON 走査）。
- `BoundWhereFilters::or_filters` の要素型 `BoundOrGroup` は定義元 `sql::where_tree` が `pub(crate) mod` だが、`sql.rs` の `pub use where_tree::BoundOrGroup;` により `engine::sql::BoundOrGroup`（package 名は fandhe-db-engine、lib 名は engine）として型名は外部から記述できる（`ScalarShapeInput::or_filters` の要素型を名前解決可能にするための再エクスポート）。ただしフィールド `branches` と `new` / `matches` 等のメソッドはすべて `pub(crate)` のため、クレート外では不透明な値として受け渡すだけ（[where-tree](./where-tree.md)）。
- Distinct from `mssql` (node-mssql, T-SQL client) / `drizzle` (TypeScript ORM) / `supabase` (Postgres): this is the engine's NoSQL filter AST binding entry, not an ORM query builder.

## Related

- [where-tree](./where-tree.md)
- [parser](./parser.md)
- [scan](./scan.md)
