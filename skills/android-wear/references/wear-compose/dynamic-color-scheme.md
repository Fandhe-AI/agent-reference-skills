# dynamicColorScheme

Material3 Expressive dynamic color theming for Wear OS. Generates a `ColorScheme` derived from the device's current watch face colors, so the app UI recolors to match whatever the user has set as their watch face.

## Signature / Usage

```kotlin
fun dynamicColorScheme(context: Context): ColorScheme?
```

```kotlin
@Composable
fun MyApp() {
    val dynamicColorScheme = dynamicColorScheme(LocalContext.current)
    MaterialTheme(colorScheme = dynamicColorScheme ?: myBrandColors) {
        // app content
    }
}

internal val myBrandColors: ColorScheme = ColorScheme(/* Specify colors here */)
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `context` | `Context` | Android context used to read the device's current watch-face-derived color palette; typically `LocalContext.current`. |

## Notes

- `dynamicColorScheme` itself is a plain (non-`@Composable`) function; it can still be called from within a `@Composable` function like `MyApp` above.
- Returns `null` when dynamic color theming is not available on the device — always fall back to a brand `ColorScheme` with the `?:` operator, as shown above.
- Pass the result into `MaterialTheme`'s `colorScheme` parameter so all Wear Compose Material3 components pick up the dynamic colors automatically.
- Package: `androidx.wear.compose.material3` (artifact `androidx.wear.compose:compose-material3`).

## Related

- [MaterialTheme (Wear)](./theme.md)
