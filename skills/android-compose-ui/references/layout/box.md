# Box

A layout composable that stacks its children on top of one another (Z-axis). Sizes itself to fit content, subject to incoming constraints.

## Signature / Usage

```kotlin
@Composable
public inline fun Box(
    modifier: Modifier = Modifier,
    contentAlignment: Alignment = Alignment.TopStart,
    propagateMinConstraints: Boolean = false,
    content: @Composable BoxScope.() -> Unit,
)
```

```kotlin
Box {
    Image(bitmap = artist.image, contentDescription = "Artist image")
    Icon(Icons.Filled.Check, contentDescription = "Check mark")
}
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `modifier` | `Modifier` | `Modifier` | Applied to the layout. |
| `contentAlignment` | `Alignment` | `Alignment.TopStart` | Default alignment applied to children smaller than the Box. |
| `propagateMinConstraints` | `Boolean` | `false` | Whether the Box's min constraints are propagated to content; by default content is measured without them. |
| `content` | `@Composable BoxScope.() -> Unit` | — | Children, stacked in composition order (first = bottom). |

## Notes

- `BoxScope.align(alignment: Alignment)` overrides `contentAlignment` for an individual child.
- `BoxScope.matchParentSize(): Modifier` sizes an element to match the Box's final size after all other content is measured; the element itself does not participate in determining the Box's size.
- Package: `androidx.compose.foundation.layout`.

## Related

- [BoxWithConstraints](./boxwithconstraints.md)
- [Column](./column.md)
- [Row](./row.md)
