# DebouncedGoal

A goal for instantaneous, sample-based metrics (heart rate, speed, etc.) that only triggers once the threshold has been crossed continuously for a configured duration, avoiding repeated alerts from a value that flickers around the threshold.

## Signature / Usage

```kotlin
class DebouncedGoal<T : Number> private constructor(
    val debouncedDataTypeCondition: DebouncedDataTypeCondition<T, *>,
) {
    companion object {
        fun <T : Number> createSampleDebouncedGoal(
            condition: DebouncedDataTypeCondition<T, DeltaDataType<T, SampleDataPoint<T>>>
        ): DebouncedGoal<T>

        fun <T : Number> createAggregateDebouncedGoal(
            condition: DebouncedDataTypeCondition<T, AggregateDataType<T, StatisticalDataPoint<T>>>
        ): DebouncedGoal<T>
    }
}

class DebouncedDataTypeCondition<T : Number, D : DataType<T, out DataPoint<T>>>
internal constructor(
    val dataType: D,
    val threshold: T,
    val comparisonType: ComparisonType,
    val initialDelaySeconds: Int = 0,
    val durationAtThresholdSeconds: Int = 0,
) {
    companion object {
        fun <T : Number, D : DeltaDataType<T, out SampleDataPoint<T>>> createDebouncedDataTypeCondition(
            dataType: D,
            threshold: T,
            comparisonType: ComparisonType,
            initialDelaySeconds: Int,
            durationAtThresholdSeconds: Int,
        ): DebouncedDataTypeCondition<T, D>
    }
}
```

```kotlin
// Alert only after heart rate has stayed >= 100 bpm for 10 continuous seconds,
// and not before 60 seconds have passed since the goal was registered.
val condition = DebouncedDataTypeCondition.createDebouncedDataTypeCondition(
    dataType = DataType.HEART_RATE_BPM,
    threshold = 100.0,
    comparisonType = ComparisonType.GREATER_THAN_OR_EQUAL,
    initialDelaySeconds = 60,
    durationAtThresholdSeconds = 10,
)
val debouncedGoal = DebouncedGoal.createSampleDebouncedGoal(condition)

val config = ExerciseConfig(
    exerciseType = ExerciseType.RUNNING,
    dataTypes = setOf(DataType.HEART_RATE_BPM),
    isAutoPauseAndResumeEnabled = false,
    isGpsEnabled = false,
    debouncedGoals = listOf(debouncedGoal),
)

// Achieved debounced goals are reported on ExerciseUpdate, not ExerciseGoal's callback
override fun onExerciseUpdateReceived(update: ExerciseUpdate) {
    update.latestAchievedDebouncedGoals.forEach { /* handle achieved debounced goal */ }
}
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `dataType` | `D : DataType<T, out DataPoint<T>>` | required | Sample (delta) or aggregate data type the condition applies to, e.g. `DataType.HEART_RATE_BPM`. |
| `threshold` | `T` | required | Value the metric must cross to satisfy the condition. |
| `comparisonType` | `ComparisonType` | required | How the current value is compared against `threshold` (e.g. greater-than-or-equal). |
| `initialDelaySeconds` | `Int` | `0` | Time that must pass since goal registration before the goal can trigger at all. |
| `durationAtThresholdSeconds` | `Int` | `0` | Uninterrupted time the value must stay past `threshold` before the goal triggers; any dip below threshold resets this timer. |

## Notes

- Set via `ExerciseConfig.debouncedGoals: List<DebouncedGoal<*>>` (or `Builder.setDebouncedGoals`); the goal's `dataType` must also be included in `ExerciseConfig.dataTypes`. Only one debounced goal per data type is honored — if several are set for the same type, only the last one applies.
- Applicable only to sample-based metrics with instantaneous or averaged values (e.g. heart rate, speed, pace); not for cumulative totals.
- Achieved debounced goals surface on `ExerciseUpdate.latestAchievedDebouncedGoals: Set<DebouncedGoal<*>>` — a separate field from `ExerciseUpdate.latestAchievedGoals` used by regular `ExerciseGoal`s.
- Check `ExerciseTypeCapabilities.supportedDebouncedGoals: Map<DataType<*, *>, Set<ComparisonType>>` before configuring, to confirm the device/exercise type supports debouncing for a given data type and comparison.
- Requires Wear OS 5+ and `androidx.health:health-services-client` 1.1.0 or later.

## Related

- [ExerciseClient](./exerciseclient.md)
- [DataType](./datatype.md)
