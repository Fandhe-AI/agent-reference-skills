# StorageLibrary

Represents a virtual collection of folders — a known folder (Music/Pictures/Videos) plus any additional folders the user has added. Lets an app enumerate, add, and remove folders in a library and get notified when the folder set changes. Sealed class in `Windows.Storage`.

## Signature / Usage

```csharp
using Windows.Storage;

// Get a reference to the Pictures library
StorageLibrary picturesLibrary = await StorageLibrary.GetLibraryAsync(KnownLibraryId.Pictures);

// Enumerate the folders currently in the library
IObservableVector<StorageFolder> folders = picturesLibrary.Folders;

// Folder where new files are saved by default
StorageFolder saveFolder = picturesLibrary.SaveFolder;

// Let the user add a folder via a picker ("Add this folder to Pictures")
StorageFolder newFolder = await picturesLibrary.RequestAddFolderAsync();

// Remove a folder from the library (folder itself is not deleted from disk)
bool removed = await picturesLibrary.RequestRemoveFolderAsync(newFolder);

// React to folder-set changes
picturesLibrary.DefinitionChanged += (library, args) => { /* re-enumerate Folders */ };
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `GetLibraryAsync(KnownLibraryId)` | static method | Gets the `StorageLibrary` for `KnownLibraryId.Music` / `Pictures` / `Videos`. |
| `Folders` | `IObservableVector<StorageFolder>` | The root folders currently in the library. |
| `SaveFolder` | `StorageFolder` | The folder where new files are saved by default. |
| `RequestAddFolderAsync()` | method | Shows a folder picker letting the user add a folder to the library; returns the added `StorageFolder` (or `null` if cancelled). |
| `RequestRemoveFolderAsync(IStorageFolder)` | method | Shows a confirmation dialog and removes the specified folder from the library. The folder itself is not deleted from disk. |
| `ChangeTracker` | `StorageLibraryChangeTracker` | Change tracker for file/folder operations under this library's root folders. |
| `DefinitionChanged` | event | Raised when the library's folder set changes (folder added/removed). |

## Notes

- Namespace `Windows.Storage`. Requires the corresponding capability (`musicLibrary` / `picturesLibrary` / `videosLibrary`) declared in `Package.appxmanifest` before calling `GetLibraryAsync`.
- Adding a folder via `RequestAddFolderAsync` leaves it in its original disk location — it becomes an item in `Folders` (and appears in built-in apps like Photos) but is not moved or copied under the known folder in File Explorer.
- Users can also store media on an SD card outside the library folders; `KnownFolders`-based queries transparently combine internal and removable-storage results without needing the `removableStorage` capability.
- Distinct from `KnownFolders` (a static class exposing single `StorageFolder` locations): `StorageLibrary` is the mutable, enumerable collection backing a library, needed when the app must add/remove folders or react to folder-set changes rather than just read files.

## Related

- [KnownFolders](../pickers-access/known-folders.md)
- [StorageLibraryChangeTracker](./storage-library-change-tracker.md)
- [StorageFolder](./storage-folder.md)
