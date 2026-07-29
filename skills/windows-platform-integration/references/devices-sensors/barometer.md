# Barometer

Provides an interface for a barometric sensor to measure atmospheric (station) pressure, reported in hectopascals.

## Signature / Usage

```csharp
using Windows.Devices.Sensors;

Barometer barometer = Barometer.GetDefault();
if (barometer != null)
{
    barometer.ReportInterval = Math.Max(barometer.MinimumReportInterval, 16);
    barometer.ReadingChanged += (sender, e) =>
    {
        BarometerReading reading = e.Reading;
        double pressure = reading.StationPressureInHectopascals;
    };
}
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `ReportInterval` | `uint` | Gets or sets the current report interval, in milliseconds. |
| `MinimumReportInterval` | `uint` | Smallest report interval the barometer supports. |
| `ReportLatency` | `uint` | Delay between batches of sensor information. |
| `ReportThreshold` | `BarometerDataThreshold` | Threshold configuration for the barometer. |
| `MaxBatchSize` | `uint` | Maximum number of events the sensor can batch. |
| `DeviceId` | `string` | Device identifier. |

### Key methods

| Name | Description |
|------|-------------|
| `GetDefault()` | Returns the default barometer, or `null` if none is present. |
| `FromIdAsync(string)` | Obtains the sensor asynchronously from its device identifier. |
| `GetCurrentReading()` | Gets the current reading synchronously. |
| `GetDeviceSelector()` | Gets the AQS device selector for use with `DeviceInformation`. |

### Events

| Name | Description |
|------|-------------|
| `ReadingChanged` | Occurs each time the barometer reports a new reading. |

### BarometerReading properties

| Name | Type | Description |
|------|------|-------------|
| `StationPressureInHectopascals` | `double` | Barometric (station) pressure determined by the sensor. |
| `PerformanceCount` | `TimeSpan?` (`IReference<TimeSpan>`) | Performance counter value for correlating with other sensor readings; `null` if not supported on the sensor. |
| `Properties` | `IMapView<string, object>` | Additional data properties reported by the sensor. |
| `Timestamp` | `DateTimeOffset` | Time of the most recent barometer reading. |

## Notes

- Namespace: `Windows.Devices.Sensors` (WinRT/UWP). `StationPressureInHectopascals` is the raw local station pressure, not sea-level-adjusted pressure — apps that want sea-level pressure must adjust for altitude themselves.
- `GetDefault()` returns `null` if the device has no barometer — always null-check before use.
- Documented alongside the other motion/environment sensors on the official Sensors hub page.

## Related

- [Altimeter](./altimeter.md)
- [Accelerometer](./accelerometer.md)
