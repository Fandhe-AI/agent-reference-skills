# Native Select

`fandhe_frontend_headless_ui::field` scope を共有する styled NativeSelect。単一パーツ `select` に `variant`/`size` クラスを付与し、ネイティブ `<select>` を組み立てる。`Input`/`Textarea` と異なり、枠なしの `Plain` variant を持つ。

## Signature / Usage

```rust
use fandhe_frontend_pre_styled_ui::native_select::{self, NativeSelectProps};
use fandhe_frontend_headless_ui::field::FieldProps;

let node = native_select::native_select(&NativeSelectProps::default(), &FieldProps::default(), vec![], vec![]);
```

`css() -> String` が静的 CSS 全量を返す。`FieldIds`/`FieldProps` は headless-ui `field` からの再エクスポート。

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `NativeSelectProps.variant` | `NativeSelectVariant`（`Outline`（既定） \| `Subtle` \| `Plain`） | 見た目 |
| `NativeSelectProps.size` | `Size`（既定 `Md`） | サイズ |

## Notes

- キーボード操作（矢印キーでの選択肢移動）はネイティブ `<select>` の標準挙動に委ねる。
- `Plain` は枠・背景なしの最小サブセット variant（`InputVariant`/`TextareaVariant` の下線 variant とは異なる）。
- `@chakra-ui/react` の JS/TS API とは別物（Rust 製）。

## Related

- [Field (primitives/form)](../../primitives/form/field.md)
- [Input](./input.md)
