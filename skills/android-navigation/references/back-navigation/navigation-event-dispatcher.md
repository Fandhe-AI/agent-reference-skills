# NavigationEventDispatcher

Central class of the Kotlin Multiplatform `androidx.navigationevent` library (`androidx.navigationevent:navigationevent`, 1.0.0+). It registers `NavigationEventHandler`s and `NavigationEventInput`s and routes back/forward navigation events to them across Android, web, and iOS targets.

## Signature / Usage

```kotlin
public class NavigationEventDispatcher {
    // Root dispatcher: creates its own internal NavigationEventProcessor
    public constructor()

    // Child dispatcher: shares the parent's NavigationEventProcessor
    public constructor(parent: NavigationEventDispatcher)
}

public class MyComponent : NavigationEventDispatcherOwner {
    override val navigationEventDispatcher: NavigationEventDispatcher =
        NavigationEventDispatcher()
}

// Registering a handler (PRIORITY_DEFAULT unless PRIORITY_OVERLAY is passed)
navigationEventDispatcher.addHandler(myNavigationEventHandler, priority = NavigationEventDispatcher.PRIORITY_OVERLAY)

// Registering a custom input, optionally scoped to a priority
navigationEventDispatcher.addInput(MyInput())
navigationEventDispatcher.addInput(MyOverlayInput(), NavigationEventDispatcher.PRIORITY_OVERLAY)
navigationEventDispatcher.removeInput(myInput)

// Disabling an entire subtree (all descendant handlers are ignored)
dispatcher.isEnabled = false

// Observing the shared, dispatcher-wide state
navigationEventDispatcher.transitionState.collect { /* Idle or InProgress */ }
navigationEventDispatcher.history.collect { /* mergedHistory, currentIndex */ }

// Cascading cleanup of this dispatcher and all descendants
navigationEventDispatcher.dispose()
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `NavigationEventDispatcher()` | constructor | — | Creates a **root** dispatcher with its own internal `NavigationEventProcessor`. Overloads also accept `onBackCompletedFallback`/`onForwardCompletedFallback` lambdas run when no registered handler consumes a completed event. |
| `NavigationEventDispatcher(parent)` | constructor | — | Creates a **child** dispatcher attached to `parent`; it shares the parent's `NavigationEventProcessor` so events are ordered consistently across the whole hierarchy. |
| `isEnabled` | `Boolean` | `true` | When set `false` on a parent, every handler registered on that dispatcher and its descendants is ignored regardless of each handler's own enabled state. |
| `transitionState` | `StateFlow<NavigationEventTransitionState>` | — | Globally observable, read-only gesture progress (`Idle`/`InProgress`) derived from the currently active handler; separate from the history stack. |
| `history` | `StateFlow<NavigationEventHistory>` | — | Globally observable, read-only navigation stack (`mergedHistory`, `currentIndex`); stays stable during a gesture and only updates when the stack itself changes. |
| `addHandler(handler, priority = PRIORITY_DEFAULT)` | method | — | Registers a `NavigationEventHandler`. `priority` is `PRIORITY_OVERLAY` or `PRIORITY_DEFAULT`; see `NavigationEventHandler`'s Notes for invocation order. |
| `addInput(input)` | method | — | Registers a `NavigationEventInput` that will dispatch events into this dispatcher, at an unspecified priority. |
| `addInput(input, priority)` | method | — | Registers a `NavigationEventInput` scoped to `PRIORITY_OVERLAY` or `PRIORITY_DEFAULT`. |
| `removeInput(input)` | method | — | Detaches a previously-registered `NavigationEventInput`; its `onRemoved()` is invoked. |
| `dispose()` | method | — | Recursively removes this dispatcher and all descendant dispatchers, unregistering every associated handler. |

## Notes

- Package: `androidx.navigationevent`. Requires compile SDK 36+; add both `androidx.navigationevent:navigationevent` and (for Compose) `androidx.navigationevent:navigationevent-compose`.
- `NavigationEventDispatcherOwner` is the owner interface (analogous to `OnBackPressedDispatcherOwner`) exposing a single `navigationEventDispatcher` property; `ComponentActivity` implements it.
- `OnBackPressedDispatcher.asNavigationEventDispatcher()` bridges the older AndroidX `OnBackPressedDispatcher` into this dispatcher, since Navigation Event is the newer Kotlin Multiplatform foundation that `BackHandler`, `PredictiveBackHandler`, and `OnBackPressedDispatcher` are being built on top of.
- Dispatchers are typically organized in a parent-child hierarchy that mirrors nested UI (e.g. nested `NavHost`s, dialogs); all dispatchers in the tree share one `NavigationEventProcessor` for consistent LIFO event ordering.
- There is no public `removeHandler()` on the dispatcher itself: a registered handler is detached by calling `NavigationEventHandler.remove()` on the handler instance (the dispatcher's `removeHandler` is `internal`).

## Related

- [NavigationEventHandler](./navigation-event-handler.md)
- [NavigationEventInput](./navigation-event-input.md)
- [OnBackPressedDispatcher](./on-back-pressed-dispatcher.md)
