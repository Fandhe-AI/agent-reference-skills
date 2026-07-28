# Optimize background activity

Managing background timers, threads, and power-aware behavior in a Windows App SDK desktop app (which is not subject to UWP's background execution restrictions).

## Signature / Usage

```csharp
var energySaverStatus = Windows.System.Power.PowerManager.EnergySaverStatus;

if (energySaverStatus == Windows.System.Power.EnergySaverStatus.On)
{
    DisableNonEssentialUpdates();
}
```

## Options / Props

| API | Purpose |
|-----|---------|
| `Windows.System.Power.PowerManager.BatteryStatus` / `EnergySaverStatus` | Query current battery/energy-saver state to adapt background work |
| `DispatcherTimer` / `System.Threading.Timer` | Timer-based scheduling preferred over tight polling loops; adjust interval based on window activation state |
| `CancellationTokenSource` | Cancel background work (e.g. periodic sync loops) on app shutdown |
| `BackgroundTaskBuilder` (MSIX-packaged apps only) | System-triggered background tasks (network state, time zone, user presence) — same API surface as UWP |

## Notes

- Desktop Windows App SDK apps can run background threads freely and are not restricted the way UWP apps are, but should still reduce timer frequency/network polling when the window is deactivated or minimized to conserve battery.
- Cancel outstanding background work in the window's `Closed` event to avoid holding system resources after the app is no longer visible.
- Unpackaged desktop apps should use standard .NET threading patterns rather than `BackgroundTaskBuilder`, which requires MSIX package identity.
- `PowerManager` here is `Windows.System.Power.PowerManager`, distinct from any same-named power-management API in other frameworks — always fully qualify or note the namespace when referencing it.

## Related

- [Power consumption improvements](./power.md)
- [Manage app state effectively](./state-management.md)
