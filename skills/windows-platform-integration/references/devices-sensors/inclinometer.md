# Inclinometer

Represents an inclinometer sensor that provides pitch, roll, and yaw values corresponding to rotation angles around the x, y, and z axes respectively.

## Signature / Usage

```csharp
using Windows.Devices.Sensors;

Inclinometer inclinometer = Inclinometer.GetDefault();
if (inclinometer != null)
{
    inclinometer.ReportInterval = Math.Max(inclinometer.MinimumReportInterval, 16);
    inclinometer.ReadingChanged += (sender, e) =>
    {
        InclinometerReading reading = e.Reading;
        double pitch = reading.PitchDegrees;
        double roll = reading.RollDegrees;
        double yaw = reading.YawDegrees;
    };
}
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `ReportInterval` | `uint` | Gets or sets the current report interval, in milliseconds. |
| `MinimumReportInterval` | `uint` | Smallest report interval the inclinometer supports. |
| `ReadingType` | `SensorReadingType` | Absolute or relative reading type. |
| `ReadingTransform` | `DisplayOrientations` | Transformation applied to align sensor data with display orientation. |
| `ReportLatency` | `uint` | Delay between batches of sensor information. |
| `ReportThreshold` | `InclinometerDataThreshold` | Threshold configuration for the inclinometer. |
| `MaxBatchSize` | `int` | Maximum number of events the sensor can batch. |
| `DeviceId` | `string` | Device identifier. |

### Key methods

| Name | Description |
|------|-------------|
| `GetDefault()` | Returns the default inclinometer for absolute readings, or `null`. |
| `GetDefault(SensorReadingType)` | Returns the default inclinometer for the given reading type. |
| `GetDefaultForRelativeReadings()` | Returns the default inclinometer for relative readings. |
| `GetCurrentReading()` | Gets the current reading synchronously. |
| `FromIdAsync(string)` | Obtains the sensor asynchronously from its device identifier. |
| `GetDeviceSelector(SensorReadingType)` | Gets the AQS device selector for use with `DeviceInformation`. |

### Events

| Name | Description |
|------|-------------|
| `ReadingChanged` | Occurs each time the inclinometer reports a new sensor reading. |

## Notes

- Namespace: `Windows.Devices.Sensors` (WinRT/UWP).
- Sensor data is relative to the device's fixed sensor coordinate system and independent of display orientation; use `ReadingTransform` to compensate.

## Related

- [Accelerometer](./accelerometer.md)
- [Gyrometer](./gyrometer.md)
- [Compass](./compass.md)
- [OrientationSensor](./orientation-sensor.md)
