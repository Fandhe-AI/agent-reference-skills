# Easing

`fun interface` that maps an animation's elapsed fraction (0.0 to 1.0) to an adjusted fraction, used by `tween` and by individual `keyframes` segments to control acceleration/deceleration.

## Signature / Usage

```kotlin
@Stable
public fun interface Easing {
    public fun transform(fraction: Float): Float
}

public class CubicBezierEasing(
    private val a: Float,
    private val b: Float,
    private val c: Float,
    private val d: Float,
) : Easing
```

```kotlin
val CustomEasing = Easing { fraction -> fraction * fraction }

tween(durationMillis = 300, easing = CustomEasing)
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `fraction` | `Float` | — | Elapsed fraction of the animation, from 0.0 to 1.0. |
| `CubicBezierEasing(a, b, c, d)` | `Float, Float, Float, Float` | — | Control point coordinates of a cubic Bezier curve. Throws `IllegalArgumentException` if the curve is not solvable for a given fraction. |

## Notes

- Built-in easings (all `CubicBezierEasing` instances except `LinearEasing`):
  - `FastOutSlowInEasing = CubicBezierEasing(0.4f, 0.0f, 0.2f, 1.0f)` — standard easing for elements that begin and end at rest; speeds up quickly, slows down gradually. Default for `tween`.
  - `LinearOutSlowInEasing = CubicBezierEasing(0.0f, 0.0f, 0.2f, 1.0f)` — for incoming elements that decelerate into place.
  - `FastOutLinearInEasing = CubicBezierEasing(0.4f, 0.0f, 1.0f, 1.0f)` — for exiting elements that accelerate off-screen.
  - `LinearEasing = Easing { fraction -> fraction }` — no easing, constant rate.
- Package: `androidx.compose.animation.core`.

## Related

- [tween](./tween.md)
- [keyframes](./keyframes.md)
