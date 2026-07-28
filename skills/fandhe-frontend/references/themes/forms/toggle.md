# Toggle

`fandhe_frontend_headless_ui::toggle` の indicator パーツをそのまま再エクスポートし、既定 CSS を追加提供する。`size`/`palette` variant クラスは `root` にのみ付与する。

## Signature / Usage

```rust
use fandhe_frontend_pre_styled_ui::toggle;
use fandhe_frontend_pre_styled_ui::{ColorPalette, Size};

let node = toggle::root(Size::Md, ColorPalette::Accent, false, false, vec![], vec![]);
```

`root(size, palette, pressed, disabled, attrs, children) -> Node`。`stylesheet() -> String` が静的 CSS 全量を返す。`indicator`/`ToggleAction` は headless-ui からの再エクスポート。

## Anatomy

- `root`（`<button type="button">`）/ `indicator`（off 状態で非表示）

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `size` | `Size`（`Sm` \| `Md`（既定） \| `Lg`） | サイズ |
| `palette` | `ColorPalette`（既定 `Accent`） | pressed 時の色 |
| `pressed` | `bool` | `data-state`（`"on"`/`"off"`）・`data-pressed`・`aria-pressed` の源泉 |
| `disabled` | `bool` | `data-disabled` |

## Notes

- ネイティブ `<button>` を使うため、hidden input を使う `Switch`/`Checkbox` とは異なり Space/Enter キーはブラウザ標準挙動に委ねる。
- `@chakra-ui/react` の JS/TS API とは別物（Rust 製）。

## Related

- [Switch](./switch.md)
- [Toggle Group](./toggle-group.md)
- [Toggle (primitives/form)](../../primitives/form/toggle.md)
