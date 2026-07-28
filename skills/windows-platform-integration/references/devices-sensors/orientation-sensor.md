# OrientationSensor

Represents an orientation sensor that returns a rotation matrix and a quaternion, typically used to adjust perspective in game and 3D applications.

## Signature / Usage

```csharp
using Windows.Devices.Sensors;

OrientationSensor sensor = OrientationSensor.GetDefault();
if (sensor != null)
{
    sensor.ReportInterval = Math.Max(sensor.MinimumReportInterval, 16);
    sensor.ReadingChanged += (s, e) =>
    {
        OrientationSensorReading reading = e.Reading;
        SensorQuaternion q = reading.Quaternion;
        SensorRotationMatrix m = reading.RotationMatrix;
    };
}
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `ReportInterval` | `uint` | Gets or sets the current report interval, in milliseconds. |
| `MinimumReportInterval` | `uint` | Smallest report interval supported. |
| `ReadingType` | `SensorReadingType` | Absolute or relative reading type. |
| `ReadingTransform` | `DisplayOrientations` | Transformation applied to align sensor data with display orientation. |
| `ReportLatency` | `uint` | Delay between batches of sensor information. |
| `MaxBatchSize` | `int` | Maximum number of events the sensor can batch. |
| `DeviceId` | `string` | Device identifier. |

### Key methods

| Name | Description |
|------|-------------|
| `GetDefault()` | Returns the default orientation sensor for absolute readings, or `null`. |
| `GetDefault(SensorReadingType)` | Returns the default sensor for the given reading type, considering accuracy preferences. |
| `GetDefault(SensorReadingType, SensorOptimizationGoal)` | Returns the default sensor considering both power and accuracy preferences. |
| `GetDefaultForRelativeReadings()` | Returns the default orientation sensor for relative readings. |
| `GetCurrentReading()` | Gets the current reading synchronously. |
| `FromIdAsync(string)` | Obtains the sensor asynchronously from its device identifier. |
| `GetDeviceSelector(SensorReadingType)` | Gets the AQS device selector for use with `DeviceInformation`. |

### Events

| Name | Description |
|------|-------------|
| `ReadingChanged` | Occurs each time the orientation sensor reports a new reading. |

## Notes

- Namespace: `Windows.Devices.Sensors` (WinRT/UWP). Distinct from Android `Sensor.TYPE_ROTATION_VECTOR` and Apple `CMDeviceMotion.attitude`.

## Related

- [Accelerometer](./accelerometer.md)
- [Gyrometer](./gyrometer.md)
- [SimpleOrientationSensor](./simple-orientation-sensor.md)
