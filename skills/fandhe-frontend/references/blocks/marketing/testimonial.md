# Testimonial（Marketing Blocks）

Blocks は新規 API ではなく、既存の Themes / Primitives / core 部品を組み合わせた合成例。各 block の公開物は未公開 crate `docs-site` 内部の `pub fn demo() -> Node` と `pub const BLOCK: Block` のみ。Testimonial は 8 block。

## Signature / Usage

カテゴリ内で最も短い block `testimonial-background-image` の公式コード（背景画像 + スクリムの上に推薦文パネルを重ねる）。

```rust
use crate::blocks::dummy_assets;
use fandhe_frontend_core::{div, el, text, Node};
use fandhe_frontend_pre_styled_ui::blockquote::{self, BlockquoteVariant};
use fandhe_frontend_pre_styled_ui::icon::{icon, IconProps};
use fandhe_frontend_pre_styled_ui::image::{self, ImageProps};
use fandhe_frontend_pre_styled_ui::ColorPalette;
use fandhe_frontend_pre_styled_ui::Size;

const ROOT_CLASS: &str = "blocks-testimonial-background-image-root";
const BACKDROP_CLASS: &str = "blocks-testimonial-background-image-backdrop";
const SCRIM_CLASS: &str = "blocks-testimonial-background-image-scrim";
const PANEL_CLASS: &str = "blocks-testimonial-background-image-panel";
const AUTHOR_CLASS: &str = "blocks-testimonial-background-image-author";

const IMAGE_ATTR: &str = "data-blocks-testimonial-background-image-image";
const LOGO_ATTR: &str = "data-blocks-testimonial-background-image-logo";
const QUOTE_ATTR: &str = "data-blocks-testimonial-background-image-quote";
const NAME_ATTR: &str = "data-blocks-testimonial-background-image-name";
const ROLE_ATTR: &str = "data-blocks-testimonial-background-image-role";

/// 抽象図形ロゴ（六角形の輪郭。実在の企業ロゴを模さない）。
fn logo_icon(company: &str) -> Node {
    icon(
        &IconProps {
            size: Size::Xl,
            label: Some(company),
            ..IconProps::default()
        },
        vec![(LOGO_ATTR, "")],
        vec![el(
            "path",
            vec![("d", "M12 2L21 7V17L12 22L3 17V7Z")],
            vec![],
        )],
    )
}

/// `testimonial-background-image` の Demo 本体。呼び出しごとに同一の
/// `Node` を返す純関数。
pub fn demo() -> Node {
    let backdrop = div(
        vec![("class", BACKDROP_CLASS), ("aria-hidden", "true")],
        vec![
            image::image(
                &ImageProps::new(dummy_assets::BACKGROUND_SRC, ""),
                vec![(IMAGE_ATTR, "")],
            ),
            div(vec![("class", SCRIM_CLASS)], vec![]),
        ],
    );

    let quote = blockquote::root(
        BlockquoteVariant::Plain,
        ColorPalette::default(),
        vec![(QUOTE_ATTR, "")],
        vec![
            blockquote::content(vec![], vec![text(dummy_assets::TESTIMONIAL_QUOTES[0])]),
            blockquote::caption(
                vec![],
                vec![div(
                    vec![("class", AUTHOR_CLASS)],
                    vec![
                        div(
                            vec![(NAME_ATTR, "")],
                            vec![text(dummy_assets::PERSON_NAMES[0])],
                        ),
                        div(
                            vec![(ROLE_ATTR, "")],
                            vec![text(dummy_assets::JOB_TITLES[0])],
                        ),
                    ],
                )],
            ),
        ],
    );

    let panel = div(
        vec![("class", PANEL_CLASS)],
        vec![logo_icon(dummy_assets::COMPANY_NAMES[0]), quote],
    );

    div(vec![("class", ROOT_CLASS)], vec![backdrop, panel])
}
```

## Blocks

| slug | 説明 | 使用部品 | 公式 URL |
|------|------|----------|----------|
| testimonial-background-image | 背景画像の上に推薦文を重ねるセクション。暗幕（半透明のスクリム）の上の中央パネルに抽象図形ロゴ・引用文・著者名・役職を表示 | [blockquote](../../themes/typography/blockquote.md) / [image](../../themes/data-display/image.md) / [icon](../../themes/data-display/icon.md) | https://fandhe-ai.github.io/fandhe-frontend/blocks/testimonial-background-image/ |
| testimonial-card-grid | 推薦文カードグリッドのセクション | [heading](../../themes/typography/heading.md) / [text](../../themes/typography/text.md) / [card](../../themes/data-display/card.md) / [blockquote](../../themes/typography/blockquote.md) / [avatar](../../themes/data-display/avatar.md) / [button](../../themes/forms/button.md) / [icon](../../themes/data-display/icon.md) | https://fandhe-ai.github.io/fandhe-frontend/blocks/testimonial-card-grid/ |
| testimonial-centered-quote | 中央寄せの単一推薦文セクション | [blockquote](../../themes/typography/blockquote.md) / [avatar](../../themes/data-display/avatar.md) / [icon](../../themes/data-display/icon.md) / [text](../../themes/typography/text.md) | https://fandhe-ai.github.io/fandhe-frontend/blocks/testimonial-centered-quote/ |
| testimonial-masonry-grid | 高さ不揃いの推薦文グリッド | [heading](../../themes/typography/heading.md) / [text](../../themes/typography/text.md) / [card](../../themes/data-display/card.md) / [blockquote](../../themes/typography/blockquote.md) / [avatar](../../themes/data-display/avatar.md) / [icon](../../themes/data-display/icon.md) | https://fandhe-ai.github.io/fandhe-frontend/blocks/testimonial-masonry-grid/ |
| testimonial-quote-stats | 推薦文と成果を表す数値指標を並べるセクション | [blockquote](../../themes/typography/blockquote.md) / [image](../../themes/data-display/image.md) / [stat](../../themes/data-display/stat.md) / [icon](../../themes/data-display/icon.md) | https://fandhe-ai.github.io/fandhe-frontend/blocks/testimonial-quote-stats/ |
| testimonial-split-image | 人物写真と推薦文を横並びにするセクション | [blockquote](../../themes/typography/blockquote.md) / [image](../../themes/data-display/image.md) / [avatar](../../themes/data-display/avatar.md) / [rating-group](../../themes/forms/rating-group.md) / [button](../../themes/forms/button.md) / [link](../../themes/typography/link.md) / [icon](../../themes/data-display/icon.md) / [separator](../../themes/utilities/separator.md) | https://fandhe-ai.github.io/fandhe-frontend/blocks/testimonial-split-image/ |
| testimonial-two-up | 2 件の推薦文を左右に並べるセクション | [heading](../../themes/typography/heading.md) / [text](../../themes/typography/text.md) / [icon](../../themes/data-display/icon.md) / [blockquote](../../themes/typography/blockquote.md) / [avatar](../../themes/data-display/avatar.md) / [separator](../../themes/utilities/separator.md) | https://fandhe-ai.github.io/fandhe-frontend/blocks/testimonial-two-up/ |
| testimonials-stack | Motion+ の testimonials 系レイアウト（testimonial カードが積層し前面カードが強調表示される）を参照した合成例。slug は複数形 `testimonials-stack` | [card](../../themes/data-display/card.md) / [blockquote](../../themes/typography/blockquote.md) / [avatar](../../themes/data-display/avatar.md) | https://fandhe-ai.github.io/fandhe-frontend/blocks/testimonials-stack/ |

## Notes

- docs-site は crates.io 未公開のため `use` できない。各 block のコードはコピーして自アプリへ取り込む前提。一部 block のコードは docs-site 内部の `crate::blocks::dummy_assets`（ダミー素材）や `LAYOUT_CSS`（block 固有のレイアウト CSS）に依存するため、そのままではコンパイルできない。上記 Signature / Usage のコードも `dummy_assets`（背景画像・引用文・人名・役職・社名のダミー）に依存する
- 全 block は静的な表示例で `<form>` を持たない。引用文・人名・役職・社名は架空
- `testimonial-background-image` の背景画像は装飾扱い（`alt=""` + `aria-hidden="true"`）で支援技術から読み上げられない。公式ページの差分メモによると、参照元の配色・実ロゴ・実写真・実文言は持ち込まず、`--fandhe-*` トークンの反転ペア（`color-mix()`）・抽象図形ロゴ・共通ダミー素材へ置き換え、全画面の高さ表示は Demo 枠内に収めるため `min-height` に変更している
- 出典（pin SHA `cf5edb9b8f1bf2a63d51dcf50a8d2806e2d8f9f9`）: `site/blocks/<slug>.md`、`crates/docs-site/src/blocks/marketing/testimonial/<slug_snake>.rs`。`rust` フェンスは rs の `// blocks-code:begin` 〜 `end` 範囲と一致

## Related

- [overview.md](./overview.md)
- [blockquote](../../themes/typography/blockquote.md)
- [avatar](../../themes/data-display/avatar.md)
- [card](../../themes/data-display/card.md)
