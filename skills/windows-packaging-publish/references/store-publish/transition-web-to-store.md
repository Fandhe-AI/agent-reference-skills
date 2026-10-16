# Transition Users from a Web Unpackaged App to a Store Packaged App

Guidance for apps distributed both as a web download (EXE/MSI) and as a Store MSIX: migrate users, data, pins and associations, and uninstall the unpackaged version.

## Signature / Usage

Silently install the Store version from the unpackaged app (needs the 12-character Store ID from Partner Center > Product Identity):

```csharp
private async Task<bool> DownloadStoreVersionAsync()
{
    var productId = "<Product Id from Partner Center>";
    var applicationName = "<name of your application>";

    var appInstallManager = new AppInstallManager();
    var entitlement = await appInstallManager.GetFreeUserEntitlementAsync(productId, string.Empty, string.Empty);
    if (entitlement.Status is GetEntitlementStatus.NoStoreAccount)
    {
        entitlement = await appInstallManager.GetFreeDeviceEntitlementAsync(productId, string.Empty, string.Empty);
    }
    if (entitlement.Status is not GetEntitlementStatus.Succeeded)
    {
        return false;
    }

    var options = new AppInstallOptions()
    {
        LaunchAfterInstall = true,
        CompletedInstallToastNotificationMode = AppInstallationToastNotificationMode.NoToast
    };
    var items = await appInstallManager.StartProductInstallAsync(productId, string.Empty, applicationName, string.Empty, options);
    var firstItem = items.FirstOrDefault();
    if (firstItem is null)
    {
        return false;
    }
    firstItem.StatusChanged += StoreInstallation_StatusChanged;
    firstItem.Completed += StoreInstallation_Completed;
    return true;
}
```

Launch the Store app by AMUID (Package Family Name + `!` + Application Id from appxmanifest):

```csharp
Process.Start(
    "explorer.exe",
    "shell:AppsFolder\\Microsoft.WindowsCalculator_8wekyb3d8bbwe!App"
);
```

Migrate pinned taskbar / Start shortcuts (manifest):

```xml
xmlns:rescap3="http://schemas.microsoft.com/appx/manifest/foundation/windows10/restrictedcapabilities/3"
...
<Extensions>
  <rescap3:Extension Category="windows.desktopAppMigration">
    <rescap3:DesktopAppMigration>
      <rescap3:DesktopApp AumId="[your_app_aumid]" />
      <rescap3:DesktopApp ShortcutPath="%USERPROFILE%\Desktop\[my_app].lnk" />
      <rescap3:DesktopApp ShortcutPath="%APPDATA%\Microsoft\Windows\Start Menu\Programs\[my_app].lnk" />
      <rescap3:DesktopApp ShortcutPath="%PROGRAMDATA%\Microsoft\Windows\Start Menu\Programs\[my_app_folder]\[my_app].lnk"/>
    </rescap3:DesktopAppMigration>
  </rescap3:Extension>
</Extensions>
```

Migrate file extension / protocol associations (manifest):

```xml
<Extensions>
  <uap:Extension Category="windows.fileTypeAssociation">
    <uap3:FileTypeAssociation Name=".foo">
      <rescap3:MigrationProgIds>
        <rescap3:MigrationProgId>Foo.Bar.1</rescap3:MigrationProgId>
      </rescap3:MigrationProgIds>
      …
    </uap3:FileTypeAssociation>
  </uap:Extension>
</Extensions>
```

## Options / Props

| Scenario | Steps |
|---|---|
| 1. Auto-update unpackaged to packaged | Enable pin migration; silently install Store version; tell users the app will restart; launch Store version and close web version; migrate data to the new app data folder; programmatically uninstall the unpackaged version |
| 2. Both versions installed | Enable pin migration; Store app detects and uninstalls the unpackaged version at launch; launching the unpackaged app launches the packaged one; optionally migrate data; uninstall unpackaged |

| Task | Method |
|---|---|
| Detect packaged version installed | Win32 `GetPackagesByPackageFamily` with the Package Family Name; count > 0 means installed |
| Find uninstaller | Registry `HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft\Windows\CurrentVersion\Uninstall\<your product code GUID>`, run the `UninstallString` value (silently or inform the user) |
| Old data location | `%localAppData%/<YourPublisherName>/<YourAppName>` |
| New data location | `Windows.Storage.ApplicationData.Current.LocalFolder.Path` |

## Notes

- Using both versions side by side is allowed, but the app must manage conflicts and sync data itself.
- Packaged app data space is deleted automatically on uninstall; migrating on first launch is highly recommended, not mandatory.
- The silent install assigns an entitlement to the current Store user, or to the device if no Store account; no toast notifications; progress is monitored via `StatusChanged` / `Completed`.
- In-app purchases: since June 2021 the Store allows publishers to use their own or third-party commerce platforms in addition to Microsoft's; keep verifying entitlements as in the unpackaged version.
- Paid users of the unpackaged app shouldn't pay again: offer a free/demo version unlockable by license sign-in or key, or set the app paid and distribute promotional (coupon) codes through your own channels.
- After install, pins in the taskbar / Start menu (and Windows 10 tiles) launch the Store app; the system migrates listed ProgIds to the packaged app after installation.

## Related

- [Microsoft Store Web Installer and Store Badges / Links](./store-web-installer.md)
- [Distribute a Win32 App](./distribute-win32-app.md)
- [Product Identity Details and App Name Reservations](./product-identity-and-name-management.md)
