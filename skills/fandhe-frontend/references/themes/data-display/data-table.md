# Data Table

shadcn/ui `Data Table` 相当の表操作 UI（toolbar・ソート可能列ヘッダー・行選択・非表示列・footer）を提供するスタイル済み部品。表本体は `table` mod をそのまま使う。

## Signature / Usage

```rust
use fandhe_frontend_pre_styled_ui::data_table::{
    self, column_header_attrs, ColumnHeaderProps, ColumnProps, DataTableProps, SortDirection,
};

// 表全体の表示状態（loading / empty）
let root = data_table::root(DataTableProps::default(), vec![], vec![/* toolbar, table, footer */]);

// Themes 推奨経路: table::column_header の attrs へ属性ヘルパを渡す
let attrs = column_header_attrs(&ColumnHeaderProps {
    column: ColumnProps { id: "name", hidden: false },
    sort: Some(SortDirection::Ascending),
});
let css = data_table::stylesheet();
```

## Anatomy

`root` → `toolbar` / `column-header`（→ `sort-trigger`）/ `select-all` / `select-row` / `footer` / `selection-count`

## Options / Props

`DataTableProps`（`Default` 実装あり）:

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `loading` | `bool` | `false` | `data-loading` + `aria-busy="true"` |
| `empty` | `bool` | `false` | `data-empty`（表示すべき行が 0 件） |

`ColumnProps<'a>`: `id: &'a str`（`data-column`）/ `hidden: bool`（`hidden` + `data-hidden`）。`ColumnHeaderProps<'a>`: `column: ColumnProps<'a>` / `sort: Option<SortDirection>`（`None` はソート不可列で `aria-sort` / `data-sort` を付与しない。ソート可能で未ソートは `Some(SortDirection::None)`）。

`SortDirection`: `None` \| `Ascending` \| `Descending` \| `Other`（`aria-sort` と `data-sort` は同値）。

`DataTableAction`: `Sort(String)` / `ClearSort` / `ToggleColumn(String)` / `ShowColumn(String)` / `HideColumn(String)`。

属性ヘルパ（node を作らない、headless から再エクスポート）:

| Function | Signature |
|----------|-----------|
| `column_attrs` | `(column: &ColumnProps<'a>) -> Vec<(&'static str, &'a str)>` |
| `column_header_attrs` | `(props: &ColumnHeaderProps<'a>) -> Vec<(&'static str, &'a str)>` |
| `row_attrs` | `(selected: bool) -> Vec<(&'static str, &'static str)>`（選択時 `data-selected`） |

パーツ関数（すべて `#[must_use]`、呼び出し側 `class` は除去される）:

| Function | Signature |
|----------|-----------|
| `root` | `(props: DataTableProps, attrs: Vec<(&str, &str)>, children: Vec<Node>) -> Node` |
| `toolbar` / `footer` / `selection_count` | `(attrs: Vec<(&str, &str)>, children: Vec<Node>) -> Node`（純スロット） |
| `column_header` | `(table: &DataTable, id: &str, sortable: bool, attrs: Vec<(&str, &str)>, children: Vec<Node>) -> Node`（`th`） |
| `sort_trigger` | `(table: &DataTable, id: &str, attrs: Vec<(&str, &str)>, children: Vec<Node>) -> Node`（`button`） |
| `select_all` | `(state: CheckedState, attrs: Vec<(&str, &str)>, children: Vec<Node>) -> Node`（`th`） |
| `select_row` | `(state: CheckedState, attrs: Vec<(&str, &str)>, children: Vec<Node>) -> Node`（`td`） |
| `column_toggle_item` | `(column: &ColumnProps<'a>, disabled: bool, highlighted: bool, attrs: Vec<(&str, &str)>, children: Vec<Node>) -> Node`（列表示切替 1 項目。`data-scope` は `menu` のまま） |
| `stylesheet` | `() -> String` |

## Notes

- 出典: https://fandhe-ai.github.io/fandhe-frontend/themes/data-table/
- `@chakra-ui/react` の JS/TS API とは別物（Rust 製）
- `ColorPalette` / `Size` 等の見た目 variant は持たない。`data-loading` / `data-empty` / `data-sort` / `data-state` / `data-hidden` は headless 層の出力を CSS セレクタとして参照するだけ
- 表本体（`<table>` / `<thead>` / `<tbody>` / `<tr>`）は新規に作らず `table` mod を使う。`column_attrs` / `column_header_attrs` / `row_attrs` を `table::column_header` / `table::cell` / `table::row` の attrs へ渡して合成する
- 本部品自身の `column_header` / `sort_trigger`（`th` / `button` を生成）は自前で表を組み立てる利用者向けで、Themes 推奨経路の Demo には現れない。`select_all` / `select_row` は Themes 経路でもそのまま使う
- `sort_trigger` は現在のソート方向に応じ `▲` / `▼` / `↕` を `::after` で表示する。選択行の背景は `table` の `row` パーツの `data-selected` 規則を利用し、独自の行背景規則は持たない
- `select-all` / `select-row` のセル余白・境界線・幅は `--fandhe-data-table-cell-padding` 等の独自変数で上書きする（`--fandhe-table-*` は参照しない）
- 並べ替え・フィルタ・ページング処理、選択結果の保持・送信・永続化、列定義・列順の永続化は実装しない。`fandhe-frontend-wasm-full` 側の DOM 配線は別イシュー担当
- `empty` / `skeleton` の本体は持たず、`root` の `data-empty` / `data-loading` という表示状態のみを持つ

## Related

- [Primitives: Data Table](../../primitives/display/data-table.md)
- [Table](./table.md)
