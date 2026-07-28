# keyframes

Duration-based `AnimationSpec` that snapshots specific values at specific timestamps, interpolating between them. `keyframesWithSpline` is a variant for 2D-like values (e.g. `Offset`) that produces a smooth curve through the keyframe values using a monotone cubic Hermite spline instead of linear/eased segments.

## Signature / Usage

```kotlin
public fun <T> keyframes(
    init: KeyframesSpec.KeyframesSpecConfig<T>.() -> Unit
): KeyframesSpec<T>

public fun <T> keyframesWithSpline(
    init: KeyframesWithSplineSpec.KeyframesWithSplineSpecConfig<T>.() -> Unit
): KeyframesWithSplineSpec<T>

public fun <T> keyframesWithSpline(
    @FloatRange(0.0, 1.0) periodicBias: Float,
    init: KeyframesWithSplineSpec.KeyframesWithSplineSpecConfig<T>.() -> Unit,
): KeyframesWithSplineSpec<T>
```

```kotlin
val value by animateFloatAsState(
    targetValue = 1f,
    animationSpec = keyframes {
        durationMillis = 375
        0.0f at 0 using LinearOutSlowInEasing
        0.2f at 15 using FastOutLinearInEasing
        0.4f at 75
        0.4f at 225
    },
    label = "keyframe",
)

val offset by animateOffsetAsState(
    targetValue = Offset(300f, 300f),
    animationSpec = keyframesWithSpline {
        durationMillis = 6000
        Offset(0f, 0f) at 0
        Offset(150f, 200f) atFraction 0.5f
        Offset(0f, 100f) atFraction 0.7f
    },
)
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `init` | `KeyframesSpecConfig<T>.() -> Unit` / `KeyframesWithSplineSpecConfig<T>.() -> Unit` | — | Config lambda used to set `durationMillis`, `delayMillis`, and each keyframe (`value at timeMillis`, `value atFraction fraction`). |
| `periodicBias` (overload) | `Float` (`@FloatRange(0.0, 1.0)`) | — | For `keyframesWithSpline` only: blends the curve at the loop point when the animation is meant to repeat seamlessly. |
| `using` (config DSL) | `Easing` | — | Applies an easing curve to the segment leading into a keyframe (`keyframes` only, not available on the spline variant). |

## Notes

- Both return a `DurationBasedAnimationSpec<T>` and can be used as the `animation` param of `repeatable` / `infiniteRepeatable`.
- `keyframesWithSpline` only makes sense for 2D-like types (e.g. `Offset`, `IntOffset`); it interpolates the whole curve rather than each dimension independently, which avoids the "square corner" look linear/tween interpolation can produce for movement.
- Package: `androidx.compose.animation.core`.

## Related

- [AnimationSpec](./animationspec.md)
- [Easing](./easing.md)
- [repeatable](./repeatable.md)
