# snap

`AnimationSpec` that immediately switches to the end value without interpolating, optionally after a delay.

## Signature / Usage

```kotlin
public fun <T> snap(delayMillis: Int = 0): SnapSpec<T>
```

```kotlin
val value by animateFloatAsState(
    targetValue = 1f,
    animationSpec = snap(delayMillis = 50),
    label = "snap spec",
)
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `delayMillis` | `Int` | `0` | Time to wait before snapping to the end value. |

## Notes

- Returns a `SnapSpec<T>`, a `DurationBasedAnimationSpec<T>` with an effective duration of `delayMillis` (no interpolation happens).
- Package: `androidx.compose.animation.core`.

## Related

- [AnimationSpec](./animationspec.md)
- [tween](./tween.md)
