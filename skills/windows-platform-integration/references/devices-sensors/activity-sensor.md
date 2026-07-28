# ActivitySensor

Represents a sensor that provides the current physical activity (still, walking, running, driving, etc.) and its confidence level.

## Signature / Usage

```csharp
using Windows.Devices.Sensors;

ActivitySensor sensor = await ActivitySensor.GetDefaultAsync();
if (sensor != null)
{
    sensor.ReadingChanged += (s, e) =>
    {
        ActivitySensorReading reading = e.Reading;
        ActivityType activity = reading.Activity;
        ActivitySensorReadingConfidence confidence = reading.Confidence;
    };
}
```

```xml
<!-- Package.appxmanifest -->
<Capabilities>
    <DeviceCapability Name="activity"/>
</Capabilities>
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `MinimumReportInterval` | `uint` | Smallest report interval supported. |
| `PowerInMilliwatts` | `double` | Power the sensor consumes. |
| `SupportedActivities` | `IVectorView<ActivityType>` | Activity types the sensor supports. |
| `SubscribedActivities` | `IVectorView<ActivityType>` | Activity types the sensor currently reports. |
| `DeviceId` | `string` | Device identifier. |

### Key methods

| Name | Description |
|------|-------------|
| `GetDefaultAsync()` | Asynchronously obtains the default activity sensor. |
| `GetCurrentReadingAsync()` | Asynchronously gets the current reading. |
| `FromIdAsync(string)` | Obtains the sensor asynchronously from its device identifier. |
| `GetDeviceSelector()` | Gets the AQS device selector for use with `DeviceInformation`. |
| `GetSystemHistoryAsync(DateTimeOffset)` / `GetSystemHistoryAsync(DateTimeOffset, TimeSpan)` | Retrieves historical readings. |

### Events

| Name | Description |
|------|-------------|
| `ReadingChanged` | Occurs each time the sensor reports a new reading. |

## Notes

- Namespace: `Windows.Devices.Sensors` (WinRT/UWP). Not supported in JavaScript apps. Requires the `activity` `DeviceCapability` declared in the app package manifest. Distinct from Android `ActivityRecognitionClient` and Apple `CMMotionActivityManager`.

## Related

- [Pedometer](./pedometer.md)
- [Device capabilities manifest declarations](./device-capabilities-manifest.md)
