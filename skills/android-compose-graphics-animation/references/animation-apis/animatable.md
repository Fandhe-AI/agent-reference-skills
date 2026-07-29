# Animatable

Coroutine-based, low-level API for animating a single value with fine-grained control: different initial/target values, `snapTo`, and decay (fling) animations.

## Signature / Usage

```kotlin
class Animatable<T, V : AnimationVector>(
    initialValue: T,
    typeConverter: TwoWayConverter<T, V>,
    visibilityThreshold: T? = null,
    label: String = "Animatable",
) {
    val value: T
    val velocity: T
    var isRunning: Boolean
    var targetValue: T
    var lowerBound: T?
    var upperBound: T?

    fun updateBounds(lowerBound: T? = this.lowerBound, upperBound: T? = this.upperBound)

    suspend fun animateTo(
        targetValue: T,
        animationSpec: AnimationSpec<T> = spring(),
        initialVelocity: T = velocity,
        block: (Animatable<T, V>.() -> Unit)? = null,
    ): AnimationResult<T, V>

    suspend fun animateDecay(
        initialVelocity: T,
        animationSpec: DecayAnimationSpec<T>,
        block: (Animatable<T, V>.() -> Unit)? = null,
    ): AnimationResult<T, V>

    suspend fun snapTo(targetValue: T)
    suspend fun stop()
}

// Convenience constructor for Float (and Color via a separate overload).
fun Animatable(
    initialValue: Float,
    visibilityThreshold: Float = Spring.DefaultDisplacementThreshold,
): Animatable<Float, AnimationVector1D>
```

```kotlin
val color = remember { Animatable(Color.Gray) }
LaunchedEffect(ok) {
    color.animateTo(if (ok) Color.Green else Color.Red)
}
Box(Modifier.background(color.value))
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `initialValue` | `T` | — | Starting value before any animation runs. |
| `typeConverter` | `TwoWayConverter<T, V>` | — | Converts `T` to/from an `AnimationVector`; not needed for the `Float`/`Color` convenience constructors. |
| `visibilityThreshold` | `T?` | `null` | Threshold below which the animation snaps to target. |
| `label` | `String` | `"Animatable"` | Debug label for tooling. |
| `animateTo(targetValue, animationSpec, initialVelocity, block)` | suspend fun | — | Animates to `targetValue`; interrupts any in-flight animation while preserving velocity. |
| `snapTo(targetValue)` | suspend fun | — | Sets `value` immediately without animating. |
| `animateDecay(initialVelocity, animationSpec)` | suspend fun | — | Animates using a `DecayAnimationSpec` (e.g. `splineBasedDecay`), useful for fling gestures. |
| `stop()` | suspend fun | — | Stops any ongoing animation immediately. |
| `updateBounds(lowerBound, upperBound)` | fun | — | Clamps subsequent animated values within bounds. |

## Notes

- Must be called from a coroutine (e.g. inside `LaunchedEffect` or a gesture handler's `coroutineScope`), unlike `animate*AsState`.
- Use over `animate*AsState` when initial and target values differ, or when `snapTo` / `animateDecay` / `stop` are needed (e.g. drag-and-release/fling patterns).
- Package: `androidx.compose.animation.core`.

## Related

- [animate*AsState](./animateasstate.md)
- [AnimationVector / TwoWayConverter](./animationvector.md)
- [DecayAnimationSpec](../animation-spec/decayanimationspec.md)
