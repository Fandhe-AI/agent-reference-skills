# PassiveMonitoringClient

Registers long-running background monitoring of Health Services data, independent of the app's lifecycle and of any active exercise session.

## Signature / Usage

```kotlin
public interface PassiveMonitoringClient {
    public fun setPassiveListenerServiceAsync(
        service: Class<out PassiveListenerService>,
        config: PassiveListenerConfig,
    ): ListenableFuture<Void>

    public fun setPassiveListenerCallback(config: PassiveListenerConfig, callback: PassiveListenerCallback)
    public fun setPassiveListenerCallback(
        config: PassiveListenerConfig,
        executor: Executor,
        callback: PassiveListenerCallback,
    )

    public fun clearPassiveListenerServiceAsync(): ListenableFuture<Void>
    public fun clearPassiveListenerCallbackAsync(): ListenableFuture<Void>
}
```

```kotlin
val passiveMonitoringClient = HealthServices.getClient(this).passiveMonitoringClient

val config = PassiveListenerConfig.builder()
    .setDataTypes(setOf(DataType.HEART_RATE_BPM))
    .build()

class PassiveDataService : PassiveListenerService() {
    override fun onNewDataPointsReceived(dataPoints: DataPointContainer) {
        // handle background data
    }
}
passiveMonitoringClient.setPassiveListenerServiceAsync(PassiveDataService::class.java, config)
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `service` | `Class<out PassiveListenerService>` | required | Declared in the manifest with `permission="com.google.android.wearable.healthservices.permission.PASSIVE_DATA_BINDING"`; receives batched data even when the app isn't visible. |
| `callback` | `PassiveListenerCallback` | required | Delivers data as it's generated, but only while the app process is running. |
| `config` | `PassiveListenerConfig` | required | Built via `PassiveListenerConfig.builder().setDataTypes(...)` / `.setDailyGoals(...)`. |

## Notes

- Passive registrations don't persist across device reboots; re-register from a `BroadcastReceiver` on `ACTION_BOOT_COMPLETED` (requires `RECEIVE_BOOT_COMPLETED`).
- Supports `PassiveGoal` daily goals (e.g. `DataType.STEPS_DAILY`), delivered via `onGoalCompleted`.
- This is the Wear OS Health Services API (Kotlin, `androidx.health.services.client`) — distinct from Health Connect.
- Package: `androidx.health.services.client`. Artifact: `androidx.health:health-services-client`.

## Related

- [HealthServicesClient](./healthservicesclient.md)
- [HealthServicesPermissions](./healthservicespermissions.md)
- [Health Services Capabilities](./healthservicescapabilities.md)
