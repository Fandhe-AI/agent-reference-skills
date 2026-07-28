# File Access Permissions

Overview of which file-system locations a Windows app can access by default, which require a picker interaction, and which require declaring a capability in the app package manifest — including the restricted `broadFileSystemAccess` capability.

## Signature / Usage

```xml
<!-- Package.appxmanifest: declaring the restricted broadFileSystemAccess capability -->
<Package
  ...
  xmlns:rescap="http://schemas.microsoft.com/appx/manifest/foundation/windows10/restrictedcapabilities"
  IgnorableNamespaces="uap mp rescap">
  ...
  <Capabilities>
    <rescap:Capability Name="broadFileSystemAccess" />
  </Capabilities>
</Package>
```

## Options / Props

| Location | Access method | Capability |
|----------|----------------|------------|
| App install directory | `Package.Current.InstalledLocation` or `ms-appx:///` URI | none (read-only, no picker access) |
| App data folders (local/roaming/temp) | `ApplicationData.Current.LocalFolder` / `ms-appdata:///` URI | none (no picker access) |
| Downloads folder (app-created files only) | `DownloadsFolder.CreateFileAsync` / picker for other files | none by default; picker for broader access |
| Removable devices (limited file types) | AutoPlay File Type Associations, or picker | File Type Associations, or picker |
| All user-accessible files (documents, pictures, downloads, desktop, OneDrive, etc.) | `Windows.Storage` APIs directly | `broadFileSystemAccess` (restricted capability) |
| Documents library | `KnownFolders.DocumentsLibrary` | `documentsLibrary` + File Type Associations |
| Music / Pictures / Videos libraries | `KnownFolders.MusicLibrary` / `PicturesLibrary` / `VideosLibrary` | `musicLibrary` / `picturesLibrary` / `videosLibrary` |
| Removable devices (broad) | `KnownFolders.RemovableDevices` | `removableStorage` + File Type Associations |
| HomeGroup / media server (DLNA) libraries | `KnownFolders.HomeGroup` / `MediaServerDevices` | at least one of `musicLibrary`/`picturesLibrary`/`videosLibrary` |
| UNC network folders | `StorageFolder.GetFolderFromPathAsync` / `StorageFile.GetFileFromPathAsync` | `privateNetworkClientServer` + (`internetClient` or `internetClientServer`) + `enterpriseAuthentication` if domain creds needed |
| Any file/folder the user explicitly picks | `FileOpenPicker` / `FileSavePicker` / `FolderPicker` | none — user grant via picker UI |

## Notes

- `broadFileSystemAccess` is a **restricted** capability configurable by the user under **Settings > Privacy > File system**; the app must be resilient to the user toggling it at any time (the platform suspends then force-terminates the app to apply the change). Apps declaring it in a Store submission must justify the usage.
- Picking a file/folder via `FileOpenPicker`/`FileSavePicker`/`FolderPicker` grants access without any manifest capability — this is the lowest-friction and most common approach; combine with `StorageApplicationPermissions.FutureAccessList` to retain that access across sessions.
- `KnownFolders` properties require the matching library capability (see `KnownFolders` page) and are narrower in scope than `broadFileSystemAccess`.
- Locations with "None (no picker access)" cannot be reached through a file/folder picker at all — you must use the dedicated `ApplicationData`/`Package` APIs.

## Related

- [KnownFolders](./known-folders.md)
- [StorageApplicationPermissions](./storage-application-permissions.md)
- [FileOpenPicker](./file-open-picker.md)
- [FileSavePicker](./file-save-picker.md)
- [FolderPicker](./folder-picker.md)
