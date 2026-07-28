# Listbox

headless `listbox`（9 anatomy parts: root, label, content, item-group, item-group-label, item, item-text, item-indicator, value-text）を包む styled wrapper。[select](./select.md) と異なりリストは常時展開状態 — `trigger`/`positioner`/`hidden` パーツを持たない。

## Signature / Usage

```rust
use fandhe_frontend_pre_styled_ui::listbox::{self, OpenState};
use fandhe_frontend_pre_styled_ui::Size;

pub fn root<'a>(
    size: Size,
    selection_state: OpenState,
    disabled: bool,
    attrs: Vec<(&'a str, &'a str)>,
    children: Vec<Node>,
) -> Node

pub use fandhe_frontend_headless_ui::listbox::{
    content, item, item_group, item_group_label, item_indicator, item_text, label, value_text,
};

pub fn stylesheet() -> String
```

## Options / Props

| Name | Type | Description |
| --- | --- | --- |
| size | `Size` (`Sm` \| `Md` \| `Lg`) | root スコープの CSS custom property 経由で `item` の padding、`content` の `max-height`/padding を制御。既定値 `Md` |
| selection_state | `OpenState` | headless `root` へそのまま渡す |
| disabled | `bool` | true の場合 `root` を減光し `cursor: not-allowed` を設定 |

## Notes

- `content` 自身が実 DOM フォーカスを受ける（`input`/`trigger` ではない）ため、`:focus-visible` は `content` に登録される
- `item` の選択状態は `data-state="open"` を流用する。ハイライト（仮想フォーカス）は `data-highlighted`、無効化は `data-disabled` を使う
- `Listbox`/`MultiListbox` 状態機械と headless の自由関数 `root` は再エクスポートされない（エスケープハッチ: `fandhe_frontend_headless_ui::listbox::{Listbox, MultiListbox}`）
- `@ark-ui/react` の JS/TS API とは別物（Rust 製）

## Related

- [listbox (primitives)](../../primitives/collections/listbox.md)
- [select](./select.md)
