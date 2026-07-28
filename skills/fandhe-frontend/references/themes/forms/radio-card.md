# Radio Card

chakra-ui `forms/radio-card` 相当のカード型選択 UI。`data-scope="radio-card"` の独自 anatomy を pre-styled 層で定義する（`radio-group` scope とは独立）。

## Signature / Usage

```rust
use fandhe_frontend_pre_styled_ui::radio_card;
use fandhe_frontend_pre_styled_ui::{ColorPalette, Size};

let node = radio_card::root(Size::Md, ColorPalette::Accent, false, None, None, vec![], vec![]);
```

`root(size, palette, disabled, orientation: Option<Orientation>, labelled_by: Option<&str>, attrs, children) -> Node`。`label(id: Option<&str>, attrs, children)`、`item(checked, disabled, value, attrs, children)`、`item_control(checked, disabled, attrs, children)`、`item_content(attrs, children)`、`item_text(attrs, children)`、`item_description(attrs, children)`、`item_addon(attrs, children)`、`item_indicator(checked, disabled, attrs)`、`item_hidden_input(checked, disabled, name: Option<&str>, value, attrs)`。`stylesheet() -> String` が静的 CSS 全量を返す。

## Anatomy

- `root`（`role="radiogroup"`）/ `label` / `item`（`item-control`/`item-content` を内包）
- `item-control`（`item-indicator` を内包）/ `item-indicator`（ラジオ円）
- `item-content`（`item-text`/`item-description`/`item-addon` を内包）
- `item-hidden-input`

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `size` | `Size`（既定 `Md`） | `root` へクラス付与 |
| `palette` | `ColorPalette`（既定 `Accent`） | checked 時の色 |
| `orientation` | `Option<Orientation>` | `data-orientation`/`aria-orientation` |
| `labelled_by` | `Option<&str>` | `aria-labelledby` |

## Notes

- `item_indicator` は `checkbox-card` の角丸四角ではなく円形（ラジオ）。
- `@chakra-ui/react` の JS/TS API とは別物（Rust 製）。

## Related

- [Radio Group](./radio-group.md)
