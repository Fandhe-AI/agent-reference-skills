# Auto-update and Repair Apps (App Installer)

Auto-update and repair settings let developers and IT pros provide automated updates for Windows apps distributed without the Microsoft Store. Available on Windows 10 version 2004 (build 19041) and later, and all versions of Windows 11.

## Signature / Usage

Visual Studio generates `.appinstaller` files using the 2017/2 schema by default, which supports `HoursBetweenUpdateChecks` but not `ShowPrompt` or `UpdateBlocksActivation`. To use those, set the schema version to `2021`:

```xml
<AppInstaller xmlns="http://schemas.microsoft.com/appx/appinstaller/2021" ...>
```

## Options / Props

Update elements:

| Element | Description |
| --- | --- |
| HoursBetweenUpdateChecks | Minimal gap between update checks. |
| UpdateBlocksActivation | Experience when an app update is checked for. |
| ShowPrompt | Whether a window is displayed when updates are being installed and checked for. |
| UpdateURI | URI to the fallback App Installer file used when the App Installer URI is unavailable. |

PowerShell cmdlets:

| Cmdlet | Description |
| --- | --- |
| `Get-AppxPackageAutoUpdateSettings` | Returns the auto-update and repair settings for a specific or all configured apps. |
| `Set-AppxPackageAutoUpdateSettings` | Configures auto-update and repair settings for an app installed using an App Installer file. |

CSP settings (path `./Device/Vendor/MSFT/EnterpriseModernAppManagement/AppManagement/nonStore/<Windows app Family Name>/AppUpdateSettings/AutoUpdateSettings/AutoUpdateSettings/`):

| CSP | Description |
| --- | --- |
| ./PackageSource | Source of the `.appinstaller` file used to check for updates. |
| ./AutomaticBackgroundTask | Whether the app checks for and updates in the background. |
| ./OnLaunchUpdateCheck | Whether the app checks for updates when launched. |
| ./HoursBetweenUpdateChecks | Time between update checks. |
| ./ShowPrompt | Whether the user is prompted with update or repair dialogs. |
| ./UpdateBlocksActivation | Whether the app launches if an update is available. |
| ./ForceUpdateFromAnyVersion | Whether the update can be both up-level or down-level. |
| ./Disable | Whether Auto-Update is enabled / disabled for a package. |

Automatic repair CSP path: `.../AppUpdateSettings/AutoUpdateSettings/AutoRepair/`, with `./PackageSource` (the `.appinstaller` or app file used to check for repairs).

## Notes

- Installing via an App Installer file creates an entry in the App Installer repository with the specified configuration. While the entry exists, settings can be changed through the Windows Settings app, the App Installer file, PowerShell, or CSP. Changes to an app overwrite all settings for that app; settings configured via CSP override all other configurations.
- Updates use the App Installer URI path; if inaccessible, the `UpdateURIs` are tried in order and the first accessible App Installer file is validated for new updates.
- Repair uses the App Installer URI path; if inaccessible or not configured, it falls back to the `RepairURIs`.
- On-launch update checks depend on how the app is activated: they run through supported entry points (Start menu including pinned tile, app execution alias, protocol handler). A desktop shortcut or taskbar item that launches the executable directly bypasses the check. To check regardless of activation, update the package from your code.
- An embedded App Installer file configures settings for a specific app; an external App Installer file overrides all settings configured by an embedded one.

## Related

- [Embedded App Installer file](./app-installer-embedded-file.md)
- [Code-driven update for non-Store apps](./non-store-code-driven-update.md)
- [App Installer update settings](./app-installer-update-settings.md)
