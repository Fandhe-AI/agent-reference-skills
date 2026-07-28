# Color Picker

HSV カラーホイール + アルファセレクター。`Disclosure`（開閉）状態機械を内蔵し、canvas を使わない（CSS グラデーション + 決定的なサム位置ゲッターのみ）。

## Signature / Usage

```rust
use fandhe_frontend_headless_ui::color_picker::{self, ColorPicker, Channel};
use fandhe_frontend_headless_ui::color::Hsv;

let picker = ColorPicker::new(Hsv::new(210, 60, 80).unwrap(), 200);

picker.root(vec![], vec![
    picker.trigger(false, None, vec![], vec![]),
    picker.positioner(vec![
        picker.content(None, vec![
            picker.area(vec![
                picker.area_thumb(false, vec![], vec![]),
            ]),
            picker.channel_slider(Channel::Hue, vec![
                picker.channel_slider_thumb(Channel::Hue, false, vec![], vec![]),
            ]),
            picker.hidden_input("color", false, vec![]),
        ]),
    ]),
]);
```

フリー関数: `color_picker::root`, `label`, `control`, `trigger(state, disabled, controls, attrs, children)`, `positioner`, `content`, `area`, `area_background`, `area_thumb(hex, disabled, attrs, children)`, `channel_slider(channel, attrs, children)`, `channel_slider_track`, `channel_slider_thumb(channel, min, max, now, disabled, attrs, children)`, `channel_input(value, disabled, attrs)`, `value_text`, `hidden_input(name, value, disabled, attrs)`。

## Anatomy

- `root`, `label`, `control`, `trigger`（`<button type="button">`、`aria-haspopup="dialog"`）, `positioner`（閉時は非表示）, `content`（`role="dialog"`）
- `area`, `area-background`, `area-thumb`（`role="slider"`、彩度/明度の2D サム）
- `{hue,saturation,value,alpha}-slider` / `-slider-track` / `-slider-thumb`（`role="slider"`）
- `channel-input`（`<input type="text">`、HEX 入力）, `value-text`, `hidden-input`

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `Channel` | `Hue \| Saturation \| Value \| Alpha` | 軸の識別子。`Channel::max()` が上限値を返す（`359`/`100`/`100`/`255`） |
| `ColorPicker::new(hsv, alpha)` | `Hsv, u8` | 内部の正準表現は HSV + alpha |
| `ColorPicker::from_color(color)` | `Color` | RGB + alpha から構築する |
| `ColorPicker::hex()` | `String` | 現在の色を `#rrggbb`/`#rrggbbaa` で返す |

## Notes

- ディスパッチアクション: `"open"`/`"close"`/`"toggle"`、`"set_hex"`（ペイロードは `Color::parse_hex` で検証）、`"set_channel"`（ペイロードは `"<channel>:<value>"`、`Channel::max()` に対して範囲チェック）
- EyeDropperTrigger、SwatchGroup/SwatchTrigger/SwatchIndicator、TransparencyGrid、フォーマット切り替え（RGBA/HSLA）は対象外。HEX 表示のみ
- `@ark-ui/react` の JS/TS API とは別物（Rust 製、`fandhe-frontend-headless-ui`）

## Related

- [Slider](./slider.md)
