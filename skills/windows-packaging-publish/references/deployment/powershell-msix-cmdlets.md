# Managing MSIX with PowerShell (Appx Cmdlets)

PowerShell cmdlets for managing `.appx` and `.msix` packages. Each is available with either "Appx" or "App" prefixed nouns (for example `Add-AppxPackage` can also be used as `Add-AppPackage`).

## Signature / Usage

```powershell
Get-AppxPackage -Name "*Contoso*"
Add-AppxPackage -Path .\MyApp.msix
Remove-AppxPackage -Package <PackageFullName>
```

## Options / Props

| Cmdlet | Description |
| --- | --- |
| `Add-AppxPackage` | Adds a signed app package (`*.msix`, `*.appx`) to a device. Also used for apps with a relationship to another MSIX app: external packages, optional packages, related packages. |
| `Remove-AppxPackage` | Removes a package registration for a user. The staged payload becomes eligible for removal after no strong references remain. |
| `Get-AppxPackage` | Lists installed signed app packages. Filter with `-Name` using `*` as a wildcard. |
| `Get-AppxPackageManifest` | Returns the package manifest XML object for a full package name. |
| `Reset-AppxPackage` | Resets the installed app to its original settings. |
| `Get-AppxVolume` | Returns AppxVolume objects known to the computer. |
| `Add-AppxVolume` | Adds a new AppxVolume for the Package Manager to advertise. |
| `Remove-AppxVolume` | Removes an existing AppxVolume from the device. |
| `Mount-AppxVolume` | Mounts an AppxVolume so deployed apps become accessible. |
| `Dismount-AppxVolume` | Dismounts an AppxVolume, removing access to apps deployed to it. |
| `Move-AppxPackage` | Moves a package to another mounted AppxVolume. |
| `Get-AppxDefaultVolume` | Gets the default volume, the target for all deployment operations. It can't be removed from the list of volumes. |
| `Set-AppxDefaultVolume` | Sets another mounted AppxVolume as the default deployment target. |
| `Invoke-CommandInDesktopPackage` | Executes commands inside the app package container. |

## Notes

- Source: https://learn.microsoft.com/en-us/windows/msix/desktop/powershell-msix-cmdlets, last updated 09/30/2026 (ms.date).

## Related

- [Package storage volumes](./package-volumes.md)
- [Package registration and lifetime](./package-lifetime.md)
- [Reset and repair](./reset-and-repair.md)
- [Container runtime troubleshooting](./msix-container-runtime-troubleshooting.md)
