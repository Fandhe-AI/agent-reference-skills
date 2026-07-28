# Fieldset

複数の `Field` をグループ化するネイティブ `<fieldset>`/`<legend>` コンテナ。ステートレス（SSR 静的 props のみ）。

## Signature / Usage

```rust
use fandhe_frontend_headless_ui::fieldset::{self, FieldsetProps};

let props = FieldsetProps { id: "address", disabled: false, invalid: false, has_helper_text: false };

fieldset::root(&props, vec![], vec![
    fieldset::legend(&props, vec![], vec![]),
    // nested field::root(...) calls here
    fieldset::helper_text(&props, vec![], vec![]),
    fieldset::error_text(&props, vec![], vec![]),
]);
```

フリー関数: `fieldset::root(props: &FieldsetProps, attrs, children)`, `legend`, `helper_text`, `error_text`。加えて `FieldsetProps::merge_field_props(field: FieldProps) -> FieldProps` はネストされた `Field` に `disabled` を OR で伝播する。

## Anatomy

- `root` — `<fieldset>`、HTML 仕様に従いネイティブ `disabled` がネストされたコントロールへ伝播する
- `legend` — `<legend>`（`root` 内の先頭に配置必須。`aria-labelledby` 不要でネイティブにアクセシブルネームを提供する）
- `helper-text` — `<span>`
- `error-text` — `<span aria-live="polite">`、`invalid` でなければ `hidden`

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `FieldsetProps.id` | `&str` | `{id}-legend`/`{id}-helper-text`/`{id}-error-text` のベース id |
| `disabled` | `bool` | `root` にネイティブ `disabled` + `data-disabled` を発行する |
| `invalid` | `bool` | `data-invalid` を発行する。ネストされた `Field` の `aria-invalid` へは**伝播しない** |
| `has_helper_text` | `bool` | `aria-describedby` の構成に含まれる |

## Notes

- `merge_field_props` はネストされた `FieldProps` へ `disabled` のみを OR で伝播する（`invalid` は伝播しない）
- `@ark-ui/react` の JS/TS API とは別物（Rust 製、`fandhe-frontend-headless-ui`）

## Related

- [Field](./field.md)
