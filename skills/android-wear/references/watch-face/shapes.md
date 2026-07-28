# Drawing Shapes (Rectangle, Ellipse, Line, Arc)

`<PartDraw>` hosts drawing primitives — `<Rectangle>`, `<Ellipse>`, `<Line>`, and `<Arc>` — each filled or stroked via a `<Fill>` or `<Stroke>` child.

## Signature / Usage

```xml
<PartDraw x="175" y="50" width="100" height="100">
    <Ellipse x="0" y="0" width="100" height="100">
        <Fill color="#FFFFFF" />
    </Ellipse>
</PartDraw>

<PartDraw x="0" y="0" width="420" height="420">
    <Arc centerX="225" centerY="225" width="420" height="420" startAngle="0" endAngle="0">
        <Stroke color="#FF00FF" thickness="20" cap="ROUND" />
    </Arc>
</PartDraw>
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `Rectangle.x` / `y` / `width` / `height` | int | — | Required position and size. |
| `Ellipse.x` / `y` / `width` / `height` | int | — | Required position and size. |
| `Arc.centerX` / `centerY` / `width` / `height` | int | — | Bounding box of the arc, centered on `centerX`/`centerY`. |
| `Arc.startAngle` / `endAngle` | float | — | Start/end angle in degrees; commonly driven via `<Transform target="endAngle">` for progress indicators. |
| `Fill.color` | color | — | Solid fill color; can contain `<LinearGradient>` instead of a flat color. |
| `Stroke.color` / `thickness` | color / float | — | Stroke color and line thickness. |
| `Stroke.cap` | enum | — | Line cap style, e.g. `ROUND`. |

## Notes

- This is the Wear OS Watch Face Format / watch face API — distinct from the same-named concept in other skills.
- Each shape element must contain exactly one `<Stroke>` or `<Fill>`, not both simultaneously as siblings without purpose overlap.
- `<Fill>` can hold `<LinearGradient startX startY endX endY colors="#... #... #..." positions="0.25 0.5 0.75" />` for gradient fills.
- Arcs are recommended over frame-by-frame image sequences for progress/step indicators to reduce memory footprint (see [memory-optimization](./memory-optimization.md)).

## Related

- [scene-and-parts](./scene-and-parts.md)
- [transform](./transform.md)
- [memory-optimization](./memory-optimization.md)
