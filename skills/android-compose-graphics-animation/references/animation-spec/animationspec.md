# AnimationSpec

Base type hierarchy that all animation spec factory functions (`tween`, `spring`, `keyframes`, `repeatable`, `snap`, ...) implement. Most Compose animation APIs (`animate*AsState`, `Animatable.animateTo`, `updateTransition`) accept an `AnimationSpec<T>` to customize duration, easing, and animation type.

## Signature / Usage

```kotlin
public interface AnimationSpec<T> {
    public fun <V : AnimationVector> vectorize(
        converter: TwoWayConverter<T, V>
    ): VectorizedAnimationSpec<V>
}

public interface FiniteAnimationSpec<T> : AnimationSpec<T>

public interface DurationBasedAnimationSpec<T> : FiniteAnimationSpec<T>

public object AnimationConstants {
    public const val DefaultDurationMillis: Int = 300
    public const val UnspecifiedTime: Long = Long.MIN_VALUE
}
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `AnimationSpec<T>` | interface | — | Root type. May represent an infinite animation (e.g. `infiniteRepeatable`). |
| `FiniteAnimationSpec<T>` | interface (extends `AnimationSpec<T>`) | — | Guarantees the animation finishes; implemented by `TweenSpec`, `SpringSpec`, `SnapSpec`, `KeyframesSpec`, `RepeatableSpec`. |
| `DurationBasedAnimationSpec<T>` | interface (extends `FiniteAnimationSpec<T>`) | — | Animations with a known, fixed duration; implemented by `TweenSpec`, `KeyframesSpec`, `KeyframesWithSplineSpec`. Required as the `animation` param of `repeatable` / `infiniteRepeatable`. |
| `AnimationConstants.DefaultDurationMillis` | `Int` | `300` | Default duration used by `tween` when `durationMillis` is not specified. |
| `AnimationConstants.UnspecifiedTime` | `Long` | `Long.MIN_VALUE` | Sentinel for an unspecified animation time. |

## Notes

- Package: `androidx.compose.animation.core`.
- Concrete spec types: `TweenSpec`, `SpringSpec`, `SnapSpec`, `KeyframesSpec`, `KeyframesWithSplineSpec`, `ArcAnimationSpec`, `RepeatableSpec`, `InfiniteRepeatableSpec`.
- `vectorize()` converts the generic `AnimationSpec<T>` into a `VectorizedAnimationSpec<V>` operating on `AnimationVector`; this is an internal implementation detail most call sites do not need to touch directly.

## Related

- [tween](./tween.md)
- [spring](./spring.md)
- [keyframes](./keyframes.md)
- [repeatable](./repeatable.md)
- [snap](./snap.md)
- [TwoWayConverter](./vectorconverter.md)
