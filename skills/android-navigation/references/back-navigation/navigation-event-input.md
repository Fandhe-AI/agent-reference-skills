# NavigationEventInput

Abstract class for components that generate navigation events and dispatch them into a `NavigationEventDispatcher`, translating a platform-specific trigger (back/forward gesture, button press) into standardized `NavigationEvent`s. Symmetric for both back and forward navigation. Part of `androidx.navigationevent` 1.0.0+.

## Signature / Usage

```kotlin
public class MyInput : NavigationEventInput() {
    @MainThread
    public fun backStarted(event: NavigationEvent) {
        dispatchOnBackStarted(event)
    }

    @MainThread
    public fun backProgressed(event: NavigationEvent) {
        dispatchOnBackProgressed(event)
    }

    @MainThread
    public fun backCancelled() {
        dispatchOnBackCancelled()
    }

    @MainThread
    public fun backCompleted() {
        dispatchOnBackCompleted()
    }

    // Forward gestures use the same shape as back gestures
    @MainThread
    public fun forwardStarted(event: NavigationEvent) {
        dispatchOnForwardStarted(event)
    }

    @MainThread
    public fun forwardProgressed(event: NavigationEvent) {
        dispatchOnForwardProgressed(event)
    }

    @MainThread
    public fun forwardCancelled() {
        dispatchOnForwardCancelled()
    }

    @MainThread
    public fun forwardCompleted() {
        dispatchOnForwardCompleted()
    }

    override fun onAdded(dispatcher: NavigationEventDispatcher) { /* input just attached */ }
    override fun onRemoved() { /* input just detached */ }
    override fun onHasEnabledHandlersChanged(hasEnabledHandlers: Boolean) { /* enable/disable event sourcing */ }
    override fun onHistoryChanged(history: NavigationEventHistory) { /* stack changed */ }
}

navigationEventDispatcher.addInput(MyInput())
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `dispatchOnBackStarted(event)` | method | — | Forwards a back gesture-start event to the dispatcher. |
| `dispatchOnBackProgressed(event)` | method | — | Forwards a back gesture-progress event to the dispatcher. |
| `dispatchOnBackCancelled()` | method | — | Forwards a back gesture-cancel event to the dispatcher. |
| `dispatchOnBackCompleted()` | method | — | Forwards a back gesture-completion event to the dispatcher. |
| `dispatchOnForwardStarted(event)` | method | — | Forwards a forward gesture-start event to the dispatcher. |
| `dispatchOnForwardProgressed(event)` | method | — | Forwards a forward gesture-progress event to the dispatcher. |
| `dispatchOnForwardCancelled()` | method | — | Forwards a forward gesture-cancel event to the dispatcher. |
| `dispatchOnForwardCompleted()` | method | — | Forwards a forward gesture-completion event to the dispatcher. |
| `hasEnabledHandlers` | `Boolean` | `false` | Whether the connected dispatcher has any enabled handler (back or forward) matching this input's priority scope. |
| `hasEnabledBackHandlers` | `Boolean` | `false` | Whether the connected dispatcher has any enabled back handler matching this input's priority scope. |
| `hasEnabledForwardHandlers` | `Boolean` | `false` | Whether the connected dispatcher has any enabled forward handler matching this input's priority scope. |
| `onAdded(dispatcher)` | method | no-op | Called after this input is added to `dispatcher` via `NavigationEventDispatcher.addInput`. |
| `onRemoved()` | method | no-op | Called after this input is removed via `removeInput`/`dispose`. |
| `onHasEnabledHandlersChanged(hasEnabledHandlers)` | method | no-op | Called when `hasEnabledHandlers` changes; lets the input enable/disable its own event sourcing. |
| `onHasEnabledBackHandlersChanged(hasEnabledBackHandlers)` | method | no-op | Called when `hasEnabledBackHandlers` changes. |
| `onHasEnabledForwardHandlersChanged(hasEnabledForwardHandlers)` | method | no-op | Called when `hasEnabledForwardHandlers` changes. |
| `onHistoryChanged(history)` | method | no-op | Called when the connected dispatcher's `NavigationEventHistory` snapshot changes. |

## Notes

- Package: `androidx.navigationevent`. Registered on a dispatcher via `addHandler`'s counterpart `addInput()`, and automatically detached when the owning `NavigationEventDispatcher.dispose()` runs.
- For simple cases that don't need a custom subclass, use the built-in `DirectNavigationEventInput` instead of implementing `NavigationEventInput` directly.
- This is the "producer" side of the dispatcher-handler model: `NavigationEventInput` feeds events in, `NavigationEventHandler` consumes them.
- The `dispatchOn*`/`on*` members are `protected`, callable/overridable only from subclasses.

## Related

- [NavigationEventDispatcher](./navigation-event-dispatcher.md)
- [NavigationEventHandler](./navigation-event-handler.md)
