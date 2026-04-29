# Configuration Overview

ZMK's configuration system allows compile-time customization through Kconfig and Devicetree files. All configuration is set at compile time; changes require building and flashing new firmware.

## Configuration File Locations

| Location | Path Pattern | Purpose |
|----------|-------------|---------|
| User config | `zmk-config/config/<name>.conf` / `<name>.keymap` | Personal keyboard settings |
| Board folder | `zmk/app/boards/<vendor>/<board>/` | Hardware specification |
| Shield folder | `zmk/app/boards/shields/<shield>/` | Shield-specific settings |

For split keyboards, use shared filenames without `_left` / `_right` suffixes to configure both sides.

## Kconfig Files

Text files containing `CONFIG_XYZ=value` assignments for global settings (keyboard name, hardware enablement).

| Value Type | Format | Example |
|------------|--------|---------|
| bool | `y` or `n` | `CONFIG_FOO=y` |
| int | integer | `CONFIG_FOO=42` |
| string | quoted text | `CONFIG_FOO="text"` |

## Devicetree Files

| Extension | Role |
|-----------|------|
| `.dts` | Base hardware definition |
| `.overlay` | Adds/overrides `.dts` definitions |
| `.keymap` | Keymap and user hardware configuration |
| `.dtsi` | Include-only files |

### Changing Properties

Use the ampersand reference syntax to modify existing nodes:

```dts
&kscan0 {
    debounce-press-ms = <0>;
};
```

## Notes

- All configuration is compile-time only; re-flash to apply changes.
- Investigate the final combined Devicetree output during builds to diagnose issues.

## Related

- [Battery](./battery.md)
- [Behaviors](./behaviors.md)
- [Bluetooth](./bluetooth.md)
- [Keymap](./keymap.md)
- [Settings](./settings.md)
