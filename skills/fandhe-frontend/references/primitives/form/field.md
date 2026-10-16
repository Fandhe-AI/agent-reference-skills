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

型付き autocomplete（passkey ログインのユーザー名欄 `username webauthn`）:

```rust
use fandhe_frontend_headless_ui::{AutocompleteField, AutocompleteToken};

let token = AutocompleteToken::new(AutocompleteField::Username).with_webauthn();
field::input_with_autocomplete(&props, token, vec![("type", "text"), ("name", "username")]);
```

フリー関数: `field::root(props: &FieldProps, attrs, children)`, `label(props, attrs, children)`, `input(props, extra_attrs)`, `input_with_autocomplete(props, autocomplete, extra_attrs)`, `textarea(props, autoresize, extra_attrs, children)`, `select(props, extra_attrs, children)`, `helper_text(props, attrs, children)`, `error_text(props, attrs, children)`, `required_indicator(props, attrs, children)`, `group(attrs, children)`, `content(props, attrs, children)`, `title(props, attrs, children)`, `separator(attrs, content)`。

## Anatomy

- `root` — `<div>`（`FieldIds.root` が `Some` のときのみ `id`）
- `label` — `<label for="{id}-control" id="{id}-label">`
- `input` / `textarea` / `select` — 1 Field につき1コントロール（いずれか1つを選ぶ）
- `helper-text` — `<span>`
- `error-text` — `<div role="alert" aria-live="polite">`、`invalid` でなければ `hidden`（複数メッセージを `<ul>` で渡せるよう `div`）
- `required-indicator` — `<span aria-hidden="true">`、`required` でなければ `hidden`
- `group` — `<div role="group">`、複数の `root` を束ねる外側コンテナ（`FieldProps` を取らず data-* を出さない）
- `content` — `<div>`、`root` 内で見出しと `helper-text` を縦に束ねる列（4 フラグの data-* を伝播）
- `title` — `<div>`、`<label for>` を結び付けられない場面での `label` の代替（`for` / `id` を自動導出しない。呼び出し側が `attrs` で `id` を渡し、コントロールへ `aria-labelledby` で結び付ける）
- `separator` — `<div>` ラッパー。内部に `separator-line`（`<hr role="separator" aria-orientation="horizontal">`）を置き、`content` が空でないときのみ `separator-content`（`<span>`）を続ける

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `FieldProps.id` | `&str` | ベース id。`{id}-control`/`{id}-label`/`{id}-helper-text`/`{id}-error-text` を導出する |
| `FieldProps.ids` | `FieldIds` | パート単位の id 上書き（`root` / `control` / `label` / `helper_text` / `error_text`、すべて `None` なら既定の導出を使用。`for` / `aria-describedby` にも一貫伝播） |
| `disabled` / `invalid` / `required` / `readonly` | `bool` | コントロールに `data-*` + ネイティブ属性として反映される |
| `has_helper_text` | `bool` | helper id を `aria-describedby` の構成に含める |
| `field::input_with_autocomplete<'a>(props: &FieldProps<'_>, autocomplete: AutocompleteToken, extra_attrs: Vec<(&'a str, &'a str)>) -> Node` | fn | `autocomplete` を固定語彙の `AutocompleteToken` で指定する `input`。`extra_attrs` の `autocomplete` は大文字小文字を区別せず除去され、型付きの値が 1 個だけ出力される |

## Notes

- 型付き autocomplete: `input_with_autocomplete` に `AutocompleteToken::new(AutocompleteField::Username).with_webauthn()` を渡すと passkey ログインのユーザー名欄として `username webauthn` を出力する。`email` も指定できる（`email webauthn` は文法上は有効だが通常は使わない）。語彙には単独の `off`（`AutocompleteToken::off()`）と `one-time-code` も含まれ、どちらも `webauthn` とは併用できない
- `AutocompleteToken` は固定語彙で任意の文字列を受け付けない（属性値に意図しない文字列が混ざる経路を型で閉じるため）。既存の `input` と `extra_attrs` の生文字列経路は互換のために残っているが、新規コードでは型付きの経路を使う。パスワード欄側の指定は [Password Input](./password-input.md) を参照
- `aria-describedby` の構成規則: `invalid` → エラー id を先頭に、`has_helper_text` → helper id をスペース区切りで追加。どちらも該当しなければ丸ごと省略
- `disabled` / `invalid` / `required` / `readonly` は `root` / `label` / コントロール / `helper-text` / `error-text` / `required-indicator` / `content` / `title` に `data-disabled` / `data-invalid` / `data-required` / `data-readonly` として伝播する（`group` / `separator` は伝播しない）
- `error_text` の `role="alert"` は明示 `aria-live="polite"` と併用する（読み上げの割り込み度合いは polite のまま）
- `select` はネイティブ `readonly` を発行しない（HTML 仕様上不正）。`data-readonly` は発行される
- `textarea` の `autoresize: bool` は `data-autoresize` を発行するのみ（宣言的なフック。実際のリサイズはクライアントランタイムの責務）
- `@ark-ui/react` の JS/TS API とは別物（Rust 製、`fandhe-frontend-headless-ui`）

## Related

- [Fieldset](./fieldset.md)
