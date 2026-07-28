# SwipeToReveal / BasicSwipeToDismissBox

`SwipeToReveal` wraps a composable (e.g. a list row) to reveal up to two trailing action buttons on swipe. `BasicSwipeToDismissBox` is the lower-level foundation primitive implementing the swipe-to-dismiss gesture (screen/card dismissal, not row actions).

## Signature / Usage

```kotlin
@Composable
public fun SwipeToReveal(
    primaryAction: @Composable SwipeToRevealScope.() -> Unit,
    onSwipePrimaryAction: () -> Unit,
    modifier: Modifier = Modifier,
    secondaryAction: (@Composable SwipeToRevealScope.() -> Unit)? = null,
    undoPrimaryAction: (@Composable SwipeToRevealScope.() -> Unit)? = null,
    undoSecondaryAction: (@Composable SwipeToRevealScope.() -> Unit)? = null,
    revealState: RevealState = rememberRevealState(),
    revealDirection: RevealDirection = RevealDirection.RightToLeft,
    hasPartiallyRevealedState: Boolean = true,
    gestureInclusion: GestureInclusion = /* bidirectional or single-direction default */,
    actionContentSpacing: Dp = SwipeToRevealDefaults.ActionContentSpacing,
    content: @Composable () -> Unit,
)
```

```kotlin
SwipeToReveal(
    primaryAction = { PrimaryActionButton(onClick = { /* delete */ }, icon = { Icon(...) }) },
    onSwipePrimaryAction = { /* perform delete */ },
) {
    Card(onClick = { /* open item */ }) { Text("Item") }
}
```

```kotlin
public fun BasicSwipeToDismissBox(
    state: SwipeToDismissBoxState,
    modifier: Modifier = Modifier,
    backgroundKey: Any = SwipeToDismissKeys.Background,
    contentKey: Any = SwipeToDismissKeys.Content,
    userSwipeEnabled: Boolean = true,
    content: @Composable BoxScope.(isBackground: Boolean) -> Unit,
)
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `primaryAction` (SwipeToReveal) | `@Composable SwipeToRevealScope.() -> Unit` | — | Mandatory revealed action (e.g. delete button). |
| `secondaryAction` (SwipeToReveal) | `(@Composable SwipeToRevealScope.() -> Unit)?` | `null` | Optional second revealed action. |
| `onSwipePrimaryAction` | `() -> Unit` | — | Invoked when the primary action is triggered. |
| `revealState` | `RevealState` | `rememberRevealState()` | Reveal progress/state; reset it when the list scrolls to avoid stuck-open rows. |
| `revealDirection` | `RevealDirection` | `RightToLeft` | Swipe direction that reveals actions. |
| `state` (BasicSwipeToDismissBox) | `SwipeToDismissBoxState` | — | Dismiss gesture state. |
| `content` (BasicSwipeToDismissBox) | `@Composable BoxScope.(isBackground: Boolean) -> Unit` | — | Renders foreground and background content, told which is which via `isBackground`. |

## Notes

- Reset revealed `SwipeToReveal` rows when the enclosing list scrolls; apply `Modifier.transformedHeight` to the `SwipeToReveal` container (not the inner content) inside `TransformingLazyColumn`, and size action buttons to match the inner item height.
- `SwipeDismissableNavHost` (navigation) is built on `BasicSwipeToDismissBox` to provide the system-wide swipe-to-dismiss-screen gesture.
- Package: `SwipeToReveal` is `androidx.wear.compose.material3` (artifact `androidx.wear.compose:compose-material3`); `BasicSwipeToDismissBox` is `androidx.wear.compose.foundation` (artifact `androidx.wear.compose:compose-foundation`).

## Related

- [TransformingLazyColumn / ScalingLazyColumn](./lists.md)
- [Card](./card.md)
