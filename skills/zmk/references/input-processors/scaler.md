# Scaler Input Processor

Scales input event values by multiplying then dividing, used to increase or decrease pointer sensitivity on specified axes.

## Signature / Usage

```dts
/ {
    input_processors {
        my_scaler: my_scaler {
            compatible = "zmk,input-processor-scaler";
            #input-processor-cells = <2>;
            type = <INPUT_EV_REL>;
            codes = <INPUT_REL_X INPUT_REL_Y>;
            track-remainders;
        };
    };
};
```

Reference with two runtime parameters `<multiplier divisor>`:

```dts
/* Double movement speed */
input-processors = <&zip_xy_scaler 2 1>;

/* Reduce to one-third speed */
input-processors = <&zip_xy_scaler 1 3>;
```

## Options / Props

### Required

| Property | Value | Description |
|----------|-------|-------------|
| `compatible` | `"zmk,input-processor-scaler"` | Processor type |
| `#input-processor-cells` | `<2>` | Two runtime parameters: multiplier and divisor |

### Runtime Parameters

| Position | Name | Description |
|----------|------|-------------|
| 1st | multiplier | Positive integer (max 16) to multiply event values by |
| 2nd | divisor | Positive integer (max 16) to divide event values by |

### Optional Node Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `type` | int | `INPUT_EV_REL` | Event type to match |
| `codes` | array | — | Specific event codes to scale |
| `track-remainders` | bool | false | Accumulate fractional remainders across events for smoother low-speed movement |

### Pre-Defined Instances

| Instance | Codes Targeted |
|----------|---------------|
| `&zip_xy_scaler` | `INPUT_REL_X`, `INPUT_REL_Y` |
| `&zip_x_scaler` | `INPUT_REL_X` |
| `&zip_y_scaler` | `INPUT_REL_Y` |
| `&zip_scroll_scaler` | `INPUT_REL_WHEEL`, `INPUT_REL_HWHEEL` |

## Notes

- Both multiplier and divisor are capped at **16** to prevent integer overflow.
- The final value is computed as: `new_value = (old_value * multiplier) / divisor`.
- `track-remainders` is useful when dividing: remainders accumulate and are added to future events, preventing movement loss at low speeds.

## Related

- [Overview](./overview.md)
- [Usage](./usage.md)
- [Transformer](./transformer.md)
