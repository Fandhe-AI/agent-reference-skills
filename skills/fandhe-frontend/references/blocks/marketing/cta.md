# CTA（Marketing Blocks）

Blocks は新規 API ではなく、既存の Themes / Primitives / core 部品を組み合わせた合成例。各 block の公開物は未公開 crate `docs-site` 内部の `pub fn demo() -> Node` と `pub const BLOCK: Block` のみ。CTA は 6 block。

## Signature / Usage

カテゴリ内で最も短い block `cta-banner-magnetic` の公式コード。

```rust
use fandhe_frontend_core::{div, p, text, Node};
use fandhe_frontend_pre_styled_ui::button::{self, ButtonProps};
use fandhe_frontend_pre_styled_ui::heading::{
    heading, HeadingLevel, HeadingProps, HeadingSize, HeadingWeight,
};
use fandhe_frontend_pre_styled_ui::Size;

/// `cta-banner-magnetic` の Demo 本体。呼び出しごとに同一の `Node` を返す
/// 純関数。
pub fn demo() -> Node {
    let title = heading(
        HeadingLevel::H3,
        &HeadingProps {
            size: HeadingSize::Xl,
            weight: HeadingWeight::Bold,
        },
        vec![("data-blocks-cta-banner-magnetic-title", "")],
        vec![text("Ready to get started?")],
    );
    let description = p(
        vec![("class", "blocks-cta-banner-magnetic-description")],
        vec![text(
            "Join teams already shipping faster with a framework built for AI-era security.",
        )],
    );
    let cta = button::button(
        &ButtonProps {
            size: Size::Lg,
            ..ButtonProps::default()
        },
        vec![
            ("data-blocks-cta-banner-magnetic-cta", ""),
            ("data-fandhe-magnetic", ""),
        ],
        vec![text("Get started")],
    );

    div(
        vec![("data-blocks-cta-banner-magnetic-banner", "")],
        vec![title, description, cta],
    )
}
```

## Blocks

| slug | 説明 | 使用部品 | 公式 URL |
|------|------|----------|----------|
| cta-banner-magnetic | Motion+ `sections/cta-sections` の magnetic banner 相当。CTA ボタンに opt-in マーカー `data-fandhe-magnetic` を付与（ポインタ追従は `fandhe-frontend-wasm-full` の `magnetic` feature がハイドレーション後に担う） | [button](../../themes/forms/button.md) | https://fandhe-ai.github.io/fandhe-frontend/blocks/cta-banner-magnetic/ |
| cta-centered | 中央寄せの CTA バナー | [heading](../../themes/typography/heading.md) / [text](../../themes/typography/text.md) / [button](../../themes/forms/button.md) / [badge](../../themes/data-display/badge.md) / [card](../../themes/data-display/card.md) | https://fandhe-ai.github.io/fandhe-frontend/blocks/cta-centered/ |
| cta-feature-links | 見出し・説明文・CTA ボタンの左列と、アイコン付きリンク項目 2 件の右列からなる 2 列 CTA | [heading](../../themes/typography/heading.md) / [text](../../themes/typography/text.md) / [button](../../themes/forms/button.md) / [icon](../../themes/data-display/icon.md) / [link-overlay](../../themes/typography/link-overlay.md) / [separator](../../themes/utilities/separator.md) | https://fandhe-ai.github.io/fandhe-frontend/blocks/cta-feature-links/ |
| cta-signup-celebrate | Motion+ `sections/cta-sections` の signup celebrate 相当の登録フォーム付き CTA | [card](../../themes/data-display/card.md) / [field](../../themes/forms/field.md) / [input](../../themes/forms/input.md) / [button](../../themes/forms/button.md) | https://fandhe-ai.github.io/fandhe-frontend/blocks/cta-signup-celebrate/ |
| cta-split-actions | 見出しとボタン列を左右両端へ揃える CTA | [heading](../../themes/typography/heading.md) / [text](../../themes/typography/text.md) / [button](../../themes/forms/button.md) / [card](../../themes/data-display/card.md) / [icon](../../themes/data-display/icon.md) | https://fandhe-ai.github.io/fandhe-frontend/blocks/cta-split-actions/ |
| cta-split-image | 画像付きの分割 CTA | [badge](../../themes/data-display/badge.md) / [heading](../../themes/typography/heading.md) / [text](../../themes/typography/text.md) / [button](../../themes/forms/button.md) / [image](../../themes/data-display/image.md) / [card](../../themes/data-display/card.md) / [icon](../../themes/data-display/icon.md) / [link](../../themes/typography/link.md) | https://fandhe-ai.github.io/fandhe-frontend/blocks/cta-split-image/ |

## Notes

- docs-site は crates.io 未公開のため `use` できない。各 block のコードはコピーして自アプリへ取り込む前提。一部 block のコードは docs-site 内部の `crate::blocks::dummy_assets`（ダミー素材）や `LAYOUT_CSS`（block 固有のレイアウト CSS）に依存するため、そのままではコンパイルできない
- 全 block は静的な表示例で、CTA ボタンは送信先を持たない（`type="button"` のまま）。`<form>` は出力しない
- `cta-banner-magnetic` の `data-fandhe-magnetic` は値なしの存在属性で、`fandhe-frontend-wasm-full` の `magnetic` feature（既定 on）が消費する。`fandhe-frontend-animation::magnetic::compute_pull` / `write_offset` が CSS カスタムプロパティ `--fandhe-motion-magnetic-x` / `-y` を書き込み、CSS 側の `transform: translate(var(..))` がそれを消費する。docs サイトは JS ハイドレーションを行わないため、Demo ではポインタ追従は発生せず、マークアップと opt-in 属性の使い方のみを示す
- `button::button` は呼び出し側 `attrs` の `class` を除去する（`drop_class_attr`）ため、CSS フックは `data-blocks-*` 属性で渡している。`heading::heading` も同様
- 出典（pin SHA `cf5edb9b8f1bf2a63d51dcf50a8d2806e2d8f9f9`）: `site/blocks/<slug>.md`、`crates/docs-site/src/blocks/marketing/cta/<slug_snake>.rs`。`rust` フェンスは rs の `// blocks-code:begin` 〜 `end` 範囲と一致

## Related

- [overview.md](./overview.md)
- [button](../../themes/forms/button.md)
- [heading](../../themes/typography/heading.md)
