# IStorageItem

Base interface implemented by both `StorageFile` and `StorageFolder`. Manipulates storage items (files and folders) and their contents, and provides information about them.

## Signature / Usage

```csharp
public interface IStorageItem

// Treat a file or folder polymorphically
async Task PrintInfoAsync(IStorageItem item)
{
    Console.WriteLine($"{item.Name} at {item.Path}, created {item.DateCreated}");
    if (item.IsOfType(StorageItemTypes.Folder))
    {
        // it's a StorageFolder
    }
}
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `Name` | `string` | Name of the item including the extension, if any. |
| `Path` | `string` | Full file-system path of the item, if it has one. |
| `DateCreated` | `DateTimeOffset` | Creation date/time. |
| `Attributes` | `FileAttributes` | Attributes of the item (e.g. `ReadOnly`, `Directory`). |
| `DeleteAsync()` / `DeleteAsync(StorageDeleteOption)` | method | Deletes the current item. |
| `GetBasicPropertiesAsync()` | method | Gets basic properties (size, dates) shared by files and folders. |
| `IsOfType(StorageItemTypes)` | method | Checks whether the item matches `StorageItemTypes.File` or `StorageItemTypes.Folder`. |
| `RenameAsync(String, NameCollisionOption)` | method | Renames the current item. |

## Notes

- Namespace `Windows.Storage`. Prefer working directly with `StorageFile` / `StorageFolder` in application code; `IStorageItem` is primarily useful for APIs that accept either (e.g. drag-and-drop, `DataPackage` content).
- Also implemented by `Windows.Storage.BulkAccess.FileInformation` / `FolderInformation` and derived interfaces `IStorageFile`, `IStorageFolder`, `IStorageItem2`.

## Related

- [StorageFile](./storage-file.md)
- [StorageFolder](./storage-folder.md)
