# PackageVolume

Sealed class that represents a package storage volume (a location where MSIX packages are installed). Namespace `Microsoft.Windows.Management.Deployment`.

## Signature / Usage

```csharp
using Microsoft.Windows.Management.Deployment;

// Enumerate all known volumes (Windows App SDK 1.5+)
foreach (PackageVolume volume in PackageVolume.FindPackageVolumes())
{
    if (volume.IsRepairNeeded())
    {
        // PackageVolume.Repair() requires admin privilege
    }
}

// 2.0-only members: guard with IsFeatureSupported
if (PackageVolume.IsFeatureSupported(PackageVolumeFeature.GetAvailableSpace))
{
    PackageVolume defaultVolume = PackageVolume.GetDefault();
    ulong freeBytes = await defaultVolume.GetAvailableSpaceAsync();
}
```

## Options / Props

Properties (read-only values as described on the official page):

| Name | Description |
|------|-------------|
| IsAppxInstallSupported | Whether APPX installing is supported. |
| IsFullTrustPackageSupported | Whether full-trust packages are supported. |
| IsSystemVolume | Whether the volume is an internal system volume mapped to the `%SYSTEMDRIVER%` environment variable. |
| MountPoint | Path of the last known volume mount point. |
| Name | Name of the package volume; the volume's media ID (see `System.VolumeId`). |
| PackageStorePath | Absolute path for the package store on the volume. |
| SupportsHardLinks | Whether the volume supports hard links in its file system. |

Methods:

| Name | Description |
|------|-------------|
| `static IList<PackageVolume> FindPackageVolumes()` | Retrieves all known volumes regardless of current state. |
| `static PackageVolume FindPackageVolumeByName(string)` | Retrieves the specified volume. |
| `static PackageVolume FindPackageVolumeByPath(string)` | Retrieves the specified volume. |
| `bool IsRepairNeeded()` | Whether `Repair` is needed; returns `true` if the volume is damaged. Doesn't require admin privilege. |
| `Repair()` | Detects and corrects invalidated package volume tracking information (and similar conditions). Requires admin privilege. |
| `static IAsyncOperation<PackageVolume> AddAsync(string packageStorePath)` | Adds a package volume at the given package store path. |
| `static PackageVolume GetDefault()` | Gets the default volume. |
| `static PackageVolume GetPackageVolumeByName(string)` / `GetPackageVolumeByPath(string)` | Get a volume by name / path. |
| `static bool IsFeatureSupported(PackageVolumeFeature feature)` | Runtime check for the feature-gated members. |
| `IAsyncOperation<ulong> GetAvailableSpaceAsync()` | Available space on the volume. |
| `bool IsOffline()` | Whether the volume is offline. |
| `RemoveAsync()` / `SetDefault()` / `SetOfflineAsync()` / `SetOnlineAsync()` | Remove the volume, make it default, take it offline / online. The official page lists these without descriptions. |

## Notes

- Availability: the class is documented for Windows App SDK 1.5 through 2.0. Per-member pages show that `FindPackageVolumes` and `IsRepairNeeded` are 1.5+, while `AddAsync`, `GetAvailableSpaceAsync`, `GetDefault` and `IsFeatureSupported` are 2.0 (and 2.0-experimental) only. The 2.0 stable release notes ("Package deployment and validation") list the 2.0 members by name: `AddAsync`, `GetAvailableSpaceAsync`, `GetDefault`, `GetPackageVolumeByName`, `GetPackageVolumeByPath`, `IsFeatureSupported`, `IsOffline`, `RemoveAsync`, `SetDefault`, `SetOfflineAsync`, `SetOnlineAsync`. Gate these with `IsFeatureSupported` (the `PackageVolumeFeature` enum names Add, Remove, GetDefault, SetDefault, SetOffline, SetOnline and GetAvailableSpace).
- Packages are typically installed to a `PackageVolume`; `C:\Program Files\WindowsApps` is the default package volume on a new Windows system. `RegisterPackageOptions.DeveloperMode`, `AddPackageOptions.StageInPlace` and other options can install packages to a non-package-volume location.
- This is the Windows App SDK `Microsoft.Windows.Management.Deployment.PackageVolume`, not the UWP `Windows.Management.Deployment.PackageVolume` from `PackageManager`.
- Source: https://learn.microsoft.com/en-us/windows/windows-app-sdk/api/winrt/microsoft.windows.management.deployment.packagevolume

## Related

- [PackageVolumeFeature](./packagevolumefeature.md)
- [PackageDeploymentManager](./packagedeploymentmanager.md)
