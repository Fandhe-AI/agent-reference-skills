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

`root` → `grid` / `spoke` / `axis-label` / `series` / `point` / `axis-value` / `radius-label`

## Options / Props

`RadarChartProps`（`Clone` / `PartialEq`。`Copy` ではない）:

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `size` | `f64` | `300.0` | `viewBox` の一辺の長さ（正方形、px 相当） |
| `grid` | `RadarGrid`（`Polygon` \| `Circle` \| `None`） | `Polygon` | 同心グリッドの形状。`None` は描画しない |
| `grid_rings` | `RadarGridRings`（`Ticks` \| `Outer`） | `Ticks` | 同心リング本数。`Ticks` は `LinearScale::ticks` の 0 超 tick ごとに 1 本、`Outer` は外周 1 本のみ |
| `grid_fill` | `RadarGridFill`（`None` \| `Series`） | `None` | グリッドの塗り。`Series` は先頭系列色で最外周リング 1 枚にのみ `fill-opacity: 0.2` で塗る |
| `spokes` | `bool` | `true` | スポーク（中心 → 各軸頂点の線）を描画 |
| `fill` | `RadarFill`（`Solid` \| `None`） | `Solid` | 系列ポリゴンの塗り。`Solid` は系列色で半透明（`fill-opacity: 0.2`）、`None` は輪郭のみ |
| `dots` | `bool` | `false` | データ点マーカーを描画 |
| `axis_label` | `RadarAxisLabel`（`Category` \| `ValueAndCategory`） | `Category` | 軸ラベルの内容。`ValueAndCategory` は各系列の値（`/` 区切り）+ カテゴリ名の 2 行 |
| `radius_axis` | `bool` | `false` | 半径軸（値目盛ラベル）を描画 |
| `show_tooltip` | `bool` | `true` | hit-area・`data-index` と `hidden` の SSR ツールチップ DOM を出力（既存 `series` の `data-series` は不変） |
| `range` | `Option<String>` | `None` | `Some(v)` のとき root に `data-range="<v>"` を出力 |
| `hidden_series` | `Vec<String>` | 空 | 非表示系列名。一致する `series`/`point` に `data-hidden` を付与（存在しない名前は無視） |

`root(data, props, aria_label)` は `Result<Node, ChartError>` を返す。`css() -> String` が静的 CSS 全量を返す。

`data-series`（`series` パーツへ付与、値は系列名）は headless-ui に対応部品を持たない pre-styled-only 語彙。

## Notes

- `@chakra-ui/react` の JS/TS API とは別物（Rust 製）
- 軸（`categories`）が 3 未満の場合 `ChartError::TooFewAxes`
- 系列値に負値が含まれる場合 `ChartError::NegativeValue`
- `size` からラベル余白を差し引いた `plot_radius` が 0 以下の場合 `ChartError::PlotAreaTooSmall`
- 頂点角度は `θ_i = -π/2 + i · 2π / n`（12 時方向開始・時計回り）
- 凡例は [charts](./charts.md) 参照

## Related

- [charts](./charts.md)
- [scatter-chart](./scatter-chart.md)
