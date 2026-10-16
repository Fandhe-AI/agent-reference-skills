# App Installer File APIs and Known API Issues

The `PackageManager` and `Package` classes in the Windows SDK provide methods to add or modify packages via App Installer files, or to retrieve information about apps with an App Installer association.

## Signature / Usage

```csharp
PackageManager pm = new PackageManager();
Package currentPackage = pm.FindPackageForUser(string.Empty, Package.Current.Id.FullName);
PackageUpdateAvailabilityResult apiResult = await currentPackage.CheckUpdateAvailabilityAsync();

if (apiResult.Availability == PackageUpdateAvailability.Error)
{
    Logger.Error($"Error occurred, extended code: {apiResult.ExtendedError}");
}
```

## Options / Props

| Method | Description | Minimum supported release |
| --- | --- | --- |
| `PackageManager.AddPackageByAppInstallerFileAsync` | Installs single or multiple app packages with an `.appinstaller` file. | Windows 10 version 1709 (build 16299) |
| `PackageManager.RequestAddPackageByAppInstallerFileAsync` | Installs single or multiple app packages with an `.appinstaller` file. | Windows 10 version 1709 (build 16299) |
| `Package.GetAppInstallerInfo` | Returns the `.appinstaller` XML file location. | Windows 10 version 1809 (build 17763) |
| `Package.CheckUpdateAvailabilityAsync` | Checks for updates to the main package listed in the `.appinstaller` file and whether updates are required by `.appinstaller` policy. Currently only works for apps installed via `.appinstaller` files. | Windows 10 version 1809 (build 17763) |

## Notes

- An app that runs in an AppContainer must declare the `packageManagement` restricted capability to call `AddPackageByAppInstallerFileAsync` or `RequestAddPackageByAppInstallerFileAsync`. For callers outside an AppContainer, authorization depends on process integrity level and Windows version; before Windows 11 version 24H2, the caller's package identity and publisher can also affect authorization.
- Known issue: `AddPackageByAppInstallerFileAsync`, `RequestAddPackageByAppInstallerFileAsync`, and `CheckUpdateAvailabilityAsync` are not supported in JavaScript. Workaround: create a Windows Runtime component that calls these methods and call it from the JavaScript UWP app (the C# `UpdateAvailabilityChecker.CheckForUpdatesAsync` component above is called from JavaScript as `CSRuntimeComponent.UpdateAvailabilityChecker.checkForUpdatesAsync()`).

## Related

- [Code-driven update for non-Store apps](./non-store-code-driven-update.md)
- [App Installer file overview](./app-installer-file-overview.md)
