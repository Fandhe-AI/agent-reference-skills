# Auth（Application Blocks）

サインイン・サインアップ・OTP 確認・OAuth 同意の画面（`login-*` / `signup-*` は shadcn/ui Blocks 相当を含む）の合成例 10 件。Blocks は新規 API ではなく既存の Themes / Primitives / core 部品の合成例で、各 block の公開物は未公開 crate `docs-site` 内部の `pub fn demo() -> Node` と `pub const BLOCK: Block` だけである。

## Signature / Usage

カテゴリ内で最も短い `login-01`（カード型のシンプルなログインフォーム）の `## Rust コード` の冒頭抜粋。

```rust
use fandhe_frontend_core::{div, text, Node};
use fandhe_frontend_pre_styled_ui::button::{self, ButtonProps, ButtonVariant};
use fandhe_frontend_pre_styled_ui::card::{self, CardProps};
use fandhe_frontend_pre_styled_ui::field::{self, FieldOrientation, FieldRootProps};
use fandhe_frontend_pre_styled_ui::input::{self, FieldIds, FieldProps, InputProps};

/// `login-01` の Demo 本体。呼び出しごとに同一の `Node` を返す純関数。
pub fn demo() -> Node {
    let email_field = FieldProps {
        id: "blocks-login-01-email",
        ids: FieldIds::default(),
        disabled: false,
        invalid: false,
        required: true,
        readonly: false,
        has_helper_text: false,
    };
    let password_field = FieldProps {
        id: "blocks-login-01-password",
        ids: FieldIds::default(),
        disabled: false,
        invalid: false,
        required: true,
        readonly: false,
        has_helper_text: false,
    };
    let orientation = FieldRootProps {
        orientation: FieldOrientation::Vertical,
    };
    let link_button = ButtonProps {
        variant: ButtonVariant::Link,
        ..ButtonProps::default()
    };

    card::root(
        CardProps::default(),
        vec![("data-blocks-login-01-card", "")],
        vec![
            card::header(
                vec![],
                vec![
                    card::title(vec![], vec![text("Login to your account")]),
                    card::description(
                        vec![],
                        vec![text("Enter your email below to login to your account")],
                    ),
                ],
            ),
            card::body(
                vec![],
                vec![field::group(
                    vec![],
                    vec![
                        field::root(
                            &orientation,
                            &email_field,
                            vec![("data-blocks-login-01-field", "")],
                            vec![
                                field::label(&email_field, vec![], vec![text("Email")]),
                                input::input(
                                    &InputProps::default(),
                                    &email_field,
                                    vec![("type", "email"), ("placeholder", "m@example.com")],
                                ),
                            ],
                        ),
// ...（以下省略。全文は公式ページ https://fandhe-ai.github.io/fandhe-frontend/blocks/login-01/ の「Rust コード」を参照）
```

## Blocks

| Slug | Description | Parts | Official URL |
|------|-------------|-------|--------------|
| `auth-dropdown-panel` | ナビバーのボタンを起点に開くドロップダウン型サインインパネル（wide / narrow の 2 レイアウト） | [Popover](../../themes/overlays/popover.md), [Menu](../../themes/collections/menu.md), [Field](../../themes/forms/field.md), [Input](../../themes/forms/input.md), [Button](../../themes/forms/button.md), [Link](../../themes/typography/link.md) | https://fandhe-ai.github.io/fandhe-frontend/blocks/auth-dropdown-panel/ |
| `auth-oauth-consent` | OAuth 連携の同意画面（連携元・連携先アプリを示すカード） | [Card](../../themes/data-display/card.md), [Avatar](../../themes/data-display/avatar.md), [Icon](../../themes/data-display/icon.md), [List](../../themes/typography/list.md), [Separator](../../themes/utilities/separator.md), [Button](../../themes/forms/button.md), [Link](../../themes/typography/link.md), [Heading](../../themes/typography/heading.md) | https://fandhe-ai.github.io/fandhe-frontend/blocks/auth-oauth-consent/ |
| `auth-otp-verify` | ワンタイムコード（OTP）確認画面（6 桁の入力欄・確認ボタン・再送リンク風ボタン） | [Pin Input](../../themes/forms/pin-input.md), [Field](../../themes/forms/field.md), [Button](../../themes/forms/button.md), [Link](../../themes/typography/link.md), [Heading](../../themes/typography/heading.md), [Text](../../themes/typography/text.md) | https://fandhe-ai.github.io/fandhe-frontend/blocks/auth-otp-verify/ |
| `auth-split-accent-panel` | 左右 2 カラムの一方にサインインフォーム、もう一方に画像を持たないアクセント面パネルを置く分割サインイン | [Field](../../themes/forms/field.md), [Input](../../themes/forms/input.md), [Button](../../themes/forms/button.md), [Link](../../themes/typography/link.md), [Checkbox](../../themes/forms/checkbox.md), [Separator](../../themes/utilities/separator.md), [Blockquote](../../themes/typography/blockquote.md), [Avatar](../../themes/data-display/avatar.md), [Icon](../../themes/data-display/icon.md), [Card](../../themes/data-display/card.md) | https://fandhe-ai.github.io/fandhe-frontend/blocks/auth-split-accent-panel/ |
| `auth-split-photo-testimonial` | 片側にサインイン／サインアップフォーム、もう片側に背景写真 + 暗幕 + 顧客の声を置く分割サインイン | [Field](../../themes/forms/field.md), [Input](../../themes/forms/input.md), [Button](../../themes/forms/button.md), [Link](../../themes/typography/link.md), [Checkbox](../../themes/forms/checkbox.md), [Separator](../../themes/utilities/separator.md), [Image](../../themes/data-display/image.md), [Blockquote](../../themes/typography/blockquote.md), [Avatar](../../themes/data-display/avatar.md), [Heading](../../themes/typography/heading.md) | https://fandhe-ai.github.io/fandhe-frontend/blocks/auth-split-photo-testimonial/ |
| `auth-tabs-card` | ログイン／新規登録のタブ付きカード（タブは切り替え不可の静的表示） | [Card](../../themes/data-display/card.md), [Tabs](../../themes/disclosure/tabs.md), [Field](../../themes/forms/field.md), [Input](../../themes/forms/input.md), [Button](../../themes/forms/button.md), [Separator](../../themes/utilities/separator.md), [Dialog](../../themes/overlays/dialog.md) | https://fandhe-ai.github.io/fandhe-frontend/blocks/auth-tabs-card/ |
| `login-01` | shadcn/ui Blocks `login-01` 相当のカード型シンプルログインフォーム | [Card](../../themes/data-display/card.md), [Field](../../themes/forms/field.md), [Input](../../themes/forms/input.md), [Button](../../themes/forms/button.md) | https://fandhe-ai.github.io/fandhe-frontend/blocks/login-01/ |
| `login-04` | shadcn/ui Blocks `login-04` 相当のフォーム + 画像の 2 カラムログインページ | [Card](../../themes/data-display/card.md), [Field](../../themes/forms/field.md), [Input](../../themes/forms/input.md), [Button](../../themes/forms/button.md), [Image](../../themes/data-display/image.md), [Icon](../../themes/data-display/icon.md) | https://fandhe-ai.github.io/fandhe-frontend/blocks/login-04/ |
| `signup-01` | shadcn/ui Blocks `signup-01` 相当のカード型シンプルサインアップフォーム | [Card](../../themes/data-display/card.md), [Field](../../themes/forms/field.md), [Input](../../themes/forms/input.md), [Button](../../themes/forms/button.md) | https://fandhe-ai.github.io/fandhe-frontend/blocks/signup-01/ |
| `signup-05` | shadcn/ui Blocks `signup-05` 相当のソーシャルプロバイダ付きサインアップフォーム | [Field](../../themes/forms/field.md), [Input](../../themes/forms/input.md), [Button](../../themes/forms/button.md), [Heading](../../themes/typography/heading.md), [Icon](../../themes/data-display/icon.md) | https://fandhe-ai.github.io/fandhe-frontend/blocks/signup-05/ |

## Notes

- 上記コードは公式 md `## Rust コード` の冒頭抜粋（元は約 124 行）。全文は公式ページを参照する。
- Blocks は Themes / Primitives / core 部品の合成例で、公開 crate の API を使う側のコード例。`docs-site` crate は crates.io 未公開のため `use` できず、コードをコピーして利用する前提。
- 各 block の `BLOCK.parts` の label と公式 md 冒頭の使用部品は一致する（`BLOCK` の構造は [overview.md](./overview.md) を参照）。
- 認証・送信・検証・データ取得は一切行わない静的表示。`<form>` 要素を出力せず（無 JS 前提で Enter キーの暗黙 submit を避けるため）、送信ボタンは `type="button"` のまま。リンク風の操作は死リンク `href="#"` ではなく `ButtonVariant::Link` ボタンで表現する。実際の送信処理は利用側のコードで実装する。
- `login-*` / `signup-*` の差分メモ（shadcn 側との差分）の要点: 実企業名・実ブランドは持ち込まない（例: shadcn の「Login with Google」を「Login with SSO」へ置換）。shadcn の `FieldGroup` は `field::group` で再現。レイアウトは shadcn のスクリーンショットに一致させ、配色・タイポグラフィは `Theme` トークンに従う。
- 出典（pin SHA `cf5edb9b8f1bf2a63d51dcf50a8d2806e2d8f9f9`）: 公式 md は `site/blocks/<slug>.md`、Rust ソースは `crates/docs-site/src/blocks/application/auth/<slug_snake>.rs`。

## Related

- [Application Blocks overview](./overview.md)
- [Form Layout](./form-layout.md)
- [Settings](./settings.md)
- [Field](../../themes/forms/field.md)
