# Comparison（Marketing Blocks）

自社と他社（競合）の比較表示向け block 4 件。blocks は新規 API ではなく既存の Themes / Primitives / core 部品の合成例で、各 block の公開物は未公開 crate `docs-site` 内部の `pub fn demo() -> Node` と `pub const BLOCK: Block` だけである。

## Signature / Usage

カテゴリ内で最も短い `comparison-feature-rows`（機能別の比較行レイアウト）の `## Rust コード` の冒頭抜粋。

```rust
use fandhe_frontend_core::{div, el, text, Node};
use fandhe_frontend_pre_styled_ui::badge::{self, BadgeProps, BadgeVariant};
use fandhe_frontend_pre_styled_ui::heading::{
    heading, HeadingLevel, HeadingProps, HeadingSize, HeadingWeight,
};
use fandhe_frontend_pre_styled_ui::icon::{icon, IconProps};
use fandhe_frontend_pre_styled_ui::separator::{self, SeparatorProps};
use fandhe_frontend_pre_styled_ui::text::{self as styled_text, TextProps, TextVariant};
use fandhe_frontend_pre_styled_ui::ColorPalette;

/// 円のみの抽象アイコン（`stroke` のみで塗り面を持たない、`feature_expand::
/// geo_icon` と同型の対処）。
fn glyph_circle() -> Node {
    icon(
        &IconProps::default(),
        vec![],
        vec![el(
            "circle",
            vec![
                ("cx", "12"),
                ("cy", "12"),
                ("r", "8"),
                ("fill", "none"),
                ("stroke", "currentColor"),
                ("stroke-width", "2"),
            ],
            vec![],
        )],
    )
}

/// 四角の輪郭のみの抽象アイコン。
fn glyph_square() -> Node {
    icon(
        &IconProps::default(),
        vec![],
        vec![el(
            "path",
            vec![
                ("d", "M5 5h14v14H5z"),
                ("fill", "none"),
                ("stroke", "currentColor"),
                ("stroke-width", "2"),
                ("stroke-linejoin", "round"),
            ],
            vec![],
        )],
    )
}

/// 水平線 3 本の抽象アイコン（一覧・段階性を示す図形）。
fn glyph_lines() -> Node {
    icon(
        &IconProps::default(),
        vec![],
        vec![el(
            "path",
            vec![
                ("d", "M4 6h16M4 12h16M4 18h16"),
                ("fill", "none"),
                ("stroke", "currentColor"),
                ("stroke-width", "2"),
                ("stroke-linecap", "round"),
            ],
            vec![],
        )],
    )
}
// ...（以下省略。全文は公式ページ https://fandhe-ai.github.io/fandhe-frontend/blocks/comparison-feature-rows/ の「Rust コード」を参照）
```

## Blocks

| Block | Description | 使用部品 | 公式 URL |
| --- | --- | --- | --- |
| `comparison-cards` | 自社製品と競合製品を並べる製品比較カード。中央寄せの見出し領域の下に製品カードを横並びにし、各カードは機能ごとの可否をアイコンで示すリストを持つ。自社カードは枠線と badge で強調。カード列は 1 列から 2 列・3 列へ切り替わる | [Heading](../../themes/typography/heading.md) / [Text](../../themes/typography/text.md) / [Badge](../../themes/data-display/badge.md) / [Card](../../themes/data-display/card.md) / [List](../../themes/typography/list.md) / [Icon](../../themes/data-display/icon.md) | https://fandhe-ai.github.io/fandhe-frontend/blocks/comparison-cards/ |
| `comparison-feature-rows` | 機能別の比較行レイアウト。見出しブロックの下に「アイコン付きの機能名・自社の説明・他社の説明」の行を縦に並べ、行間を罫線で区切る。md（48rem）で 2 列、lg（64rem）で 3 列 | [Heading](../../themes/typography/heading.md) / [Text](../../themes/typography/text.md) / [Badge](../../themes/data-display/badge.md) / [Icon](../../themes/data-display/icon.md) / [Separator](../../themes/utilities/separator.md) | https://fandhe-ai.github.io/fandhe-frontend/blocks/comparison-feature-rows/ |
| `comparison-split-table` | 見出しブロックと比較表を左右に並べるレイアウト。lg（64rem）以上で左に見出し・説明・ボタン 2 個、右に比較表。狭幅では見出しの下に表が続き横スクロール。セルはチェック/バツのアイコンとテキスト値が混在し、機能名の補足は常時表示テキスト | [Heading](../../themes/typography/heading.md) / [Text](../../themes/typography/text.md) / [Badge](../../themes/data-display/badge.md) / [Button](../../themes/forms/button.md) / [Table](../../themes/data-display/table.md) / [Icon](../../themes/data-display/icon.md) | https://fandhe-ai.github.io/fandhe-frontend/blocks/comparison-split-table/ |
| `comparison-table` | 比較表レイアウト。上部に中央寄せのタグライン・見出し・説明文、その下に自社と競合を列、機能を行とする本物の `<table>`、表の下に CTA ボタン。セルは可否アイコンまたは短い値 | [Heading](../../themes/typography/heading.md) / [Text](../../themes/typography/text.md) / [Badge](../../themes/data-display/badge.md) / [Table](../../themes/data-display/table.md) / [Icon](../../themes/data-display/icon.md) / [Button](../../themes/forms/button.md) | https://fandhe-ai.github.io/fandhe-frontend/blocks/comparison-table/ |

## Notes

- 上記コードは公式 md `## Rust コード` の冒頭抜粋（元は約 222 行）。全文は公式ページを参照する。
- `docs-site` crate は crates.io 未公開。`demo()` と `BLOCK` は利用者が `use` できる API ではなく、コードをコピーして改変する前提の例である。
- `blocks-comparison-*` や `data-blocks-comparison-*` に対応するレイアウト CSS（md / lg での列数切替を含む）は `Block.layout_css`（`LayoutCss`）として `.rs` 側に別途登録されており、公式 md のフェンスには含まれない。Rust コードだけではレイアウトのスタイルは付かない。
- 代表 block `comparison-feature-rows` の差分メモ（各 block ページ末尾に個別記載）: アイコンは参照元の SVG をコピーせず自作の抽象図形、見出しは `h3` / 機能名は `h4`、自社側を強調配色（`Solid` + `Accent`）・他社側を中立配色（`Outline` + `Neutral`）、md（48rem）の 2 列段階を追加、文言はすべて独自。
- 文言は架空で、実在の企業名・製品名・競合名は使わず中立的な「自社」「他社」ラベルのみ。静的表示で `<form>` は使わず、データ取得・送信も行わない。
- 出典（pin SHA `cf5edb9b8f1bf2a63d51dcf50a8d2806e2d8f9f9`）: `crates/docs-site/src/blocks/marketing/comparison/<slug_snake>.rs`、`site/blocks/<slug>.md`。

## Related

- [Marketing Blocks 概要](./overview.md)
- [Table](../../themes/data-display/table.md)
- [Badge](../../themes/data-display/badge.md)
- [Separator](../../themes/utilities/separator.md)
