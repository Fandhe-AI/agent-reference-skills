# Battery

Enables detection and reporting of keyboard battery status, including peripheral battery levels for wireless split keyboards.

## Kconfig

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `CONFIG_ZMK_BATTERY_REPORTING` | bool | n | Enable battery detection and reporting |
| `CONFIG_ZMK_BATTERY_REPORT_INTERVAL` | int | 60 | Reporting interval in seconds |

## Devicetree

### `/chosen` node

| Property | Type | Description |
|----------|------|-------------|
| `zmk,battery` | path | Specifies the battery sensor driver to use |

### Battery Voltage Divider Sensor

**Compatible:** `zmk,battery-voltage-divider`

Reads battery voltage via ADC and voltage divider. Follows Zephyr's voltage divider documentation for properties.

### nRF VDDH Battery Sensor

**Compatible:** `zmk,battery-nrf-vddh`

Reads battery voltage using Nordic nRF52's VDDH pin. No additional configuration required.

## Notes

- Battery reporting is automatically enabled when BLE is active, unless explicitly disabled.
- On macOS, battery reporting packets can wake the computer from sleep. Disable with `CONFIG_BT_BAS=n` to prevent this while retaining monitoring.
- For wireless split keyboards, enable both `CONFIG_ZMK_SPLIT_BLE_CENTRAL_BATTERY_LEVEL_PROXY=y` and `CONFIG_ZMK_SPLIT_BLE_CENTRAL_BATTERY_LEVEL_FETCHING=y` to report levels from both halves.

## Related

- [Split](./split.md)
- [Power](./power.md)
- [System](./system.md)
