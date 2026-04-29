# Temp Layer Input Processor

Activates a specified keymap layer when pointing device events are received and automatically deactivates it after a configurable idle timeout.

## Signature / Usage

```dts
/ {
    input_processors {
        my_temp_layer: my_temp_layer {
            compatible = "zmk,input-processor-temp-layer";
            #input-processor-cells = <2>;
        };
    };
};
```

Reference with two runtime parameters `<layer_index timeout_ms>`:

```dts
/* Enable layer 2 (0-indexed), deactivate after 2000 ms of inactivity */
input-processors = <&zip_temp_layer 2 2000>;
```

## Options / Props

### Required

| Property | Value | Description |
|----------|-------|-------------|
| `compatible` | `"zmk,input-processor-temp-layer"` | Processor type |
| `#input-processor-cells` | `<2>` | Two runtime parameters: layer index and timeout |

### Runtime Parameters

| Position | Name | Description |
|----------|------|-------------|
| 1st | layer | Zero-based layer index to activate |
| 2nd | timeout-ms | Milliseconds of inactivity before the layer is deactivated |

### Optional Node Properties

| Property | Type | Description |
|----------|------|-------------|
| `require-prior-idle-ms` | int | Minimum keyboard idle time (ms) before the layer can be activated |
| `excluded-positions` | array | Key positions whose presses do not reset or cancel the idle timeout |

### Pre-Defined Instance

| Instance | Description |
|----------|-------------|
| `&zip_temp_layer` | General-purpose temp layer, no excluded positions set |

## Notes

- The primary use case is enabling a layer containing mouse button emulation behaviors (`&mkp`) while the pointer is in use.
- `require-prior-idle-ms` prevents accidental layer activation during fast typing followed by pointer movement.
- `excluded-positions` allows certain modifier keys to be held without cancelling the temp layer.

## Related

- [Overview](./overview.md)
- [Usage](./usage.md)
- [Behaviors](./behaviors.md)
