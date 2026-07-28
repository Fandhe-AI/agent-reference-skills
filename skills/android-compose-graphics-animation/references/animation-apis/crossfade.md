# Crossfade

Simpler alternative to `AnimatedContent` that always crossfades between the initial and target content when `targetState` changes.

## Signature / Usage

```kotlin
@Composable
fun <T> Crossfade(
    targetState: T,
    modifier: Modifier = Modifier,
    animationSpec: FiniteAnimationSpec<Float> = tween(),
    label: String = "Crossfade",
    contentKey: (targetState: T) -> Any? = { it },
    content: @Composable (targetState: T) -> Unit,
)
```

```kotlin
var currentPage by remember { mutableStateOf("A") }
Crossfade(targetState = currentPage, label = "cross fade") { screen ->
    when (screen) {
        "A" -> Text("Page A")
        "B" -> Text("Page B")
    }
}
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `targetState` | `T` | — | State that selects which content to display; a change triggers the crossfade. |
| `modifier` | `Modifier` | `Modifier` | Applied to the layout. |
| `animationSpec` | `FiniteAnimationSpec<Float>` | `tween()` | Spec for the alpha animation. |
| `label` | `String` | `"Crossfade"` | Debug label for tooling. |
| `contentKey` | `(targetState: T) -> Any?` | `{ it }` | Key identifying content, to avoid re-triggering the transition when the key is unchanged. |
| `content` | `@Composable (targetState: T) -> Unit` | — | Content for a given state. |

## Notes

- Use `AnimatedContent` instead when transitions other than a plain fade (slide, scale, size change) are needed.
- Package: `androidx.compose.animation`.

## Related

- [AnimatedContent](./animatedcontent.md)
