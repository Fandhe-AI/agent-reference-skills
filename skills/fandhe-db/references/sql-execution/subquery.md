---
source: https://docs.rs/crate/fandhe-db-engine/0.2.0/source/src/sql/subquery.rs
---

# sql::subquery

WHERE 句のサブクエリ（`IN (SELECT ...)`・`NOT IN`・`EXISTS`・`NOT EXISTS`・値位置のスカラーサブクエリ `<col> <op> (SELECT ...)`）と投影位置のスカラーサブクエリを、実行前に解決する（Issue #927・#1191・#1352・SQL-29 (a)・RLS-10 (b)・TASK-213）。

## Signature / Usage

```rust,ignore
//! 内側は外側と同じ `PolicyContext`（RLS 暗黙適用）・同じ `read_txn`（同一
//! スナップショット）で `sql::allowlist::validate_sql_tokens_with_subquery_ctx` →
//! `sql::parser::bind_scan`（集計内側は `bind_aggregate`）→ 既存の実行器という、
//! 通常の SELECT と完全に同じ経路で実行し、結果を具体的な `WherePredicate`
//! （`Or`／`Equality`／`InList`／`Compare`／`Expression` 等）へ書き換える。
//!
//! 対応する内側の形:
//! - `IN`／`NOT IN`／`EXISTS`／`NOT EXISTS`: `SELECT <単一列> FROM <table> [WHERE ...]
//!   LIMIT <n>`（広域取得＝[`Statement::Scan`]）のみ。
//! - スカラー: 上記に加え、単一集計項目の集計形（[`Statement::Aggregate`]。
//!   `GROUP BY` の有無を問わず `LIMIT` 不要）。
//!
//! ランキング付き検索 SELECT・集合演算・JOIN・内側の `LIMIT` 省略（Scan 形）・
//! 内側自身の投影位置スカラーサブクエリは `42601`。
//!
//! NULL 規則（三値論理。RLS 境界内＝可視行のみから決まる）:
//! - `NOT IN`: 内側 0 行なら常に真（外側値が NULL でも真）。内側の結果に NULL を
//!   1 つでも含めば真にならない。
//! - `NOT EXISTS`: 可視行が 1 件でもあれば常に偽、無ければ常に真。
//! - スカラー: 0 行または NULL は UNKNOWN。2 行以上は「先頭行を採用」せずエラー
//!   （`21000`。Issue #1404）。

pub(crate) const MAX_SUBQUERY_EXECUTIONS: usize = 16;
pub(crate) const MAX_SUBQUERY_IN_VALUES: usize = crate::core::MAX_SEARCH_K;
const MAX_INT_NOT_IN_VALUES: usize = crate::declarative_filter::MAX_IN_LIST_ITEMS / 2;

pub(crate) fn resolve_where_predicates(
    predicates: Vec<WherePredicate>,
    outer_scopes: &[&TableSchema],
    read_txn: &impl crate::storage::read_source::ReadSource,
    ctx: &PolicyContext,
    lookup: &impl TableLookup,
    udfs: &UdfRegistry,
    budget: &mut usize,
    in_value_budget: &mut usize,
) -> Result<Vec<WherePredicate>, SqlSurfaceError>;

pub(crate) fn resolve_scalar_projection_items(
    items: &[ScalarSubqueryItem],
    outer_scopes: &[&TableSchema],
    read_txn: &impl crate::storage::read_source::ReadSource,
    ctx: &PolicyContext,
    lookup: &impl TableLookup,
    udfs: &UdfRegistry,
    budget: &mut usize,
    in_value_budget: &mut usize,
) -> Result<Vec<ResolvedScalarItem>, SqlSurfaceError>;

pub(crate) fn merge_scalar_projection_items(
    mut result: super::exec::QueryResult,
    items: Vec<ResolvedScalarItem>,
) -> Result<super::exec::QueryResult, SqlSurfaceError>;
```

## Options / Props

| Name | Value | Description |
|------|-------|-------------|
| `MAX_SUBQUERY_EXECUTIONS` | 16 | 1 文（トップレベル実行 1 回。ネスト含む）あたりに実行できる内側サブクエリの総数。ネスト深さ上限 `allowlist::MAX_SUBQUERY_DEPTH` と組み合わせて評価コストを有界にする |
| `MAX_SUBQUERY_IN_VALUES` | `crate::core::MAX_SEARCH_K` | 1 文あたりに `IN`／`NOT IN` の集合照合へ取り込める distinct 値の総数（`declarative_filter::MAX_IN_LIST_ITEMS` 件ずつのチャンクへ分割し `InList` へ束縛） |
| `MAX_INT_NOT_IN_VALUES` | `MAX_IN_LIST_ITEMS / 2` | 整数列の `NOT IN` 1 サイトあたり distinct 値数の上限。超過は `54000` |
| 内側の可視行数 | `crate::core::MAX_SEARCH_K` 超で `54000` | — |

## Notes

- 出典は `fandhe-db-engine` 0.2.0（git SHA `dc888f6ea146d3078153d64a6848f5c8cf044431`）の `src/sql/subquery.rs`（全2285行、テスト除く先頭 1944 行）。モジュール doc comment と公開・`pub(crate)` アイテムのシグネチャの抜粋で、内部の値族判定・静的検証・リテラル書き換えロジックは掲載していない
- 相関サブクエリ（内側が外側の列を非修飾名で参照する形）は束縛前の静的走査で `42601`。内側スキーマに無く外側スコープに有る列名を相関参照とみなす
- `EXISTS` は `InnerScanIntent::ExistenceOnly` で内側を実質 `LIMIT 1`・投影不要へ差し替えるが、`WHERE`・RLS の適用は変更しない
- 内側にウィンドウ関数が含まれる場合は一律 `42601`
- 投影位置のスカラーサブクエリ（Issue #1352）は外側が広域取得 SELECT のみ。内側が 2 行以上なら外側結果が 1 行以上のときだけ `21000`（遅延評価、Issue #1432 で入れ子 WHERE も同様）
- 関連 ADR（commit `dc888f6`、`docs/design/sql-subquery.md`）
- distinct from `mssql` / `drizzle` / `supabase`: fandhe-db 内部のサブクエリ解決層であり、各 SQL ダイアレクトのサブクエリ仕様ではない

## Related

- [exec](./exec.md)
- [aggregate](./aggregate.md)
- [window](./window.md)
