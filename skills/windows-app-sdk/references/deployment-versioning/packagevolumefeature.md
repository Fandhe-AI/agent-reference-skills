# PackageVolumeFeature

Enum identifying feature-gated `PackageVolume` operations, passed to `PackageVolume.IsFeatureSupported`. Windows App SDK 2.0 (and 2.0-experimental) only.

## Signature / Usage

```csharp
using Microsoft.Windows.Management.Deployment;

if (PackageVolume.IsFeatureSupported(PackageVolumeFeature.SetOffline))
{
    await volume.SetOfflineAsync();
}
```

## Options / Props

| Name | Value | Description |
|------|-------|-------------|
| GetDefault | 1 | Corresponds to `PackageVolume.GetDefault`. |
| SetDefault | 2 | Corresponds to `PackageVolume.SetDefault`. |
| Add | 3 | Corresponds to `PackageVolume.AddAsync`. |
| Remove | 4 | Corresponds to `PackageVolume.RemoveAsync`. |
| SetOffline | 5 | Corresponds to `PackageVolume.SetOfflineAsync`. |
| SetOnline | 6 | Corresponds to `PackageVolume.SetOnlineAsync`. |
| GetAvailableSpace | 7 | Corresponds to `PackageVolume.GetAvailableSpaceAsync`. |

## Notes

- The official page gives no per-field descriptions; the mapping column is inferred from the matching member names (the enum's `api_name` entries use the same names).
- Contract: `PackageDeploymentContract` version 196608 (2.0). `PackageVolume` itself is documented from 1.5, but this enum is 2.0 only.
- Source: https://learn.microsoft.com/en-us/windows/windows-app-sdk/api/winrt/microsoft.windows.management.deployment.packagevolumefeature

## Related

- [PackageVolume](./packagevolume.md)
- [PackageDeploymentManager](./packagedeploymentmanager.md)
