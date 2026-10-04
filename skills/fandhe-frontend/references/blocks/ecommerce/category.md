# Category（Ecommerce Blocks）

カテゴリ一覧・カテゴリバナーの Blocks 6 件。Blocks は新規 API ではなく既存の Themes / Primitives / core 部品の合成例であり、各 block の公開物は未公開 crate `docs-site` 内部の `pub fn demo() -> Node` と `pub const BLOCK: Block` だけである。

## Signature / Usage

カテゴリ内で最も短い `category-split-panels` の `## Rust コード`（公式 md から verbatim）。

```rust
use crate::blocks::dummy_assets;
use fandhe_frontend_core::{div, text, Node};
use fandhe_frontend_pre_styled_ui::heading::{heading, HeadingLevel, HeadingProps, HeadingSize};
use fandhe_frontend_pre_styled_ui::image::{self, ImageFit, ImageProps};
use fandhe_frontend_pre_styled_ui::link::{self, LinkProps};
use fandhe_frontend_pre_styled_ui::text::{self as styled_text, TextProps};

/// 買い物導線リンクの固定外部 URL（モジュール doc「link の `href` を
/// 固定の外部絶対 URL にする・可視テキストとの整合」節参照）。
const REPO: &str = "https://github.com/Fandhe-AI/fandhe-frontend";
const RELEASES: &str = "https://github.com/Fandhe-AI/fandhe-frontend/releases";

/// 1 パネル分のデータ（見出し・説明・背景画像・買い物導線リンク）。
struct Panel {
    title: &'static str,
    body: &'static str,
    image_src: &'static str,
    href: &'static str,
    link_label: &'static str,
}

const PANELS: [Panel; 2] = [
    Panel {
        title: "アウトドア用品",
        body: "軽量テントから調理器具まで、週末の遠出に必要な一式を集めました。",
        image_src: dummy_assets::BACKGROUND_SRC,
        href: REPO,
        link_label: "GitHub で見る",
    },
    Panel {
        title: "キッチン家電",
        body: "毎日の調理をすこし楽にする定番アイテムを集めました。",
        image_src: dummy_assets::PRODUCT_SRC,
        href: RELEASES,
        link_label: "リリースを見る",
    },
];

/// 1 パネル分の構成（背景画像 + 淡い面に重ねた見出し・説明・リンク）。
/// 画像と面を同じ `grid-area: 1 / 1` で重ねる（モジュール doc「重ね合わせ
/// は `grid-area` の共有で行う」節）。
fn panel(p: &Panel) -> Node {
    div(
        vec![("class", "blocks-category-split-panels-panel")],
        vec![
            image::image(
                &ImageProps {
                    fit: ImageFit::Cover,
                    ..ImageProps::new(p.image_src, "")
                },
                vec![("data-blocks-category-split-panels-image", "")],
            ),
            div(
                vec![("class", "blocks-category-split-panels-surface")],
                vec![
                    heading(
                        HeadingLevel::H3,
                        &HeadingProps {
                            size: HeadingSize::Xl,
                            ..HeadingProps::default()
                        },
                        vec![],
                        vec![text(p.title)],
                    ),
                    styled_text::text(&TextProps::default(), vec![], vec![text(p.body)]),
                    link::root(
                        p.href,
                        &LinkProps {
                            external: true,
                            ..LinkProps::default()
                        },
                        vec![],
                        vec![text(p.link_label)],
                    ),
                ],
            ),
        ],
    )
}

/// `category-split-panels` の Demo 本体。呼び出しごとに同一の `Node` を
/// 返す純関数。
pub fn demo() -> Node {
    div(
        vec![("class", "blocks-category-split-panels-layout")],
        vec![div(
            vec![("class", "blocks-category-split-panels-split")],
            PANELS.iter().map(panel).collect(),
        )],
    )
}
```

## Blocks

| slug | 説明 | 使用部品（BLOCK.parts） | 公式 URL |
|------|------|------------------------|----------|
| category-carousel | 見出し行（セクション見出し + 一覧ページへのリンク）の下にカテゴリタイル（画像 + 名称）を横一列に並べるカルーセル | [Heading](../../themes/typography/heading.md) / [Link](../../themes/typography/link.md) / [Carousel](../../themes/collections/carousel.md) / [Card](../../themes/data-display/card.md) / [Image](../../themes/data-display/image.md) / [Button](../../themes/forms/button.md) / [Link Overlay](../../themes/typography/link-overlay.md) / [Icon](../../themes/data-display/icon.md) | https://fandhe-ai.github.io/fandhe-frontend/blocks/category-carousel/ |
| category-featured-banner | 1 カテゴリだけを大きく扱う横長バナー。形 A は全面画像 + 半透明パネル、形 B は画像とコピー列の左右 2 分割 | [Heading](../../themes/typography/heading.md) / [Text](../../themes/typography/text.md) / [Image](../../themes/data-display/image.md) / [Link](../../themes/typography/link.md) | https://fandhe-ai.github.io/fandhe-frontend/blocks/category-featured-banner/ |
| category-grid-captioned | カテゴリ一覧（画像の下に名称と説明を置くグリッド） | [Heading](../../themes/typography/heading.md) / [Text](../../themes/typography/text.md) / [Link](../../themes/typography/link.md) / [Link Overlay](../../themes/typography/link-overlay.md) / [Image](../../themes/data-display/image.md) | https://fandhe-ai.github.io/fandhe-frontend/blocks/category-grid-captioned/ |
| category-grid-overlay | 見出し行とカテゴリ画像タイルの均等グリッド。名称と短い説明を画像下部へ重ねて表示、列数は 1 → 2 → 3 → 4 | [Heading](../../themes/typography/heading.md) / [Link](../../themes/typography/link.md) / [Link Overlay](../../themes/typography/link-overlay.md) / [Image](../../themes/data-display/image.md) / [Text](../../themes/typography/text.md) | https://fandhe-ai.github.io/fandhe-frontend/blocks/category-grid-overlay/ |
| category-mosaic-featured | 先頭タイルを大きく扱うモザイク配置。2 列 × 2 行の左列に先頭カテゴリを 2 行分、右列に残り 2 枚を縦積み | [Heading](../../themes/typography/heading.md) / [Link](../../themes/typography/link.md) / [Link Overlay](../../themes/typography/link-overlay.md) / [Image](../../themes/data-display/image.md) / [Button](../../themes/forms/button.md) | https://fandhe-ai.github.io/fandhe-frontend/blocks/category-mosaic-featured/ |
| category-split-panels | 表示幅を左右 2 等分したパネル 2 枚。背景画像の上に半透明の面を重ね見出し・説明・リンクを置く | [Heading](../../themes/typography/heading.md) / [Text](../../themes/typography/text.md) / [Image](../../themes/data-display/image.md) / [Link](../../themes/typography/link.md) | https://fandhe-ai.github.io/fandhe-frontend/blocks/category-split-panels/ |

## Notes

- `docs-site` は crates.io 未公開 crate のため `use` できる API ではない。コードをコピーして `fandhe_frontend_pre_styled_ui::*` / `fandhe_frontend_core::*` の呼び出し規約の見本として使う前提。`use crate::blocks::dummy_assets;` は docs-site 内部モジュールで、コピー時は自前の画像 URL に置き換える。
- 全 block は無 JS の静的表示で `<form>` を持たない。カテゴリ名・説明文は架空データ。
- 差分メモ（`category-split-panels`）: 見出しはページ側が `## Demo` として `h2` を出すため `HeadingLevel::H3`。参照元 R0826 の配色は持ち込まず `--fandhe-color-bg` ベースの淡い半透明面 + 既定 `--fandhe-color-fg` のトークン配色に置換（`category-featured-banner` の形 A の反転ペアとは逆の非反転ペア）。背景は共通ダミー素材、買い物導線リンクは死リンク `href="#"` を避け GitHub 固定リンク（repository ルート「GitHub で見る」・`/releases`「リリースを見る」）。レイアウト切り替えは `@media` ではなく `@container`（Demo ルートに `container-type: inline-size`、`40rem` 以上で 2 列）で、列数を変える要素は container 宣言要素とは別の内側ラッパーに分離。
- 他 5 block の差分メモは公式 md を参照（`category-featured-banner` は主参照 R0823、R0608 を集約。`category-grid-captioned` は主参照 R0824。`category-mosaic-featured` は主参照 R0821）。
- Rust ソースのディレクトリは `category_listing`（`category` ではない）。出典（pin SHA `cf5edb9b8f1bf2a63d51dcf50a8d2806e2d8f9f9`）: 公式 md `site/blocks/<slug>.md`、Rust ソース `crates/docs-site/src/blocks/ecommerce/category_listing/<slug_snake>.rs`。

## Related

- [Ecommerce Blocks overview](./overview.md)
- [Product List](./product-list.md)
- [Store Nav](./store-nav.md)
- [Promo](./promo.md)
