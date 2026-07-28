# Rating Group

`fandhe_frontend_headless_ui::rating_group` の control / hidden-input / item / label / `RatingGroup` 状態機械をそのまま再エクスポートし、既定 CSS を追加提供する。

## Signature / Usage

```rust
use fandhe_frontend_pre_styled_ui::rating_group;
use fandhe_frontend_pre_styled_ui::{ColorPalette, Size};

let node = rating_group::root(Size::Md, ColorPalette::Accent, false, false, vec![], vec![]);
```

`root(size, palette, disabled, readonly, attrs, children) -> Node`。`stylesheet() -> String` が静的 CSS 全量を返す。`control`/`item`/`hidden_input`/`label`/`RatingGroupAction`/`RatingItemFlags` は headless-ui からの再エクスポート。

## Anatomy

- `root` / `label` / `control`（`item` を複数内包）/ `hidden-input`

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `size` | `Size`（既定 `Md`） | `root` へクラス付与 |
| `palette` | `ColorPalette`（既定 `Accent`） | 選択済み `item` の色 |
| `disabled` | `bool` | `data-disabled` |
| `readonly` | `bool` | `data-readonly` |

## Notes

- `item` は `data-value`（1〜5 等）/ `data-checked` / `data-highlighted`（ホバープレビュー）を反映する。
- `@chakra-ui/react` の JS/TS API とは別物（Rust 製）。

## Related

- [Radio Group](./radio-group.md)
- [Rating Group (primitives/form)](../../primitives/form/rating-group.md)
