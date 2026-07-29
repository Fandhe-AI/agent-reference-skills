# Altimeter

Provides an interface for an altimetric sensor to measure the relative altitude, reported in meters of altitude change since the sensor was created.

## Signature / Usage

```csharp
using Windows.Devices.Sensors;

Altimeter altimeter = Altimeter.GetDefault();
if (altimeter != null)
{
    altimeter.ReportInterval = Math.Max(altimeter.MinimumReportInterval, 16);
    altimeter.ReadingChanged += (sender, e) =>
    {
        AltimeterReading reading = e.Reading;
        double altitudeChange = reading.AltitudeChangeInMeters;
    };
}
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `ReportInterval` | `uint` | Gets or sets the current report interval, in milliseconds. |
| `MinimumReportInterval` | `uint` | Smallest report interval the altimeter supports. |
| `ReportLatency` | `uint` | Delay between batches of sensor information. |
| `MaxBatchSize` | `int` | Maximum number of events the sensor can batch. |
| `DeviceId` | `string` | Device identifier. |

### Key methods

| Name | Description |
|------|-------------|
| `GetDefault()` | Returns the default altimeter, or `null` if none is present. |
| `GetCurrentReading()` | Gets the current reading synchronously. |

### Events

| Name | Description |
|------|-------------|
| `ReadingChanged` | Occurs each time the altimeter reports a new reading. |

### AltimeterReading properties

| Name | Type | Description |
|------|------|-------------|
| `AltitudeChangeInMeters` | `float` | Altitude change, in meters, determined by the altimeter sensor. |
| `PerformanceCount` | `ulong` | Performance counter value for correlating with other sensor readings. |
| `Properties` | `IMapView<string, object>` | Additional data properties reported by the sensor. |
| `Timestamp` | `DateTimeOffset` | Time of the most recent altimeter reading. |

## Notes

- Namespace: `Windows.Devices.Sensors` (WinRT/UWP). `AltitudeChangeInMeters` is a relative change since the sensor object was created, not an absolute altitude above sea level — combine with `Barometer`/GPS data for absolute altitude estimates.
- `GetDefault()` returns `null` if the device has no altimeter — always null-check before use.
- Documented alongside the other motion/environment sensors on the official Sensors hub page.

## Related

- [Barometer](./barometer.md)
- [Accelerometer](./accelerometer.md)
- [ActivitySensor](./activity-sensor.md)
