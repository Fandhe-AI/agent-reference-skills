# Modifier.sharedBounds

Flags a composable whose *bounds* (not necessarily its visual content) should be shared between two states, e.g. a container transform where different content occupies the same area before and after. Content that is entering/exiting is visible during the transition, like `AnimatedContent`.

## Signature / Usage

```kotlin
fun Modifier.sharedBounds(
    sharedContentState: SharedTransitionScope.SharedContentState,
    animatedVisibilityScope: AnimatedVisibilityScope,
    enter: EnterTransition = fadeIn(),
    exit: ExitTransition = fadeOut(),
    boundsTransform: BoundsTransform = SharedTransitionDefaults.BoundsTransform,
    resizeMode: SharedTransitionScope.ResizeMode = scaleToBounds(ContentScale.FillWidth, Alignment.Center),
    placeholderSize: SharedTransitionScope.PlaceholderSize = ContentSize,
    renderInOverlayDuringTransition: Boolean = true,
    zIndexInOverlay: Float = 0f,
    clipInOverlayDuringTransition: SharedTransitionScope.OverlayClip = ParentClip,
): Modifier
```

```kotlin
with(sharedTransitionScope) {
    Row(
        modifier = Modifier
            .padding(8.dp)
            .sharedBounds(
                rememberSharedContentState(key = "bounds"),
                animatedVisibilityScope = animatedVisibilityScope,
                enter = fadeIn(),
                exit = fadeOut(),
                resizeMode = SharedTransitionScope.ResizeMode.scaleToBounds()
            )
    ) {
        // Content
    }
}
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `sharedContentState` | `SharedContentState` | — | Obtained via `rememberSharedContentState(key)`; elements sharing the same key are matched. |
| `animatedVisibilityScope` | `AnimatedVisibilityScope` | — | Coordinates the transition with the enclosing `AnimatedContent` / `AnimatedVisibility` / `NavHost`. |
| `enter` | `EnterTransition` | `fadeIn()` | Transition used while the outgoing content's counterpart enters. |
| `exit` | `ExitTransition` | `fadeOut()` | Transition used while this content exits. |
| `boundsTransform` | `BoundsTransform` | `SharedTransitionDefaults.BoundsTransform` | Customizes the `AnimationSpec<Rect>` used to animate bounds. |
| `resizeMode` | `ResizeMode` | `scaleToBounds(ContentScale.FillWidth, Center)` | How the child is resized/relaid-out as the bounds change; see `ResizeMode`. |
| `placeholderSize` | `PlaceholderSize` | `ContentSize` | Placeholder sizing strategy while the element is rendered elsewhere; `AnimatedSize` propagates size to sibling layouts. |
| `renderInOverlayDuringTransition` | `Boolean` | `true` | Whether the element renders in the transition overlay during the transition. |
| `zIndexInOverlay` | `Float` | `0f` | Layering order among elements rendered in the overlay. |
| `clipInOverlayDuringTransition` | `OverlayClip` | `ParentClip` | Clip shape applied while rendered in the overlay. |

## Notes

- `@ExperimentalSharedTransitionApi`.
- Preferred over `sharedElement()` for `Text` (font size / color changes) and for content that differs visually between the two states, since it exposes `enter`/`exit` like `AnimatedContent`.
- `resizeMode = ScaleToBounds()` scales the child's stable layout to fit the bounds instead of relaying out (avoids text reflow); `RemeasureToBounds` re-measures with animated constraints instead, useful for differing aspect ratios.
- Place size-affecting modifiers **before** `sharedBounds()`; other visual modifiers (e.g. `border`) **after** it.
- Package: `androidx.compose.animation`.

## Related

- [Modifier.sharedElement](./sharedelement.md)
- [ResizeMode](./resizemode.md)
- [rememberSharedContentState](./remembersharedcontentstate.md)
- [BoundsTransform](./boundstransform.md)
