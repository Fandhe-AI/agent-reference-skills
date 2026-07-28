# PowerManager

Static class providing access to a device's aggregate battery and power-supply status: battery status, energy saver status, power supply status, and remaining charge/discharge time.

## Signature / Usage

```csharp
using Windows.System.Power;

BatteryStatus batteryStatus = PowerManager.BatteryStatus;
EnergySaverStatus saverStatus = PowerManager.EnergySaverStatus;
PowerSupplyStatus supplyStatus = PowerManager.PowerSupplyStatus;
int chargePercent = PowerManager.RemainingChargePercent;

PowerManager.RemainingChargePercentChanged += (sender, obj) =>
{
    int percent = PowerManager.RemainingChargePercent;
};
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `BatteryStatus` | `BatteryStatus` (static) | Device's battery status (`NotPresent`, `Discharging`, `Idle`, `Charging`). |
| `EnergySaverStatus` | `EnergySaverStatus` (static) | Battery saver status indicating when the app should save energy. |
| `PowerSupplyStatus` | `PowerSupplyStatus` (static) | Whether the device is powered externally (`NotPresent`, `Inadequate`, `Adequate`). |
| `RemainingChargePercent` | `int` (static) | Total percentage of charge remaining across all batteries. |
| `RemainingDischargeTime` | `TimeSpan` (static) | Total runtime remaining from all connected batteries. |

### Events (all static)

| Name | Description |
|------|-------------|
| `BatteryStatusChanged` | Occurs when `BatteryStatus` changes. |
| `EnergySaverStatusChanged` | Occurs when `EnergySaverStatus` changes. |
| `PowerSupplyStatusChanged` | Occurs when `PowerSupplyStatus` changes. |
| `RemainingChargePercentChanged` | Occurs when `RemainingChargePercent` changes. |
| `RemainingDischargeTimeChanged` | Occurs when `RemainingDischargeTime` changes. |

## Notes

- Namespace: `Windows.System.Power` (WinRT/UWP) — note this is a different namespace from `Windows.Devices.Power.Battery`. `PowerManager` is a static class (no instances); all members are accessed directly on the type. Distinct from Android `PowerManager`/`BatteryManager` and Apple `UIDevice`/`ProcessInfo.thermalState`.
- For per-battery-controller detail (multiple batteries, individual reports), use `Windows.Devices.Power.Battery` instead.

## Related

- [Battery](./battery.md)
