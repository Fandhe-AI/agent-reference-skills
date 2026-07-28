# DataList

ラベル・値の組を一覧表示する静的 styled コンポーネント。`dl`/`dt`/`dd` の定義リスト意味論をそのまま尊重する。root/item/item-label/item-value の 4 パーツで構成し、コンビニ関数は提供しない。

## Signature / Usage

```rust
use fandhe_frontend_pre_styled_ui::data_list::{self, DataListProps};
use fandhe_frontend_core::text;

let node = data_list::root(
    DataListProps::default(),
    vec![],
    vec![data_list::item(
        vec![],
        vec![
            data_list::item_label(vec![], vec![text("Name")]),
            data_list::item_value(vec![], vec![text("Alice")]),
        ],
    )],
);
```

## Anatomy

```
root
  item
    item-label
    item-value
```

## Options / Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `root: orientation` | `DataListOrientation` (`Vertical`/`Horizontal`) | `Vertical` | ラベル・値の並び方向。`root` のみへクラス付与 |

## Notes

- `item` は `dl` の直下として許容される `<div>` を使う（`dt`/`dd` 以外の要素は使わない）。
- `item`/`item-label`/`item-value` への variant 伝搬は `root` の CSS custom property（`--fandhe-data-list-item-display` 等）の継承で行う。
- headless-ui 側に対応する anatomy は存在しない（pre-styled-ui 層のみで新規定義）。`role`/`aria-*` は付与しない。
- chakra-ui の `variant`（`subtle`/`bold`）・`size` はスコープ外。
- `@chakra-ui/react` の JS/TS API とは別物（Rust 製）。

## Related

- [Card](./card.md)
- [Stat](./stat.md)
- [Table](./table.md)
