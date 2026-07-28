# PredictiveBackHandler

Composable effect for handling predictive system back gestures in Jetpack Compose. Receives a `Flow<BackEventCompat>` to track gesture progress, completion, and cancellation.

## Signature / Usage

```kotlin
@Composable
public fun PredictiveBackHandler(
    enabled: Boolean = true,
    onBack: suspend (progress: Flow<BackEventCompat>) -> Unit,
)
```

```kotlin
PredictiveBackHandler { progress: Flow<BackEventCompat> ->
    try {
        progress.collect { backEvent ->
            // Handle gesture progress updates here.
        }
        // Executed if the gesture completes successfully.
    } catch (e: CancellationException) {
        // Executed if the gesture is cancelled.
        throw e
    } finally {
        // Executed either way.
    }
}
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `enabled` | `Boolean` | `true` | Whether this handler is active. Call `PredictiveBackHandler` unconditionally and toggle this parameter instead of wrapping the call in an `if`. |
| `onBack` | `suspend (progress: Flow<BackEventCompat>) -> Unit` | — | Suspending lambda invoked when the gesture starts. Collect `progress` to react to updates; a thrown `CancellationException` signals the gesture was cancelled. |

## Notes

- Package: `androidx.activity.compose`. Requires `androidx.activity:activity-compose:1.8.0-alpha01` or higher.
- API level / opt-in: gesture progress is only dispatched by the system on API 34+; on lower API levels `onBack` still runs but without a `Flow` of intermediate progress events. The app must opt in via `android:enableOnBackInvokedCallback="true"` (API 33+) to receive predictive back dispatch at all — see [android:enableOnBackInvokedCallback](./enable-on-back-invoked-callback.md).
- If multiple `PredictiveBackHandler`s are present, the one composed **last** among all enabled handlers is invoked.
- Timing caveat: a gesture initiated in the same frame may still trigger this handler even after `enabled` is set to `false`, because the system can see a stale `true` value (tracked as b/375343407, b/384186542).
- For simple back interception without progress tracking, use `BackHandler` instead.
- Backed by `BackEventCompat`, whose `progress` field (0f–1f) drives animation state.

## Related

- [BackHandler](./back-handler.md)
- [BackEventCompat](./back-event-compat.md)
- [Predictive back animations](./predictive-back-animations.md)
