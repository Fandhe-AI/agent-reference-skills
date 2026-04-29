# RGB Underglow

Controls RGB underglow LEDs: power, hue, saturation, brightness, animation speed, and color selection.

## Signature / Usage

```dts
#include <dt-bindings/zmk/rgb.h>

&rgb_ug RGB_TOG                        // toggle on/off
&rgb_ug RGB_BRI                        // increase brightness
&rgb_ug RGB_COLOR_HSB(128, 100, 100)   // set green
```

**Parameters:** An `RGB_*` action constant, and optionally an HSB value for `RGB_COLOR_HSB`.

## Options / Props

| Command | Action |
|---------|--------|
| `RGB_ON` | Enable RGB underglow |
| `RGB_OFF` | Disable RGB underglow |
| `RGB_TOG` | Toggle on/off |
| `RGB_HUI` | Increase hue |
| `RGB_HUD` | Decrease hue |
| `RGB_SAI` | Increase saturation |
| `RGB_SAD` | Decrease saturation |
| `RGB_BRI` | Increase brightness |
| `RGB_BRD` | Decrease brightness |
| `RGB_SPI` | Increase animation speed |
| `RGB_SPD` | Decrease animation speed |
| `RGB_EFF` | Cycle effect forward |
| `RGB_EFR` | Cycle effect reverse |
| `RGB_COLOR_HSB(h, s, b)` | Set a specific HSB (HSV) color |

## HSB Value Ranges

| Channel | Range |
|---------|-------|
| Hue | 0–360 |
| Saturation | 0–100 |
| Brightness | 0–100 |

## Notes

- RGB settings persist across restarts and firmware flashes; they override `CONFIG_ZMK_RGB_*_START` defaults.
- Changes are saved after `CONFIG_ZMK_SETTINGS_SAVE_DEBOUNCE` ms to reduce flash wear.
- On split keyboards this is a global behavior: changes affect both central and peripheral sides.

## Related

- [Backlight](./backlight.md)
- [Power](./power.md)
- [Output Selection](./outputs.md)
