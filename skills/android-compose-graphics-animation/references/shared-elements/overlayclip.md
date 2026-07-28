# OverlayClip

Defines the clip shape applied to a shared element/bounds while it is rendered in the transition overlay, preventing it from drawing outside its intended parent container during the animation.

## Signature / Usage

```kotlin
interface OverlayClip {
    fun getClipPath(
        sharedContentState: SharedTransitionScope.SharedContentState,
        bounds: Rect,
        layoutDirection: LayoutDirection,
        density: Density,
    ): Path?
}

// Factory on SharedTransitionScope
fun SharedTransitionScope.OverlayClip(clipShape: Shape): OverlayClip
```

```kotlin
Box(
    modifier = Modifier
        .sharedBounds(
            sharedContentState = rememberSharedContentState(key = "${snack.name}-bounds"),
            animatedVisibilityScope = this,
            clipInOverlayDuringTransition = OverlayClip(shape)
        )
) { /* content */ }
```

## Notes

- `@ExperimentalSharedTransitionApi`.
- Set via the `clipInOverlayDuringTransition` parameter on `sharedElement()` / `sharedBounds()` / `sharedElementWithCallerManagedVisibility()`. Default is `ParentClip`, which clips to the ancestor container's shape.
- Setting `renderInOverlayDuringTransition = false` disables overlay rendering entirely (rarely needed) instead of relying on clipping.
- Package: `androidx.compose.animation` (nested in `SharedTransitionScope.OverlayClip`).

## Related

- [Modifier.sharedElement](./sharedelement.md)
- [Modifier.sharedBounds](./sharedbounds.md)
- [renderInSharedTransitionScopeOverlay](./renderinsharedtransitionscopeoverlay.md)
