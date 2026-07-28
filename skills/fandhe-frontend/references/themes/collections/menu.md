# Menu

headless `menu`（11 anatomy parts: root, trigger, indicator, positioner, content, arrow, arrow-tip, item, item-group, item-group-label, separator）を包む styled wrapper。anchor positioning 駆動の arrow ジオメトリを含む既定 CSS を追加する。

## Signature / Usage

```rust
use fandhe_frontend_pre_styled_ui::menu::{self, OpenState};
use fandhe_frontend_pre_styled_ui::Size;

pub fn root<'a>(
    size: Size,
    state: OpenState,
    attrs: Vec<(&'a str, &'a str)>,
    children: Vec<Node>,
) -> Node

pub use fandhe_frontend_headless_ui::menu::{
    arrow, arrow_tip, checkbox_item, content, context_trigger, indicator, item, item_group,
    item_group_label, positioner, radio_item, radio_item_group, separator, trigger, trigger_item,
    MenuCheckboxItem, MenuRadioItemGroup,
};

pub fn stylesheet() -> String
```

## Options / Props

| Name | Type | Description |
| --- | --- | --- |
| size | `Size` (`Sm` \| `Md` \| `Lg`) | root スコープの CSS custom property 経由で `trigger`/`item`/`content` の padding を制御。既定値 `Md` |
| state | `OpenState` | headless `root` へそのまま渡す |

## Notes

- `content` の `min-width` は（`--fandhe-reference-width` 経由で）`10rem` にフォールバックする。`positioner` は `data-positioned` が存在する時 `position: fixed`（ビューポート座標、`--fandhe-x`/`--fandhe-y`）に切り替わる。`arrow` は `--fandhe-arrow-x`/`-y` を消費する
- `item` のハイライトは `data-highlighted`（仮想フォーカス、実 DOM フォーカスは `trigger` に留まる）を使う。`trigger` は `:focus-visible` を受け取る
- `Menu` 状態機械と headless の自由関数 `root` は再エクスポートされない（エスケープハッチ: `fandhe_frontend_headless_ui::menu::Menu`）。`MenuCheckboxItem`/`MenuRadioItemGroup` はそのまま再エクスポートされる
- `@ark-ui/react` の JS/TS API とは別物（Rust 製）

## Related

- [menu (primitives)](../../primitives/collections/menu.md)
- [menubar](./menubar.md)
