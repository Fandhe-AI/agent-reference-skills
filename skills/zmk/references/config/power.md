# Power

Configuration for low power states (idle/sleep/soft-off), external power control, GPIO wakeup triggers, and soft-off wakeup sources.

## Kconfig

### Low Power States

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `CONFIG_ZMK_IDLE_TIMEOUT` | int | 30000 | Milliseconds of inactivity before entering idle state |
| `CONFIG_ZMK_SLEEP` | bool | n | Enable deep sleep support |
| `CONFIG_ZMK_IDLE_SLEEP_TIMEOUT` | int | 900000 | Milliseconds of inactivity before entering deep sleep |
| `CONFIG_ZMK_PM_SOFT_OFF` | bool | n | Enable soft off from the keymap or dedicated hardware |

### External Power Control

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `CONFIG_ZMK_EXT_POWER` | bool | y | Enable support to control external power output |

## Devicetree

### External Power Control

**Compatible:** `zmk,ext-power-generic`

| Property | Type | Description |
|----------|------|-------------|
| `control-gpios` | GPIO array | GPIOs to set active to enable external power |
| `init-delay-ms` | int | Milliseconds to delay after driver initialization |

### GPIO Key Wakeup Trigger

**Compatible:** `zmk,gpio-key-wakeup-trigger`

Enables GPIO-based wakeup from soft off state.

| Property | Type | Description |
|----------|------|-------------|
| `trigger` | phandle | GPIO key used to wake from soft off |
| `wakeup-source` | bool | Mark this device as able to wake the keyboard |
| `extra-gpios` | GPIO array | GPIO pins to set active before powering off (e.g., matrix column pins) |

### Soft Off Wakeup Sources

**Compatible:** `zmk,soft-off-wakeup-sources`

| Property | Type | Description |
|----------|------|-------------|
| `wakeup-sources` | phandle array | Devices to enable during shutdown that can trigger wakeup |

## Notes

- `wakeup-source` should always be present on the `zmk,gpio-key-wakeup-trigger` node.
- `extra-gpios` on the wakeup trigger should reference column pins for matrix keyboards to ensure keys are scannable during soft off.

## Related

- [Battery](./battery.md)
- [Displays](./displays.md)
- [Lighting](./lighting.md)
- [Settings](./settings.md)
