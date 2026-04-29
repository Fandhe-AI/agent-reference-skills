# Bluetooth

Configuration for Bluetooth connectivity, pairing security, and device appearance in ZMK.

## Kconfig

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `CONFIG_ZMK_BLE_EXPERIMENTAL_CONN` | bool | n | Enables connection settings planned for future default |
| `CONFIG_ZMK_BLE_EXPERIMENTAL_SEC` | bool | n | Enables BT Secure Connection passkey entry and key overwrite from previously paired hosts |
| `CONFIG_ZMK_BLE_EXPERIMENTAL_FEATURES` | bool | n | Aggregate setting enabling both experimental connection and security configs |
| `CONFIG_ZMK_BLE_PASSKEY_ENTRY` | bool | n | Enable passkey entry during pairing for enhanced security |
| `CONFIG_BT_GATT_ENFORCE_SUBSCRIPTION` | bool | y | Low-level GATT subscription enforcement; set to `n` to work around Windows battery notification issues |
| `CONFIG_BT_DEVICE_APPEARANCE` | int | 961 | Bluetooth device appearance value (hex converted to decimal) |

## Notes

- After enabling `CONFIG_ZMK_BLE_PASSKEY_ENTRY`, all previously paired devices must be re-paired.
- `CONFIG_BT_DEVICE_APPEARANCE` accepts the decimal equivalent of Bluetooth appearance hex codes (e.g., `0x03C1` = 961 for keyboard).
- For system-level BLE settings (max connections, paired devices), see [System](./system.md).

## Related

- [System](./system.md)
- [Split](./split.md)
- [Settings](./settings.md)
