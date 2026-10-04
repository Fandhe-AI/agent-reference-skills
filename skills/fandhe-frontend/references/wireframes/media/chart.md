# Chart

`fandhe-frontend-wireframe-ui` の棒グラフ配置イメージプレースホルダー。`<svg>` / `<canvas>` を使わず `div` の入れ子だけで組み立てる、非インタラクティブな表示専用部品。API は `chart(values, orientation, size)` の 3 引数。

## Signature / Usage

```rust
pub fn chart(values: &[u8], orientation: Orientation, size: Size) -> Node
```

```rust
use fandhe_frontend_wireframe_ui::{chart, Orientation, Size};

chart(&[20, 45, 80, 60, 30, 90], Orientation::Vertical, Size::Md); // 縦棒
chart(&[20, 45, 80, 60], Orientation::Horizontal, Size::Md);        // 横棒
```

## Options / Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| values | `&[u8]` | - | 棒 1 本につき 1 値。先頭 `MAX_BARS`（12）本だけを描画し、各値は 100 超は 100 へクランプしたのち 5 刻みへ量子化（四捨五入相当）してから固定 class を付与する。 |
| orientation | `Orientation` | `Orientation::Horizontal` | Vertical は棒が上へ伸びる縦棒、Horizontal（既定）は右へ伸びる横棒。 |
| size | `Size` | `Size::Md` | サイズ段階（xs〜xl）。太さ・間隔・プロット領域の高さに反映される。 |

## Notes

- 出典: https://fandhe-ai.github.io/fandhe-frontend/wireframes/chart/
- 低忠実度ワイヤーフレーム部品。Themes の Bar Chart / Charts とは別物で、`@ark-ui/react` / `@chakra-ui/react` の JS/TS API とも無関係（Rust 製）。実データを描画するグラフが必要な場合は Themes の Bar Chart / Charts を使う。
- 原案差分: `props::Orientation` を再利用（divider / stack / slider に続く 4 例目）。部品ローカルの `ChartKind` 等は新設していない。
- 5 刻み量子化: 値は 0〜100 へクランプ後に 5 刻みへ丸め、固定 class `fw-wire-chart-value-<q>`（21 種）を付与する。`style` の動的組み立てや `data-value` の出力はしない。例: 42 は 40 に丸まる。
- `MAX_BARS`（12）による資源有界化: 超過分は先頭 12 本だけ描画し、panic しない。
- text 引数を持たず、軸ラベル・凡例・タイトルは無い。折れ線・面・円・散布などの種別、複数系列（グループ化・積み上げ棒）は対象外。
- 非対話: `role` / `aria-*` / `tabindex` / `style` / `on*` / `<svg>` / `<canvas>` を出力しない。配色は `--fw-wire-ink-muted` 系の単色グレースケール。

## Related

- [Media wireframes](./overview.md)
- [Bar Chart (Themes)](../../themes/charts/bar-chart.md)
