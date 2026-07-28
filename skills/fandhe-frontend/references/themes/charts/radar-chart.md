# RadarChart

`ChartData`（カテゴリ = 軸、系列 = ポリゴン）+ `LinearScale`（半径写像）+ SVG 生成ヘルパーで外部依存ゼロ・決定的に組み立てるレーダーチャート。

## Signature / Usage

```rust
use fandhe_frontend_pre_styled_ui::charts::data::{ChartData, Series};
use fandhe_frontend_pre_styled_ui::charts::radar_chart::{root, RadarChartProps};

let data = ChartData::new(
    vec!["speed".into(), "power".into(), "range".into(), "control".into()],
    vec![Series::new("mercury", vec![80.0, 60.0, 40.0, 90.0])],
)
.unwrap();
let node = root(&data, RadarChartProps::default(), "stat comparison").unwrap();
```

## Anatomy

`root` → `grid` / `spoke` / `axis-label` / `series`

## Options / Props

`RadarChartProps`:

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `size` | `f64` | `300.0` | `viewBox` の一辺の長さ（正方形、px 相当） |

`root(data, props, aria_label)` は `Result<Node, ChartError>` を返す。

`data-series`（`series` パーツへ付与、値は系列名）は headless-ui に対応部品を持たない pre-styled-only 語彙。

## Notes

- `@chakra-ui/react` の JS/TS API とは別物（Rust 製）
- 軸（`categories`）が 3 未満の場合 `ChartError::TooFewAxes`
- 系列値に負値が含まれる場合 `ChartError::NegativeValue`
- `size` からラベル余白を差し引いた `plot_radius` が 0 以下の場合 `ChartError::PlotAreaTooSmall`
- 頂点角度は `θ_i = -π/2 + i · 2π / n`（12 時方向開始・時計回り）
- 凡例・ツールチップはスコープ外（[charts](./charts.md) 参照）

## Related

- [charts](./charts.md)
- [scatter-chart](./scatter-chart.md)
