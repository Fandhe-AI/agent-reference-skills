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
| `curve` | `AreaCurve` (`Linear`/`Natural`/`Step`) | `Linear` | 曲線種。`Natural` は自然三次スプライン補間、`Step` は区間中点で段差になる補間 |
| `stack` | `AreaStack` (`None`/`Normal`/`Expand`) | `None` | 積み上げ。`Normal` は累積和、`Expand` はカテゴリ合計で正規化（domain `(0, 1)` 固定、Y 軸ラベルは `%`）。積み上げ時は全値が非負である必要があり、負値は `ChartError::NegativeValue` |
| `fill` | `AreaFill` (`Solid`/`Gradient`) | `Solid` | 塗り。`Solid` は `fill-opacity: 0.2` の系列色、`Gradient` は縦方向 `<linearGradient>` |
| `gradient_id` | `&'a str` | `DEFAULT_GRADIENT_ID`（`"fandhe-area"`） | `Gradient` 時の `<linearGradient id>` 接頭辞。`[a-z][a-z0-9-]*` を満たさなければ `ChartError::InvalidGradientId`。1 ページに複数チャートを置く場合は呼び出し側が一意化する |
| `show_x_axis` | `bool` | `false` | X 軸（カテゴリ）を描画 |
| `show_y_axis` | `bool` | `false` | Y 軸（数値目盛）を描画 |
| `show_grid` | `bool` | `false` | 水平グリッド線を描画 |
| `show_tooltip` | `bool` | `true` | hit-area・`data-index`/`data-series` と `hidden` の SSR ツールチップ DOM を出力 |
| `range` | `Option<&'a str>` | `None` | `Some(v)` のとき root に `data-range="<v>"` を出力（表示範囲の不透明な識別子） |
| `hidden_series` | `&'a [&'a str]` | `&[]` | 非表示系列名。一致する系列の `series-area`/`series-line`/`point` に `data-hidden` を付与（スケール/domain には影響しない。存在しない名前は無視） |
| `legend` | `bool` | `false` | 凡例トグルと組み合わせて使う場合に `true`（初期表示から `data-series` 識別属性を出力） |

`AreaChartProps::new(data, aria_label)` で既定寸法・`Size::Md`・`Linear`/`None`/`Solid`・軸/グリッドなしの構成を作れる。`area_chart(props, attrs)` は `Result<Node, ChartError>` を返す。`stylesheet() -> String` が静的 CSS 全量を返す。定数 `DEFAULT_WIDTH`（`300.0`）/ `DEFAULT_HEIGHT`（`150.0`）/ `DEFAULT_GRADIENT_ID`。

## Notes

- `@chakra-ui/react` の JS/TS API とは別物（Rust 製）
- 単一カテゴリ（`n == 1`）では面・線を生成せず、中央に点マーカー（`point`）のみを描く
- マウス追従ツールチップの JS 配線・hover 強調・dots / label / 横向きレイアウトは本部品の対象外。X 軸ラベルの整形（`tickFormatter`）も非対応でカテゴリ文字列をそのまま描く
- CSS カスタムプロパティ `--fandhe-area-chart-height`（既定 `auto`）で高さを調整可能

## Related

- [charts](./charts.md)
- [line-chart](./line-chart.md)
- [sparkline](./sparkline.md)
