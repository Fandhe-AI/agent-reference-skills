# Displays

Configuration for keyboard display support, including widgets, screen type, threading, and LED blanking.

## Kconfig

### Core Display Settings

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `CONFIG_ZMK_DISPLAY` | bool | n | Enable display support |
| `CONFIG_ZMK_DISPLAY_BLANK_ON_IDLE` | bool | y (SSD1306) | Automatically blank the display when idle |
| `CONFIG_ZMK_DISPLAY_TICK_PERIOD_MS` | int | 10 | Display task cycle interval in milliseconds |
| `CONFIG_ZMK_DISPLAY_INVERT` | bool | n | Invert display colors (light-on-dark) |

### Widgets

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `CONFIG_ZMK_WIDGET_LAYER_STATUS` | bool | y | Show the active keyboard layer |
| `CONFIG_ZMK_WIDGET_BATTERY_STATUS` | bool | y | Show battery charge |
| `CONFIG_ZMK_WIDGET_BATTERY_STATUS_SHOW_PERCENTAGE` | bool | n | Show battery as percentage instead of icon |
| `CONFIG_ZMK_WIDGET_OUTPUT_STATUS` | bool | y | Show USB or Bluetooth connectivity status |
| `CONFIG_ZMK_WIDGET_WPM_STATUS` | bool | n | Show words-per-minute typing speed |

### Screen Type (select one)

| Option | Description |
|--------|-------------|
| `CONFIG_ZMK_DISPLAY_STATUS_SCREEN_BUILT_IN` | Use the default built-in status screen |
| `CONFIG_ZMK_DISPLAY_STATUS_SCREEN_CUSTOM` | Use a user-defined custom screen |

### Work Queue / Threading (select one)

| Option | Description |
|--------|-------------|
| `CONFIG_ZMK_DISPLAY_WORK_QUEUE_SYSTEM` | Update display on the main thread |
| `CONFIG_ZMK_DISPLAY_WORK_QUEUE_DEDICATED` | Update display on a separate dedicated thread |

### Dedicated Thread Parameters

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `CONFIG_ZMK_DISPLAY_DEDICATED_THREAD_STACK_SIZE` | int | 2048 | Stack size for the dedicated display thread |
| `CONFIG_ZMK_DISPLAY_DEDICATED_THREAD_PRIORITY` | int | 5 | Priority of the dedicated display thread |

## Devicetree

### `/chosen` node

| Property | Type | Description |
|----------|------|-------------|
| `zephyr,display` | path | Specifies the active display device |
| `zmk,display-led` | path | References an LED device (PWM or GPIO) for display blanking |

### Supported Drivers

| Driver | Notes |
|--------|-------|
| IL0323 | ZMK-provided e-paper display driver |
| SSD1306 (I2C) | Zephyr ecosystem driver |
| SSD1306 (SPI) | Zephyr ecosystem driver |

## Notes

- `CONFIG_ZMK_DISPLAY_INVERT` may not work as expected with custom status screens that use images.
- Using `CONFIG_ZMK_DISPLAY_WORK_QUEUE_DEDICATED` prevents slow-updating displays from blocking keyboard responsiveness, at a memory overhead cost.

## Related

- [Power](./power.md)
- [Battery](./battery.md)
- [LED Indicators](./led-indicators.md)
- [Lighting](./lighting.md)
