# DimensionBuilders

Shortcut factory functions for building the dimension property types (`DpProp`, `SpProp`, `EmProp`, `DegreesProp`, `ExpandedDimensionProp`, `WrappedDimensionProp`) used by `width`/`height`/`padding`/font-size setters throughout ProtoLayout.

## Signature / Usage

```kotlin
Image.Builder()
    .setWidth(dp(24f))
    .setHeight(dp(24f))
    .build()

text(
    text = "Hello".layoutString,
    // font size handled via typography tokens, sp() used for custom cases
)

Box.Builder()
    .setWidth(expand())
    .setHeight(wrap())
    .build()
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `dp(valueDp: Float): DpProp` | factory | Builds a `DpProp` for a density-independent-pixel measurement. |
| `sp(valueSp: Float): SpProp` | factory | Builds an `SpProp` for a scalable-pixel measurement (font sizes). |
| `em(valueEm: Int / Float): EmProp` | factory | Builds an `EmProp` for a measurement relative to font size. |
| `degrees(valueDegrees: Float): DegreesProp` | factory | Builds a `DegreesProp` for angular measurements (arcs, rotation). |
| `expand(): ExpandedDimensionProp` | factory | Element expands to fill the size of its parent. |
| `weight(weight: Float): ExpandedDimensionProp` | factory | Proportionally-weighted expansion; remaining space in a `Row`/`Column` is split across weighted children. |
| `wrap(): WrappedDimensionProp` | factory | Element shrinks to the size of its children. |

`DpProp.Builder(staticValue: Float)` also supports `setDynamicValue(DynamicFloat)` to animate/bind the value; `build()` throws `IllegalStateException` if a dynamic value is set without a static fallback.

## Notes

- `weight()` only applies inside `Row` / `Column` children that also use expand-style dimensions; the remaining space is split proportionally.
- Package: `androidx.wear.protolayout.DimensionBuilders` (formerly `androidx.wear.tiles.DimensionBuilders`).

## Related

- [layout-elements](./layout-elements.md)
- [color-and-type](./color-and-type.md)
