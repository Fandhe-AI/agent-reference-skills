# Battery

Provides information about a battery controller currently connected to the device (the electronics interfacing between a physical battery and the OS), including charge, capacity, and status.

## Signature / Usage

```csharp
using Windows.Devices.Power;

// Aggregate of all battery controllers connected to the device.
Battery aggregateBattery = Battery.AggregateBattery;
BatteryReport report = aggregateBattery.GetReport();

int? percent = report.RemainingCapacityInMilliwattHours.HasValue &&
    report.FullChargeCapacityInMilliwattHours.HasValue
    ? (int)(100.0 * report.RemainingCapacityInMilliwattHours.Value / report.FullChargeCapacityInMilliwattHours.Value)
    : null;

aggregateBattery.ReportUpdated += (sender, args) =>
{
    BatteryReport updated = sender.GetReport();
};
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `AggregateBattery` | `Battery` (static) | A `Battery` object representing all battery controllers connected to the device. |
| `DeviceId` | `string` | Identifier for an individual battery controller. |

### Key methods

| Name | Description |
|------|-------------|
| `FromIdAsync(string)` | Gets a `Battery` object for an individual battery controller by ID. |
| `GetDeviceSelector()` | Gets an AQS string for finding all battery controllers connected to the device. |
| `GetReport()` | Gets a `BatteryReport` with charge, capacity, and status. |

### Events

| Name | Description |
|------|-------------|
| `ReportUpdated` | Occurs when the charge, capacity, or status of the battery changes. |

## Notes

- Namespace: `Windows.Devices.Power` (WinRT/UWP). Use `Battery.AggregateBattery` for a device-wide view; individual battery controllers may not be visible if the controller resides on the removable battery itself. Distinct from Android `BatteryManager` and Apple `UIDevice.batteryLevel`.
- For simple device-wide battery/power-supply status without per-controller detail, prefer `Windows.System.Power.PowerManager`.

## Related

- [PowerManager](./power-manager.md)
