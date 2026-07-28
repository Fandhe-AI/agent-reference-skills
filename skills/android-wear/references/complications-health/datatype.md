# DataType

Typed identifier for a category of health/fitness data managed by Health Services, used to request and read data from `MeasureClient`, `ExerciseClient`, and `PassiveMonitoringClient`.

## Signature / Usage

```kotlin
abstract class DataType<T : Any, D : DataPoint<T>>(
    val name: String,
    internal val timeType: TimeType,
    val valueClass: Class<T>,
    internal val isAggregate: Boolean,
) {
    companion object {
        val HEART_RATE_BPM: DeltaDataType<Double, SampleDataPoint<Double>>
        val STEPS: DeltaDataType<Long, IntervalDataPoint<Long>>
        val STEPS_TOTAL: AggregateDataType<Long, CumulativeDataPoint<Long>>
        val CALORIES: DeltaDataType<Double, IntervalDataPoint<Double>>
        val DISTANCE: DeltaDataType<Double, IntervalDataPoint<Double>>
        val SPEED: DeltaDataType<Double, SampleDataPoint<Double>>
        val LOCATION: DeltaDataType<*, *>
        // ...many more, each with delta and/or aggregate variants
    }
}
```

```kotlin
val dataTypes = setOf(DataType.HEART_RATE_BPM, DataType.CALORIES_TOTAL, DataType.DISTANCE)

measureClient.registerMeasureCallback(DataType.HEART_RATE_BPM, heartRateCallback)
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `DeltaDataType` | subtype of `DataType` | Granular, non-aggregated point-in-time measurements, mapping to `SampleDataPoint` (instantaneous, e.g. `HEART_RATE_BPM`) or `IntervalDataPoint` (delta since last update, e.g. `STEPS`, `CALORIES`, `DISTANCE`). |
| `AggregateDataType` | subtype of `DataType` | Aggregated data, mapping to `CumulativeDataPoint` (running total, e.g. `STEPS_TOTAL`) or `StatisticalDataPoint` (min/max/average). |

## Notes

- Required permission depends on the data type: `HEART_RATE_BPM` needs `READ_HEART_RATE` (or legacy `BODY_SENSORS`); step/calorie/distance-family types need `ACTIVITY_RECOGNITION`; `LOCATION` / `ABSOLUTE_ELEVATION` need `ACCESS_FINE_LOCATION`.
- This is the Wear OS Health Services API (Kotlin, `androidx.health.services.client.data`) — distinct from Health Connect.
- Package: `androidx.health.services.client.data`. Artifact: `androidx.health:health-services-client`.

## Related

- [DataPointContainer](./datapointcontainer.md)
- [HealthServicesPermissions](./healthservicespermissions.md)
- [ExerciseClient](./exerciseclient.md)
