# Remove Outdated Windows App SDK Runtime Versions

How to uninstall outdated Windows App SDK runtime packages (Framework, Main, Singleton, DDLM) from a development computer, via PowerShell's `Remove-AppxPackage` or the **Apps & features** Settings page.

## Signature / Usage

```powershell
# 1. List installed runtime packages to get their PackageFullName values
Get-AppxPackage *appruntime*

# 2. Remove specific packages by PackageFullName
Remove-AppxPackage -Package Microsoft.ProjectReunion.0.8-preview_8000.144.525.0_x86__8wekyb3d8bbwe
Remove-AppxPackage -Package Microsoft.ProjectReunion.Main.0.8-preview_8000.144.525.0_x64__8wekyb3d8bbwe
Remove-AppxPackage -Package Microsoft.ProjectReunion.DDLM.8000.144.525.0-x8-p_8000.144.525.0_x86__8wekyb3d8bbwe
```

## Options / Props

| Method | Covers | Notes |
|---|---|---|
| `Remove-AppxPackage -Package <PackageFullName>` | Framework, Main, Singleton, DDLM | Only way to remove the Framework package — it never appears in **Apps & features**. |
| **Settings > Apps & features**, search "reunion" | Main, Singleton, DDLM only | GUI alternative for the non-Framework packages; select a version and click **Uninstall**. |

## Notes

- Get the `PackageFullName` values to remove from `Get-AppxPackage` first (see check-windows-app-sdk-versions).
- Do **not** remove Windows App SDK runtime packages from end-user machines after deployment — other apps sharing the same Framework package dependency will break.
- Safe to remove older versions from a development machine as long as no project still targets them.

## Related

- [Check for Installed Versions of the Windows App SDK Runtime](./check-windows-app-sdk-versions.md)
- [DeploymentManager](./deploymentmanager.md)
- [Deployment Architecture](./deployment-architecture.md)
