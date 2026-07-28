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
| `Series::new(name, values)` | `fn(impl Into<String>, Vec<f64>) -> Series` | 1 系列（系列名 + 値列）を構築 |
| `total(series)` / `min(series)` / `max(series)` | `fn(&Series) -> f64 / Option<f64>` | 系列の集計値 |
| `value_percent(series, value)` | `fn(&Series, f64) -> f64` | 系列合計に対する `value` の比率（%）。合計 0 は `0.0` |
| `charts::series_color_var(index)` | `fn(usize) -> String` | 系列 index から `chart-1`〜`chart-6` の色トークン `var()` 参照を返す（6 色循環） |

`ChartError`（`charts::ChartError`）は全チャート部品共通のエラー型（`SeriesLengthMismatch` / `EmptyData` / `NonFiniteValue` / `DegenerateDomain` / `InvalidTickTarget` / `UnknownSeriesName` / `NegativeValue` / `ZeroTotal` / `TooFewAxes` / `PlotAreaTooSmall`）。

## Notes

- `@chakra-ui/react` の JS/TS API とは別物（Rust 製）。chakra-ui の `useChart` 相当を、状態を持たない決定的な Rust 純関数群として提供する
- axis / grid / legend / tooltip（軸・グリッド・凡例・ツールチップ）は本ページのスコープ外（`charts` 基盤の別サブモジュール）
- 外部依存ゼロ（recharts 等の JS ランタイムを使わない）。座標の文字列化は内部で一元化されており、呼び出し側が独自フォーマットを実装する必要はない

## Related

- [area-chart](./area-chart.md)
- [bar-chart](./bar-chart.md)
- [line-chart](./line-chart.md)
