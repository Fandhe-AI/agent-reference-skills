# Transform, Animation, and Variant

`<Transform>` dynamically recalculates an attribute of its parent element using an expression, re-evaluating whenever the underlying data source changes. `<Animation>` smooths the resulting value change; `<Variant>` swaps an attribute value based on a device mode (e.g. ambient).

## Signature / Usage

```xml
<Ellipse x="0" y="100" width="50" height="50">
    <Fill color="#00ff00" />
    <Transform target="x" value="[SECOND] % 2 == 0 ? 0 : 200">
        <Animation duration="1" interpolation="EASE_IN_OUT" />
    </Transform>
</Ellipse>
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `Transform.target` | string | — | Name of the parent attribute to change (e.g. `x`, `y`, `alpha`, `angle`, `endAngle`). |
| `Transform.value` | expression | — | Expression using WFF's expression language, evaluated to produce the new attribute value (see [expressions](./expressions.md)). |
| `Animation.duration` | float (seconds) | — | Duration of the transition between old and new values. |
| `Animation.interpolation` | enum | — | Easing curve, e.g. `EASE_IN_OUT`. |
| `Variant.mode` | enum | — | Device mode the override applies to (e.g. `AMBIENT`). |
| `Variant.target` | string | — | Attribute to override in that mode. |
| `Variant.value` | expression/value | — | Value applied in that mode. |

## Notes

- This is the Wear OS Watch Face Format / watch face API — distinct from the same-named concept in other skills.
- Not all attributes on all elements are transformable; typical transformable targets are `Group`, `Part*` elements, and shape/style children.
- For accelerometer-driven movement, use `<Gyro>` instead of `<Transform>` — it separates gesture/motion-based transforms from data-driven ones.
- Without `<Animation>`, value changes apply instantly (no easing).
- `<Variant>` is the primary mechanism for [ambient-mode](./ambient-mode.md) appearance changes.

## Related

- [ambient-mode](./ambient-mode.md)
- [expressions](./expressions.md)
- [scene-and-parts](./scene-and-parts.md)
