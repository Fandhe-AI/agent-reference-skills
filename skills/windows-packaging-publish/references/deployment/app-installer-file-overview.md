# App Installer File Overview

The `.appinstaller` file is an XML file that specifies where an MSIX app is located and how to update it, enabling seamless installs and silent updates for sideloaded/direct-download apps.

## Signature / Usage

```xml
<?xml version="1.0" encoding="utf-8"?>
<AppInstaller
    Uri="https://example.com/HumanResources.appinstaller"
    Version="1.0.0.0"
    xmlns="http://schemas.microsoft.com/appx/appinstaller/2017/2">
  <MainPackage
      Name="Contoso.HumanResources"
      Version="1.0.0.0"
      Publisher="CN=Contoso"
      Uri="https://example.com/HumanResources.msix"
      ProcessorArchitecture="x64" />
  <UpdateSettings>
    <OnLaunch HoursBetweenUpdateChecks="0" />
  </UpdateSettings>
</AppInstaller>
```

## Notes

- Introduced in Windows 10 version 1709; the user shares/opens the `.appinstaller` file (not the app package itself), and App Installer UI guides install and later updates.
- App Installer file downloads and updates support `https`, `http`, and `smb` protocols.
- The `ms-appinstaller:` URI protocol (one-click browser install) is disabled by default since December 2023 — link directly to the `.appinstaller` file for download instead.
- Full XML schema is documented in the [App Installer file (.appinstaller) reference](https://learn.microsoft.com/en-us/uwp/schemas/appinstallerschema/schema-root); minimum OS is Windows 10 version 1803 (build 17134) for the `2017/2` namespace elements.

## Related

- [App Installer update settings](./app-installer-update-settings.md)
- [App Installer troubleshooting](./app-installer-troubleshooting.md)
- [Choose a distribution path](./choose-distribution-path.md)
