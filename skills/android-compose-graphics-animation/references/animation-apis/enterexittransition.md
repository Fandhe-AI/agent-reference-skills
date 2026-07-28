# EnterTransition / ExitTransition

Composable building blocks used by `AnimatedVisibility` and `AnimatedContent` to describe how content appears (`EnterTransition`) or disappears (`ExitTransition`). Combine multiple with `+`.

## Signature / Usage

```kotlin
fun fadeIn(
    animationSpec: FiniteAnimationSpec<Float> = spring(stiffness = Spring.StiffnessMediumLow),
    initialAlpha: Float = 0f,
): EnterTransition

fun fadeOut(
    animationSpec: FiniteAnimationSpec<Float> = spring(stiffness = Spring.StiffnessMediumLow),
    targetAlpha: Float = 0f,
): ExitTransition

fun slideInHorizontally(
    animationSpec: FiniteAnimationSpec<IntOffset> = spring(stiffness = Spring.StiffnessMediumLow, visibilityThreshold = IntOffset.VisibilityThreshold),
    initialOffsetX: (fullWidth: Int) -> Int = { -it / 2 },
): EnterTransition

fun slideInVertically(
    animationSpec: FiniteAnimationSpec<IntOffset> = spring(stiffness = Spring.StiffnessMediumLow, visibilityThreshold = IntOffset.VisibilityThreshold),
    initialOffsetY: (fullHeight: Int) -> Int = { -it / 2 },
): EnterTransition

fun scaleIn(
    animationSpec: FiniteAnimationSpec<Float> = spring(stiffness = Spring.StiffnessMediumLow, visibilityThreshold = 0.01f),
    initialScale: Float = 0f,
    transformOrigin: TransformOrigin = TransformOrigin.Center,
): EnterTransition

fun expandIn(
    animationSpec: FiniteAnimationSpec<IntSize> = spring(stiffness = Spring.StiffnessMediumLow, visibilityThreshold = IntSize.VisibilityThreshold),
    expandFrom: Alignment = Alignment.BottomEnd,
    clip: Boolean = true,
    initialSize: (fullSize: IntSize) -> IntSize = { IntSize(0, 0) },
): EnterTransition

fun expandVertically(
    animationSpec: FiniteAnimationSpec<IntSize> = spring(stiffness = Spring.StiffnessMediumLow, visibilityThreshold = IntSize.VisibilityThreshold),
    expandFrom: Alignment.Vertical = Alignment.Bottom,
    clip: Boolean = true,
    initialHeight: (fullHeight: Int) -> Int = { 0 },
): EnterTransition

// slideOut / slideOutHorizontally / slideOutVertically / scaleOut / shrinkOut /
// shrinkHorizontally / shrinkVertically / expandHorizontally are the ExitTransition
// (or EnterTransition, for expandHorizontally) counterparts with matching parameter shapes.

sealed class EnterTransition {
    operator fun plus(enter: EnterTransition): EnterTransition
    companion object { val None: EnterTransition }
}

sealed class ExitTransition {
    operator fun plus(exit: ExitTransition): ExitTransition
    companion object { val None: ExitTransition }
}
```

```kotlin
AnimatedVisibility(
    visible = visible,
    enter = slideInVertically { -40 } + expandVertically(expandFrom = Alignment.Top) + fadeIn(initialAlpha = 0.3f),
    exit = slideOutVertically() + shrinkVertically() + fadeOut(),
) {
    Text("Hello")
}
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `animationSpec` | `FiniteAnimationSpec<Float \| IntOffset \| IntSize>` | `spring(stiffness = Spring.StiffnessMediumLow, ...)` | Spec controlling the property's animation. |
| `initialAlpha` / `targetAlpha` | `Float` | `0f` | Starting/ending opacity for `fadeIn` / `fadeOut`. |
| `initialOffsetX` / `initialOffsetY` / `targetOffsetX` / `targetOffsetY` | `(Int) -> Int` | `{ -it / 2 }` | Computes the slide offset from the full width/height. |
| `expandFrom` / `shrinkTowards` | `Alignment` / `Alignment.Horizontal` / `Alignment.Vertical` | `Alignment.BottomEnd` / `Alignment.End` / `Alignment.Bottom` | Anchor point content expands from or shrinks towards. |
| `clip` | `Boolean` | `true` | Whether to clip content to the animated bounds. |
| `initialScale` / `targetScale` | `Float` | `0f` | Starting/ending scale for `scaleIn` / `scaleOut`. |
| `transformOrigin` | `TransformOrigin` | `TransformOrigin.Center` | Pivot point for the scale animation. |

## Notes

- `+` combines multiple `EnterTransition`s (or `ExitTransition`s) so they all run together.
- `slideIntoContainer` / `slideOutOfContainer` are container-size-aware variants available only inside `AnimatedContentTransitionScope` — see [AnimatedContent](./animatedcontent.md).
- Package: `androidx.compose.animation`.

## Related

- [AnimatedVisibility](./animatedvisibility.md)
- [AnimatedContent](./animatedcontent.md)
