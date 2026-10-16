# Reset and Repair MSIX Apps

App Reset and Repair can be performed by the device user (without elevation) to re-install or refresh a Windows app installation to resolve a failure.

## Signature / Usage

```powershell
# 1. Capture app data before reset or repair
$pfn = (Get-AppxPackage -Name "MyEmployees").PackageFamilyName
Copy-Item -Path "$env:LOCALAPPDATA\Packages\$pfn" -Destination "$env:USERPROFILE\Desktop\MyEmployees-AppData-backup" -Recurse -ErrorAction Stop

# 2. Reset (administrative PowerShell) - only after the backup succeeded
# Reset permanently deletes the app's data
Get-AppxPackage -Name "MyEmployees" | Reset-AppxPackage
```

## Options / Props

Per-user data lives under `%LocalAppData%\Packages\<PackageFamilyName>\`:

| Subfolder | Contents |
| --- | --- |
| `LocalState` | Per-user local app data that persists across sessions. |
| `LocalCache` | Non-roaming cached data, including files redirected by the Virtual File System (VFS). |
| `RoamingState` | App data intended to roam across the user's devices. |
| `Settings` | The app's virtualized registry settings, stored in `settings.dat`. |

## Notes

- Repair retains the app's data while it attempts to re-load the app. Settings path: **Settings** > **Apps** > **Apps & Features** > select the app > **Advanced options** > **Repair**.
- Reset permanently deletes the app's data (preferences, sign-in details) and re-installs the app fresh; it can't be recovered. Via Settings use **Advanced options** > **Reset** and confirm. Capture the data first if you need it to diagnose a failure.
- Repair and reset apply to apps installed to an online Windows image.
- Source: https://learn.microsoft.com/en-us/windows/msix/desktop/managing-your-msix-reset-and-repair

## Related

- [Tamper protection](./tamper-protection.md)
- [Managing MSIX with PowerShell](./powershell-msix-cmdlets.md)
- [Auto-update and repair apps](./app-installer-auto-update-repair.md)
