---
source: https://docs.rs/crate/fandhe-db-engine/0.2.0/source/src/sql/window.rs
---

# sql::window

ウィンドウ関数（`ROW_NUMBER`/`RANK`/`DENSE_RANK` と `OVER` 付き集計。SQL-30・TASK-214、Issue #930）の実行本体。広域取得の投影に `<func>(...) OVER (PARTITION BY ... ORDER BY ...)` を加えたもの。

## Signature / Usage

```rust,ignore
//! `sql::scan::execute_scan_with_budget` から `bound.windows()` が空でない場合に
//! dispatch される。2 段階で実行する。
//!
//! 1. **materialize 段**（[`materialize_rows`]）: 対象テーブルを 1 回、`LIMIT` に
//!    よる早期終了なしで走査し、可視かつ `WHERE` を満たす行**全体**について
//!    ウィンドウ項目ごとの `PARTITION BY`／`ORDER BY` キー・集計引数の値を集める。
//!    不可視行・`WHERE` 不一致行はウィンドウ計算の母集合に一切現れない
//!    （RLS-7・RLS-8 のウィンドウ版）。
//! 2. **投影段**（[`build_result`]）: ウィンドウ以外の投影・`LIMIT`／`OFFSET` の
//!    適用は、`windows` 空の [`BoundScan`] 複製を [`crate::sql::scan::execute_scan`]
//!    へそのまま渡すことで既存の実行器を再利用する。ウィンドウ列は
//!    [`crate::sql::allowlist::WindowSelectItem::position`] に基づいて元の
//!    SELECT リスト位置へ差し込む。
//!
//! 対象外（`42601`／`54000` で fail-closed に拒否）: フレーム句（`ROWS`/`RANGE`/`GROUPS`）・
//! `NULLS FIRST/LAST`・名前付きウィンドウ・`FILTER (...)`・関数内 `DISTINCT`・
//! 複合式の引数・ベクトル順位付け（`ORDER BY embedding <=> ...`）／`USING PLAN` との併用・
//! ウィンドウ別名による文全体の `ORDER BY`・`GROUP BY`／集計 SELECT との併用。

const MAX_WINDOW_PARTITIONS: usize = crate::sql::group_by::MAX_GROUPS;
const MAX_WINDOW_ROWS: usize = 1_000_000;
const MAX_WINDOW_FRAME_ROWS: usize = 1_000_000;
const MAX_WINDOW_STATE_BYTES: usize = 64 * 1024 * 1024;

pub(crate) fn execute_window_scan(
    read_txn: &impl crate::storage::read_source::ReadSource,
    ctx: &PolicyContext,
    schema: &TableSchema,
    bound: &BoundScan,
    max_result_bytes: usize,
) -> Result<QueryResult, SqlSurfaceError>;

pub(crate) struct CellWindowEvaluator<'a> { /* items, rows, state_bytes, partition_counts */ }

impl<'a> CellWindowEvaluator<'a> {
    pub(crate) fn new(items: &'a [BoundWindowItem]) -> Result<Self, SqlSurfaceError>;
    pub(crate) fn push_row(
        &mut self,
        scanned: &[Option<row_codec::ScalarRef<'_>>],
    ) -> Result<(), SqlSurfaceError>;
    pub(crate) fn finish(mut self) -> Result<Vec<Vec<Cell>>, SqlSurfaceError>;
}

pub(crate) fn window_result_type(item: &BoundWindowItem) -> Option<ColumnType>;
```

## Options / Props

| Name | Value | Description |
|------|-------|-------------|
| `MAX_WINDOW_PARTITIONS` | `sql::group_by::MAX_GROUPS` | パーティション数の上限 |
| `MAX_WINDOW_ROWS` | 1_000_000 | クエリ全体でウィンドウ計算のために materialize してよい行数の合計上限 |
| `MAX_WINDOW_FRAME_ROWS` | 1_000_000 | 1 パーティションが保持してよい行数の上限 |
| `MAX_WINDOW_STATE_BYTES` | 64 MiB | キー値・引数値・行ごとの固定オーバーヘッドの累計バイト数上限 |

## Notes

- 出典は `fandhe-db-engine` 0.2.0（git SHA `dc888f6ea146d3078153d64a6848f5c8cf044431`）の `src/sql/window.rs`（全2084行、先頭 1786 行が本体）。モジュール doc comment の主要部分と公開・`pub(crate)` アイテムの抜粋で、内部の materialize / 評価ロジックは掲載していない
- `CellWindowEvaluator` は評価済みセルを 1 行ずつ流し込む評価器で、評価後射影形ビュー（`sql::view_buffered`）が外側 `WHERE` を通った行だけを母集合として使う
- 集計の数値計算（`SUM`/`AVG`/`MIN`/`MAX` の NULL 契約・桁あふれ検査・NUMERIC の scale 保持）は `sql::aggregate::Accumulator` を再利用。ウィンドウ項目の集計引数は構文段で裸の列参照・`*` のみに制限
- `window_result_type`: `ROW_NUMBER`・`RANK`・`DENSE_RANK`・`COUNT` は `BigInt`
- 関連 ADR（commit `dc888f6`、`docs/design/window-functions.md`）
- distinct from `mssql` / `drizzle` / `supabase`: fandhe-db 内部のウィンドウ関数実行器であり、各 SQL ダイアレクトの OVER 句仕様ではない

## Related

- [aggregate](./aggregate.md)
- [group-by](./group-by.md)
- [view-buffered](./view-buffered.md)
