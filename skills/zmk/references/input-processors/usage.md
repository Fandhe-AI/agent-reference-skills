# Input Processor Usage

Describes how to attach input processors to input listeners and configure layer-specific overrides.

## Signature / Usage

### Base Processors

Assign a chain of processors to the `input-processors` property on an input listener. Events are processed in list order.

```dts
&my_trackpad_listener {
    input-processors = <&zip_xy_scaler 2 1>;
};
```

### Layer-Specific Overrides

Nest child nodes under the listener to apply processors only when certain layers are active.

```dts
&my_trackpad_listener {
    input-processors = <&zip_xy_scaler 2 1>;

    scroll_override: scroll_override {
        layers = <SCROLL_LAYER>;
        input-processors = <&zip_xy_to_scroll_mapper>;
    };
};
```

## Options / Props

### Listener Properties

| Property | Type | Description |
|----------|------|-------------|
| `input-processors` | phandle-array | Ordered chain of base processors applied to all events |

### Override Child Node Properties

| Property | Type | Description |
|----------|------|-------------|
| `layers` | array | Layer indices that activate this override |
| `input-processors` | phandle-array | Processor chain applied when override matches |
| `process-next` | bool | Continue evaluating subsequent overrides after this one matches |

## Notes

- Override nodes are evaluated in declaration order (top-to-bottom) before base processors execute.
- By default, only the **first matching** override applies; add `process-next` to allow multiple overrides to chain.
- Base processors always run after all applicable overrides have been processed.

## Related

- [Overview](./overview.md)
- [Scaler](./scaler.md)
- [Transformer](./transformer.md)
- [Temp Layer](./temp-layer.md)
