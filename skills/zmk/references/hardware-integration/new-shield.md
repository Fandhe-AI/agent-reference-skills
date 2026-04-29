# New Shield

Guide for creating a ZMK keyboard shield — a PCB or wired component set that combines with an MCU board (e.g. Pro Micro).

## Signature / Usage

### Directory Structure

```
boards/shields/<keyboard_name>/
  Kconfig.shield
  Kconfig.defconfig
  <keyboard_name>.overlay        # unibody
  <keyboard_name>_left.overlay   # split left
  <keyboard_name>_right.overlay  # split right
  <keyboard_name>.dtsi           # split shared
  <keyboard_name>.keymap
  <keyboard_name>.zmk.yml
```

### Kconfig.shield

```kconfig
# Unibody
config SHIELD_MY_KEYBOARD
    def_bool $(shields_list_contains,my_keyboard)

# Split
config SHIELD_MY_KEYBOARD_LEFT
    def_bool $(shields_list_contains,my_keyboard_left)

config SHIELD_MY_KEYBOARD_RIGHT
    def_bool $(shields_list_contains,my_keyboard_right)
```

### Kconfig.defconfig

```kconfig
# Unibody
if SHIELD_MY_KEYBOARD
config ZMK_KEYBOARD_NAME
    default "My Keyboard"
endif

# Split (left = central)
if SHIELD_MY_KEYBOARD_LEFT
config ZMK_KEYBOARD_NAME
    default "My Keyboard"
config ZMK_SPLIT_ROLE_CENTRAL
    default y
endif

if SHIELD_MY_KEYBOARD_LEFT || SHIELD_MY_KEYBOARD_RIGHT
config ZMK_SPLIT
    default y
endif
```

### Kscan (GPIO Matrix)

```devicetree
/ {
    kscan0: kscan0 {
        compatible = "zmk,kscan-gpio-matrix";
        diode-direction = "col2row";
        wakeup-source;
        col-gpios = <&pro_micro 15 GPIO_ACTIVE_HIGH>
                  , <&pro_micro 14 GPIO_ACTIVE_HIGH>
                  , <&pro_micro 16 GPIO_ACTIVE_HIGH>;
        row-gpios = <&pro_micro 19 (GPIO_ACTIVE_HIGH | GPIO_PULL_DOWN)>
                  , <&pro_micro 20 (GPIO_ACTIVE_HIGH | GPIO_PULL_DOWN)>
                  , <&pro_micro 21 (GPIO_ACTIVE_HIGH | GPIO_PULL_DOWN)>;
    };
};
```

### Matrix Transform

```devicetree
#include <dt-bindings/zmk/matrix_transform.h>

/ {
    default_transform: keymap_transform0 {
        compatible = "zmk,matrix-transform";
        columns = <3>;
        rows = <3>;
        map = <
            RC(0,0) RC(0,1) RC(0,2)
            RC(1,0) RC(1,1) RC(1,2)
            RC(2,0) RC(2,1) RC(2,2)
        >;
    };
};
```

For split peripheral side with column offset:

```devicetree
&default_transform {
    col-offset = <3>;
};
```

### Physical Layout

```devicetree
/ {
    physical_layout0: physical_layout_0 {
        compatible = "zmk,physical-layout";
        display-name = "Default Layout";
        kscan = <&kscan0>;
        transform = <&default_transform>;
    };

    chosen {
        zmk,physical-layout = &physical_layout0;
    };
};
```

### Default Keymap

```devicetree
#include <behaviors.dtsi>
#include <dt-bindings/zmk/keys.h>

/ {
    keymap {
        compatible = "zmk,keymap";
        default_layer {
            bindings = <
                &kp Z  &kp M  &kp K
                &kp A  &kp B  &kp C
                &kp D  &kp E  &kp F
            >;
        };
    };
};
```

## Options / Props

### GPIO Pin Reference Labels

| Controller | Label | Pin Notation |
|------------|-------|--------------|
| Pro Micro | `&pro_micro` | Arduino pin numbers |
| BlackPill | `&blackpill` | Numbered pins |
| Seeed XIAO | `&xiao_d` | D-prefixed labels |
| Arduino Uno | `&arduino_header` | Counter-clockwise numbering |

## Notes

- Keyboard names must be 15 characters or fewer.
- Matrix transform ordering must precisely match the keymap binding order.
- Settings in `.conf` files cannot be overridden by users.
- Wired split support uses `compatible = "zmk,wired-split"` (experimental).
- For ZMK Studio compatibility, assign the `studio-unlock` behavior to a key.
- Licensing: MIT is recommended; copyleft code cannot be referenced by ZMK maintainers.

## Related

- [Physical Layouts](./physical-layouts.md)
- [Hardware Metadata Files](./hardware-metadata-files.md)
- [Encoders](./encoders.md)
- [Shift Registers](./shift-registers.md)
