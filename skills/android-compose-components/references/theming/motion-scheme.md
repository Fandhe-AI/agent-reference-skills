# MotionScheme

Provides the `FiniteAnimationSpec`s (spatial and effects, each in default/fast/slow variants) used by `MaterialTheme` components for a cohesive motion feel. Set via `MaterialTheme(motionScheme = ...)` and read via `MaterialTheme.motionScheme`.

## Signature / Usage

```kotlin
@Immutable
interface MotionScheme {
    fun <T> defaultSpatialSpec(): FiniteAnimationSpec<T>
    fun <T> fastSpatialSpec(): FiniteAnimationSpec<T>
    fun <T> slowSpatialSpec(): FiniteAnimationSpec<T>
    fun <T> defaultEffectsSpec(): FiniteAnimationSpec<T>
    fun <T> fastEffectsSpec(): FiniteAnimationSpec<T>
    fun <T> slowEffectsSpec(): FiniteAnimationSpec<T>

    companion object {
        fun standard(): MotionScheme
        fun expressive(): MotionScheme
    }
}
```

```kotlin
MaterialTheme(motionScheme = MotionScheme.expressive()) {
    // components animate with the expressive motion feel
}

val spec = MaterialTheme.motionScheme.defaultSpatialSpec<Dp>()
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `defaultSpatialSpec` / `fastSpatialSpec` / `slowSpatialSpec` | `FiniteAnimationSpec<T>` | motion-scheme dependent | Applied to animations that change a component's shape or bounds, at default/fast/slow pacing. |
| `defaultEffectsSpec` / `fastEffectsSpec` / `slowEffectsSpec` | `FiniteAnimationSpec<T>` | motion-scheme dependent | Applied to animations preserving shape/bounds (e.g. color changes), at default/fast/slow pacing. |

## Notes

- `standard()` and `expressive()` are factory functions on `MotionScheme.Companion`, called as `MotionScheme.standard()` / `MotionScheme.expressive()`.
- `standard()` is Material's basic motion scheme for utilitarian UI and recurring interactions; produces a linear motion feel.
- `expressive()` is Material's recommended scheme for prominent UI elements and hero interactions; produces a more visually engaging feel.
- `MaterialTheme.motionScheme` defaults to `standard()` at the root. Neither `MotionScheme` nor its factory functions carry an experimental annotation.
- Package: `androidx.compose.material3`.

## Related

- [MaterialTheme](./material-theme.md)
