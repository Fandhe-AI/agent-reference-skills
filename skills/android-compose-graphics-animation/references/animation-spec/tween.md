# tween

Duration-based `AnimationSpec` that interpolates between the start and end value over a fixed duration, applying an `Easing` curve to the fraction.

## Signature / Usage

```kotlin
public fun <T> tween(
    durationMillis: Int = AnimationConstants.DefaultDurationMillis,
    delayMillis: Int = 0,
    easing: Easing = FastOutSlowInEasing,
): TweenSpec<T>
```

```kotlin
val value by animateFloatAsState(
    targetValue = 1f,
    animationSpec = tween(
        durationMillis = 300,
        delayMillis = 50,
        easing = LinearOutSlowInEasing,
    ),
    label = "tween delay",
)
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `durationMillis` | `Int` | `AnimationConstants.DefaultDurationMillis` (`300`) | Duration of the animation. |
| `delayMillis` | `Int` | `0` | Time to wait before the animation starts. |
| `easing` | `Easing` | `FastOutSlowInEasing` | Curve applied to the animation fraction (0 to 1) each frame. |

## Notes

- Returns a `TweenSpec<T>`, which implements `DurationBasedAnimationSpec<T>` and can be passed as the `animation` param of `repeatable` / `infiniteRepeatable`.
- Package: `androidx.compose.animation.core`.

## Related

- [Easing](./easing.md)
- [AnimationSpec](./animationspec.md)
- [repeatable](./repeatable.md)
