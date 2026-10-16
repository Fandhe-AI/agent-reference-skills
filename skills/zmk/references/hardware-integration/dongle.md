# Dongle

A bluetooth dongle can be added to any wireless keyboard running ZMK. The result is a split keyboard with the dongle as "central". The dongle is simply a central split keyboard part with no keys; any BLE-capable board that ZMK supports can be used.

## Signature / Usage

### Directory Structure

```
zmk-config/boards/shields/my_keyboard/
  Kconfig.shield
  Kconfig.defconfig
  my_keyboard_dongle.overlay
```

The `zmk-config` repository must match the unified ZMK config template (especially `zephyr/module.yml`) so it is recognized as a module.

### Kconfig.shield

```kconfig
# No whitespace after the comma or in the keyboard name!
config SHIELD_MY_KEYBOARD_DONGLE
    def_bool $(shields_list_contains,my_keyboard_dongle)
```

### Kconfig.defconfig

```kconfig
if SHIELD_MY_KEYBOARD_DONGLE

# Max 16 characters in keyboard name
config ZMK_KEYBOARD_NAME
    default "My Keyboard"

config ZMK_SPLIT_ROLE_CENTRAL
    default y

config ZMK_SPLIT
    default y

# Set this to the number of peripherals your dongle will have.
# For a unibody, this would be 1. If you have left and right halves, set it to 2, etc.
config ZMK_SPLIT_BLE_CENTRAL_PERIPHERALS
    default 1

# Set this to ZMK_SPLIT_BLE_CENTRAL_PERIPHERALS + your desired number of BT profiles (default is 5)
config BT_MAX_CONN
    default 6

# Set this to the same number as BT_MAX_CONN
config BT_MAX_PAIRED
    default 6

endif
```

### Dongle Overlay: Kscan

```dts
#include <dt-bindings/zmk/matrix_transform.h>

/ {
    chosen {
        zmk,kscan = &mock_kscan;
    };

    mock_kscan: mock_kscan_0 {
        compatible = "zmk,kscan-mock";
        columns = <0>;
        rows = <0>;
        events = <0>;
    };
};
```

Then copy all matrix transforms (`compatible = "zmk,matrix-transform";`) and physical layouts (`compatible = "zmk,physical-layout";` or `#include <layouts/<layout_name>.dtsi>`) of the keyboard into the dongle shield. Example for a physical layout defined in the same file as the matrix transform and chosen node ("Base File" case):

```dts
/ {
    chosen {
        zmk,kscan = &mock_kscan;
        zmk,physical-layout = &physical_layout0;
    };

    physical_layout0: physical_layout_0 {
        compatible = "zmk,physical-layout";
        display-name = "Default Layout";
        transform = <&default_transform>;
        keys = <...>; // Long list of key positions, optional
    };
};
```

If the `kscan` property is set on the copied physical layout node, remove it so the dongle uses the mock kscan instead.

```diff
 / {
     physical_layout0: physical_layout_0 {
         compatible = "zmk,physical-layout";
-        kscan = &kscan0;
         display-name = "Default Layout";
         transform = <&default_transform>;
         keys = <...>; // Long list of key positions, optional
     };
 };
```

```diff
 &physical_layout0 {
-    kscan = &kscan0;
     transform = <&default_transform>;
 };
```

### build.yaml Entry

```yaml
---
include:
  # Change the board appropriately, you can use any board
  - board: nice_nano//zmk
    shield: my_keyboard_dongle

  - board: nice_nano//zmk
    shield: my_keyboard
    # Add these cmake-args to the peripherals you wish to use with the dongle
    cmake-args: -DCONFIG_ZMK_SPLIT=y -DCONFIG_ZMK_SPLIT_ROLE_CENTRAL=n

  - board: nice_nano//zmk
    shield: settings_reset
```

## Notes

- All keyboard parts must have exactly the same physical layouts and matrix transforms with the same devicetree node names. For keyboards with multiple physical layouts, include all of them in the dongle shield, even if only one is used.
- Remove any `kscan` property from copied physical layouts (see the diffs above).
- Older shields without a physical layout set `zmk,matrix-transform` in the `chosen` node; the dongle shield should do the same (`zmk,matrix-transform = &default_transform;`).
- Physical layouts may come from a dedicated `<name>-layouts.dtsi` file (copy it into the dongle shield folder and include it), from the same file as the matrix transform and chosen node, or from ZMK's shared layouts via `#include <layouts/<layout_name>.dtsi>`.
- The dongle shield lives in your personal zmk-config under `boards/shields/<keyboard>`, which requires `zephyr/module.yml` (see the unified-zmk-config-template). No change is needed to the existing keyboard boards and/or shields. Test the keyboard without a dongle first.
- Before flashing the new firmware, flash `settings_reset` firmware on **all** devices to clear any previous bonding information; flashing standard ZMK firmware does not clear previous settings.
- To use the dongled keyboard with ZMK Studio, apply the "building with Studio" instructions (`studio-rpc-usb-uart` snippet + `CONFIG_ZMK_STUDIO`) to the dongle.
- `ZMK_SPLIT_BLE_CENTRAL_PERIPHERALS` is the number of peripherals the dongle has (1 for unibody, 2 for left/right halves); `BT_MAX_CONN` = that number + desired BT profiles (default 5), and `BT_MAX_PAIRED` equals `BT_MAX_CONN`.
- The dongle itself keeps the central role (`ZMK_SPLIT_ROLE_CENTRAL=y` in `Kconfig.defconfig`); `-DCONFIG_ZMK_SPLIT=y -DCONFIG_ZMK_SPLIT_ROLE_CENTRAL=n` is added only to the **existing keyboard parts** to turn them into peripherals.
- Local builds: append the same CMake flags to the end of the `west build` command.
- To "undongle": remove the cmake-args, perform the settings reset procedure, and flash the newly built firmware to all devices.
- Board identifiers use the Zephyr 4.1 ZMK board-variant form `<board>//zmk` (e.g. `nice_nano//zmk`), as stated in the Building and Flashing page warning.
- Source: https://zmk.dev/docs/hardware-integration/dongle (zmkfirmware/zmk `main`, pinned commit 4dd95d7840eb3d5a3f59bb29fbf1ab054715ef85, committed 2026-10-09; not tied to a release tag, latest release v0.3.0).
- Tradeoffs: requires an extra BLE-capable board; the keyboard becomes unusable without the dongle since peripherals cannot connect to hosts without a central.
- Latency: former central gains ~1 ms latency; the other parts' average latency decreases by ~6.5 ms when a BLE hop is replaced by a USB hop (assuming the dongle is on USB) — net improvement for the common case.

## Related

- [New Shield](./new-shield.md)
- [Physical Layouts](./physical-layouts.md)
