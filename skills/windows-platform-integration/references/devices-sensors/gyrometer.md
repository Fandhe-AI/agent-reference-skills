# Gyrometer

Represents a gyrometer sensor that provides angular velocity readings with respect to the x, y, and z axes.

## Signature / Usage

```csharp
using Windows.Devices.Sensors;

Gyrometer gyrometer = Gyrometer.GetDefault();
if (gyrometer != null)
{
    gyrometer.ReportInterval = Math.Max(gyrometer.MinimumReportInterval, 16);
    gyrometer.ReadingChanged += (sender, e) =>
    {
        GyrometerReading reading = e.Reading;
        double vx = reading.AngularVelocityX;
        double vy = reading.AngularVelocityY;
        double vz = reading.AngularVelocityZ;
    };
}
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `ReportInterval` | `uint` | Gets or sets the current report interval, in milliseconds. |
| `MinimumReportInterval` | `uint` | Smallest report interval the gyrometer supports. |
| `ReadingTransform` | `DisplayOrientations` | Transformation applied to align sensor data with display orientation. |
| `ReportLatency` | `uint` | Delay between batches of sensor information. |
| `ReportThreshold` | `GyrometerDataThreshold` | Threshold configuration for the gyrometer. |
| `MaxBatchSize` | `int` | Maximum number of events the sensor can batch. |
| `DeviceId` | `string` | Device identifier. |

### Key methods

| Name | Description |
|------|-------------|
| `GetDefault()` | Returns the default gyrometer, or `null` if none is present. |
| `GetCurrentReading()` | Gets the current reading synchronously. |
| `FromIdAsync(string)` | Obtains the sensor asynchronously from its device identifier. |
| `GetDeviceSelector()` | Gets the AQS device selector for use with `DeviceInformation`. |

### Events

| Name | Description |
|------|-------------|
| `ReadingChanged` | Occurs each time the gyrometer reports a new sensor reading. |

## Notes

- Namespace: `Windows.Devices.Sensors` (WinRT/UWP). Distinct from Android `Sensor.TYPE_GYROSCOPE` and Apple `CMMotionManager.gyroData`.
- Sensor data is relative to the device's fixed sensor coordinate system and independent of display orientation; use `ReadingTransform` to compensate.

## Related

- [Accelerometer](./accelerometer.md)
- [Compass](./compass.md)
- [Inclinometer](./inclinometer.md)
- [OrientationSensor](./orientation-sensor.md)
