# Quickview（Ecommerce Blocks）

商品一覧から開く商品クイックビューの Blocks 1 件。Blocks は新規 API ではなく既存の Themes / Primitives / core 部品の合成例であり、block の公開物は未公開 crate `docs-site` 内部の `pub fn demo() -> Node` と `pub const BLOCK: Block` だけである。

## Signature / Usage

カテゴリ内で最も短い（唯一の）`quickview-image-split` の `## Rust コード` の冒頭抜粋。

```rust
use crate::blocks::dummy_assets;
use fandhe_frontend_core::{div, el, text, Node};
use fandhe_frontend_pre_styled_ui::button::{button, ButtonProps};
use fandhe_frontend_pre_styled_ui::color_swatch::{
    self, Color, ColorSwatchProps, Rgb, SwatchShape,
};
use fandhe_frontend_pre_styled_ui::dialog::{self, ContentIds, DialogRole, OpenState};
use fandhe_frontend_pre_styled_ui::image::{image, AspectRatio, ImageFit, ImageProps, ImageShape};
use fandhe_frontend_pre_styled_ui::link::{self, LinkProps};
use fandhe_frontend_pre_styled_ui::radio_card::{self, Orientation as RadioCardOrientation};
use fandhe_frontend_pre_styled_ui::rating_group::{
    self, RatingGroup, RatingGroupProps, RatingItemFlags,
};
use fandhe_frontend_pre_styled_ui::recipe::Size;
use fandhe_frontend_pre_styled_ui::text::{self as styled_text, TextProps, TextSize, TextVariant};
use fandhe_frontend_pre_styled_ui::ColorPalette;

/// [`dialog::content`] の `id`。
const CONTENT_ID: &str = "blocks-quickview-image-split-content";
/// [`dialog::title`]（商品名）の `id`（[`dialog::content`] の
/// `labelledby` と対）。
const TITLE_ID: &str = "blocks-quickview-image-split-title";
/// 評価ラベル（`rating_group::label` の `id`）。
const RATING_LABEL_ID: &str = "blocks-quickview-image-split-rating-label";
/// 色選択見出し（`radio_card::label` の `id`）。
const COLOR_LABEL_ID: &str = "blocks-quickview-image-split-color-label";
/// サイズ選択見出し（`radio_card::label` の `id`）。
const SIZE_LABEL_ID: &str = "blocks-quickview-image-split-size-label";
/// 色選択 radio card のネイティブ `name`。
const COLOR_NAME: &str = "blocks-quickview-image-split-color";
/// サイズ選択 radio card のネイティブ `name`。
const SIZE_NAME: &str = "blocks-quickview-image-split-size";
/// 詳細リンクの遷移先。同じ `/blocks/` 索引配下の商品詳細 block へ向ける
/// （モジュール doc「詳細リンク」節参照、`href="#"` は使わない）。
const PRODUCT_DETAIL_HREF: &str = "../product-overview-gallery-split/";

/// 色見本の RGB 定義（架空の色名に対応する任意の色、実在ブランドカラーを
/// 模したものではない。`product_overview_gallery_split.rs::swatch_color`
/// と同型）。
fn swatch_color(hex: (u8, u8, u8)) -> Color {
    Color::from_rgb(Rgb::new(hex.0, hex.1, hex.2))
}

/// 色・サイズ選択共通の radio card 1 件（ネイティブ disabled のまま用いる、
/// モジュール doc「色選択・サイズ選択」節参照）。`swatch` が `Some` のとき
/// のみ色見本を item-content の先頭へ置く。
fn option_item(
    name: &str,
    checked: bool,
    value: &'static str,
    label: &str,
    swatch: Option<Color>,
) -> Node {
    let mut content_children: Vec<Node> = Vec::new();
    if let Some(color) = swatch {
        content_children.push(color_swatch::color_swatch(
            &ColorSwatchProps {
                value: color,
                size: Size::Sm,
                shape: SwatchShape::Circle,
            },
            vec![("aria-hidden", "true")],
            vec![],
        ));
    }
    content_children.push(radio_card::item_text(vec![], vec![text(label)]));

    radio_card::item(
        checked,
        true,
        value,
        vec![],
        vec![
            radio_card::item_hidden_input(checked, true, Some(name), value, vec![]),
            radio_card::item_control(
                checked,
                true,
                vec![],
                vec![
                    radio_card::item_indicator(checked, true, false, vec![]),
                    radio_card::item_content(vec![], content_children),
                ],
            ),
        ],
    )
}
// ...（以下省略。全文は公式ページ https://fandhe-ai.github.io/fandhe-frontend/blocks/quickview-image-split/ の「Rust コード」を参照）
```

## Blocks

| slug | 説明 | 使用部品（BLOCK.parts） | 公式 URL |
|------|------|------------------------|----------|
| quickview-image-split | 商品一覧から開くクイックビュー。ダイアログ内を左右 2 カラムに分け、左に商品画像、右に商品名・価格・評価・色選択・サイズ選択・カート追加ボタン。コンテナ幅 40rem 未満では画像が上に積まれる | [Dialog](../../themes/overlays/dialog.md) / [Image](../../themes/data-display/image.md) / [Text](../../themes/typography/text.md) / [Rating Group](../../themes/forms/rating-group.md) / [Radio Card](../../themes/forms/radio-card.md) / [Color Swatch](../../themes/data-display/color-swatch.md) / [Button](../../themes/forms/button.md) / [Link](../../themes/typography/link.md) | https://fandhe-ai.github.io/fandhe-frontend/blocks/quickview-image-split/ |

## Notes

- 上記コードは公式 md `## Rust コード` の冒頭抜粋（元は約 312 行）。全文は公式ページを参照する。
- `docs-site` は crates.io 未公開 crate のため `use` できる API ではない。コードをコピーして `fandhe_frontend_pre_styled_ui::*` / `fandhe_frontend_core::*` の呼び出し規約の見本として使う前提。`use crate::blocks::dummy_assets;` は docs-site 内部モジュールで、コピー時は自前の画像 URL に置き換える。
- 無 JS の静的表示（開状態のダイアログを固定描画）で `<form>` を持たない。開閉・選択・カート追加の処理はなく、操作要素はすべてネイティブ `disabled`。
- 差分メモ: 主参照は対応表 ID R1181（集約元 R1182 / R1183 / R1184）。サイズガイドへのリンクは実在の遷移先がないため置かず、詳細リンクは実在する相対パス（`../product-overview-gallery-split/`）。R1182 は詳細リンクなし・サイズ選択 8 段、R1183 は色選択なしで `radio_card::item_description` 付きの大きいサイズカード、R1184 はサイズ選択グループ自体を持たない構成。
- 出典（pin SHA `cf5edb9b8f1bf2a63d51dcf50a8d2806e2d8f9f9`）: 公式 md `site/blocks/quickview-image-split.md`、Rust ソース `crates/docs-site/src/blocks/ecommerce/quickview/quickview_image_split.rs`。

## Related

- [Ecommerce Blocks overview](./overview.md)
- [Product List](./product-list.md)
- [Product Overview](./product-overview.md)
- [Cart](./cart.md)
