# Pointing Devices

Supports physical pointing devices (trackpads, trackballs) and mouse emulation behaviors for sending HID pointing events to connected hosts.

## Signature / Usage

```kconfig
# .conf
CONFIG_ZMK_POINTING=y
```

```dts
/* keymap — mouse emulation behavior */
&mmv MOVE_UP
```

## Notes

- Enabling this feature modifies the HID report descriptor. Remove and re-pair Bluetooth hosts after enabling to ensure they pick up the updated descriptor.
- Two implementation paths are available:
  - **Mouse emulation**: use keymap behaviors (e.g., `&mmv`) to send mouse events without dedicated hardware.
  - **Physical pointing devices**: integrate actual hardware via the pointer hardware integration guide.
- Input Processors can modify pointing behavior (scaling, scroll mode conversion, temporary layer activation).
- Input Listeners connect low-level input devices to ZMK's HID system and apply processors.

## Related

- [config/pointing](../config/pointing.md)
- [behaviors/mouse-emulation](../behaviors/mouse-emulation.md)
- [bluetooth](./bluetooth.md)
