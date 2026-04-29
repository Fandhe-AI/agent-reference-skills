# Keymap

Configuration for keyboard layer definitions and sensor bindings using Devicetree syntax.

## Devicetree

### Primary Node: `zmk,keymap`

**Compatible:** `zmk,keymap`

The keymap node itself has no properties. It contains child nodes representing keyboard layers, starting with the default layer (layer 0).

#### Layer Child Node Properties

| Property | Type | Description |
|----------|------|-------------|
| `display-name` | string | Layer name shown in ZMK Studio and on displays |
| `bindings` | phandle-array | Key behavior references; order must match kscan configuration |
| `sensor-bindings` | phandle-array | Sensor behavior references; order must match sensor definitions |

### Example

```dts
/ {
    keymap {
        compatible = "zmk,keymap";

        default_layer {
            display-name = "Base";
            bindings = <
                &kp Q &kp W &kp E
            >;
        };
    };
};
```

### Secondary Node: `zmk,keymap-sensors`

**Compatible:** `zmk,keymap-sensors`

| Property | Type | Description |
|----------|------|-------------|
| `sensors` | phandles | References to available sensor nodes |

Supported sensor types: EC11 encoders (`alps,ec11`).

## Notes

- Binding order in `bindings` is critical and must match the keyboard scan configuration.
- `sensor-bindings` order must match the order of sensors declared in `zmk,keymap-sensors`.
- Binding file: `zmk/app/dts/bindings/zmk,keymap.yaml`

## Related

- [Behaviors](./behaviors.md)
- [Combos](./combos.md)
- [Encoders](./encoders.md)
- [Kscan](./kscan.md)
- [Layout](./layout.md)
