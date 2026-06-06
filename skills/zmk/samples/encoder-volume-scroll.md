# Encoder: Volume and Scroll

Bind a rotary encoder to volume control on one layer and page scroll on another.

```dts
#include <behaviors.dtsi>
#include <dt-bindings/zmk/keys.h>

/ {
    keymap {
        compatible = "zmk,keymap";

        default_layer {
            display-name = "Base";
            bindings = <
                &kp Q  &kp W  &kp E  &kp R  &kp T
            >;
            sensor-bindings = <&inc_dec_kp C_VOL_UP C_VOL_DN>;
        };

        nav_layer {
            display-name = "Nav";
            bindings = <
                &trans  &trans  &trans  &trans  &trans
            >;
            // Left encoder: page scroll; right encoder: left/right arrow
            sensor-bindings = <&inc_dec_kp PG_UP PG_DN &inc_dec_kp LEFT RIGHT>;
        };
    };
};
```

`config/<keyboard>.conf`:
```
CONFIG_EC11=y
CONFIG_EC11_TRIGGER_GLOBAL_THREAD=y
```

## Notes

- `sensor-bindings` uses `<&inc_dec_kp CW_KEY CCW_KEY>` where the first keycode fires on clockwise rotation and the second on counter-clockwise.
- List one `&inc_dec_kp` entry per physical encoder; separate multiple encoders with spaces inside the same `<…>` cell.
- Enable the encoder driver in the `.conf` file with `CONFIG_EC11=y` and `CONFIG_EC11_TRIGGER_GLOBAL_THREAD=y`.
- Custom sensor behaviors (defined with `compatible = "zmk,behavior-sensor-rotate"`) allow non-keycode actions such as layer changes or macros on rotation.
