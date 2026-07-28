# AnimationVector / TwoWayConverter

`AnimationVector` is the low-level numeric representation (1 to 4 `Float` components) that the animation system interpolates internally. `TwoWayConverter` converts an arbitrary value type `T` to/from its `AnimationVector` representation so the same animation engine (`Animatable`, `animateValueAsState`, `Transition.animateValue`, `InfiniteTransition.animateValue`) can drive it.

## Signature / Usage

```kotlin
// androidx.compose.animation.core.AnimationVectors.kt
sealed class AnimationVector {
    internal abstract fun reset()
    internal abstract fun newVector(): AnimationVector
    internal abstract operator fun get(index: Int): Float
    internal abstract operator fun set(index: Int, value: Float)
    internal abstract val size: Int
}

class AnimationVector1D(initVal: Float) : AnimationVector() {
    var value: Float
}

class AnimationVector2D(v1: Float, v2: Float) : AnimationVector() {
    var v1: Float
    var v2: Float
}

class AnimationVector3D(v1: Float, v2: Float, v3: Float) : AnimationVector() {
    var v1: Float
    var v2: Float
    var v3: Float
}

class AnimationVector4D(v1: Float, v2: Float, v3: Float, v4: Float) : AnimationVector() {
    var v1: Float
    var v2: Float
    var v3: Float
    var v4: Float
}
```

```kotlin
// androidx.compose.animation.core.VectorConverters.kt
interface TwoWayConverter<T, V : AnimationVector> {
    val convertToVector: (T) -> V
    val convertFromVector: (V) -> T
}

fun <T, V : AnimationVector> TwoWayConverter(
    convertToVector: (T) -> V,
    convertFromVector: (V) -> T,
): TwoWayConverter<T, V>

// Predefined converters
val Float.Companion.VectorConverter: TwoWayConverter<Float, AnimationVector1D>
val Int.Companion.VectorConverter: TwoWayConverter<Int, AnimationVector1D>
val Dp.Companion.VectorConverter: TwoWayConverter<Dp, AnimationVector1D>
val DpOffset.Companion.VectorConverter: TwoWayConverter<DpOffset, AnimationVector2D>
val Size.Companion.VectorConverter: TwoWayConverter<Size, AnimationVector2D>
val Offset.Companion.VectorConverter: TwoWayConverter<Offset, AnimationVector2D>
val IntOffset.Companion.VectorConverter: TwoWayConverter<IntOffset, AnimationVector2D>
val IntSize.Companion.VectorConverter: TwoWayConverter<IntSize, AnimationVector2D>
val Rect.Companion.VectorConverter: TwoWayConverter<Rect, AnimationVector4D>
```

```kotlin
val offset = remember { Animatable(Offset(0f, 0f), Offset.VectorConverter) }
LaunchedEffect(target) {
    offset.animateTo(target)
}
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `convertToVector` | `(T) -> V` | Converts a value of type `T` to its `AnimationVector` representation. |
| `convertFromVector` | `(V) -> T` | Converts an `AnimationVector` back into `T`. |

## Notes

- `AnimationVector1D` / `2D` / `3D` / `4D` hold 1 to 4 `Float` components (`value` for 1D, `v1`..`v4` for 2D-4D) respectively; e.g. `Offset` uses `AnimationVector2D`, `Rect` uses `AnimationVector4D`.
- Most built-in types (`Float`, `Int`, `Dp`, `Offset`, `IntOffset`, `Size`, `IntSize`, `Rect`, `Color`, `DpOffset`) already have a `VectorConverter`; supply a custom `TwoWayConverter` only for other types (e.g. a custom data class) used with `Animatable`, `animateValueAsState`, `Transition.animateValue`, or `InfiniteTransition.animateValue`.
- Package: `androidx.compose.animation.core`. Source file names are plural: `AnimationVectors.kt` and `VectorConverters.kt` (module `compose.animation:animation-core`).

## Related

- [Animatable](./animatable.md)
- [animate*AsState](./animateasstate.md)
