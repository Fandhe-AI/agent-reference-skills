# OnBackPressedCallback

Abstract callback class registered on an `OnBackPressedDispatcher` to handle back navigation events, including predictive back gesture progress on API 34+.

## Signature / Usage

```kotlin
public abstract class OnBackPressedCallback(enabled: Boolean) {
    @get:MainThread @set:MainThread
    public var isEnabled: Boolean

    @MainThread
    public fun remove()

    @MainThread
    public open fun handleOnBackStarted(backEvent: BackEventCompat) {}

    @MainThread
    public open fun handleOnBackProgressed(backEvent: BackEventCompat) {}

    @MainThread
    public abstract fun handleOnBackPressed()

    @MainThread
    public open fun handleOnBackCancelled() {}
}
```

```kotlin
val callback = object : OnBackPressedCallback(true) {
    override fun handleOnBackPressed() {
        // Handle the back button event
    }
}
requireActivity().onBackPressedDispatcher.addCallback(this, callback)
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `enabled` (constructor) | `Boolean` | — | Initial value of `isEnabled`. |
| `isEnabled` | `Boolean` | ctor value | Enabled state. Only enabled callbacks receive `handleOnBackPressed`. When registered with a `LifecycleOwner`, active only when both `isEnabled` is `true` and the lifecycle is at least `STARTED`. |
| `handleOnBackStarted(backEvent)` | method | no-op | Called when a predictive back gesture starts. Framework-invoked on API 34+ only. |
| `handleOnBackProgressed(backEvent)` | method | no-op | Called as a predictive back gesture progresses. Framework-invoked on API 34+ only. |
| `handleOnBackPressed()` | method (abstract) | — | Called when the back event is committed (button press or completed gesture). |
| `handleOnBackCancelled()` | method | no-op | Called when a predictive back gesture is cancelled. Framework-invoked on API 34+ only. |
| `remove()` | method | — | Removes this callback from any `OnBackPressedDispatcher` it is currently added to. |

## Notes

- Package: `androidx.activity`.
- `handleOnBackStarted` / `handleOnBackProgressed` / `handleOnBackCancelled` only fire from the framework on API 34+; on lower API levels only `handleOnBackPressed()` is invoked (no progress preview).
- Use `isEnabled` toggling instead of `remove()` when the disable is temporary, since `remove()` detaches the callback entirely.

## Related

- [OnBackPressedDispatcher](./on-back-pressed-dispatcher.md)
- [BackEventCompat](./back-event-compat.md)
- [OnBackInvokedCallback](./on-back-invoked-callback.md)
