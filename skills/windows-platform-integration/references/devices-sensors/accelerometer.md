# Accelerometer

Represents an accelerometer sensor that returns G-force readings with respect to the x, y, and z axes.

## Signature / Usage

```csharp
using Windows.Devices.Sensors;

Accelerometer accelerometer = Accelerometer.GetDefault();
if (accelerometer != null)
{
    accelerometer.ReportInterval = Math.Max(accelerometer.MinimumReportInterval, 16);
    accelerometer.ReadingChanged += (sender, e) =>
    {
        AccelerometerReading reading = e.Reading;
        double x = reading.AccelerationX;
        double y = reading.AccelerationY;
        double z = reading.AccelerationZ;
    };
}
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `ReportInterval` | `uint` | Gets or sets the current report interval, in milliseconds. |
| `MinimumReportInterval` | `uint` | Smallest report interval the accelerometer supports. |
| `ReadingType` | `AccelerometerReadingType` | Type of accelerometer sensor represented (Standard or Linear). |
| `ReadingTransform` | `DisplayOrientations` | Transformation applied to align sensor data with display orientation. |
| `ReportLatency` | `uint` | Delay between batches of sensor information. |
| `ReportThreshold` | `AccelerometerDataThreshold` | Threshold configuration for the accelerometer. |
| `MaxBatchSize` | `int` | Maximum number of events the sensor can batch. |
| `DeviceId` | `string` | Device identifier. |

### Key methods

| Name | Description |
|------|-------------|
| `GetDefault()` | Returns the default accelerometer, or `null` if none is present. |
| `GetDefault(AccelerometerReadingType)` | Returns the default accelerometer of the specified reading type. |
| `GetCurrentReading()` | Gets the current reading synchronously. |
| `FromIdAsync(string)` | Obtains the sensor asynchronously from its device identifier. |
| `GetDeviceSelector(AccelerometerReadingType)` | Gets the AQS device selector for use with `DeviceInformation`. |

### Events

| Name | Description |
|------|-------------|
| `ReadingChanged` | Occurs each time the accelerometer reports a new reading. |
| `Shaken` | Occurs when the accelerometer detects the device has been shaken. |

## Notes

- Namespace: `Windows.Devices.Sensors` (WinRT/UWP). Distinct from Android `SensorManager`/`Sensor.TYPE_ACCELEROMETER` and Apple `CMMotionManager.accelerometerData`.
- `GetDefault()` returns `null` if the device has no integrated accelerometer — always null-check before use.
- Sensor data is relative to the device's fixed sensor coordinate system and independent of display orientation; use `ReadingTransform` to compensate for the current display orientation when driving on-screen visuals.

## Related

- [Gyrometer](./gyrometer.md)
- [Compass](./compass.md)
- [Inclinometer](./inclinometer.md)
- [OrientationSensor](./orientation-sensor.md)
