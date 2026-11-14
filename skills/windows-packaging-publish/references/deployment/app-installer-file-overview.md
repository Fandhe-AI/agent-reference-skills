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

- Two related but distinct technologies share the "App Installer" name: the App Installer app (the built-in Windows application, available from the Microsoft Store, that provides the installation UI when a user opens an `.msix`/`.appx`, `.msixbundle`/`.appxbundle`, or `.appinstaller` file) and the App Installer file (`.appinstaller`, an XML file that specifies the package location and defines how the package is installed, updated, and repaired).
- Introduced in Windows 10 version 1709; the user shares/opens the `.appinstaller` file (not the app package itself), and App Installer UI guides install and later updates.
- App Installer file downloads and updates support `https`, `http`, and `smb` protocols.
- The `ms-appinstaller:` URI protocol (one-click browser install) is disabled by default since December 2023 — link directly to the `.appinstaller` file for download instead.
- Full XML schema is documented in the [App Installer file (.appinstaller) reference](https://learn.microsoft.com/en-us/uwp/schemas/appinstallerschema/schema-root); minimum OS is Windows 10 version 1803 (build 17134) for the `2017/2` namespace elements.
- Source: https://learn.microsoft.com/en-us/windows/msix/app-installer/app-installer-file-overview (MicrosoftDocs/msix-docs `01b8c55`, ms.date 11/04/2026, retrieved 2026-11-14)

### Automatic updates for packages distributed through GitHub

Publishing a standalone `.msix` or `.msixbundle` file in a GitHub release does not, by itself, configure automatic updates. Choose an update mechanism as part of your distribution plan.

Using an App Installer file: host your packages and an `.appinstaller` file as GitHub release assets.

1. [Sign the package or bundle](https://learn.microsoft.com/en-us/windows/msix/package/signing-package-overview) with a certificate trusted by the target devices. Keep the package identity and publisher consistent across releases so Windows can recognize subsequent packages as updates.
1. [Create an App Installer file](./app-installer-file-create.md) that references the signed package or bundle. Use HTTPS download URLs that return the actual files, not a GitHub release page. Keep the `.appinstaller` URL stable so installed apps can retrieve future updates. For GitHub release and asset URL formats, see [Linking to releases](https://docs.github.com/en/repositories/releasing-projects-on-github/linking-to-releases).
1. Configure the [update settings](./app-installer-update-settings.md) for your supported Windows versions, such as checks on app launch or background checks. See the [App Installer file schema reference](https://learn.microsoft.com/en-us/uwp/schemas/appinstallerschema/schema-root) for the available elements.
1. Share the `.appinstaller` download with users and have them download and open it to install the app, rather than installing the standalone package directly.

For each update, upload a package with a higher version, increase the App Installer file's `Version`, and update the main package or bundle's `Version` and `Uri` to match the new release asset. Keep the App Installer file available at the URL used by installed apps. Updates are checked according to the configured update settings, not immediately when a GitHub release is published.

Using the Microsoft Store: alternatively, [publish your packaged app through the Microsoft Store](https://learn.microsoft.com/en-us/windows/apps/publish/). The Store signs the submitted package and manages updates for Store installations, subject to Store policies and the user's update settings. Uploading a package to GitHub does not enroll it in Store-managed updates.

Adapted (not in the official docs): the following GitHub release asset URL layout is an illustrative sketch of the steps above; the official page contains no code for this section.

```xml
<AppInstaller
    Uri="https://github.com/<owner>/<repo>/releases/download/<tag>/HumanResources.appinstaller"
    Version="1.0.1.0"
    xmlns="http://schemas.microsoft.com/appx/appinstaller/2017/2">
  <MainPackage
      Name="Contoso.HumanResources"
      Version="1.0.1.0"
      Publisher="CN=Contoso"
      Uri="https://github.com/<owner>/<repo>/releases/download/<tag>/HumanResources.msix"
      ProcessorArchitecture="x64" />
  <UpdateSettings>
    <OnLaunch HoursBetweenUpdateChecks="0" />
  </UpdateSettings>
</AppInstaller>
```

- Adapted (not in the official docs): the final XML sketch illustrates the steps above; it is not an official sample. The sketch only follows the official guidance to use HTTPS URLs that return the actual files and to keep the `.appinstaller` URL stable.

## Related

- [App Installer app](./app-installer-app.md)
- [App Installer update settings](./app-installer-update-settings.md)
- [App Installer troubleshooting](./app-installer-troubleshooting.md)
- [Choose a distribution path](./choose-distribution-path.md)
