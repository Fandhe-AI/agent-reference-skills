# rememberInfiniteTransition / InfiniteTransition

`InfiniteTransition` holds one or more child animations that start immediately and repeat continuously (via `infiniteRepeatable`/`repeatable` specs) until the transition leaves composition.

## Signature / Usage

```kotlin
@Composable
fun rememberInfiniteTransition(label: String = "InfiniteTransition"): InfiniteTransition

@Composable
fun InfiniteTransition.animateFloat(
    initialValue: Float,
    targetValue: Float,
    animationSpec: InfiniteRepeatableSpec<Float>,
    label: String = "FloatAnimation",
): State<Float>

@Composable
fun <T, V : AnimationVector> InfiniteTransition.animateValue(
    initialValue: T,
    targetValue: T,
    typeConverter: TwoWayConverter<T, V>,
    animationSpec: InfiniteRepeatableSpec<T>,
    label: String = "ValueAnimation",
): State<T>

// androidx.compose.animation.Transition.kt (module compose.animation:animation —
// same file that also defines Transition<S>.animateColor)
@Composable
fun InfiniteTransition.animateColor(
    initialValue: Color,
    targetValue: Color,
    animationSpec: InfiniteRepeatableSpec<Color>,
    label: String = "ColorAnimation",
): State<Color>
```

```kotlin
val infiniteTransition = rememberInfiniteTransition(label = "infinite")
val color by infiniteTransition.animateColor(
    initialValue = Color.Green,
    targetValue = Color.Blue,
    animationSpec = infiniteRepeatable(
        animation = tween(1000, easing = LinearEasing),
        repeatMode = RepeatMode.Reverse,
    ),
    label = "color",
)
Box(Modifier.background(color))
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `initialValue` | `T` | — | Starting value of the child animation. |
| `targetValue` | `T` | — | Value the child animation animates to before repeating. |
| `typeConverter` | `TwoWayConverter<T, V>` (`animateValue` only) | — | Converts arbitrary `T` to/from `AnimationVector`. `animateFloat` / `animateColor` have built-in converters. |
| `animationSpec` | `InfiniteRepeatableSpec<T>` | — | Must be `infiniteRepeatable` (or `repeatable`); required, no default. |
| `label` | `String` | type-specific | Debug label for tooling. |

## Notes

- Unlike `Transition`, `InfiniteTransition` animations start immediately on entering composition and have no `currentState` / `targetState` — they are not driven by a state change.
- `animateFloat` / `animateValue` live in `androidx.compose.animation.core`; `animateColor` specifically lives in `androidx.compose.animation` (module `compose.animation:animation`) — the same package split seen for `animateColorAsState` and `Transition<S>.animateColor`.

## Related

- [Transition](./transition.md)
- [animate*AsState](./animateasstate.md)
