# animate*AsState

Family of composable functions that animate a single value from its current value to `targetValue` whenever `targetValue` changes. Internally creates and remembers an `Animatable`, so no manual object management is required.

## Signature / Usage

```kotlin
// androidx.compose.animation.core.AnimateAsState.kt
private val defaultAnimation = spring<Float>()
private const val DefaultFloatVisibilityThreshold = 0.01f
private val dpDefaultSpring = spring<Dp>(visibilityThreshold = Dp.VisibilityThreshold)
private val sizeDefaultSpring = spring(visibilityThreshold = Size.VisibilityThreshold)
private val offsetDefaultSpring = spring(visibilityThreshold = Offset.VisibilityThreshold)
private val rectDefaultSpring = spring(visibilityThreshold = Rect.VisibilityThreshold)
private val intDefaultSpring = spring(visibilityThreshold = Int.VisibilityThreshold)
private val intOffsetDefaultSpring = spring(visibilityThreshold = IntOffset.VisibilityThreshold)
private val intSizeDefaultSpring = spring(visibilityThreshold = IntSize.VisibilityThreshold)

@Composable
public fun animateFloatAsState(
    targetValue: Float,
    animationSpec: AnimationSpec<Float> = defaultAnimation,
    visibilityThreshold: Float = DefaultFloatVisibilityThreshold,
    label: String = "FloatAnimation",
    finishedListener: ((Float) -> Unit)? = null,
): State<Float>

@Composable
public fun animateDpAsState(
    targetValue: Dp,
    animationSpec: AnimationSpec<Dp> = dpDefaultSpring,
    label: String = "DpAnimation",
    finishedListener: ((Dp) -> Unit)? = null,
): State<Dp>

@Composable
public fun animateSizeAsState(
    targetValue: Size,
    animationSpec: AnimationSpec<Size> = sizeDefaultSpring,
    label: String = "SizeAnimation",
    finishedListener: ((Size) -> Unit)? = null,
): State<Size>

@Composable
public fun animateOffsetAsState(
    targetValue: Offset,
    animationSpec: AnimationSpec<Offset> = offsetDefaultSpring,
    label: String = "OffsetAnimation",
    finishedListener: ((Offset) -> Unit)? = null,
): State<Offset>

@Composable
public fun animateRectAsState(
    targetValue: Rect,
    animationSpec: AnimationSpec<Rect> = rectDefaultSpring,
    label: String = "RectAnimation",
    finishedListener: ((Rect) -> Unit)? = null,
): State<Rect>

@Composable
public fun animateIntAsState(
    targetValue: Int,
    animationSpec: AnimationSpec<Int> = intDefaultSpring,
    label: String = "IntAnimation",
    finishedListener: ((Int) -> Unit)? = null,
): State<Int>

@Composable
public fun animateIntOffsetAsState(
    targetValue: IntOffset,
    animationSpec: AnimationSpec<IntOffset> = intOffsetDefaultSpring,
    label: String = "IntOffsetAnimation",
    finishedListener: ((IntOffset) -> Unit)? = null,
): State<IntOffset>

@Composable
public fun animateIntSizeAsState(
    targetValue: IntSize,
    animationSpec: AnimationSpec<IntSize> = intSizeDefaultSpring,
    label: String = "IntSizeAnimation",
    finishedListener: ((IntSize) -> Unit)? = null,
): State<IntSize>

// Generic overload for arbitrary types via a TwoWayConverter.
@Composable
public fun <T, V : AnimationVector> animateValueAsState(
    targetValue: T,
    typeConverter: TwoWayConverter<T, V>,
    animationSpec: AnimationSpec<T> = remember { spring() },
    visibilityThreshold: T? = null,
    label: String = "ValueAnimation",
    finishedListener: ((T) -> Unit)? = null,
): State<T>

// animateColorAsState lives in a separate file:
// androidx.compose.animation.SingleValueAnimation.kt (module: compose.animation:animation)
@Composable
public fun animateColorAsState(
    targetValue: Color,
    animationSpec: AnimationSpec<Color> = colorDefaultSpring,
    label: String = "ColorAnimation",
    finishedListener: ((Color) -> Unit)? = null,
): State<Color>
```

```kotlin
var enabled by remember { mutableStateOf(true) }
val animatedAlpha by animateFloatAsState(
    targetValue = if (enabled) 1f else 0.5f,
    label = "alpha",
)
Box(Modifier.graphicsLayer { alpha = animatedAlpha })
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `targetValue` | `T` (`Float` / `Dp` / `Color` / `Int` / `IntOffset` / `IntSize` / `Size` / `Offset` / `Rect` / generic) | — | Destination value; the API animates from the current value to this value. |
| `animationSpec` | `AnimationSpec<T>` | `spring()`, pre-built per type with the type's `VisibilityThreshold` baked in (e.g. `spring(visibilityThreshold = Dp.VisibilityThreshold)` for `animateDpAsState`) | Customizes duration/easing/physics. |
| `visibilityThreshold` | `Float` (`animateFloatAsState` only) / `T?` (`animateValueAsState` only) | `0.01f` / `null` | Threshold below which the animation is considered visually complete. Only exposed as a separate parameter on `animateFloatAsState` and the generic `animateValueAsState`; the `Dp`/`Size`/`Offset`/`Rect`/`Int`/`IntOffset`/`IntSize`/`Color` overloads instead bake their type's `VisibilityThreshold` into the default `animationSpec` and do not expose this parameter. |
| `label` | `String` | type-specific (e.g. `"FloatAnimation"`, `"DpAnimation"`, `"ColorAnimation"`) | Debug label for tooling. |
| `finishedListener` | `((T) -> Unit)?` | `null` | Called with the final value when the animation completes. |
| `typeConverter` | `TwoWayConverter<T, V>` (generic overload only) | — | Converts `T` to/from an `AnimationVector` for arbitrary types. |

## Notes

- If `targetValue` changes mid-animation, the animation is retargeted, preserving current value and velocity (no restart).
- Prefer `animate*AsState` over `Animatable` unless you need different initial/target values, `snapTo`, or `animateDecay`.
- All overloads except `animateColorAsState` live in `androidx.compose.animation.core.AnimateAsState.kt` (module `compose.animation:animation-core`); `animateColorAsState` lives separately in `androidx.compose.animation.SingleValueAnimation.kt` (module `compose.animation:animation`), reusing `AnimationSpec`/`State` from `animation-core`.

## Related

- [Animatable](./animatable.md)
- [AnimationVector / TwoWayConverter](./animationvector.md)
