# DonutChart

外部依存ゼロの SVG ノード木生成による環状（annulus）ドーナツグラフ。単一系列専用。

## Signature / Usage

```rust
use fandhe_frontend_pre_styled_ui::donut_chart::{donut_chart, DonutChartProps};
use fandhe_frontend_pre_styled_ui::charts::{ChartData, Series};

let data = ChartData::new(
    vec!["a".to_string(), "b".to_string()],
    vec![Series::new("share", vec![30.0, 70.0])],
)
.unwrap();
let node = donut_chart(&DonutChartProps::default(), &data, vec![]).unwrap();
```

## Anatomy

`root` → `chart` → `segment` / `label` / `label-line` / `outside-label`（`center_text` 指定時は中央テキスト）

## Options / Props

`DonutChartProps<'a>`:

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `size` | `Size` | `Size::Md` | 寸法 variant |
| `aria_label` | `Option<&'a str>` | `None` | `chart`（svg）の `aria-label`。`None` なら既定値 `"donut chart"` |
| `show_labels` | `bool` | `false` | `true` でセグメントのラベルを描画 |
| `inner_ratio` | `f64` | `0.6` | 外径に対する内径の比率。`0.0 < ratio < 1.0` かつ有限値であること |
| `separator` | `PieSeparator`（`Line` \| `None`） | `Line` | セグメント間セパレータ（`pie-chart` と共有） |
| `label_content` | `PieLabelContent`（`Category` \| `Value`） | `Category` | `show_labels` が `true` の場合のラベル内容 |
| `label_position` | `PieLabelPosition`（`Inside` \| `Outside`） | `Inside` | `show_labels` が `true` の場合のラベル配置 |
| `active_index` | `Option<usize>` | `None` | 強調表示するセグメントのカテゴリ index。範囲外は `PieChartError::InvalidActiveIndex` |
| `center_text` | `Option<PieCenterText<'a>>` | `None` | 中央テキスト。`PieCenterText { value: &str, label: Option<&str> }`（`value` は中央、`label` はその下の補助ラベル）。合計値の算出・整形は呼び出し側の責務 |
| `show_tooltip` | `bool` | `true` | hit-area・`data-index` と `hidden` の SSR ツールチップ DOM を出力（単一系列専用のため `data-series` は出力しない） |
| `range` | `Option<&'a str>` | `None` | `Some(v)` のとき root に `data-range="<v>"` を出力 |
| `hidden_categories` | `&'a [usize]` | `&[]` | 非表示カテゴリ index。該当 `segment` に `data-hidden` を付与（存在しない index は無視） |
| `legend` | `bool` | `false` | `category_legend` 併設の明示的 opt-in。`true` のとき `data-index` を出力 |

`donut_chart(props, data, attrs)` は `Result<Node, PieChartError>` を返す。`data.series().len() != 1` の場合 `PieChartError::MultiSeries`、`inner_ratio` が範囲外の場合 `PieChartError::InvalidInnerRatio`、`active_index` が範囲外の場合 `PieChartError::InvalidActiveIndex`。`css() -> String` が静的 CSS 全量を返す。

## Notes

- `@chakra-ui/react` の JS/TS API とは別物（Rust 製）
- ark-ui に対応する headless anatomy が存在しないため、本クレートのみで新規 anatomy `data-scope="donut-chart"` を定義する
- 非ゼロ値のセグメントが 1 個のみ（100%）の場合は、内外周それぞれ独立した閉円を組み合わせた継ぎ目のない環状 path で描画する
- `--fandhe-donut-chart-size` CSS カスタムプロパティで寸法を切り替える
- アニメーション・`paddingAngle`/`startAngle`/`endAngle` の任意指定はスコープ外

## Related

- [charts](./charts.md)
- [pie-chart](./pie-chart.md)
