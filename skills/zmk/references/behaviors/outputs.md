# Output Selection

Selects which connection (USB or Bluetooth) receives keyboard input when both are simultaneously active.

## Signature / Usage

```dts
#include <dt-bindings/zmk/outputs.h>

&out OUT_USB   // route to USB
&out OUT_BLE   // route to current BT profile
&out OUT_TOG   // toggle between USB and BLE
&out OUT_NONE  // disable all output
```

**Parameter:** One of the `OUT_*` command constants.

## Options / Props

| Command | Action |
|---------|--------|
| `OUT_USB` | Route output to USB connection |
| `OUT_BLE` | Route output to the active Bluetooth profile |
| `OUT_TOG` | Toggle between USB and BLE |
| `OUT_NONE` | Disable all output transmission |

## Notes

- USB is the default output when both connections exist.
- The selected output persists across restarts and firmware flashes (saved to flash storage).
- Settings are saved after `CONFIG_ZMK_SETTINGS_SAVE_DEBOUNCE` ms to minimize flash wear.

## Related

- [Bluetooth](./bluetooth.md)
- [RGB Underglow](./underglow.md)
