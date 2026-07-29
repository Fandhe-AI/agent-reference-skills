# NavigationEventInput

Abstract class for components that generate navigation events and dispatch them into a `NavigationEventDispatcher`, translating a platform-specific trigger (back gesture, button press) into standardized `NavigationEvent`s. Part of `androidx.navigationevent` 1.0.0+.

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
}

navigationEventDispatcher.addInput(MyInput())
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `dispatchOnBackStarted(event)` | method | — | Forwards a gesture-start event to the dispatcher. |
| `dispatchOnBackProgressed(event)` | method | — | Forwards a gesture-progress event to the dispatcher. |
| `dispatchOnBackCancelled()` | method | — | Forwards a gesture-cancel event to the dispatcher. |
| `dispatchOnBackCompleted()` | method | — | Forwards a gesture-completion event to the dispatcher. |

## Notes

- Package: `androidx.navigationevent`. Registered on a dispatcher via `addHandler`'s counterpart `addInput()`, and automatically detached when the owning `NavigationEventDispatcher.dispose()` runs.
- For simple cases that don't need a custom subclass, use the built-in `DirectNavigationEventInput` instead of implementing `NavigationEventInput` directly.
- This is the "producer" side of the dispatcher-handler model: `NavigationEventInput` feeds events in, `NavigationEventHandler` consumes them.

## Related

- [NavigationEventDispatcher](./navigation-event-dispatcher.md)
- [NavigationEventHandler](./navigation-event-handler.md)
