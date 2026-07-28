# ColorScheme

Holds all Material 3 color roles (primary, surface, error, etc.) used across components. Built with the `lightColorScheme()` / `darkColorScheme()` factory functions and provided to `MaterialTheme`.

## Signature / Usage

```kotlin
fun lightColorScheme(
    primary: Color = ColorLightTokens.Primary,
    onPrimary: Color = ColorLightTokens.OnPrimary,
    primaryContainer: Color = ColorLightTokens.PrimaryContainer,
    onPrimaryContainer: Color = ColorLightTokens.OnPrimaryContainer,
    // ...
    secondary: Color = ColorLightTokens.Secondary,
    onSecondary: Color = ColorLightTokens.OnSecondary,
    surface: Color = ColorLightTokens.Surface,
    onSurface: Color = ColorLightTokens.OnSurface,
    background: Color = ColorLightTokens.Background,
    onBackground: Color = ColorLightTokens.OnBackground,
    error: Color = ColorLightTokens.Error,
    onError: Color = ColorLightTokens.OnError,
    // ...additional color roles (48 total: primary/secondary/tertiary fixed &
    // container variants, surfaceContainer scale, outline, scrim, inverse* — see Notes)
): ColorScheme

fun darkColorScheme(
    primary: Color = ColorDarkTokens.Primary,
    onPrimary: Color = ColorDarkTokens.OnPrimary,
    primaryContainer: Color = ColorDarkTokens.PrimaryContainer,
    onPrimaryContainer: Color = ColorDarkTokens.OnPrimaryContainer,
    // ...
    secondary: Color = ColorDarkTokens.Secondary,
    onSecondary: Color = ColorDarkTokens.OnSecondary,
    surface: Color = ColorDarkTokens.Surface,
    onSurface: Color = ColorDarkTokens.OnSurface,
    background: Color = ColorDarkTokens.Background,
    onBackground: Color = ColorDarkTokens.OnBackground,
    error: Color = ColorDarkTokens.Error,
    onError: Color = ColorDarkTokens.OnError,
    // ...remaining 48 roles, identical names to lightColorScheme, backed by ColorDarkTokens defaults
): ColorScheme
```

```kotlin
val lightColorScheme = lightColorScheme(
    primary = md_theme_light_primary,
    onPrimary = md_theme_light_onPrimary,
    primaryContainer = md_theme_light_primaryContainer,
    // ... additional color roles
)

MaterialTheme(colorScheme = lightColorScheme) { /* app content */ }

Text(text = "Hello", color = MaterialTheme.colorScheme.primary)
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `primary` | `Color` | `ColorLightTokens.Primary` / `ColorDarkTokens.Primary` | Base color for prominent components (filled buttons, active states). |
| `onPrimary` | `Color` | `ColorLightTokens.OnPrimary` / `ColorDarkTokens.OnPrimary` | Content color (text/icon) drawn on top of `primary`. |
| `primaryContainer` / `onPrimaryContainer` | `Color` | `ColorLightTokens.PrimaryContainer` / `OnPrimaryContainer` (or Dark equivalents) | Standout container background and its content color, less emphasis than `primary`. |
| `secondary` / `onSecondary` / `secondaryContainer` / `onSecondaryContainer` | `Color` | `ColorLightTokens.Secondary*` / `ColorDarkTokens.Secondary*` | Less prominent components, accents. |
| `tertiary` / `onTertiary` / `tertiaryContainer` / `onTertiaryContainer` | `Color` | `ColorLightTokens.Tertiary*` / `ColorDarkTokens.Tertiary*` | Contrasting accent color, balances primary/secondary or draws attention. |
| `surface` / `onSurface` | `Color` | `ColorLightTokens.Surface*` / `ColorDarkTokens.Surface*` | Default background/content color for components (cards, sheets, menus). |
| `surfaceVariant` / `onSurfaceVariant` | `Color` | `ColorLightTokens.SurfaceVariant*` / `ColorDarkTokens.SurfaceVariant*` | Subtle differentiation from `surface`, for less prominent content. |
| `background` / `onBackground` | `Color` | `ColorLightTokens.Background*` / `ColorDarkTokens.Background*` | Screen background and content drawn on it. |
| `error` / `onError` / `errorContainer` / `onErrorContainer` | `Color` | `ColorLightTokens.Error*` / `ColorDarkTokens.Error*` | Error state colors and their containers. |
| `outline` / `outlineVariant` | `Color` | `ColorLightTokens.Outline*` / `ColorDarkTokens.Outline*` | Component borders/dividers, decorative element strokes. |
| `surfaceContainer` (+ `Lowest`/`Low`/`High`/`Highest`) | `Color` | `ColorLightTokens.SurfaceContainer*` / `ColorDarkTokens.SurfaceContainer*` | Surface elevation scale used instead of shadow-based elevation in M3. |
| `surfaceTint` | `Color` | `primary` | Tint applied to elevated surfaces; defaults to the scheme's own `primary` value. |
| `inverseSurface` / `inverseOnSurface` / `inversePrimary` | `Color` | `ColorLightTokens.Inverse*` / `ColorDarkTokens.Inverse*` | High-contrast colors for elements like Snackbar. |
| `scrim` | `Color` | `ColorLightTokens.Scrim` / `ColorDarkTokens.Scrim` | Overlay color for scrims behind modal surfaces. |

## Notes

- `lightColorScheme()` and `darkColorScheme()` accept the full set of Material 3 color roles (~48 parameters), all with token-based defaults; only override the roles your brand needs to change. See the Kotlin source (`ColorScheme.kt` in `androidx.compose.material3`) for the exhaustive parameter list.
- `ColorScheme` is `@Immutable`; `class ColorScheme(...)` exposes each role as a `val`.
- Use the [Material Theme Builder](https://m3.material.io/theme-builder) to generate a full light/dark `ColorScheme` pair from a seed color.
- `contentColorFor(backgroundColor)` resolves the matching "on" color for a given background role — see [contentColorFor](./content-color.md).
- Package: `androidx.compose.material3`.

## Related

- [MaterialTheme](./material-theme.md)
- [Dynamic color scheme](./dynamic-color-scheme.md)
- [contentColorFor / LocalContentColor](./content-color.md)
- [Surface tonal elevation](./surface-tonal-elevation.md)
