# Textarea

`fandhe_frontend_headless_ui::field` scope を共有する styled Textarea。単一パーツ `textarea` に `variant`/`size` クラスを付与し、`autoresize` フラグで自動リサイズ意図を伝える。

## Signature / Usage

```rust
use fandhe_frontend_pre_styled_ui::textarea::{self, TextareaProps};
use fandhe_frontend_headless_ui::field::FieldProps;

let node = textarea::textarea(&TextareaProps::default(), &FieldProps::default(), false, vec![], vec![]);
```

`css() -> String` が静的 CSS 全量を返す。`FieldIds`/`FieldProps` は headless-ui `field` からの再エクスポート。

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `TextareaProps.variant` | `TextareaVariant`（`Outline`（既定） \| `Subtle` \| 下線のみ variant、`InputVariant` と同じ語彙） | 見た目 |
| `TextareaProps.size` | `Size`（既定 `Md`） | サイズ |
| `autoresize` | `bool` | 自動リサイズを有効化するフラグ |

## Notes

- ネイティブ `<textarea>` の標準挙動を尊重する静的な複数行テキスト入力。
- `disabled`/`invalid`/`required`/`readonly` の状態管理は headless-ui の共有 `field` scope 経由（`crate::input`/`crate::native_select` と同型）。
- `@chakra-ui/react` の JS/TS API とは別物（Rust 製）。

## Related

- [Input](./input.md)
- [Field (primitives/form)](../../primitives/form/field.md)
