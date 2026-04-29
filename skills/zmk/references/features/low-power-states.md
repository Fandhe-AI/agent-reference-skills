# Low Power States

ZMK provides three low-power modes to extend battery life: Idle, Deep Sleep, and Soft Off.

## Options / Props

| State | Description | Default Timeout |
|-------|-------------|-----------------|
| Idle | Disables displays and lighting; Bluetooth stays connected | 30 seconds |
| Deep Sleep | Full software power-off; disconnects Bluetooth, clears RAM; wakeup takes several seconds | Must be enabled explicitly |
| Soft Off | Explicit on/off via button or keymap binding; comparable savings to deep sleep | N/A (manual trigger) |

## Notes

- Deep Sleep must be explicitly enabled in power configuration settings.
- `kscan` nodes require the `wakeup-source` devicetree property to serve as wake sources; this is recommended even when deep sleep is not used.
- Deep Sleep clears any unsaved ZMK Studio changes.
- Soft Off is more restrictive in wake sources than Deep Sleep (typically only a designated GPIO pin or the reset button).
- For split keyboards, the reset button must be pressed on each half to wake from Soft Off.

## Related

- [behaviors/soft-off](../behaviors/soft-off.md)
- [development/hardware-integration/soft-off-setup](../development/hardware-integration/soft-off-setup.md)
- [config/power](../config/power.md)
