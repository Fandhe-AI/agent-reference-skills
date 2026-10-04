# Stats（Marketing Blocks）

Blocks は新規 API ではなく、既存の Themes / Primitives / core 部品を組み合わせた合成例。各 block の公開物は未公開 crate `docs-site` 内部の `pub fn demo() -> Node` と `pub const BLOCK: Block` のみ。Stats は 6 block。

## Signature / Usage

カテゴリ内で最も短い block `stats-background-image` の公式コード（背景画像 + スクリムの上に数値指標 4 件を並べる）。

```rust
use crate::blocks::dummy_assets;
use fandhe_frontend_core::{div, text, Node};
use fandhe_frontend_pre_styled_ui::badge::{self, BadgeProps};
use fandhe_frontend_pre_styled_ui::heading::{self, HeadingLevel, HeadingProps, HeadingSize};
use fandhe_frontend_pre_styled_ui::image::{self, ImageProps};
use fandhe_frontend_pre_styled_ui::stat;
use fandhe_frontend_pre_styled_ui::text::{self as styled_text, TextProps};
use fandhe_frontend_pre_styled_ui::Size;

const ROOT_CLASS: &str = "blocks-stats-background-image-root";
const BACKDROP_CLASS: &str = "blocks-stats-background-image-backdrop";
const SCRIM_CLASS: &str = "blocks-stats-background-image-scrim";
const CONTENT_CLASS: &str = "blocks-stats-background-image-content";
const GRID_CLASS: &str = "blocks-stats-background-image-grid";

const IMAGE_ATTR: &str = "data-blocks-stats-background-image-image";
const TAGLINE_ATTR: &str = "data-blocks-stats-background-image-tagline";
const TITLE_ATTR: &str = "data-blocks-stats-background-image-title";
const DESCRIPTION_ATTR: &str = "data-blocks-stats-background-image-description";
const STAT_ATTR: &str = "data-blocks-stats-background-image-stat";
const STAT_LABEL_ATTR: &str = "data-blocks-stats-background-image-stat-label";

/// 数値指標 1 件分（`stat::root` + `label`/`value_text`、`content_image_tiles`
/// と同じ合成方法）。
fn stat_item(label: &str, value: &str) -> Node {
    stat::root(
        Size::Lg,
        vec![(STAT_ATTR, "")],
        vec![
            stat::label(vec![(STAT_LABEL_ATTR, "")], vec![text(label)]),
            stat::value_text(vec![], vec![text(value)]),
        ],
    )
}

/// `stats-background-image` の Demo 本体。呼び出しごとに同一の `Node` を
/// 返す純関数。
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

    let tagline = badge::badge(
        &BadgeProps::default(),
        vec![(TAGLINE_ATTR, "")],
        vec![text("Trusted by teams everywhere")],
    );

    let title = heading::heading(
        HeadingLevel::H3,
        &HeadingProps {
            size: HeadingSize::Xl3,
            ..HeadingProps::default()
        },
        vec![(TITLE_ATTR, "")],
        vec![text("Built for teams that never stop shipping")],
    );

    let description = styled_text::text(
        &TextProps::default(),
        vec![(DESCRIPTION_ATTR, "")],
        vec![text(
            "A snapshot of how teams rely on our platform every day.",
        )],
    );

    let grid = div(
        vec![("class", GRID_CLASS)],
        vec![
            stat_item("Active projects", "12k+"),
            stat_item("Uptime", "99.9%"),
            stat_item("Countries", "40"),
            stat_item("Avg. response", "2h"),
        ],
    );

    let content = div(
        vec![("class", CONTENT_CLASS)],
        vec![tagline, title, description, grid],
    );

    div(vec![("class", ROOT_CLASS)], vec![backdrop, content])
}
```

## Blocks

| slug | 説明 | 使用部品 | 公式 URL |
|------|------|----------|----------|
| stats-background-image | 背景画像の上に数値指標を並べるセクション。数値指標は 48rem 未満で 2 列、以上で 4 列 | [badge](../../themes/data-display/badge.md) / [heading](../../themes/typography/heading.md) / [text](../../themes/typography/text.md) / [stat](../../themes/data-display/stat.md) / [image](../../themes/data-display/image.md) | https://fandhe-ai.github.io/fandhe-frontend/blocks/stats-background-image/ |
| stats-cards | カード型の数値指標 | [badge](../../themes/data-display/badge.md) / [heading](../../themes/typography/heading.md) / [text](../../themes/typography/text.md) / [card](../../themes/data-display/card.md) / [stat](../../themes/data-display/stat.md) / [icon](../../themes/data-display/icon.md) | https://fandhe-ai.github.io/fandhe-frontend/blocks/stats-cards/ |
| stats-row | 数値指標を横一列に並べるマーケティングセクション | [badge](../../themes/data-display/badge.md) / [heading](../../themes/typography/heading.md) / [text](../../themes/typography/text.md) / [stat](../../themes/data-display/stat.md) / [separator](../../themes/utilities/separator.md) / [image](../../themes/data-display/image.md) / [icon](../../themes/data-display/icon.md) | https://fandhe-ai.github.io/fandhe-frontend/blocks/stats-row/ |
| stats-split | 見出しと数値指標の 2 列 | [badge](../../themes/data-display/badge.md) / [heading](../../themes/typography/heading.md) / [text](../../themes/typography/text.md) / [stat](../../themes/data-display/stat.md) / [separator](../../themes/utilities/separator.md) | https://fandhe-ai.github.io/fandhe-frontend/blocks/stats-split/ |
| stats-timeline | 日付付きの出来事（沿革）を横一列に並べる | [heading](../../themes/typography/heading.md) / [text](../../themes/typography/text.md) / [separator](../../themes/utilities/separator.md) | https://fandhe-ai.github.io/fandhe-frontend/blocks/stats-timeline/ |
| stats-with-image | 画像と数値指標を 2 列で組み合わせるセクション | [badge](../../themes/data-display/badge.md) / [heading](../../themes/typography/heading.md) / [text](../../themes/typography/text.md) / [stat](../../themes/data-display/stat.md) / [image](../../themes/data-display/image.md) | https://fandhe-ai.github.io/fandhe-frontend/blocks/stats-with-image/ |

## Notes

- docs-site は crates.io 未公開のため `use` できない。各 block のコードはコピーして自アプリへ取り込む前提。一部 block のコードは docs-site 内部の `crate::blocks::dummy_assets`（ダミー素材）や `LAYOUT_CSS`（block 固有のレイアウト CSS）に依存するため、そのままではコンパイルできない。上記 Signature / Usage のコードも `dummy_assets`（背景画像のダミー）に依存する
- 全 block は静的な表示例で `<form>` を持たない。数値・文言は架空
- `stats-background-image` の背景画像は装飾扱い（`alt=""` + `aria-hidden="true"`）。公式ページの差分メモによると、暗幕を `--fandhe-color-fg` ベース、文字を `--fandhe-color-bg` ベースの反転ペア（`color-mix()`）としているため、ライトテーマでは暗い暗幕・明るい文字、ダークテーマでは明暗が入れ替わる。薄い背景画像の変種は別インスタンスとして持ち込まず、スクリムの `color-mix()` 比率を下げて再現する。全画面の高さ表示は Demo 枠内に収めるため `min-height` に変更している
- 出典（pin SHA `cf5edb9b8f1bf2a63d51dcf50a8d2806e2d8f9f9`）: `site/blocks/<slug>.md`、`crates/docs-site/src/blocks/marketing/stats/<slug_snake>.rs`。`rust` フェンスは rs の `// blocks-code:begin` 〜 `end` 範囲と一致

## Related

- [overview.md](./overview.md)
- [stat](../../themes/data-display/stat.md)
- [badge](../../themes/data-display/badge.md)
