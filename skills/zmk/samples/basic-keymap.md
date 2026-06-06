# Basic Keymap

Minimal two-layer keymap using `&kp` key-press bindings.

```dts
#include <behaviors.dtsi>
#include <dt-bindings/zmk/keys.h>

#define DEFAULT 0
#define LOWER   1

/ {
    keymap {
        compatible = "zmk,keymap";

        default_layer {
            display-name = "Base";
            bindings = <
                &kp Q  &kp W  &kp E  &kp R  &kp T
                &kp A  &kp S  &kp D  &kp F  &kp G
                &kp Z  &kp X  &kp C  &kp V  &mo LOWER
            >;
        };

        lower_layer {
            display-name = "Lower";
            bindings = <
                &kp N1 &kp N2 &kp N3 &kp N4 &kp N5
                &kp F1 &kp F2 &kp F3 &kp F4 &kp F5
                &trans &trans &trans &trans &trans
            >;
        };
    };
};
```

## Notes

- `#include <behaviors.dtsi>` and `#include <dt-bindings/zmk/keys.h>` are required in every `.keymap` file.
- `&trans` passes the key event through to the next lower active layer.
- `&mo LOWER` enables the LOWER layer only while the key is held; release returns to DEFAULT.
- Layer indices start at 0; `#define` aliases keep bindings readable.
