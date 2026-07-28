# Segment Group

スライドする `indicator` パートを持つラジオ形式のセグメントセレクター。

## Signature / Usage

```rust
use fandhe_frontend_headless_ui::segment_group::{self, SegmentGroup};

let group = SegmentGroup::default();
let values = ["day", "week", "month"];

group.root(false, None, None, vec![
    group.item("day", false, vec![], vec![
        group.item_control("day", false, vec![]),
        group.item_text("day", false, vec![], vec![]),
        group.item_hidden_input("day", false, vec![]),
    ]),
    group.indicator(&values, vec![]),
]);
```

フリー関数: `segment_group::root(disabled, orientation: Option<Orientation>, labelled_by, attrs, children)`, `indicator(position: Option<(usize, usize)>, orientation, attrs)`, `item(checked, disabled, value, attrs, children)`, `item_control(checked, disabled, attrs)`, `item_text(checked, disabled, attrs, children)`, `item_hidden_input(checked, disabled, name, value, attrs)`。

## Anatomy

- `root` — `<div>`
- `item` / `item-control` / `item-text` / `item-hidden-input` — `radio_group` と同形
- `indicator` — `<div>`、CSS カスタムプロパティ `--fandhe-segment-group-index` / `--fandhe-segment-group-count` で位置決めされる

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `SegmentGroup::value()` | `Option<&str>` | |
| `indicator_position(values: &[&str])` | `Option<(usize, usize)>` | `indicator` の CSS カスタムプロパティを導出するための `(index, count)` |

## Notes

- `radio_group` の兄弟。主にスライドする `indicator` パートが追加されている点が異なる
- `@ark-ui/react` の JS/TS API とは別物（Rust 製、`fandhe-frontend-headless-ui`）

## Related

- [Radio Group](./radio-group.md)
- [Toggle Group](./toggle-group.md)
