# Layer Behaviors

ZMK provides several behaviors for activating, toggling, and switching keyboard layers. Multiple layers can be active simultaneously; layer numbers start at 0 in keymap definition order.

## Signature / Usage

```dts
&mo <layer>    // Momentary: active while held
&to <layer>    // To: enable one layer, disable all others (except default)
&tog <layer>   // Toggle: flip current on/off state
&lt <layer> <keycode>  // Layer-Tap: layer on hold, keycode on tap (see hold-tap.md)
```

## Behaviors

### Momentary Layer — `&mo`

Activates a layer while the key is held; deactivates on release.

```dts
&mo 3   // hold to activate layer 3
```

### To Layer — `&to`

Enables the specified layer and disables all others except the default (layer 0).

```dts
&to 3
```

### Toggle Layer — `&tog`

Flips the layer between enabled and disabled.

```dts
&tog 3
```

Custom one-directional variant:

```dts
/ {
    behaviors {
        tog_on: toggle_layer_on {
            compatible = "zmk,behavior-toggle-layer";
            #binding-cells = <1>;
            display-name = "Toggle Layer On";
            toggle-mode = "on";
        };
    };
};
```

## Options / Props (`&tog`)

| Property | Type | Description |
|----------|------|-------------|
| `toggle-mode` | string (`"on"` / `"off"`) | Restrict behavior to only enable or only disable the layer |
| `locking` | flag | Mark this layer activation as "locked" (won't be deactivated by non-locking behaviors) |

## Notes

- `&to` and `&tog` with `locking` property prevent momentary behaviors from deactivating those layers.
- Define layer number constants for readability: `#define LOWER 1`, then use `&mo LOWER`.
- Layer-Tap (`&lt`) is documented in detail under [Hold-Tap](./hold-tap.md).
- Conditional Layers (activate a layer when two other layers are both active) are configured separately in the `conditional_layers` node.

## Related

- [Hold-Tap / Layer-Tap](./hold-tap.md)
- [Sticky Layer](./sticky-layer.md)
- [Misc (trans / none)](./misc.md)
