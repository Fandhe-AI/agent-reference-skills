# Bluetooth

Manages Bluetooth connection profiles between the keyboard and host devices. ZMK supports up to five BT profiles by default.

## Signature / Usage

```dts
#include <dt-bindings/zmk/bt.h>

&bt BT_CLR         // clear bond on current profile
&bt BT_NXT         // switch to next profile
&bt BT_PRV         // switch to previous profile
&bt BT_SEL 0       // select profile 0 (0-indexed)
&bt BT_DISC 1      // disconnect profile 1
&bt BT_CLR_ALL     // clear bonds on all profiles
```

**Parameters:** A `BT_*` command constant, and optionally a profile index for `BT_SEL` / `BT_DISC`.

## Options / Props

| Command | Parameters | Action |
|---------|-----------|--------|
| `BT_CLR` | — | Clear bond info for the currently selected profile |
| `BT_CLR_ALL` | — | Clear bond info for all profiles |
| `BT_NXT` | — | Switch to next profile (wraps around) |
| `BT_PRV` | — | Switch to previous profile (wraps around) |
| `BT_SEL` | profile index (0-based) | Select a specific profile |
| `BT_DISC` | profile index (0-based) | Disconnect the specified profile if currently inactive |

## Notes

- Multiple hosts can appear "connected" simultaneously; only the active profile receives keystrokes.
- To fully remove a bond, clear it on the keyboard **and** on the host device to prevent connection failures.
- The active profile reconnects immediately if disconnected, even when USB output is selected.
- Profile selection persists across restarts (saved to flash); debounce controlled by `CONFIG_ZMK_SETTINGS_SAVE_DEBOUNCE`.
- Adjust max profiles via `CONFIG_BT_MAX_CONN` and `CONFIG_BT_MAX_PAIRED` in the `.conf` file.

## Related

- [Output Selection](./outputs.md)
- [Reset](./reset.md)
