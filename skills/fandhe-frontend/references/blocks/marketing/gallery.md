# Gallery（Marketing Blocks）

画像ギャラリー（グリッド・段組み・カルーセル）向け block 4 件。blocks は新規 API ではなく既存の Themes / Primitives / core 部品の合成例で、各 block の公開物は未公開 crate `docs-site` 内部の `pub fn demo() -> Node` と `pub const BLOCK: Block` だけである。

## Signature / Usage

カテゴリ内で最も短い `gallery-masonry`（CSS 段組みの masonry 風ギャラリー）の公式 `## Rust コード` を原文のまま掲載する。

```rust
use crate::blocks::dummy_assets;
use fandhe_frontend_core::{div, text, Node};
use fandhe_frontend_pre_styled_ui::badge::{self, BadgeProps};
use fandhe_frontend_pre_styled_ui::heading::{
    self as styled_heading, HeadingLevel, HeadingProps, HeadingSize,
};
use fandhe_frontend_pre_styled_ui::image::{self, AspectRatio, ImageProps, ImageShape};
use fandhe_frontend_pre_styled_ui::text::{self as styled_text, TextProps, TextVariant};

/// 段組みタイル 1 枚分の比率指定。`ratio_override` が `Some` のときは
/// `aspect` を [`AspectRatio::Auto`] にしたうえでラッパ属性値として使う
/// （モジュール doc「比率の与え方」節）。
struct Item {
    aspect: AspectRatio,
    ratio_override: Option<&'static str>,
}

const ITEMS: [Item; 9] = [
    Item {
        aspect: AspectRatio::Portrait,
        ratio_override: None,
    },
    Item {
        aspect: AspectRatio::Landscape,
        ratio_override: None,
    },
    Item {
        aspect: AspectRatio::Auto,
        ratio_override: Some("tall"),
    },
    Item {
        aspect: AspectRatio::Square,
        ratio_override: None,
    },
    Item {
        aspect: AspectRatio::Video,
        ratio_override: None,
    },
    Item {
        aspect: AspectRatio::Portrait,
        ratio_override: None,
    },
    Item {
        aspect: AspectRatio::Auto,
        ratio_override: Some("wide"),
    },
    Item {
        aspect: AspectRatio::Landscape,
        ratio_override: None,
    },
    Item {
        aspect: AspectRatio::Square,
        ratio_override: None,
    },
];

/// 見出しエリア（タグライン → 見出し → 説明）。
fn header() -> Node {
    let eyebrow = badge::badge(&BadgeProps::default(), vec![], vec![text("Gallery")]);
    let title = styled_heading::heading(
        HeadingLevel::H3,
        &HeadingProps {
            size: HeadingSize::Xl3,
            ..HeadingProps::default()
        },
        vec![],
        vec![text("比率違いの画像を段組みで流し込む")],
    );
    let lead = styled_text::text(
        &TextProps {
            variant: TextVariant::Muted,
            ..TextProps::default()
        },
        vec![],
        vec![text(
            "比率の異なる 9 枚の画像を CSS の段組みへ流し込みます。sm 未満は 1 段、sm 以上で 2 段、lg 以上で 3 段になります。",
        )],
    );
    div(
        vec![("class", "blocks-gallery-masonry-header")],
        vec![eyebrow, title, lead],
    )
}

/// 段組み 1 タイル分（画像 1 枚）。`ratio_override` があればラッパへ
/// `data-blocks-gallery-masonry-ratio` 属性を付与する。
fn item(entry: &Item) -> Node {
    let mut attrs = vec![("class", "blocks-gallery-masonry-item")];
    if let Some(ratio) = entry.ratio_override {
        attrs.push(("data-blocks-gallery-masonry-ratio", ratio));
    }
    div(
        attrs,
        vec![image::image(
            &ImageProps {
                aspect_ratio: entry.aspect,
                shape: ImageShape::Rounded,
                ..ImageProps::new(dummy_assets::PRODUCT_SRC, "")
            },
            vec![("data-blocks-gallery-masonry-image", "")],
        )],
    )
}

/// `gallery-masonry` の Demo 本体。呼び出しごとに同一の `Node` を返す
/// 純関数。
pub fn demo() -> Node {
    let grid = div(
        vec![("class", "blocks-gallery-masonry-grid")],
        ITEMS.iter().map(item).collect(),
    );
    div(
        vec![("class", "blocks-gallery-masonry-stack")],
        vec![header(), grid],
    )
}
```

## Blocks

| Block | Description | 使用部品 | 公式 URL |
| --- | --- | --- | --- |
| `gallery-carousel` | 作品を 1 枚ずつ送るギャラリー用カルーセル。1 枚目が選択済みの静的描画で、前/次ボタンとインジケーターは無効状態。前/次ボタンは画像の外側で横一列。1 枚ずつ送る基準形、lg（64rem）以上で 2 枚同時表示する形、3 枚同時表示する形などを並記 | [Badge](../../themes/data-display/badge.md) / [Heading](../../themes/typography/heading.md) / [Text](../../themes/typography/text.md) / [Carousel](../../themes/collections/carousel.md) / [Image](../../themes/data-display/image.md) / [Button](../../themes/forms/button.md) / [Icon](../../themes/data-display/icon.md) | https://fandhe-ai.github.io/fandhe-frontend/blocks/gallery-carousel/ |
| `gallery-image-grid` | 画像グリッドのギャラリー。タグライン・見出し・説明の下に、1 枚フル幅の最小形、正方形 2 枚、md 以上で 3 列の基準形、md 以上で 4 列などの列数・枚数の異なる 6 パターンを並べる | [Badge](../../themes/data-display/badge.md) / [Heading](../../themes/typography/heading.md) / [Text](../../themes/typography/text.md) / [Image](../../themes/data-display/image.md) | https://fandhe-ai.github.io/fandhe-frontend/blocks/gallery-image-grid/ |
| `gallery-masonry` | 段組み配置のギャラリー。比率の異なる 9 枚の画像を CSS の `column-count` へ流し込む素朴な masonry 風表示。sm（640px）未満は 1 段、sm 以上で 2 段、lg（1024px）以上で 3 段 | [Badge](../../themes/data-display/badge.md) / [Heading](../../themes/typography/heading.md) / [Text](../../themes/typography/text.md) / [Image](../../themes/data-display/image.md) | https://fandhe-ai.github.io/fandhe-frontend/blocks/gallery-masonry/ |
| `gallery-split-carousel` | 見出し（badge / heading / text / button）を左、カルーセルを右に横並びにした Blocks。lg（1024px）以上で 2 列、それ未満は縦積み。右列は次の画像の端を覗かせる peek 表示で、前後ボタンは表示領域の下に右寄せ。前後・CTA ボタンはすべて disabled | [Badge](../../themes/data-display/badge.md) / [Heading](../../themes/typography/heading.md) / [Text](../../themes/typography/text.md) / [Carousel](../../themes/collections/carousel.md) / [Image](../../themes/data-display/image.md) / [Button](../../themes/forms/button.md) / [Icon](../../themes/data-display/icon.md) | https://fandhe-ai.github.io/fandhe-frontend/blocks/gallery-split-carousel/ |

## Notes

- `docs-site` crate は crates.io 未公開。`demo()` と `BLOCK` は利用者が `use` できる API ではなく、コードをコピーして改変する前提の例である。
- 上のフェンスの `use crate::blocks::dummy_assets;` と `dummy_assets::PRODUCT_SRC` は docs サイト内部の非公開ヘルパ（ダミー画像素材）。コピー時は自前の画像 URL に差し替える。
- `blocks-gallery-*` などのクラス名に当たるレイアウト CSS（`column-count` による段数切替を含む）は `Block.layout_css`（`LayoutCss`）として `.rs` 側に別途登録されており、公式 md のフェンスには含まれない。Rust コードだけではレイアウトのスタイルは付かない。
- 代表 block `gallery-masonry` の差分メモ（各 block ページ末尾に個別記載）: 比率は image 部品の variant 4 種（正方形・横長・縦長・動画サムネイル比）と配置側の直接指定 2 種（2:3・3:2）の計 6 種に絞った、2 段への切替を sm（640px）にした、`column-count` は上から下へ詰めてから次の段へ移るためグリッドのような行揃えにはならない、画像は `alt=""`（装飾扱い）。
- カルーセル系 block は無 JS の静的描画のため、前後ボタン・インジケーターは操作できない。静的な合成例で `<form>` は使わず、送信処理・データ取得も持たない。
- 出典（pin SHA `cf5edb9b8f1bf2a63d51dcf50a8d2806e2d8f9f9`）: `crates/docs-site/src/blocks/marketing/gallery/<slug_snake>.rs`、`site/blocks/<slug>.md`。

## Related

- [Marketing Blocks 概要](./overview.md)
- [Image](../../themes/data-display/image.md)
- [Carousel](../../themes/collections/carousel.md)
