# BarChart

`ChartData`（複数系列）+ `LinearScale` + SVG 生成ヘルパーのみで組み立てる、外部依存ゼロ・決定的なグループ棒グラフ。

## Signature / Usage

```rust
use fandhe_frontend_pre_styled_ui::charts::bar_chart::{root, BarChartProps};
use fandhe_frontend_pre_styled_ui::charts::data::{ChartData, Series};

let data = ChartData::new(
    vec!["Jan".to_string(), "Feb".to_string()],
    vec![Series::new("visits", vec![10.0, 30.0])],
)
.unwrap();
let node = root(&data, BarChartProps::default(), "monthly visits").unwrap();
```

## Anatomy

`root` → `bar` / `category-label`

## Options / Props

`BarChartProps`:

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `orientation` | `Orientation`（`Vertical` \| `Horizontal`） | `Vertical` | カテゴリ軸の向き。`Vertical` は棒が縦に伸びる、`Horizontal` は横に伸びる |
| `width` | `f64` | `480.0` | `viewBox` 幅 |
| `height` | `f64` | `300.0` | `viewBox` 高さ |

`root(data, props, aria_label)` は `Result<Node, ChartError>` を返す。

## Notes

- `@chakra-ui/react` の JS/TS API とは別物（Rust 製）
- 値軸は必ず 0 を跨ぐよう domain を拡張してからスケーリングする（棒はベースライン 0 起点）
- `width`/`height` がカテゴリラベル用余白を差し引いた結果 0 以下になる場合 `ChartError::PlotAreaTooSmall` を返す
- 軸線・グリッド・凡例・ツールチップは本モジュールのスコープ外（[charts](./charts.md) 参照）

## Related

- [charts](./charts.md)
- [bar-list](./bar-list.md)
- [bar-segment](./bar-segment.md)
