# BoxWithConstraints

A composable that defines its own content according to the available space, based on incoming constraints or the current `LayoutDirection`. Behaves like `Box` but exposes the measured constraints to its content lambda.

## Signature / Usage

```kotlin
@Composable
public fun BoxWithConstraints(
    modifier: Modifier = Modifier,
    contentAlignment: Alignment = Alignment.TopStart,
    propagateMinConstraints: Boolean = false,
    content: @Composable BoxWithConstraintsScope.() -> Unit,
)
```

```kotlin
BoxWithConstraints {
    if (maxWidth < 600.dp) {
        CompactContent()
    } else {
        WideContent()
    }
}
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `modifier` | `Modifier` | `Modifier` | Applied to the layout. |
| `contentAlignment` | `Alignment` | `Alignment.TopStart` | Default alignment applied to children smaller than the box. |
| `propagateMinConstraints` | `Boolean` | `false` | Whether the box's min constraints are propagated to content. |
| `content` | `@Composable BoxWithConstraintsScope.() -> Unit` | — | Content that can read the scope's constraint properties. |

## Notes

- `BoxWithConstraintsScope` exposes `constraints: Constraints`, `minWidth: Dp`, `maxWidth: Dp` (`Dp.Infinity` if unbounded), `minHeight: Dp`, `maxHeight: Dp` (`Dp.Infinity` if unbounded).
- Reading constraints forces content to be measured on every parent size change (subcomposition), which is more expensive than a plain `Box`; use only when layout truly depends on available space.
- Package: `androidx.compose.foundation.layout`.

## Related

- [Box](./box.md)
- [SubcomposeLayout](./subcomposelayout.md)
