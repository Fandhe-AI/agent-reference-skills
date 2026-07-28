# BarList

ランキング型バーリスト。`ChartData` の 1 系列を対象に、各カテゴリの値を「その系列の最大値に対する比率」で幅を決めた横棒として並べる（HTML/CSS のみ、SVG 非経由）。

## Signature / Usage

```rust
use fandhe_frontend_pre_styled_ui::charts::bar_list::root;
use fandhe_frontend_pre_styled_ui::charts::data::{ChartData, Series};

let data = ChartData::new(
    vec!["a".to_string(), "b".to_string()],
    vec![Series::new("visits", vec![10.0, 30.0])],
)
.unwrap();
let node = root(&data, "visits").unwrap();
```

## Anatomy

`root` → `item` → `label` / `value` / `track` → `bar`

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
- 系列の最大値が 0（全値 0）の場合は fail しない。全バー幅を 0% として決定的に描画する
- 並び順は変更しない。ソートしたい場合は呼び出し側が `ChartData::sort_by_series` を事前に呼ぶ
- バー幅は CSS カスタムプロパティ `--fandhe-bar-list-percent` で伝搬する

## Related

- [charts](./charts.md)
- [bar-chart](./bar-chart.md)
- [bar-segment](./bar-segment.md)
