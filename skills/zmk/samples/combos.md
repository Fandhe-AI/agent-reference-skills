# Combos

Trigger a behavior when multiple keys are pressed simultaneously within a time window.

```dts
#include <behaviors.dtsi>
#include <dt-bindings/zmk/keys.h>

/ {
    combos {
        compatible = "zmk,combos";

        combo_esc {
            timeout-ms = <50>;
            key-positions = <0 1>;
            bindings = <&kp ESC>;
        };

        combo_tab {
            timeout-ms = <50>;
            key-positions = <10 11>;
            bindings = <&kp TAB>;
            layers = <0>;
        };

        combo_caps {
            timeout-ms = <50>;
            key-positions = <0 1 2>;
            bindings = <&caps_word>;
            require-prior-idle-ms = <150>;
        };
    };
};
```

## Notes

- `key-positions` lists zero-indexed key indices as they appear in the keymap's `bindings` array.
- `layers` is optional; omitting it makes the combo global (active on all layers).
- `require-prior-idle-ms` prevents the combo from firing if a non-modifier key was pressed recently, reducing accidental triggers during fast typing.
- `slow-release` (boolean) keeps the binding active until all combo keys are released, useful for behaviors that need the hold duration.
- Overlapping combos (e.g., `<0 1>` and `<0 1 2>`) are supported; the longer combo takes priority if resolved within `timeout-ms`.
