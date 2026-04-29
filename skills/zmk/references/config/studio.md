# Studio

Configuration for ZMK Studio, including keymap layer name limits, session locking, and BLE transport tuning.

## Kconfig

### Keymaps

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `CONFIG_ZMK_KEYMAP_LAYER_NAME_MAX_LEN` | int | 20 | Max allowable keymap layer display name length in characters |

### Locking

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `CONFIG_ZMK_STUDIO_LOCKING` | bool | y | Enable/disable locking for ZMK Studio |
| `CONFIG_ZMK_STUDIO_LOCK_IDLE_TIMEOUT_SEC` | int | 500 | Seconds of inactivity before automatically locking ZMK Studio |
| `CONFIG_ZMK_STUDIO_LOCK_ON_DISCONNECT` | bool | y | Automatically lock when ZMK Studio disconnects |

### Transport / RPC

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `CONFIG_ZMK_STUDIO_TRANSPORT_BLE_PREF_LATENCY` | int | 10 | Lower BLE connection latency to request while ZMK Studio is active |
| `CONFIG_ZMK_STUDIO_RPC_THREAD_STACK_SIZE` | int | 1800 | Stack size for the dedicated RPC thread |
| `CONFIG_ZMK_STUDIO_RPC_RX_BUF_SIZE` | int | 30 | Bytes available for buffering incoming RPC messages |
| `CONFIG_ZMK_STUDIO_RPC_TX_BUF_SIZE` | int | 64 | Bytes available for buffering outgoing RPC messages |

## Notes

- ZMK Studio stores runtime keymap modifications and layout selections in persistent flash storage.
- Users can reset Studio changes via the "Restore Stock Settings" button in the ZMK Studio client interface.
- No Devicetree properties are defined for this feature.

## Related

- [Settings](./settings.md)
- [Keymap](./keymap.md)
- [Layout](./layout.md)
- [Bluetooth](./bluetooth.md)
