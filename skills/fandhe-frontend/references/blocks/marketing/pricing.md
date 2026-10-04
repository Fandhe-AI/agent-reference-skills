# Pricing（Marketing Blocks）

Blocks は新規 API ではなく、既存の Themes / Primitives / core 部品を組み合わせた合成例。各 block の公開物は未公開 crate `docs-site` 内部の `pub fn demo() -> Node` と `pub const BLOCK: Block` のみ。Pricing は 10 block。

## Signature / Usage

カテゴリ内で最も短い block `pricing-usage-slider` の公式コード（`slider` の固定値に対応する価格を `stat` に表示する静的な組）。

```rust
use fandhe_frontend_core::{div, text, Node};
use fandhe_frontend_pre_styled_ui::fandhe_frontend_headless_ui::slider::Slider;
use fandhe_frontend_pre_styled_ui::fandhe_frontend_headless_ui::Orientation;
use fandhe_frontend_pre_styled_ui::slider::{self, SliderProps};
use fandhe_frontend_pre_styled_ui::stat;
use fandhe_frontend_pre_styled_ui::{ColorPalette, Size};

/// 利用量（月間リクエスト数、架空の目盛り）から価格表示を導く決定的な固定
/// テーブル。範囲は 4 段のプリセット目盛り（10/50/100/500）を跨ぐしきい値
/// で区切っており、外部入力・ユーザー入力を一切受け取らない。
#[must_use]
fn price_for(units: u32) -> &'static str {
    match units {
        0..=10 => "$9",
        11..=50 => "$29",
        51..=100 => "$49",
        _ => "$199",
    }
}

/// `pricing-usage-slider` の Demo 本体。呼び出しごとに同一の `Node` を返す
/// 純関数。スライダーは 4 段のプリセット目盛り（10/50/100/500）の中間
/// （50）に固定した初期値で描画し、対応する価格を [`price_for`] から
/// 求めて `stat` へ表示する。
pub fn demo() -> Node {
    let props = SliderProps::default();
    let selected_units = 50.0_f64;
    let state = Slider::new(0.0, 500.0, 10.0, selected_units, Orientation::Horizontal);

    let slider_node = slider::root(
        Size::Md,
        ColorPalette::Accent,
        &state,
        &props,
        vec![("data-blocks-pricing-usage-slider-slider", "")],
        vec![
            slider::label(
                &props,
                vec![("id", "blocks-pricing-usage-slider-label")],
                vec![text("月間リクエスト数（千件）")],
            ),
            slider::control(
                Orientation::Horizontal,
                &props,
                vec![],
                vec![
                    slider::track(
                        Orientation::Horizontal,
                        &props,
                        vec![],
                        vec![slider::range(&state, &props, vec![])],
                    ),
                    slider::thumb_styled(
                        &state,
                        Some("50 千件"),
                        &props,
                        vec![("aria-labelledby", "blocks-pricing-usage-slider-label")],
                    ),
                    slider::marker_group(
                        vec![],
                        vec![
                            slider::marker(&state, 10.0, false, vec![], vec![]),
                            slider::marker(&state, 50.0, false, vec![], vec![]),
                            slider::marker(&state, 100.0, false, vec![], vec![]),
                            slider::marker(&state, 500.0, false, vec![], vec![]),
                        ],
                    ),
                ],
            ),
            slider::hidden_input("usage-units", "50", false, vec![]),
        ],
    );

    let stat_node = stat::root(
        Size::Lg,
        vec![("data-blocks-pricing-usage-slider-stat", "")],
        vec![
            stat::label(vec![], vec![text("想定コスト")]),
            stat::value_text(
                vec![],
                vec![text(price_for(selected_units as u32)), text(" / 月")],
            ),
            stat::help_text(
                vec![],
                vec![text(
                    "スライダーの選択位置（50 千件/月）に対応する固定表示です",
                )],
            ),
        ],
    );

    div(
        vec![("data-blocks-pricing-usage-slider-layout", "")],
        vec![slider_node, stat_node],
    )
}
```

## Blocks

| slug | 説明 | 使用部品 | 公式 URL |
|------|------|----------|----------|
| pricing-comparison-table | カテゴリ見出し行付きのプラン比較表 | [heading](../../themes/typography/heading.md) / [text](../../themes/typography/text.md) / [table](../../themes/data-display/table.md) / [button](../../themes/forms/button.md) / [icon](../../themes/data-display/icon.md) / [card](../../themes/data-display/card.md) / [native-select](../../themes/forms/native-select.md) | https://fandhe-ai.github.io/fandhe-frontend/blocks/pricing-comparison-table/ |
| pricing-seats-split | 座席数に応じてプラン価格が変わる料金プラン | [heading](../../themes/typography/heading.md) / [text](../../themes/typography/text.md) / [number-input](../../themes/forms/number-input.md) / [switch](../../themes/forms/switch.md) / [card](../../themes/data-display/card.md) / [button](../../themes/forms/button.md) / [list](../../themes/typography/list.md) / [icon](../../themes/data-display/icon.md) | https://fandhe-ai.github.io/fandhe-frontend/blocks/pricing-seats-split/ |
| pricing-single-split | 単一プランを大きく見せる 2 カラムの料金セクション | [heading](../../themes/typography/heading.md) / [text](../../themes/typography/text.md) / [card](../../themes/data-display/card.md) / [button](../../themes/forms/button.md) / [list](../../themes/typography/list.md) / [icon](../../themes/data-display/icon.md) / [radio-card](../../themes/forms/radio-card.md) / [separator](../../themes/utilities/separator.md) | https://fandhe-ai.github.io/fandhe-frontend/blocks/pricing-single-split/ |
| pricing-slider-tiers | 利用量スライダーとプランカード 3 枚を組み合わせた料金セクション | [heading](../../themes/typography/heading.md) / [text](../../themes/typography/text.md) / [button](../../themes/forms/button.md) / [slider](../../themes/forms/slider.md) / [card](../../themes/data-display/card.md) / [badge](../../themes/data-display/badge.md) / [list](../../themes/typography/list.md) / [icon](../../themes/data-display/icon.md) | https://fandhe-ai.github.io/fandhe-frontend/blocks/pricing-slider-tiers/ |
| pricing-tier-cards | プランカードを横に並べる料金セクション | [heading](../../themes/typography/heading.md) / [text](../../themes/typography/text.md) / [badge](../../themes/data-display/badge.md) / [card](../../themes/data-display/card.md) / [button](../../themes/forms/button.md) / [list](../../themes/typography/list.md) / [icon](../../themes/data-display/icon.md) | https://fandhe-ai.github.io/fandhe-frontend/blocks/pricing-tier-cards/ |
| pricing-tiers-comparison | カードと表の 2 段構成の料金セクション | [heading](../../themes/typography/heading.md) / [text](../../themes/typography/text.md) / [badge](../../themes/data-display/badge.md) / [card](../../themes/data-display/card.md) / [button](../../themes/forms/button.md) / [list](../../themes/typography/list.md) / [icon](../../themes/data-display/icon.md) / [table](../../themes/data-display/table.md) / [tabs](../../themes/disclosure/tabs.md) | https://fandhe-ai.github.io/fandhe-frontend/blocks/pricing-tiers-comparison/ |
| pricing-tiers-extra-row | 横並びのプランカード + カード群と同じ幅の補足行を持つ料金プラン | [heading](../../themes/typography/heading.md) / [text](../../themes/typography/text.md) / [badge](../../themes/data-display/badge.md) / [card](../../themes/data-display/card.md) / [button](../../themes/forms/button.md) / [list](../../themes/typography/list.md) / [icon](../../themes/data-display/icon.md) / [separator](../../themes/utilities/separator.md) / [toggle-tip](../../themes/overlays/toggle-tip.md) | https://fandhe-ai.github.io/fandhe-frontend/blocks/pricing-tiers-extra-row/ |
| pricing-tiers-morph | Motion+ `sections/pricing-sections` 相当の料金プラン（`border_beam` の opt-in 装飾付き） | [tabs](../../themes/disclosure/tabs.md) / [card](../../themes/data-display/card.md) / [badge](../../themes/data-display/badge.md) / [button](../../themes/forms/button.md) | https://fandhe-ai.github.io/fandhe-frontend/blocks/pricing-tiers-morph/ |
| pricing-upgrade-card | 上位プランへのアップグレードを促す単一カード | [card](../../themes/data-display/card.md) / [heading](../../themes/typography/heading.md) / [text](../../themes/typography/text.md) / [list](../../themes/typography/list.md) / [icon](../../themes/data-display/icon.md) / [button](../../themes/forms/button.md) / [link](../../themes/typography/link.md) | https://fandhe-ai.github.io/fandhe-frontend/blocks/pricing-upgrade-card/ |
| pricing-usage-slider | Motion+ `sections/pricing-sections` 相当の使用量ベース料金。`slider` の固定値に対応する価格を `stat` に表示 | [slider](../../themes/forms/slider.md) / [stat](../../themes/data-display/stat.md) | https://fandhe-ai.github.io/fandhe-frontend/blocks/pricing-usage-slider/ |

## Notes

- docs-site は crates.io 未公開のため `use` できない。各 block のコードはコピーして自アプリへ取り込む前提。一部 block のコードは docs-site 内部の `crate::blocks::dummy_assets`（ダミー素材）や `LAYOUT_CSS`（block 固有のレイアウト CSS）に依存するため、そのままではコンパイルできない
- 全 block は静的な表示例で `<form>` を持たない。プラン名・価格・利用量は架空
- `pricing-usage-slider` は JS ハイドレーションを行わない docs サイトの静的表示で、`slider` は固定の初期値（50）で描画される。スライダーの値をリアルタイムに `stat` へ反映するライブ連動は実装されておらず、組み込む場合は `fandhe-frontend-wasm-full` のハイドレーション配線を購読して価格表示を書き換える処理を利用者自身の Rust コードで実装する。`price_for` は外部入力を受け取らない決定的な範囲テーブル
- `pricing-usage-slider` のコードは `fandhe_frontend_pre_styled_ui::fandhe_frontend_headless_ui::slider::Slider` を使う（pre-styled-ui 経由で再公開される headless-ui の状態型）
- 出典（pin SHA `cf5edb9b8f1bf2a63d51dcf50a8d2806e2d8f9f9`）: `site/blocks/<slug>.md`、`crates/docs-site/src/blocks/marketing/pricing/<slug_snake>.rs`。`rust` フェンスは rs の `// blocks-code:begin` 〜 `end` 範囲と一致

## Related

- [overview.md](./overview.md)
- [card](../../themes/data-display/card.md)
- [slider](../../themes/forms/slider.md)
- [stat](../../themes/data-display/stat.md)
- [tabs](../../themes/disclosure/tabs.md)
