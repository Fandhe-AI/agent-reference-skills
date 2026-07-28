# BarSegment

構成比バー（100% 積み上げ）。`ChartData` の 1 系列を対象に、各カテゴリを 1 セグメントとして「系列合計に対する比率」で幅を割り当てた単一の横棒として描画する。

## Signature / Usage

```rust
use fandhe_frontend_pre_styled_ui::charts::bar_segment::root;
use fandhe_frontend_pre_styled_ui::charts::data::{ChartData, Series};

let data = ChartData::new(
    vec!["a".to_string(), "b".to_string()],
    vec![Series::new("visits", vec![25.0, 75.0])],
)
.unwrap();
let node = root(&data, "visits").unwrap();
```

## Anatomy

`root` → `bar` → `segment`、`legend` → `legend-item` → `legend-marker` / `legend-label` / `legend-value`

## Options / Props

`root(data, series_name)`:

| Name | Type | Description |
|------|------|-------------|
| `data` | `&ChartData` | 描画するチャートデータ |
| `series_name` | `&str` | 対象系列名。存在しない場合 `ChartError::UnknownSeriesName` |

`Result<Node, ChartError>` を返す。

## Notes

- `@chakra-ui/react` の JS/TS API とは別物（Rust 製）
- 系列中に負値が含まれる場合 `ChartError::NegativeValue`
- **系列合計が 0 の場合は `ChartError::ZeroTotal`** で構築を拒否する（[bar-list](./bar-list.md) と異なり、構成比自体が定義できないため）
- 各セグメントの色はカテゴリ index を `series_color_var` に渡して循環決定する（系列 index で循環する [bar-chart](./bar-chart.md) とは対象が異なる）
- セグメント幅は CSS カスタムプロパティ `--fandhe-bar-segment-percent` で伝搬する

## Related

- [charts](./charts.md)
- [bar-list](./bar-list.md)
- [bar-chart](./bar-chart.md)
