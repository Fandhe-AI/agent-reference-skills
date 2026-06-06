# Sticky Key (One-Shot Modifier)

Apply a modifier to exactly the next key press, then release it automatically.

```dts
#include <behaviors.dtsi>
#include <dt-bindings/zmk/keys.h>

/ {
    behaviors {
        // Custom sticky key with quick-release and modifier stacking
        skq: sticky_key_quick_release {
            compatible = "zmk,behavior-sticky-key";
            #binding-cells = <1>;
            bindings = <&kp>;
            release-after-ms = <1000>;
            quick-release;
            ignore-modifiers;
        };
    };

    keymap {
        compatible = "zmk,keymap";
        default_layer {
            bindings = <
                // Built-in &sk for one-shot shift and one-shot ctrl
                &sk LSHIFT  &sk LCTRL
                // Custom skq instance
                &skq LGUI   &trans
            >;
        };
    };
};
```

## Notes

- `&sk` is the pre-built sticky-key instance; it accepts any keycode valid for `&kp`.
- `release-after-ms` sets how long the sticky modifier stays active before auto-cancelling if no key is pressed (default: 1000 ms).
- `quick-release` deactivates the modifier as soon as the next key is pressed (not released), preventing the modifier from applying to subsequent keys.
- `ignore-modifiers` (enabled by default) allows stacking multiple `&sk` presses — pressing `&sk LCTRL` then `&sk LSHIFT` then a letter produces Ctrl+Shift+letter.
- `lazy` delays activation until the moment the next key fires, preventing unintended OS shortcut triggers (e.g., opening a menu on modifier-only press).
