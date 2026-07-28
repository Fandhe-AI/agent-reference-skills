# MeasureClient

Registers live callbacks for frequently-sampled health data (e.g. heart rate) while the app is in the foreground. Not suitable for workout tracking — use `ExerciseClient` for that.

## Signature / Usage

```kotlin
public interface MeasureClient {
    public fun registerMeasureCallback(dataType: DeltaDataType<*, *>, callback: MeasureCallback)
    public fun registerMeasureCallback(
        dataType: DeltaDataType<*, *>,
        executor: Executor,
        callback: MeasureCallback,
    )
    public fun unregisterMeasureCallbackAsync(
        dataType: DeltaDataType<*, *>,
        callback: MeasureCallback,
    ): ListenableFuture<Void>
}

public interface MeasureCallback {
    fun onAvailabilityChanged(dataType: DeltaDataType<*, *>, availability: Availability)
    fun onDataReceived(data: DataPointContainer)
}
```

```kotlin
val healthClient = HealthServices.getClient(this /* context */)
val measureClient = healthClient.measureClient

val heartRateCallback = object : MeasureCallback {
    override fun onAvailabilityChanged(dataType: DeltaDataType<*, *>, availability: Availability) { }
    override fun onDataReceived(data: DataPointContainer) {
        val bpm = data.getData(DataType.HEART_RATE_BPM)
    }
}
measureClient.registerMeasureCallback(DataType.HEART_RATE_BPM, heartRateCallback)
// later
measureClient.unregisterMeasureCallbackAsync(DataType.HEART_RATE_BPM, heartRateCallback)
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `dataType` | `DeltaDataType<*, *>` | required | Single data type per callback, e.g. `DataType.HEART_RATE_BPM`. |
| `callback` | `MeasureCallback` | required | Receives `onDataReceived` / `onAvailabilityChanged`. Registering the same callback twice is a no-op. |
| `executor` | `Executor` | main thread | Optional executor overload for delivering callbacks off the main thread. |

## Notes

- Increases sensor sampling rate while registered; minimize registration duration to conserve battery.
- Check `measureClient.getCapabilitiesAsync()` for `supportedDataTypesMeasure` before registering.
- This is the Wear OS Health Services API (Kotlin, `androidx.health.services.client`) — distinct from Health Connect.
- Package: `androidx.health.services.client`. Artifact: `androidx.health:health-services-client`.

## Related

- [HealthServicesClient](./healthservicesclient.md)
- [DataType](./datatype.md)
- [DataPointContainer](./datapointcontainer.md)
