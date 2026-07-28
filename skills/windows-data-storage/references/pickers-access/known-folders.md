# KnownFolders

Static class providing access to common user-content locations (Documents, Pictures, Music, Videos, removable devices, media server devices) as `StorageFolder` objects. Each folder requires a matching capability declared in the app package manifest.

## Signature / Usage

```csharp
using Windows.Storage;

StorageFolder storageFolder = KnownFolders.PicturesLibrary;
StorageFile file = await storageFolder.CreateFileAsync("sample.png", CreationCollisionOption.ReplaceExisting);
```

```xml
<!-- Package.appxmanifest -->
<Capabilities>
  <Capability Name="picturesLibrary" />
</Capabilities>
```

## Options / Props

| Name | Type | Required capability | Description |
|------|------|----------------------|--------------|
| `DocumentsLibrary` | `StorageFolder` | `documentsLibrary` (+ File Type Associations) | Documents library. |
| `PicturesLibrary` | `StorageFolder` | `picturesLibrary` | Pictures library. |
| `MusicLibrary` | `StorageFolder` | `musicLibrary` | Music library. |
| `VideosLibrary` | `StorageFolder` | `videosLibrary` | Videos library. |
| `RemovableDevices` | `StorageFolder` | `removableStorage` (+ File Type Associations) | Removable storage devices (e.g. SD cards, USB drives). |
| `HomeGroup` | `StorageFolder` | at least one of `musicLibrary`/`picturesLibrary`/`videosLibrary` | HomeGroup shared libraries. |
| `MediaServerDevices` | `StorageFolder` | at least one of `musicLibrary`/`picturesLibrary`/`videosLibrary` | DLNA media server devices. |
| `Objects3D`, `Playlists`, `CameraRoll`, `SavedPictures`, `AppCaptures`, `RecordedCalls` | `StorageFolder` | varies | Additional well-known content folders. |

## Methods

| Name | Description |
|------|--------------|
| `GetFolderAsync(KnownFolderId)` | Retrieves the folder for the specified `KnownFolderId`. |
| `RequestAccessAsync(KnownFolderId)` | Requests the capability/permission controlling access to the folder at runtime. |
| `GetFolderForUserAsync(User, KnownFolderId)` / `RequestAccessForUserAsync(User, KnownFolderId)` | User-scoped variants for multi-user apps. |

## Notes

- Namespace: `Windows.Storage`. Static class — access properties directly (`KnownFolders.PicturesLibrary`), no instantiation.
- Each property requires the matching capability declared in the app manifest's `<Capabilities>` section, or access throws `UnauthorizedAccessException`. See File Access Permissions for the full location-to-capability table.
- `DocumentsLibrary` and `RemovableDevices` additionally require File Type Association declarations naming the specific extensions the app can access.
- Distinct from and narrower than `broadFileSystemAccess` — `KnownFolders` grants access only to the specific library named by the capability, whereas `broadFileSystemAccess` grants access to effectively all user-accessible files.
- Prefer letting the user grant access via a file/folder picker where possible; declaring broad library capabilities is intended for apps whose core purpose requires standing access (e.g. media library managers).

## Related

- [File Access Permissions](./file-access-permissions.md)
- [StorageApplicationPermissions](./storage-application-permissions.md)
- [FolderPicker](./folder-picker.md)
