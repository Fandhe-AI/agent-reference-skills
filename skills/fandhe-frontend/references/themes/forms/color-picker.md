# Color Picker

`fandhe_frontend_headless_ui::color_picker` の Label / Control / Positioner / Content / ChannelInput / ValueText / HiddenInput パーツをそのまま再エクスポートし、動的な位置・色を伴う Root / Trigger / Area / AreaBackground / AreaThumb / ChannelSlider(+Track/+Thumb) は `ColorPicker` 状態機械を受け取る styled ラッパーとして個別に組み立てる。CSS グラデーションのみで構成され、canvas/web-sys には依存しない。

## Signature / Usage

```rust
use fandhe_frontend_pre_styled_ui::color_picker;
use fandhe_frontend_headless_ui::color_picker::ColorPicker;

let cp = ColorPicker::default();
let node = color_picker::root(&cp, vec![], vec![]);
```

`trigger(state, disabled, controls: Option<&str>, attrs, children)`、`area(state, attrs, children)`、`area_background(state, attrs, children)`、`area_thumb(state, disabled, attrs, children)`、`channel_slider(channel: Channel, state, attrs, children)`、`channel_slider_track(channel, state, attrs, children)`、`channel_slider_thumb(channel, state, disabled, attrs, children)`。`css() -> String` が静的 CSS 全量を返す。

## Anatomy

- `root` / `label` / `control` / `trigger` / `positioner` / `content`
- `area` / `area-background` / `area-thumb`
- `hue-slider` / `hue-slider-track` / `hue-slider-thumb`
- `alpha-slider` / `alpha-slider-track` / `alpha-slider-thumb`
- `channel-input` / `value-text` / `hidden-input`

## Notes

- 動的な色・位置は custom property の注入のみで伝搬する（例: `area_thumb` の `--fandhe-color-picker-x`/`-y`、`trigger` の `--fandhe-color-picker-preview`）。値はすべて検証済み HEX/整数のため CSS インジェクション経路を持たない。
- `size`/`palette` variant は本コンポーネントのスコープ外（固定サイズ・単色の最小実装）。
- 状態機械 `ColorPicker` は本モジュールから再エクスポートしない。hydration が必要な場合は `fandhe_frontend_headless_ui::color_picker::ColorPicker` を直接 import する。
- `@chakra-ui/react` の JS/TS API とは別物（Rust 製）。

## Related

- [Color Picker (primitives/form)](../../primitives/form/color-picker.md)
