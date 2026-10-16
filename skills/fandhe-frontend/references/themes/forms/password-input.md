# Password Input

`fandhe_frontend_headless_ui::password_input` の control / indicator / input / label / visibility-trigger パーツをそのまま再エクスポートし、既定 CSS を追加提供する。`size`/`palette` variant クラスは `root` にのみ付与する。

## Signature / Usage

```rust
use fandhe_frontend_pre_styled_ui::password_input::{self, PasswordAutocomplete, PasswordInputProps};
use fandhe_frontend_pre_styled_ui::{ColorPalette, Size};

let props = PasswordInputProps {
    id: "password",
    disabled: false,
    readonly: false,
    invalid: false,
    required: false,
    autocomplete: PasswordAutocomplete::CurrentPassword,
};
let node = password_input::root(Size::Md, ColorPalette::Accent, false, &props, vec![], vec![]);
```

`stylesheet() -> String` が静的 CSS 全量を返す。`control`/`indicator`/`input`/`label`/`visibility_trigger`/`PasswordAutocomplete`/`PasswordInputProps` は headless-ui からの再エクスポート。型付き autocomplete 用の `input_with_autocomplete` / `AutocompleteToken` / `AutocompleteField` も headless-ui からの透過再エクスポート（#3817）。

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
- `password_input` mod からも `input_with_autocomplete` と `AutocompleteToken` / `AutocompleteField` を使えるため、pre-styled-ui のパスだけで `PasswordAutocomplete::CurrentPassword.with_webauthn()` を渡して `current-password webauthn` を指定できる。出力は固定語彙の静的リテラルに限られ、任意の文字列は受け付けない。passkey での使いどころとユーザー名欄との組み合わせは Password Input（primitives）を参照。
- `@chakra-ui/react` の JS/TS API とは別物（Rust 製）。

## Related

- [Input](./input.md)
- [Password Input (primitives/form)](../../primitives/form/password-input.md)
