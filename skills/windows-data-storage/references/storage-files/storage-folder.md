# StorageFolder

Manages folders and their contents and provides information about them. Sealed class in `Windows.Storage`, implements `IStorageFolder`, `IStorageItem`, `IStorageFolderQueryOperations`.

## Signature / Usage

```csharp
public sealed class StorageFolder :
    IStorageFolder, IStorageFolder2, IStorageItem2,
    IStorageItemProperties2, IStorageItemPropertiesWithProvider, IStorageFolderQueryOperations

// Get a StorageFolder for an absolute path
StorageFolder folder = await StorageFolder.GetFolderFromPathAsync(@"C:\Users\Public\Documents");

// Create file / folder
StorageFile newFile = await folder.CreateFileAsync("notes.txt", CreationCollisionOption.ReplaceExisting);
StorageFolder subFolder = await folder.CreateFolderAsync("Archive", CreationCollisionOption.OpenIfExists);

// Enumerate contents
IReadOnlyList<IStorageItem> items = await folder.GetItemsAsync();
IReadOnlyList<StorageFile> files = await folder.GetFilesAsync();

// Safe lookup (returns null instead of throwing)
IStorageItem maybeItem = await folder.TryGetItemAsync("notes.txt");
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `GetFolderFromPathAsync(String)` | static method | Gets a `StorageFolder` for the folder at the specified absolute path. |
| `CreateFileAsync(String, CreationCollisionOption)` | method | Creates a new file in the folder; collision option controls behavior when a file with the same name exists. |
| `CreateFolderAsync(String, CreationCollisionOption)` | method | Creates a new subfolder; same collision semantics as `CreateFileAsync`. |
| `GetItemsAsync()` / `GetItemsAsync(UInt32, UInt32)` | method | Gets files and subfolders in the folder, optionally an index-based range. |
| `GetFilesAsync(CommonFileQuery)` | method | Gets files in the folder, optionally including subfolders and sorted per `CommonFileQuery`. |
| `GetFoldersAsync(CommonFolderQuery)` | method | Gets subfolders in the folder. |
| `GetFileAsync(String)` / `GetFolderAsync(String)` / `GetItemAsync(String)` | method | Gets a specific named file/folder/item; throws `FileNotFoundException` if missing. |
| `TryGetItemAsync(String)` | method | Same as `GetItemAsync` but returns `null` instead of throwing when the item is not found. |
| `DeleteAsync(StorageDeleteOption)` | method | Deletes the folder, optionally bypassing the Recycle Bin. |
| `RenameAsync(String, NameCollisionOption)` | method | Renames the folder in place. |
| `CreationCollisionOption` (enum) | — | `GenerateUniqueName`, `ReplaceExisting`, `FailIfExists`, `OpenIfExists`. |
| `Path` / `Name` / `DisplayName` | `string` | Path (if available), folder name, user-friendly name. |

## Notes

- Namespace `Windows.Storage`; usable from packaged Windows apps (UWP or WinUI 3 / Windows App SDK desktop apps with package identity).
- There is no `MoveAsync` on `StorageFolder`. To "move" a folder, copy its contents to the destination and delete the original.
- Query objects (`CreateFileQuery`, `CreateItemQuery`, etc.) support incremental/virtualized enumeration for large folders; `GetItemsAsync`/`GetFilesAsync`/`GetFoldersAsync` are the simpler one-shot equivalents.
- Distinct from .NET `System.IO.DirectoryInfo` — see the System.IO vs Windows.Storage guide.

## Related

- [StorageFile](./storage-file.md)
- [IStorageItem](./istorage-item.md)
- [FileIO](./file-io.md)
- [PathIO](./path-io.md)
- [System.IO vs Windows.Storage](./system-io-vs-windows-storage.md)
