# Input

`fandhe_frontend_headless_ui::field` scope を共有する styled Input。単一パーツ `input` に `variant`/`size` クラスを付与し、アクセシビリティ配線は headless-ui の `field::select`（`FieldProps`/`FieldIds`）へ委譲する。

## Signature / Usage

```rust
use fandhe_frontend_pre_styled_ui::input::{self, InputProps};
use fandhe_frontend_headless_ui::field::FieldProps;

let node = input::input(&InputProps::default(), &FieldProps::default(), vec![]);
```

`css() -> String` が静的 CSS 全量を返す。`error_text`/`FieldIds`/`FieldProps` は headless-ui `field` からの再エクスポート。

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `InputProps.variant` | `InputVariant`（`Outline`（既定） \| `Subtle` \| 下線のみ variant） | 見た目 |
| `InputProps.size` | `Size`（既定 `Md`） | サイズ |
| `field.disabled` / `invalid` / `required` / `readonly` | `bool`（`FieldProps` 経由） | `data-disabled`/`data-invalid` 等を反映 |

## Notes

- ネイティブ `<input>` の標準挙動を変更しない。
- `disabled`/`invalid`/`required`/`readonly` の状態管理は headless-ui の共有 `field` scope 経由（`crate::native_select`/`crate::textarea` と同型）。
- `@chakra-ui/react` の JS/TS API とは別物（Rust 製）。

## Related

- [Field (primitives/form)](../../primitives/form/field.md)
- [Native Select](./native-select.md)
- [Textarea](./textarea.md)
