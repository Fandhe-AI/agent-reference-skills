# DownloadsFolder

Static class that creates files and folders inside the Downloads folder. Sealed/static in `Windows.Storage`; cannot be instantiated.

## Signature / Usage

```csharp
using Windows.Storage;

// Create a new file directly in the Downloads folder — no capability required
StorageFile file = await DownloadsFolder.CreateFileAsync("sample.txt");

// Create with explicit collision handling
StorageFile file2 = await DownloadsFolder.CreateFileAsync(
    "sample.txt", CreationCollisionOption.GenerateUniqueName);

// Create a subfolder in the Downloads folder
StorageFolder folder = await DownloadsFolder.CreateFolderAsync("MyAppDownloads");
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `CreateFileAsync(String)` | static method | Creates a new file inside the Downloads folder. |
| `CreateFileAsync(String, CreationCollisionOption)` | static method | Creates a new file in the Downloads folder, specifying what to do if a file with the same name already exists. |
| `CreateFolderAsync(String)` | static method | Creates a new subfolder in the Downloads folder. |
| `CreateFolderAsync(String, CreationCollisionOption)` | static method | Creates a new subfolder in the Downloads folder, specifying what to do if a subfolder with the same name already exists. |
| `CreateFileForUserAsync(User, String)` | static method | Creates a new file inside the Downloads folder of a specific `User`. |
| `CreateFileForUserAsync(User, String, CreationCollisionOption)` | static method | Creates a new file in the Downloads folder of a specific `User`, specifying collision handling. |
| `CreateFolderForUserAsync(User, String)` | static method | Creates a new subfolder inside the Downloads folder of a specific `User`. |
| `CreateFolderForUserAsync(User, String, CreationCollisionOption)` | static method | Creates a new subfolder in the Downloads folder of a specific `User`, specifying collision handling. |

## Notes

- Namespace `Windows.Storage`. No capability is required to create or access files/folders in the Downloads folder.
- An app can only access the files and folders it created in the Downloads folder; it cannot see or open files created there by other apps unless the user grants access explicitly through a file picker.
- Conversely, once created, another app cannot access your app's Downloads-folder file unless the user selects it via a picker.
- To get broader access to existing content in the Downloads folder (not just what the app itself created), use a file/folder picker rather than `DownloadsFolder`'s `CreateFileAsync`/`CreateFolderAsync` methods.
- Distinct from `KnownFolders`: `KnownFolders` exposes read/enumerate access to well-known locations, while `DownloadsFolder` is specifically for creating new content in the Downloads folder without a capability.

## Related

- [KnownFolders](../pickers-access/known-folders.md)
- [StorageFile](./storage-file.md)
- [StorageFolder](./storage-folder.md)
