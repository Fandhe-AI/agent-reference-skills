# PowerManager

`PowerManager` (`Microsoft.Windows.System.Power`) provides static properties and events that give visibility into a device's power state (battery, power source, display, suspend/idle status), letting the app make resource-usage decisions. The API uses a callback model, reaching all app types including background/headless apps.

## Signature / Usage

```csharp
private EventRegistrationToken batteryToken;

private void RegisterPowerManagerCallbacks()
{
    batteryToken = PowerManager.BatteryStatusChanged += (s, e) => OnBatteryStatusChanged();
}

private void OnBatteryStatusChanged()
{
    BatteryStatus batteryStatus = PowerManager.BatteryStatus;
    int remainingCharge = PowerManager.RemainingChargePercent;
    if (batteryStatus == BatteryStatus.Discharging && remainingCharge < 25)
    {
        PauseNonCriticalWork();
    }
}
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `BatteryStatus` | property → `BatteryStatus` | Current battery status (`Charging`, `Discharging`, `Idle`, `NotPresent`). |
| `DisplayStatus` | property → `DisplayStatus` | Current display status for the app's session (`On`, `Off`, `Dimmed`). |
| `EffectivePowerMode` / `EffectivePowerMode2` | property | Current effective power mode of the device. |
| `EnergySaverStatus` | property | Current battery saver state. |
| `PowerSourceKind` | property → `PowerSourceKind` | Current power source (`AC`, `DC`, etc.). |
| `PowerSupplyStatus` | property → `PowerSupplyStatus` | Current power supply adequacy status. |
| `RemainingChargePercent` | property → `int` | Remaining battery charge percentage. |
| `RemainingDischargeTime` | property | Remaining battery discharge time. |
| `SystemSuspendStatus` | property | Current device suspend status. |
| `UserPresenceStatus` | property | Current user presence status for the app's session. |
| `BatteryStatusChanged`, `DisplayStatusChanged`, `EffectivePowerModeChanged`, `EnergySaverStatusChanged`, `PowerSourceKindChanged`, `PowerSupplyStatusChanged`, `RemainingChargePercentChanged`, `RemainingDischargeTimeChanged`, `SystemIdleStatusChanged`, `SystemSuspendStatusChanged`, `UserPresenceStatusChanged` | events | Raised when the corresponding property changes; the app reads the associated property from the handler to determine the new value. |

## Notes

- Package: `Microsoft.Windows.System.Power` (Windows App SDK). All members are static; there is no instance to create.
- Apps typically register callbacks once at startup and keep them for the app's lifetime, but can register/unregister at any time.
- Combine multiple properties (e.g. `PowerSourceKind`, `BatteryStatus`, `RemainingChargePercent`, `PowerSupplyStatus`) when deciding whether to pause or resume power-intensive work — a single event firing does not always carry enough information alone.
- Unregister event handlers (`PowerManager.BatteryStatusChanged -= token`, etc.) when the app no longer needs power notifications for its full lifetime.

## Related

- [AppInstance](./app-instance.md)
- [Application](./application.md)
