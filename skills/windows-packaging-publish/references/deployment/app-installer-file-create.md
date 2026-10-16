# Create an App Installer File (Visual Studio or Manually)

Create a `.appinstaller` XML file, either with the Visual Studio Create App Packages wizard or by hand (required for related sets of a main package plus optional packages).

## Signature / Usage

```xml
<?xml version="1.0" encoding="utf-8"?>
<AppInstaller
    xmlns="http://schemas.microsoft.com/appx/appinstaller/2021"
    Version="1.0.0.0"
    Uri="http://mywebservice.azurewebsites.net/appset.appinstaller" >

    <MainBundle
        Name="Contoso.MainApp"
        Publisher="CN=Contoso"
        Version="2.23.12.43"
        Uri="http://mywebservice.azurewebsites.net/mainapp.msixbundle" />

    <OptionalPackages>
        <Package
            Name="Fabrikam.OptionalApp3"
            Publisher="CN=Fabrikam"
            Version="10.34.54.23"
            ProcessorArchitecture="x64"
            Uri="http://mywebservice.azurewebsites.net/OptionalApp3.msix" />
    </OptionalPackages>

    <UpdateSettings>
        <OnLaunch HoursBetweenUpdateChecks="12" />
    </UpdateSettings>

    <UpdateUris>
        <UpdateUri>https://www.contoso.com/Installers/MainApp.AppInstaller</UpdateUri>
    </UpdateUris>
</AppInstaller>
```

## Options / Props

| Element / attribute | Description |
| --- | --- |
| `AppInstaller` `xmlns` / `Version` / `Uri` | XML namespace; version of the App Installer file (quad-dotted, e.g. 1.0.0.0); URI to the current App Installer file, accessible by the device. |
| `MainPackage` / `MainBundle` | Primary app. Use `MainPackage` for `.msix` / `.appx` (`ProcessorArchitecture` is mandatory for non-bundle packages) and `MainBundle` for `.msixbundle` / `.appxbundle` (architecture not required). |
| `OptionalPackages` (`Package` / `Bundle`) | Optional packages of a related set. |
| `Dependencies` (`Package`) | Required framework packages for the main or optional packages. |
| Name / Publisher / Version / ProcessorArchitecture / Uri | Must match the `Package/Identity` element of the package or bundle manifest. Find values with `$(Get-AppxPackage [AppName]).Name` / `.Publisher` / `.Version`. |
| `UpdateSettings` / `OnLaunch` | Optional. `HoursBetweenUpdateChecks` (default 24 hours if not specified), `UpdateBlocksActivation`, `ShowPrompt`; also `AutomaticBackgroundTask` and `ForceUpdateFromAnyVersion` (default False: only newer versions installed). |
| `UpdateUris` / `UpdateUri` | Fallback URIs if the original App Installer URI is inaccessible. Maximum 10. Must target App Installer files. |
| `RepairUris` / `RepairUri` | Repair sources if the App Installer URI is inaccessible. Maximum 10. Can target apps or App Installer files; the app need not have been installed via an App Installer file. |

Visual Studio wizard steps: right-click the project, **Store** > **Create App Packages**, select **I want to create packages for sideloading.** and **Enable automatic updates**, choose architectures, then in **Configure Update Settings** set the **Installation URL** and update-check frequency.

## Notes

- Deployment validates `Name`, `Publisher`, and `Version` of the package at the `Uri` of the main element against the file; if the package manifest `Package/Identity` doesn't match, installation fails.
- `UpdateUris`, `RepairUris`, and `ShowPrompt` / `UpdateBlocksActivation` require the 2021 schema and Windows 10 version 2004 (build 19041) or later.
- App Installer files are supported from Windows 10 version 1709; `HoursBetweenUpdateChecks` from version 1803. Visual Studio: sideloaded auto-update requires Windows 10 version 1803 and Visual Studio 2017 update 15.7; the file is only generated when `TargetPlatformMinVersion` is Windows 10 version 1803 or greater.
- The `.appinstaller` file can be hosted on an HTTP endpoint or UNC share. For HTTP hosting, configure MIME types, e.g. in IIS `web.config`: `.appx` and `.appxbundle` as `application/vns.ms-appx`, `.appinstaller` as `application/xml` (spelling as in source).
- Using the `ms-appinstaller` protocol can be controlled by an administrator via the `EnableMSAppInstallerProtocol` policy (Policy CSP - DesktopAppInstaller).

## Related

- [App Installer file overview](./app-installer-file-overview.md)
- [App Installer update settings](./app-installer-update-settings.md)
- [Embedded App Installer file](./app-installer-embedded-file.md)
- [Web install with App Installer](./web-install-app-installer.md)
