# Text

Displays a text view inside a Glance composition. Package: `androidx.glance.text` (composable exported from `androidx.glance`).

## Signature / Usage

```kotlin
@Composable
public fun Text(
    text: String,
    modifier: GlanceModifier = GlanceModifier,
    style: TextStyle = defaultTextStyle,
    maxLines: Int = Int.MAX_VALUE,
)
```

```kotlin
Text(
    text = "Example Text",
    style = TextStyle(
        fontWeight = FontWeight.Bold,
        fontSize = 18.sp,
        fontFamily = FontFamily.Monospace,
    ),
)
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `text` | `String` | — | Text content to display. |
| `modifier` | `GlanceModifier` | `GlanceModifier` | Applied to the text view. |
| `style` | `TextStyle` | `defaultTextStyle` | Color, font weight, size, font family, text alignment, etc. |
| `maxLines` | `Int` | `Int.MAX_VALUE` | Maximum lines before truncation. |

## Notes

- For localized/dynamic strings, prefer `LocalContext.current.getString(R.string.title)` and pass the result as `text`.
- This is the Glance app-widget `Text` (`androidx.glance.text`), a separate composable from the mobile Jetpack Compose `Text` (`androidx.compose.material3.Text`).

## Related

- [layout-containers](./layout-containers.md)
