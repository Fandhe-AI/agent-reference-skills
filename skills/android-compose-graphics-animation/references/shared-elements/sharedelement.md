# Modifier.sharedElement

Flags a composable whose content is visually identical between two states so it can morph and move seamlessly between them (a "hero" transition), e.g. the same image shown in a list and in a detail screen.

## Signature / Usage

```kotlin
fun Modifier.sharedElement(
    sharedContentState: SharedTransitionScope.SharedContentState,
    animatedVisibilityScope: AnimatedVisibilityScope,
    boundsTransform: BoundsTransform = SharedTransitionDefaults.BoundsTransform,
    placeholderSize: SharedTransitionScope.PlaceholderSize = ContentSize,
    renderInOverlayDuringTransition: Boolean = true,
    zIndexInOverlay: Float = 0f,
    clipInOverlayDuringTransition: SharedTransitionScope.OverlayClip = ParentClip,
): Modifier
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
            .clip(RoundedCornerShape(16.dp)),
        contentScale = ContentScale.Crop
    )
}
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `sharedContentState` | `SharedContentState` | — | Obtained via `rememberSharedContentState(key)`; elements sharing the same key are matched. |
| `animatedVisibilityScope` | `AnimatedVisibilityScope` | — | Coordinates the transition with the enclosing `AnimatedContent` / `AnimatedVisibility` / `NavHost`. |
| `boundsTransform` | `BoundsTransform` | `SharedTransitionDefaults.BoundsTransform` | Customizes the `AnimationSpec<Rect>` used to animate bounds between initial and target position/size. |
| `placeholderSize` | `PlaceholderSize` | `ContentSize` | How the placeholder is sized while its shared element is elsewhere in the overlay; `AnimatedSize` propagates size changes to sibling layouts. |
| `renderInOverlayDuringTransition` | `Boolean` | `true` | Whether the element renders in the transition overlay (above the rest of the UI) during the transition. |
| `zIndexInOverlay` | `Float` | `0f` | Layering order among elements rendered in the overlay. |
| `clipInOverlayDuringTransition` | `OverlayClip` | `ParentClip` | Clip shape applied to the element while it is rendered in the overlay. |

## Notes

- `@ExperimentalSharedTransitionApi`.
- Only the target content is rendered inside the transforming bounds; expects the two matched composables to look the same.
- Does **not** automatically animate `ContentScale` on `Image` (snaps to the end value) or shape changes from `Modifier.clip()`. Use `sharedBounds()` with `animateEnterExit()` for those cases.
- No interoperability with Views: composables that wrap `AndroidView` (`Dialog`, `ModalBottomSheet`, etc.) are not supported.
- Place size-affecting modifiers (`size`, `padding`, etc.) **before** `sharedElement()` in the modifier chain; put `clip()` and other visual modifiers **after** it.
- Keys passed to `rememberSharedContentState` must be unique; prefer a data class over a raw `String`.
- Package: `androidx.compose.animation`.

## Related

- [Modifier.sharedBounds](./sharedbounds.md)
- [rememberSharedContentState](./remembersharedcontentstate.md)
- [BoundsTransform](./boundstransform.md)
- [OverlayClip](./overlayclip.md)
- [SharedTransitionLayout](./sharedtransitionlayout.md)
