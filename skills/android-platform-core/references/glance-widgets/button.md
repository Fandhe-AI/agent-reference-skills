# Button

Clickable button view. Package: `androidx.glance`.

## Signature / Usage

```kotlin
@Composable
public fun Button(
    text: String,
    onClick: Action,
    modifier: GlanceModifier = GlanceModifier,
    enabled: Boolean = true,
    style: TextStyle? = null,
    colors: ButtonColors = ButtonDefaults.buttonColors(),
    maxLines: Int = Int.MAX_VALUE,
)

@Composable
public fun Button(
    text: String,
    onClick: () -> Unit,
    modifier: GlanceModifier = GlanceModifier,
    enabled: Boolean = true,
    style: TextStyle? = null,
    colors: ButtonColors = ButtonDefaults.buttonColors(),
    maxLines: Int = Int.MAX_VALUE,
)
```

```kotlin
Button(
    text = "Save",
    onClick = actionStartActivity<MyActivity>(),
)
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `text` | `String` | — | Button label. |
| `onClick` | `Action` \| `() -> Unit` | — | `Action` for `actionStartActivity`/`actionRunCallback`/etc., or a lambda run in a `WorkManager` worker. |
| `modifier` | `GlanceModifier` | `GlanceModifier` | Applied to the button. |
| `enabled` | `Boolean` | `true` | Disables interaction when `false`. |
| `style` | `TextStyle?` | `null` | Text styling override. |
| `colors` | `ButtonColors` | `ButtonDefaults.buttonColors()` | Container/content color set. |
| `maxLines` | `Int` | `Int.MAX_VALUE` | Maximum lines of the label. |
| `key` (experimental overload) | `String?` | `null` | Explicit key to stabilize the underlying action across recompositions (e.g. inside lazy lists). |

## Notes

- This is the Glance app-widget `Button` (`androidx.glance`), distinct from the mobile Jetpack Compose `Button` (`androidx.compose.material3.Button`) and from SwiftUI/Ark UI/Chakra UI buttons — no shape/elevation/tonal variants exist here.
- Artifact: `androidx.glance:glance`.

## Related

- [actions](./actions.md)
- [toggle-controls](./toggle-controls.md)
