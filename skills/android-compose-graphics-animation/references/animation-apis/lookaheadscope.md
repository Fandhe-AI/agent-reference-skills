# LookaheadScope

Provides a scope in which child layouts are first measured/placed in a "lookahead" pass to determine their final target size and position, so custom animations can smoothly interpolate towards that target instead of jumping to it.

## Signature / Usage

```kotlin
@Composable
fun LookaheadScope(
    content: @Composable LookaheadScope.() -> Unit,
): Unit

interface LookaheadScope {
    fun LayoutCoordinates.toLookaheadCoordinates(): LayoutCoordinates

    val Placeable.PlacementScope.lookaheadScopeCoordinates: LayoutCoordinates

    fun LayoutCoordinates.localLookaheadPositionOf(
        sourceCoordinates: LayoutCoordinates,
        relativeToSource: Offset = Offset.Zero,
        includeMotionFrameOfReference: Boolean = true,
    ): Offset
}
```

```kotlin
LookaheadScope {
    // Children measured here can query their lookahead (target) position/size
    // via LayoutCoordinates.toLookaheadCoordinates() to build custom
    // bounds-change animations.
}
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `content` | `@Composable LookaheadScope.() -> Unit` | — | Content measured within the lookahead scope. |
| `toLookaheadCoordinates()` | `LayoutCoordinates` | — | Converts a layout's current coordinates to lookahead (target) coordinates. |
| `localLookaheadPositionOf(sourceCoordinates, relativeToSource, includeMotionFrameOfReference)` | `Offset` | — | Computes a layout's position relative to another, in lookahead space. |

## Notes

- `LookaheadScope` is the low-level primitive underlying container-transform-style animations; `SharedTransitionLayout` / `Modifier.sharedElement` (owned by the `shared-elements` category of this skill) build on top of it and are the recommended API for most shared-element use cases.
- Package: `androidx.compose.ui.layout`.

## Related

- [Transition](./transition.md)
