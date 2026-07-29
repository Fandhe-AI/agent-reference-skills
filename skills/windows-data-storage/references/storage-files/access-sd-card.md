# Accessing the SD card

Reads and writes non-essential data on an optional removable SD card via `KnownFolders.RemovableDevices`, which is the logical root `StorageFolder` for currently connected removable devices. Requires the `removableStorage` capability plus registered file-type associations for the extensions the app accesses.

## Signature / Usage

```csharp
using Windows.Storage;

// Get the logical root folder for all external storage devices
StorageFolder externalDevices = KnownFolders.RemovableDevices;

// The first (and only) child folder represents the SD card, if one is present
StorageFolder sdCard = (await externalDevices.GetFoldersAsync()).FirstOrDefault();

if (sdCard != null)
{
    // Enumerate recursively — an SD card may hold many gigabytes of data,
    // so do this on a background thread
    var files = await sdCard.GetFilesAsync(CommonFileQuery.DefaultQuery);
    var folders = await sdCard.GetFoldersAsync(CommonFolderQuery.DefaultQuery);
}
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `KnownFolders.RemovableDevices` | `StorageFolder` | Root folder representing all connected removable storage devices; the SD card (if present) is its first child folder. |
| `StorageFolder.GetFoldersAsync(CommonFolderQuery)` / `GetFilesAsync(CommonFileQuery)` | method | Efficient recursive enumeration of the card's contents; needed because arbitrary SD-card folders aren't reachable through `KnownFolders` locations. |
| `StorageFile.GetFileFromPathAsync` | static method | Fails if the app hasn't registered to handle the target file's extension. |

## Notes

- Requires the `removableStorage` capability in the app manifest, plus file-type-association declarations for the extensions the app reads/writes — same model as other non-library `KnownFolders` locations (see File Access Permissions).
- The app can only see files whose extensions it has registered to handle, plus those covered by any media-library capabilities (`musicLibrary`/`picturesLibrary`/`videosLibrary`) it declares; it cannot see system folders, hidden-attribute files, or (via `RemovableDevices`) the Documents library.
- Files an app writes to the SD card in a global location are unencrypted and visible to other apps (and in File Explorer if the card is read from a PC) — unlike files in the app's own `ApplicationData.LocalFolder`, which are encrypted when the app itself is installed on the card.
- An embedded SD-card reader (e.g. built into a laptop chassis) may not be reachable through `KnownFolders.RemovableDevices`.
- Media queries through `KnownFolders.MusicLibrary`/`PicturesLibrary`/`VideosLibrary` already transparently combine results from internal storage and the SD card — use `RemovableDevices` directly only when accessing files outside the media libraries or of types the library capabilities don't cover.
- This guide is archived/previous-versions content originating from the Windows Phone/UWP era; the enumeration pattern (`KnownFolders.RemovableDevices` + recursive `GetFoldersAsync`/`GetFilesAsync`) still applies to desktop packaged apps, but device-identification details tied to `WindowsPhone.ExternalStorageId` are mobile-specific and not relevant to desktop scenarios.

## Related

- [KnownFolders](../pickers-access/known-folders.md)
- [File Access Permissions](../pickers-access/file-access-permissions.md)
- [StorageFolder](./storage-folder.md)
