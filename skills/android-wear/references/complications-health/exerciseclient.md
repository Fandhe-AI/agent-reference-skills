# ExerciseClient

Controls exercise tracking: starting, pausing, resuming, and ending workouts, and receiving state, metric, and goal updates via `ExerciseUpdateCallback`.

## Signature / Usage

```kotlin
public interface ExerciseClient {
    public fun startExerciseAsync(configuration: ExerciseConfig): ListenableFuture<Void>
    public fun pauseExerciseAsync(): ListenableFuture<Void>
    public fun resumeExerciseAsync(): ListenableFuture<Void>
    public fun endExerciseAsync(): ListenableFuture<Void>
    public fun setUpdateCallback(callback: ExerciseUpdateCallback)
    public fun setUpdateCallback(executor: Executor, callback: ExerciseUpdateCallback)
    public fun clearUpdateCallbackAsync(callback: ExerciseUpdateCallback): ListenableFuture<Void>
}

class ExerciseConfig
@JvmOverloads
constructor(
    val exerciseType: ExerciseType,
    val dataTypes: Set<DataType<*, *>>,
    val isAutoPauseAndResumeEnabled: Boolean,
    val isGpsEnabled: Boolean,
    val exerciseGoals: List<ExerciseGoal<*>> = listOf(),
    // ...exerciseParams, swimmingPoolLengthMeters, exerciseTypeConfig, batchingModeOverrides, exerciseEventTypes, debouncedGoals
)
```

```kotlin
val exerciseClient = HealthServices.getClient(this).exerciseClient

val callback = object : ExerciseUpdateCallback {
    override fun onExerciseUpdateReceived(update: ExerciseUpdate) {
        if (update.exerciseStateInfo.state.isEnded) { /* workout ended */ }
    }
    override fun onLapSummaryReceived(lapSummary: ExerciseLapSummary) { }
    override fun onAvailabilityChanged(dataType: DataType<*, *>, availability: Availability) { }
}
exerciseClient.setUpdateCallback(callback)

val config = ExerciseConfig(
    exerciseType = ExerciseType.RUNNING,
    dataTypes = setOf(DataType.HEART_RATE_BPM, DataType.CALORIES_TOTAL, DataType.DISTANCE),
    isAutoPauseAndResumeEnabled = false,
    isGpsEnabled = true,
)
exerciseClient.startExerciseAsync(config).await()
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `exerciseType` | `ExerciseType` | required | Activity being performed, e.g. `RUNNING`. |
| `dataTypes` | `Set<DataType<*, *>>` | required | Metrics to receive updates for during the exercise. |
| `isAutoPauseAndResumeEnabled` | `Boolean` | required | Automatically pauses/resumes based on detected motion. |
| `isGpsEnabled` | `Boolean` | required | Must be `true` to use GNSS for distance/speed/pace accuracy; requires `ACCESS_FINE_LOCATION`. |
| `exerciseGoals` | `List<ExerciseGoal<*>>` | `listOf()` | One-time or milestone goals; the goal's data type must also be in `dataTypes`. |
| `swimmingPoolLengthMeters` | `Float` | unspecified | Required when `exerciseType` is a swimming pool activity. |

## Notes

- The system permits only one active exercise at a time; `startExerciseAsync` fails if the app lacks permissions or requests an unsupported configuration.
- `pauseExerciseAsync` may stop GPS/sensors to conserve battery; `endExerciseAsync` flushes and shuts down active sensors, then delivers a final `ExerciseUpdate`.
- Run tracking inside a continuously-running `ForegroundService` with `foregroundServiceType="health|location"`.
- This is the Wear OS Health Services API (Kotlin, `androidx.health.services.client`) — distinct from Health Connect.
- Package: `androidx.health.services.client` / `androidx.health.services.client.data`. Artifact: `androidx.health:health-services-client`.

## Related

- [HealthServicesClient](./healthservicesclient.md)
- [DataType](./datatype.md)
- [HealthServicesSimulation](./healthservicessimulation.md)
