# Enterprise IT-Admin Deployment Tools

Beyond the Microsoft Store, IT Pros manage MSIX rollout to managed devices with PowerShell cmdlets, Microsoft Configuration Manager, DISM/provisioning, Group Policy, and AppLocker — plus per-app controls for update cadence, downgrade, and forced critical updates.

## Signature / Usage

```powershell
# Silent install/uninstall with the Appx PowerShell module
Add-AppxPackage -Path ".\MyApp.msixbundle"
Remove-AppxPackage -Package "Contoso.MyApp_1.0.0.0_x64__8wekyb3d8bbwe"

# Pre-install (provision) a package for all users on a reference image, without an interactive logon
Add-AppxProvisionedPackage -Online -PackagePath ".\MyApp.msix" -SkipLicense
```

## Options / Props

| Tool | Use |
|------|-----|
| `Add-AppxPackage` / `Remove-AppxPackage` (Appx PowerShell module) | Silent per-user install/uninstall/update of `.msix`/`.appx`/`.msixbundle` packages |
| Microsoft Configuration Manager | Create-application wizard auto-populates Publisher/Name/Version from the package and auto-configures install string + detection method for the **Windows app package** application type |
| Microsoft Intune | Client-app model deployment of MSIX as a line-of-business app; see Enterprise Deployment with Microsoft Intune in this skill for the full signing + assignment flow |
| DISM (`Add-AppxProvisionedPackage` / `DISM /Add-ProvisionedAppxPackage`) | Installs/removes MSIX packages on an offline or online Windows image before deployment |
| Provisioning | Pre-installs packages on end-user systems for all future users, without re-imaging |
| AppLocker | Allow/deny MSIX app execution on a device via rules keyed on publisher, product name, file name, file version, path, or hash |
| Group Policy | MSIX packaged apps can read Group Policy registry keys and honor policy settings; supports a subset of Group Policy scenarios (see Group Policy and packaged apps on Microsoft Learn for the full support matrix) |

## Notes

- **Downgrading**: MSIX apps don't require an uninstall before installing an older version — pass `ForceUpdateFromAnyVersion` (via `Add-AppxPackage`, the `PackageManager` API, the EnterpriseModernAppManagement CSP, or the App Installer file's update settings) to allow a lower-version package to install over a higher one.
- **Critical updates**: mark an update critical with `UpdateBlocksActivation` in the App Installer file's update settings so users can't keep launching a stale version while ignoring the update prompt.
- **Uninstall**: MSIX is fully containerized, so uninstall removes all files under `%ProgramFiles%\WindowsApps` plus any AppData/registry state created by the app; it never removes user-created files.
- Microsoft Store for Business/Education (the earlier enterprise distribution channel) has retired; Intune's client-app model plus the Microsoft Store app (new) integration is the current path.

## Related

- [Enterprise Deployment with Microsoft Intune](./enterprise-deployment-intune.md)
- [Choose a Distribution Path](./choose-distribution-path.md)
- [Sideloading Prerequisites](./sideloading-prerequisites.md)
