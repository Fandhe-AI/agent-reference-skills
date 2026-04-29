# ZMK Studio

Enables runtime keymap updates without reflashing firmware. Users can modify keyboard layers while the device is in use via USB or Bluetooth at https://zmk.studio/ or through native desktop apps.

## Signature / Usage

```yaml
# build.yaml (GitHub Actions)
- board: <your_board>
  shield: <your_shield>
  snippet: studio-rpc-usb-uart
  cmake-args: -DCONFIG_ZMK_STUDIO=y
```

```bash
# Local build
west build -S studio-rpc-usb-uart -- -DCONFIG_ZMK_STUDIO=y
```

```dts
/* keymap — add unlock binding */
&studio_unlock

/* Reserve extra layers for Studio */
/ {
    keymap {
        compatible = "zmk,keymap";
        extra_layer {
            status = "reserved";
        };
    };
};
```

## Options / Props

| Symbol | Description |
|--------|-------------|
| `CONFIG_ZMK_STUDIO` | Master enable flag for ZMK Studio support |
| `studio-rpc-usb-uart` | Build snippet enabling the RPC transport over USB UART |

## Notes

- Once Studio has written keymap changes to the device, future edits to the `.keymap` source file will **not** be applied unless a factory reset is performed via the Studio UI.
- Keyboards must have physical layouts with a `keys` property defined.
- Boards using `chosen zmk,matrix-transform` are not compatible with Studio.
- Some MCUs (e.g., STM32F072) require RAM optimization tuning.
- Deep Sleep clears unsaved Studio changes.
- Currently supported: layer renaming, enabling extra layers, key binding assignment, alternative physical layout selection.
- Planned (not yet available): behavior property configuration, combos, conditional layers, host locale selection, keymap import/export.

## Related

- [low-power-states](./low-power-states.md)
- [bluetooth](./bluetooth.md)
