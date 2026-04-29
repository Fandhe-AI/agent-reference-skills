# Code Mapper Input Processor

Remaps input event codes to different codes, for example converting vertical Y movement events into scroll wheel events.

## Signature / Usage

```dts
#include <zephyr/dt-bindings/input/input-event-codes.h>

/ {
    input_processors {
        my_btn0_to_btn2: my_btn0_to_btn2 {
            compatible = "zmk,input-processor-code-mapper";
            #input-processor-cells = <0>;
            type = <INPUT_EV_KEY>;
            map = <INPUT_BTN_0 INPUT_BTN_2>;
        };
    };
};
```

Reference with no parameters:

```dts
input-processors = <&zip_xy_to_scroll_mapper>;
```

## Options / Props

### Required

| Property | Value | Description |
|----------|-------|-------------|
| `compatible` | `"zmk,input-processor-code-mapper"` | Processor type |
| `#input-processor-cells` | `<0>` | No runtime parameters |

### Optional

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `type` | int | `INPUT_EV_REL` | Event type to match (`INPUT_EV_REL` or `INPUT_EV_KEY`) |
| `map` | array | — | Paired list of source and target codes: `<src1 dst1 src2 dst2 ...>` |

### Pre-Defined Instances

| Instance | Description |
|----------|-------------|
| `&zip_xy_to_scroll_mapper` | Maps X/Y movement to horizontal wheel / wheel scroll |
| `&zip_xy_swap_mapper` | Swaps X and Y movement codes |

## Notes

- The `map` array must contain an even number of values; each pair is `<source_code target_code>`.
- X/Y swapping can alternatively be achieved with the transformer processor using `XY_SWAP`.
- Only events whose `type` matches the configured `type` property are affected.

## Related

- [Overview](./overview.md)
- [Transformer](./transformer.md)
- [Behaviors](./behaviors.md)
