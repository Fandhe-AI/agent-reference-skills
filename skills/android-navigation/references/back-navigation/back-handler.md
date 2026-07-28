# BackHandler

Composable effect for intercepting the system back button/gesture in Jetpack Compose. Invokes `onBack` when the back navigation is completed.

## Signature / Usage

```kotlin
@Composable
public fun BackHandler(enabled: Boolean = true, onBack: () -> Unit)
```

```kotlin
@Composable
fun MyScreen() {
    BackHandler(enabled = true) {
        // Handle back button event
    }
}
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `enabled` | `Boolean` | `true` | Whether this handler is enabled and eligible to handle the back press. Call `BackHandler` unconditionally and toggle this parameter instead of wrapping the call in an `if`. |
| `onBack` | `() -> Unit` | — | Invoked when the system back button/gesture is completed. |

## Notes

- Package: `androidx.activity.compose`.
- API level / opt-in: `BackHandler` itself works on all API levels supported by `activity-compose` (back-compat, no predictive gesture preview required). To also receive the system predictive-back preview animation while `BackHandler` is active, the app must additionally opt in via `android:enableOnBackInvokedCallback="true"` (API 33+) — see [android:enableOnBackInvokedCallback](./enable-on-back-invoked-callback.md).
- If multiple `BackHandler`s are present in the composition, the one composed **last** among all enabled handlers is invoked (precedence rule).
- The handler is registered once and stays attached for the lifetime of the `LifecycleOwner`; `isEnabled` automatically follows `enabled` combined with `Lifecycle.State.STARTED`.
- For progress-tracked predictive back animations, use `PredictiveBackHandler` instead.
- Requires `androidx.activity:activity-compose`.

## Related

- [PredictiveBackHandler](./predictive-back-handler.md)
- [OnBackPressedDispatcher](./on-back-pressed-dispatcher.md)
- [OnBackPressedCallback](./on-back-pressed-callback.md)
