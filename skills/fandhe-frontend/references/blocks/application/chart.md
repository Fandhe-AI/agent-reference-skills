# Chart（Application Blocks）

Chart は、ランキング横棒・指標サマリー付き面グラフ・折れ線付き統計カードの合成例 3 件。blocks は新規 API ではなく既存の Themes / Primitives / core 部品の合成例で、各 block の公開物は未公開 crate docs-site 内部の `pub fn demo() -> Node` と `pub const BLOCK: Block` だけである。

## Signature / Usage

`chart-bar-list`（カテゴリ内で最も短い block）の `## Rust コード`。

```rust
use fandhe_frontend_core::{div, Node};
use fandhe_frontend_pre_styled_ui::card::{self, CardProps, CardVariant};
use fandhe_frontend_pre_styled_ui::charts::bar_list;
use fandhe_frontend_pre_styled_ui::charts::data::{ChartData, Series, SortDirection};
use fandhe_frontend_pre_styled_ui::heading::{heading, HeadingLevel, HeadingProps};

/// ランキングカード 1 枚を組み立てる小さな helper（内部専用）。`rows` は
/// `(ラベル, 値)` の組で、表示順は未ソートのままでよい（本関数の内部で
/// 降順ソートを適用する）。
fn ranking_card(title: &str, description: &str, series_name: &str, rows: &[(&str, f64)]) -> Node {
    let categories = rows.iter().map(|(label, _)| (*label).to_string()).collect();
    let values = rows.iter().map(|(_, value)| *value).collect();
    let data = ChartData::new(categories, vec![Series::new(series_name, values)])
        .expect("chart-bar-list の固定データは常に有効な ChartData を構成する")
        .sort_by_series(series_name, SortDirection::Descending)
        .expect("series_name は直前に構築した ChartData 自身の系列名と一致する");
    let list = bar_list::root(&data, series_name)
        .expect("chart-bar-list の固定データに未知系列・負値は含まれない");

    card::root(
        CardProps::from(CardVariant::Outline),
        vec![],
        vec![
            card::header(
                vec![],
                vec![
                    heading(
                        HeadingLevel::H3,
                        &HeadingProps::default(),
                        vec![],
                        vec![fandhe_frontend_core::text(title)],
                    ),
                    card::description(vec![], vec![fandhe_frontend_core::text(description)]),
                ],
            ),
            card::body(vec![], vec![list]),
        ],
    )
}

/// `chart-bar-list` の Demo 本体。呼び出しごとに同一の `Node` を返す
/// 純関数。
pub fn demo() -> Node {
    let inflow = ranking_card(
        "流入元（今月）",
        "訪問数（件）",
        "visits",
        &[
            ("直接アクセス", 1180.0),
            ("検索", 3420.0),
            ("紹介リンク", 640.0),
            ("SNS", 2260.0),
            ("ニュースレター", 980.0),
        ],
    );
    let popular_pages = ranking_card(
        "よく読まれたページ",
        "閲覧数（件）",
        "views",
        &[
            ("更新履歴", 510.0),
            ("はじめに", 4380.0),
            ("お問い合わせ", 260.0),
            ("料金", 1970.0),
            ("導入事例", 1340.0),
        ],
    );
    div(
        vec![("class", "blocks-chart-bar-list-layout")],
        vec![inflow, popular_pages],
    )
}
```

## Blocks

| slug | 説明 | 使用部品 | 公式 URL |
|------|------|----------|----------|
| chart-bar-list | ランキング型の横棒リストをカード 2 枚に並べる。棒の長さが最大値に対する割合、右端の数値がその項目の値。`ChartData::sort_by_series` を降順で適用してから `bar_list::root` へ渡す | [Card](../../themes/data-display/card.md) / [Heading](../../themes/typography/heading.md) / [Charts](../../themes/charts/charts.md) / [Bar List](../../themes/charts/bar-list.md) | https://fandhe-ai.github.io/fandhe-frontend/blocks/chart-bar-list/ |
| chart-metric-area | 指標サマリーと面グラフ。3 指標を切り替える `switch` 版（選択中の 1 系列の面グラフ）と、合計値 + 系列別内訳（Desktop / Mobile）と積み上げ面グラフ + 凡例の `breakdown` 版の 2 variant | [Card](../../themes/data-display/card.md) / [Stat](../../themes/data-display/stat.md) / [Area Chart](../../themes/charts/area-chart.md) / [Button](../../themes/forms/button.md) / [Charts](../../themes/charts/charts.md) | https://fandhe-ai.github.io/fandhe-frontend/blocks/chart-metric-area/ |
| chart-stat-cards | 折れ線付き統計カード。上段は統計カード 3 枚（ラベル・合計値・前週比・sparkline）、下段は今期と前期を比較する 2 系列 line-chart 付きカード 2 枚 | [Card](../../themes/data-display/card.md) / [Stat](../../themes/data-display/stat.md) / [Sparkline](../../themes/charts/sparkline.md) / [Line Chart](../../themes/charts/line-chart.md) / [Status](../../themes/data-display/status.md) / [Heading](../../themes/typography/heading.md) | https://fandhe-ai.github.io/fandhe-frontend/blocks/chart-stat-cards/ |

## Notes

- docs-site は crates.io 未公開の crate で、`demo()` は利用者が `use` できる API ではない。利用者は block のコード例をコピーし、既存部品を合成して使う。
- すべての Demo は静的な表示例で、`<form>` 要素を持たず、データ取得・送信・状態管理を行わない。デモデータ・文言は独自に書いた架空のもの。`chart-metric-area` の指標切り替えボタンは `aria-pressed` で選択状態を静的に伝えるのみで、クリックしても表示は変化しない。
- `chart-bar-list` の差分メモ: 系列色は既定の `--fandhe-color-chart-1`。見出しは `card::title` ではなく `heading(HeadingLevel::H3, ...)` を直接合成する。値の右寄せは `bar-list` 部品自身の 2 列グリッド構成で実現しており、block 固有の追加 CSS は持たない。`bar_list::root` は並び順を変更しないため、ランキング順は呼び出し側で `sort_by_series` を適用する。
- 出典（pin SHA `cf5edb9b8f1bf2a63d51dcf50a8d2806e2d8f9f9`）: `crates/docs-site/src/blocks/application/chart/chart_bar_list.rs`（コードは `// blocks-code:begin`〜`end` の範囲）、公式 md は `site/blocks/<slug>.md`。他 2 件も同ディレクトリの `chart_<slug_snake>.rs`。

## Related

- [Application Blocks overview](./overview.md)
- [Charts](../../themes/charts/charts.md)
- [Dashboard（Application Blocks）](./dashboard.md)
