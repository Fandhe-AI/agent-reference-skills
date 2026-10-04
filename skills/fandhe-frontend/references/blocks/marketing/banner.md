# Banner（Marketing Blocks）

告知バー・Cookie 同意・浮遊カードなどのバナー向け block 5 件。blocks は新規 API ではなく既存の Themes / Primitives / core 部品の合成例で、各 block の公開物は未公開 crate `docs-site` 内部の `pub fn demo() -> Node` と `pub const BLOCK: Block` だけである。

## Signature / Usage

カテゴリ内で最も短い `banner-email-signup`（メール登録付きの全幅告知バー）の公式 `## Rust コード` を原文のまま掲載する。

```rust
use fandhe_frontend_core::{div, text, Node};
use fandhe_frontend_pre_styled_ui::button::{self, ButtonProps, ButtonVariant};
use fandhe_frontend_pre_styled_ui::callout::{self, CalloutProps};
use fandhe_frontend_pre_styled_ui::field::{self, FieldOrientation, FieldRootProps};
use fandhe_frontend_pre_styled_ui::heading::{self, HeadingLevel, HeadingProps, HeadingSize};
use fandhe_frontend_pre_styled_ui::input::{self, FieldIds, FieldProps, InputProps};
use fandhe_frontend_pre_styled_ui::text::{self as styled_text, TextProps, TextVariant};
use fandhe_frontend_pre_styled_ui::visually_hidden;
use fandhe_frontend_pre_styled_ui::Size;

/// タイトル・説明（`copy` 領域）。
fn copy() -> Node {
    div(
        vec![("class", "blocks-banner-email-signup-copy")],
        vec![
            heading::heading(
                HeadingLevel::H3,
                &HeadingProps {
                    size: HeadingSize::Sm,
                    ..HeadingProps::default()
                },
                vec![("data-blocks-banner-email-signup-title", "")],
                vec![text("Get release notes in your inbox")],
            ),
            styled_text::text(
                &TextProps {
                    variant: TextVariant::Muted,
                    ..TextProps::default()
                },
                vec![("data-blocks-banner-email-signup-description", "")],
                vec![text("New blocks and components, once a month. No spam.")],
            ),
        ],
    )
}

/// メールアドレス入力 + 送信ボタン（`signup` 領域）。可視ラベルは出さず
/// `visually_hidden::root` で包んだ `field::label` が `<label for>` の
/// 関連付けを担う（モジュール doc「可視ラベルの代わりに」節参照）。
fn signup() -> Node {
    const EMAIL_FIELD_ID: &str = "blocks-banner-email-signup-email";
    let email_field = FieldProps {
        id: EMAIL_FIELD_ID,
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

    div(
        vec![("class", "blocks-banner-email-signup-signup")],
        vec![
            field::root(
                &orientation,
                &email_field,
                vec![("data-blocks-banner-email-signup-field", "")],
                vec![
                    visually_hidden::root(
                        vec![],
                        vec![field::label(
                            &email_field,
                            vec![],
                            vec![text("Email address")],
                        )],
                    ),
                    input::input(
                        &InputProps::default(),
                        &email_field,
                        vec![
                            ("type", "email"),
                            ("autocomplete", "email"),
                            ("placeholder", "you@example.com"),
                        ],
                    ),
                ],
            ),
            button::button(
                &ButtonProps::default(),
                vec![("data-blocks-banner-email-signup-submit", "")],
                vec![text("Notify me")],
            ),
        ],
    )
}

/// `banner-email-signup` の Demo 本体（全幅の帯。`copy`/`signup`/`close`
/// の 3 領域を [`LAYOUT_CSS`] の `grid-template-areas` で配置する）。
pub fn demo() -> Node {
    callout::root(
        &CalloutProps::default(),
        vec![("data-blocks-banner-email-signup-root", "")],
        vec![div(
            vec![("class", "blocks-banner-email-signup-bar")],
            vec![
                copy(),
                signup(),
                button::close_button(
                    &ButtonProps {
                        variant: ButtonVariant::Ghost,
                        size: Size::Sm,
                        ..ButtonProps::default()
                    },
                    "Dismiss banner",
                    vec![("data-blocks-banner-email-signup-close", "")],
                ),
            ],
        )],
    )
}
```

## Blocks

| Block | Description | 使用部品 | 公式 URL |
| --- | --- | --- | --- |
| `banner-announcement-pill` | 中央寄せの角丸ピル型告知リンク。ピル全体が 1 個のクリック可能領域で、短い告知文と矢印アイコンを横並びにする。基準形と、先頭に重なりアバター群を置く形の 2 バリエーションを明暗 2 種で並記 | [Link](../../themes/typography/link.md) / [Icon](../../themes/data-display/icon.md) / [Avatar](../../themes/data-display/avatar.md) | https://fandhe-ai.github.io/fandhe-frontend/blocks/banner-announcement-pill/ |
| `banner-cookie-consent` | Cookie 同意の通知バナー。「Decline」「Accept all」は `type="button"` で送信先を持たず、Cookie の読み書き・同意状態の保存は利用者のアプリケーションコードの責務 | [Callout](../../themes/feedback/callout.md) / [Heading](../../themes/typography/heading.md) / [Text](../../themes/typography/text.md) / [Button](../../themes/forms/button.md) / [Link](../../themes/typography/link.md) / [Icon](../../themes/data-display/icon.md) | https://fandhe-ai.github.io/fandhe-frontend/blocks/banner-cookie-consent/ |
| `banner-email-signup` | メール登録付きの全幅告知バー。48rem 以上で左にタイトル + 説明、右にメール入力 + 登録ボタン、右端に閉じるボタンの 3 カラム帯。登録・閉じるは `type="button"` で送信先・削除処理を持たない | [Callout](../../themes/feedback/callout.md) / [Heading](../../themes/typography/heading.md) / [Text](../../themes/typography/text.md) / [Field](../../themes/forms/field.md) / [Input](../../themes/forms/input.md) / [Button](../../themes/forms/button.md) / [Visually Hidden](../../themes/utilities/visually-hidden.md) | https://fandhe-ai.github.io/fandhe-frontend/blocks/banner-email-signup/ |
| `banner-floating-card` | 浮いたカード型の告知。実運用では `position: fixed` + ページ端 padding を利用者が用意する想定で、Demo は固定高の疑似ビューポート内で `position: absolute` により上端/下端へ貼り付ける | [Callout](../../themes/feedback/callout.md) / [Icon](../../themes/data-display/icon.md) / [Link](../../themes/typography/link.md) / [Button](../../themes/forms/button.md) | https://fandhe-ai.github.io/fandhe-frontend/blocks/banner-floating-card/ |
| `banner-full-width-bar` | ページ上端に置く全幅の告知バー（集約元 15 件）。ボタンはすべて `type="button"` で送信先・閉じる処理を持たず、開閉・遷移は利用者側で実装する | [Callout](../../themes/feedback/callout.md) / [Button](../../themes/forms/button.md) / [Link](../../themes/typography/link.md) / [Icon](../../themes/data-display/icon.md) / [Badge](../../themes/data-display/badge.md) / [Code](../../themes/typography/code.md) | https://fandhe-ai.github.io/fandhe-frontend/blocks/banner-full-width-bar/ |

## Notes

- `docs-site` crate は crates.io 未公開。`demo()` と `BLOCK` は利用者が `use` できる API ではなく、コードをコピーして改変する前提の例である。
- フェンス内の doc comment が参照する `LAYOUT_CSS` や `blocks-banner-*` などのクラス名に当たるレイアウト CSS は `Block.layout_css`（`LayoutCss`）として `.rs` 側に別途登録されており、公式 md のフェンスには含まれない。Rust コードだけではレイアウトのスタイルは付かない。
- 代表 block `banner-email-signup` の差分メモ（各 block ページ末尾に個別記載）: 閉じるボタンは 1 DOM のみ（`grid-template-areas` の切替で再配置）、`<form>` 化・実送信はしない、可視ラベルなしは `visually-hidden` な `<label for>` で補う、文言・配色は独自。
- Cookie 同意・登録・閉じる等の動作ロジックは `docs/policy/intentional-non-adoption.md` §3.25 の責務境界により UI コンポーネント層に含まれず、利用者の Rust/JS コードで実装する。
- 出典（pin SHA `cf5edb9b8f1bf2a63d51dcf50a8d2806e2d8f9f9`）: `crates/docs-site/src/blocks/marketing/banner/<slug_snake>.rs`、`site/blocks/<slug>.md`。

## Related

- [Marketing Blocks 概要](./overview.md)
- [Callout](../../themes/feedback/callout.md)
- [Button](../../themes/forms/button.md)
- [Field](../../themes/forms/field.md)
