# Preinstalling Packaged Apps

Install a packaged app for all users with DISM, provisioning packages, or PowerShell. Preinstall has two steps: staging and registration.

## Signature / Usage

```powershell
# Package Full Name example: Contoso.ContosoApp_44.20231.1000.0_neutral__8wekyb3d8bbwe
# -SkipLicense: for non-Store apps that need no license
Add-AppxProvisionedPackage -Online -PackagePath .\MyApp.msix -SkipLicense
# Offline image: Get-AppxProvisionedPackage -Path C:\mount
Get-AppxProvisionedPackage -Online
Remove-AppxProvisionedPackage -Online -PackageName Contoso.ContosoApp_44.20231.1000.0_neutral__8wekyb3d8bbwe
```

## Options / Props

| Command | Description |
| --- | --- |
| `Get-AppxProvisionedPackage` | Lists all apps pre-installed on the image. |
| `Add-AppxProvisionedPackage` | Stages the package and configures it for pre-install. All dependencies must be provided. Re-running it is force provisioning. |
| `Remove-AppxProvisionedPackage` | Removes a pre-installed app. Doesn't remove the app if already registered for any users; it only strips auto-registration for new users. If no users installed it, staged files are also removed. |

## Notes

- Staging stores a copy of the package on the local file system; do it once, without user accounts, on an offline image (`.wim`, `.vhd`, `.vhdx`) or an online OS. Registration is per user, begins at logon, and is performed by the App Readiness Service (ARS): it creates user app data, file type associations, and Start menu tiles.
- DISM services Windows images and virtual hard disks. All app provisioning is encapsulated in DISM and performs both staging and ARS setup; you need the package (`.msix`, `.msixbundle`, `.appx`, `.appxbundle`) and dependency packages.
- From Windows 10 1809, provisioned apps install to `%ProgramFiles%\WindowsApps` and are immediately available to users with the package registered.
- In Windows 10 2004, a provisioned app reinstalls during re-provisioning; earlier versions blocked reinstall if the user had uninstalled it. Force provisioning lets an administrator re-provision an app for all users.
- The source page lists the cmdlets as `Get-ProvisionedAppxPackages` / `Add-ProvisionedAppxPackage` / `Remove-ProvisionedAppxPackage`; the DISM module names are `Get-` / `Add-` / `Remove-AppxProvisionedPackage` (the plural form does not exist).
- The MSIX PowerShell cmdlets require the Package Full Name (name, version, architecture, publisher).
- Source: https://learn.microsoft.com/en-us/windows/msix/desktop/deploy-preinstalled-apps
- Licensing applies only to Microsoft Store apps: a machine license must be provided, and preinstalled Store apps must be free and configured as pre-installable in Partner Center.

## Related

- [Package registration and lifetime](./package-lifetime.md)
- [Managing MSIX with PowerShell](./powershell-msix-cmdlets.md)
- [Enterprise deployment tools](./enterprise-deployment-tools.md)
