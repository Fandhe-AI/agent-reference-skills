# LED Indicators

Configuration for mapping HID indicator states (Caps Lock, Num Lock, etc.) to LED devices.

## Kconfig

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `CONFIG_ZMK_INDICATOR_LEDS_INIT_PRIORITY` | int | 91 | Indicator LED driver initialization priority |

The initialization priority must be greater than `CONFIG_LED_INIT_PRIORITY`.

## Devicetree

**Compatible:** `zmk,indicator-leds`

### Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `indicator` | int | required | The `HID_INDICATOR_*` value to indicate |
| `leds` | phandles | required | One or more LED devices to control |
| `active-brightness` | int | 100 | LED brightness (%) when the indicator is active |
| `inactive-brightness` | int | 0 | LED brightness (%) when the indicator is not active |
| `disconnected-brightness` | int | 0 | LED brightness (%) when the keyboard is not connected |
| `on-while-idle` | bool | false | Keep LEDs enabled when the keyboard is idle on battery |

### Notes on `indicator` Property

The `indicator` property must reference `HID_INDICATOR_*` definitions. Multiple indicator states can be combined with the pipe operator (`|`) to trigger the LED when any specified condition is active.

## Notes

- Requires `CONFIG_ZMK_HID_INDICATORS=y` (system setting) to receive LED state from the host.

## Related

- [System](./system.md)
- [Displays](./displays.md)
- [Lighting](./lighting.md)
