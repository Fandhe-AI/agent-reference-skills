# ProximitySensor

Provides an interface for a proximity sensor to determine whether an object is detected nearby (for example, to turn the display off during a phone call).

## Signature / Usage

```csharp
using Windows.Devices.Sensors;

ProximitySensor sensor = ProximitySensor.GetDefault();
if (sensor != null)
{
    sensor.ReadingChanged += (s, e) =>
    {
        ProximitySensorReading reading = e.Reading;
        bool detected = reading.IsDetected;
        uint? distanceMm = reading.DistanceInMillimeters;
    };

    // Optionally let the sensor auto-control the display.
    var displayController = sensor.CreateDisplayOnOffController();
}
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `MaxDistanceInMillimeters` | `uint?` | Largest distance where the sensor can detect an object. |
| `MinDistanceInMillimeters` | `uint?` | Shortest distance where the sensor can detect an object. |
| `DeviceId` | `string` | Device identifier. |

### Key methods

| Name | Description |
|------|-------------|
| `FromId(string)` | Obtains the proximity sensor from its device identifier. |
| `GetCurrentReading()` | Gets the current reading synchronously. |
| `GetDeviceSelector()` | Gets the AQS device selector for use with `DeviceInformation`. |
| `CreateDisplayOnOffController()` | Creates a controller that turns the display on/off based on sensor readings. |
| `GetReadingsFromTriggerDetails(SensorDataThresholdTriggerDetails)` | Gets readings delivered to a background task. |

### Events

| Name | Description |
|------|-------------|
| `ReadingChanged` | Occurs each time the sensor reports a new value. |

## Notes

- Namespace: `Windows.Devices.Sensors` (WinRT/UWP). Distinct from Android `Sensor.TYPE_PROXIMITY` and Apple `UIDevice.proximityState`.

## Related

- [LightSensor](./light-sensor.md)
