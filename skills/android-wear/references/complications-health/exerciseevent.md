# ExerciseEvent

Notifies the app when a discrete event occurs during an exercise (e.g. a golf shot), delivered out of band and with lower latency than the periodic `onExerciseUpdateReceived` metric stream.

## Signature / Usage

```kotlin
public abstract class ExerciseEvent

public class GolfShotEvent(
    val durationSinceBoot: Duration,
    val swingType: GolfShotSwingType,
) : ExerciseEvent() {
    public class GolfShotSwingType {
        companion object {
            @JvmField val UNKNOWN: GolfShotSwingType
            @JvmField val PUTT: GolfShotSwingType
            @JvmField val PARTIAL: GolfShotSwingType
            @JvmField val FULL: GolfShotSwingType
        }
    }
}

public class ExerciseEventType<C : ExerciseEventCapabilities> {
    companion object {
        @JvmField val GOLF_SHOT_EVENT: ExerciseEventType<GolfShotEventCapabilities>
        @JvmField val UNKNOWN: ExerciseEventType<ExerciseEventCapabilities>
    }
}
```

```kotlin
// Check capability before requesting the event type
val golfCapabilities = capabilities.typeToCapabilities[ExerciseType.GOLF]
val golfShotEventSupported =
    golfCapabilities?.supportedExerciseEvents?.contains(ExerciseEventType.GOLF_SHOT_EVENT)
val swingTypeClassificationSupported =
    golfCapabilities
        ?.getExerciseEventCapabilityDetails(ExerciseEventType.GOLF_SHOT_EVENT)
        ?.isSwingTypeClassificationSupported ?: false

// Request the event type in ExerciseConfig
val config = ExerciseConfig(
    exerciseType = ExerciseType.GOLF,
    dataTypes = setOf(...),
    isAutoPauseAndResumeEnabled = false,
    isGpsEnabled = true,
    exerciseEventTypes = setOf(ExerciseEventType.GOLF_SHOT_EVENT),
)

// Receive events via the dedicated callback method
val callback = object : ExerciseUpdateCallback {
    override fun onExerciseUpdateReceived(update: ExerciseUpdate) { /* ... */ }
    override fun onExerciseEventReceived(event: ExerciseEvent) {
        when (event) {
            is GolfShotEvent ->
                if (event.swingType == GolfShotEvent.GolfShotSwingType.PUTT) {
                    println("Putt detected!")
                }
        }
    }
}
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `exerciseEventTypes` | `Set<ExerciseEventType<*>>` | `ExerciseConfig` field requesting which event types to receive during the exercise; defaults to empty. |
| `GolfShotEvent.durationSinceBoot` | `Duration` | Time since device boot when the shot was detected. |
| `GolfShotEvent.swingType` | `GolfShotSwingType` | `PUTT`, `PARTIAL`, `FULL`, or `UNKNOWN`. |
| `ExerciseTypeCapabilities.supportedExerciseEvents` | `Set<ExerciseEventType<*>>` | Event types supported for the given `ExerciseType` on this device. |

## Notes

- Only request event types confirmed supported via `ExerciseTypeCapabilities.supportedExerciseEvents`; `getExerciseEventCapabilityDetails(type)` returns type-specific capability details (e.g. `GolfShotEventCapabilities.isSwingTypeClassificationSupported`).
- `GOLF_SHOT_EVENT` is currently the only defined `ExerciseEventType`.
- Requires `androidx.health:health-services-client:1.1.0-rc02` or later.

## Related

- [ExerciseClient](./exerciseclient.md)
- [DataType](./datatype.md)
