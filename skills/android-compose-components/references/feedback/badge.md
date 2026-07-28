# Badge

Small visual element representing dynamic information, such as a count of pending requests or unread notifications. Supports icon-only (no content) or short text display. Use inside `BadgedBox` for correct positioning relative to anchored content.

## Signature / Usage

```kotlin
@Composable
fun Badge(
    modifier: Modifier = Modifier,
    containerColor: Color = BadgeDefaults.containerColor,
    contentColor: Color = contentColorFor(containerColor),
    content: @Composable (RowScope.() -> Unit)? = null,
)
```

```kotlin
Badge(
    containerColor = Color.Red,
    contentColor = Color.White,
) {
    Text("$itemCount")
}
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `modifier` | `Modifier` | `Modifier` | Applied to this badge. |
| `containerColor` | `Color` | `BadgeDefaults.containerColor` | Background color of the badge. |
| `contentColor` | `Color` | `contentColorFor(containerColor)` | Preferred color for content inside the badge. |
| `content` | `@Composable (RowScope.() -> Unit)?` | `null` | Optional content, typically short `Text`; omit for a plain dot badge. |

## Notes

- Use as the `badge` slot of `BadgedBox`, not standalone, for correct overlap positioning.
- Package: `androidx.compose.material3`.

## Related

- [BadgedBox](./badgedbox.md)
