# LifecycleEventEffect

Composable effect that runs a one-shot callback whenever a specific `Lifecycle.Event` occurs. Best for actions with no matching cleanup, like analytics logging.

## Signature / Usage

```kotlin
@Composable
fun LifecycleEventEffect(
    event: Lifecycle.Event,
    lifecycleOwner: LifecycleOwner = LocalLifecycleOwner.current,
    onEvent: () -> Unit,
)
```

```kotlin
@Composable
fun AnalyticsTracker(screenName: String) {
    LifecycleEventEffect(Lifecycle.Event.ON_RESUME) {
        Analytics.logView(screenName)
    }
}
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `event` | `Lifecycle.Event` | — | The lifecycle event to react to. |
| `lifecycleOwner` | `LifecycleOwner` | `LocalLifecycleOwner.current` | Lifecycle to observe. |
| `onEvent` | `() -> Unit` | — | Invoked every time `event` is dispatched. |

## Notes

- Cannot be used with `Lifecycle.Event.ON_DESTROY` — Compose disposes the composition before `ON_DESTROY` observers are invoked.
- Use `LifecycleStartEffect` / `LifecycleResumeEffect` instead when a matching cleanup block is required.
- Package: `androidx.lifecycle.compose` (module `lifecycle-runtime-compose`).

## Related

- [LifecycleStartEffect](./lifecyclestarteffect.md)
- [LifecycleResumeEffect](./lifecycleresumeeffect.md)
