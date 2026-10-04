# Product Overview（Ecommerce Blocks）

商品詳細（画像・商品名・価格・評価・サイズ/色選択・カート追加）の Blocks 4 件。Blocks は新規 API ではなく既存の Themes / Primitives / core 部品の合成例であり、各 block の公開物は未公開 crate `docs-site` 内部の `pub fn demo() -> Node` と `pub const BLOCK: Block` だけである。

## Signature / Usage

カテゴリ内で最も短い `product-overview-featured-split` の `## Rust コード` の冒頭抜粋。

```rust
use crate::blocks::dummy_assets;
use fandhe_frontend_core::{div, el, text, Node};
use fandhe_frontend_pre_styled_ui::breadcrumb::{self, BreadcrumbVariant};
use fandhe_frontend_pre_styled_ui::button::{self, ButtonProps};
use fandhe_frontend_pre_styled_ui::heading::{self, HeadingLevel, HeadingProps, HeadingSize};
use fandhe_frontend_pre_styled_ui::icon::{self, IconProps};
use fandhe_frontend_pre_styled_ui::image::{self, AspectRatio, ImageProps};
use fandhe_frontend_pre_styled_ui::radio_card::{self, Orientation as RadioCardOrientation};
use fandhe_frontend_pre_styled_ui::rating_group::{
    self, RatingGroup, RatingGroupProps, RatingItemFlags,
};
use fandhe_frontend_pre_styled_ui::text::{self as styled_text, TextProps, TextSize, TextVariant};
use fandhe_frontend_pre_styled_ui::{ColorPalette, Size};

/// 評価ラベル（`rating_group::label` の `id`）。他 block との重複を避ける
/// ため本 block 名を含む（モジュール doc「id を block 固有の定数にする
/// 理由」節参照）。
const RATING_LABEL_ID: &str = "blocks-product-overview-featured-split-rating-label";
/// サイズ選択見出し（`radio_card::label` の `id`）。
const SIZE_LABEL_ID: &str = "blocks-product-overview-featured-split-size-label";
/// サイズ選択 radio card のネイティブ `name`（フォーム未送信のため排他
/// 選択の実効はないが、[`radio_card::item_hidden_input`] の契約上必須）。
const SIZE_NAME: &str = "blocks-product-overview-featured-split-size";

/// パンくず。`href="#"` は使わず実在する相対パスへ向ける
/// （モジュール doc「`<form>` を持たない」節参照）。
fn product_breadcrumb() -> Node {
    breadcrumb::root(
        Size::Sm,
        BreadcrumbVariant::default(),
        Some("パンくず"),
        vec![],
        vec![breadcrumb::list(
            vec![],
            vec![
                breadcrumb::item(
                    vec![],
                    vec![breadcrumb::link("../../", vec![], vec![text("ホーム")])],
                ),
                breadcrumb::separator(vec![], vec![text("/")]),
                breadcrumb::item(
                    vec![],
                    vec![breadcrumb::link("../", vec![], vec![text("Blocks")])],
                ),
                breadcrumb::separator(vec![], vec![text("/")]),
                breadcrumb::item(
                    vec![],
                    vec![breadcrumb::current_link(
                        vec![],
                        vec![text("保温ステンレスボトル")],
                    )],
                ),
            ],
        )],
    )
}

/// 評価行（`rating-group`、readonly。現在の評価をラベルで明文化する、
/// `product_overview_gallery_split.rs::rating_row` と同型の判断）。
fn rating_row() -> Node {
    let rating_props = RatingGroupProps {
        disabled: false,
        readonly: true,
        required: false,
    };
    let rating_group_state = RatingGroup::new(5, Some(4), true);
    let rating_label = rating_group::label(
        &rating_props,
        Some(RATING_LABEL_ID),
        vec![],
        vec![text("評価 4.0（52 件）")],
    );
    let rating_items: Vec<Node> = (1..=rating_group_state.count())
        .map(|i| {
            rating_group::item(
                i,
                RatingItemFlags {
                    checked: rating_group_state.is_checked(i),
                    highlighted: rating_group_state.is_highlighted(i),
                    disabled: false,
                    readonly: true,
                },
                &format!("{i} star{}", if i == 1 { "" } else { "s" }),
                vec![],
                vec![],
            )
        })
        .collect();
// ...（以下省略。全文は公式ページ https://fandhe-ai.github.io/fandhe-frontend/blocks/product-overview-featured-split/ の「Rust コード」を参照）
```

## Blocks

| slug | 説明 | 使用部品（BLOCK.parts） | 公式 URL |
|------|------|------------------------|----------|
| product-overview-featured-split | 単一の大きな商品画像と特徴説明を持つ商品詳細。広い画面は 2 カラム、`48rem` 未満は 1 列で画像を情報の間へ挟む | [Breadcrumb](../../themes/navigation/breadcrumb.md) / [Heading](../../themes/typography/heading.md) / [Text](../../themes/typography/text.md) / [Image](../../themes/data-display/image.md) / [Radio Card](../../themes/forms/radio-card.md) / [Rating Group](../../themes/forms/rating-group.md) / [Button](../../themes/forms/button.md) / [Icon](../../themes/data-display/icon.md) | https://fandhe-ai.github.io/fandhe-frontend/blocks/product-overview-featured-split/ |
| product-overview-gallery-split | サムネイル付きギャラリーと購入パネルを持つ商品詳細 | [Image](../../themes/data-display/image.md) / [Carousel](../../themes/collections/carousel.md) / [Heading](../../themes/typography/heading.md) / [Text](../../themes/typography/text.md) / [Rating Group](../../themes/forms/rating-group.md) / [Radio Card](../../themes/forms/radio-card.md) / [Color Swatch](../../themes/data-display/color-swatch.md) / [Button](../../themes/forms/button.md) / [Accordion](../../themes/disclosure/accordion.md) / [Breadcrumb](../../themes/navigation/breadcrumb.md) / [Progress](../../themes/feedback/progress.md) / [Dialog](../../themes/overlays/dialog.md) / [Link](../../themes/typography/link.md) | https://fandhe-ai.github.io/fandhe-frontend/blocks/product-overview-gallery-split/ |
| product-overview-image-grid | 商品画像グリッドと購入パネル（商品名・価格・評価・色/サイズ選択・カート追加・説明）を持つ商品詳細 | [Breadcrumb](../../themes/navigation/breadcrumb.md) / [Image](../../themes/data-display/image.md) / [Heading](../../themes/typography/heading.md) / [Text](../../themes/typography/text.md) / [Rating Group](../../themes/forms/rating-group.md) / [Radio Card](../../themes/forms/radio-card.md) / [Color Swatch](../../themes/data-display/color-swatch.md) / [Button](../../themes/forms/button.md) | https://fandhe-ai.github.io/fandhe-frontend/blocks/product-overview-image-grid/ |
| product-overview-tabs-below | 商品詳細ページの構成例（画像・評価・購入ボタンに加え list / link / avatar を使う下部コンテンツ） | [Image](../../themes/data-display/image.md) / [Heading](../../themes/typography/heading.md) / [Text](../../themes/typography/text.md) / [Rating Group](../../themes/forms/rating-group.md) / [Button](../../themes/forms/button.md) / [List](../../themes/typography/list.md) / [Link](../../themes/typography/link.md) / [Avatar](../../themes/data-display/avatar.md) | https://fandhe-ai.github.io/fandhe-frontend/blocks/product-overview-tabs-below/ |

## Notes

- 上記コードは公式 md `## Rust コード` の冒頭抜粋（元は約 355 行）。全文は公式ページを参照する。
- `docs-site` は crates.io 未公開 crate のため `use` できる API ではない。コードをコピーして `fandhe_frontend_pre_styled_ui::*` / `fandhe_frontend_core::*` の呼び出し規約の見本として使う前提。`use crate::blocks::dummy_assets;` は docs-site 内部モジュールで、コピー時は自前の画像 URL に置き換える。
- 全 block は無 JS の静的表示で `<form>` を持たない。購入ボタンは `disabled` 固定、サイズ選択はネイティブ `disabled` の radio card。商品名・価格・評価件数は架空データ。
- 差分メモ（`product-overview-featured-split`）: 主参照・集約元は対応表 ID R1177 の 1 件のみで状態違い（在庫切れ版等）は併記しない。`48rem` のブレークポイントは CSS メディアクエリのため同一ページ内で狭い幅を静的再現できず、`cargo test` による出力検証のみ。狭い幅での画像の挟み込みは `display: none` や DOM 重複ではなく `grid-template-areas` の切り替えのみ（DOM 順は常に `summary → media → details`）。
- 他 3 block の差分メモは公式 md を参照（`gallery-split` は主参照 R0611、集約元 R0613・R0614・R0615・R0616・R0617・R1176。`image-grid` は主参照 R1178）。
- 出典（pin SHA `cf5edb9b8f1bf2a63d51dcf50a8d2806e2d8f9f9`）: 公式 md `site/blocks/<slug>.md`、Rust ソース `crates/docs-site/src/blocks/ecommerce/product_overview/<slug_snake>.rs`。

## Related

- [Ecommerce Blocks overview](./overview.md)
- [Product List](./product-list.md)
- [Quickview](./quickview.md)
- [Cart](./cart.md)
