---
source: https://docs.rs/crate/fandhe-db-engine/0.2.0/source/src/sql/relation.rs
---

# sql::relation

複数テーブル参照スコープの束縛基盤（SQL-28・RLS-10、TASK-212、Issue #924）。呼び出し元が解決済みの `(TableRef, &TableSchema)` を `BindingScope` へ渡し、修飾・非修飾の列参照を `resolve` で解決する。`INNER JOIN`（Issue #925）が本番経路で最初に結線した。

## Signature / Usage

~~~rust,ignore
//! 責務境界: 本モジュールは複数テーブル参照の「束縛スコープ」の土台を提供する。
//! `INNER JOIN`（Issue #925。`sql::allowlist::parse_join_statement`・
//! `sql::join::build_plan`）が本番経路で最初に結線した。呼び出し元は複数の
//! `(TableRef, &TableSchema)` を集めて [`BindingScope::new`] へ渡し、修飾・
//! 非修飾の列参照を [`BindingScope::resolve`] で解決する。単一テーブルの
//! `SELECT`／広域取得は引き続き本モジュールを経由しない（責務を分けたまま）。
//!
//! 本モジュールはカタログ照会を行わない: `relations` に渡された
//! `(TableRef, &TableSchema)` は呼び出し元が解決済みのものとして受け取る
//! （ビュー展開・FROM 解決は Issue #928 以降の管轄）。

/// 1 クエリが持てるテーブル参照数の上限（本リポ独自の実装既定値）。
pub const MAX_TABLE_REFS: usize = 8;

/// FROM 句の 1 テーブル参照（テーブル名 + 任意の別名）。別名を付けた場合、
/// PostgreSQL と同様に元のテーブル名では修飾できなくなる。
pub struct TableRef { /* table, alias */ }

impl TableRef {
    pub fn new(table: impl Into<String>) -> Self
    pub fn with_alias(table: impl Into<String>, alias: impl Into<String>) -> Self
    pub fn table(&self) -> &str
    pub fn alias(&self) -> Option<&str>
    /// 修飾列参照（`<qualifier>.<col>`）が照合する公開名。別名があれば別名、無ければテーブル名。
    pub fn exposed_name(&self) -> &str
}

pub struct ColumnRef { /* qualifier, name */ }

impl ColumnRef {
    pub fn unqualified(name: impl Into<String>) -> Self
    pub fn qualified(qualifier: impl Into<String>, name: impl Into<String>) -> Self
    pub fn qualifier(&self) -> Option<&str>
    pub fn name(&self) -> &str
}

pub enum ColumnSlot {
    /// 行キー疑似列 `id`。
    Id,
    /// `TableSchema::columns` の添字。
    Column(usize),
}

pub struct ResolvedColumn { /* relation, slot, column_type */ }

impl ResolvedColumn {
    pub fn relation(&self) -> usize
    pub fn slot(&self) -> ColumnSlot
    /// 列型（[`ColumnSlot::Id`] は行キー疑似列のため `None`）。
    pub fn column_type(&self) -> Option<&ColumnType>
}

pub struct BindingScope<'a> { /* relations: Vec<(TableRef, &'a TableSchema)> */ }

impl<'a> BindingScope<'a> {
    /// 参照数を `1..=MAX_TABLE_REFS` で検証し（超過は `54000`）、公開名の重複を
    /// 検出する（`42601`）。
    pub fn new(relations: Vec<(TableRef, &'a TableSchema)>) -> Result<Self, SqlSurfaceError>
    pub fn len(&self) -> usize
    pub fn is_empty(&self) -> bool
    pub fn relations(&self) -> &[(TableRef, &'a TableSchema)]
    pub fn resolve(&self, column: &ColumnRef) -> Result<ResolvedColumn, SqlSurfaceError>
}
~~~

## Options / Props

`BindingScope::resolve` のエラー分類（原文 doc comment より）:

| Case | Error |
|------|-------|
| 修飾子が公開名に一致する参照が無い | `undefined_table`（`42P01`。カタログを照会しないため存在オラクルにならない） |
| 一致した参照内に列が無い | `invalid_input`（`22000`） |
| 非修飾でヒットが 2 件以上 | `ambiguous_column`（`42702`。`id` は全参照が持つ疑似列のため、参照が 2 つ以上あれば非修飾 `id` は常にこの分類） |
| 非修飾でヒット 0 件 | `invalid_input`（`22000`） |

## Notes

- 上記フェンスは原文の module doc・公開型・公開メソッドシグネチャの抜粋（`resolve_in_relation` の本体・テストは省略）。
- 単一参照スコープでの非修飾解決は、既存の単一テーブル束縛と同じ添字を返す（実カラムを疑似列 `id` より優先。`tests/multi_relation_binding.rs` の等価性テストで固定）。
- 自己結合で同じテーブルを 2 回参照した場合、`ResolvedColumn::relation` は別の値になる。カタログ照会・RLS 判定は一切行わない（参照集合内での名前解決のみ）。
- JOIN 文に `$n` が含まれると一律 `42601`（[params](./params.md)）。
- Distinct from `mssql` (node-mssql, T-SQL client) / `drizzle` (TypeScript ORM) / `supabase` (Postgres): this is a name-resolution scope with a hard limit of 8 table references, not a general relational planner.

## Related

- [cte](./cte.md)
- [parser](./parser.md)
- [plan](./plan.md)
- [params](./params.md)
