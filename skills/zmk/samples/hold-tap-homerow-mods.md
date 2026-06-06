# Hold-Tap: Homerow Mods

Define custom hold-tap behavior to place modifiers on home-row keys.

```dts
#include <behaviors.dtsi>
#include <dt-bindings/zmk/keys.h>

/ {
    behaviors {
        hm: homerow_mods {
            compatible = "zmk,behavior-hold-tap";
            #binding-cells = <2>;
            flavor = "balanced";
            tapping-term-ms = <200>;
            quick-tap-ms = <125>;
            require-prior-idle-ms = <150>;
            bindings = <&kp>, <&kp>;
            hold-trigger-key-positions = <5 6 7 8 9 15 16 17 18 19>;
        };
    };

    keymap {
        compatible = "zmk,keymap";
        default_layer {
            bindings = <
                &kp Q      &kp W      &kp E       &kp R      &kp T
                &hm LGUI A &hm LALT S &hm LCTRL D &hm LSFT F &kp G
                &kp Z      &kp X      &kp C       &kp V      &kp B
            >;
        };
    };
};
```

## Notes

- `flavor = "balanced"` triggers hold when another key is both pressed and released inside `tapping-term-ms`, reducing false positives during fast typing.
- `require-prior-idle-ms` forces a tap when the key is pressed within 150 ms of any previous key, preventing accidental modifier activation mid-word.
- `hold-trigger-key-positions` restricts hold activation to the specified positions (right-hand keys in this example), so same-hand combos always produce a tap.
- Pre-built `&mt` uses `hold-preferred` flavor; define a custom behavior when `balanced` or `tap-preferred` is needed.
