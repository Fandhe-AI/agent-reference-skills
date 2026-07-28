# ScatterChart

外部依存ゼロ・決定的な SVG 散布図。`ChartData` の形状（カテゴリ軸 + 系列値）では `(x, y)` 数値ペアを表現できないため、独自の `ScatterData`/`ScatterSeries` を使う。

## Signature / Usage

```rust
use fandhe_frontend_pre_styled_ui::charts::scatter_chart::{
    root, ScatterChartProps, ScatterData, ScatterSeries,
};

let data = ScatterData::new(vec![ScatterSeries::new(
    "a",
    vec![(1.0, 2.0), (3.0, 4.0)],
)])
.unwrap();
let node = root(&data, ScatterChartProps::default(), "scatter demo").unwrap();
```

## Anatomy

`root` → `point`

## Options / Props

`ScatterChartProps`:

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `width` | `f64` | `480.0` | `viewBox` 幅 |
| `height` | `f64` | `300.0` | `viewBox` 高さ |
| `point_radius` | `f64` | `4.0` | 点マーカーの半径 |

`ScatterData::new(series: Vec<ScatterSeries>)` は `Result<ScatterData, ChartError>`（系列が空/全点 0 件で `EmptyData`、非有限座標で `NonFiniteValue`）。`ScatterSeries::new(name, points: Vec<(f64, f64)>)` で 1 系列を構築。`root(data, props, aria_label)` は `Result<Node, ChartError>` を返す。

`data-series`（`point` パーツへ付与、値は系列名）は headless-ui に対応部品を持たない pre-styled-only 語彙（[radar-chart](./radar-chart.md) と共通）。

## Notes

- `@chakra-ui/react` の JS/TS API とは別物（Rust 製）
- 全系列・全点横断の x/y `(min, max)` から 2 軸線形スケールを算出する。`min == max`（退化 domain）は対称区間へ拡張して回避する
- range を `point_radius` だけ内側へ縮めて写像するため、domain 両端の点でも円全体が `viewBox` 内に収まる
- 軸線・グリッド・凡例・ツールチップはスコープ外（[charts](./charts.md) 参照）

## Related

- [charts](./charts.md)
- [radar-chart](./radar-chart.md)
