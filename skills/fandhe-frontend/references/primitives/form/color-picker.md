# Color Picker

HSV カラーホイール + アルファセレクター。`Disclosure`（開閉）状態機械を内蔵し、canvas を使わない（CSS グラデーション + 決定的なサム位置ゲッターのみ）。

## Signature / Usage

```rust
use fandhe_frontend_headless_ui::color_picker::{self, ColorPicker, ColorPickerProps, Channel};
use fandhe_frontend_headless_ui::color::Hsv;
use fandhe_frontend_headless_ui::data_attrs::Orientation;

let picker = ColorPicker::new(Hsv::new(210, 60, 80).unwrap(), 200);
let props = ColorPickerProps::default();

picker.root(&props, vec![], vec![
    picker.trigger(&props, None, vec![], vec![]),
    picker.positioner(vec![], vec![
        picker.content(None, vec![], vec![
            picker.area(&props, vec![], vec![
                picker.area_thumb(&props, vec![], vec![]),
            ]),
            picker.channel_slider(Channel::Hue, Orientation::Horizontal, vec![], vec![
                picker.channel_slider_thumb(Channel::Hue, Orientation::Horizontal, &props, vec![], vec![]),
            ]),
            picker.hidden_input("color", &props, vec![]),
        ]),
    ]),
]);
```

フリー関数: `color_picker::root(state: OpenState, props: &ColorPickerProps, attrs, children)`, `label(props, attrs, children)`, `control(state, props, attrs, children)`, `trigger(state, props, controls: Option<&str>, attrs, children)`, `positioner(state, attrs, children)`, `content(state, id: Option<&str>, attrs, children)`, `area(props, attrs, children)`, `area_background(props, attrs, children)`, `area_thumb(hex: &str, props, attrs, children)`, `channel_slider(channel, orientation, attrs, children)`, `channel_slider_track(channel, orientation, attrs, children)`, `channel_slider_thumb(channel, orientation, min: &str, max: &str, now: &str, props, attrs, children)`, `channel_input(value, props, attrs)`, `value_text(props, attrs, children)`, `hidden_input(name, value, props, attrs)`。`ColorPicker` のメソッドは `state`（開閉）・現在の HEX / チャンネル値を自動注入する。

## Anatomy

- `root`（`<div>`）, `label`（`<span>`）, `control`（`<div>`）, `trigger`（`<button type="button">`、`aria-haspopup="dialog"` + `aria-expanded`、`controls` が `Some` で `aria-controls`）, `positioner`（閉時は `hidden`）, `content`（`role="dialog"`、閉時は `hidden`）
- `area`, `area-background`, `area-thumb`（`role="slider"`、`aria-label="Color"`、`aria-valuetext` = 現在の HEX、彩度/明度の2D サム）
- `{hue,saturation,value,alpha}-slider` / `-slider-track` / `-slider-thumb`（`role="slider"`、`aria-valuemin` / `aria-valuemax` / `aria-valuenow` / `aria-orientation`）
- `channel-input`（`<input type="text" data-channel="hex">`、HEX 入力）, `value-text`（`<span>`）, `hidden-input`（`type="hidden"`、値は HEX 正規形）

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `ColorPickerProps.disabled` | `bool`（既定 `false`） | `data-disabled`（root / label / control / trigger / area / area-background / area-thumb / channel-input、加えて `channel-slider-thumb` / `value-text`）。`trigger` / `channel_input` / `hidden_input` にネイティブ `disabled`、`area-thumb` / `channel-slider-thumb` は `tabindex="-1"` + `aria-disabled="true"` |
| `ColorPickerProps.readonly` | `bool`（既定 `false`） | `data-readonly`（root / label / control / trigger / area / area-background / area-thumb / channel-input）。`channel_input` にネイティブ `readonly`。thumb のフォーカス可能性は変えない |
| `ColorPickerProps.invalid` | `bool`（既定 `false`） | 上記と同じパーツに `data-invalid`。`channel_input` に `aria-invalid="true"` |
| `ColorPickerProps.required` | `bool`（既定 `false`） | `label` のみに `data-required`（`hidden_input` にネイティブ `required` は付与しない） |
| `orientation` | `Orientation` | `channel_slider` / `channel_slider_track` / `channel_slider_thumb` の `data-orientation`（thumb は `aria-orientation` も） |
| `Channel` | `Hue \| Saturation \| Value \| Alpha` | 軸の識別子。`Channel::max()` が上限値を返す（`359`/`100`/`100`/`255`） |
| `ColorPicker::new(hsv, alpha)` | `Hsv, u8` | 内部の正準表現は HSV + alpha |
| `ColorPicker::from_color(color)` | `Color` | RGB + alpha から構築する |
| `ColorPicker::hex()` | `String` | 現在の色を `#rrggbb`/`#rrggbbaa` で返す |

## Data Attributes

| Part | Attribute | Values |
| --- | --- | --- |
| root / control / trigger / positioner / content | `data-state` | `open` \| `closed` |
| channel-slider / track / thumb | `data-channel` | `hue` \| `saturation` \| `value` \| `alpha` |
| channel-input | `data-channel` | `hex`（固定リテラル） |
| channel-slider / track / thumb | `data-orientation` | `horizontal` \| `vertical` |

## Notes

- ディスパッチアクション: `"open"`/`"close"`/`"toggle"`、`"set_hex"`（ペイロードは `Color::parse_hex` で検証。`#rgb` / `#rgba` / `#rrggbb` / `#rrggbbaa`）、`"set_channel"`（ペイロードは `"<channel>:<value>"`、`Channel::max()` に対して範囲チェック）、`"increment"` / `"decrement"`（ペイロードは `Channel` の固定語彙、step 1 で `0..=Channel::max()` へ clamp しラップしない）。Shift+Arrow / PageUp / PageDown の ×10 step、pointer ドラッグ・keydown の DOM 配線は未提供
- 位置ゲッター: `area_x_percent()` / `area_y_percent()` / `hue_percent()` / `alpha_percent()`（`u8`、0..=100）と `channel_value(channel)`。パート名は `hue-slider` 等の独自体系（ark-ui の `channel-slider` + `data-channel` 構成とは異なる）
- 呼び出し側 `attrs` による固定付与の状態属性（`data-*`）の上書きは除去される
- EyeDropperTrigger、SwatchGroup/SwatchTrigger/SwatchIndicator、TransparencyGrid、フォーマット切り替え（RGBA/HSLA）は対象外。HEX 表示のみ
- `@ark-ui/react` の JS/TS API とは別物（Rust 製、`fandhe-frontend-headless-ui`）

## Related

- [Slider](./slider.md)
