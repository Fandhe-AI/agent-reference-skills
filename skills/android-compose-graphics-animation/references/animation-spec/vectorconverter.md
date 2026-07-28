# TwoWayConverter

Converts a custom data type `T` to and from an `AnimationVector` (`AnimationVector1D`/`2D`/`3D`/`4D`), which is the type Compose's animation engine actually interpolates. Required to animate any type that doesn't already have a built-in `VectorConverter`.

## Signature / Usage

```kotlin
public interface TwoWayConverter<T, V : AnimationVector> {
    public val convertToVector: (T) -> V
    public val convertFromVector: (V) -> T
}
```

```kotlin
data class MySize(val width: Dp, val height: Dp)

val animSize: MySize by animateValueAsState(
    targetSize,
    TwoWayConverter(
        convertToVector = { size: MySize ->
            AnimationVector2D(size.width.value, size.height.value)
        },
        convertFromVector = { vector: AnimationVector2D ->
            MySize(vector.v1.dp, vector.v2.dp)
        },
    ),
    label = "size",
)
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `convertToVector` | `(T) -> V` | Converts a value of the animated type into an `AnimationVector`. |
| `convertFromVector` | `(V) -> T` | Converts an `AnimationVector` back into the animated type. |

## Notes

- Built-in `VectorConverter` properties (package `androidx.compose.animation.core`): `Float.Companion.VectorConverter` (`AnimationVector1D`), `Int.Companion.VectorConverter` (`AnimationVector1D`), `Dp.Companion.VectorConverter` (`AnimationVector1D`), `DpOffset.Companion.VectorConverter` (`AnimationVector2D`), `Size.Companion.VectorConverter` (`AnimationVector2D`), `Offset.Companion.VectorConverter` (`AnimationVector2D`), `IntOffset.Companion.VectorConverter` (`AnimationVector2D`), `IntSize.Companion.VectorConverter` (`AnimationVector2D`), `Rect.Companion.VectorConverter` (`AnimationVector4D`).
- `Color.VectorConverter` is defined separately in `androidx.compose.animation` (not `animation-core`), since `Color` lives in the `ui-graphics` module.
- `AnimationVector1D`/`2D`/`3D`/`4D` expose their raw components as `v1`, `v2`, `v3`, `v4` (`Float`).
- Package: `androidx.compose.animation.core`.

## Related

- [AnimationSpec](./animationspec.md)
