# Newsletter（Marketing Blocks）

Blocks は新規 API ではなく、既存の Themes / Primitives / core 部品を組み合わせた合成例。各 block の公開物は未公開 crate `docs-site` 内部の `pub fn demo() -> Node` と `pub const BLOCK: Block` のみ。Newsletter は 3 block。

## Signature / Usage

カテゴリ内で最も短い block `newsletter-split`（見出し左 + 登録フォーム右。`plain` / `accent` / `card` の 3 tone を縦積みで並記）の `## Rust コード` の冒頭抜粋。

```rust
const REPO: &str = "https://github.com/Fandhe-AI/fandhe-frontend";

use fandhe_frontend_core::{div, text, Node};
use fandhe_frontend_pre_styled_ui::button::{self, ButtonProps};
use fandhe_frontend_pre_styled_ui::card::{self, CardProps, CardVariant};
use fandhe_frontend_pre_styled_ui::field::{self, FieldOrientation, FieldRootProps};
use fandhe_frontend_pre_styled_ui::heading::{heading, HeadingLevel, HeadingProps, HeadingSize};
use fandhe_frontend_pre_styled_ui::input::{self, FieldIds, FieldProps, InputProps};
use fandhe_frontend_pre_styled_ui::link::{self, LinkProps, LinkVariant};
use fandhe_frontend_pre_styled_ui::recipe::ColorPalette;
use fandhe_frontend_pre_styled_ui::text::{self as styled_text, TextProps, TextVariant};
use fandhe_frontend_pre_styled_ui::visually_hidden;

/// メールアドレス入力 + 送信ボタン + プライバシー文（`signup` 領域）。
/// 可視ラベルは出さず `visually_hidden::root` で包んだ `field::label` が
/// `<label for>` の関連付けを担う（モジュール doc「可視ラベルの代わりに」
/// 節参照）。`tone` は `plain` 以外の面で説明文の配色を継承へ切り替える
/// ため（モジュール doc「tone 上書きの詳細度」節）に使う。
fn signup(tone: &'static str, email_field_id: &'static str) -> Node {
    let email_field = FieldProps {
        id: email_field_id,
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
    let privacy_variant = if tone == "plain" {
        TextVariant::Muted
    } else {
        TextVariant::Plain
    };

    div(
        vec![("class", "blocks-newsletter-split-signup")],
        vec![
            div(
                vec![("class", "blocks-newsletter-split-controls")],
                vec![
                    field::root(
                        &orientation,
                        &email_field,
                        vec![],
                        vec![
                            visually_hidden::root(
                                vec![],
                                vec![field::label(
                                    &email_field,
                                    vec![],
                                    vec![text("メールアドレス")],
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
                        vec![("data-blocks-newsletter-split-submit", "")],
                        vec![text("登録する")],
                    ),
                ],
            ),
// ...（以下省略。全文は公式ページ https://fandhe-ai.github.io/fandhe-frontend/blocks/newsletter-split/ の「Rust コード」を参照）
```

## Blocks

| slug | 説明 | 使用部品 | 公式 URL |
|------|------|----------|----------|
| newsletter-split | 見出し左 + 登録フォーム右の newsletter。基準形（背景なし）・ブランド色背景・暗色カード + `xl` 以上で横並びの 3 インスタンスを縦に並記 | [heading](../../themes/typography/heading.md) / [text](../../themes/typography/text.md) / [field](../../themes/forms/field.md) / [input](../../themes/forms/input.md) / [button](../../themes/forms/button.md) / [link](../../themes/typography/link.md) / [visually-hidden](../../themes/utilities/visually-hidden.md) / [card](../../themes/data-display/card.md) | https://fandhe-ai.github.io/fandhe-frontend/blocks/newsletter-split/ |
| newsletter-stacked | 縦積みの newsletter 登録セクション | [heading](../../themes/typography/heading.md) / [text](../../themes/typography/text.md) / [breadcrumb](../../themes/navigation/breadcrumb.md) / [field](../../themes/forms/field.md) / [input](../../themes/forms/input.md) / [button](../../themes/forms/button.md) / [visually-hidden](../../themes/utilities/visually-hidden.md) / [card](../../themes/data-display/card.md) | https://fandhe-ai.github.io/fandhe-frontend/blocks/newsletter-stacked/ |
| newsletter-with-details | 補足項目付きの newsletter 登録フォーム | [heading](../../themes/typography/heading.md) / [text](../../themes/typography/text.md) / [field](../../themes/forms/field.md) / [input](../../themes/forms/input.md) / [button](../../themes/forms/button.md) / [icon](../../themes/data-display/icon.md) / [visually-hidden](../../themes/utilities/visually-hidden.md) | https://fandhe-ai.github.io/fandhe-frontend/blocks/newsletter-with-details/ |

## Notes

- 上記コードは公式 md `## Rust コード` の冒頭抜粋（元は約 170 行）。全文は公式ページを参照する。
- docs-site は crates.io 未公開のため `use` できない。各 block のコードはコピーして自アプリへ取り込む前提。一部 block のコードは docs-site 内部の `crate::blocks::dummy_assets`（ダミー素材）や `LAYOUT_CSS`（block 固有のレイアウト CSS）に依存するため、そのままではコンパイルできない
- 送信ボタンは `type="button"` のまま送信先を持たず、`<form>` 要素も出力しない（UI コンポーネント層はアプリケーションロジックを内包しない責務境界）。文言は架空
- 可視ラベルは表示せず、`visually_hidden::root` で包んだ `field::label` と `<label for>` の関連付けで入力欄のアクセシブル名を確保する。複数インスタンス間で入力欄の `id` は一意にする
- 公式ページの差分メモ（`newsletter-split`）: `card` tone の「暗色」はテーマの `fg` / `bg` 反転トークンで表現しており、ダークテーマでは明色カードへ反転する（意図的な簡略化）。`plain` / `accent` は lg（1024px）以上、`card` は xl（1280px）以上で 2 列化する。フォーム下部のリンクは固定のリポジトリ URL へ遷移し、実在しないプライバシーポリシーへの同意を主張しない文言にしている
- 出典（pin SHA `cf5edb9b8f1bf2a63d51dcf50a8d2806e2d8f9f9`）: `site/blocks/<slug>.md`、`crates/docs-site/src/blocks/marketing/newsletter/<slug_snake>.rs`。`rust` フェンスは rs の `// blocks-code:begin` 〜 `end` 範囲と一致

## Related

- [overview.md](./overview.md)
- [field](../../themes/forms/field.md)
- [input](../../themes/forms/input.md)
- [visually-hidden](../../themes/utilities/visually-hidden.md)
