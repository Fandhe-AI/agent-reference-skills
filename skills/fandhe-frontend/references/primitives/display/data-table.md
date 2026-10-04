# Data Table

表の操作 UI（toolbar・ソート可能な列ヘッダー・行選択・列表示切替・footer）の shadcn/ui Data Table 相当の部品。Root / Toolbar / ColumnHeader / SortTrigger / SelectAll / SelectRow / Footer / SelectionCount の 8 anatomy パーツと、ソート方向・非表示列の表示状態のみを持つ最小の状態機械 `DataTable` を持つ。

## Signature / Usage

```rust
use fandhe_frontend_core::text;
use fandhe_frontend_headless_ui::data_table::{DataTable, DataTableProps};

let table = DataTable::default();

let header = table.column_header("name", true, vec![], vec![
    table.sort_trigger("name", vec![], vec![text("Name")]),
]);
let root = DataTable::root(DataTableProps { loading: false, empty: false }, vec![], vec![
    // <table> / <thead> / <tbody> / <tr> は本 mod が生成しない。呼び出し側または pre-styled `table` で組む
]);
```

```rust
DataTable::new(sort: Option<(String, SortDirection)>, hidden_columns: Vec<String>) -> Self
table.sort() -> Option<(&str, SortDirection)>
table.hidden_columns() -> &[String]
table.is_hidden(id: &str) -> bool
table.sort_direction_of(id: &str) -> Option<SortDirection>
DataTable::root(props: DataTableProps, attrs, children) -> Node
table.column_header(id: &str, sortable: bool, attrs, children) -> Node
table.sort_trigger(id: &str, attrs, children) -> Node
DataTable::select_all(state: CheckedState, attrs, children) -> Node
DataTable::select_row(state: CheckedState, attrs, children) -> Node
data_table::toolbar(attrs, children) / footer(attrs, children) / selection_count(attrs, children)
data_table::column_toggle_item(column: &ColumnProps, disabled: bool, highlighted: bool, attrs, children) -> Node
data_table::column_attrs(&ColumnProps) / column_header_attrs(&ColumnHeaderProps) / row_attrs(selected: bool)
```

## Anatomy

典型的な入れ子の一例。ソースで裏付けられるのは `sort-trigger` が列ヘッダー内のボタンであること、`toolbar` / `footer` が純スロットで `footer` に `selection_count` を入れ子にすること、`column_header` / `select_all` が `th`、`select_row` が `td` であることのみ。

```
root
  toolbar
  column-header
    sort-trigger
  select-all
  select-row
  footer
    selection-count
```

## Options / Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `DataTable::new: sort` | `Option<(String, SortDirection)>` | `None`（`Default`） | ソート中の列 id と方向（高々 1 列）。空の列 id は未ソートへ正規化 |
| `DataTable::new: hidden_columns` | `Vec<String>` | 空 | 非表示列 id 集合。重複は除去（fail-closed） |
| `DataTableProps.loading` | `bool` | `false` | `data-loading` + `aria-busy="true"` |
| `DataTableProps.empty` | `bool` | `false` | `data-empty` |
| `column_header: sortable` | `bool` | 必須 | `false` の列は `aria-sort` / `data-sort` を一切出力しない |
| `ColumnProps.id` / `hidden` | `&str` / `bool` | — | 列 id（`data-column`）と非表示（`hidden` + `data-hidden`） |
| `ColumnHeaderProps.column` / `sort` | `ColumnProps` / `Option<SortDirection>` | — | `sort` が `None` ならソート不可列。ソート可能で未ソートなら `Some(SortDirection::None)` |
| `select_all` / `select_row: state` | `checkbox::CheckedState` | 必須 | 呼び出し側から受ける選択状態。`data-state` に反映 |
| `column_toggle_item: column` / `disabled` / `highlighted` | `&ColumnProps` / `bool` / `bool` | — | Menu の checkbox item の薄いラッパ。`checked = !column.hidden`、`value = column.id` |

`SortDirection`: `None` / `Ascending` / `Descending` / `Other`（`as_aria_sort()` / `as_data_sort()`）。

## Actions

`DataTableAction`（`DataTable::update`）と dispatch 名（payload は列 id、空文字列は no-op）:

| Variant | dispatch 名 | Description |
| --- | --- | --- |
| `Sort(String)` | `"sort"` | 同じ列は `none → ascending → descending → none` を巡回、別列は常に `ascending` から開始 |
| `ClearSort` | `"clear-sort"` | ソート解除（payload 不使用） |
| `ToggleColumn(String)` | `"toggle-column"` | 列の表示 / 非表示をトグル |
| `ShowColumn(String)` | `"show-column"` | 列を表示（既に表示なら no-op） |
| `HideColumn(String)` | `"hide-column"` | 列を非表示（既に非表示なら no-op） |

## Data Attributes

| Part | Attribute | Values |
| --- | --- | --- |
| column-header | `aria-sort` / `data-sort` | `none` \| `ascending` \| `descending` \| `other` |
| column-header / cell | `data-column` | 列 id |
| column-header / cell | `hidden` + `data-hidden` | 列が非表示のとき |
| sort-trigger | `data-value` | 列 id |
| sort-trigger | `data-sort` | 現在の方向（`aria-sort` は付与しない） |
| root | `data-loading` / `data-empty` | presence |
| select-all / select-row | `data-state` | `CheckedState` に対応 |
| row（`row_attrs`） | `data-selected` | presence |
| column_toggle_item | `data-column-toggle` | presence（wasm-full 配線層が列表示切替トリガーを判別するマーカー） |

## Notes

- 出典: https://fandhe-ai.github.io/fandhe-frontend/primitives/data-table/
- 責務境界: 行の実際の並べ替え（比較関数・安定ソート・多列優先順位）・選択結果の保持・送信・永続化・列定義や列順の永続化・ページサイズに応じたデータ取得や総件数算出はアプリケーション側。行選択集合は状態機械に持たせない。
- `<table>` / `<thead>` / `<tbody>` / `<tr>` を一切生成しない（`table` / `empty-state` / `skeleton` は pre-styled-ui 側にのみ anatomy があり、headless-ui は上層へ依存できないため）。セル単位の表示状態は node を作らない属性ヘルパ `column_attrs` / `column_header_attrs` / `row_attrs` として公開され、pre-styled `table` の `attrs` へそのまま渡せる。headless 単独経路向けに `column_header`（`th`）/ `select_all`（`th`）/ `select_row`（`td`）のノード生成パーツも持つ。
- `column_header` / `select_all` は `th` で `scope="col"` 固定。`sort_trigger` は `button type="button"`。
- `toolbar` / `footer` は純スロット。`toolbar` へ Field の `input`（フィルタ）・`column_toggle_item`、`footer` へ Pagination のパーツと `selection_count`（整形済みの選択件数文字列スロット）を入れ子にする。
- `role="toolbar"` は意図的に不採用（矢印キー roving focus の配線義務が生じるため）。キーボード操作は Tab / Shift+Tab / Enter / Space のみ。
- `col` / `colgroup`（`visibility: collapse`）はブラウザ差があるため列非表示に使わず、セル単位の `hidden` 属性で代替する。
- 公式 docs: `sort-trigger` の click → dispatch の DOM 配線・列表示切替・全選択 indeterminate 表示・ページングの `data-disabled` は `fandhe-frontend-wasm-full` 側の後続イシューのスコープ。
- shadcn/ui の Data Table（`@tanstack/react-table` ベース）の `ColumnDef` / `getCoreRowModel` / `getSortedRowModel` / `getFilteredRowModel` / `getPaginationRowModel` 等のテーブルエンジンと `rowSelection` state は持たない。並べ替え・フィルタ・ページングの実処理はアプリが書き、結果を渡す契約。列定義配列からの一括描画も非採用。
- 自前 CSS の最小例: `[data-scope="data-table"][data-part="column-header"][data-sort="ascending"]::after { content: " ▲"; }`。
- `@ark-ui/react` の JS/TS API とは別物（Rust 製、`fandhe-frontend-headless-ui`）。また TanStack Table（`@tanstack/react-table`）のようなテーブルエンジンではない。

## Related

- [Checkbox](../form/checkbox.md)
- [Menu](../collections/menu.md)
- [Pagination](../collections/pagination.md)
- [Field](../form/field.md)
- [Data Table（Themes 版）](../../themes/data-display/data-table.md)
