# repeatable

Repeats a `DurationBasedAnimationSpec` (e.g. `tween`, `keyframes`) a finite (`repeatable`) or infinite (`infiniteRepeatable`) number of times.

## Signature / Usage

```kotlin
public fun <T> repeatable(
    iterations: Int,
    animation: DurationBasedAnimationSpec<T>,
    repeatMode: RepeatMode = RepeatMode.Restart,
    initialStartOffset: StartOffset = StartOffset(0),
): RepeatableSpec<T>

public fun <T> infiniteRepeatable(
    animation: DurationBasedAnimationSpec<T>,
    repeatMode: RepeatMode = RepeatMode.Restart,
    initialStartOffset: StartOffset = StartOffset(0),
): InfiniteRepeatableSpec<T>
```

```kotlin
val value by animateFloatAsState(
    targetValue = 1f,
    animationSpec = repeatable(
        iterations = 3,
        animation = tween(durationMillis = 300),
        repeatMode = RepeatMode.Reverse,
    ),
    label = "repeatable spec",
)

val infiniteValue by animateFloatAsState(
    targetValue = 1f,
    animationSpec = infiniteRepeatable(
        animation = tween(durationMillis = 300),
        repeatMode = RepeatMode.Reverse,
    ),
    label = "infinite repeatable",
)
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `iterations` | `Int` | — (`repeatable` only) | Total number of iterations, must be >= 1 (an iteration count of 1 plays the animation once, with no repeat). |
| `animation` | `DurationBasedAnimationSpec<T>` | — | The animation to repeat, e.g. `tween(...)` or `keyframes { ... }`. Cannot be `spring`, since spring has no fixed duration. |
| `repeatMode` | `RepeatMode` | `RepeatMode.Restart` | Whether each iteration restarts from the beginning or reverses direction. |
| `initialStartOffset` | `StartOffset` | `StartOffset(0)` | Delays or fast-forwards the start of the first iteration. |

## Notes

- `infiniteRepeatable` never finishes; it implements `AnimationSpec<T>` but not `FiniteAnimationSpec<T>`.
- `infiniteRepeatable` is not executed inside `ComposeTestRule` tests — the composable renders with its initial values instead of animating.
- Package: `androidx.compose.animation.core`.

## Related

- [tween](./tween.md)
- [keyframes](./keyframes.md)
- [RepeatMode](./repeatmode.md)
- [StartOffset](./startoffset.md)
