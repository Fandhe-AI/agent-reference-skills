# AppDiagnosticInfo

Contains APIs for getting basic diagnostic information (running state, resource usage) for all running apps, and for launching an app associated with a diagnostic info instance.

## Signature / Usage

```csharp
IReadOnlyList<AppDiagnosticInfo> infos = await AppDiagnosticInfo.RequestInfoAsync();
foreach (var info in infos)
{
    var groups = info.GetResourceGroups();
    foreach (var group in groups)
    {
        // group exposes memory/energy usage reports for the app instance
    }
}

// Relaunch an app from its diagnostic info
await infos[0].LaunchAsync();
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `RequestInfoAsync()` | static method | Returns `AppDiagnosticInfo` for all running apps that have a package family name. |
| `RequestInfoForAppAsync()` / `RequestInfoForAppAsync(String)` | static method | Returns info for all running instances of the current app, or of a specified app. |
| `RequestInfoForPackageAsync(String)` | static method | Returns info for all instances of the specified package. |
| `RequestAccessAsync()` | static method | Requests user consent to access diagnostic information (requires the `appDiagnostics` capability). |
| `AppInfo` | property | The app's package family name and package-relative app name. |
| `GetResourceGroups()` | method | Gets memory/energy usage diagnostics for each resource group of the app. |
| `LaunchAsync()` | method | Launches the app associated with this diagnostic info. |
| `CreateWatcher()` / `CreateResourceGroupWatcher()` | method | Creates a watcher that raises notifications when the app's/resource group's execution state changes. |

## Notes

- Namespace: `Windows.System` (WinRT), introduced Windows 10 Creators Update (1703/15063); requires the `appDiagnostics` [app capability](https://aka.ms/appcap) declared in the manifest, plus user consent via `RequestAccessAsync`.
- Useful for building "running apps" dashboards, task-switcher-like UI, or programmatically restarting a companion app.

## Related

- [Launcher](./launcher.md)
- [StartupTask](./startup-task.md)
