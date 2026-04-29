# Sticky Layer

Activates a layer temporarily without requiring the key to be held. The layer stays active until another (non-modifier) key is pressed, then deactivates. Equivalent to QMK "one-shot layers".

## Signature / Usage

```dts
&sl <layer>
// e.g. &sl 1
```

**Parameter:** Layer index to activate (0-based).

Custom configuration example:

```dts
&sl {
    release-after-ms = <2000>;
};
```

## Options / Props

| Property | Type | Description |
|----------|------|-------------|
| `release-after-ms` | integer | Auto-release timeout in ms if no key is pressed (default: 1000) |
| `quick-release` | flag | Layer releases immediately on next key press (enabled by default) |

## Notes

- Can be chained with sticky keys: tap `&sl 1`, then `&sk LSHIFT`, then `&kp A` → produces Shift+A on layer 1.

## Related

- [Sticky Key](./sticky-key.md)
- [Layers](./layers.md)
- [Tap-Dance](./tap-dance.md)
