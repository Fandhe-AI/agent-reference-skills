# spring

Physics-based `AnimationSpec` driven by damping ratio and stiffness. Produces smooth, interruptible animations by maintaining velocity continuity when the target value changes mid-animation.

## Signature / Usage

```kotlin
public fun <T> spring(
    dampingRatio: Float = Spring.DampingRatioNoBouncy,
    stiffness: Float = Spring.StiffnessMedium,
    visibilityThreshold: T? = null,
): SpringSpec<T>
```

```kotlin
val value by animateFloatAsState(
    targetValue = 1f,
    animationSpec = spring(
        dampingRatio = Spring.DampingRatioHighBouncy,
        stiffness = Spring.StiffnessMedium,
    ),
    label = "spring spec",
)
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `dampingRatio` | `Float` | `Spring.DampingRatioNoBouncy` | Bounciness of the spring; higher values are less bouncy (e.g. `Spring.DampingRatioHighBouncy`). |
| `stiffness` | `Float` | `Spring.StiffnessMedium` | Stiffness of the spring; higher values move to the end value faster. |
| `visibilityThreshold` | `T?` | `null` | Threshold below which the animation is considered close enough to the target to stop. |

## Notes

- This is the Jetpack Compose (Kotlin, `androidx.compose.animation.core`) API — distinct from the same-named SwiftUI / Motion / Theatre.js / Ark UI / Chakra UI API.
- Returns a `SpringSpec<T>`, a `FiniteAnimationSpec<T>` but not a `DurationBasedAnimationSpec<T>` (spring animations do not have a fixed duration), so it cannot be passed to `repeatable` / `infiniteRepeatable`.
- Package: `androidx.compose.animation.core`.

## Related

- [AnimationSpec](./animationspec.md)
- [tween](./tween.md)
