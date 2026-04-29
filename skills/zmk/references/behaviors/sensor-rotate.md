# Sensor Rotation

Triggers different behaviors depending on the direction (clockwise or counter-clockwise) of an encoder rotation. Two variants exist: a fixed-binding standard form and a parameterized variable form.

## Signature / Usage

### Standard — `zmk,behavior-sensor-rotate` (`#sensor-binding-cells = <0>`)

Behaviors are fully defined in the `behaviors {}` node:

```dts
/ {
    behaviors {
        rgb_encoder: rgb_encoder {
            compatible = "zmk,behavior-sensor-rotate";
            #sensor-binding-cells = <0>;
            bindings = <&rgb_ug RGB_BRI>, <&rgb_ug RGB_BRD>;
        };
    };
    keymap {
        default_layer {
            sensor-bindings = <&rgb_encoder>;
        };
    };
};
```

### Variable — `zmk,behavior-sensor-rotate-var` (`#sensor-binding-cells = <2>`)

Two parameters are supplied at the keymap binding site:

```dts
/ {
    behaviors {
        rot_kp: rot_kp {
            compatible = "zmk,behavior-sensor-rotate-var";
            #sensor-binding-cells = <2>;
            bindings = <&kp>, <&kp>;
        };
    };
    keymap {
        default_layer {
            sensor-bindings = <&rot_kp PG_UP PG_DN>;
        };
    };
};
```

## Options / Props

| Property | Type | Description |
|----------|------|-------------|
| `compatible` | string | `zmk,behavior-sensor-rotate` or `zmk,behavior-sensor-rotate-var` |
| `#sensor-binding-cells` | integer | `0` for standard, `2` for variable |
| `bindings` | phandle-array | `[clockwise_behavior, counter_clockwise_behavior]` |
| `sensor-bindings` | phandle + params | Sensor binding reference (with optional params for variable variant) |

## Notes

- Clockwise rotation invokes the first binding; counter-clockwise invokes the second.
- The variable variant passes its two keymap-site parameters directly to the behaviors defined in `bindings`.

## Related

- [Key Press](./key-press.md)
- [RGB Underglow](./underglow.md)
