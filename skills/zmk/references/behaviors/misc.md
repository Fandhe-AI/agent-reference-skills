# Miscellaneous Behaviors

Two utility behaviors for controlling key event propagation between layers.

## Signature / Usage

```dts
&trans   // pass event to next active layer
&none    // swallow and block event
```

No parameters for either behavior.

## Behaviors

### Transparent — `&trans`

Ignores the key press/release at this layer position, allowing the event to fall through to the next active layer in the stack.

```dts
bindings = <&trans &kp A &trans>;
```

### None — `&none`

Swallows the key press/release at this layer position, preventing it from reaching any lower layer.

```dts
bindings = <&none &kp A &none>;
```

## Notes

- `&trans` is the standard placeholder for keys that should "inherit" their binding from a lower layer.
- `&none` explicitly blocks a key position, useful for disabling keys on a specific layer without accidentally activating bindings from lower layers.

## Related

- [Layers](./layers.md)
- [Overview](./overview.md)
