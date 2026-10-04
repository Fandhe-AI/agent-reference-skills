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

フリー関数: `fieldset::root(props: &FieldsetProps, attrs, children)`, `legend(props, attrs, children)`, `legend_with_variant(variant: LegendVariant, props, attrs, children)`, `helper_text(props, attrs, children)`, `error_text(props, attrs, children)`。加えて `FieldsetProps::merge_field_props(field: FieldProps) -> FieldProps` はネストされた `Field` に `disabled` を OR で伝播する。

## Anatomy

- `root` — `<fieldset>`、HTML 仕様に従いネイティブ `disabled` がネストされたコントロールへ伝播する。`invalid` / `has_helper_text` に応じて `aria-describedby`（`invalid` なら error id を先頭に、続けて helper id を空白区切り）を出力
- `legend` — `<legend id="{id}-legend">`（`root` 内の先頭に配置必須。`aria-labelledby` 不要でネイティブにアクセシブルネームを提供する）。`legend_with_variant` は加えて `data-variant`（`LegendVariant::Legend` = `legend`（既定の大見出し）/ `LegendVariant::Label` = `label`（1 段小さい見出し））を固定出力し、呼び出し側 `attrs` の `data-variant` は除去される。通常の `legend` は `data-variant` を出力しない
- `helper-text` — `<span>`
- `error-text` — `<div role="alert" aria-live="polite">`、`invalid` でなければ `hidden`

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `FieldsetProps.id` | `&str` | `{id}-legend`/`{id}-helper-text`/`{id}-error-text` のベース id |
| `disabled` | `bool` | `root` にネイティブ `disabled` + `data-disabled` を発行する |
| `invalid` | `bool` | `data-invalid` を発行する。ネストされた `Field` の `aria-invalid` へは**伝播しない** |
| `has_helper_text` | `bool` | `aria-describedby` の構成に含まれる |

## Notes

- `disabled` / `invalid` は `root` / `legend` / `helper-text` / `error-text` に `data-disabled` / `data-invalid` として伝播する
- `merge_field_props` はネストされた `FieldProps` へ `disabled` のみを OR で伝播する（`invalid` は伝播しない）
- `@ark-ui/react` の JS/TS API とは別物（Rust 製、`fandhe-frontend-headless-ui`）

## Related

- [Field](./field.md)
