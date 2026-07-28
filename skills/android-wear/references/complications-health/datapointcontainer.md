# DataPointContainer / SampleDataPoint / IntervalDataPoint

Container delivered by `MeasureCallback.onDataReceived` / `PassiveListenerCallback.onNewDataPointsReceived`, holding type-safe access to the individual `DataPoint`s received for each `DataType`.

## Signature / Usage

```kotlin
class DataPointContainer(internal val dataPoints: Map<DataType<*, *>, List<DataPoint<*>>>) {
    val dataTypes: Set<DataType<*, *>>
    val sampleDataPoints: List<SampleDataPoint<*>>
    val intervalDataPoints: List<IntervalDataPoint<*>>

    fun <T : Any, D : DataPoint<T>> getData(type: DeltaDataType<T, D>): List<D>
    fun <T : Number, D : DataPoint<T>> getData(type: AggregateDataType<T, D>): D?
}

class SampleDataPoint<T : Any>(
    val dataType: DataType<T, SampleDataPoint<T>>,
    val value: T,
    val timeDurationFromBoot: Duration,
    val accuracy: DataPointAccuracy? = null,
) : DataPoint<T>

class IntervalDataPoint<T : Any>(
    override val dataType: DataType<T, out IntervalDataPoint<T>>,
    val value: T,
    val startDurationFromBoot: Duration,
    val endDurationFromBoot: Duration,
    val accuracy: DataPointAccuracy? = null,
) : DataPoint<T>
```

```kotlin
override fun onDataReceived(data: DataPointContainer) {
    val heartRateSamples = data.getData(DataType.HEART_RATE_BPM) // List<SampleDataPoint<Double>>
    val latestBpm = heartRateSamples.lastOrNull()?.value
}
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `getData(DeltaDataType)` | `List<D>` | `emptyList()` | All data points received for the given delta type since the last callback. |
| `getData(AggregateDataType)` | `D?` | `null` | Most recent aggregate data point for the given type, if present. |
| `SampleDataPoint.timeDurationFromBoot` | `Duration` | — | Boot-relative timestamp; convert with `getTimeInstant(bootInstant)`. |
| `IntervalDataPoint.startDurationFromBoot` / `endDurationFromBoot` | `Duration` | — | Boot-relative start/end of the delta interval. |

## Notes

- Convert boot-relative durations to wall-clock time: `Instant.ofEpochMilli(System.currentTimeMillis() - SystemClock.elapsedRealtime())`, then `dataPoint.getStartInstant(bootInstant)` / `getEndInstant(bootInstant)`.
- This is the Wear OS Health Services API (Kotlin, `androidx.health.services.client.data`) — distinct from Health Connect.
- Package: `androidx.health.services.client.data`. Artifact: `androidx.health:health-services-client`.

## Related

- [DataType](./datatype.md)
- [MeasureClient](./measureclient.md)
- [PassiveMonitoringClient](./passivemonitoringclient.md)
