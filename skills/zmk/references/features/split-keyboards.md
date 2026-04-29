# Split Keyboards

Enables keyboards split into multiple physical parts with independent controllers. One part acts as the "central" (manages keymap logic and host communication); others are "peripherals" that forward key and sensor events to the central.

## Signature / Usage

```kconfig
# Central .conf
CONFIG_ZMK_SPLIT=y
CONFIG_ZMK_SPLIT_ROLE_CENTRAL=y
CONFIG_ZMK_SPLIT_BLE_CENTRAL_PERIPHERALS=1
```

```dts
/* Wired (full-duplex UART) transport */
compatible = "zmk,wired-split";
```

## Options / Props

| Symbol | Description |
|--------|-------------|
| `CONFIG_ZMK_SPLIT` | Enables split keyboard functionality |
| `CONFIG_ZMK_SPLIT_ROLE_CENTRAL` | Designates this firmware as the central role |
| `CONFIG_ZMK_SPLIT_BLE_CENTRAL_PERIPHERALS` | Number of BLE peripherals to connect |

## Notes

- BLE transport increases average latency by ~3.75 ms (worst case ~7.5 ms).
- Wired UART transport supports only a single peripheral and is experimental.
- **Safety**: never insert or remove the TRRS/UART cable while a controller is powered by USB or battery — this can permanently damage controllers.
- Split keyboards require separate firmware files per part (e.g., `<keyboard>_left`, `<keyboard>_right`).
- Keymap changes typically only require flashing the central; configuration changes may require flashing all parts.
- Some behaviors have locality constraints that affect which side executes them.

## Related

- [bluetooth](./bluetooth.md)
- [battery](./battery.md)
- [troubleshooting/connection-issues](../troubleshooting/connection-issues.md)
- [config/split](../config/split.md)
