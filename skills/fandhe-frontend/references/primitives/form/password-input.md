# Password Input

表示/非表示切り替えの状態機械を持つパスワードフィールド。真偽値の `visible` フラグのみを保持し、パスワードの値そのものは決して保持しない（`input` に `value` パラメータは存在しない）。

## Signature / Usage

```rust
use fandhe_frontend_headless_ui::password_input::{self, PasswordInput, PasswordInputProps, PasswordAutocomplete};

let props = PasswordInputProps {
    id: "login-password",
    disabled: false,
    readonly: false,
    invalid: false,
    required: false,
    autocomplete: PasswordAutocomplete::CurrentPassword,
};
let pw = PasswordInput::new(false);

pw.root(&props, vec![], vec![
    pw.control(&props, vec![], vec![
        pw.input(&props, vec![]),
        pw.visibility_trigger(&props, vec![], vec![]),
        pw.indicator(&props, vec![], vec![]),
    ]),
]);
```

型付き autocomplete と passkey（`current-password webauthn`）:

```rust
let token = PasswordAutocomplete::CurrentPassword.with_webauthn();
password_input::input_with_autocomplete(false, &props, token, vec![]);
```

フリー関数: `password_input::root(visible, props: &PasswordInputProps, attrs, children)`, `label(props, attrs, children)`, `control(visible, props, attrs, children)`, `input(visible, props, attrs)`, `input_with_autocomplete(visible, props, autocomplete, attrs)`, `visibility_trigger(visible, props, attrs, children)`, `indicator(visible, props, attrs, children)`。`PasswordInput` のメソッドは `visible` を自動注入する（`label` の利便メソッドは無い）。

## Anatomy

- `root`（`<div>`）, `label`（`for="{id}-input"`）, `control`（`<div>`）
- `input` — `<input type="password"|"text">`（型は `visible` から導出され、`value` 属性へ到達する経路は存在しない）。`autocapitalize="off"` / `spellcheck="false"` を固定付与
- `visibility-trigger` — `<button type="button" aria-pressed aria-controls>`（`aria-label` は呼び出し側が `attrs` で付与。`tabindex` は付与せず tab 順序に残す）
- `indicator` — `<span aria-hidden="true">`、装飾用

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `PasswordInputProps.id` | `&str` | `input` の id を `{id}-input` として導出する（`label` の `for`、`visibility_trigger` の `aria-controls` にも伝播） |
| `disabled` | `bool` | `input` / `visibility_trigger` にネイティブ `disabled` と `data-disabled`（他パーツは `data-disabled`） |
| `readonly` | `bool` | `input` にネイティブ `readonly`、全 6 パーツに `data-readonly`。`visibility_trigger` にネイティブ `disabled` は付与しない（表示確認を封じない） |
| `invalid` | `bool` | `data-invalid`、`input` に `aria-invalid="true"` |
| `required` | `bool` | `input` にネイティブ `required` と `data-required` |
| `autocomplete` | `PasswordAutocomplete`（`CurrentPassword` \| `NewPassword`） | 固定語彙の `autocomplete` 値（自由文字列は注入不可）。`webauthn` 付きの variant は保持できない（`PasswordAutocomplete::with_webauthn` で `AutocompleteToken` を作り `input_with_autocomplete` へ渡す） |
| `password_input::input_with_autocomplete(visible: bool, props: &PasswordInputProps<'_>, autocomplete: AutocompleteToken, attrs: Vec<(&str, &str)>) -> Node` | fn | `input` の `autocomplete` を固定語彙の `AutocompleteToken` で指定する。引数のトークンが `props.autocomplete` より優先される |
| `PasswordAutocomplete::with_webauthn(self) -> AutocompleteToken` | `const fn` | `CurrentPassword` / `NewPassword` から `webauthn` 付きトークン（`current-password webauthn` 等）を作る |

## Data Attributes

| Part | Attribute | Values |
| --- | --- | --- |
| root / control / input / visibility-trigger / indicator | `data-state` | `visible` \| `hidden` |
| root / label / control / input / visibility-trigger / indicator | `data-disabled` / `data-readonly` | 存在属性（対応する props が `true` のとき） |
| root / label / control / input / indicator | `data-invalid` | 存在属性（`invalid=true` のとき。`visibility-trigger` には出力しない） |
| input | `data-required` | 存在属性（`required=true` のとき） |

## Notes

- 型付き autocomplete と passkey: passkey のフォーム自動入力（WebAuthn の conditional mediation）を使うログインフォームでは、パスワード欄の `autocomplete` を `current-password webauthn` にする。`PasswordAutocomplete::CurrentPassword.with_webauthn()` で作る `AutocompleteToken` を `input_with_autocomplete` へ渡す。ユーザー名欄は [Field](./field.md) の `input_with_autocomplete` で `username webauthn` にする。`new-password webauthn` は文法上は有効だが通常は使わない
- `input_with_autocomplete` の中では `props.autocomplete` は無視され、引数のトークンが優先される。password 系以外の field（`Username` / `Email`）と `off` / `one-time-code` を渡した場合は `props.autocomplete` に戻る（fail-safe。password 欄の保護設定を型付き API で外させない）。`attrs` に `autocomplete` を渡しても除去される
- `AutocompleteToken` は固定語彙で、出力は組み合わせごとの静的リテラルだけ。任意の文字列を受け付ける公開コンストラクタはなく、`webauthn` だけを置く・`on` / `off` と併用する・先頭に置くといった無効な並びも表現できない。`navigator.credentials.get` の呼び出しなど WebAuthn 本体の処理はアプリ側の責務で、本部品は属性を出力するだけ
- 表示切替トリガーは ark-ui の `aria-expanded` + `tabIndex: -1` ではなく、トグルボタンパターンの `aria-pressed` を採用し、tab 順序に残す
- click → dispatch 配線、フォーム送信後の hidden リセット等の DOM 配線はクライアント層の責務
- 呼び出し側 `attrs` による固定属性の上書きは除去される

- ディスパッチアクション: `"show"`, `"hide"`, `"toggle"`
- `data-state` の語彙は `"visible"`/`"hidden"`（`Checkable` の `"checked"`/`"unchecked"` とは異なるため、専用の状態機械を持つ）
- `@ark-ui/react` の JS/TS API とは別物（Rust 製、`fandhe-frontend-headless-ui`）

## Related

- [Field](./field.md)
