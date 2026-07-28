# PieChart

外部依存ゼロの SVG ノード木生成による円グラフ。単一系列専用。

## Signature / Usage

```rust
use fandhe_frontend_pre_styled_ui::pie_chart::{pie_chart, PieChartProps};
use fandhe_frontend_pre_styled_ui::charts::ChartData;

let node = pie_chart(&PieChartProps::default(), &data, vec![]).unwrap();
```

## Anatomy

`root` → `chart` → `segment` / `label`

## Options / Props

`PieChartProps<'a>`:

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `size` | `Size` | `Size::Md` | 寸法 variant |
| `aria_label` | `Option<&'a str>` | `None` | `chart`（svg）の `aria-label`。`None` なら既定値 `"pie chart"` |
| `show_labels` | `bool` | `false` | `true` でカテゴリ名ラベルをセグメント上に描画 |

`pie_chart(props, data, attrs)` は `Result<Node, PieChartError>` を返す。`data.series().len() != 1` の場合 `PieChartError::MultiSeries`。

## Notes

- `@chakra-ui/react` の JS/TS API とは別物（Rust 製）
- ark-ui に対応する headless anatomy が存在しないため、本クレートのみで新規 anatomy `data-scope="pie-chart"` を定義する
- `color-palette` 軸は提供しない（セグメント配色はチャート共通パレットの循環で決まる）
- `--fandhe-pie-chart-size` CSS カスタムプロパティで寸法を切り替える
- Legend / Tooltip・アニメーション・`paddingAngle`/`startAngle`/`endAngle` の任意指定・中央テキストはスコープ外

## Related

- [charts](./charts.md)
- [donut-chart](./donut-chart.md)
