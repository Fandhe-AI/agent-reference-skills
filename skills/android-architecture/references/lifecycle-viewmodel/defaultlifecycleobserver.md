# DefaultLifecycleObserver

Callback interface with one method per lifecycle event, for observing a `LifecycleOwner`'s state changes without annotation-based dispatch.

## Signature / Usage

```kotlin
interface DefaultLifecycleObserver : LifecycleObserver {
    fun onCreate(owner: LifecycleOwner) {}
    fun onStart(owner: LifecycleOwner) {}
    fun onResume(owner: LifecycleOwner) {}
    fun onPause(owner: LifecycleOwner) {}
    fun onStop(owner: LifecycleOwner) {}
    fun onDestroy(owner: LifecycleOwner) {}
}
```

```kotlin
class MyObserver : DefaultLifecycleObserver {
    override fun onStart(owner: LifecycleOwner) {
        // start monitoring
    }
    override fun onStop(owner: LifecycleOwner) {
        // stop monitoring
    }
}

lifecycleOwner.lifecycle.addObserver(MyObserver())
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `onCreate(owner)` | function | no-op | Invoked after the owner's `onCreate` returns. |
| `onStart(owner)` | function | no-op | Invoked after the owner's `onStart` returns. |
| `onResume(owner)` | function | no-op | Invoked after the owner's `onResume` returns. |
| `onPause(owner)` | function | no-op | Invoked before the owner's `onPause` is called. |
| `onStop(owner)` | function | no-op | Invoked before the owner's `onStop` is called. |
| `onDestroy(owner)` | function | no-op | Invoked before the owner's `onDestroy` is called. |

## Notes

- If a class implements both `DefaultLifecycleObserver` and `LifecycleEventObserver`, `DefaultLifecycleObserver` callbacks run first, then `onStateChanged`.
- The deprecated `@OnLifecycleEvent` annotation is ignored when this interface is implemented.
- Package: `androidx.lifecycle` (module `lifecycle-common`).

## Related

- [LifecycleEventObserver](./lifecycleeventobserver.md)
- [Lifecycle](./lifecycle.md)
