# AreaChart

系列ごとに折れ線（`series-line`）と domain 下端へ閉じた塗りつぶし面（`series-area`）を重ねて描く自己完結の SVG チャート部品。

## Signature / Usage

```rust
use fandhe_frontend_pre_styled_ui::area_chart::{area_chart, AreaChartProps};
use fandhe_frontend_pre_styled_ui::charts::data::{ChartData, Series};

let data = ChartData::new(
    vec!["Jan".to_string(), "Feb".to_string(), "Mar".to_string()],
    vec![Series::new("visits", vec![10.0, 30.0, 20.0])],
)
.unwrap();
let node = area_chart(&AreaChartProps::new(&data, "monthly visits"), vec![]).unwrap();
```

## Anatomy

`root` → `plot` → `series-area` / `series-line`（単一カテゴリ時は `point`）

## Options / Props

`AreaChartProps<'a>`:

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `data` | `&'a ChartData` | 必須 | 描画するチャートデータ |
| `aria_label` | `&'a str` | 必須 | `svg` 要素の `aria-label` |
| `width` | `f64` | `300.0` | `viewBox` 幅 |
| `height` | `f64` | `150.0` | `viewBox` 高さ |
| `size` | `Size` | `Size::Md` | root の CSS 表示高さ variant |

`AreaChartProps::new(data, aria_label)` で既定寸法・`Size::Md` の構成を作れる。`area_chart(props, attrs)` は `Result<Node, ChartError>` を返す。

## Notes

- `@chakra-ui/react` の JS/TS API とは別物（Rust 製）
- 単一カテゴリ（`n == 1`）では面・線を生成せず、中央に点マーカー（`point`）のみを描く
- `stackId`（積み上げ）・`curveType`（曲線補間）は本イシューのスコープ外
- CSS カスタムプロパティ `--fandhe-area-chart-height`（既定 `auto`）で高さを調整可能

## Related

- [charts](./charts.md)
- [line-chart](./line-chart.md)
- [sparkline](./sparkline.md)
