# Constraints / NetworkType

Optimal-condition requirements (network, charging, idle, storage, content URI triggers) that must be met before a `WorkRequest` runs.

## Signature / Usage

```kotlin
public class Constraints {
    public val requiredNetworkType: NetworkType
    public val requiredNetworkRequest: NetworkRequest?

    public class Builder {
        public fun setRequiredNetworkType(networkType: NetworkType): Builder
        public fun setRequiredNetworkRequest(networkRequest: NetworkRequest, networkType: NetworkType): Builder
        public fun setRequiresCharging(requiresCharging: Boolean): Builder
        public fun setRequiresDeviceIdle(requiresDeviceIdle: Boolean): Builder
        public fun setRequiresBatteryNotLow(requiresBatteryNotLow: Boolean): Builder
        public fun setRequiresStorageNotLow(requiresStorageNotLow: Boolean): Builder
        @RequiresApi(24) public fun addContentUriTrigger(uri: Uri, triggerForDescendants: Boolean): Builder
        @RequiresApi(24) public fun setTriggerContentUpdateDelay(duration: Long, timeUnit: TimeUnit): Builder
        @RequiresApi(24) public fun setTriggerContentMaxDelay(duration: Long, timeUnit: TimeUnit): Builder
        public fun build(): Constraints
    }
}

public enum class NetworkType { NOT_REQUIRED, CONNECTED, UNMETERED, NOT_ROAMING, METERED, TEMPORARILY_UNMETERED }
```

```kotlin
val constraints = Constraints.Builder()
    .setRequiredNetworkType(NetworkType.UNMETERED)
    .setRequiresCharging(true)
    .build()

val myWorkRequest: WorkRequest =
    OneTimeWorkRequestBuilder<MyWork>()
        .setConstraints(constraints)
        .build()
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `setRequiredNetworkType(networkType)` | `(NetworkType) -> Builder` | `NetworkType.NOT_REQUIRED` | Requires a particular network category for the work to run. |
| `setRequiredNetworkRequest(networkRequest, networkType)` | `(NetworkRequest, NetworkType) -> Builder` | none | API 28+ fine-grained network requirement; `networkType` used as fallback on older levels. |
| `setRequiresCharging(requiresCharging)` | `(Boolean) -> Builder` | `false` | Device must be charging. |
| `setRequiresDeviceIdle(requiresDeviceIdle)` | `(Boolean) -> Builder` | `false` | Device must be idle. |
| `setRequiresBatteryNotLow(requiresBatteryNotLow)` | `(Boolean) -> Builder` | `false` | Device battery must not be in low-battery mode. |
| `setRequiresStorageNotLow(requiresStorageNotLow)` | `(Boolean) -> Builder` | `false` | Device storage must not be low. |
| `addContentUriTrigger(uri, triggerForDescendants)` (API 24+) | `(Uri, Boolean) -> Builder` | none | Runs the work when the given `content:` `Uri` changes, similar to `JobScheduler` triggers. |
| `setTriggerContentUpdateDelay(duration, timeUnit)` (API 24+) | `(Long, TimeUnit) -> Builder` | none | Delay from the last detected content change to scheduling; each new change resets the delay. Also has a `Duration` overload (API 26+). |
| `setTriggerContentMaxDelay(duration, timeUnit)` (API 24+) | `(Long, TimeUnit) -> Builder` | none | Maximum delay from the first detected content change to scheduling. Also has a `Duration` overload (API 26+). |
| `NetworkType.NOT_REQUIRED` | enum value | — | No network required. |
| `NetworkType.CONNECTED` | enum value | — | Any working network connection required. |
| `NetworkType.UNMETERED` | enum value | — | Unmetered network connection required (e.g. Wi-Fi). |
| `NetworkType.NOT_ROAMING` | enum value | — | Non-roaming network required. |
| `NetworkType.METERED` | enum value | — | Metered network connection required. |
| `NetworkType.TEMPORARILY_UNMETERED` (API 30+) | enum value | — | Network generally metered but currently unmetered; may change, so avoid inappropriate data transfer. |

## Notes

- Content URI triggers (`addContentUriTrigger` / update / max delay) require API 24+.
- Package: `androidx.work`.

## Related

- [WorkRequest / OneTimeWorkRequest](./workrequest.md)
- [BackoffPolicy and retry](./backoffpolicy.md)
