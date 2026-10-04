# Content（Marketing Blocks）

記事本文・2 列コンテンツ・画面画像付き本文などのコンテンツ領域向け block 6 件。blocks は新規 API ではなく既存の Themes / Primitives / core 部品の合成例で、各 block の公開物は未公開 crate `docs-site` 内部の `pub fn demo() -> Node` と `pub const BLOCK: Block` だけである。

## Signature / Usage

カテゴリ内で最も短い `content-columns-screenshot`（eyebrow badge + 見出し + 2 列本文 + CTA + 画面画像）の公式 `## Rust コード` を原文のまま掲載する。

```rust
use crate::blocks::dummy_assets;
use fandhe_frontend_core::{div, text, Node};
use fandhe_frontend_pre_styled_ui::badge::{self, BadgeProps};
use fandhe_frontend_pre_styled_ui::button::{self, ButtonProps};
use fandhe_frontend_pre_styled_ui::heading::{
    heading, HeadingLevel, HeadingProps, HeadingSize, HeadingWeight,
};
use fandhe_frontend_pre_styled_ui::image::{self, ImageProps, ImageShape};
use fandhe_frontend_pre_styled_ui::text::{self as styled_text, TextProps, TextVariant};

/// 本文 2 列それぞれの段落群（架空文言、1〜2 文程度に短くして検索
/// インデックスのサイズを抑える。§8「検索インデックスのサイズ」参照）。
const COLUMNS: [&[&str]; 2] = [
    &[
        "テキストは既定エスケープを経由した `text()` ノードとしてのみ差し込みます。",
        "エスケープを迂回する明示的なオプトイン API を使わない限り、渡した文字列が構造化タグとして解釈されることはありません。",
    ],
    &[
        "画面の骨格はノード木 API で組み立てるため、文字列結合による HTML 生成は発生しません。",
        "この Demo 自体も送信処理・データ取得を持たない静的な表示です。",
    ],
];

/// 本文 1 列分（段落を `styled_text::text` で並べる）。
fn column(paragraphs: &[&str]) -> Node {
    div(
        vec![("class", "blocks-content-columns-screenshot-column")],
        paragraphs
            .iter()
            .map(|paragraph| {
                styled_text::text(
                    &TextProps {
                        variant: TextVariant::Muted,
                        ..TextProps::default()
                    },
                    vec![("data-blocks-content-columns-screenshot-paragraph", "")],
                    vec![text(*paragraph)],
                )
            })
            .collect(),
    )
}

/// `content-columns-screenshot` の Demo 本体。呼び出しごとに同一の
/// `Node` を返す純関数（モジュール doc「レイアウトとブレークポイント」
/// 節）。
pub fn demo() -> Node {
    let header = div(
        vec![("class", "blocks-content-columns-screenshot-header")],
        vec![
            badge::badge(
                &BadgeProps::default(),
                vec![("data-blocks-content-columns-screenshot-eyebrow", "")],
                vec![text("導入ガイド")],
            ),
            heading(
                HeadingLevel::H3,
                &HeadingProps {
                    size: HeadingSize::Xl3,
                    weight: HeadingWeight::Bold,
                },
                vec![],
                vec![text("既存部品だけで画面を組み立てる")],
            ),
        ],
    );

    let columns = div(
        vec![("class", "blocks-content-columns-screenshot-columns")],
        COLUMNS
            .iter()
            .map(|paragraphs| column(paragraphs))
            .collect(),
    );

    let actions = div(
        vec![("class", "blocks-content-columns-screenshot-actions")],
        vec![button::button(
            &ButtonProps::default(),
            vec![],
            vec![text("ドキュメントを読む")],
        )],
    );

    let shot = div(
        vec![("class", "blocks-content-columns-screenshot-shot")],
        vec![image::image(
            &ImageProps {
                shape: ImageShape::Rounded,
                ..ImageProps::new(dummy_assets::SCREENSHOT_SRC, "")
            },
            vec![("data-blocks-content-columns-screenshot-image", "")],
        )],
    );

    div(
        vec![("class", "blocks-content-columns-screenshot-layout")],
        vec![header, columns, actions, shot],
    )
}
```

## Blocks

| Block | Description | 使用部品 | 公式 URL |
| --- | --- | --- | --- |
| `content-article-toc` | 目次付きの記事本文。上段が記事ヘッダー（見出し・カバー画像・メタ情報）、下段が本文とページ内目次の 2 列で、lg（64rem）以上のときのみ目次を右列に表示 | [Badge](../../themes/data-display/badge.md) / [Heading](../../themes/typography/heading.md) / [Text](../../themes/typography/text.md) / [Image](../../themes/data-display/image.md) / [Avatar](../../themes/data-display/avatar.md) / [Nav List](../../themes/navigation/nav-list.md) / [Separator](../../themes/utilities/separator.md) | https://fandhe-ai.github.io/fandhe-frontend/blocks/content-article-toc/ |
| `content-article` | 1 列の記事本文ブロック。新しい UI 部品は追加せず、記事データの取得・整形は利用者側に委ねる | [Badge](../../themes/data-display/badge.md) / [Heading](../../themes/typography/heading.md) / [Text](../../themes/typography/text.md) / [Image](../../themes/data-display/image.md) / [Avatar](../../themes/data-display/avatar.md) / [Blockquote](../../themes/typography/blockquote.md) / [Separator](../../themes/utilities/separator.md) | https://fandhe-ai.github.io/fandhe-frontend/blocks/content-article/ |
| `content-columns-screenshot` | eyebrow badge + 見出し + 2 列本文（md 以上）+ CTA + 下端がフェードする画面画像 | [Badge](../../themes/data-display/badge.md) / [Heading](../../themes/typography/heading.md) / [Text](../../themes/typography/text.md) / [Button](../../themes/forms/button.md) / [Image](../../themes/data-display/image.md) | https://fandhe-ai.github.io/fandhe-frontend/blocks/content-columns-screenshot/ |
| `content-image-tiles` | 見出し + 本文/画像タイルの 2 列（lg 以上）+ 下段の数値指標。画像タイルは 2 列 x 2 段で偶数番目を下へずらす | [Heading](../../themes/typography/heading.md) / [Text](../../themes/typography/text.md) / [Image](../../themes/data-display/image.md) / [Stat](../../themes/data-display/stat.md) | https://fandhe-ai.github.io/fandhe-frontend/blocks/content-image-tiles/ |
| `content-split-image` | 見出しと本文を片側の列、画像または画面画像を反対側の列に置く 2 列。sticky な画面画像（基準形）と全高の画像の 2 形を並記 | [Badge](../../themes/data-display/badge.md) / [Heading](../../themes/typography/heading.md) / [Text](../../themes/typography/text.md) / [Image](../../themes/data-display/image.md) / [Icon](../../themes/data-display/icon.md) | https://fandhe-ai.github.io/fandhe-frontend/blocks/content-split-image/ |
| `content-with-testimonial` | 本文の列と引用の列を横に並べる 2 列（lg 以上で本文 7 : 引用 5）。罫線の引用（基準形）と写真カードの引用を並記 | [Heading](../../themes/typography/heading.md) / [Text](../../themes/typography/text.md) / [Blockquote](../../themes/typography/blockquote.md) / [Avatar](../../themes/data-display/avatar.md) / [Card](../../themes/data-display/card.md) / [Stat](../../themes/data-display/stat.md) / [Image](../../themes/data-display/image.md) / [Link](../../themes/typography/link.md) | https://fandhe-ai.github.io/fandhe-frontend/blocks/content-with-testimonial/ |

## Notes

- `docs-site` crate は crates.io 未公開。`demo()` と `BLOCK` は利用者が `use` できる API ではなく、コードをコピーして改変する前提の例である。
- 上のフェンスの `use crate::blocks::dummy_assets;` と `dummy_assets::SCREENSHOT_SRC` は docs サイト内部の非公開ヘルパ（ダミー画像素材）。コピー時は自前の画像 URL に差し替える。`REPO` 定数を持つ block では固定の GitHub リポジトリ URL が入っているため同様に差し替える。
- `blocks-content-*` などのクラス名に当たるレイアウト CSS は `Block.layout_css`（`LayoutCss`）として `.rs` 側に別途登録されており、公式 md のフェンスには含まれない。Rust コードだけではレイアウトのスタイルは付かない。
- 代表 block `content-columns-screenshot` の差分メモ（各 block ページ末尾に `## 原案差分メモ` などで個別に記載）: 2 列への切替は lg ではなく md（48rem）、CTA は `button` パーツ（`type="button"`）、eyebrow は `badge`、見出しは `h3`、画像下端のフェード先はデモ枠の背景色（`--fandhe-color-bg-subtle`）。
- 全 block は `<form>` を持たない静的な表示例で、文言・人名はすべて架空。
- 出典（pin SHA `cf5edb9b8f1bf2a63d51dcf50a8d2806e2d8f9f9`）: `crates/docs-site/src/blocks/marketing/content/<slug_snake>.rs`（`// blocks-code:begin`〜`end` の範囲が公式 md のフェンスと一致）、`site/blocks/<slug>.md`。

## Related

- [Marketing Blocks 概要](./overview.md)
- [Heading](../../themes/typography/heading.md)
- [Text](../../themes/typography/text.md)
- [Image](../../themes/data-display/image.md)
