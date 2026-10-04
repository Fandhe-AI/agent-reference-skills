# Select

headless `select`（18 anatomy parts: root, label, control, trigger, value-text, clear-trigger, indicator, positioner, content, item-group, item-group-label, item, item-text, item-indicator, hidden-select, separator, scroll-up-button, scroll-down-button）を包む styled wrapper。ネイティブ `<select>` フォールバック（`hidden-select`）を視覚的に隠し、ポップアップリストボックスをスタイリングする。

## Signature / Usage

```rust
use fandhe_frontend_pre_styled_ui::select::{self, ItemIndicatorPlacement, OpenState, SelectProps, SelectVariant};
use fandhe_frontend_pre_styled_ui::{Shape, Size};

pub fn root<'a>(
    size: Size,
    state: OpenState,
    props: &SelectProps,
    attrs: Vec<(&'a str, &'a str)>,
    children: Vec<Node>,
) -> Node

// shape / variant / 選択インジケータ位置付き版。
// shape: None + Outline + End で root と完全に同じ出力
pub fn root_with<'a>(
    size: Size,
    shape: Option<Shape>,
    variant: SelectVariant,
    item_indicator_placement: ItemIndicatorPlacement,
    state: OpenState,
    props: &SelectProps,
    attrs: Vec<(&'a str, &'a str)>,
    children: Vec<Node>,
) -> Node

pub enum SelectVariant { Outline /* 既定 */, Subtle }
pub enum ItemIndicatorPlacement { End, Start } // Default 非実装

pub use fandhe_frontend_headless_ui::select::{
    clear_trigger, content, control, hidden_select, indicator, item, item_group, item_group_label,
    item_indicator, item_text, label, positioner, scroll_down_button, scroll_up_button, separator,
    trigger, value_text, SelectProps,
};

pub fn stylesheet() -> String
```

## Options / Props

| Name | Type | Description |
| --- | --- | --- |
| size | `Size` (`Sm` \| `Md` \| `Lg`) | root スコープの CSS custom property 経由で `trigger`/`item`/`content` の padding を制御。既定値 `Md` |
| state | `OpenState` | headless `root` へそのまま渡す |
| props | `&SelectProps` | headless 層の状態束をそのまま透過する。`disabled` / `readonly` / `invalid` / `required`（いずれも `bool`）。`required` は `label` に `data-required`、`hidden_select` にネイティブ `required` を付与する |
| shape | `Option<Shape>` (`Pill` \| `Circle`) | `root_with` のみ。`None`（`root` の既定）でクラス非付与 |
| variant | `SelectVariant` (`Outline` \| `Subtle`) | `root_with` のみ。`Outline`（既定）は枠線あり、`Subtle` は淡色背景・枠線なし |
| item_indicator_placement | `ItemIndicatorPlacement` (`End` \| `Start`) | `root_with` のみ。`End`（`root` の既定）は項目右端、`Start` は項目左端で非選択項目のテキスト開始位置と揃う |

## Notes

- `content` の `min-width` は menu の `10rem` と異なり `auto`（`--fandhe-reference-width`）にフォールバックする — Select の `content` は sameWidth 対応以前は固定 `min-width` を持っていなかった
- arrow パーツ/CSS は存在しない（`--fandhe-arrow-*` は一切消費されない）: `PositionedKind::has_arrow()` は Select を除外する
- `item` のハイライトは `data-highlighted`（仮想フォーカス、実 DOM フォーカスは `trigger` に留まる）を使う。`trigger` は `:focus-visible` を受け取る
- `Select` 状態機械と headless の自由関数 `root` は再エクスポートされない（エスケープハッチ: `fandhe_frontend_headless_ui::select::Select`）
- `@ark-ui/react` の JS/TS API とは別物（Rust 製）
- `@chakra-ui/react` の JS/TS API とは別物（Rust 製）。

## Related

- [select (primitives)](../../primitives/collections/select.md)
- [combobox](./combobox.md)
- [listbox](./listbox.md)
