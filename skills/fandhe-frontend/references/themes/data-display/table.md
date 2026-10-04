# Table

表形式データを表示する静的 styled コンポーネント。root/header/body/footer/row/column-header/row-header/cell/caption/scroll-area の 10 パーツで `table`/`thead`/`tbody`/`tfoot`/`tr`/`th`/`td`/`caption` の HTML 意味論をそのまま尊重する。コンビニ関数は提供しない。

## Signature / Usage

```rust
use fandhe_frontend_pre_styled_ui::table::{self, TableProps};
use fandhe_frontend_core::text;

let node = table::root(
    TableProps::default(),
    vec![],
    vec![
        table::caption(vec![], vec![text("Users")]),
        table::header(vec![], vec![table::row(vec![], vec![table::column_header(vec![], vec![text("Name")])])]),
        table::body(vec![], vec![table::row(vec![], vec![table::cell(vec![], vec![text("Alice")])])]),
    ],
);
```

## Options / Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `root: variant` | `TableVariant` (`Line`/`Outline`) | `Line` | 行区切り線 or 外枠+角丸 |
| `root: size` | `Size` | `Md` | セルの padding・font-size |
| `root: striped` | `bool` | `false` | 縞模様表示（`tbody` 内の偶数行に適用） |
| `root: sticky_header` | `bool` | `false` | `column-header`（`th`）を `position: sticky; top: 0` にする |
| `root: interactive` | `bool` | `false` | `row`（`data-selected` を除く）の hover で `bg-muted` にする |

`root(props: TableProps, attrs, children) -> Node`。`header`/`body`/`footer`/`row`/`column_header`/`row_header`/`cell`/`caption`/`scroll_area` は `(attrs, children) -> Node`。`css() -> String` が静的 CSS 全量を返す。

## Notes

- `column_header` は `scope="col"`、`row_header`（`<th scope="row">`）は `scope="row"` を固定付与し、呼び出し側 `attrs` の `scope` 偽装は除去する（fail-closed）。
- `scroll_area`（`<div>`、chakra `Table.ScrollArea` 相当）は pre-styled-ui 専用のスクロール枠で、呼び出し側が `root` を子として渡す。`--fandhe-table-scroll-max-height` 等を `style` で渡せる。
- `border-collapse: separate` を採用（`Outline` variant の `border-radius` を有効にするため）。Line variant の行区切り線は `row` ではなく `cell`/`column-header` 側に持たせる（`separate` モデルでは `tr` への border は描画されない）。
- `caption` は HTML 仕様上 `table` の最初の子として置く必要がある（本関数は順序を強制しない）。
- headless-ui 側に対応する anatomy は存在しない（pre-styled-ui 層のみで新規定義）。`showColumnBorder`・`ColumnGroup` はスコープ外。
- `@chakra-ui/react` の JS/TS API とは別物（Rust 製）。

## Related

- [Card](./card.md)
- [Data List](./data-list.md)
