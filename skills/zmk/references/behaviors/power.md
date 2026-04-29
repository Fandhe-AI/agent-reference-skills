# External Power Control

Enables or disables the VCC power output to external devices (e.g., RGB LEDs) to extend battery life on supported controllers.

## Signature / Usage

```dts
#include <dt-bindings/zmk/ext_power.h>

&ext_power EP_ON    // enable external power
&ext_power EP_OFF   // disable external power
&ext_power EP_TOG   // toggle external power
```

**Parameter:** One of the `EP_*` (or full `EXT_POWER_*_CMD`) constants.

## Options / Props

| Command | Alias | Action |
|---------|-------|--------|
| `EXT_POWER_ON_CMD` | `EP_ON` | Enable external power output |
| `EXT_POWER_OFF_CMD` | `EP_OFF` | Disable external power output |
| `EXT_POWER_TOGGLE_CMD` | `EP_TOG` | Toggle external power output |

## Notes

- Supported hardware: nRFMicro, nice!nano.
- Settings persist across restarts and firmware flashes (saved to flash).
- On split keyboards this is a global behavior: changes affect both central and peripheral sides.
- Changes are saved after `CONFIG_ZMK_SETTINGS_SAVE_DEBOUNCE` ms to reduce flash wear.

## Related

- [Backlight](./backlight.md)
- [RGB Underglow](./underglow.md)
- [Soft Off](./soft-off.md)
