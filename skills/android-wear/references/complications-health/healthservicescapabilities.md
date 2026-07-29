# Health Services Capabilities

Device/OEM capability checks exposed by `ExerciseClient.getCapabilitiesAsync()` and `PassiveMonitoringClient.getCapabilitiesAsync()`, used to determine which `ExerciseType`s, `DataType`s, goals, and events a given device supports before requesting them.

## Signature / Usage

```kotlin
public interface ExerciseClient {
    public fun getCapabilitiesAsync(): ListenableFuture<ExerciseCapabilities>
}

public class ExerciseCapabilities(
    public val typeToCapabilities: Map<ExerciseType, ExerciseTypeCapabilities>,
    public val supportedBatchingModeOverrides: Set<BatchingMode> = emptySet(),
) {
    public val supportedExerciseTypes: Set<ExerciseType>
    public val autoPauseAndResumeEnabledExercises: Set<ExerciseType>
    public fun getExerciseTypeCapabilities(exercise: ExerciseType): ExerciseTypeCapabilities
}

public class ExerciseTypeCapabilities(
    public val supportedDataTypes: Set<DataType<*, *>>,
    public val supportedGoals: Map<AggregateDataType<*, *>, Set<ComparisonType>>,
    public val supportedMilestones: Map<AggregateDataType<*, *>, Set<ComparisonType>>,
    public val supportsAutoPauseAndResume: Boolean,
    public val supportedDebouncedGoals: Map<DataType<*, *>, Set<ComparisonType>> = emptyMap(),
)

public interface PassiveMonitoringClient {
    public fun getCapabilitiesAsync(): ListenableFuture<PassiveMonitoringCapabilities>
}

public class PassiveMonitoringCapabilities(
    public val supportedDataTypesPassiveMonitoring: Set<DataType<*, *>>,
    public val supportedDataTypesPassiveGoals: Set<DataType<*, *>>,
    public val supportedHealthEventTypes: Set<HealthEvent.Type>,
    public val supportedUserActivityStates: Set<UserActivityState>,
)
```

```kotlin
val exerciseClient = HealthServices.getClient(this).exerciseClient

val capabilities = exerciseClient.getCapabilitiesAsync().await()
if (ExerciseType.RUNNING in capabilities.supportedExerciseTypes) {
    val runningCaps = capabilities.getExerciseTypeCapabilities(ExerciseType.RUNNING)
    val dataTypes = runningCaps.supportedDataTypes intersect setOf(DataType.HEART_RATE_BPM, DataType.DISTANCE)
    // build ExerciseConfig using only the supported dataTypes
}

val passiveMonitoringClient = HealthServices.getClient(this).passiveMonitoringClient

val passiveCapabilities = passiveMonitoringClient.getCapabilitiesAsync().await()
val supported = DataType.STEPS_DAILY in passiveCapabilities.supportedDataTypesPassiveGoals
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `ExerciseCapabilities.typeToCapabilities` | `Map<ExerciseType, ExerciseTypeCapabilities>` | required | Per-exercise-type capabilities for this device. |
| `ExerciseCapabilities.supportedExerciseTypes` | `Set<ExerciseType>` | — | Computed; exercise types the device supports at all. |
| `ExerciseCapabilities.supportedBatchingModeOverrides` | `Set<BatchingMode>` | `emptySet()` | Batching mode overrides available on this device. |
| `ExerciseTypeCapabilities.supportedDataTypes` | `Set<DataType<*, *>>` | required | Data types available for the given exercise type. |
| `ExerciseTypeCapabilities.supportedGoals` / `supportedMilestones` | `Map<AggregateDataType<*, *>, Set<ComparisonType>>` | required | Which aggregate data types support one-time goals / milestones, and with which comparisons. |
| `ExerciseTypeCapabilities.supportsAutoPauseAndResume` | `Boolean` | required | Whether `ExerciseConfig.isAutoPauseAndResumeEnabled` is honored for this exercise type. |
| `ExerciseTypeCapabilities.supportedDebouncedGoals` | `Map<DataType<*, *>, Set<ComparisonType>>` | `emptyMap()` | Data types supporting `DebouncedGoal` and their compatible comparisons. |
| `PassiveMonitoringCapabilities.supportedDataTypesPassiveMonitoring` | `Set<DataType<*, *>>` | required | Data types available for background capture; some are only available during an exercise or via `MeasureClient`. |
| `PassiveMonitoringCapabilities.supportedDataTypesPassiveGoals` | `Set<DataType<*, *>>` | required | Data types supported for passive `PassiveGoal` callbacks. |
| `PassiveMonitoringCapabilities.supportedHealthEventTypes` / `supportedUserActivityStates` | `Set<HealthEvent.Type>` / `Set<UserActivityState>` | required | Supported passive health-event and user-activity-state values. |

## Notes

- Health Services will typically reject requests for `DataType`s or features (e.g. auto-pause) that are not enabled for the requested `ExerciseType`, so check capabilities before building `ExerciseConfig` / `PassiveListenerConfig` rather than reacting to a rejected request.
- `MeasureClient` has the equivalent `getCapabilitiesAsync()` / `supportedDataTypesMeasure` pattern — see [MeasureClient](./measureclient.md).
- This is the Wear OS Health Services API (Kotlin, `androidx.health.services.client` / `androidx.health.services.client.data`) — distinct from Health Connect.
- Package: `androidx.health.services.client.data`. Artifact: `androidx.health:health-services-client`.

## Related

- [ExerciseClient](./exerciseclient.md)
- [PassiveMonitoringClient](./passivemonitoringclient.md)
- [MeasureClient](./measureclient.md)
- [HealthServicesClient](./healthservicesclient.md)
