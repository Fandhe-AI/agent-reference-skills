# HealthServicesClient

Entry point for Health Services on Wear OS. Exposes the `ExerciseClient`, `MeasureClient`, and `PassiveMonitoringClient` used to read fitness and health sensor data.

## Signature / Usage

```kotlin
public object HealthServices {
    @JvmStatic
    public fun getClient(context: Context): HealthServicesClient
}

public interface HealthServicesClient {
    public val exerciseClient: ExerciseClient
    public val measureClient: MeasureClient
    public val passiveMonitoringClient: PassiveMonitoringClient
}
```

```kotlin
val healthClient = HealthServices.getClient(this /* context */)
val exerciseClient = healthClient.exerciseClient
val measureClient = healthClient.measureClient
val passiveMonitoringClient = healthClient.passiveMonitoringClient
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `exerciseClient` | `ExerciseClient` | — | Controls active exercise tracking (start/pause/resume/end, goals, exercise events). |
| `measureClient` | `MeasureClient` | — | Registers short-lived, high-frequency measurement callbacks for foreground UI. |
| `passiveMonitoringClient` | `PassiveMonitoringClient` | — | Registers long-running background monitoring via a callback or a `PassiveListenerService`. |

## Notes

- This is the Wear OS Health Services API (Kotlin, `androidx.health.services.client`), distinct from **Health Connect**, which is a separate on-device data store shared across mobile apps and is out of scope here.
- Package: `androidx.health.services.client`. Artifact: `androidx.health:health-services-client`.

## Related

- [ExerciseClient](./exerciseclient.md)
- [MeasureClient](./measureclient.md)
- [PassiveMonitoringClient](./passivemonitoringclient.md)
