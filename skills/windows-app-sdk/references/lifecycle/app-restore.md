# Windows app restore

Windows app restore backs up a user's installed app list to the cloud and, on a new PC, creates pinned placeholders so users find their apps where they expect them. App restore itself is a Windows OS/Microsoft Store capability, not an SDK API surface — this page covers the app-side tenets that maximize how well an app participates in it.

## Signature / Usage

```csharp
// Write user-generated content to a Known Folder (not app-local storage) so OneDrive
// can back it up and Windows app restore can bring it back on the next device.
var picturesFolder = Windows.Storage.KnownFolders.PicturesLibrary;
var file = await picturesFolder.CreateFileAsync("photo.jpg", CreationCollisionOption.ReplaceExisting);
await Windows.Storage.FileIO.WriteBytesAsync(file, photoBytes);
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| Publish to the Microsoft Store | tenet | Trusted distribution; restored PCs get automatic **All Apps**/Start/taskbar placeholders that install the app on click. |
| Package the app (MSIX) | tenet | Packaged apps let the system understand which files/data/settings belong to the app, enabling on-demand restore/rehydration after reinstall. |
| Store critical app state in the cloud | tenet | Recents, favorites, and preferences should live in a cloud service, not only local state, so a new device starts from the same app state. |
| Write user-generated content to Known Folders | tenet | Use `FOLDERID_Documents` / `FOLDERID_Pictures` / `FOLDERID_Music` / `FOLDERID_Videos` (via `Windows.Storage.KnownFolders`) so OneDrive can sync/back the content up. |
| `FOLDERID_LocalAppData` | known folder | For machine-specific data (e.g. GPU-tuned performance settings) that should *not* roam between devices. |

## Notes

- No dedicated Windows App SDK class exists for this feature — it is a set of app-authoring best practices Windows relies on when backing up/restoring a device.
- Unpackaged apps that cannot ship as MSIX should still set `InstallLocation` (`ARPINSTALLLOCATION` for Windows Installer) in their uninstall registry key and give Start menu shortcuts a machine-independent `System.AppUserModel.ID`, so shortcuts can be mapped back to the product after restore.

## Related

- [Application](./application.md)
