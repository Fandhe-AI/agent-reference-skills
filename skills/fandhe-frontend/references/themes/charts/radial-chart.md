# RadialChart

shadcn/ui Charts の Radial 相当の同心リング型グラフ。外部依存ゼロの SVG ノード木生成のみで実装し、カテゴリがリング、系列がリング内のセグメントになる。

## Signature / Usage

```rust
use fandhe_frontend_pre_styled_ui::charts::{ChartData, Series};
use fandhe_frontend_pre_styled_ui::radial_chart::{radial_chart, RadialChartProps};

let data = ChartData::new(
    vec!["A".to_string(), "B".to_string()],
    vec![Series::new("total", vec![80.0, 55.0])],
)
.unwrap();
let node = radial_chart(&RadialChartProps::default(), &data, vec![]).unwrap();
```

## Anatomy

`root` → `chart` → `track` / `bar` / `label` / `grid-circle` / `grid-spoke` / `center-value` / `center-label`

## Options / Props

`RadialChartProps<'a>`（`Default` 実装あり）:

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `size` | `Size` | `Size::Md` | 寸法 variant |
| `aria_label` | `Option<&'a str>` | `None` | `chart`（svg）の `aria-label`。`None` なら `"radial chart"` |
| `start_angle_deg` | `f64` | `0.0` | 開始角（度数法・12 時方向 0°・時計回り正） |
| `end_angle_deg` | `f64` | `360.0` | 終了角（度数法） |
| `inner_ratio` | `f64` | `0.3` | 外径に対する内径の比率。`0.0 < ratio < 1.0` かつ有限 |
| `corner_radius` | `f64` | `0.0` | `bar` 弧端の角丸半径（viewBox 単位）。有限かつ `0.0` 以上 |
| `show_track` | `bool` | `true` | 各リングの全スイープ背景トラックを描画 |
| `show_labels` | `bool` | `false` | リング開始角の点にカテゴリ名ラベルを描画 |
| `show_grid` | `bool` | `false` | 極座標グリッド（同心円 + 30° 刻み 12 本の放射スポーク）を描画 |
| `center_text` | `Option<RadialCenterText<'a>>` | `None` | 中央テキスト |
| `show_tooltip` | `bool` | `true` | hit-area・`data-index` と `hidden` の SSR ツールチップ DOM を出力 |
| `range` | `Option<&'a str>` | `None` | `Some(v)` で root へ `data-range="<v>"` を出力 |
| `hidden_series` | `&'a [&'a str]` | `&[]` | 非表示系列名。一致する `bar` へ `data-hidden` と `data-hidden-series` を付与（未知の名前は fail-soft） |
| `hidden_categories` | `&'a [usize]` | `&[]` | 非表示カテゴリ（リング）index。該当リングの `bar` / `label` / `track` へ `data-hidden`（`bar` は `data-hidden-category` も）を付与（未知の index は fail-soft） |
| `legend` | `bool` | `false` | `legend` / `category_legend` を併設することの opt-in。`true` で `data-index` を出力 |

`RadialCenterText<'a>`: `value: &'a str`（中央に大きく表示）/ `label: Option<&'a str>`（値の下の補足、`None` なら描画しない）。

`radial_chart(props: &RadialChartProps<'a>, data: &ChartData, attrs: Vec<(&'a str, &'a str)>) -> Result<Node, RadialChartError>`。`css() -> String` が静的 CSS を返す。

`RadialChartError`:

| Variant | 条件 |
|---------|------|
| `NegativeValue` | いずれかの値が負 |
| `NonFiniteValue` | リングごとの系列値合計がオーバーフローして `inf` になる |
| `ZeroTotal` | 最大リングの系列値合計が `0` |
| `InvalidAngleRange` | 角度が非有限、`end <= start`、または `end - start > 360.0` |
| `InvalidInnerRatio` | `inner_ratio` が非有限または `0.0 < ratio < 1.0` の範囲外 |
| `InvalidCornerRadius` | `corner_radius` が非有限または負 |

バリアント対応（props の組み合わせ）:

| 名前 | props |
|------|-------|
| simple | 系列 1 本、`show_track: true`（既定） |
| label | simple + `show_labels: true` |
| grid | simple + `show_grid: true` |
| text | 系列 1 本・カテゴリ 1 件 + `center_text: Some(..)` |
| shape | text + `corner_radius > 0.0` |
| stacked | 系列 2 本以上・カテゴリ 1 件 + `start -90.0` / `end 90.0` + `center_text` |

## Notes

- 出典: https://fandhe-ai.github.io/fandhe-frontend/themes/radial-chart/
- `@chakra-ui/react` の JS/TS API とは別物（Rust 製）
- ark-ui に対応する headless anatomy が存在しないため、本クレートのみで新規 anatomy `data-scope="radial-chart"` を定義する
- 入力は `ChartData`（`categories` × `series`）。リング = カテゴリ（index 0 が最内周）、リング内のセグメント = 系列（累積して積み上げ）。角度写像は `θ(v) = start + sweep × v / domain_max`（`domain_max` は全リングの系列値合計の最大値）で、最大リングがちょうど `sweep` を埋める
- viewBox は `0 0 100 100` 固定。中心 `(50, 50)`、外径 `45.0`、リング厚は帯の 80%（`RING_GAP` = `0.2`）。値 `0` のセグメントは描画しない。角度幅が全周（360°）またはそれに視覚上区別不能なほど近い場合は `annulus_full_ring_path` + `fill-rule="evenodd"` に切り替え、角丸半径は無視する
- `bar` には `data-series="<系列名>"` を付与する。配色は系列 1 本ならカテゴリ index、2 本以上なら系列ごと（`Series::color` の上書きを尊重）
- ラベルはリング開始角の点に水平配置（`text-anchor: start`）。弧に沿った回転と中央の muted ディスクは意図的に非対応。中央テキストは `center-value` を `(50, 50)`、`center-label` を `(50, 57)` に配置する
- `--fandhe-radial-chart-size`（既定 `16rem`）で寸法を切り替える
- `show_tooltip: false` かつ `range` / `hidden_*` / `legend` を使わない構成では、`data-index` やツールチップ DOM を含まない従来出力とバイト一致する

## Related

- [charts](./charts.md)
- [donut-chart](./donut-chart.md)
- [pie-chart](./pie-chart.md)
- [radar-chart](./radar-chart.md)
