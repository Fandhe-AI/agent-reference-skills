# Select

headless `select`（15 anatomy parts: root, label, control, trigger, value-text, clear-trigger, indicator, positioner, content, item-group, item-group-label, item, item-text, item-indicator, hidden-select）を包む styled wrapper。ネイティブ `<select>` フォールバック（`hidden-select`）を視覚的に隠し、ポップアップリストボックスをスタイリングする。

## Signature / Usage

```rust
use fandhe_frontend_pre_styled_ui::select::{self, OpenState};
use fandhe_frontend_pre_styled_ui::Size;

pub fn root<'a>(
    size: Size,
    state: OpenState,
    attrs: Vec<(&'a str, &'a str)>,
    children: Vec<Node>,
) -> Node

pub use fandhe_frontend_headless_ui::select::{
    clear_trigger, content, control, hidden_select, indicator, item, item_group, item_group_label,
    item_indicator, item_text, label, positioner, trigger, value_text,
};

pub fn stylesheet() -> String
```

## Options / Props

| Name | Type | Description |
| --- | --- | --- |
| size | `Size` (`Sm` \| `Md` \| `Lg`) | root スコープの CSS custom property 経由で `trigger`/`item`/`content` の padding を制御。既定値 `Md` |
| state | `OpenState` | headless `root` へそのまま渡す |

## Notes

- `content` の `min-width` は menu の `10rem` と異なり `auto`（`--fandhe-reference-width`）にフォールバックする — Select の `content` は sameWidth 対応以前は固定 `min-width` を持っていなかった
- arrow パーツ/CSS は存在しない（`--fandhe-arrow-*` は一切消費されない）: `PositionedKind::has_arrow()` は Select を除外する
- `item` のハイライトは `data-highlighted`（仮想フォーカス、実 DOM フォーカスは `trigger` に留まる）を使う。`trigger` は `:focus-visible` を受け取る
- `Select` 状態機械と headless の自由関数 `root` は再エクスポートされない（エスケープハッチ: `fandhe_frontend_headless_ui::select::Select`）
- `@ark-ui/react` の JS/TS API とは別物（Rust 製）

## Related

- [select (primitives)](../../primitives/collections/select.md)
- [combobox](./combobox.md)
- [listbox](./listbox.md)
