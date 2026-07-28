# PullToRefreshBox

A container that expects a scrollable layout as content and adds gesture support for manually refreshing when the user swipes downward at the beginning of the content.

## Signature / Usage

```kotlin
@Composable
fun PullToRefreshBox(
    isRefreshing: Boolean,
    onRefresh: () -> Unit,
    modifier: Modifier = Modifier,
    state: PullToRefreshState = rememberPullToRefreshState(),
    contentAlignment: Alignment = Alignment.TopStart,
    indicator: @Composable BoxScope.() -> Unit = {
        Indicator(modifier = Modifier.align(Alignment.TopCenter), isRefreshing = isRefreshing, state = state)
    },
    enabled: Boolean = true,
    threshold: Dp = PullToRefreshDefaults.PositionalThreshold,
    content: @Composable BoxScope.() -> Unit,
)
```

```kotlin
PullToRefreshBox(
    isRefreshing = isRefreshing,
    onRefresh = onRefresh
) {
    LazyColumn(Modifier.fillMaxSize()) {
        items(items) { ListItem(headlineContent = { Text(it) }) }
    }
}
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `isRefreshing` | `Boolean` | — | Whether a refresh is currently in progress. |
| `onRefresh` | `() -> Unit` | — | Called when the user triggers a refresh gesture. |
| `modifier` | `Modifier` | `Modifier` | Applied to the container. |
| `state` | `PullToRefreshState` | `rememberPullToRefreshState()` | Tracks pull progress, exposed via `state.distanceFraction` (0f-1f). |
| `contentAlignment` | `Alignment` | `Alignment.TopStart` | Alignment of `content` within the `Box`. |
| `indicator` | `@Composable BoxScope.() -> Unit` | Default `Indicator` aligned top-center | Customizable refresh indicator. |
| `enabled` | `Boolean` | `true` | Whether the pull gesture is enabled. |
| `threshold` | `Dp` | `PullToRefreshDefaults.PositionalThreshold` | Pull distance required to trigger a refresh. |
| `content` | `@Composable BoxScope.() -> Unit` | — | Scrollable content, e.g. `LazyColumn`. |

## Notes

- Custom indicators can read `state.distanceFraction` and combine it with `Crossfade` or other animations for feedback during the pull.
- Package: `androidx.compose.material3.pulltorefresh`.

## Related

- [ListItem](./listitem.md)
