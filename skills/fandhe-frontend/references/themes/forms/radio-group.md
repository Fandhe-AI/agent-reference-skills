# Radio Group

`fandhe_frontend_headless_ui::radio_group` の item / item-control / item-hidden-input / item-text / label / `RadioGroup` 状態機械をそのまま再エクスポートし、既定 CSS を追加提供する。

## Signature / Usage

```rust
use fandhe_frontend_pre_styled_ui::radio_group;
use fandhe_frontend_pre_styled_ui::{ColorPalette, Size};

let node = radio_group::root(Size::Md, ColorPalette::Accent, false, None, None, vec![], vec![]);
```

`root(size, palette, disabled, orientation: Option<Orientation>, labelled_by: Option<&str>, attrs, children) -> Node`。`stylesheet() -> String` が静的 CSS 全量を返す。`item`/`item_control`/`item_hidden_input`/`item_text`/`label`/`RadioGroup`/`DATA_STATE_CHECKED`/`DATA_STATE_UNCHECKED` は headless-ui からの再エクスポート。

## Anatomy

- `root` / `label` / `item`（`item-control`/`item-text`/`item-hidden-input` を内包）

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `size` | `Size`（既定 `Md`） | `root` へクラス付与 |
| `palette` | `ColorPalette`（既定 `Accent`） | checked 時の色 |
| `disabled` | `bool` | 全体の無効化 |
| `orientation` | `Option<Orientation>` | `data-orientation`/`aria-orientation` |
| `labelled_by` | `Option<&str>` | `aria-labelledby` |

## Notes

- ネイティブ `input[type="radio"]` で意味論を担う。`item-control` に重複した `aria-checked` を付与しない。
- `@chakra-ui/react` の JS/TS API とは別物（Rust 製）。

## Related

- [Radio Card](./radio-card.md)
- [Radio Group (primitives/form)](../../primitives/form/radio-group.md)
