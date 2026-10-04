# Logo Cloud（Marketing Blocks）

Blocks は新規 API ではなく、既存の Themes / Primitives / core 部品を組み合わせた合成例。各 block の公開物は未公開 crate `docs-site` 内部の `pub fn demo() -> Node` と `pub const BLOCK: Block` のみ。Logo Cloud は 3 block。

## Signature / Usage

カテゴリ内で最も短い block `logo-cloud-marquee`（導入企業ロゴをティッカー状に流す帯と、カード内の逆方向 2 段）の `## Rust コード` の冒頭抜粋。

```rust
use crate::blocks::dummy_assets;
use fandhe_frontend_core::{div, text, Node};
use fandhe_frontend_pre_styled_ui::card::{self, CardVariant};
use fandhe_frontend_pre_styled_ui::heading::{
    self as styled_heading, HeadingLevel, HeadingProps, HeadingSize,
};
use fandhe_frontend_pre_styled_ui::image::{self, ImageProps};
use fandhe_frontend_pre_styled_ui::marquee::{self, MarqueeDirection, MarqueeProps};
use fandhe_frontend_pre_styled_ui::text::{self as styled_text, TextProps, TextSize, TextVariant};

/// 見出しエリア（見出し → リード文）。
fn header() -> Node {
    let title = styled_heading::heading(
        HeadingLevel::H3,
        &HeadingProps {
            size: HeadingSize::Xl3,
            ..HeadingProps::default()
        },
        vec![],
        vec![text("多くのチームに使われています")],
    );
    let lead = styled_text::text(
        &TextProps {
            variant: TextVariant::Muted,
            ..TextProps::default()
        },
        vec![],
        vec![text(
            "様々な規模のチームが日々のワークフローに組み込んでいます。",
        )],
    );
    div(
        vec![("class", "blocks-logo-cloud-marquee-header")],
        vec![title, lead],
    )
}

/// ロゴ + 社名のロックアップ 1 件（[`marquee::item`] 1 個）。
fn logo(name: &'static str) -> Node {
    let mark = image::image(
        &ImageProps::new(dummy_assets::LOGO_SRC, ""),
        vec![("data-blocks-logo-cloud-marquee-logo", "")],
    );
    let label = styled_text::text(
        &TextProps {
            variant: TextVariant::Muted,
            size: TextSize::Sm,
            ..TextProps::default()
        },
        vec![],
        vec![text(name)],
    );
    marquee::item(
        vec![],
        vec![div(
            vec![("class", "blocks-logo-cloud-marquee-lockup")],
            vec![mark, label],
        )],
    )
}

/// marquee 1 段分。`decorative` が `true` のときは同一 6 社の逆方向再掲
/// （二重読み上げ防止のため装飾扱い）、`false` のときはアクセシブル
/// ネームを付与する。`attr` は [`LAYOUT_CSS`] 側のトークン上書きに使う
/// data 属性名。
fn row(direction: MarqueeDirection, decorative: bool, attr: &'static str) -> Node {
    marquee::marquee(
        &MarqueeProps {
            direction,
            decorative,
            label: (!decorative).then_some("導入企業のロゴ"),
        },
        vec![(attr, "")],
        dummy_assets::COMPANY_NAMES
            .iter()
            .map(|n| logo(n))
            .collect(),
    )
}
// ...（以下省略。全文は公式ページ https://fandhe-ai.github.io/fandhe-frontend/blocks/logo-cloud-marquee/ の「Rust コード」を参照）
```

## Blocks

| slug | 説明 | 使用部品 | 公式 URL |
|------|------|----------|----------|
| logo-cloud-grid | 見出し・リード文の下に、グレースケールのロゴを折り返し行またはグリッドで並べる | [heading](../../themes/typography/heading.md) / [text](../../themes/typography/text.md) / [image](../../themes/data-display/image.md) / [card](../../themes/data-display/card.md) / [tag](../../themes/data-display/tag.md) / [link](../../themes/typography/link.md) | https://fandhe-ai.github.io/fandhe-frontend/blocks/logo-cloud-grid/ |
| logo-cloud-marquee | 導入企業ロゴをティッカー状に流す帯。帯 1 段・両端フェードの基準形と、カード内に逆方向 2 段を重ねた構成の 2 通りを併記 | [heading](../../themes/typography/heading.md) / [text](../../themes/typography/text.md) / [marquee](../../themes/typography/marquee.md) / [image](../../themes/data-display/image.md) / [card](../../themes/data-display/card.md) | https://fandhe-ai.github.io/fandhe-frontend/blocks/logo-cloud-marquee/ |
| logo-cloud-split | 見出し左 + ロゴ 2 列グリッド右（lg 未満では見出しの下にロゴが縦積み）。CTA 2 本は `link::root` で組み立て、リポジトリの固定 URL へ遷移 | [heading](../../themes/typography/heading.md) / [text](../../themes/typography/text.md) / [image](../../themes/data-display/image.md) / [link](../../themes/typography/link.md) | https://fandhe-ai.github.io/fandhe-frontend/blocks/logo-cloud-split/ |

## Notes

- 上記コードは公式 md `## Rust コード` の冒頭抜粋（元は約 132 行）。全文は公式ページを参照する。
- docs-site は crates.io 未公開のため `use` できない。各 block のコードはコピーして自アプリへ取り込む前提。一部 block のコードは docs-site 内部の `crate::blocks::dummy_assets`（ダミー素材）や `LAYOUT_CSS`（block 固有のレイアウト CSS）に依存するため、そのままではコンパイルできない。上記 Signature / Usage のコードも `dummy_assets`（プレースホルダー SVG ロゴと架空の社名）に依存する
- 全 block は静的な表示例で `<form>` を持たない。ロゴはビルド時生成のプレースホルダー SVG、社名は架空
- `logo-cloud-marquee` のアニメーション・両端フェード・`prefers-reduced-motion: reduce` 時の折り返し表示・hover / focus 時の一時停止は `marquee` 部品が内蔵する契約。本 block は `--fandhe-marquee-*` custom property（フェード幅・間隔・速度）を上書きするのみで、アニメーション CSS は書かない。2 段目は 1 段目と同一内容の再掲のため `decorative: true`（`aria-hidden` + `inert`）で二重読み上げを防ぐ
- 公式ページの差分メモ（`logo-cloud-marquee`）: 参照元の `speed`（px/s 指定）は `marquee` 部品の契約外のため不採用。速度・間隔は `--fandhe-marquee-duration` / `--fandhe-marquee-gap`（秒指定）で与える
- 出典（pin SHA `cf5edb9b8f1bf2a63d51dcf50a8d2806e2d8f9f9`）: `site/blocks/<slug>.md`、`crates/docs-site/src/blocks/marketing/logo_cloud/<slug_snake>.rs`。`rust` フェンスは rs の `// blocks-code:begin` 〜 `end` 範囲と一致

## Related

- [overview.md](./overview.md)
- [marquee](../../themes/typography/marquee.md)
- [image](../../themes/data-display/image.md)
