# Reset

Two behaviors for restarting the keyboard firmware or entering bootloader mode for flashing.

## Signature / Usage

```dts
&sys_reset    // restart firmware
&bootloader   // enter bootloader mode
```

No parameters for either behavior.

## Behaviors

### System Reset — `&sys_reset`

Resets the keyboard and re-runs the firmware currently flashed to the device.

### Bootloader Reset — `&bootloader`

Resets the keyboard into bootloader mode, making it appear as a mass-storage device for firmware flashing.

## Notes

- Both behaviors are **source-specific** on split keyboards: they only affect the half where the binding is activated.
- To reset both halves, place the bindings on both sides of the split.
- Combos always invoke reset behavior bindings on the **central** part of the split keyboard, regardless of which side physically triggers the combo.

## Related

- [Bluetooth](./bluetooth.md)
- [Soft Off](./soft-off.md)
