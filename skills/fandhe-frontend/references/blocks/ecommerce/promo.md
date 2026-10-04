# Promo（Ecommerce Blocks）

セール・キャンペーン・登録特典などのプロモーション Blocks 9 件。Blocks は新規 API ではなく既存の Themes / Primitives / core 部品の合成例であり、各 block の公開物は未公開 crate `docs-site` 内部の `pub fn demo() -> Node` と `pub const BLOCK: Block` だけである。

## Signature / Usage

カテゴリ内で最も短い `promo-sale-products` の `## Rust コード` の冒頭抜粋。

```rust
use crate::blocks::dummy_assets;
use fandhe_frontend_core::{div, el, text, Node};
use fandhe_frontend_pre_styled_ui::button::{self, ButtonProps, ButtonVariant};
use fandhe_frontend_pre_styled_ui::card::{self, CardProps};
use fandhe_frontend_pre_styled_ui::heading::{self, HeadingLevel, HeadingProps, HeadingSize};
use fandhe_frontend_pre_styled_ui::image::{self, AspectRatio, ImageProps};
use fandhe_frontend_pre_styled_ui::strong;
use fandhe_frontend_pre_styled_ui::text::{self as styled_text, TextProps, TextSize};

/// 割引商品 4 点分の商品名（架空、実在のブランド・商品とは無関係）。
const PRODUCTS: [&str; 4] = [
    "リネンのトートバッグ",
    "陶器のマグカップ",
    "ウールのマフラー",
    "木製のコースター",
];

/// 割引商品 4 点分の元値（`PRODUCTS` と対で使う、架空の価格）。
const REGULAR_PRICES: [&str; 4] = ["¥4,800", "¥2,200", "¥6,000", "¥1,500"];

/// 割引商品 4 点分のセール価格（`PRODUCTS` と対で使う、架空の価格）。
const SALE_PRICES: [&str; 4] = ["¥3,360", "¥1,540", "¥4,200", "¥1,050"];

/// 告知面（見出し・本文・CTA 2 個）。
fn announcement() -> Node {
    div(
        vec![("class", "blocks-promo-sale-products-announcement")],
        vec![
            heading::heading(
                HeadingLevel::H2,
                &HeadingProps {
                    size: HeadingSize::Xl3,
                    ..HeadingProps::default()
                },
                vec![("data-blocks-promo-sale-products-title", "")],
                vec![text("季節のセール、開催中")],
            ),
            styled_text::text(
                &TextProps {
                    size: TextSize::Lg,
                    ..TextProps::default()
                },
                vec![("data-blocks-promo-sale-products-lead", "")],
                vec![text(
                    "対象商品が最大 3 割引。数量限定のためお早めにご覧ください。",
                )],
            ),
            div(
                vec![("class", "blocks-promo-sale-products-actions")],
                vec![
                    button::button(
                        &ButtonProps::default(),
                        vec![("data-blocks-promo-sale-products-cta", "")],
                        vec![text("セール商品を見る")],
                    ),
                    button::button(
                        &ButtonProps {
                            variant: ButtonVariant::Outline,
                            ..ButtonProps::default()
                        },
                        vec![("data-blocks-promo-sale-products-cta-secondary", "")],
                        vec![text("カテゴリから探す")],
                    ),
                ],
            ),
        ],
    )
}
// ...（以下省略。全文は公式ページ https://fandhe-ai.github.io/fandhe-frontend/blocks/promo-sale-products/ の「Rust コード」を参照）
```

## Blocks

| slug | 説明 | 使用部品（BLOCK.parts） | 公式 URL |
|------|------|------------------------|----------|
| promo-background-image | 背景画像全面のプロモーション。暗幕を重ねた上へ中央寄せの見出し・説明・反転色 CTA（サイト内のコレクション訴求ページへの `link`） | [Heading](../../themes/typography/heading.md) / [Text](../../themes/typography/text.md) / [Link](../../themes/typography/link.md) / [Image](../../themes/data-display/image.md) / [Card](../../themes/data-display/card.md) | https://fandhe-ai.github.io/fandhe-frontend/blocks/promo-background-image/ |
| promo-collection-cards | 背景画像 + 暗幕のヒーロー部に補助行・見出し・リード文・CTA を置き、その下端に重なるコレクションカード 3 枚（カード全体をリンク化）を横並び | [Heading](../../themes/typography/heading.md) / [Text](../../themes/typography/text.md) / [Button](../../themes/forms/button.md) / [Card](../../themes/data-display/card.md) / [Image](../../themes/data-display/image.md) / [Link Overlay](../../themes/typography/link-overlay.md) | https://fandhe-ai.github.io/fandhe-frontend/blocks/promo-collection-cards/ |
| promo-countdown | カウントダウン付きセール告知。中央寄せ（背景画像 + 暗幕）・背景画像上の左寄せカード・左文章 + 右数字ボックスの 3 形を並記。`timer` は idle 状態の固定値で tick しない | [Heading](../../themes/typography/heading.md) / [Text](../../themes/typography/text.md) / [Timer](../../themes/date-time/timer.md) / [Button](../../themes/forms/button.md) / [Image](../../themes/data-display/image.md) / [Card](../../themes/data-display/card.md) | https://fandhe-ai.github.io/fandhe-frontend/blocks/promo-countdown/ |
| promo-image-tiles | 片側に見出し・リード文・CTA（外部リンク）、もう片側に画像タイルを 3 列で上下にずらしたコラージュ。`base` 形と `dark` 形を並記 | [Heading](../../themes/typography/heading.md) / [Text](../../themes/typography/text.md) / [Link](../../themes/typography/link.md) / [Image](../../themes/data-display/image.md) | https://fandhe-ai.github.io/fandhe-frontend/blocks/promo-image-tiles/ |
| promo-offers-split | 上段にオファー 3 件を横並びにした帯（各オファーは短い見出しと説明をまとめた 1 リンク）、下段に左テキスト・右画像の 2 列 | [Heading](../../themes/typography/heading.md) / [Text](../../themes/typography/text.md) / [Image](../../themes/data-display/image.md) / [Link](../../themes/typography/link.md) / [Separator](../../themes/utilities/separator.md) | https://fandhe-ai.github.io/fandhe-frontend/blocks/promo-offers-split/ |
| promo-sale-categories | 見出し行右側にピル型カウントダウンを置いた上段と、カテゴリカード 4 枚のグリッド（1 列 → `48rem` 以上 2 列 → `64rem` 以上 4 列）の下段 | [Heading](../../themes/typography/heading.md) / [Timer](../../themes/date-time/timer.md) / [Badge](../../themes/data-display/badge.md) / [Card](../../themes/data-display/card.md) / [Image](../../themes/data-display/image.md) / [Link Overlay](../../themes/typography/link-overlay.md) | https://fandhe-ai.github.io/fandhe-frontend/blocks/promo-sale-categories/ |
| promo-sale-products | セール告知面（見出し・本文・primary/secondary CTA）と割引商品 4 点の 2 列グリッド。各カードは画像・商品名・元値（取り消し線）・セール価格 | [Heading](../../themes/typography/heading.md) / [Text](../../themes/typography/text.md) / [Button](../../themes/forms/button.md) / [Image](../../themes/data-display/image.md) / [Card](../../themes/data-display/card.md) / [Strong](../../themes/typography/strong.md) | https://fandhe-ai.github.io/fandhe-frontend/blocks/promo-sale-products/ |
| promo-signup-offer | 角丸カードを画像列と登録フォームの 2 列へ分けた画像付き登録特典カード | [Card](../../themes/data-display/card.md) / [Heading](../../themes/typography/heading.md) / [Text](../../themes/typography/text.md) / [Field](../../themes/forms/field.md) / [Input](../../themes/forms/input.md) / [Button](../../themes/forms/button.md) / [Image](../../themes/data-display/image.md) / [Radio Group](../../themes/forms/radio-group.md) / [Fieldset](../../themes/forms/fieldset.md) / [Link](../../themes/typography/link.md) | https://fandhe-ai.github.io/fandhe-frontend/blocks/promo-signup-offer/ |
| promo-with-testimonials | 背景画像の上に淡い覆いを重ね、上段に見出し・説明・CTA、下段に顧客の引用 3 件を 3 列で並べる | [Heading](../../themes/typography/heading.md) / [Text](../../themes/typography/text.md) / [Button](../../themes/forms/button.md) / [Image](../../themes/data-display/image.md) / [Blockquote](../../themes/typography/blockquote.md) / [Icon](../../themes/data-display/icon.md) | https://fandhe-ai.github.io/fandhe-frontend/blocks/promo-with-testimonials/ |

## Notes

- 上記コードは公式 md `## Rust コード` の冒頭抜粋（元は約 129 行）。全文は公式ページを参照する。
- `docs-site` は crates.io 未公開 crate のため `use` できる API ではない。コードをコピーして `fandhe_frontend_pre_styled_ui::*` / `fandhe_frontend_core::*` の呼び出し規約の見本として使う前提。`use crate::blocks::dummy_assets;` は docs-site 内部モジュールで、コピー時は自前の画像 URL に置き換える。
- 全 block は無 JS の静的表示で、CTA は `type="button"` の静的ボタンまたはサイト内リンク。送信処理・状態管理を持たない。商品名・価格は架空データ。
- 差分メモ（`promo-sale-products`）: 集約元は主参照 R0039 の 1 件のみ。参照元の文言・配色・装飾・アイコンは持ち込まず `--fandhe-color-*` / `--fandhe-space-*` トークンのみで組み直し。CTA は `type="button"` の静的表示。`40rem` 未満のコンテナ幅（`container-type: inline-size` のコンテナクエリ）で告知面を上・グリッドを下に縦積みし、商品グリッドも 1 列に畳む。
- 他 8 block の差分メモは公式 md を参照（`promo-background-image` は主参照 R1196（基準形）に角丸カード形 R1198 とトップページ向け大見出し形 R1202 を並記形として集約、`promo-offers-split` は主参照 R1200、`promo-signup-offer` は主参照 R0346、`promo-with-testimonials` は主参照 R1195）。
- 出典（pin SHA `cf5edb9b8f1bf2a63d51dcf50a8d2806e2d8f9f9`）: 公式 md `site/blocks/<slug>.md`、Rust ソース `crates/docs-site/src/blocks/ecommerce/promo/<slug_snake>.rs`。

## Related

- [Ecommerce Blocks overview](./overview.md)
- [Incentives](./incentives.md)
- [Category](./category.md)
- [Product List](./product-list.md)
