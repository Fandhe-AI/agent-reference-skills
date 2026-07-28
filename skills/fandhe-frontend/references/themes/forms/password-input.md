# Password Input

`fandhe_frontend_headless_ui::password_input` の control / indicator / input / label / visibility-trigger パーツをそのまま再エクスポートし、既定 CSS を追加提供する。`size`/`palette` variant クラスは `root` にのみ付与する。

## Signature / Usage

```rust
use fandhe_frontend_pre_styled_ui::password_input::{self, PasswordInputProps};
use fandhe_frontend_pre_styled_ui::{ColorPalette, Size};

let node = password_input::root(Size::Md, ColorPalette::Accent, false, &PasswordInputProps::default(), vec![], vec![]);
```

`stylesheet() -> String` が静的 CSS 全量を返す。`control`/`indicator`/`input`/`label`/`visibility_trigger`/`PasswordAutocomplete`/`PasswordInputProps` は headless-ui からの再エクスポート。

## Anatomy

- `root` / `label` / `control`（`input`/`visibility-trigger` を内包）

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `size` | `Size`（既定 `Md`） | `root` へクラス付与 |
| `palette` | `ColorPalette`（既定 `Accent`） | 色 |
| `visible` | `bool` | 表示状態。`root`/`control`/`visibility-trigger` の `data-state`（`"visible"`/`"hidden"`）を決める |
| `PasswordInputProps` | struct | `disabled`/`invalid` 等（`data-disabled`/`data-invalid`、`aria-invalid`） |

## Notes

- `visibility-trigger` は `aria-pressed`/`aria-controls` で意味論を伝える。
- パスワード値自体は本コンポーネントが保持しない。
- `@chakra-ui/react` の JS/TS API とは別物（Rust 製）。

## Related

- [Input](./input.md)
- [Password Input (primitives/form)](../../primitives/form/password-input.md)
