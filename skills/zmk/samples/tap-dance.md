# Tap Dance

Invoke different behaviors based on how many times a key is tapped in quick succession.

```dts
#include <behaviors.dtsi>
#include <dt-bindings/zmk/keys.h>

/ {
    behaviors {
        // Single tap → 1, double tap → 2, triple tap → 3
        td_123: tap_dance_123 {
            compatible = "zmk,behavior-tap-dance";
            #binding-cells = <0>;
            tapping-term-ms = <200>;
            bindings = <&kp N1>, <&kp N2>, <&kp N3>;
        };

        // Single tap → CAPS LOCK, hold → Left Shift, double tap → Left Ctrl
        td_shift: tap_dance_shift {
            compatible = "zmk,behavior-tap-dance";
            #binding-cells = <0>;
            tapping-term-ms = <200>;
            bindings = <&mt LSHIFT CAPSLOCK>, <&kp LCTRL>;
        };
    };

    keymap {
        compatible = "zmk,keymap";
        default_layer {
            bindings = <
                &td_123  &td_shift  &trans
            >;
        };
    };
};
```

## Notes

- Each element in `bindings` corresponds to the Nth tap (index 0 = single tap, index 1 = double tap, …).
- `tapping-term-ms` is the window during which subsequent taps are counted; after it expires the resolved behavior fires.
- Tap-dance bindings accept any zero-parameter behavior, including `&mo`, `&tog`, and custom macros.
- Nesting mod-tap inside tap-dance (as in `td_shift`) gives triple functionality: tap, hold, and multi-tap.
