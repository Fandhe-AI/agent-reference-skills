# Package Storage Volumes

A package volume is a Windows-managed installation store for staged packages. The default package volume is normally `C:\Program Files\WindowsApps`, where each package version has a directory based on its package full name.

## Signature / Usage

```powershell
$volume = Add-AppxVolume -Path "Q:\WindowsApps"
Set-AppxDefaultVolume -Volume $volume
```

## Options / Props

Use the `Windows.Management.Deployment.PackageManager` APIs or Appx PowerShell cmdlets to manage package volumes:

| Operation | Windows Runtime API | PowerShell |
| --- | --- | --- |
| Add | `AddPackageVolumeAsync` | `Add-AppxVolume` |
| Enumerate | `GetPackageVolumesAsync` | `Get-AppxVolume` |
| Get default | `GetDefaultPackageVolume` | `Get-AppxDefaultVolume` |
| Set default | `SetDefaultPackageVolume` | `Set-AppxDefaultVolume` |
| Set offline | `SetPackageVolumeOfflineAsync` | `Dismount-AppxVolume` |
| Set online | `SetPackageVolumeOnlineAsync` | `Mount-AppxVolume` |
| Remove | `RemovePackageVolumeAsync` | `Remove-AppxVolume` |

## Notes

- Package volumes support side-by-side staging: Windows can write a new package version without modifying the version an application currently uses, reducing the risk of a partially applied update.
- Not every package is staged in a package volume. Development-mode registrations, packages with external location, system packages, and layouts registered in place can use other storage models.
- Windows uses the default package volume when a deployment operation doesn't specify another target. Volumes can be created on other local drives, removable media, or supported network storage. Deployment APIs that accept a target volume can override the default per operation; `MovePackageToVolumeAsync` or `Move-AppxPackage` move supported packages.
- Offline volumes: when the underlying storage becomes unavailable (for example a removed USB drive), Windows marks the volume and its packages offline (`PackageOffline` status). A volume is identified by the underlying storage media, not only by drive letter, so reconnecting under a different drive letter doesn't create a different identity.
- Windows owns and protects package-volume contents. Staged package files are immutable and shouldn't be modified directly.
- Windows encrypts package files in non-system package volumes to preserve MSIX integrity guarantees if the storage is moved to another computer. This doesn't replace full-volume encryption such as BitLocker.
- Features that depend on hard links, including some disk-space optimizations, aren't available on file systems that don't support hard links.
- Source: https://learn.microsoft.com/en-us/windows/msix/package/package-volumes, last updated 09/30/2026 (ms.date).

## Related

- [Package registration and lifetime](./package-lifetime.md)
- [Managing MSIX with PowerShell](./powershell-msix-cmdlets.md)
