# ColorBuilders / TypeBuilders

Property wrappers for colors and primitive string/float values used across ProtoLayout layout elements and modifiers. Most values support both a static value and an optional bound `Dynamic*` value.

## Signature / Usage

```kotlin
Modifiers.Builder()
    .setBackground(
        ModifiersBuilders.Background.Builder()
            .setColor(argb(0xFFFF0000.toInt()))
            .build()
    )
    .build()

Text.Builder(
    this,
    TypeBuilders.StringProp.Builder("--")
        .setDynamicValue(
            PlatformHealthSources.heartRateBpm().format()
        )
        .build(),
    TypeBuilders.StringLayoutConstraint.Builder("000").build(),
).build()
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `argb(colorArgb: Int): ColorProp` | factory | Builds a `ColorProp` from an ARGB int value (`ColorBuilders.argb`). |
| `ColorProp.Builder().setArgb(argb: Int)` | builder | Sets the ARGB color value directly. |
| `TypeBuilders.StringProp.Builder(value: String)` | builder | Holds a string value; `setValue(String)`, `setDynamicValue(DynamicString)`. |
| `TypeBuilders.StringLayoutConstraint.Builder(patternForLayout: String)` | builder | Required when a `StringProp` used for a physical dimension (e.g. text affecting layout width) has a dynamic value — reserves layout space based on a sample pattern string (e.g. `"000"` for a 3-digit number). |
| `TypeBuilders.FloatProp.Builder(value: Float)` | builder | Holds a float value; `setValue(Float)`, `setDynamicValue(DynamicFloat)`. |

## Notes

- When a dynamic expression affects a physical dimension (anything except color), a matching `setLayoutConstraintsForDynamic*` / `*LayoutConstraint` must be supplied; Material3 components (`text()`, etc.) set these automatically.
- Package: `androidx.wear.protolayout.ColorBuilders` / `androidx.wear.protolayout.TypeBuilders` (formerly under `androidx.wear.tiles`).

## Related

- [dimensions](./dimensions.md)
- [platform-data](./platform-data.md)
