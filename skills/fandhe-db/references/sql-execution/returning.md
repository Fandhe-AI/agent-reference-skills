---
source: https://docs.rs/crate/fandhe-db-engine/0.2.0/source/src/sql/returning.rs
---

# sql::returning

`INSERT`／`DELETE`／`UPDATE`／UPSERT の `RETURNING` 句（Issue #873・#1182・SQL-21）の投影・行組み立て。返す行は「その文が書き込んだ（削除前の）値」そのもので、`sql::scan`／`sql::exec` の SELECT 経路が行う redb 走査・RLS 述語評価は経由しない。

## Signature / Usage

```rust,ignore
//! 呼び出し元（`sql::exec::execute_insert_returning`／`execute_delete_returning` ほか、各 DML の
//! `*_returning` 実行入口）が既に確定させた `(id, values)` を、`SELECT` の投影束縛
//! （`sql::parser::bind_projection`）と同じ列解決規則（実カラム優先・疑似列 `id`）で
//! `sql::exec::QueryResult` へ写像するだけの薄い層とする（第 2 の投影実装を作らない）。

pub(crate) const MAX_RETURNING_RESULT_BYTES: usize = crate::arena::MAX_ARENA_TOTAL_BYTES;

/// `RETURNING` を持ちうる DML の種別。`wire-server::simple_query` が
/// `CommandComplete` タグ（`INSERT 0 <n>`／`DELETE <n>`／`UPDATE <n>`）を
/// 組み立てる際の接頭辞選択に使う。
#[derive(Debug, Clone, Copy, PartialEq, Eq)]
pub enum DmlCommand {
    Insert,
    Update,
    Delete,
}

impl DmlCommand {
    /// pg 互換の `CommandComplete` タグ接頭辞。
    pub fn tag_prefix(self) -> &'static str;
}

pub(crate) fn column_meta(
    projection: &[ProjectedColumn],
    schema: &TableSchema,
) -> Result<Vec<ColumnMeta>, SqlSurfaceError>;

pub(crate) fn project_row(
    id: u64,
    values: &[Value],
    projection: &[ProjectedColumn],
    budget: &mut usize,
) -> Result<ResultRow, SqlSurfaceError>;
```

## Options / Props

| Name | Value | Description |
|------|-------|-------------|
| `MAX_RETURNING_RESULT_BYTES` | `crate::arena::MAX_ARENA_TOTAL_BYTES` | 結果セット全体（テキスト・ベクトル各セルの複製バイト量の合計）の累計上限。確保前に検証 |
| `DmlCommand::tag_prefix` | `"INSERT"` / `"UPDATE"` / `"DELETE"` | pg 互換の `CommandComplete` タグ接頭辞 |

## Notes

- 出典は `fandhe-db-engine` 0.2.0（git SHA `dc888f6ea146d3078153d64a6848f5c8cf044431`）の `src/sql/returning.rs`（全299行、テスト除く先頭 244 行）。公開・`pub(crate)` アイテムのシグネチャと主要 doc comment の抜粋で、private のセル複製ヘルパー（テキスト・ベクトル・配列・BYTEA の選択的複製、`returning_bug`）は掲載していない
- `project_row`: `values` は `schema.columns` の列順で、`VECTOR` 列の位置には実際の `Value::Vector` が必要。`score` は検索結果ではないため常に `0.0`
- `column_meta`: `ProjectedColumn::Computed`（式項目）は `sql::parser::bind_returning` が構造的に排除するため通常到達せず、到達時は `XX000` で fail-closed（式を含む `RETURNING` はサポート外）
- 累計バイト量超過は `54000`（`PayloadTooLarge`）。配列セルは TEXT 要素の本文長に加え `Vec<String>` の構造体分も計上する（PR #1011 codex レビュー指摘対応）
- 関連 ADR（commit `dc888f6`、`docs/design/sql-returning.md`）
- distinct from `mssql` / `drizzle` / `supabase`: fandhe-db 内部の RETURNING 投影層であり、各 SQL ダイアレクトの RETURNING / OUTPUT 句仕様ではない

## Related

- [exec](./exec.md)
- [partitioned](./partitioned.md)
