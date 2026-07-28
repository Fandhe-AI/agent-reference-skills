# Modifier.sharedElementWithCallerManagedVisibility

Shares an element's bounds/appearance between two composables whose visibility is toggled manually by the caller, instead of being driven by `AnimatedVisibility` or `AnimatedContent`.

## Signature / Usage

```kotlin
fun Modifier.sharedElementWithCallerManagedVisibility(
    sharedContentState: SharedTransitionScope.SharedContentState,
    visible: Boolean,
    boundsTransform: BoundsTransform = SharedTransitionDefaults.BoundsTransform,
    placeholderSize: SharedTransitionScope.PlaceholderSize = ContentSize,
    renderInOverlayDuringTransition: Boolean = true,
    zIndexInOverlay: Float = 0f,
    clipInOverlayDuringTransition: SharedTransitionScope.OverlayClip = ParentClip,
): Modifier
```

```kotlin
var selectFirst by remember { mutableStateOf(true) }
val key = remember { Any() }

SharedTransitionLayout(Modifier.fillMaxSize()) {
    Box(
        Modifier
            .sharedElementWithCallerManagedVisibility(
                rememberSharedContentState(key = key),
                !selectFirst
            )
            .background(Color.Red)
            .size(100.dp)
    ) {
        Text(if (!selectFirst) "false" else "true")
    }

    Box(
        Modifier
            .offset(180.dp, 180.dp)
            .sharedElementWithCallerManagedVisibility(
                rememberSharedContentState(key = key),
                selectFirst
            )
            .background(Color.Blue)
            .size(180.dp)
    ) {
        Text(if (selectFirst) "false" else "true")
    }
}
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `sharedContentState` | `SharedContentState` | — | Obtained via `rememberSharedContentState(key)`. |
| `visible` | `Boolean` | — | Caller-controlled visibility flag; replaces the role normally played by `AnimatedVisibilityScope`. |
| `boundsTransform` | `BoundsTransform` | `SharedTransitionDefaults.BoundsTransform` | Customizes the bounds animation spec. |
| `placeholderSize` | `PlaceholderSize` | `ContentSize` | Placeholder sizing strategy. |
| `renderInOverlayDuringTransition` | `Boolean` | `true` | Whether the element renders in the overlay during the transition. |
| `zIndexInOverlay` | `Float` | `0f` | Layering order among overlay content. |
| `clipInOverlayDuringTransition` | `OverlayClip` | `ParentClip` | Clip shape applied while rendered in the overlay. |

## Notes

- `@ExperimentalSharedTransitionApi`.
- The element remains in the composition tree even when `visible == false`. Remove it from the tree once the transition completes by observing `SharedTransitionScope.isTransitionActive`, to avoid keeping invisible content alive indefinitely.
- Prefer `sharedElement()` / `sharedBounds()` with `AnimatedVisibilityScope` when visibility is already driven by `AnimatedContent`/`AnimatedVisibility`/`NavHost`; use this API only when visibility must be managed outside those APIs.
- Package: `androidx.compose.animation` (member of `SharedTransitionScope`).

## Related

- [Modifier.sharedElement](./sharedelement.md)
- [rememberSharedContentState](./remembersharedcontentstate.md)
- [SharedTransitionScope](./sharedtransitionscope.md)
