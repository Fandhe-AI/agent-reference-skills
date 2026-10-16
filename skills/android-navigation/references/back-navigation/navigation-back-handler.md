# NavigationBackHandler

Composable entry point to `androidx.navigationevent` for Jetpack Compose: registers a `NavigationEventHandler` scoped to the composition and links it to `LocalNavigationEventDispatcherOwner`. Paired with `rememberNavigationEventState()`/`NavigationEventState` to expose gesture progress as Compose state instead of raw lifecycle overrides. From `androidx.navigationevent:navigationevent-compose` 1.0.0+.

## Signature / Usage

```kotlin
@Composable
public fun NavigationBackHandler(
    state: NavigationEventState<out NavigationEventInfo>,
    isBackEnabled: Boolean = true,
    onBackCancelled: () -> Unit = {},
    onBackCompleted: () -> Unit,
)

@Composable
public fun <T : NavigationEventInfo> rememberNavigationEventState(
    currentInfo: T,
    backInfo: List<T> = emptyList(),
    forwardInfo: List<T> = emptyList(),
): NavigationEventState<T>

// Navigation 3 overloads (package androidx.navigation3.scene, navigation3-ui 1.2.0+)
@Composable
public fun <T : Any> NavigationBackHandler(
    sceneState: SceneState<T>,
    state: NavigationEventState<SceneInfo<T>> = rememberNavigationEventState(sceneState),
    onBackCancelled: () -> Unit = {},
    onBackCompleted: () -> Unit,
)

@Composable
public fun <T : Any> rememberNavigationEventState(
    sceneState: SceneState<T>
): NavigationEventState<SceneInfo<T>>
```

```kotlin
@Composable
fun HandlingBackWithTransitionState(onNavigateUp: () -> Unit) {
    val navigationState = rememberNavigationEventState(currentInfo = NavigationEventInfo.None)

    when (val transitionState = navigationState.transitionState) {
        is NavigationEventTransitionState.InProgress -> {
            val progress = transitionState.latestEvent.progress // 0f..1f, for predictive animations
        }
        is NavigationEventTransitionState.Idle -> {
            // No gesture in progress; reset any temporary UI state
        }
    }

    NavigationBackHandler(
        state = navigationState,
        onBackCancelled = { /* gesture cancelled */ },
        onBackCompleted = { onNavigateUp() },
    )
}
```

## Options / Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `state` | `NavigationEventState<out NavigationEventInfo>` | — | State produced by `rememberNavigationEventState()`; carries `currentInfo`/`backInfo`/`forwardInfo`/`transitionState`. |
| `isBackEnabled` | `Boolean` | `true` | Whether the underlying handler currently participates in back handling. |
| `onBackCancelled` | `() -> Unit` | `{}` | Called when an in-progress back gesture is cancelled before completion. |
| `onBackCompleted` | `() -> Unit` | — | Called when the back navigation is committed; perform the actual navigation here. |
| `rememberNavigationEventState(currentInfo, backInfo, forwardInfo)` | function | `backInfo`/`forwardInfo` default to empty | Creates and remembers a `NavigationEventState<T>` reflecting the current handler's contextual info and transition state. |
| `sceneState` (Navigation 3 overload) | `SceneState<T>` | — | Navigation 3 scene state to connect to predictive back. `state` defaults to `rememberNavigationEventState(sceneState)` (a `NavigationEventState<SceneInfo<T>>`), `onBackCancelled` defaults to `{}`, `onBackCompleted` is required. |
| `NavigationEventState.transitionState` | `NavigationEventTransitionState` | — | `NavigationEventTransitionState.Idle` or `.InProgress(latestEvent, direction)`; read from Compose instead of overriding `onBackStarted`/`onBackProgressed`/etc. |

## Notes

- Package: `androidx.navigationevent.compose`. This is a separate API from this skill's `BackHandler`/`PredictiveBackHandler` Compose effects, which are built on `OnBackPressedDispatcher` rather than `NavigationEventDispatcher`.
- Internally, `NavigationBackHandler` creates a `NavigationEventHandler` for its content and links it to `LocalNavigationEventDispatcherOwner`, disposing it automatically via `DisposableEffect` when the composable leaves the composition.
- `NavigationEventTransitionState.InProgress.latestEvent` exposes the same `progress`/`swipeEdge` fields as `NavigationEvent` used by the non-Compose `NavigationEventHandler` overrides, so predictive-back animation code reads the same way in both styles.
- Companion composables exist for the same library: `NavigationForwardHandler` (forward-only, mirrors `NavigationBackHandler`) and the combined `NavigationEventHandler` composable (both directions in one call), plus `rememberNavigationEventDispatcherOwner()` for creating a scoped dispatcher owner.
- Navigation 3 overload (artifact `androidx.navigation3:navigation3-ui` 1.2.0+, package `androidx.navigation3.scene`): a convenience wrapper that connects a `SceneState` with predictive back, so custom UI components support back gestures without manually calculating back stack deltas. Back is enabled only when `sceneState.currentScene.previousEntries` is non-empty, and `onBackCompleted` is called once per popped entry (`entries.size - previousEntries.size` times). `SceneInfo<T>(scene)` is the `NavigationEventInfo` used for `currentInfo` / `backInfo`. In 1.2.0-alpha02 `onBack` was renamed `onBackCompleted` and `onBackCancelled` was added.
- For screens already using Navigation 3 or other libraries with built-in predictive back support, prefer those over composing `NavigationBackHandler` by hand.

## Related

- [Scene](../navigation3/scene.md)
- [NavigationEventHandler](./navigation-event-handler.md)
- [NavigationEventDispatcher](./navigation-event-dispatcher.md)
- [BackHandler](./back-handler.md)
- [PredictiveBackHandler](./predictive-back-handler.md)
