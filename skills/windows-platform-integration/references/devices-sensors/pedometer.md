# Pedometer

Provides an interface for a pedometer to measure the number of steps taken, broken down by step kind (walking, running, unknown).

## Signature / Usage

```csharp
using Windows.Devices.Sensors;

Pedometer pedometer = await Pedometer.GetDefaultAsync();
if (pedometer != null)
{
    pedometer.ReportInterval = Math.Max(pedometer.MinimumReportInterval, 1000);
    pedometer.ReadingChanged += (s, e) =>
    {
        PedometerReading reading = e.Reading;
        ulong steps = reading.CumulativeSteps;
        PedometerStepKind kind = reading.StepKind;
    };
}
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `ReportInterval` | `uint` | Gets or sets the current report interval, in milliseconds. |
| `MinimumReportInterval` | `uint` | Smallest report interval supported. |
| `PowerInMilliwatts` | `double` | Power the sensor consumes. |
| `DeviceId` | `string` | Device identifier. |

### Key methods

| Name | Description |
|------|-------------|
| `GetDefaultAsync()` | Asynchronously obtains the default pedometer. |
| `GetCurrentReadings()` | Gets the current step counts per `PedometerStepKind`. |
| `FromIdAsync(string)` | Obtains the pedometer asynchronously from its device identifier. |
| `GetDeviceSelector()` | Gets the AQS device selector for use with `DeviceInformation`. |
| `GetSystemHistoryAsync(DateTimeOffset)` / `GetSystemHistoryAsync(DateTimeOffset, TimeSpan)` | Retrieves historical pedometer readings. |
| `GetReadingsFromTriggerDetails(SensorDataThresholdTriggerDetails)` | Gets readings delivered to a background task. |

### Events

| Name | Description |
|------|-------------|
| `ReadingChanged` | Occurs each time the pedometer reports a new value. |

## Notes

- Namespace: `Windows.Devices.Sensors` (WinRT/UWP). Not supported in JavaScript apps. Distinct from Android `Sensor.TYPE_STEP_COUNTER` and Apple `CMPedometer`.

## Related

- [ActivitySensor](./activity-sensor.md)
