# Update Non-Store Published Apps from Your Code

MSIX apps shipped outside the Store can programmatically check for and apply updates. How depends on whether the package is deployed with an App Installer file.

## Signature / Usage

Declare the restricted capability in the manifest when required:

```xml
<Package>
...
  <Capabilities>
    <rescap:Capability Name="packageManagement" />
  </Capabilities>
...
</Package>
```

With an App Installer file:

```csharp
PackageManager pm = new PackageManager();
Package package = pm.FindPackageForUser(string.Empty, targetPackageFullName);

PackageUpdateAvailabilityResult result = await package.CheckUpdateAvailabilityAsync();
switch (result.Availability)
{
    case PackageUpdateAvailability.Available:
    case PackageUpdateAvailability.Required:
        await pm.AddPackageByAppInstallerFileAsync(
            new Uri("https://trial3.azurewebsites.net/HRApp/HRApp.appinstaller"),
            AddPackageByAppInstallerOptions.ForceApplicationShutdown,
            packageVolume);
        break;
}
```

Without an App Installer file (after your own server version check; this example forces the running app to shut down):

```csharp
PackageManager packagemanager = new PackageManager();
await packagemanager.AddPackageAsync(
    new Uri("https://trial3.azurewebsites.net/HRApp/HRApp.msix"),
    null,
    DeploymentOptions.ForceApplicationShutdown);
```

## Options / Props

`packageManagement` requirement for a process running in an AppContainer:

| Operation | Requirement |
| --- | --- |
| Add, update, stage, or remove packages with non-`Request*` `PackageManager` APIs (e.g. `AddPackageAsync`, `AddPackageByAppInstallerFileAsync`) | Required |
| `RequestAddPackageByAppInstallerFileAsync` | Required, even though the API displays a user-consent prompt |
| Update the app's own packages with `RequestAddPackageAsync` | Not required; Windows performs a SmartScreen check and asks the user to verify |
| Manage a package with a different publisher than the caller | Required |

## Notes

- AppContainer processes are subject to the capability: all UWP apps, and packaged desktop apps with `uap10:TrustLevel="appContainer"`. Processes outside an AppContainer (medium integrity or higher, e.g. most unpackaged and packaged desktop apps) don't need it; user permissions and per-API requirements still apply.
- If deploying with an App Installer file, code-driven updates must use the App Installer file APIs so regular App Installer updates keep working; check availability with `Package.CheckUpdateAvailabilityAsync`.
- Without an App Installer file, the source page only states "The update will be applied the next time your app is shut down" (also works for an optional package if the main package is installed); it does not tie this to `DeploymentOptions.None`. Updating a package that is in use without a force-shutdown option can fail with `ERROR_PACKAGES_IN_USE` (`0x80073D02`). To defer registration, pass `AddPackageOptions` with `DeferRegistrationWhenPackagesAreInUse = true` to `PackageManager.AddPackageByUriAsync` (on Windows 11 24H2 and later the manifest element `uap17:UpdateWhileInUse` with value `defer` also works; it takes precedence over force-shutdown options). Source: https://learn.microsoft.com/en-us/windows/msix/msix-troubleshooting-guide
- `DeploymentOptions.ForceApplicationShutdown` / `AddPackageByAppInstallerOptions.ForceApplicationShutdown` shut down the running target app, so unsaved work can be lost. Before calling, confirm with the user that they have saved and can close the app; for non-UWP apps call `RegisterApplicationRestart` first. The source page's "applied the next time your app is shut down" text describes the default behavior, while its sample uses a forced-shutdown option, which closes the app immediately.
- Restart after update: for UWP apps, `AddPackageByAppInstallerOptions.ForceApplicationShutdown` or `AddPackageOptions.ForceTargetAppShutdown` schedules a restart after shutdown plus update. For non-UWP apps call `RegisterApplicationRestart` (kernel32, `RegisterApplicationRestart(string pwzCommandLine, RestartFlags dwFlags)`) before the app begins shutting down.
- The source page's sample passes `AddPackageOptions.ForceApplicationShutdown`, which does not exist; `AddPackageAsync(Uri, IEnumerable<Uri>, DeploymentOptions)` takes `DeploymentOptions` (`AddPackageOptions` is the options class used with `AddPackageByUriAsync`). `AddPackageOptions.ForceTargetAppShutdown` is a property (`AddPackageOptions.ForceTargetAppShutdown = true`), not an enum value.
- Flags for `RegisterApplicationRestart`: `NONE = 0`, `RESTART_NO_CRASH = 1`, `RESTART_NO_HANG = 2`, `RESTART_NO_PATCH = 4`, `RESTART_NO_REBOOT = 8`.
- Source: https://learn.microsoft.com/en-us/windows/msix/non-store-developer-updates

## Related

- [App Installer file APIs](./app-installer-file-apis.md)
- [Store package code-driven update](./store-package-code-driven-update.md)
- [Auto-update and repair apps](./app-installer-auto-update-repair.md)
