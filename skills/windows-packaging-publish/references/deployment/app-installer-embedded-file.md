# Use an Embedded App Installer File to Update Your App

Embed an `.appinstaller` file in the package and point the manifest at it so the app carries its own update and repair path.

## Signature / Usage

```xml
<Package xmlns="http://schemas.microsoft.com/appx/manifest/foundation/windows10"
    xmlns:mp="http://schemas.microsoft.com/appx/2014/phone/manifest"
    xmlns:uap="http://schemas.microsoft.com/appx/manifest/uap/windows10"
    xmlns:uap13="http://schemas.microsoft.com/appx/manifest/uap/windows10/13"
    xmlns:build="http://schemas.microsoft.com/developer/appx/2015/build"
    IgnorableNamespaces="uap mp uap13 build">
  <Properties>
    ...
    <uap13:AutoUpdate>
      <uap13:AppInstaller File="Update.appinstaller" />
    </uap13:AutoUpdate>
  </Properties>
</Package>
```

## Notes

- Available in Windows version 10.0.21300.0; `MaxVersionTested` must reference this or a newer Windows version.
- With Visual Studio, install Windows 10 SDK 2104 (or newer) and target Windows 10 21H1 (or newer) for MaxVersionTested and MinVersion; otherwise the embedded App Installer configuration isn't set on the device at install time.
- MSIX Packaging Tool flow: open the package in **Package editor**, **Package files** > right-click **Package** > **Add file** (the App Installer file), edit the AppxManifest via **Package information** > **Open file**, then **Save** and choose **Yes, Increment**.
- Visual Studio flow: **Add** > **Existing Item** for the App Installer file, edit `Package.appxmanifest` via **View Code**, then **Publish** > **Create App Packages...** with **Sideloading**.
- The file name `Update.appinstaller` is an assumption of the guide; use your own file name in `File`.
- An external App Installer file overrides settings of an embedded one.

## Related

- [Auto-update and repair apps](./app-installer-auto-update-repair.md)
- [Create an App Installer file](./app-installer-file-create.md)
