# NavigationEventHandler

Abstract class registered on a `NavigationEventDispatcher` to receive Back/Up/Forward/Home navigation event lifecycle callbacks, including predictive progress, from `androidx.navigationevent` 1.0.0+.

## Signature / Usage

```kotlin
val myHandler = object : NavigationEventHandler<NavigationEventInfo>(
    initialInfo = NavigationEventInfo.None,
    isBackEnabled = true,
) {
    override fun onBackStarted(event: NavigationEvent) {
        // Prepare for the back event
    }

    override fun onBackProgressed(event: NavigationEvent) {
        // Use event.progress (0f..1f) for predictive animations
    }

    override fun onBackCompleted() {
        // Commit the navigation
    }

    override fun onBackCancelled() {
        // Reset any in-progress UI state
    }
}

navigationEventDispatcher.addHandler(myHandler)
myHandler.remove()
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `initialInfo` | `NavigationEventInfo` | — | Initial contextual info associated with this handler. |
| `isBackEnabled` | `Boolean` | — | Whether the handler currently participates in back handling. |
| `onBackStarted(event)` | method | no-op | Called when a predictive back gesture starts. |
| `onBackProgressed(event)` | method | no-op | Called as the gesture progresses; `event.progress` (0f-1f) and `event.swipeEdge` (`EDGE_LEFT`/`EDGE_RIGHT`) drive predictive animations. |
| `onBackCompleted()` | method | throws `UnsupportedOperationException` | Called when the back navigation is committed; must be overridden by any handler that can complete. |
| `onBackCancelled()` | method | no-op | Called when the gesture is cancelled before completion. |
| `remove()` | method | — | Detaches this handler from its dispatcher. |

## Notes

- Package: `androidx.navigationevent`. Multiple handlers can be registered on the same dispatcher; they are invoked by priority (`PRIORITY_OVERLAY` before `PRIORITY_DEFAULT`) and then by recency (LIFO — most recently added first).
- A three-arg constructor `(initialInfo, isBackEnabled, isForwardEnabled)` also exists, together with `onForwardStarted`/`onForwardProgressed`/`onForwardCompleted`/`onForwardCancelled` overrides for forward-gesture handling; `isForwardEnabled` defaults to `false` when using the two-arg constructor shown above.
- This class was named `NavigationEventCallback` in `1.0.0-alpha03`–`alpha07` and renamed to `NavigationEventHandler` in `1.0.0-alpha08` ("to better reflect the class's purpose of handling multi-stage navigation gestures"); `addCallback` was renamed to `addHandler` at the same time. Docs or code referencing `NavigationEventCallback` predate that rename.
- Jetpack Compose usage goes through the `NavigationBackHandler` composable and `rememberNavigationEventState()` (artifact `androidx.navigationevent:navigationevent-compose`), which expose the same lifecycle as `transitionState: NavigationEventTransitionState` (`InProgress`/`Idle`) instead of raw overrides. This is conceptually similar to, but a separate API from, this skill's `BackHandler`/`PredictiveBackHandler` Compose effects.
- For screens already using Navigation 3 or other libraries with built-in predictive back support, prefer those over hand-rolling a `NavigationEventHandler`.

## Related

- [NavigationEventDispatcher](./navigation-event-dispatcher.md)
- [NavigationEventInput](./navigation-event-input.md)
- [BackHandler](./back-handler.md)
- [PredictiveBackHandler](./predictive-back-handler.md)
