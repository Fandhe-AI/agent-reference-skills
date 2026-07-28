# Switch

`fandhe_frontend_headless_ui::switch` の control / hidden-input / label / thumb パーツをそのまま再エクスポートし、既定 CSS を追加提供する。`size`/`palette` variant クラスは `root` にのみ付与する。

## Signature / Usage

```rust
use fandhe_frontend_pre_styled_ui::switch;
use fandhe_frontend_pre_styled_ui::{ColorPalette, Size};

let node = switch::root(Size::Md, ColorPalette::Accent, false, false, vec![], vec![]);
```

`root(size, palette, checked, disabled, attrs, children) -> Node`。`stylesheet() -> String` が静的 CSS 全量を返す。`control`/`thumb`/`hidden_input`/`label`/`SwitchAction` は headless-ui からの再エクスポート。

## Anatomy

- `root` / `hidden-input` / `control`（`thumb` を内包）/ `label`

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `size` | `Size`（`Sm` \| `Md`（既定） \| `Lg`） | トラック/thumb 寸法 |
| `palette` | `ColorPalette`（既定 `Accent`） | checked 時の色 |
| `checked` | `bool` | `data-state`（`"checked"`/`"unchecked"`）の源泉 |
| `disabled` | `bool` | `control`/`root` へ `data-disabled` |

## Notes

- `control`/`thumb` は `aria-hidden` を固定し、支援技術への二重announcement を防ぐ。ネイティブ `input[type="checkbox"][role="switch"]`（`hidden-input`）が意味論を担う。
- `@chakra-ui/react` の JS/TS API とは別物（Rust 製）。

## Related

- [Checkbox](./checkbox.md)
- [Toggle](./toggle.md)
- [Switch (primitives/form)](../../primitives/form/switch.md)
