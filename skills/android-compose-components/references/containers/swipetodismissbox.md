# SwipeToDismissBox

A composable that can be dismissed by swiping its content left or right, revealing background content underneath.

## Signature / Usage

```kotlin
@Composable
fun SwipeToDismissBox(
    state: SwipeToDismissBoxState,
    backgroundContent: @Composable RowScope.() -> Unit,
    modifier: Modifier = Modifier,
    enableDismissFromStartToEnd: Boolean = true,
    enableDismissFromEndToStart: Boolean = true,
    gesturesEnabled: Boolean = true,
    onDismiss: (SwipeToDismissBoxValue) -> Unit = {},
    content: @Composable RowScope.() -> Unit,
)
```

```kotlin
val state = rememberSwipeToDismissBoxState()

SwipeToDismissBox(
    state = state,
    backgroundContent = { Box(Modifier.fillMaxSize().background(Color.Red)) }
) {
    ListItem(headlineContent = { Text("Swipe me") })
}
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `state` | `SwipeToDismissBoxState` | — | Holds the current swipe value; create with `rememberSwipeToDismissBoxState`. |
| `backgroundContent` | `@Composable RowScope.() -> Unit` | — | Content revealed behind the item as it is swiped. |
| `modifier` | `Modifier` | `Modifier` | Applied to the container. |
| `enableDismissFromStartToEnd` | `Boolean` | `true` | Whether swiping start-to-end is allowed. |
| `enableDismissFromEndToStart` | `Boolean` | `true` | Whether swiping end-to-start is allowed. |
| `gesturesEnabled` | `Boolean` | `true` | Whether swipe gestures are enabled. |
| `onDismiss` | `(SwipeToDismissBoxValue) -> Unit` | `{}` | Called once the swipe interaction settles on a dismiss value. |
| `content` | `@Composable RowScope.() -> Unit` | — | The foreground/item content. |

## Notes

- `rememberSwipeToDismissBoxState(initialValue: SwipeToDismissBoxValue = Settled, positionalThreshold: (totalDistance: Float) -> Float = SwipeToDismissBoxDefaults.positionalThreshold): SwipeToDismissBoxState` creates and remembers the state; pass a `confirmValueChange` via `state` construction to intercept/veto value changes.
- Typically combined with `AnimatedVisibility` on the caller side to animate the item's removal after `onDismiss` fires.
- Package: `androidx.compose.material3`.

## Related

- [ListItem](./listitem.md)
