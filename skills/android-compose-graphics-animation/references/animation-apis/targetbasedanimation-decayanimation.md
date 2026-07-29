# TargetBasedAnimation / DecayAnimation

Stateless, low-level `Animation` implementations that compute an animated value at an arbitrary play time you supply yourself. They sit beneath `Animatable` in the animation hierarchy (`Transition` → `animate*AsState` → `Animatable` → `TargetBasedAnimation`/`DecayAnimation`) and are used when an app needs manual control over playback time instead of a coroutine driving it.

## Signature / Usage

```kotlin
class TargetBasedAnimation<T, V : AnimationVector>(
    animationSpec: AnimationSpec<T>,
    typeConverter: TwoWayConverter<T, V>,
    initialValue: T,
    targetValue: T,
    initialVelocityVector: V? = null,
) : Animation<T, V> {
    val durationNanos: Long
    fun getValueFromNanos(playTimeNanos: Long): T
    fun getVelocityVectorFromNanos(playTimeNanos: Long): V
    fun isFinishedFromNanos(playTimeNanos: Long): Boolean
}

class DecayAnimation<T, V : AnimationVector>(
    animationSpec: DecayAnimationSpec<T>,
    typeConverter: TwoWayConverter<T, V>,
    initialValue: T,
    initialVelocityVector: V,
) : Animation<T, V> {
    val durationNanos: Long
    val targetValue: T
    fun getValueFromNanos(playTimeNanos: Long): T
}

// Convenience top-level function for Float, taking a FloatDecayAnimationSpec directly.
fun DecayAnimation(
    animationSpec: FloatDecayAnimationSpec,
    initialValue: Float,
    initialVelocity: Float = 0f,
): DecayAnimation<Float, AnimationVector1D>
```

```kotlin
val anim = remember {
    TargetBasedAnimation(
        animationSpec = tween(200),
        typeConverter = Float.VectorConverter,
        initialValue = 200f,
        targetValue = 1000f,
    )
}
var playTime by remember { mutableLongStateOf(0L) }

LaunchedEffect(anim) {
    val startTime = withFrameNanos { it }
    do {
        playTime = withFrameNanos { it } - startTime
        val animationValue = anim.getValueFromNanos(playTime)
    } while (!anim.isFinishedFromNanos(playTime))
}
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `animationSpec` | `AnimationSpec<T>` (Target) / `DecayAnimationSpec<T>` (Decay) | — | Physics/duration spec to resolve into concrete timing; for decay, typically `splineBasedDecay` or `exponentialDecay`. |
| `typeConverter` | `TwoWayConverter<T, V>` | — | Converts `T` to/from an `AnimationVector`, same converter type used by `Animatable`. |
| `initialValue` | `T` | — | Starting value. |
| `targetValue` | `T` | — | (`TargetBasedAnimation` only) End value to animate toward. |
| `initialVelocityVector` | `V?` (Target, default `null`) / `V` (Decay, required) | `null` / — | Starting velocity; `DecayAnimation` requires it (no default) to compute its resolved `targetValue`. |
| `durationNanos` | `Long` | — | Total animation duration once resolved; for `DecayAnimation` this is derived from the decay physics, not authored. |
| `getValueFromNanos(playTimeNanos)` | fun | — | Returns the value at an arbitrary play time; the caller supplies play time from a frame clock (`withFrameNanos`). |
| `isFinishedFromNanos(playTimeNanos)` | fun | — | (`TargetBasedAnimation`) Whether the animation has completed by the given play time. |
| `targetValue` | `T` | — | (`DecayAnimation` only) End value computed from the decay spec and initial velocity, not supplied by the caller. |

## Notes

- Both classes are stateless: they hold no internal clock and do not track "current time" themselves — the caller drives them by repeatedly calling `getValueFromNanos` with an externally-tracked play time (e.g. accumulated via `withFrameNanos`).
- `Animatable.animateTo` / `animateDecay` are built on top of `TargetBasedAnimation` / `DecayAnimation` respectively; most apps should reach for `Animatable` or `animate*AsState` first and only drop to this layer for custom timing control (e.g. synchronizing an animation value to an external clock or scrubber).
- Package: `androidx.compose.animation.core`.

## Related

- [Animatable](./animatable.md)
- [AnimationVector / TwoWayConverter](./animationvector.md)
- [DecayAnimationSpec](../animation-spec/decayanimationspec.md)
