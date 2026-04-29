# Macros

Defines a sequence of behaviors to invoke when the macro key is pressed and/or released.

## Signature / Usage

```dts
#include <dt-bindings/zmk/keys.h>

/ {
    macros {
        zed_em_kay: zed_em_kay {
            compatible = "zmk,behavior-macro";
            #binding-cells = <0>;
            bindings =
                <&macro_press &kp LSHFT>,
                <&macro_tap &kp Z &kp M &kp K>,
                <&macro_release &kp LSHFT>;
        };
    };
};

// Usage in keymap bindings:
// &zed_em_kay
```

## Options / Props

| Property | Type | Description |
|----------|------|-------------|
| `bindings` | phandle-array | Ordered list of behaviors (and control tokens) to execute |
| `wait-ms` | integer | Delay (ms) between behaviors; default from `CONFIG_ZMK_MACRO_DEFAULT_WAIT_MS` |
| `tap-ms` | integer | Duration a tapped behavior is held; default from `CONFIG_ZMK_MACRO_DEFAULT_TAP_MS` |

## Macro Control Behaviors

| Control | Action |
|---------|--------|
| `&macro_tap` | Press then release each behavior (default mode) |
| `&macro_press` | Press without releasing |
| `&macro_release` | Release previously pressed behaviors |
| `&macro_pause_for_release` | Pause; resume remaining bindings on macro key release |
| `&macro_wait_time <ms>` | Change `wait-ms` mid-sequence |
| `&macro_tap_time <ms>` | Change `tap-ms` mid-sequence |

## Parameterized Macros

| Compatible | `#binding-cells` | Description |
|-----------|-----------------|-------------|
| `zmk,behavior-macro` | `<0>` | No parameters |
| `zmk,behavior-macro-one-param` | `<1>` | One parameter passed to inner behavior |
| `zmk,behavior-macro-two-param` | `<2>` | Two parameters passed to inner behaviors |

Parameter forwarding controls: `&macro_param_1to1`, `&macro_param_1to2`, `&macro_param_2to1`, `&macro_param_2to2`. Use `MACRO_PLACEHOLDER` as a dummy value where parameters will be substituted.

## Notes

- Behavior queue size defaults to 64; increase with `CONFIG_ZMK_BEHAVIORS_QUEUE_SIZE`.
- Maximum bindings per `bindings` field: 256.
- Use macros to wrap multi-parameter behaviors (e.g., `&bt BT_SEL 1`) for use inside hold-tap.

## Related

- [Key Press](./key-press.md)
- [Hold-Tap](./hold-tap.md)
