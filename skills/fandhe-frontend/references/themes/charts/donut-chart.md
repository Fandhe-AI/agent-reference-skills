# DonutChart

外部依存ゼロの SVG ノード木生成による環状（annulus）ドーナツグラフ。単一系列専用。

## Signature / Usage

```rust
use fandhe_frontend_pre_styled_ui::donut_chart::{donut_chart, DonutChartProps};
use fandhe_frontend_pre_styled_ui::charts::ChartData;

let node = donut_chart(&DonutChartProps::default(), &data, vec![]).unwrap();
```

## Anatomy

`root` → `chart` → `segment` / `label`

## Options / Props

`DonutChartProps<'a>`:

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `size` | `Size` | `Size::Md` | 寸法 variant |
| `aria_label` | `Option<&'a str>` | `None` | `chart`（svg）の `aria-label`。`None` なら既定値 `"donut chart"` |
| `show_labels` | `bool` | `false` | `true` でカテゴリ名ラベルをセグメント上に描画 |
| `inner_ratio` | `f64` | `0.6` | 外径に対する内径の比率。`0.0 < ratio < 1.0` かつ有限値であること |

`donut_chart(props, data, attrs)` は `Result<Node, PieChartError>` を返す。`data.series().len() != 1` の場合 `PieChartError::MultiSeries`、`inner_ratio` が範囲外の場合 `PieChartError::InvalidInnerRatio`。

## Notes

- `@chakra-ui/react` の JS/TS API とは別物（Rust 製）
- ark-ui に対応する headless anatomy が存在しないため、本クレートのみで新規 anatomy `data-scope="donut-chart"` を定義する
- 非ゼロ値のセグメントが 1 個のみ（100%）の場合は、内外周それぞれ独立した閉円を組み合わせた継ぎ目のない環状 path で描画する
- `--fandhe-donut-chart-size` CSS カスタムプロパティで寸法を切り替える
- Legend / Tooltip・アニメーション・`paddingAngle`/`startAngle`/`endAngle` の任意指定はスコープ外

## Related

- [charts](./charts.md)
- [pie-chart](./pie-chart.md)
