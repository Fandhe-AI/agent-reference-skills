# Slider

レンジ選択コントロール（単一サム）。水平/垂直の方向に対応する。

## Signature / Usage

```rust
use fandhe_frontend_headless_ui::slider::{self, Slider};
use fandhe_frontend_headless_ui::data_attrs::Orientation;

let slider = Slider::new(0.0, 100.0, 1.0, 40.0, Orientation::Horizontal);

slider.root(vec![], vec![
    slider.control(vec![
        slider.track(vec![
            slider.range(vec![]),
        ]),
        slider.thumb(vec![], vec![]),
    ]),
    slider.hidden_input("volume", vec![]),
    slider.value_text(vec![], vec![]),
]);
```

フリー関数: `slider::root(orientation, disabled, attrs, children)`, `label`, `control(orientation, disabled, attrs, children)`, `track(orientation, disabled, attrs, children)`, `range(orientation, disabled, attrs, children)`, `thumb(orientation, min, max, now, aria_valuetext, disabled, attrs, ...)`, `hidden_input(name, value, disabled, attrs)`, `value_text(attrs, children)`。

## Anatomy

- `root`, `label`, `control`, `track`, `range`（塗りつぶされた部分）
- `thumb` — `<div role="slider">`、`aria-valuemin`/`aria-valuemax`/`aria-valuenow`
- `hidden-input` — `<input type="hidden">`
- `value-text` — `<span>`

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `Slider::new(min, max, step, value, orientation)` | `f64 x4, Orientation` | |
| `percent()` | `f64` | `0.0..=100.0`、導出されるサム位置 |

## Notes

- ディスパッチ: `SliderAction::SetValue` は常にステップグリッドへスナップする（`snap_to_step_and_clamp`）。これは `angle_slider`/`image_cropper` でも再利用される唯一の正規化エントリポイント
- MarkerGroup/Marker パートは持たない（初期実装のスコープであり、ark-ui のオプションパーツに相当する部分は省略している）
- `@ark-ui/react` の JS/TS API とは別物（Rust 製、`fandhe-frontend-headless-ui`）

## Related

- [Angle Slider](./angle-slider.md)
- [Number Input](./number-input.md)
