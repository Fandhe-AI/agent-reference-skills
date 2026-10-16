# App Installer (the App): Install UI and Updating App Installer

App Installer is the built-in Windows application that installs packaged apps when a user double-clicks an `.msix` / `.appx` package, an `.msixbundle` / `.appxbundle` bundle, or an `.appinstaller` file. It is built into Windows 10 (version 1803 and later) and Windows 11, and is available from the Microsoft Store.

## Signature / Usage

```powershell
# Check the installed App Installer version
(Get-AppxPackage Microsoft.DesktopAppInstaller).Version
```

```powershell
# Update App Installer with winget
winget upgrade Microsoft.AppInstaller
```

## Options / Props

Default install dialog elements:

| Element | Description |
| --- | --- |
| Application name / icon | Provided by the app author, extracted from the MSIX file. |
| Microsoft Store signature | The string "Microsoft Store App" indicates the app was built and distributed through the Store and complies with Store policies. |
| Publisher name and Version | Extracted from the MSIX file. |
| Source | The domain of the URL the package was sourced from. |
| Capabilities | Lists app capabilities so the user can evaluate what the app can access before installing. |
| Install / Cancel | Install becomes **Reinstall** when downgrading or reinstalling. Cancel closes the dialog without changes. |
| Launch when ready | Checkbox (user can uncheck) that starts the app after installation. |
| Internet warning | Shown for packages that come from the internet. |

## Notes

- Two distinct technologies share the "App Installer" name: App Installer (the app, this page) and the App Installer file (`.appinstaller`, an XML file defining package location and how the package is installed, updated, and repaired).
- App Installer can also install from the web, optional packages, and related sets.
- If updates are enabled on a PC, App Installer is updated automatically from the Microsoft Store. If the PC has no Store access, a standalone installer is available via `https://aka.ms/getwinget`.

## Related

- [App Installer file overview](./app-installer-file-overview.md)
- [App Installer security features](./app-installer-security-features.md)
- [Create custom App Installer UX](./app-installer-custom-ux.md)
- [App Installer troubleshooting](./app-installer-troubleshooting.md)
