# Split

Configuration for split keyboard behavior, supporting both Bluetooth and wired (UART) connections between keyboard halves.

## Kconfig

### Core Split Settings

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `CONFIG_ZMK_SPLIT` | bool | n | Enable split keyboard functionality |
| `CONFIG_ZMK_SPLIT_ROLE_CENTRAL` | bool | n | Designate device as central (`y`) or peripheral (`n`) |
| `CONFIG_ZMK_SPLIT_PERIPHERAL_HID_INDICATORS` | bool | n | Transmit HID indicator state to peripherals |

### Bluetooth Split

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `CONFIG_ZMK_SPLIT_BLE` | bool | y | Use BLE for inter-half communication |
| `CONFIG_ZMK_SPLIT_BLE_CENTRAL_PERIPHERALS` | int | 1 | Number of connectable peripherals |
| `CONFIG_ZMK_SPLIT_BLE_CENTRAL_BATTERY_LEVEL_FETCHING` | bool | n | Retrieve battery data from peripherals |
| `CONFIG_ZMK_SPLIT_BLE_CENTRAL_BATTERY_LEVEL_PROXY` | bool | n | Report peripheral battery levels to hosts |
| `CONFIG_ZMK_SPLIT_BLE_CENTRAL_POSITION_QUEUE_SIZE` | int | 5 | Key state event queue capacity |
| `CONFIG_ZMK_SPLIT_BLE_PERIPHERAL_STACK_SIZE` | int | 756 | Peripheral thread stack allocation in bytes |

### Wired Split

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `CONFIG_ZMK_SPLIT_WIRED` | bool | — | Enable wired connections (conditional on devicetree) |
| `CONFIG_ZMK_SPLIT_WIRED_UART_MODE_ASYNC` | bool | — | DMA-based async UART mode (SAM0, STM32) |
| `CONFIG_ZMK_SPLIT_WIRED_UART_MODE_INTERRUPT` | bool | — | Interrupt-driven UART mode (RP2040, nRF52) |
| `CONFIG_ZMK_SPLIT_WIRED_UART_MODE_POLLING` | bool | — | Polling UART mode (universal fallback) |
| `CONFIG_ZMK_SPLIT_WIRED_ASYNC_RX_TIMEOUT` | int | 20 | Microseconds before reporting received data (async mode) |
| `CONFIG_ZMK_SPLIT_WIRED_POLLING_RX_PERIOD` | int | 10 | Polling interval in ticks (polling mode) |

## Devicetree

### Wired Split

**Compatible:** `zmk,wired-split`

| Property | Type | Description |
|----------|------|-------------|
| `device` | phandle | Reference to the UART node |

```dts
/ {
    wired_split {
        compatible = "zmk,wired-split";
        device = <&pro_micro_serial>;
    };
};
```

## Notes

- `CONFIG_ZMK_SPLIT_BLE_CENTRAL_PERIPHERALS` and BT connection/pairing counts (`CONFIG_BT_MAX_CONN`, `CONFIG_BT_MAX_PAIRED`) must be set one greater than the desired number of Bluetooth profiles on the central side.
- For BLE peripheral battery reporting, enable both `CONFIG_ZMK_SPLIT_BLE_CENTRAL_BATTERY_LEVEL_FETCHING` and `CONFIG_ZMK_SPLIT_BLE_CENTRAL_BATTERY_LEVEL_PROXY`.
- Async/DMA mode offers best performance; interrupt mode is suitable for RP2040/nRF52; polling mode is the universal fallback.

## Related

- [Bluetooth](./bluetooth.md)
- [Battery](./battery.md)
- [Settings](./settings.md)
- [System](./system.md)
