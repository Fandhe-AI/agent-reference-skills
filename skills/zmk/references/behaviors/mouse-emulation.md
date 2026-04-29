# Mouse Emulation

Three behaviors for controlling the mouse pointer, buttons, and scroll wheel from the keyboard. Requires the pointing feature to be enabled.

## Signature / Usage

```dts
#include <dt-bindings/zmk/pointing.h>

// Mouse button press
&mkp MB1         // left click
&mkp RCLK        // right click

// Mouse movement
&mmv MOVE_UP
&mmv MOVE_X(500)

// Scroll
&msc SCRL_DOWN
```

**Enable feature:** Add `CONFIG_ZMK_POINTING=y` to your `.conf` file.

## Behaviors

### Mouse Button Press — `&mkp`

| Button | Alias | Description |
|--------|-------|-------------|
| `MB1` | `LCLK` | Left click |
| `MB2` | `RCLK` | Right click |
| `MB3` | `MCLK` | Middle click |
| `MB4` | | Button 4 |
| `MB5` | | Button 5 |

Input listener: `&mkp_input_listener`

### Mouse Move — `&mmv`

Transmits X/Y movement events to the host.

| Predefined value | Description |
|-----------------|-------------|
| `MOVE_UP` | Move pointer up |
| `MOVE_DOWN` | Move pointer down |
| `MOVE_LEFT` | Move pointer left |
| `MOVE_RIGHT` | Move pointer right |

Custom speed: `MOVE_X(value)` / `MOVE_Y(value)` (signed 16-bit integer).

Advanced listener properties: `x-input-code`, `y-input-code`, `time-to-max-speed-ms`, `acceleration-exponent`.

Input listener: `&mmv_input_listener`

### Mouse Scroll — `&msc`

Sends vertical and horizontal scroll events.

| Predefined value | Description |
|-----------------|-------------|
| `SCRL_UP` | Scroll up |
| `SCRL_DOWN` | Scroll down |
| `SCRL_LEFT` | Scroll left |
| `SCRL_RIGHT` | Scroll right |

Input listener: `&msc_input_listener`

## Notes

- Enabling `CONFIG_ZMK_POINTING=y` modifies the HID report descriptor; the host OS must re-enumerate the device (replug or re-pair after firmware flash).
- The `uint32` parameter for `&mmv` and `&msc` encodes X velocity in the upper 16 bits and Y velocity in the lower 16 bits.
