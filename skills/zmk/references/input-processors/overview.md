# Input Processors Overview

Input processors are functional components that process and optionally modify events generated from emulated and physical pointing devices. They enable customization of pointer behavior through scaling, event type transformation, layer management, and behavior triggering.

## Signature / Usage

Include pre-defined processors via:

```c
#include <input/processors.dtsi>
```

Assign to an input listener's `input-processors` property:

```dts
&my_input_listener {
    input-processors = <&zip_xy_scaler 2 1>;
};
```

## Options / Props

### Pre-Defined Processor Instances

| Instance | Type | Description |
|----------|------|-------------|
| `&zip_xy_scaler` | scaler | Scales X and Y axes |
| `&zip_x_scaler` | scaler | Scales X axis only |
| `&zip_y_scaler` | scaler | Scales Y axis only |
| `&zip_scroll_scaler` | scaler | Scales scroll/wheel values |
| `&zip_xy_transform` | transformer | Transforms X/Y movement events |
| `&zip_scroll_transform` | transformer | Transforms scroll/wheel events |
| `&zip_xy_to_scroll_mapper` | code-mapper | Converts X/Y movements to scroll |
| `&zip_xy_swap_mapper` | code-mapper | Swaps X and Y movement mappings |
| `&zip_temp_layer` | temp-layer | Enables a layer during pointer activity |
| `&zip_button_behaviors` | behaviors | Triggers behaviors on mouse button events |

### User-Defined Processor Compatibles

| Compatible String | Description |
|-------------------|-------------|
| `zmk,input-processor-scaler` | Scale event values by multiply/divide |
| `zmk,input-processor-transform` | Invert or swap axis values |
| `zmk,input-processor-code-mapper` | Remap event codes to different codes |
| `zmk,input-processor-behaviors` | Trigger behaviors on input events |
| `zmk,input-processor-temp-layer` | Activate a layer during input activity |

## Notes

- Multiple processors can be chained; they execute in the order listed in `input-processors`.
- Layer-specific overrides can add context-dependent processor chains that activate only on certain layers.
- Processors operate before the event reaches the rest of the ZMK input stack.

## Related

- [Usage](./usage.md)
- [Scaler](./scaler.md)
- [Transformer](./transformer.md)
- [Code Mapper](./code-mapper.md)
- [Temp Layer](./temp-layer.md)
- [Behaviors](./behaviors.md)
