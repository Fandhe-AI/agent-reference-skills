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

`root` → `plot` → `series-line` / `point` / `value-label`（`point` は単一カテゴリ時または `dots` 有効時、`value-label` は `label` 有効時）

## Options / Props

`LineChartProps<'a>`:

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `data` | `&'a ChartData` | 必須 | 描画するチャートデータ |
| `aria_label` | `&'a str` | 必須 | `svg` 要素の `aria-label` |
| `width` | `f64` | `300.0` | `viewBox` 幅 |
| `height` | `f64` | `150.0` | `viewBox` 高さ |
| `size` | `Size` | `Size::Md` | root の CSS 表示高さ variant |
| `curve` | `Curve` (`Linear`/`Natural`/`Step`) | `Linear` | 曲線種。`Natural` は自然三次スプライン補間、`Step` は区間中点で段差になる補間 |
| `dots` | `LineDots` (`None`/`Filled`/`Hollow`) | `None` | データ点マーカー。`Filled` は系列色で塗りつぶした点、`Hollow` は背景色で塗り系列色の輪郭を持つ点。`n >= 2` で有効化すると各データ点に円マーカーを追加 |
| `label` | `LineLabel` (`None`/`Value`/`Category`) | `None` | データ点上のラベル。`Value` は値、`Category` はカテゴリ名 |
| `color_by_category` | `bool` | `false` | データ点の色をカテゴリ index で `chart-1`〜`chart-6` 循環へ切り替える |
| `show_x_axis` | `bool` | `false` | X 軸（カテゴリ）を描画 |
| `show_y_axis` | `bool` | `false` | Y 軸（数値目盛）を描画 |
| `show_grid` | `bool` | `false` | 水平グリッド線を描画 |
| `show_tooltip` | `bool` | `true` | hit-area・`data-index`/`data-series` と `hidden` の SSR ツールチップ DOM を出力 |
| `range` | `Option<&'a str>` | `None` | `Some(v)` のとき root に `data-range="<v>"` を出力（呼び出し側 `attrs` の同名キーは除去） |
| `hidden_series` | `&'a [&'a str]` | `&[]` | 非表示系列名。一致する系列の `series-line`/`point`/`value-label` に `data-hidden` を付与（スケール/domain には影響しない。存在しない名前は無視） |
| `legend` | `bool` | `false` | 凡例トグルと組み合わせて使う場合に `true`（初期表示から `data-series` 識別属性を出力） |

`LineChartProps::new(data, aria_label)` で既定寸法・`Size::Md`・`Linear`/`None`/`None`・軸/グリッドなしの構成を作れる。`line_chart(props, attrs)` は `Result<Node, ChartError>` を返す。`stylesheet() -> String` が静的 CSS 全量を返す。定数 `DEFAULT_WIDTH`（`300.0`）/ `DEFAULT_HEIGHT`（`150.0`）。

## Notes

- `@chakra-ui/react` の JS/TS API とは別物（Rust 製）
- 単一カテゴリ（`n == 1`）では線を生成せず、中央に点マーカー（`point`）のみを描く
- 積み上げ・任意アイコン形状のマーカー・マウス追従ツールチップの JS 配線は本部品のスコープ外（[charts](./charts.md) 参照）
- CSS カスタムプロパティ `--fandhe-line-chart-height`（既定 `auto`）で高さを調整可能

## Related

- [charts](./charts.md)
- [area-chart](./area-chart.md)
- [sparkline](./sparkline.md)
