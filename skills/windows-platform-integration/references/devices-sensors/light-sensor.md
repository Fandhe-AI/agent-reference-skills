# LightSensor

Represents an ambient-light sensor that provides the ambient-light reading as a lux value.

## Signature / Usage

```csharp
using Windows.Devices.Sensors;

LightSensor sensor = LightSensor.GetDefault();
if (sensor != null)
{
    sensor.ReportInterval = Math.Max(sensor.MinimumReportInterval, 16);
    sensor.ReadingChanged += (s, e) =>
    {
        float lux = e.Reading.IlluminanceInLux;
    };
}
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `ReportInterval` | `uint` | Gets or sets the current report interval, in milliseconds. |
| `MinimumReportInterval` | `uint` | Smallest report interval supported. |
| `ReportLatency` | `uint` | Delay between batches of sensor information. |
| `ReportThreshold` | `LightSensorDataThreshold` | Threshold configuration for the sensor. |
| `MaxBatchSize` | `int` | Maximum number of events the sensor can batch. |
| `DeviceId` | `string` | Device identifier. |

### Key methods

| Name | Description |
|------|-------------|
| `GetDefault()` | Returns the default ambient-light sensor, or `null`. |
| `GetCurrentReading()` | Gets the current reading synchronously. |
| `FromIdAsync(string)` | Obtains the sensor asynchronously from its device identifier. |
| `GetDeviceSelector()` | Gets the AQS device selector for use with `DeviceInformation`. |
| `IsChromaticitySupported()` | Returns whether the device supports chromaticity data. |

### Events

| Name | Description |
|------|-------------|
| `ReadingChanged` | Occurs each time the sensor reports a new reading. |

## Notes

- Namespace: `Windows.Devices.Sensors` (WinRT/UWP). Distinct from Android `Sensor.TYPE_LIGHT` and Apple `AVCaptureDevice` brightness APIs.

## Related

- [Accelerometer](./accelerometer.md)
- [ProximitySensor](./proximity-sensor.md)
