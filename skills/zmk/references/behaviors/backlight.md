# Backlight

Controls per-key or single-color LED backlight: power state and brightness level.

## Signature / Usage

```dts
#include <dt-bindings/zmk/backlight.h>

&bl BL_TOG         // toggle on/off
&bl BL_INC         // increase brightness
&bl BL_SET 50      // set brightness to 50
```

**Parameters:** A `BL_*` command constant, and optionally a brightness value for `BL_SET`.

## Options / Props

| Command | Parameters | Action |
|---------|-----------|--------|
| `BL_ON` | — | Enable backlight |
| `BL_OFF` | — | Disable backlight |
| `BL_TOG` | — | Toggle on/off |
| `BL_INC` | — | Increase brightness |
| `BL_DEC` | — | Decrease brightness |
| `BL_CYCLE` | — | Cycle through brightness levels |
| `BL_SET` | brightness value | Set a specific brightness value |

## Notes

- Settings persist across restarts and firmware flashes (saved to flash storage).
- Once changed, the new values override the `CONFIG_ZMK_BACKLIGHT_*_START` defaults.
- On split keyboards this is a global behavior: changes affect both central and peripheral sides.

## Related

- [RGB Underglow](./underglow.md)
- [Power](./power.md)
