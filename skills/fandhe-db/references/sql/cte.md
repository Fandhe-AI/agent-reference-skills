---
source: https://docs.rs/crate/fandhe-db-engine/0.2.0/source/src/sql/cte.rs
---

# sql::cte

非再帰 `WITH` 句（CTE）の名前解決・インライン展開（SQL-29 (b)・RLS-10 (b)、TASK-213、Issue #928）。CTE を「クエリの中だけで有効な名前なしビュー」として扱い、畳み込み後は既存の `ValidatedScan` と同じ形になるため、束縛・実行・RLS 適用は既存経路をそのまま通る。

## Signature / Usage

~~~rust,ignore
//! 非再帰 `WITH` 句（CTE）の名前解決・インライン展開（SQL-29 (b)・RLS-10 (b)、
//! TASK-213、Issue #928）。
//!
//! 責務境界: `sql::allowlist::validate_sql_tokens` の `WITH` 分岐が
//! `sql::allowlist::parse_with_clause` で切り出した各 CTE 定義本文
//! （[`super::allowlist::ParsedViewBody`]、`CREATE VIEW` 本文と同一の許可
//! パーサーを再利用する）を、本モジュールの [`resolve_relation`] を通じて
//! `sql::view::resolve_from` と同型の名前解決へ合流させる。CTE は「クエリの
//! 中だけで有効な名前なしビュー」として扱い、第 2 の SQL パーサー・実行器は
//! 作らない。
//!
//! RLS-10 (b) の不変条件: [`CteDef`] は `tenant_id`／`PolicyContext`／作成者の
//! 情報を一切保持しない。畳み込み後の文は、参照した**セッション自身**の
//! `PolicyContext` を使う既存の実行経路でしか評価されない。
//!
//! 名前解決の順序（PostgreSQL と同じ意味論）: CTE 名はカタログのテーブル・
//! ビューを隠す。i 番目の CTE の本文から見えるのは 0..i-1 番目の CTE だけで、
//! 見つからなければ [`super::view::resolve_from`]（ビュー→テーブル）へ進む。
//! このため自己参照や循環は構造的に作れない（自己参照に見える名前は同名の
//! 実リレーションへ解決される）。

/// CTE の定義数上限（超過は `54000`。SQL-29 (b) の受入基準 3）。
pub(crate) const MAX_CTE_DEFINITIONS: usize = 16;

/// CTE→CTE の連鎖の深さ上限（`catalog::MAX_VIEW_NESTING_DEPTH` と同じ値）。
pub(crate) const MAX_CTE_NESTING_DEPTH: u32 = 4;

/// CTE 名の解決回数の上限。
pub(crate) const MAX_CTE_REFERENCES: usize = 32;

/// `WITH <name> AS (<body>)` 1 件分の定義。
pub(crate) struct CteDef {
    pub(crate) name: String,
    pub(crate) body: ParsedViewBody,
}

pub(crate) fn resolve_relation(
    lookup: &impl TableLookup,
    ctes: &[CteDef],
    visible_upto: usize,
    name: &str,
    depth: u32,
    budget: &mut ResolveBudget,
) -> Result<Resolved, SqlSurfaceError>

pub(crate) fn check_definition_count(count: usize) -> Result<(), SqlSurfaceError>
pub(crate) fn check_no_duplicate_name(ctes: &[CteDef], name: &str) -> Result<(), SqlSurfaceError>
~~~

## Notes

- 上記フェンスは原文 module doc・定数・型・関数シグネチャの抜粋（`ResolveBudget` の実装、`compose` の本体は省略）。本モジュールの項目はすべて `pub(crate)` で、クレート外へ公開される API は無い（SQL からは `WITH ... SELECT` として使う）。
- 主クエリは広域取得（`Statement::Scan`）のみに限定され、データ変更 CTE（`WITH x AS (DELETE ...)` 等）は構造検証段で `42601`。再帰 CTE は対象外（非再帰のみ）。
- 上限超過（定義数 16・連鎖深さ 4・参照回数 32）は `54000`。CTE 名の重複は `42601`（`duplicate CTE name`）。`ResolveBudget` は 1 回のトップレベル呼び出し系列ごとに新規生成する規約。
- 集計／`LIMIT` 本体を持つ評価後射影形ビュー（`Resolved::Buffered`）は CTE から参照できず `42601`。
- `WITH` を先頭語とする文に `$n` が含まれると一律 `42601`（[params](./params.md)。CTE の述語が主クエリ述語の前へ挿入され、`$n` の対応先がずれる恐れがあるため）。複数文メッセージでは `WITH` は `ReadOnly` に分類される（[statement-splitter](./statement-splitter.md)）。
- Distinct from `mssql` (node-mssql, T-SQL client) / `drizzle` (TypeScript ORM) / `supabase` (Postgres): non-recursive only, restricted to scan-shaped queries; the CTE name shadows catalog tables and views.

## Related

- [allowlist](./allowlist.md)
- [params](./params.md)
- [relation](./relation.md)
- [scan](./scan.md)
