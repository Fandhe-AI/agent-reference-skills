# StorageFile

Represents a file. Provides information about the file and its content, and ways to manipulate it. Sealed class in `Windows.Storage`, implements `IStorageFile`, `IStorageItem`, `IStorageItemProperties`.

## Signature / Usage

```csharp
public sealed class StorageFile :
    IStorageFile, IStorageFile2, IStorageFilePropertiesWithAvailability,
    IStorageItem2, IStorageItemProperties2, IStorageItemPropertiesWithProvider

// Get a StorageFile for an absolute path
StorageFile file = await StorageFile.GetFileFromPathAsync(@"C:\Users\Public\sample.txt");

// Copy / move / delete
StorageFile copy = await file.CopyAsync(destinationFolder, "copy.txt", NameCollisionOption.ReplaceExisting);
await file.MoveAsync(destinationFolder, "renamed.txt", NameCollisionOption.GenerateUniqueName);
await file.DeleteAsync(StorageDeleteOption.PermanentDelete);

// Open a random-access stream
using IRandomAccessStream stream = await file.OpenAsync(FileAccessMode.ReadWrite);

// Content-related properties (music/photo/video metadata etc.)
StorageItemContentProperties properties = file.Properties;
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `GetFileFromPathAsync(String)` | static method | Gets a `StorageFile` for the file at the specified absolute path. |
| `GetFileFromApplicationUriAsync(Uri)` | static method | Gets a `StorageFile` for an app resource (`ms-appx:///`) URI. |
| `CopyAsync(IStorageFolder, String, NameCollisionOption)` | method | Copies the file into the specified folder, optionally renaming it and specifying collision handling. |
| `MoveAsync(IStorageFolder, String, NameCollisionOption)` | method | Moves the file into the specified folder, optionally renaming it and specifying collision handling. |
| `DeleteAsync(StorageDeleteOption)` | method | Deletes the file; `PermanentDelete` bypasses the Recycle Bin. |
| `OpenAsync(FileAccessMode, StorageOpenOptions)` | method | Opens a random-access stream (`IRandomAccessStream`) over the file. |
| `OpenReadAsync()` | method | Opens a random-access stream for reading only. |
| `OpenSequentialReadAsync()` | method | Opens a sequential-access input stream, more efficient for one-pass reads. |
| `OpenTransactedWriteAsync()` | method | Opens a stream wrapped in a `StorageStreamTransaction` for safe (all-or-nothing) writes. |
| `RenameAsync(String, NameCollisionOption)` | method | Renames the file in place. |
| `Properties` | `StorageItemContentProperties` | Content-related properties (music, photo, video, document properties). |
| `Path` | `string` | Full file-system path, if the file has one (may be empty for items outside the file system, e.g. from a picker). |
| `Name` / `DisplayName` / `FileType` / `ContentType` | `string` | Name including extension, user-friendly name, extension, and MIME type. |
| `IsAvailable` | `bool` | Whether the file is local, cached, or needs to be downloaded (cloud providers). |

## Notes

- Namespace `Windows.Storage`; part of the WinRT API surface, usable from any packaged Windows app (UWP or packaged WinUI 3 / Windows App SDK desktop app).
- `StorageFile` objects can't represent `.lnk`, `.url`, or `.wsh` files.
- There is no synchronous API — every I/O operation returns an `IAsyncOperation` and must be awaited.
- For files outside the app's declared capabilities (broad filesystem access), use a file picker or `FutureAccessList`/`MostRecentlyUsedList` from `Windows.Storage.AccessCache` to obtain permission first.
- Distinct from .NET `System.IO.FileInfo` — see the System.IO vs Windows.Storage guide for when to prefer each.

## Related

- [StorageFolder](./storage-folder.md)
- [IStorageItem](./istorage-item.md)
- [FileIO](./file-io.md)
- [PathIO](./path-io.md)
- [CachedFileManager](./cached-file-manager.md)
- [StorageStreamTransaction](./storage-stream-transaction.md)
- [IRandomAccessStream](./irandom-access-stream.md)
- [StorageItemThumbnail](./storage-item-thumbnail.md)
- [System.IO vs Windows.Storage](./system-io-vs-windows-storage.md)
