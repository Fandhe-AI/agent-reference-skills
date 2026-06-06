# Macros

Define a key sequence that plays back when a single key is pressed.

```dts
#include <behaviors.dtsi>
#include <dt-bindings/zmk/keys.h>

/ {
    macros {
        // Types "ZMK" (Shift + Z M K)
        type_zmk: type_zmk {
            compatible = "zmk,behavior-macro";
            #binding-cells = <0>;
            bindings =
                <&macro_press &kp LSHFT>,
                <&macro_tap &kp Z &kp M &kp K>,
                <&macro_release &kp LSHFT>;
        };

        // Types a text string with explicit timing
        zmk_rocks: zmk_rocks {
            compatible = "zmk,behavior-macro";
            #binding-cells = <0>;
            wait-ms = <40>;
            tap-ms = <40>;
            bindings =
                <&kp Z &kp M &kp K>,
                <&kp SPACE>,
                <&kp R &kp O &kp C &kp K &kp S>;
        };
    };

    keymap {
        compatible = "zmk,keymap";
        default_layer {
            bindings = <
                &type_zmk  &zmk_rocks  &trans
            >;
        };
    };
};
```

## Notes

- `&macro_press` / `&macro_release` are used for keys that must be held across other taps (e.g., shift for capitalisation).
- `wait-ms` sets the delay between each behavior in the sequence; use at least 30 ms over Bluetooth to prevent out-of-order HID reports.
- `tap-ms` controls how long each tapped key is held down.
- To use a multi-parameter behavior (e.g., `&bt BT_SEL 1`) inside a hold-tap, wrap it in a zero-parameter macro.
- Maximum 256 entries per `bindings` list; increase queue size via `CONFIG_ZMK_BEHAVIORS_QUEUE_SIZE` if sequences are truncated.
