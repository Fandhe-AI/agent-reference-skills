# OnBackInvokedDispatcher

Platform (`android.window`) interface for registering `OnBackInvokedCallback` instances directly with the system, bypassing AndroidX. Available on API 33 (Tiramisu)+.

## Signature / Usage

```java
public interface OnBackInvokedDispatcher {
    int PRIORITY_OVERLAY = 1000000;
    int PRIORITY_DEFAULT = 0;
    int PRIORITY_SYSTEM_NAVIGATION_OBSERVER = -2; // API 36+

    void registerOnBackInvokedCallback(
            @Priority int priority, @NonNull OnBackInvokedCallback callback);

    void unregisterOnBackInvokedCallback(@NonNull OnBackInvokedCallback callback);
}
```

```kotlin
val callback = OnBackInvokedCallback {
    // Handle back navigation
}
requireActivity().onBackInvokedDispatcher.registerOnBackInvokedCallback(
    OnBackInvokedDispatcher.PRIORITY_DEFAULT,
    callback,
)
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `PRIORITY_OVERLAY` | `Int` constant (`1000000`) | — | Priority for overlays (menus, navigation drawers) that must receive dispatch before non-overlays. |
| `PRIORITY_DEFAULT` | `Int` constant (`0`) | — | Standard priority level. |
| `PRIORITY_SYSTEM_NAVIGATION_OBSERVER` | `Int` constant (`-2`) | — | Observer-only priority (API 36+); does not consume the back event, only one may be registered at a time. |
| `registerOnBackInvokedCallback(priority, callback)` | method | — | Registers a callback at the given priority. Within the same priority, callbacks are invoked in reverse registration order; higher priority is invoked before lower. Re-registering the same instance moves it (and its priority). |
| `unregisterOnBackInvokedCallback(callback)` | method | — | Unregisters a callback; no-op if not registered. |

## Notes

- Package: `android.window`. Platform API, requires API 33+. Retrieved via `Activity.getOnBackInvokedDispatcher()` / `View.findOnBackInvokedDispatcher()`.
- Prefer the AndroidX `OnBackPressedDispatcher` / `OnBackPressedCallback` (or Compose `BackHandler`) for backward compatibility; they bridge to this platform dispatcher automatically on API 33+.
- Only receives system-driven predictive back animation dispatch when `android:enableOnBackInvokedCallback="true"`.
- Registering with a negative priority throws `IllegalArgumentException`.

## Related

- [OnBackInvokedCallback](./on-back-invoked-callback.md)
- [android:enableOnBackInvokedCallback manifest attribute](./enable-on-back-invoked-callback.md)
- [OnBackPressedDispatcher](./on-back-pressed-dispatcher.md)
