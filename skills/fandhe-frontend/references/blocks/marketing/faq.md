# FAQ（Marketing Blocks）

Blocks は新規 API ではなく、既存の Themes / Primitives / core 部品を組み合わせた合成例。各 block の公開物は未公開 crate `docs-site` 内部の `pub fn demo() -> Node` と `pub const BLOCK: Block` のみ。FAQ は 6 block。

## Signature / Usage

カテゴリ内で最も短い block `faq-static-grid` の公式コード（常時表示の FAQ グリッド）。

```rust
const REPO: &str = "https://github.com/Fandhe-AI/fandhe-frontend";

use fandhe_frontend_core::{div, text, Node};
use fandhe_frontend_pre_styled_ui::button::{self, ButtonProps, ButtonVariant};
use fandhe_frontend_pre_styled_ui::heading::{heading, HeadingLevel, HeadingProps, HeadingSize};
use fandhe_frontend_pre_styled_ui::link::{self, LinkProps, LinkVariant};
use fandhe_frontend_pre_styled_ui::text::{self as styled_text, TextProps, TextVariant};

/// Q&A。
const FAQS: [(&str, &str); 3] = [
    ("招待上限は", "プラン次第"),
    ("無料期間は", "14日間無料"),
    ("解約方法は", "いつでも。"),
];

/// 導入部。
fn header() -> Node {
    div(
        vec![("class", "blocks-faq-static-grid-header")],
        vec![
            heading(
                HeadingLevel::H3,
                &HeadingProps {
                    size: HeadingSize::Xl2,
                    ..HeadingProps::default()
                },
                vec![],
                vec![text("FAQ")],
            ),
            styled_text::text(
                &TextProps {
                    variant: TextVariant::Muted,
                    ..TextProps::default()
                },
                vec![],
                vec![link::root(
                    REPO,
                    &LinkProps {
                        variant: LinkVariant::Underline,
                        ..LinkProps::default()
                    },
                    vec![],
                    vec![text("GitHub")],
                )],
            ),
        ],
    )
}

/// FAQ 1 件分。
fn faq_entry(question: &str, answer: &str) -> Node {
    div(
        vec![("class", "blocks-faq-static-grid-item")],
        vec![
            heading(
                HeadingLevel::H4,
                &HeadingProps::default(),
                vec![],
                vec![text(question)],
            ),
            styled_text::text(
                &TextProps {
                    variant: TextVariant::Muted,
                    ..TextProps::default()
                },
                vec![],
                vec![text(answer)],
            ),
        ],
    )
}

/// FAQ グリッド本体。
fn faq_grid() -> Node {
    div(
        vec![("class", "blocks-faq-static-grid-grid")],
        FAQS.iter()
            .map(|(question, answer)| faq_entry(question, answer))
            .collect(),
    )
}

/// ボタン行。
fn contact() -> Node {
    div(
        vec![("class", "blocks-faq-static-grid-actions")],
        vec![
            button::button(&ButtonProps::default(), vec![], vec![text("問合せ")]),
            button::button(
                &ButtonProps {
                    variant: ButtonVariant::Outline,
                    ..ButtonProps::default()
                },
                vec![],
                vec![text("資料")],
            ),
        ],
    )
}

/// Demo 本体。
pub fn demo() -> Node {
    div(
        vec![("class", "blocks-faq-static-grid-layout")],
        vec![header(), faq_grid(), contact()],
    )
}
```

## Blocks

| slug | 説明 | 使用部品 | 公式 URL |
|------|------|----------|----------|
| faq-accordion-centered | 中央寄せの FAQ セクション | [heading](../../themes/typography/heading.md) / [text](../../themes/typography/text.md) / [badge](../../themes/data-display/badge.md) / [accordion](../../themes/disclosure/accordion.md) / [button](../../themes/forms/button.md) | https://fandhe-ai.github.io/fandhe-frontend/blocks/faq-accordion-centered/ |
| faq-question-rows | 質問左・回答右の行型 FAQ セクション | [heading](../../themes/typography/heading.md) / [text](../../themes/typography/text.md) / [separator](../../themes/utilities/separator.md) / [link](../../themes/typography/link.md) | https://fandhe-ai.github.io/fandhe-frontend/blocks/faq-question-rows/ |
| faq-split-accordion | 見出し左 + アコーディオン右の 2 カラム FAQ セクション | [heading](../../themes/typography/heading.md) / [text](../../themes/typography/text.md) / [accordion](../../themes/disclosure/accordion.md) / [button](../../themes/forms/button.md) | https://fandhe-ai.github.io/fandhe-frontend/blocks/faq-split-accordion/ |
| faq-split-static | 左に見出し + リード文、右に開閉のない Q&A 一覧を並べる 2 カラムの FAQ セクション | [heading](../../themes/typography/heading.md) / [text](../../themes/typography/text.md) / [link](../../themes/typography/link.md) | https://fandhe-ai.github.io/fandhe-frontend/blocks/faq-split-static/ |
| faq-static-grid | 常時表示の FAQ グリッド | [heading](../../themes/typography/heading.md) / [text](../../themes/typography/text.md) / [link](../../themes/typography/link.md) / [button](../../themes/forms/button.md) | https://fandhe-ai.github.io/fandhe-frontend/blocks/faq-static-grid/ |
| faq-tabbed-accordion | カテゴリ別 FAQ セクション | [heading](../../themes/typography/heading.md) / [text](../../themes/typography/text.md) / [badge](../../themes/data-display/badge.md) / [accordion](../../themes/disclosure/accordion.md) | https://fandhe-ai.github.io/fandhe-frontend/blocks/faq-tabbed-accordion/ |

## Notes

- docs-site は crates.io 未公開のため `use` できない。各 block のコードはコピーして自アプリへ取り込む前提。一部 block のコードは docs-site 内部の `crate::blocks::dummy_assets`（ダミー素材）や `LAYOUT_CSS`（block 固有のレイアウト CSS）に依存するため、そのままではコンパイルできない
- 全 block は静的な表示例で `<form>` を持たない。質問・回答の文言は架空
- 開閉する block（`faq-accordion-centered` / `faq-split-accordion` / `faq-tabbed-accordion`）は `accordion` を使い、開閉のない block（`faq-question-rows` / `faq-split-static` / `faq-static-grid`）は `accordion` を使わない
- `faq-static-grid` の公式ページ本文は導入文 1 行（「常時表示の FAQ グリッド。文言は架空です。」）と `## Rust コード` のみ
- 出典（pin SHA `cf5edb9b8f1bf2a63d51dcf50a8d2806e2d8f9f9`）: `site/blocks/<slug>.md`、`crates/docs-site/src/blocks/marketing/faq/<slug_snake>.rs`。`rust` フェンスは rs の `// blocks-code:begin` 〜 `end` 範囲と一致

## Related

- [overview.md](./overview.md)
- [accordion](../../themes/disclosure/accordion.md)
- [heading](../../themes/typography/heading.md)
