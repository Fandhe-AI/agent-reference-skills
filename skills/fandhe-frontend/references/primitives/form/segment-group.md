# Segment Group

スライドする `indicator` パートを持つラジオ形式のセグメントセレクター。

## Signature / Usage

```rust
use fandhe_frontend_headless_ui::segment_group::{self, SegmentGroup, SegmentGroupProps};

let group = SegmentGroup::default();
let props = SegmentGroupProps::default();
let values = ["day", "week", "month"];

segment_group::root(&props, None, None, vec![], vec![
    group.item("day", &props, vec![], vec![
        group.item_control("day", &props, vec![]),
        group.item_text("day", &props, vec![], vec![]),
        group.item_hidden_input("day", &props, Some("range"), vec![]),
    ]),
    group.indicator(&values, &props, None, vec![]),
]);
```

フリー関数: `segment_group::root(props: &SegmentGroupProps, orientation: Option<Orientation>, labelled_by: Option<&str>, attrs, children)`, `indicator(position: Option<(usize, usize)>, props, orientation, attrs)`, `item(checked, props, value, attrs, children)`, `item_control(checked, props, attrs)`, `item_text(checked, props, attrs, children)`, `item_hidden_input(checked, props, name: Option<&str>, value, attrs)`。`root` は状態非依存のため `SegmentGroup` に利便メソッドは無い。

## Anatomy

- `root` — `<div role="radiogroup">`
- `item` / `item-control` / `item-text` / `item-hidden-input` — `radio_group` と同形（`item-control` は `aria-hidden="true"`）
- `indicator` — `<span aria-hidden="true">`、CSS カスタムプロパティ `--fandhe-segment-group-index` / `--fandhe-segment-group-count` で位置決めされる（選択中のみ `style` に出力。`data-state` は選択有無で `checked` / `unchecked`）

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `SegmentGroup::value()` | `Option<&str>` | |
| `indicator_position(values: &[&str])` | `Option<(usize, usize)>` | `indicator` の CSS カスタムプロパティを導出するための `(index, count)` |
| `SegmentGroupProps.disabled` | `bool`（既定 `false`） | `data-disabled`（root / indicator / item 系）、`root` に `aria-disabled="true"`、`item_hidden_input` にネイティブ `disabled` |
| `SegmentGroupProps.readonly` | `bool`（既定 `false`） | `item` / `item_control` / `item_text` に `data-readonly`、`root` に `aria-readonly="true"`（ネイティブ `readonly` は付与しない） |
| `SegmentGroupProps.invalid` | `bool`（既定 `false`） | `data-invalid`（root / item 系）、`item_hidden_input` に `aria-invalid="true"` |
| `SegmentGroupProps.required` | `bool`（既定 `false`） | `data-required`（root）、`root` に `aria-required="true"`、`item_hidden_input` にネイティブ `required` |
| `indicator.orientation` | `Option<Orientation>` | `Some` のとき `data-orientation` を出力（`root` の `orientation` は `data-orientation` / `aria-orientation`） |

## Notes

- 呼び出し側 `attrs` による固定属性（状態系 `data-*`、`root` の `role` / `aria-*`、`indicator` の `aria-hidden` / `style` 等）の上書きは除去される
- `readonly` による選択変更の抑止配線は無い（クライアント層の segment-group 配線は未提供）。矢印キー操作はネイティブ radio の標準動作に委ねる

- `radio_group` の兄弟。主にスライドする `indicator` パートが追加されている点が異なる
- `@ark-ui/react` の JS/TS API とは別物（Rust 製、`fandhe-frontend-headless-ui`）

## Related

- [Radio Group](./radio-group.md)
- [Toggle Group](./toggle-group.md)
