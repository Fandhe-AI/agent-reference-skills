---
source: https://docs.rs/crate/fandhe-db-engine/0.2.0/source/src/sql/describe.rs
---

# sql::describe

Describe（拡張クエリプロトコルの `'D'` 種別 S。Issue #933・TASK-71・WIRE-11）が返す結果列メタデータの純粋な導出関数群。束縛済みの投影列（`ProjectedColumn`／`ProjectionColumn`）から `sql::exec::ColumnMeta` への、実行結果に依存しない写像だけを担う。

## Signature / Usage

~~~rust,ignore
//! Describe（拡張クエリプロトコルの 'D' 種別 S。Issue #933・TASK-71・WIRE-11）が
//! 返す結果列メタデータの純粋な導出関数を集める。
//!
//! 呼び出し元は `core.rs::EngineCore::describe_parsed_in_session` のみ
//! （行データ・台帳・LLM I/O にはいずれも触れない）。ここに置く関数は
//! 「束縛済みの投影列（`ProjectedColumn`／`ProjectionColumn`）→
//! `sql::exec::ColumnMeta`」という、実行結果に依存しない写像だけを担う。
//! `SELECT`（[`crate::sql::exec::execute_statement_with_cache`]）・広域取得
//! （[`crate::sql::scan::execute_scan`]）・`RETURNING`
//! （[`crate::sql::returning::column_meta`]）が実際の実行時に組み立てる列と
//! 完全に一致する契約（`crates/engine/tests/describe_parity.rs` で機械検証）。

pub(crate) fn projected_columns(
    projection: &[ProjectedColumn],
    schema: &TableSchema,
) -> Vec<ColumnMeta>

/// 広域取得（scan）の [`BoundScan`] から結果列メタデータを導出する（SQL-30・
/// TASK-214、Issue #930）。`bound.windows()` が空なら [`projected_columns`] と
/// 同じ結果になる。非空の場合は、ウィンドウ以外の列へ
/// [`crate::sql::parser::BoundWindowItem::position`] に基づいてウィンドウ
/// 列（`ColumnMeta::Computed`）を差し込む。
pub(crate) fn scan_columns(
    bound: &BoundScan,
    schema: &TableSchema,
) -> Result<Vec<ColumnMeta>, SqlSurfaceError>

/// 集計（`GROUP BY` の有無を問わない）の出力列から `ColumnMeta` を導出する。
/// 結果型は集計関数と入力型から静的に決まる（Issue #1173）。
pub(crate) fn aggregate_columns(
    bound: &BoundAggregate,
    schema: &crate::catalog::TableSchema,
) -> Result<Vec<ColumnMeta>, SqlSurfaceError>
~~~

## Notes

- 上記フェンスは原文の全 3 関数シグネチャと doc comment の抜粋（`projected_columns` の `match` 本体、`scan_columns` のウィンドウ位置組み立て本体は省略）。3 関数とも `pub(crate)` で、クレート外から直接呼べる API は無い。
- `ProjectedColumn::Id` は `ColumnMeta::Id`、`Column` は `ColumnMeta::Scalar { name, ty }`、`Computed` は `computed_column_meta` へ写像される。`schema.columns` の範囲外の添字は `ColumnType::Text` へのフォールバックで fail-closed（panic しない）。
- `RETURNING` の `column_meta` は構造検証段で `Computed` 項目を排除済みだが、通常の `SELECT` は宣言的 UDF・組み込み関数呼び出し（TASK-79・SQL-9）による `Computed` 項目を持ちうる点で異なる。
- 実行時の列メタデータとの一致は `describe_parity.rs` で機械検証される契約。ウィンドウ位置の不一致は `Internal` エラー。
- Distinct from `mssql` (node-mssql, T-SQL client) / `drizzle` (TypeScript ORM) / `supabase` (Postgres): Describe here is the PostgreSQL wire extended-protocol result-column metadata derived without executing the statement.

## Related

- [parser](./parser.md)
- [scan](./scan.md)
- [params](./params.md)
