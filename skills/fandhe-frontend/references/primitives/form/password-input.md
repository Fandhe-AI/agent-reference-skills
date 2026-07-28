# Password Input

表示/非表示切り替えの状態機械を持つパスワードフィールド。真偽値の `visible` フラグのみを保持し、パスワードの値そのものは決して保持しない（`input` に `value` パラメータは存在しない）。

## Signature / Usage

```rust
use fandhe_frontend_headless_ui::password_input::{self, PasswordInput, PasswordInputProps, PasswordAutocomplete};

let props = PasswordInputProps {
    id: "login-password",
    disabled: false,
    invalid: false,
    required: false,
    autocomplete: PasswordAutocomplete::CurrentPassword,
};
let pw = PasswordInput::new(false);

pw.root(&props, vec![], vec![
    pw.control(&props, vec![
        pw.input(&props, vec![]),
        pw.visibility_trigger(&props, vec![], vec![]),
    ]),
    pw.indicator(vec![], vec![]),
]);
```

フリー関数: `password_input::root(visible, props: &PasswordInputProps, attrs, children)`, `label(props, attrs, children)`, `control(visible, props, attrs, children)`, `input(visible, props, attrs)`, `visibility_trigger(visible, props, attrs, children)`, `indicator(visible, attrs, children)`。

## Anatomy

- `root`, `label`（`for="{id}-input"`）, `control`
- `input` — `<input type="password"|"text">`（型は `visible` から導出され、`value` 属性へ到達する経路は存在しない）
- `visibility-trigger` — `<button type="button" aria-pressed aria-controls>`
- `indicator` — `<span aria-hidden="true">`、装飾用

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `PasswordInputProps.id` | `&str` | `input` の id を `{id}-input` として導出する |
| `disabled` / `invalid` / `required` | `bool` | `data-*` + ネイティブ属性として反映される |
| `autocomplete` | `PasswordAutocomplete`（`CurrentPassword` \| `NewPassword`） | 固定語彙の `autocomplete` 値（自由文字列は注入不可） |

## Notes

- ディスパッチアクション: `"show"`, `"hide"`, `"toggle"`
- `data-state` の語彙は `"visible"`/`"hidden"`（`Checkable` の `"checked"`/`"unchecked"` とは異なるため、専用の状態機械を持つ）
- `@ark-ui/react` の JS/TS API とは別物（Rust 製、`fandhe-frontend-headless-ui`）

## Related

- [Field](./field.md)
