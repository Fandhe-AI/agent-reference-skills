# Product List（Ecommerce Blocks）

商品一覧（グリッド・カルーセル・リッチカード）の Blocks 4 件。Blocks は新規 API ではなく既存の Themes / Primitives / core 部品の合成例であり、各 block の公開物は未公開 crate `docs-site` 内部の `pub fn demo() -> Node` と `pub const BLOCK: Block` だけである。

## Signature / Usage

カテゴリ内で最も短い `product-list-bordered-grid` の `## Rust コード` の冒頭抜粋。

```rust
use crate::blocks::dummy_assets;
use fandhe_frontend_core::{div, text as core_text, Node};
use fandhe_frontend_pre_styled_ui::image::{self, AspectRatio, ImageProps};
use fandhe_frontend_pre_styled_ui::link::{self, LinkProps};
use fandhe_frontend_pre_styled_ui::link_overlay::{self, overlay};
use fandhe_frontend_pre_styled_ui::rating_group::{
    self, RatingGroup, RatingGroupProps, RatingItemFlags,
};
use fandhe_frontend_pre_styled_ui::recipe::ColorPalette;
use fandhe_frontend_pre_styled_ui::text::{
    self as styled_text, TextProps, TextSize, TextVariant, TextWeight,
};
use fandhe_frontend_pre_styled_ui::visually_hidden;
use fandhe_frontend_pre_styled_ui::Size;

/// 遷移先の固定外部 URL（モジュール doc「リンク先の方針」節参照）。
const REPO: &str = "https://github.com/Fandhe-AI/fandhe-frontend";

/// 評価ラベル（`rating_group::label` の `id`）の接頭辞。セルごとに
/// `{PREFIX}-{index}` で一意にする（モジュール doc「評価のアクセシブル
/// ネーム」節参照）。
const RATING_LABEL_ID_PREFIX: &str = "blocks-product-list-bordered-grid-rating-label";

/// 1 件分の架空商品データ（実在の企業・ブランドとは無関係）。
struct Product {
    name: &'static str,
    price: &'static str,
    /// 5 段階評価の塗り数（1〜5）。
    rating: u32,
    /// 可視テキストで表示するレビュー件数。
    reviews: u32,
}

/// Demo に並べる架空の商品 8 件（2 列・4 列いずれでも端数が出ない件数）。
const PRODUCTS: [Product; 8] = [
    Product {
        name: "キャンバストートバッグ",
        price: "¥3,980",
        rating: 4,
        reviews: 56,
    },
    Product {
        name: "セラミックマグカップ",
        price: "¥1,980",
        rating: 5,
        reviews: 128,
    },
    Product {
        name: "ウールニットマフラー",
        price: "¥5,480",
        rating: 4,
        reviews: 34,
    },
    Product {
        name: "レザーカードケース",
        price: "¥4,280",
        rating: 3,
        reviews: 19,
    },
    Product {
        name: "アロマキャンドル",
        price: "¥2,480",
        rating: 5,
        reviews: 73,
    },
    Product {
        name: "ガラス製花瓶",
        price: "¥3,280",
        rating: 4,
        reviews: 41,
    },
    Product {
        name: "コットンクッションカバー",
        price: "¥2,180",
        rating: 4,
        reviews: 27,
    },
    Product {
        name: "木製コースター 4 枚セット",
        price: "¥1,680",
        rating: 5,
        reviews: 62,
    },
];
// ...（以下省略。全文は公式ページ https://fandhe-ai.github.io/fandhe-frontend/blocks/product-list-bordered-grid/ の「Rust コード」を参照）
```

## Blocks

| slug | 説明 | 使用部品（BLOCK.parts） | 公式 URL |
|------|------|------------------------|----------|
| product-list-bordered-grid | 罫線で仕切ったセル状の商品一覧グリッド。画像・商品名・評価・レビュー件数・価格を中央寄せ、狭い幅 2 列 / 広い幅 4 列 | [Image](../../themes/data-display/image.md) / [Link](../../themes/typography/link.md) / [Link Overlay](../../themes/typography/link-overlay.md) / [Rating Group](../../themes/forms/rating-group.md) / [Text](../../themes/typography/text.md) / [Visually Hidden](../../themes/utilities/visually-hidden.md) | https://fandhe-ai.github.io/fandhe-frontend/blocks/product-list-bordered-grid/ |
| product-list-carousel | 見出し行（セクション見出し + 一覧ページへのリンク）の下に商品カード（画像 + 商品名リンク + 価格）を横一列に並べるカルーセル | [Heading](../../themes/typography/heading.md) / [Carousel](../../themes/collections/carousel.md) / [Card](../../themes/data-display/card.md) / [Image](../../themes/data-display/image.md) / [Link](../../themes/typography/link.md) / [Button](../../themes/forms/button.md) / [Color Swatch](../../themes/data-display/color-swatch.md) / [Text](../../themes/typography/text.md) / [Icon](../../themes/data-display/icon.md) | https://fandhe-ai.github.io/fandhe-frontend/blocks/product-list-carousel/ |
| product-list-rich-cards | 評価・色見本・お気に入り/カート追加ボタン付きの商品一覧カード | [Image](../../themes/data-display/image.md) / [Badge](../../themes/data-display/badge.md) / [Card](../../themes/data-display/card.md) / [Link](../../themes/typography/link.md) / [Text](../../themes/typography/text.md) / [Rating Group](../../themes/forms/rating-group.md) / [Color Swatch](../../themes/data-display/color-swatch.md) / [Button](../../themes/forms/button.md) / [Icon](../../themes/data-display/icon.md) | https://fandhe-ai.github.io/fandhe-frontend/blocks/product-list-rich-cards/ |
| product-list-simple-grid | シンプルなグリッドの商品一覧 | [Heading](../../themes/typography/heading.md) / [Text](../../themes/typography/text.md) / [Link](../../themes/typography/link.md) / [Link Overlay](../../themes/typography/link-overlay.md) / [Image](../../themes/data-display/image.md) / [Card](../../themes/data-display/card.md) / [Visually Hidden](../../themes/utilities/visually-hidden.md) | https://fandhe-ai.github.io/fandhe-frontend/blocks/product-list-simple-grid/ |

## Notes

- 上記コードは公式 md `## Rust コード` の冒頭抜粋（元は約 243 行）。全文は公式ページを参照する。
- `docs-site` は crates.io 未公開 crate のため `use` できる API ではない。コードをコピーして `fandhe_frontend_pre_styled_ui::*` / `fandhe_frontend_core::*` の呼び出し規約の見本として使う前提。`use crate::blocks::dummy_assets;` は docs-site 内部モジュールで、コピー時は自前の画像 URL に置き換える。
- 全 block は無 JS の静的表示で `<form>` を持たない。商品名・価格・レビュー件数は架空データ。
- 差分メモ（`product-list-bordered-grid`）: 主参照は対応表 ID R1170 で、参照元ファイルが参照できないため Issue 本文の文章仕様（罫線区切り・中央寄せ・2〜4 列）から独自に再構成。レビュー件数は遷移先の Reviews block が当時未登録のためリンクにせず可視テキスト。評価は `readonly` の静的表示で、ラベルは `visually-hidden` で「5 段階中 n」を読み上げ専用に与える。商品数は 2 列でも 4 列でも端数が出ない 8 件で、3 列段は設けない。画像は全セルで同じ同梱 SVG プレースホルダー。
- 他 3 block の差分メモは公式 md を参照（`product-list-rich-cards` は主参照 R0208、集約元 R0209・R0210・R0211・R0212・R1167）。
- 出典（pin SHA `cf5edb9b8f1bf2a63d51dcf50a8d2806e2d8f9f9`）: 公式 md `site/blocks/<slug>.md`、Rust ソース `crates/docs-site/src/blocks/ecommerce/product_list/<slug_snake>.rs`。

## Related

- [Ecommerce Blocks overview](./overview.md)
- [Product Overview](./product-overview.md)
- [Category](./category.md)
- [Filter](./filter.md)
- [Reviews](./reviews.md)
