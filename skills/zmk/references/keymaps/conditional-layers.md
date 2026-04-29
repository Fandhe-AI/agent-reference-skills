# Conditional Layers

Conditional layers activate a target layer (the `then-layer`) automatically when all layers in a specified set (`if-layers`) are simultaneously active. This generalizes the common "tri-layer" pattern.

## Signature / Usage

```devicetree
/ {
    conditional_layers {
        compatible = "zmk,conditional-layers";

        tri_layer {
            if-layers = <1 2>;
            then-layer = <3>;
        };
    };
};
```

In this example, layer 3 activates whenever both layers 1 and 2 are active at the same time.

## Options / Props

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `if-layers` | array of layer numbers | Yes | All layers that must be active to trigger the conditional |
| `then-layer` | layer number | Yes | Layer activated when all `if-layers` conditions are met |

## Notes

- `then-layer` should be a **higher number** than any of its `if-layers` so it takes priority correctly in layer resolution
- Cascading: activating a `then-layer` can itself satisfy `if-layers` in another conditional, creating chain activations
- A layer designated as a `then-layer` is managed exclusively by the conditional system — do not target it with regular layer behaviors (`&mo`, `&to`, etc.), as it will be immediately deactivated if the conditional requirements are not met
- Defined in a `conditional_layers { }` node, separate from `keymap { }`, inside the root `/` node

## Related

- [Keymaps Overview](./overview.md)
- [Combos](./combos.md)
