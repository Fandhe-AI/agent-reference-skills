# OnBackInvokedCallback

Platform (`android.window`) callback interface invoked when a back gesture/press is committed. `OnBackAnimationCallback` extends it to add predictive-back progress/animation hooks on API 34+.

## Signature / Usage

```java
public interface OnBackInvokedCallback {
    void onBackInvoked();
}

public interface OnBackAnimationCallback extends OnBackInvokedCallback {
    default void onBackStarted(@NonNull BackEvent backEvent) {}
    default void onBackProgressed(@NonNull BackEvent backEvent) {}
    default void onBackCancelled() {}
}
```

```kotlin
val callback = OnBackInvokedCallback {
    // Handle the committed back navigation
}
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `onBackInvoked()` | method (abstract) | — | Called when a back gesture/press has been completed and committed. |
| `onBackStarted(backEvent)` | method (`OnBackAnimationCallback`) | no-op | Called when a predictive back gesture starts (API 34+). |
| `onBackProgressed(backEvent)` | method (`OnBackAnimationCallback`) | no-op | Called as a predictive back gesture progresses (API 34+). |
| `onBackCancelled()` | method (`OnBackAnimationCallback`) | no-op | Called when a predictive back gesture is cancelled (API 34+). |

## Notes

- Package: `android.window`. Platform API, requires API 33+ for `onBackInvoked()`; `OnBackAnimationCallback` progress hooks require API 34+.
- Registered via `OnBackInvokedDispatcher.registerOnBackInvokedCallback(priority, callback)`.
- The AndroidX-compat equivalent for cross-version code is `OnBackPressedCallback` (with `BackEventCompat` in place of `android.window.BackEvent`).

## Related

- [OnBackInvokedDispatcher](./on-back-invoked-dispatcher.md)
- [OnBackPressedCallback](./on-back-pressed-callback.md)
- [BackEventCompat](./back-event-compat.md)
