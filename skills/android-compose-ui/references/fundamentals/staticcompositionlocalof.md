# staticCompositionLocalOf

Creates an untracked `ProvidableCompositionLocal`. Reads of `.current` are not tracked individually by Compose, so changing the value recomposes the **entire** `content` lambda passed to `CompositionLocalProvider`, but with less per-read overhead than `compositionLocalOf`.

## Signature / Usage

```kotlin
fun <T> staticCompositionLocalOf(defaultFactory: () -> T): ProvidableCompositionLocal<T>
```

```kotlin
val LocalTheme = staticCompositionLocalOf { AppTheme() }
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `defaultFactory` | `() -> T` | — | Produces the value used when no `CompositionLocalProvider` supplies one. |

## Notes

- Use when the value rarely or never changes after being provided (design-system constants, theme root) — better performance than `compositionLocalOf` in that case.
- Changing a `staticCompositionLocalOf` value forces the whole subtree under the provider to recompose, unlike `compositionLocalOf`.
- Package: `androidx.compose.runtime`.

## Related

- [compositionLocalOf](./compositionlocalof.md)
- [CompositionLocalProvider](./compositionlocalprovider.md)
