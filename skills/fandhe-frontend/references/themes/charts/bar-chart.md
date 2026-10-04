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

`root` → `bar` / `category-label` / `value-label` / `inside-label`

## Options / Props

`BarChartProps`（`Clone` / `PartialEq`。`Copy` ではない）:

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `orientation` | `Orientation`（`Vertical` \| `Horizontal`） | `Vertical` | カテゴリ軸の向き。`Vertical` は棒が縦に伸びる、`Horizontal` は横に伸びる |
| `width` | `f64` | `480.0` | `viewBox` 幅 |
| `height` | `f64` | `300.0` | `viewBox` 高さ |
| `stack` | `BarStack`（`None` \| `Normal` \| `Expand`） | `None` | 積み上げ。`Normal` は累積和、`Expand` はカテゴリ合計で正規化（domain `(0, 1)` 固定、値軸ラベルは `%`）。積み上げ時は全値が非負である必要があり、負値は `ChartError::NegativeValue` |
| `corner_radius` | `f64` | `0.0` | 棒の角丸半径（px）。非有限または負値は `ChartError::InvalidCornerRadius`。実効半径は `min(radius, w/2, h/2)` にクランプ |
| `label` | `BarLabel`（`None` \| `Outside` \| `Inside`） | `None` | 値ラベル。`Outside` は棒先端の外側、`Inside` は先端の外側に値ラベル + ベースライン側の内側にカテゴリ名ラベル（横棒向け。`show_category_labels: false` と組み合わせる想定） |
| `active_index` | `Option<usize>` | `None` | 強調表示するカテゴリの index。カテゴリ数以上は `ChartError::IndexOutOfRange` |
| `color_by_category` | `bool` | `false` | カテゴリごとに色を変える（`chart-1`〜`chart-6` 循環）。単一系列データ向け |
| `highlight_negative` | `bool` | `false` | 負値の棒を `chart-2` で強調 |
| `show_value_axis` | `bool` | `false` | 値軸（目盛線・目盛ラベル）を描画。`Vertical` は左 Y 軸、`Horizontal` は下 X 軸 |
| `show_grid` | `bool` | `false` | 値軸に直交するグリッド線を描画 |
| `show_category_labels` | `bool` | `true` | カテゴリラベルを描画 |
| `show_tooltip` | `bool` | `true` | hit-area・`data-index`/`data-series` と `hidden` の SSR ツールチップ DOM を出力。`true` のとき戻り値は素の `<svg data-part="root">` ではなく `<div data-scope="chart" data-part="frame">` で包まれる（`false` は素の `<svg>`） |
| `range` | `Option<String>` | `None` | `Some(v)` のとき root に `data-range="<v>"` を出力 |
| `hidden_series` | `Vec<String>` | 空 | 非表示系列名。一致する系列の `bar`/`value-label`/`inside-label` に `data-hidden` を付与（スケール/domain には影響しない。存在しない名前は無視） |
| `legend` | `bool` | `false` | 凡例トグルと組み合わせて使う場合に `true`（初期表示から識別属性を出力） |

`root(data: &ChartData, props: BarChartProps, aria_label: &str)` は `Result<Node, ChartError>` を返す。`css() -> String` が静的 CSS 全量を返す。

## Notes

- `@chakra-ui/react` の JS/TS API とは別物（Rust 製）
- 値軸は必ず 0 を跨ぐよう domain を拡張してからスケーリングする（棒はベースライン 0 起点）
- `width`/`height` がカテゴリラベル用余白を差し引いた結果 0 以下になる場合 `ChartError::PlotAreaTooSmall` を返す
- 凡例・ツールチップの詳細は [charts](./charts.md) 参照

## Related

- [charts](./charts.md)
- [bar-list](./bar-list.md)
- [bar-segment](./bar-segment.md)
