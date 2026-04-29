# Transformer Input Processor

Applies transforms (invert, swap) to the values of input events matching specified axis codes.

## Signature / Usage

```dts
/ {
    input_processors {
        my_transform: my_transform {
            compatible = "zmk,input-processor-transform";
            #input-processor-cells = <1>;
            type = <INPUT_EV_REL>;
            x-codes = <INPUT_REL_RX>;
            y-codes = <INPUT_REL_RY>;
        };
    };
};
```

Reference with one runtime flag parameter:

```dts
#include <dt-bindings/zmk/input_transform.h>

/* Invert the X axis */
input-processors = <&zip_xy_transform INPUT_TRANSFORM_X_INVERT>;

/* Swap X and Y */
input-processors = <&zip_xy_transform INPUT_TRANSFORM_XY_SWAP>;
```

## Options / Props

### Required

| Property | Value | Description |
|----------|-------|-------------|
| `compatible` | `"zmk,input-processor-transform"` | Processor type |
| `#input-processor-cells` | `<1>` | One runtime parameter: transform flags |

### Runtime Parameter — Transform Flags

| Flag | Description |
|------|-------------|
| `INPUT_TRANSFORM_X_INVERT` | Multiply X-axis values by -1 |
| `INPUT_TRANSFORM_Y_INVERT` | Multiply Y-axis values by -1 |
| `INPUT_TRANSFORM_XY_SWAP` | Swap X and Y axis codes |

Flags can be combined with bitwise OR.

### Optional Node Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `type` | int | `INPUT_EV_REL` | Event type to match |
| `x-codes` | array | — | Codes treated as the X axis |
| `y-codes` | array | — | Codes treated as the Y axis |

### Pre-Defined Instances

| Instance | Codes Targeted |
|----------|---------------|
| `&zip_xy_transform` | `INPUT_REL_X` / `INPUT_REL_Y` |
| `&zip_scroll_transform` | `INPUT_REL_HWHEEL` / `INPUT_REL_WHEEL` |

## Notes

- `INPUT_TRANSFORM_XY_SWAP` rewrites the event code from the X code to the corresponding Y code (and vice versa), not the value.
- X/Y swapping is also achievable with the code-mapper processor (`&zip_xy_swap_mapper`); the transformer is more concise for combined invert+swap operations.
- Multiple flags can be OR-ed together: `INPUT_TRANSFORM_X_INVERT | INPUT_TRANSFORM_XY_SWAP`.

## Related

- [Overview](./overview.md)
- [Scaler](./scaler.md)
- [Code Mapper](./code-mapper.md)
