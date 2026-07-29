# Intrinsic measurements (custom layout authoring)

When authoring a custom `Layout` or `LayoutModifier`, intrinsic width/height are approximated by default; override the intrinsic methods on `MeasurePolicy` (for `Layout`) or `LayoutModifier` to report accurate values so consumers can safely use `IntrinsicSize.Min`/`Max` against the custom composable.

## Signature / Usage

```kotlin
Layout(
    content = content,
    modifier = modifier,
    measurePolicy = object : MeasurePolicy {
        override fun MeasureScope.measure(
            measurables: List<Measurable>,
            constraints: Constraints,
        ): MeasureResult {
            // measure and place children
        }

        override fun IntrinsicMeasureScope.minIntrinsicWidth(
            measurables: List<IntrinsicMeasurable>,
            height: Int,
        ): Int {
            // custom logic
        }

        // maxIntrinsicWidth / minIntrinsicHeight / maxIntrinsicHeight
        // each have a default implementation; override only what's needed.
    },
)
```

```kotlin
fun Modifier.myCustomModifier(/* ... */) = this then object : LayoutModifier {
    override fun MeasureScope.measure(
        measurable: Measurable,
        constraints: Constraints,
    ): MeasureResult {
        // measure and place the single child
    }

    override fun IntrinsicMeasureScope.minIntrinsicWidth(
        measurable: IntrinsicMeasurable,
        height: Int,
    ): Int {
        // custom logic
    }
}
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `minIntrinsicWidth(measurables, height)` | `Int` | approximated | Minimum width needed to display content correctly given a fixed `height`. |
| `maxIntrinsicWidth(measurables, height)` | `Int` | approximated | Maximum width the content would use given a fixed `height`. |
| `minIntrinsicHeight(measurables, width)` | `Int` | approximated | Minimum height needed to display content correctly given a fixed `width`. |
| `maxIntrinsicHeight(measurables, width)` | `Int` | approximated | Maximum height the content would use given a fixed `width`. |

## Notes

- `MeasurePolicy` (used by the `Layout` composable) receives `List<IntrinsicMeasurable>` since a `Layout` can have multiple children; `LayoutModifier` receives a single `IntrinsicMeasurable` since it wraps one child.
- All four methods have default implementations derived from the regular `measure` logic, so only override the ones whose default approximation is inaccurate for the custom layout.
- Intrinsic queries do not cause children to be measured twice in the real measure pass; they run as a separate, additional query used by ancestors (e.g. a sibling using `Modifier.width(IntrinsicSize.Min)`).
- This is the producer/authoring side; see `IntrinsicSize` for the consumer-side modifier that triggers an intrinsic query from a `Row`/`Column`.
- Package: `androidx.compose.ui.layout` (`MeasurePolicy`, `LayoutModifier`, `IntrinsicMeasureScope`).

## Related

- [IntrinsicSize](./intrinsicsize.md)
- [Layout (custom layout)](./layout.md)
- [Modifier (layout)](./modifier-layout.md)
