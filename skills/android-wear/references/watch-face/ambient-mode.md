# Ambient Mode

Ambient mode is the always-on, low-power display state. WFF watch faces adapt appearance in ambient mode using `<Variant mode="AMBIENT">` to change attributes such as `alpha`.

## Signature / Usage

```xml
<Group name="logo_interactive" x="100" y="100" width="200" height="200">
    <Variant mode="AMBIENT" target="alpha" value="0" />
    <!-- shown in interactive mode -->
</Group>

<Group name="logo_ambient" x="100" y="100" width="200" height="200" alpha="0">
    <Variant mode="AMBIENT" target="alpha" value="255" />
    <!-- shown in ambient mode -->
</Group>
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `Variant.mode` | enum | — | `"AMBIENT"` applies the override while the device is in ambient mode. |
| `Variant.target` | string | — | Attribute to override, typically `"alpha"`. |
| `Variant.value` | int (0-255) | — | `0` hides the element (fully transparent); `255` shows it fully opaque. |

## Notes

- This is the Wear OS Watch Face Format / watch face API — distinct from the same-named concept in other skills.
- Per Wear OS App Quality guidelines, only ~15% of pixels should be illuminated in ambient mode; watches spend most of their time in this state.
- Apply `<Variant>` at the `Group` or `Part*` level rather than on every child to reduce XML and reduce per-element overhead.
- WFF v4 added transition animations when entering/exiting ambient mode.
- Ambient mode also has its own memory budget (10 MB, vs 100 MB interactive) — see [memory-optimization](./memory-optimization.md).

## Related

- [transform](./transform.md)
- [memory-optimization](./memory-optimization.md)
