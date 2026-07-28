# Field

フォームコントロール（input/textarea/select）をラベル・ヘルパーテキスト・エラーテキストと結び付けるコンテナ。ステートレス（SSR 静的 props のみ、`Component`/`Hydrate` なし）。

## Signature / Usage

```rust
use fandhe_frontend_headless_ui::field::{self, FieldProps, FieldIds};

let props = FieldProps {
    id: "email",
    ids: FieldIds::default(),
    disabled: false,
    invalid: false,
    required: false,
    readonly: false,
    has_helper_text: true,
};

field::root(&props, vec![], vec![
    field::label(&props, vec![], vec![]),
    field::input(&props, vec![("type", "email")]),
    field::helper_text(&props, vec![], vec![]),
    field::error_text(&props, vec![], vec![]),
]);
```

フリー関数: `field::root(props: &FieldProps, attrs, children)`, `label`, `input(props, extra_attrs)`, `textarea(props, autoresize, extra_attrs, children)`, `select(props, extra_attrs, children)`, `helper_text`, `error_text`, `required_indicator`。

## Anatomy

- `root` — `<div>`
- `label` — `<label for="{id}-control">`
- `input` / `textarea` / `select` — 1 Field につき1コントロール（いずれか1つを選ぶ）
- `helper-text` — `<span>`
- `error-text` — `<span aria-live="polite">`、`invalid` でなければ `hidden`
- `required-indicator` — `<span aria-hidden="true">`、`required` でなければ `hidden`

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `FieldProps.id` | `&str` | ベース id。`{id}-control`/`{id}-label`/`{id}-helper-text`/`{id}-error-text` を導出する |
| `FieldProps.ids` | `FieldIds` | パート単位の id 上書き（すべて `None` なら既定の導出を使用） |
| `disabled` / `invalid` / `required` / `readonly` | `bool` | コントロールに `data-*` + ネイティブ属性として反映される |
| `has_helper_text` | `bool` | helper id を `aria-describedby` の構成に含める |

## Notes

- `aria-describedby` の構成規則: `invalid` → エラー id を先頭に、`has_helper_text` → helper id をスペース区切りで追加。どちらも該当しなければ丸ごと省略
- `select` はネイティブ `readonly` を発行しない（HTML 仕様上不正）。`data-readonly` は発行される
- `textarea` の `autoresize: bool` は `data-autoresize` を発行するのみ（宣言的なフック。実際のリサイズはクライアントランタイムの責務）
- `@ark-ui/react` の JS/TS API とは別物（Rust 製、`fandhe-frontend-headless-ui`）

## Related

- [Fieldset](./fieldset.md)
