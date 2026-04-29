# Dongle

Converts a wireless split keyboard into a configuration where a BLE-capable USB dongle acts as the central device, improving battery life on the keyboard halves.

## Signature / Usage

### Directory Structure

```
zmk-config/boards/shields/my_keyboard/
  Kconfig.shield
  Kconfig.defconfig
  my_keyboard_dongle.overlay
```

### Kconfig.shield

```kconfig
config SHIELD_MY_KEYBOARD_DONGLE
    def_bool $(shields_list_contains,my_keyboard_dongle)
```

### Kconfig.defconfig

```kconfig
if SHIELD_MY_KEYBOARD_DONGLE
config ZMK_KEYBOARD_NAME
    default "My Keyboard"
config ZMK_SPLIT_ROLE_CENTRAL
    default y
config BT_MAX_CONN
    default 3
config BT_MAX_PAIRED
    default 3
endif
```

### Dongle Overlay

```devicetree
/ {
    /* Mock kscan — dongle has no physical keys */
    kscan0: kscan0 {
        compatible = "zmk,kscan-mock";
        columns = <0>;
        rows = <0>;
        events = <0>;
    };

    /* Copy matrix transform from existing shield */
    default_transform: keymap_transform_0 {
        compatible = "zmk,matrix-transform";
        columns = <12>;
        rows = <4>;
        map = < /* ... same as keyboard shield ... */ >;
    };

    /* Physical layout for ZMK Studio */
    physical_layout0: physical_layout_0 {
        compatible = "zmk,physical-layout";
        display-name = "Default";
        kscan = <&kscan0>;
        transform = <&default_transform>;
    };

    chosen {
        zmk,physical-layout = &physical_layout0;
    };
};
```

### build.yaml Entry

```yaml
- board: <dongle_board>
  shield: my_keyboard_dongle
  cmake-args: >-
    -DCONFIG_ZMK_SPLIT=y
    -DCONFIG_ZMK_SPLIT_ROLE_CENTRAL=n
```

## Notes

- Before flashing, run `settings_reset` firmware on **all** devices to establish correct pairing.
- The keyboard halves' existing firmware must be rebuilt with `ZMK_SPLIT_ROLE_CENTRAL=n` to become peripherals.
- Tradeoffs: requires an extra BLE-capable board; keyboard cannot function standalone without the dongle.
- Latency: former central gains ~1 ms latency; other peripherals lose ~6.5 ms — net improvement for most setups.
- ZMK Studio requires a physical layout with full key position data in the dongle overlay.

## Related

- [New Shield](./new-shield.md)
- [Physical Layouts](./physical-layouts.md)
