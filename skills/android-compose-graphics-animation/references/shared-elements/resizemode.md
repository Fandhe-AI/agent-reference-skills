# ResizeMode / ScaleToBounds

Controls how the child of a `Modifier.sharedBounds()` element is resized as its bounds animate between the initial and target rectangles.

## Signature / Usage

```kotlin
sealed interface ResizeMode {
    companion object {
        val RemeasureToBounds: ResizeMode
        fun scaleToBounds(
            contentScale: ContentScale = ContentScale.FillWidth,
            alignment: Alignment = Alignment.Center,
        ): ResizeMode
    }
}
```

```kotlin
Text(
    "Cupcake",
    fontSize = 28.sp,
    modifier = Modifier
        .wrapContentWidth()
        .sharedBounds(
            rememberSharedContentState(key = "title"),
            animatedVisibilityScope = animatedVisibilityScope,
            resizeMode = SharedTransitionScope.ResizeMode.scaleToBounds()
        )
)
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `contentScale` | `ContentScale` | `ContentScale.FillWidth` | (`scaleToBounds` only) How the stable-size layout is scaled to fit the animated bounds. |
| `alignment` | `Alignment` | `Alignment.Center` | (`scaleToBounds` only) Alignment of the scaled content within the bounds. |

## Notes

- `@ExperimentalSharedTransitionApi`.
- `scaleToBounds()` (the default for `sharedBounds()`) measures the child once with the target constraints, then visually scales that stable layout to fit the animated bounds — no relayout occurs during the transform, which avoids text reflow. Recommended for `Text`.
- `RemeasureToBounds` re-measures and re-lays-out the child on every frame using animated fixed constraints derived from the target size. Recommended when content has differing aspect ratios and fluid continuity is desired.
- If `Modifier.requiredSize()` is applied after the shared element modifier, no relayout occurs even with `ScaleToBounds`.
- Package: `androidx.compose.animation` (nested in `SharedTransitionScope.ResizeMode`).

## Related

- [Modifier.sharedBounds](./sharedbounds.md)
- [rememberSharedContentState](./remembersharedcontentstate.md)
