# Layer Switching

Switch layers using momentary (`&mo`), toggle (`&tog`), and layer-tap (`&lt`) behaviors.

```dts
#include <behaviors.dtsi>
#include <dt-bindings/zmk/keys.h>

#define DEFAULT 0
#define LOWER   1
#define RAISE   2

/ {
    keymap {
        compatible = "zmk,keymap";

        default_layer {
            bindings = <
                &kp TAB  &kp Q  &kp W  &kp E  &kp R
                &kp ESC  &kp A  &kp S  &kp D  &kp F
                &mo LOWER  &mo RAISE  &lt LOWER SPACE  &tog RAISE  &trans
            >;
        };

        lower_layer {
            bindings = <
                &trans  &kp N1  &kp N2  &kp N3  &kp N4
                &trans  &kp F1  &kp F2  &kp F3  &kp F4
                &trans  &trans  &trans  &trans  &trans
            >;
        };

        raise_layer {
            bindings = <
                &trans  &kp EXCL  &kp AT   &kp HASH  &kp DLLR
                &trans  &kp LBKT  &kp RBKT &kp LPAR  &kp RPAR
                &trans  &trans    &trans   &trans     &trans
            >;
        };
    };
};
```

## Notes

- `&mo N` — momentary: layer N is active only while the key is held.
- `&tog N` — toggle: pressing once enables layer N; pressing again disables it.
- `&lt N <keycode>` — layer-tap: hold activates layer N, tap sends keycode; uses `tap-preferred` flavor by default.
- When multiple layers are active, ZMK processes bindings from the highest-indexed active layer downward; `&trans` passes through to the next lower layer.
