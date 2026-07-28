# Dark theme

Integrates an app's theming with the system-wide dark theme setting: `isSystemInDarkTheme()` in Compose, `AppCompatDelegate` / `UiModeManager` night mode overrides, and the legacy Force Dark feature. Available on Android 10 (API 29)+.

## Signature / Usage

```kotlin
@Composable
fun MyTheme(
    darkTheme: Boolean = isSystemInDarkTheme(),
    content: @Composable () -> Unit
) {
    MaterialTheme(
        colorScheme = if (darkTheme) DarkColorScheme else LightColorScheme,
        content = content
    )
}
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `isSystemInDarkTheme()` | `Boolean` | — | Compose function returning whether the system is currently in dark theme. |
| `AppCompatDelegate.setDefaultNightMode(mode)` | `Unit` | — | API 30 and below: overrides night mode app-wide (`MODE_NIGHT_NO` / `MODE_NIGHT_YES` / `MODE_NIGHT_FOLLOW_SYSTEM`). Recreates activities since AppCompat 1.1.0. |
| `UiModeManager.setApplicationNightMode(mode)` | `Unit` | — | API 31+: preferred way to override the app's night mode. |
| `android:forceDarkAllowed` | `Boolean` (theme attr) | `true` | Android 10 Force Dark: auto-darkens a light-themed app's views without explicit DayNight theming. Ignored if the app already uses/inherits a dark theme. |
| `View.setForceDarkAllowed(Boolean)` | `Unit` | — | Disables Force Dark for a specific view subtree. |

## Notes

- Base theme should inherit `Theme.AppCompat.DayNight` or `Theme.MaterialComponents.DayNight` for the classic (non-Compose) view system.
- Check the active mode via `configuration.uiMode and Configuration.UI_MODE_NIGHT_MASK`; handle changes with `android:configChanges="uiMode"` if not recreating the activity.
- For Compose color schemes, see Material Design 3 `ColorScheme` (owned by the `android-compose-components` skill's `theming` category — this page only covers the system-setting integration).
- Package: `androidx.compose.foundation` (`isSystemInDarkTheme`), `androidx.appcompat.app.AppCompatDelegate`, `android.app.UiModeManager`.

## Related

- [WindowInsets](./window-insets.md)
