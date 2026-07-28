# GlanceTheme / ColorProviders

Top-level color theming for Glance widgets. Package: `androidx.glance` (`GlanceTheme`), `androidx.glance.color` (`ColorProviders`).

## Signature / Usage

```kotlin
@Composable
public fun GlanceTheme(
    colors: ColorProviders = LocalColors.current,
    content: @GlanceComposable @Composable () -> Unit,
)

public val GlanceTheme.colors: ColorProviders
    @Composable get() = LocalColors.current
```

```kotlin
override suspend fun provideGlance(context: Context, id: GlanceId) {
    provideContent {
        GlanceTheme {
            Image(
                provider = ImageProvider(R.drawable.ic_logo),
                contentDescription = null,
                colorFilter = ColorFilter.tint(GlanceTheme.colors.secondary),
            )
        }
    }
}
```

```kotlin
// Custom light/dark color scheme, from glance-material3
object MyAppWidgetGlanceColorScheme {
    val colors = ColorProviders(light = LightColors, dark = DarkColors)
}

GlanceTheme(colors = MyAppWidgetGlanceColorScheme.colors) { MyContent() }
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `colors` | `ColorProviders` | `LocalColors.current` (dynamic theme colors) | Material3-style color scheme provided to descendants. |
| `content` | `@Composable () -> Unit` | — | Themed subtree. |

## Notes

- On Android 12+ (dynamic color support), `GlanceTheme.colors` derives from user-specific platform colors; falls back to the Material baseline theme on older devices.
- `ColorProviders(light = ..., dark = ...)` builds a custom scheme from your app's Material light/dark color schemes; requires `androidx.glance:glance-material` (Material 2) or `androidx.glance:glance-material3` (Material 3).
- Access theme colors anywhere inside the themed subtree via `GlanceTheme.colors` (e.g. `GlanceTheme.colors.secondary`, `.widgetBackground`, `.onSurface`).
- Distinct from mobile Jetpack Compose `MaterialTheme` — `GlanceTheme` only provides color, not typography or shapes.

## Related

- [scaffold-titlebar](./scaffold-titlebar.md)
