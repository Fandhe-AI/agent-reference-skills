# Slider

`fandhe_frontend_headless_ui::slider` の control / hidden-input / label / thumb / track / value-text パーツをそのまま再エクスポートし、既定 CSS を追加提供する。`size`/`palette` variant クラスは `root` にのみ付与する。

## Signature / Usage

```rust
use fandhe_frontend_pre_styled_ui::slider::{self, SliderProps};
use fandhe_frontend_pre_styled_ui::{ColorPalette, Size};
use fandhe_frontend_headless_ui::slider::Slider;

let s = Slider::default();
let node = slider::root(Size::Md, ColorPalette::Accent, &s, &SliderProps::default(), vec![], vec![]);
```

`root(size, palette, state: &Slider, props: &SliderProps, attrs, children) -> Node`。`range(state: &Slider, props: &SliderProps, attrs) -> Node`、`thumb_styled(state: &Slider, aria_valuetext: Option<&str>, props: &SliderProps, attrs) -> Node` が `--fandhe-slider-percent` を含む `style` を組み立てる。`marker_group(attrs, children) -> Node`（状態を持たない目盛りコンテナ）、`marker(state: &Slider, value: f64, disabled: bool, attrs, children) -> Node`（`--fandhe-slider-marker-percent` を `style` で付与する目盛り）。`stylesheet() -> String` が静的 CSS 全量を返す。

## Anatomy

- `root` / `label` / `control`（`track`/`range`/`thumb` を内包）/ `hidden-input`
- `marker-group`（`marker` を複数内包）

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `size` | `Size`（既定 `Md`） | トラック長・thumb 寸法 custom property |
| `palette` | `ColorPalette`（既定 `Accent`） | `range`/`thumb` の色 |
| `props` | `&SliderProps`（`disabled` / `readonly` / `invalid`: `bool`） | `disabled` は `control`/`range`/`root`/`thumb`/`track` へ `data-disabled` を反映 |
| `marker` の `disabled` | `bool` | `marker` 個別の無効化 |

## Notes

- 動的な値は `--fandhe-slider-percent`（`range`/`thumb` 共有）の 1 経路のみで伝搬する。
- 状態機械 `Slider` は本モジュールから再エクスポートしない。hydration が必要な場合は `fandhe_frontend_headless_ui::slider::Slider` を直接 import する。
- `@chakra-ui/react` の JS/TS API とは別物（Rust 製）。

## Related

- [Angle Slider](./angle-slider.md)
- [Slider (primitives/form)](../../primitives/form/slider.md)
