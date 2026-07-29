# DecayAnimationSpec

`AnimationSpec` for fling/momentum animations: given only an initial value and initial velocity, the value decelerates naturally to a stop instead of animating toward an authored target. Built with `splineBasedDecay` (matches native Android scroll fling physics) or `exponentialDecay` (velocity decays exponentially, tunable friction). Consumed by `Animatable.animateDecay` and the standalone `DecayAnimation` class.

## Signature / Usage

```kotlin
public interface DecayAnimationSpec<T> {
    public fun <V : AnimationVector> vectorize(
        typeConverter: TwoWayConverter<T, V>
    ): VectorizedDecayAnimationSpec<V>
}

public fun <T> splineBasedDecay(density: Density): DecayAnimationSpec<T>

public fun <T> exponentialDecay(
    frictionMultiplier: Float = 1f,
    absVelocityThreshold: Float = 0.1f,
): DecayAnimationSpec<T>

public fun DecayAnimationSpec<Float>.calculateTargetValue(
    initialValue: Float,
    initialVelocity: Float,
): Float
```

```kotlin
val offsetX = remember { Animatable(0f) }

Modifier.pointerInput(Unit) {
    val decay = splineBasedDecay<Float>(density = this)
    coroutineScope {
        // ... drag logic produces `velocity` from a VelocityTracker ...
        val targetOffsetX = decay.calculateTargetValue(offsetX.value, velocity)
        launch {
            if (targetOffsetX.absoluteValue <= size.width) {
                offsetX.animateTo(targetValue = 0f, initialVelocity = velocity)
            } else {
                offsetX.animateDecay(velocity, decay)
            }
        }
    }
}
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `splineBasedDecay(density)` | fun | — | Decay spec matching Android's native fling spline (`android.widget.Scroller`); the default choice for scroll/swipe fling. Requires a `Density` to convert pixel-based velocity. |
| `exponentialDecay(frictionMultiplier, absVelocityThreshold)` | fun | `1f`, `0.1f` | Decay spec where deceleration is proportional to velocity (pure exponential decay). Higher `frictionMultiplier` stops the animation sooner over a shorter distance. `absVelocityThreshold` is the speed below which the animation is considered finished. |
| `calculateTargetValue(initialValue, initialVelocity)` | fun | — | Extension on `DecayAnimationSpec<Float>` that returns the value where the decay will naturally come to rest, without running the animation. |
| `vectorize(typeConverter)` | fun | — | Converts the generic spec into a `VectorizedDecayAnimationSpec<V>`; an internal step most call sites do not touch directly. |

## Notes

- `Animatable.animateDecay(initialVelocity, animationSpec)` runs a `DecayAnimationSpec<T>` directly on an `Animatable`; the lower-level `DecayAnimation` class (see `TargetBasedAnimation / DecayAnimation` in animation-apis) wraps the same spec for manual, externally-clocked playback.
- `DecayAnimationSpec<T>` is a distinct hierarchy from `AnimationSpec<T>` (tween/spring/keyframes/repeatable/snap) — it has no notion of a `targetValue` supplied by the caller; the target is derived from the decay physics and the initial velocity instead.
- Package: `androidx.compose.animation.core` (`DecayAnimationSpec`, `exponentialDecay`); `splineBasedDecay` lives in `androidx.compose.animation`.

## Related

- [AnimationSpec](./animationspec.md)
- [spring](./spring.md)
- [TargetBasedAnimation / DecayAnimation](../animation-apis/targetbasedanimation-decayanimation.md)
