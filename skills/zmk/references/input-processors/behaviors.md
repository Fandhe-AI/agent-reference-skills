# Behaviors Input Processor

Triggers standard ZMK behaviors when specific input event codes are received, primarily used to map physical mouse buttons to key behaviors.

## Signature / Usage

```dts
#include <zephyr/dt-bindings/input/input-event-codes.h>

/ {
    input_processors {
        zip_right_click_paste: zip_right_click_paste {
            compatible = "zmk,input-processor-behaviors";
            #input-processor-cells = <0>;
            codes = <INPUT_BTN_1>;
            bindings = <&kp LC(V)>;
        };
    };
};
```

Reference with no parameters (cells is `<0>`):

```dts
input-processors = <&zip_right_click_paste>;
```

## Options / Props

### Required

| Property | Value | Description |
|----------|-------|-------------|
| `compatible` | `"zmk,input-processor-behaviors"` | Processor type |
| `#input-processor-cells` | `<0>` | No runtime parameters |

### Optional

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `type` | int | `INPUT_EV_KEY` | Input event type to match |
| `codes` | array | — | Event codes that trigger behaviors |
| `bindings` | phandle-array | `&none` for each | Behaviors invoked for each corresponding code |

## Notes

- The `codes` and `bindings` arrays must have the same length; each code maps to the behavior at the same index.
- Invoking a source-specific behavior via this processor always triggers it on the **central side** of the keyboard, regardless of which side hosts the input device.
- The pre-defined instance `&zip_button_behaviors` maps left, right, and middle mouse buttons; all default to `&none` and can be overridden via `bindings`.
- Designed for binary (on/off) events, not continuous vector movements.

## Related

- [Overview](./overview.md)
- [Usage](./usage.md)
- [Code Mapper](./code-mapper.md)
