# Dynamic color scheme

Derives a `ColorScheme` from the user's wallpaper / system theme (Material You), available on Android 12 (API 31) and above via `dynamicLightColorScheme()` and `dynamicDarkColorScheme()`.

## Signature / Usage

```kotlin
fun dynamicLightColorScheme(context: Context): ColorScheme
fun dynamicDarkColorScheme(context: Context): ColorScheme
```

```kotlin
val dynamicColor = Build.VERSION.SDK_INT >= Build.VERSION_CODES.S
val colorScheme = when {
    dynamicColor && darkTheme -> dynamicDarkColorScheme(LocalContext.current)
    dynamicColor && !darkTheme -> dynamicLightColorScheme(LocalContext.current)
    darkTheme -> DarkColorScheme
    else -> LightColorScheme
}

MaterialTheme(colorScheme = colorScheme) { /* app content */ }
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `context` | `Context` | — | Used to read the system-generated Material You palette. |

## Notes

- Only available starting Android 12 (`Build.VERSION_CODES.S`); on older versions fall back to a static `lightColorScheme()` / `darkColorScheme()`.
- Dynamic color meets WCAG accessibility contrast standards, similar to hand-authored tonal palettes.
- Package: `androidx.compose.material3` (Android-specific source set).

## Related

- [ColorScheme](./color-scheme.md)
- [MaterialTheme](./material-theme.md)
