# LineChart

`charts` 基盤（座標スケーリング + SVG ノード木生成）の最初の消費者。系列ごとの折れ線を描く自己完結部品。

## Signature / Usage

```rust
use fandhe_frontend_pre_styled_ui::line_chart::{line_chart, LineChartProps};
use fandhe_frontend_pre_styled_ui::charts::data::{ChartData, Series};

let data = ChartData::new(
    vec!["Jan".to_string(), "Feb".to_string(), "Mar".to_string()],
    vec![Series::new("visits", vec![10.0, 30.0, 20.0])],
)
.unwrap();
let node = line_chart(&LineChartProps::new(&data, "monthly visits"), vec![]).unwrap();
```

## Anatomy

`root` → `plot` → `series-line`（単一カテゴリ時は `point`）

## Options / Props

`LineChartProps<'a>`:

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `data` | `&'a ChartData` | 必須 | 描画するチャートデータ |
| `aria_label` | `&'a str` | 必須 | `svg` 要素の `aria-label` |
| `width` | `f64` | `300.0` | `viewBox` 幅 |
| `height` | `f64` | `150.0` | `viewBox` 高さ |
| `size` | `Size` | `Size::Md` | root の CSS 表示高さ variant |

`LineChartProps::new(data, aria_label)` で既定寸法・`Size::Md` の構成を作れる。`line_chart(props, attrs)` は `Result<Node, ChartError>` を返す。

## Notes

- `@chakra-ui/react` の JS/TS API とは別物（Rust 製）
- 単一カテゴリ（`n == 1`）では線を生成せず、中央に点マーカー（`point`）のみを描く
- 軸・グリッド・凡例・ツールチップ・曲線補間（`curveType`）・積み上げはスコープ外（[charts](./charts.md) 参照）
- CSS カスタムプロパティ `--fandhe-line-chart-height`（既定 `auto`）で高さを調整可能

## Related

- [charts](./charts.md)
- [area-chart](./area-chart.md)
- [sparkline](./sparkline.md)
