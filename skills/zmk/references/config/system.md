# System

General system settings controlling keyboard identity, HID report types, USB descriptors, Bluetooth stack, and logging.

## Kconfig

### General

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `CONFIG_ZMK_BOARD_COMPAT` | bool | n | Validate proper ZMK board configuration |
| `CONFIG_ZMK_KEYBOARD_NAME` | string | — | Keyboard device name (max 16 characters) |
| `CONFIG_ZMK_WPM` | bool | n | Enable words-per-minute calculation |
| `CONFIG_HEAP_MEM_POOL_SIZE` | int | 8192 | Heap memory pool size in bytes |

### HID Configuration

| Option | Type | Description |
|--------|------|-------------|
| `CONFIG_ZMK_HID_REPORT_TYPE_HKRO` | bool | Standard 6-key roll-over (default; mutually exclusive with NKRO) |
| `CONFIG_ZMK_HID_REPORT_TYPE_NKRO` | bool | Full N-key roll-over (may cause BIOS incompatibility) |
| `CONFIG_ZMK_HID_INDICATORS` | bool | Receive LED indicator state from hosts |
| `CONFIG_ZMK_HID_CONSUMER_REPORT_SIZE` | int | Concurrent consumer keys (default: 6) |
| `CONFIG_ZMK_HID_KEYBOARD_REPORT_SIZE` | int | Concurrent keyboard keys in HKRO mode (default: 6) |

### USB

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `CONFIG_USB` | bool | enabled | Core USB support |
| `CONFIG_USB_DEVICE_VID` | int | 0x1D50 | USB vendor ID |
| `CONFIG_USB_DEVICE_PID` | int | 0x615E | USB product ID |
| `CONFIG_USB_DEVICE_MANUFACTURER` | string | "ZMK Project" | USB manufacturer string |
| `CONFIG_ZMK_USB_BOOT` | bool | n | Enable USB boot protocol support |

### Bluetooth

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `CONFIG_BT` | bool | enabled | Core Bluetooth support |
| `CONFIG_BT_MAX_CONN` | int | 5 | Maximum concurrent BLE connections |
| `CONFIG_BT_MAX_PAIRED` | int | 5 | Maximum number of paired devices |
| `CONFIG_ZMK_BLE` | bool | enabled | ZMK BLE keyboard mode |
| `CONFIG_ZMK_BLE_CONSUMER_REPORT_QUEUE_SIZE` | int | 5 | Consumer HID report queue depth |
| `CONFIG_ZMK_BLE_KEYBOARD_REPORT_QUEUE_SIZE` | int | 20 | Keyboard HID report queue depth |

### Logging

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `CONFIG_ZMK_USB_LOGGING` | bool | n | Enable USB CDC ACM debug output |
| `CONFIG_ZMK_LOG_LEVEL` | int | 4 | Log verbosity level |

## Build Snippets (nRF boards)

| Snippet | Description |
|---------|-------------|
| `nrf52833-nosd` | Extends code partition from 280 KB to 428 KB by removing Nordic SoftDevice |
| `nrf52840-nosd` | Extends code/storage to 844 KB/128 KB by removing SoftDevice |

## Notes

- Changing `CONFIG_ZMK_KEYBOARD_NAME` requires clearing stored controller settings for the new name to take effect over BLE.
- On split keyboards, `CONFIG_BT_MAX_CONN` and `CONFIG_BT_MAX_PAIRED` must be set to one greater than the desired number of Bluetooth profiles, on the central only.
- The `nrf52*-nosd` snippets erase the SoftDevice. Flashing incompatible firmware afterward can permanently brick the board; bootloader re-flashing requires specialized recovery.

## Related

- [Bluetooth](./bluetooth.md)
- [Split](./split.md)
- [Settings](./settings.md)
- [Bootloader](./bootloader.md)
