# Compass

Represents a compass sensor that returns a heading with respect to magnetic north and, on systems that support it, true north.

## Signature / Usage

```csharp
using Windows.Devices.Sensors;

Compass compass = Compass.GetDefault();
if (compass != null)
{
    compass.ReportInterval = Math.Max(compass.MinimumReportInterval, 16);
    compass.ReadingChanged += (sender, e) =>
    {
        CompassReading reading = e.Reading;
        double magneticNorth = reading.HeadingMagneticNorth;
        double? trueNorth = reading.HeadingTrueNorth;
    };
}
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `ReportInterval` | `uint` | Gets or sets the current report interval, in milliseconds. |
| `MinimumReportInterval` | `uint` | Smallest report interval the compass supports. |
| `ReadingTransform` | `DisplayOrientations` | Transformation applied to align sensor data with display orientation. |
| `ReportLatency` | `uint` | Delay between batches of sensor information. |
| `ReportThreshold` | `CompassDataThreshold` | Threshold configuration for the compass. |
| `MaxBatchSize` | `int` | Maximum number of events the sensor can batch. |
| `DeviceId` | `string` | Device identifier. |

### Key methods

| Name | Description |
|------|-------------|
| `GetDefault()` | Returns the default compass, or `null` if none is present. |
| `GetCurrentReading()` | Gets the current reading synchronously. |
| `FromIdAsync(string)` | Obtains the sensor asynchronously from its device identifier. |
| `GetDeviceSelector()` | Gets the AQS device selector for use with `DeviceInformation`. |

### Events

| Name | Description |
|------|-------------|
| `ReadingChanged` | Occurs each time the compass reports a new sensor reading. |

## Notes

- Namespace: `Windows.Devices.Sensors` (WinRT/UWP). Distinct from Android `Sensor.TYPE_MAGNETIC_FIELD` and Apple `CLLocationManager` heading APIs.
- `HeadingTrueNorth` may be `null` if true-north data is unavailable on the system; always null-check before use.

## Related

- [Accelerometer](./accelerometer.md)
- [Gyrometer](./gyrometer.md)
- [Inclinometer](./inclinometer.md)
- [OrientationSensor](./orientation-sensor.md)
