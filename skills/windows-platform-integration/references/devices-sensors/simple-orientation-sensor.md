# SimpleOrientationSensor

Represents a simple orientation sensor that detects the current quadrant orientation of the device (rotated 0/90/180/270 degrees) as well as its face-up or face-down status.

## Signature / Usage

```csharp
using Windows.Devices.Sensors;

SimpleOrientationSensor sensor = SimpleOrientationSensor.GetDefault();
if (sensor != null)
{
    SimpleOrientation current = sensor.GetCurrentOrientation();
    sensor.OrientationChanged += (s, e) =>
    {
        SimpleOrientation orientation = e.Orientation;
    };
}
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `ReadingTransform` | `DisplayOrientations` | Transformation applied to align sensor data with display orientation. |
| `DeviceId` | `string` | Device identifier used with `FromIdAsync`. |

### Key methods

| Name | Description |
|------|-------------|
| `GetDefault()` | Returns the default simple orientation sensor, or `null`. |
| `GetCurrentOrientation()` | Gets the current orientation synchronously. |
| `FromIdAsync(string)` | Obtains the sensor asynchronously from its device identifier. |
| `GetDeviceSelector()` | Gets the AQS device selector for use with `DeviceInformation`. |

### Events

| Name | Description |
|------|-------------|
| `OrientationChanged` | Occurs each time the sensor reports a new orientation. |

### SimpleOrientation values

`NotRotated`, `Rotated90DegreesCounterclockwise`, `Rotated180DegreesCounterclockwise`, `Rotated270DegreesCounterclockwise`, `Faceup`, `Facedown`.

## Notes

- Namespace: `Windows.Devices.Sensors` (WinRT/UWP). Lighter-weight alternative to `OrientationSensor` when only coarse quadrant/face orientation is needed. Distinct from Android `Display.getRotation()` and Apple `UIDevice.orientation`.

## Related

- [OrientationSensor](./orientation-sensor.md)
- [Accelerometer](./accelerometer.md)
