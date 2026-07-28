# Masks, Blend Modes, and Tints

`Group`, `Part*`, and hand elements support `renderMode` (clipping masks), `blendMode` (compositing), and `tintColor` (color tinting).

## Signature / Usage

```xml
<PartDraw x="175" y="50" width="100" height="100" renderMode="MASK">
    <Ellipse x="0" y="0" width="100" height="100"><Fill color="#FFFFFF" /></Ellipse>
</PartDraw>

<PartText x="135" y="160" width="300" height="120" blendMode="SRC_ATOP">
    <Text align="START"><Font family="pacifico" size="96" color="#fb5607">Hello!</Font></Text>
</PartText>

<Group x="75" y="100" width="350" height="350" tintColor="#ffd3ba">
    <!-- children tinted -->
</Group>
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `renderMode` | enum | `SOURCE` | `SOURCE` (normal), `MASK`, or `ALL`; controls clipping-mask behavior. WFF v1+. |
| `blendMode` | enum (Android `BlendMode` values) | — | Compositing mode against elements drawn earlier, e.g. `SRC_ATOP`, `HUE`, `COLOR_BURN`. WFF v3+ on most elements, v5+ on `Group`/`ComplicationSlot`. |
| `tintColor` | color / expression | — | Applies a color tint to the element; can reference `[CONFIGURATION.*]`. |

## Notes

- This is the Wear OS Watch Face Format / watch face API — distinct from the same-named concept in other skills.
- `renderMode` processing: all `SOURCE` elements are drawn first to an off-screen canvas, then `MASK`/`ALL` elements clip that result — element order within the parent is not considered for masking.
- `blendMode` composites in element (document) order; if both `blendMode` and `renderMode` are used, blend modes are applied first, then render modes.
- Both `renderMode` and `blendMode` add rendering cost; use sparingly on lower-end devices.

## Related

- [scene-and-parts](./scene-and-parts.md)
- [shapes](./shapes.md)
- [versions](./versions.md)
