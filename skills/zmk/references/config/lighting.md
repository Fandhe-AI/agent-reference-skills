# Lighting

Configuration for RGB underglow and backlight LED features. Changes made through lighting behaviors are saved to flash after a one-minute delay.

## Kconfig

### RGB Underglow

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `CONFIG_ZMK_RGB_UNDERGLOW` | bool | n | Enable RGB underglow |
| `CONFIG_ZMK_RGB_UNDERGLOW_EXT_POWER` | bool | y | Control external power with underglow toggling |
| `CONFIG_ZMK_RGB_UNDERGLOW_AUTO_OFF_IDLE` | bool | n | Disable underglow when idle |
| `CONFIG_ZMK_RGB_UNDERGLOW_AUTO_OFF_USB` | bool | n | Disable underglow when USB disconnects |
| `CONFIG_ZMK_RGB_UNDERGLOW_HUE_STEP` | int | 10 | Hue adjustment increment (0–359°) |
| `CONFIG_ZMK_RGB_UNDERGLOW_SAT_STEP` | int | 10 | Saturation adjustment increment (%) |
| `CONFIG_ZMK_RGB_UNDERGLOW_BRT_STEP` | int | 10 | Brightness adjustment increment (%) |
| `CONFIG_ZMK_RGB_UNDERGLOW_HUE_START` | int | 0 | Initial hue value |
| `CONFIG_ZMK_RGB_UNDERGLOW_SAT_START` | int | 100 | Initial saturation (%) |
| `CONFIG_ZMK_RGB_UNDERGLOW_BRT_START` | int | 100 | Initial brightness (%) |
| `CONFIG_ZMK_RGB_UNDERGLOW_SPD_START` | int | 3 | Initial effect speed (1–5) |
| `CONFIG_ZMK_RGB_UNDERGLOW_EFF_START` | int | 0 | Initial effect: 0=solid, 1=breathe, 2=spectrum, 3=swirl |
| `CONFIG_ZMK_RGB_UNDERGLOW_ON_START` | bool | y | Default power state on boot |
| `CONFIG_ZMK_RGB_UNDERGLOW_BRT_MIN` | int | 0 | Minimum brightness limit (%) |
| `CONFIG_ZMK_RGB_UNDERGLOW_BRT_MAX` | int | 100 | Maximum brightness limit (%) |

### Backlight

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `CONFIG_ZMK_BACKLIGHT` | bool | n | Enable LED backlight |
| `CONFIG_ZMK_BACKLIGHT_BRT_STEP` | int | 20 | Brightness adjustment increment (%) |
| `CONFIG_ZMK_BACKLIGHT_BRT_START` | int | 40 | Initial brightness (%) |
| `CONFIG_ZMK_BACKLIGHT_ON_START` | bool | y | Default power state on boot |
| `CONFIG_ZMK_BACKLIGHT_AUTO_OFF_IDLE` | bool | n | Disable backlight when idle |
| `CONFIG_ZMK_BACKLIGHT_AUTO_OFF_USB` | bool | n | Disable backlight when USB disconnects |

## Devicetree

### RGB Underglow

ZMK uses Zephyr's LED strip driver bindings. No ZMK-specific Devicetree properties are required; configure the LED strip driver per Zephyr documentation.

### Backlight (`/chosen` node)

| Property | Type | Description |
|----------|------|-------------|
| `zmk,backlight` | path | Reference to the backlight LED driver node (GPIO or PWM-based) |

## Notes

- Lighting state (brightness, color, effect) persists to flash storage after a 1-minute debounce delay.

## Related

- [Power](./power.md)
- [Settings](./settings.md)
- [LED Indicators](./led-indicators.md)
