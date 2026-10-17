---
source: https://docs.rs/crate/fandhe-db-engine/0.2.0/source/src/sql/set_op.rs
---

# sql::set_op

集合演算（`UNION`／`UNION ALL`／`INTERSECT`／`EXCEPT`）の束縛・実行本体（SQL-29 (c)・RLS-10 (b)・TASK-213）。

## Signature / Usage

```rust,ignore
//! 責務境界: `sql::allowlist::validate_sql_tokens` が構造検証した
//! [`crate::sql::allowlist::ValidatedSetOperation`]（構文木は
//! [`crate::sql::allowlist::SetTree`]。葉は単一テーブルの広域取得
//! [`crate::sql::allowlist::ValidatedScan`]（Issue #1191 で、括弧付き枝の枝内
//! `ORDER BY`／`LIMIT`／`OFFSET` と、集計形の枝
//! [`crate::sql::allowlist::ValidatedAggregate`] を追加）に限定する）を受け取り、
//! `core.rs::EngineCore` の SQL 実行経路から呼ばれる。
//!
//! 各枝は既存の広域取得経路（[`crate::sql::scan::execute_scan_with_budget`]）を
//! そのまま通す。これにより RLS 暗黙適用・fail-closed のエラー契約を
//! 第 2 の実行器を作らずに継承する（各枝は呼び出しセッション自身の
//! [`crate::policy::PolicyContext`] で独立に評価されるため、他テナント行が
//! 中間結果・重複除去・`INTERSECT`／`EXCEPT` の判定・件数のいずれにも現れない。
//! RLS-10 (b)）。
//!
//! スコープ外: 明示トランザクション内での実行

pub(crate) fn collect_branch_tables(tree: &SetTree, out: &mut Vec<String>);

pub(crate) fn execute(
    read_txn: &impl crate::storage::read_source::ReadSource,
    ctx: &PolicyContext,
    schemas: &HashMap<String, TableSchema>,
    tree: &SetTree,
    udfs: &UdfRegistry,
    limit: Option<u32>,
) -> Result<QueryResult, SqlSurfaceError>;

pub(crate) fn execute_with_budget(
    read_txn: &impl crate::storage::read_source::ReadSource,
    ctx: &PolicyContext,
    schemas: &HashMap<String, TableSchema>,
    tree: &SetTree,
    udfs: &UdfRegistry,
    limit: Option<u32>,
    budget_cap: usize,
) -> Result<QueryResult, SqlSurfaceError>;

pub(crate) fn describe_columns(
    schemas: &HashMap<String, TableSchema>,
    tree: &SetTree,
    udfs: &UdfRegistry,
    dummy_equality_flags: &[bool],
    limit: Option<u32>,
) -> Result<Vec<ColumnMeta>, SqlSurfaceError>;
```

## Options / Props

| Name | Default | Description |
|------|---------|-------------|
| `MAX_SET_OP_ROWS` | `crate::core::MAX_SEARCH_K` | 重複除去を伴う演算の行キー集合の基数上限。合成結果の行数上限も共有。超過は `54000` |
| `SetOpBudget` cap | `crate::arena::MAX_ARENA_TOTAL_BYTES` | 文全体（全枝の走査・合成・行キー生成）で 1 つ共有する累計バイト予算。超過は `54000` |
| 最大枝数 | 16（原文「実装既定値 16」） | 枝数の上限 |
| `limit` | — | 全体 `LIMIT`。範囲検証（`1..=MAX_SEARCH_K`）は全枝の走査・合成より前に行い、`describe_columns` と同じ検証を共有する |

## Notes

- 出典は `fandhe-db-engine` 0.2.0（git SHA `dc888f6ea146d3078153d64a6848f5c8cf044431`）の `src/sql/set_op.rs`（全1149行、テスト除く先頭 810 行）。公開・`pub(crate)` アイテムのシグネチャと主要 doc comment の抜粋で、`SetOpBudget` / `eval_tree` / `eval_branch` 等 private 実装は掲載していない
- 予算を文全体で 1 つにしているのは、各枝が独立に同予算を使うと最大枝数分の結果を同時保持でき、SQL 入力だけで過大なメモリを確保できる（DoS）ため（PR #1105 レビュー指摘対応）
- 関連 ADR（commit `dc888f6`、`docs/design/set-operations.md`）
- distinct from `mssql` / `drizzle` / `supabase`: fandhe-db 内部の集合演算実行器であり、各 SQL ダイアレクトの UNION 構文リファレンスではない

## Related

- [join](./join.md)
- [aggregate](./aggregate.md)
