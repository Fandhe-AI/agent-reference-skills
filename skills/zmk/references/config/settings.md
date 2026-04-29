# Settings

Configuration for persistent runtime settings stored in the controller's flash memory, including save debounce and reset behavior.

## Kconfig

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `CONFIG_ZMK_SETTINGS_RESET_ON_START` | bool | n | Clear all persistent settings at startup |
| `CONFIG_ZMK_SETTINGS_SAVE_DEBOUNCE` | int | 60000 | Milliseconds to wait before writing setting changes to flash |

## Features Using Persistent Storage

The following ZMK capabilities store data in flash and persist across power cycles and firmware updates:

| Feature | What Is Stored |
|---------|---------------|
| Bluetooth | Pairing keys, MAC addresses, selected profile |
| Split keyboards | Wireless pairing data between halves |
| Output selection | Last preferred endpoint (USB vs. BT) |
| ZMK Studio | Runtime keymap modifications and layout selections |
| Lighting | Brightness, color, and effect settings |
| Power management | External power toggle state |

## Notes

- Regular ZMK firmware flashes intentionally preserve persistent settings to avoid losing Bluetooth pairings when keymaps are updated.
- To reset all settings: build with the `settings_reset` shield, flash it, then reflash normal firmware.
- For split keyboards, clear settings on both halves before re-pairing.
- ZMK Studio users can use "Restore Stock Settings" in the client interface as an alternative reset method.
- The save debounce (`CONFIG_ZMK_SETTINGS_SAVE_DEBOUNCE`) reduces flash wear by batching writes.

## Related

- [Bluetooth](./bluetooth.md)
- [Lighting](./lighting.md)
- [Power](./power.md)
- [Split](./split.md)
- [Studio](./studio.md)
