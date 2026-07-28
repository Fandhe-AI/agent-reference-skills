# TopAppBarScrollBehavior

Interface that defines how a top app bar responds to the scrolling of the content below it. Created via `TopAppBarDefaults` factory functions and passed to a top app bar's `scrollBehavior` parameter.

## Signature / Usage

```kotlin
interface TopAppBarScrollBehavior {
    val state: TopAppBarState
    val isPinned: Boolean
    val snapAnimationSpec: AnimationSpec<Float>?
    val flingAnimationSpec: DecayAnimationSpec<Float>?
    val nestedScrollConnection: NestedScrollConnection
}
```

```kotlin
val scrollBehavior = TopAppBarDefaults.enterAlwaysScrollBehavior(rememberTopAppBarState())

Scaffold(
    modifier = Modifier.nestedScroll(scrollBehavior.nestedScrollConnection),
    topBar = {
        TopAppBar(title = { Text("Title") }, scrollBehavior = scrollBehavior)
    },
) { innerPadding ->
    ScrollContent(innerPadding)
}
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `state` | `TopAppBarState` | — | Tracks the scroll offset used to compute the bar's collapsed/expanded position. |
| `isPinned` | `Boolean` | — | Whether the bar stays fixed and ignores drag gestures. |
| `snapAnimationSpec` | `AnimationSpec<Float>?` | — | Snapping animation once a drag/fling ends; `null` disables snapping. |
| `flingAnimationSpec` | `DecayAnimationSpec<Float>?` | — | Fling animation driven by scroll velocity; `null` disables it. |
| `nestedScrollConnection` | `NestedScrollConnection` | — | Must be attached via `Modifier.nestedScroll` to receive scroll events. |

## Notes

- Package: `androidx.compose.material3`.
- Obtained from `TopAppBarDefaults`, not instantiated directly:
  - `TopAppBarDefaults.pinnedScrollBehavior(state, canScroll)` — bar stays fixed, never collapses.
  - `TopAppBarDefaults.enterAlwaysScrollBehavior(state, canScroll, snapAnimationSpec, flingAnimationSpec)` — bar collapses immediately on scroll-up, reappears immediately on scroll-down.
  - `TopAppBarDefaults.exitUntilCollapsedScrollBehavior(state, canScroll, snapAnimationSpec, flingAnimationSpec)` — bar scrolls away fully before content scrolls, and only re-expands once content is scrolled back to the top.
  - All three take `state: TopAppBarState = rememberTopAppBarState()` and `canScroll: () -> Boolean = { true }`.
- The equivalent for `BottomAppBar` is `BottomAppBarScrollBehavior`, created the same way and passed to `BottomAppBar`'s `scrollBehavior` parameter.

## Related

- [TopAppBar](./topappbar.md)
- [BottomAppBar](./bottomappbar.md)
