# LifecycleEventObserver

Functional interface receiving a single callback for every `Lifecycle.Event`, useful when the specific `Event` value (not just the derived state) matters.

## Signature / Usage

```kotlin
fun interface LifecycleEventObserver : LifecycleObserver {
    fun onStateChanged(source: LifecycleOwner, event: Lifecycle.Event)
}
```

```kotlin
val observer = LifecycleEventObserver { _, event ->
    if (event == Lifecycle.Event.ON_CREATE) {
        // register providers, restore state, etc.
    }
}
lifecycleOwner.lifecycle.addObserver(observer)
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `onStateChanged(source, event)` | function | — | Called on every lifecycle transition with the emitting `LifecycleOwner` and the `Lifecycle.Event` that occurred. |

## Notes

- If a class implements both `DefaultLifecycleObserver` and `LifecycleEventObserver`, `DefaultLifecycleObserver` methods run first, then `onStateChanged`.
- The deprecated `@OnLifecycleEvent` annotation is ignored when this interface is implemented.
- Package: `androidx.lifecycle` (module `lifecycle-common`).

## Related

- [DefaultLifecycleObserver](./defaultlifecycleobserver.md)
- [Lifecycle](./lifecycle.md)
- [SavedStateRegistry](./savedstateregistry.md)
