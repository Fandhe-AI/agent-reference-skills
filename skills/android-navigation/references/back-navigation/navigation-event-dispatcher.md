# NavigationEventDispatcher

Central class of the Kotlin Multiplatform `androidx.navigationevent` library (`androidx.navigationevent:navigationevent`, 1.0.0+). It registers `NavigationEventHandler`s and `NavigationEventInput`s and routes Back/Up/Forward/Home navigation events to them across Android, web, and iOS targets.

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

// Registering a handler
navigationEventDispatcher.addHandler(myNavigationEventHandler)

// Registering a custom input
navigationEventDispatcher.addInput(MyInput())

// Disabling an entire subtree (all descendant handlers are ignored)
dispatcher.isEnabled = false

// Cascading cleanup of this dispatcher and all descendants
navigationEventDispatcher.dispose()
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `NavigationEventDispatcher()` | constructor | — | Creates a **root** dispatcher with its own internal `NavigationEventProcessor`. Overloads also accept `onBackCompletedFallback`/`onForwardCompletedFallback` lambdas run when no registered handler consumes a completed event. |
| `NavigationEventDispatcher(parent)` | constructor | — | Creates a **child** dispatcher attached to `parent`; it shares the parent's `NavigationEventProcessor` so events are ordered consistently across the whole hierarchy. |
| `isEnabled` | `Boolean` | `true` | When set `false` on a parent, every handler registered on that dispatcher and its descendants is ignored regardless of each handler's own enabled state. |
| `addHandler(handler)` | method | — | Registers a `NavigationEventHandler`. |
| `addInput(input)` | method | — | Registers a `NavigationEventInput` that will dispatch events into this dispatcher. |
| `dispose()` | method | — | Recursively removes this dispatcher and all descendant dispatchers, unregistering every associated handler. |

## Notes

- Package: `androidx.navigationevent`. Requires compile SDK 36+; add both `androidx.navigationevent:navigationevent` and (for Compose) `androidx.navigationevent:navigationevent-compose`.
- `NavigationEventDispatcherOwner` is the owner interface (analogous to `OnBackPressedDispatcherOwner`) exposing a single `navigationEventDispatcher` property; `ComponentActivity` implements it.
- `OnBackPressedDispatcher.asNavigationEventDispatcher()` bridges the older AndroidX `OnBackPressedDispatcher` into this dispatcher, since Navigation Event is the newer Kotlin Multiplatform foundation that `BackHandler`, `PredictiveBackHandler`, and `OnBackPressedDispatcher` are being built on top of.
- Dispatchers are typically organized in a parent-child hierarchy that mirrors nested UI (e.g. nested `NavHost`s, dialogs); all dispatchers in the tree share one `NavigationEventProcessor` for consistent LIFO event ordering.

## Related

- [NavigationEventHandler](./navigation-event-handler.md)
- [NavigationEventInput](./navigation-event-input.md)
- [OnBackPressedDispatcher](./on-back-pressed-dispatcher.md)
