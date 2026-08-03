# Combobox

headless `combobox`（14 anatomy parts: root, label, control, input, trigger, clear-trigger, positioner, content, item-group, item-group-label, item, item-text, item-indicator, live-region）を包む styled wrapper。[select](./select.md) と同じ設計（ARIA 1.2 combobox パターンの姉妹）に従う: `size` variant、`data-state` による open/closed スタイリング、`--fandhe-reference-width` 経由の `sameWidth` 風リストボックス。

## Signature / Usage

```rust
use fandhe_frontend_pre_styled_ui::combobox::{self, OpenState};
use fandhe_frontend_pre_styled_ui::Size;

pub fn root<'a>(
    size: Size,
    state: OpenState,
    attrs: Vec<(&'a str, &'a str)>,
    children: Vec<Node>,
) -> Node

pub use fandhe_frontend_headless_ui::combobox::{
    clear_trigger, content, control, filter_options, input, item, item_group, item_group_label,
    item_indicator, item_text, label, positioner, trigger,
};

pub fn stylesheet() -> String
```

## Options / Props

| Name | Type | Description |
| --- | --- | --- |
| size | `Size` (`Sm` \| `Md` \| `Lg`) | `root` の CSS custom property 経由で `control`/`input`/`item`/`content` の padding を制御。既定値 `Md` |
| state | `OpenState` | headless `root` へそのまま渡す |

## Notes

- [select](./select.md) と異なり実 DOM フォーカスは `trigger` ではなく `input` に留まる: `:focus-visible` は `input` に登録され、`item` のハイライトは `:focus-visible` ではなく `data-highlighted`（仮想フォーカス）を使う
- `content` の `min-width` は SSR でのレイアウトシフト回避のため menu/select の `10rem` とは異なり `auto` にフォールバックする
- `positioner` は `data-positioned` マーカーが存在する時、静的な `position: absolute` から `position: fixed`（ビューポート座標）に切り替わる
- `Combobox` 状態機械と headless の自由関数 `root` は再エクスポートされない（エスケープハッチ: `fandhe_frontend_headless_ui::combobox::Combobox`）
- headless 側の 14 番目のパーツ `live_region`（動的な状態変化を `role="status"` + `aria-live="polite"` + `aria-atomic="true"` で通知）は本 styled 層では意図的に再エクスポートしない。必要な場合は `fandhe_frontend_headless_ui::combobox::live_region` を直接 import する
- `@ark-ui/react` の JS/TS API とは別物（Rust 製）

## Related

- [combobox (primitives)](../../primitives/collections/combobox.md)
- [select](./select.md)
