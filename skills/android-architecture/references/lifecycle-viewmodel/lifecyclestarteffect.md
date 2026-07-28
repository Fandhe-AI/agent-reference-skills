# LifecycleStartEffect

Composable effect for paired start/stop operations: the effect body runs on `ON_START`, and the mandatory `onStopOrDispose` block runs on `ON_STOP` or when the composable leaves the composition.

## Signature / Usage

```kotlin
@Composable
fun LifecycleStartEffect(
    key1: Any?,
    lifecycleOwner: LifecycleOwner = LocalLifecycleOwner.current,
    effects: LifecycleStartStopEffectScope.() -> LifecycleStopOrDisposeEffectResult,
)
// overloads also accept key2, key3, or vararg keys
```

```kotlin
@Composable
fun LocationMonitor(locationManager: LocationManager) {
    LifecycleStartEffect(locationManager) {
        val listener = LocationListener { /* update UI */ }
        locationManager.requestLocationUpdates(listener)

        onStopOrDispose {
            locationManager.removeUpdates(listener)
        }
    }
}
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `key1` (`key2`, `key3`, `keys`) | `Any?` | — | Restart the effect when any key changes. |
| `lifecycleOwner` | `LifecycleOwner` | `LocalLifecycleOwner.current` | Lifecycle to observe. |
| `effects` | `LifecycleStartStopEffectScope.() -> LifecycleStopOrDisposeEffectResult` | — | Body executed on `ON_START`; must end with `onStopOrDispose { ... }`. |

## Notes

- `onStopOrDispose` is mandatory; if no cleanup is needed, use `LifecycleEventEffect` instead.
- Cleanup runs exactly when the lifecycle moves to `STOPPED`, or on composable disposal — whichever comes first.
- Package: `androidx.lifecycle.compose` (module `lifecycle-runtime-compose`).

## Related

- [LifecycleResumeEffect](./lifecycleresumeeffect.md)
- [LifecycleEventEffect](./lifecycleeventeffect.md)
