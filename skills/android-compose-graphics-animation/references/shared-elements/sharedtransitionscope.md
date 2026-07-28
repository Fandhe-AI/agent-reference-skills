# SharedTransitionScope

Scope provided by `SharedTransitionLayout` (or the standalone `SharedTransitionScope` composable) that exposes the shared element modifiers and transition state to its content.

## Signature / Usage

```kotlin
@Stable
interface SharedTransitionScope : LookaheadScope {
    val isTransitionActive: Boolean

    fun Modifier.skipToLookaheadSize(enabled: () -> Boolean = { isTransitionActive }): Modifier
    fun Modifier.skipToLookahedPosition(enabled: () -> Boolean = { isTransitionActive }): Modifier
    fun Modifier.renderInSharedTransitionScopeOverlay(
        zIndexInOverlay: Float = 0f,
        renderInOverlay: () -> Boolean = { isTransitionActive },
    ): Modifier
    fun Modifier.sharedElement(/* see Modifier.sharedElement */): Modifier
    fun Modifier.sharedBounds(/* see Modifier.sharedBounds */): Modifier
    fun Modifier.sharedElementWithCallerManagedVisibility(
        sharedContentState: SharedContentState,
        visible: Boolean,
        boundsTransform: BoundsTransform = SharedTransitionDefaults.BoundsTransform,
        placeholderSize: PlaceholderSize = ContentSize,
        renderInOverlayDuringTransition: Boolean = true,
        zIndexInOverlay: Float = 0f,
        clipInOverlayDuringTransition: OverlayClip = ParentClip,
    ): Modifier
    fun OverlayClip(clipShape: Shape): OverlayClip

    @Composable
    fun rememberSharedContentState(key: Any): SharedContentState
}

@Composable
fun SharedTransitionScope(content: @Composable SharedTransitionScope.(Modifier) -> Unit)
```

```kotlin
with(sharedTransitionScope) {
    Image(
        painter = painterResource(id = R.drawable.cupcake),
        contentDescription = "Cupcake",
        modifier = Modifier
            .sharedElement(
                rememberSharedContentState(key = "image"),
                animatedVisibilityScope = animatedVisibilityScope
            )
            .size(100.dp)
    )
}
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `isTransitionActive` | `Boolean` | — | Whether any shared element transition is currently in progress within this scope. |

## Notes

- `@ExperimentalSharedTransitionApi`.
- Extends `LookaheadScope`, so lookahead-based APIs like `Modifier.skipToLookaheadSize()` are also available.
- Access member modifiers via `with(sharedTransitionScope) { ... }` when the scope is passed as a parameter rather than used as a trailing-lambda receiver.
- A standalone `SharedTransitionScope(content)` composable exists for cases that don't need a dedicated layout container.
- Package: `androidx.compose.animation`.

## Related

- [SharedTransitionLayout](./sharedtransitionlayout.md)
- [Modifier.sharedElement](./sharedelement.md)
- [Modifier.sharedBounds](./sharedbounds.md)
- [rememberSharedContentState](./remembersharedcontentstate.md)
- [OverlayClip](./overlayclip.md)
- [renderInSharedTransitionScopeOverlay](./renderinsharedtransitionscopeoverlay.md)
- [skipToLookaheadSize](./skiptolookaheadsize.md)
