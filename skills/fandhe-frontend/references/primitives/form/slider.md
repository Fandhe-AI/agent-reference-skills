# Slider

レンジ選択コントロール（単一サム）。水平/垂直の方向に対応する。

## Signature / Usage

```rust
use fandhe_frontend_headless_ui::slider::{self, Slider, SliderProps};
use fandhe_frontend_headless_ui::data_attrs::Orientation;

let slider = Slider::new(0.0, 100.0, 1.0, 40.0, Orientation::Horizontal);
let props = SliderProps::default();

slider.root(&props, vec![], vec![
    slider.control(&props, vec![], vec![
        slider.track(&props, vec![], vec![
            slider.range(&props, vec![], vec![]),
        ]),
        slider.thumb(None, &props, vec![], vec![]),
    ]),
    slider.hidden_input("volume", false, vec![]),
    slider.value_text(vec![], vec![]),
]);
```

フリー関数: `slider::root(orientation, props: &SliderProps, attrs, children)`, `label(props, attrs, children)`, `control(orientation, props, attrs, children)`, `track(orientation, props, attrs, children)`, `range(orientation, props, attrs, children)`, `thumb(orientation, min: &str, max: &str, now: &str, aria_valuetext: Option<&str>, props, attrs, children)`, `hidden_input(name, value, disabled, attrs)`, `value_text(attrs, children)`, `marker_group(attrs, children)`, `marker(orientation, value: f64, current: f64, min: f64, max: f64, disabled, attrs, children)`。`Slider` のメソッドは向き・値・範囲を自動注入する（`hidden_input(name, disabled, attrs)`、`marker(value, disabled, attrs, children)`）。

## Anatomy

- `root`, `label`（`<span>`）, `control`, `track`, `range`（塗りつぶされた部分）
- `thumb` — `<div role="slider">`、`aria-valuemin`/`aria-valuemax`/`aria-valuenow`/`aria-orientation`
- `hidden-input` — `<input type="hidden">`
- `value-text` — `<span>`
- `marker-group` — `<div>`、`marker` — `<div>`（目盛り 1 点）

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `Slider::new(min, max, step, value, orientation)` | `f64 x4, Orientation` | 不正値は fail-closed に正規化（`min`/`max` 不正または `min >= max` は `(0.0, 100.0)`、`step <= 0` は `1.0`、`value` は step グリッドへスナップして `[min, max]` へ clamp） |
| `percent()` | `f64` | `0.0..=100.0`、導出されるサム位置 |
| `SliderProps.disabled` | `bool`（既定 `false`） | 各パーツに `data-disabled`。`thumb` は `tabindex="-1"` + `aria-disabled="true"`（それ以外は `tabindex="0"`） |
| `SliderProps.readonly` | `bool`（既定 `false`） | 各パーツに `data-readonly`（`thumb` のフォーカス可能性は変えない） |
| `SliderProps.invalid` | `bool`（既定 `false`） | 各パーツに `data-invalid` |
| `thumb.aria_valuetext` | `Option<&str>` | `Some` のときのみ `aria-valuetext` を出力 |

## Data Attributes

| Part | Attribute | Values |
| --- | --- | --- |
| root / control / track / range / thumb / marker | `data-orientation` | `horizontal` \| `vertical` |
| root / label / control / track / range / thumb | `data-disabled` / `data-invalid` / `data-readonly` | 存在属性（`SliderProps` に対応） |
| marker | `data-value` | 目盛り値（`[min, max]` へ clamp 済み） |
| marker | `data-state` | `under-value` \| `at-value` \| `over-value`（現在値との大小関係） |
| marker | `data-disabled` | 存在属性 |

## Notes

- `data-state` は root 等には持たない（連続量のため）。複数 thumb（range slider）は未提供
- dispatch: `"set"` / `"increment"` / `"decrement"` / `"increment_large"` / `"decrement_large"`（`step` の 10 倍、PageUp / PageDown 相当）/ `"home"` / `"end"`。pointer ドラッグ・キー入力の DOM 配線はクライアント層の責務
- 呼び出し側 `attrs` による `data-disabled` / `data-invalid` / `data-readonly`（marker は `data-value` / `data-state` / `data-orientation` も）の上書きは除去される
- ディスパッチ: `SliderAction::SetValue` は常にステップグリッドへスナップする（`snap_to_step_and_clamp`）。これは `angle_slider`/`image_cropper` でも再利用される唯一の正規化エントリポイント。`min` / `max` ちょうどの値は常に到達可能
- `@ark-ui/react` の JS/TS API とは別物（Rust 製、`fandhe-frontend-headless-ui`）

## Related

- [Angle Slider](./angle-slider.md)
- [Number Input](./number-input.md)
