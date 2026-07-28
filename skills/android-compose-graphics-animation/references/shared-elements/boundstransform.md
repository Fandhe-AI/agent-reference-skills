# BoundsTransform

Customizes the `AnimationSpec<Rect>` used to animate a shared element's/bounds' position and size between its initial and target `Rect`.

## Signature / Usage

```kotlin
fun interface BoundsTransform {
    fun createAnimationSpec(initialBounds: Rect, targetBounds: Rect): FiniteAnimationSpec<Rect>
}

object SharedTransitionDefaults {
    val BoundsTransform: BoundsTransform
}
```

```kotlin
val textBoundsTransform = BoundsTransform { initialBounds, targetBounds ->
    keyframes {
        durationMillis = boundsAnimationDurationMillis
        initialBounds at 0 using ArcMode.ArcBelow using FastOutSlowInEasing
        targetBounds at boundsAnimationDurationMillis
    }
}

Text(
    "Cupcake", fontSize = 28.sp,
    modifier = Modifier.sharedBounds(
        rememberSharedContentState(key = "title"),
        animatedVisibilityScope = animatedVisibilityScope,
        boundsTransform = textBoundsTransform
    )
)
```

## Notes

- `@ExperimentalSharedTransitionApi`.
- Passed to `Modifier.sharedElement()`, `Modifier.sharedBounds()`, and `Modifier.sharedElementWithCallerManagedVisibility()` via the `boundsTransform` parameter.
- Any `FiniteAnimationSpec<Rect>` can be returned, including `tween`, `spring`, or `keyframes` for arc-motion style paths.
- Default is `SharedTransitionDefaults.BoundsTransform`.
- Package: `androidx.compose.animation`.

## Related

- [Modifier.sharedElement](./sharedelement.md)
- [Modifier.sharedBounds](./sharedbounds.md)
- [AnimationSpec](../animation-spec/animationspec.md)
- [keyframes](../animation-spec/keyframes.md)
