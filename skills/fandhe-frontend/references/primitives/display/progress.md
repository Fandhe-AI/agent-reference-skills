# Progress

進捗表示（Linear / Circular）の headless コンポーネント。Root / Label / ValueText / Track / Range の 5 anatomy パーツ（Linear）に加え、Circle / CircleTrack / CircleRange（SVG、Circular）を提供する値状態機械 `Progress`。

## Signature / Usage

```rust
use fandhe_frontend_headless_ui::progress::{Progress, Orientation};

let p = Progress::new(0.0, 100.0, Some(40.0), Orientation::Horizontal);
let node = p.root(
    None,
    vec![],
    vec![p.track(vec![], vec![p.range(vec![], vec![])])],
);
```

## Anatomy

```
root（Linear）
  label
  track
    range
  value-text

circle（Circular、SVG）
circle_track
circle_range
```

## Options / Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `Progress::new: min` / `max` | `f64` | `0.0` / `100.0` | 値の範囲。非有限または `min >= max` の場合は既定 `(0.0, 100.0)` へフォールバック |
| `Progress::new: value` | `Option<f64>` | `Some(0.0)` | 現在値。`None` は indeterminate（不定進捗） |
| `Progress::new: orientation` | `Orientation` | `Horizontal` | `data-orientation` に反映（Linear のみ意味を持つ） |
| `root: aria_valuetext` | `Option<&str>` | `None` | `Some` のときのみ `aria-valuetext` を出力 |

## Data Attributes

| Part | Attribute | Values |
| --- | --- | --- |
| root / label / value-text / track / range / circle / circle-track / circle-range | `data-state` | `indeterminate` \| `loading` \| `complete` |
| root | `data-value` | 数値（indeterminate 時は省略） |
| root | `data-max` | 数値 |
| root / track / range | `data-orientation` | `horizontal` \| `vertical`（circle 系には付与しない） |

## Notes

- `root` には `role="progressbar"`・`aria-valuemin`/`aria-valuemax`（常に出力）・`aria-valuenow`（determinate のみ）を付与する。
- Circular（`circle`/`circle_track`/`circle_range`）は `--size`/`--thickness` の CSS 変数を参照する固定 `style` を出力し、実サイズは styled 層/呼び出し側の CSS が決める（headless 中立）。呼び出し側が `attrs` に `style` を渡しても無視される（重複属性防止）。
- `@ark-ui/react` の JS/TS API とは別物（Rust 製）。

## Related

- [Avatar](./avatar.md)
