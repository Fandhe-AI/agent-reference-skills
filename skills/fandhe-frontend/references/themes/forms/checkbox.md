# Checkbox

`fandhe_frontend_headless_ui::checkbox` の root / control / indicator / label / hidden-input 5 anatomy パーツへ既定 CSS を対応付ける薄い委譲層。`size`/`palette` variant クラス付与のため `root` のみ独自定義する。

## Signature / Usage

```rust
use fandhe_frontend_pre_styled_ui::checkbox::{self, CheckboxProps};
use fandhe_frontend_pre_styled_ui::{ColorPalette, Size};

let node = checkbox::root(Size::Md, ColorPalette::Accent, &CheckboxProps::default(), vec![], vec![]);
```

`stylesheet() -> String` が静的 CSS 全量を返す。`control`/`indicator`/`label`/`hidden_input` は headless-ui からそのまま再エクスポート。

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `size` | `Size`（既定 `Md`） | `control`/`indicator`/`label` の寸法を custom property 経由で切り替え |
| `palette` | `ColorPalette`（既定 `Accent`） | checked/indeterminate 時の色 |
| `CheckboxProps.checked` | `CheckedState`（`Unchecked` \| `Checked` \| `Indeterminate`） | `data-state`/`aria-checked` の源泉 |
| `CheckboxProps.disabled` / `invalid` / `required` / `readonly` | `bool` | `data-*` と native attributes を反映 |

## Notes

- `indicator` の base に `display` 宣言を置かない（`hidden` 属性による UA 既定表示制御を CSS が壊さない設計）。
- `hidden-input` は `display: none` ではなく visually-hidden パターンで視覚的にのみ非表示化する。
- 状態機械 `Checkbox`（headless-ui）は再エクスポートしない。hydration が必要な場合は `fandhe_frontend_headless_ui::checkbox::Checkbox` を直接 import する。
- `@chakra-ui/react` の JS/TS API とは別物（Rust 製）。

## Related

- [Checkbox (primitives/form)](../../primitives/form/checkbox.md)
- [Checkbox Card](./checkbox-card.md)
- [Checkbox Group](./checkbox-group.md)
