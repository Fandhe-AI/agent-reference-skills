# Charts (Common API)

チャート部品群（`bar-chart`/`line-chart`/`area-chart` 等）が共通で使うデータモデル・スケール・色トークン・SVG 生成基盤。個々のチャート部品はいずれもこの基盤に依存する。

## Signature / Usage

```rust
use fandhe_frontend_pre_styled_ui::charts::data::{ChartData, Series};

let data = ChartData::new(
    vec!["Jan".to_string(), "Feb".to_string()],
    vec![Series::new("visits", vec![10.0, 30.0])],
)
.unwrap();
```

## Options / Props

`ChartData`（`charts::data`）の主な API:

| Name | Type | Description |
|------|------|-------------|
| `ChartData::new(categories, series)` | `fn(Vec<String>, Vec<Series>) -> Result<ChartData, ChartError>` | カテゴリ・系列群から構築。カテゴリ/系列が空、値数不一致、非有限値のいずれかで `Err` |
| `ChartData::categories()` | `fn(&self) -> &[String]` | カテゴリ軸の並び（挿入順） |
| `ChartData::series()` | `fn(&self) -> &[Series]` | 系列一覧（挿入順） |
| `ChartData::domain()` | `fn(&self) -> (f64, f64)` | 全系列・全カテゴリ横断の値域。フラットデータは対称パディングで非退化を保証 |
| `ChartData::sort_by_series(name, direction)` | `fn(&self, &str, SortDirection) -> Result<ChartData, ChartError>` | 指定系列の値でカテゴリを並べ替えた新しい `ChartData` を返す |
| `ChartData::series_color_var(index)` | `fn(&self, usize) -> String` | 系列 index の色 `var(--fandhe-color-...)`。`Series.color` があればその上書き値、なければ 6 色循環へフォールバック（範囲外 index も panic せず循環） |
| `ChartData::stacked_cumulative(expand)` | `fn(&self, bool) -> Result<Vec<Vec<f64>>, ChartError>` | 積み上げ系チャート向けに、カテゴリごとの系列累積上限値を返す（`cum[i][k]` = 系列 `0..=i` のカテゴリ `k` の合計）。`expand` はカテゴリ合計で正規化した `(0.0, 1.0)` の比率。負値は `NegativeValue`、累積和が `+inf` へオーバーフローすれば `NonFiniteValue` |
| `Series::new(name, values)` | `fn(impl Into<String>, Vec<f64>) -> Series` | 1 系列（系列名 + 値列）を構築。`label`/`color`/`icon` は既定 `None` |
| `Series::with_label(label)` / `with_color(color)` / `with_icon(icon)` | `fn(self, ...) -> Series` | 凡例・ツールチップの表示ラベル / 系列色の上書き / 凡例マーカーの代替アイコン（`Node`）を設定するビルダー（shadcn/ui `ChartConfig` 相当） |
| `Series::display_label()` | `fn(&self) -> &str` | `label` があればそれ、なければ `name` |
| `SeriesColor::token(name)` / `chart_slot(slot)` / `palette(palette)` / `var()` | `token(&str) -> Result<SeriesColor, ThemeError>` / `chart_slot(usize) -> Result<SeriesColor, ThemeError>` / `palette(ColorPalette) -> SeriesColor` / `var(&self) -> &str` | 系列色。`token` は任意の色トークン名、`chart_slot` は `chart-1`〜`chart-6`（1..=6 のみ）、`palette` は `ColorPalette` に対応する色。内部は `var(--fandhe-color-<name>)` 固定形で任意文字列を注入できない |
| `SortDirection` | `Ascending` \| `Descending` | `sort_by_series` のソート方向 |
| `total(series)` / `min(series)` / `max(series)` | `fn(&Series) -> f64 / Option<f64>` | 系列の集計値 |
| `value_percent(series, value)` | `fn(&Series, f64) -> f64` | 系列合計に対する `value` の比率（%）。合計 0 は `0.0` |
| `charts::series_color_var(index)` | `fn(usize) -> String` | 系列 index から `chart-1`〜`chart-6` の色トークン `var()` 参照を返す（6 色循環） |

`ChartError`（`charts::ChartError`）は全チャート部品共通のエラー型（`SeriesLengthMismatch` / `EmptyData` / `NonFiniteValue` / `DegenerateDomain` / `InvalidTickTarget` / `UnknownSeriesName` / `NegativeValue` / `ZeroTotal` / `TooFewAxes` / `PlotAreaTooSmall` / `InvalidGradientId` / `InvalidCornerRadius` / `IndexOutOfRange` / `DuplicateSeriesName`）。`InvalidGradientId` は area chart の `gradient_id` が小文字識別子でない場合、`InvalidCornerRadius` は bar chart の `corner_radius` が非有限または負の場合、`IndexOutOfRange` は bar chart の `active_index` がカテゴリ数以上の場合、`DuplicateSeriesName` は scatter chart の系列名が重複した場合。`charts` は `Curve` / `ChartData` / `Series` / `SeriesColor` / `LinearScale` を再エクスポートする。

## Notes

- `@chakra-ui/react` の JS/TS API とは別物（Rust 製）。chakra-ui の `useChart` 相当を、状態を持たない決定的な Rust 純関数群として提供する
- axis / grid / legend / tooltip（軸・グリッド・凡例・ツールチップ）は本ページのスコープ外（`charts` 基盤の別サブモジュール）
- 外部依存ゼロ（recharts 等の JS ランタイムを使わない）。座標の文字列化は内部で一元化されており、呼び出し側が独自フォーマットを実装する必要はない

## Related

- [area-chart](./area-chart.md)
- [bar-chart](./bar-chart.md)
- [line-chart](./line-chart.md)
