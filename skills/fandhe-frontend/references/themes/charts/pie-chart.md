# PieChart

外部依存ゼロの SVG ノード木生成による円グラフ。既定は単一系列専用で、`stacked: true` のときのみ複数系列をリング（多重円）として描画する。

## Signature / Usage

```rust
use fandhe_frontend_pre_styled_ui::pie_chart::{pie_chart, PieChartProps};
use fandhe_frontend_pre_styled_ui::charts::{ChartData, Series};

let data = ChartData::new(
    vec!["a".to_string(), "b".to_string()],
    vec![Series::new("share", vec![30.0, 70.0])],
)
.unwrap();
let node = pie_chart(&PieChartProps::default(), &data, vec![]).unwrap();
```

## Anatomy

`root` → `chart` → `segment` / `label` / `label-line` / `outside-label`

## Options / Props

`PieChartProps<'a>`:

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `size` | `Size` | `Size::Md` | 寸法 variant |
| `aria_label` | `Option<&'a str>` | `None` | `chart`（svg）の `aria-label`。`None` なら既定値 `"pie chart"` |
| `show_labels` | `bool` | `false` | `true` でセグメントのラベルを描画 |
| `separator` | `PieSeparator`（`Line` \| `None`） | `Line` | セグメント間セパレータ。`Line` は背景色ストロークで区切る、`None` は `segment` の `stroke` を `none` にする |
| `label_content` | `PieLabelContent`（`Category` \| `Value`） | `Category` | `show_labels` が `true` の場合のラベル内容。`Value` は値（`fmt_coord` 固定書式。数値整形・単位付与は呼び出し側の責務） |
| `label_position` | `PieLabelPosition`（`Inside` \| `Outside`） | `Inside` | ラベル配置。`Outside` は扇形外側・引き出し線付きで外径を縮小する。`stacked` と併用すると引き出しラベルは最外周リングのみ |
| `stacked` | `bool` | `false` | `true` で複数系列をリングとして描画（系列 index 0 が最内周）。`false` は単一系列専用 |
| `show_tooltip` | `bool` | `true` | hit-area・`data-index`/`data-series` と `hidden` の SSR ツールチップ DOM を出力 |
| `range` | `Option<&'a str>` | `None` | `Some(v)` のとき root に `data-range="<v>"` を出力 |
| `hidden_categories` | `&'a [usize]` | `&[]` | 非表示カテゴリ index。`stacked: false` のときのみ参照し、該当 `segment` に `data-hidden` を付与（存在しない index は無視） |
| `hidden_series` | `&'a [&'a str]` | `&[]` | 非表示系列名。`stacked: true` のときのみ参照し、系列名（リング）に一致する全 `segment` に `data-hidden` を付与 |
| `legend` | `bool` | `false` | 凡例（`legend`/`category_legend`）併設の明示的 opt-in。`true` のとき `data-index` を出力 |

`pie_chart(props, data, attrs)` は `Result<Node, PieChartError>` を返す。`stacked: false` で `data.series().len() != 1` の場合 `PieChartError::MultiSeries`。`css() -> String` が静的 CSS 全量を返す。

## Notes

- `@chakra-ui/react` の JS/TS API とは別物（Rust 製）
- ark-ui に対応する headless anatomy が存在しないため、本クレートのみで新規 anatomy `data-scope="pie-chart"` を定義する
- `color-palette` 軸は提供しない（セグメント配色はチャート共通パレットの循環で決まる）
- `--fandhe-pie-chart-size` CSS カスタムプロパティで寸法を切り替える
- アニメーション・`paddingAngle`/`startAngle`/`endAngle` の任意指定・中央テキスト（中央テキストは [donut-chart](./donut-chart.md) の `center_text`）は本部品のスコープ外

## Related

- [charts](./charts.md)
- [donut-chart](./donut-chart.md)
