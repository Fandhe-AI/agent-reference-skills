# Sparkline

[area-chart](./area-chart.md) の単一系列専用の縮小版。ラベル・軸なしの小さな「面 + 線」チャートを、単一の数値列 `&[f64]` から直接描画する。

## Signature / Usage

```rust
use fandhe_frontend_pre_styled_ui::sparkline::{sparkline, SparklineProps};

let values = [10.0, 30.0, 20.0, 40.0];
let node = sparkline(&SparklineProps::new(&values, "weekly trend"), vec![]).unwrap();
```

## Anatomy

`root` → `plot` → `series-area` / `series-line`（単一値時は `point`）

## Options / Props

`SparklineProps<'a>`:

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `values` | `&'a [f64]` | 必須 | 単一系列の値列 |
| `aria_label` | `&'a str` | 必須 | `svg` 要素の `aria-label` |
| `width` | `f64` | `112.0` | `viewBox` 幅（chakra `w={28}` トークン相当） |
| `height` | `f64` | `48.0` | `viewBox` 高さ（chakra `h={12}` トークン相当） |
| `size` | `Size` | `Size::Md` | root の CSS 表示高さ variant |

`SparklineProps::new(values, aria_label)` で既定寸法・`Size::Md` の構成を作れる。`sparkline(props, attrs)` は `Result<Node, ChartError>` を返す。

## Notes

- `@chakra-ui/react` の JS/TS API とは別物（Rust 製）
- 複数系列・軸/グリッド/凡例/ツールチップは提供しない（定義上ラベルなしの縮小表示のみ）
- 内部で合成カテゴリ（インデックス文字列）を使い `ChartData` へ変換して構築する。空データ・非有限値混入は fail-closed で拒否
- CSS カスタムプロパティ `--fandhe-sparkline-height`（既定 `auto`）で高さを調整可能

## Related

- [charts](./charts.md)
- [area-chart](./area-chart.md)
- [line-chart](./line-chart.md)
