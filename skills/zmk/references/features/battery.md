# Battery Level

Reports battery level to connected Bluetooth hosts and optionally to the keyboard's display. Boards using ZMK's officially supported hardware have battery sensing pre-configured.

## Notes

- Only the central side's battery is reported over Bluetooth by default; peripheral battery monitoring requires additional setup and host support.
- Windows may not properly request battery updates, which can result in stale readings.
- Custom boards must follow the hardware integration guide to implement battery sensing.

## Related

- [config/battery](../config/battery.md)
- [split-keyboards](./split-keyboards.md)
