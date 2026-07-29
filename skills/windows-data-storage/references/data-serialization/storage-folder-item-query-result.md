# StorageFolderQueryResult / StorageItemQueryResult

Sibling result types to `StorageFileQueryResult`, returned by `StorageFolder.CreateFolderQueryWithOptions()` (folders/file groups only) and `StorageFolder.CreateItemQueryWithOptions()` (mixed files and folders).

## Signature / Usage

```csharp
public sealed class StorageFolderQueryResult
public sealed class StorageItemQueryResult
```

```csharp
// StorageFolderQueryResult: enumerate subfolders (or file groups when combined with CommonFolderQuery.GroupByMonth)
QueryOptions queryOptions = new QueryOptions(CommonFolderQuery.GroupByMonth);
StorageFolderQueryResult folderQueryResult =
    KnownFolders.PicturesLibrary.CreateFolderQueryWithOptions(queryOptions);
IReadOnlyList<StorageFolder> folders = await folderQueryResult.GetFoldersAsync();

// StorageItemQueryResult: enumerate both files and folders together
StorageItemQueryResult itemQueryResult =
    KnownFolders.PicturesLibrary.CreateItemQueryWithOptions(new QueryOptions());
IReadOnlyList<IStorageItem> items = await itemQueryResult.GetItemsAsync();
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `Folder` | property (both) | The `StorageFolder` originally used to create the query result; represents the scope of the query. |
| `GetFoldersAsync()` | async method (`StorageFolderQueryResult`) | Retrieves all folders (or file groups) in the result set. |
| `GetFoldersAsync(UInt32, UInt32)` | async method (`StorageFolderQueryResult`) | Retrieves folders (or file groups) in a specified range (start index, count). |
| `GetItemsAsync()` | async method (`StorageItemQueryResult`) | Retrieves all items (files and folders) in the result set. |
| `GetItemsAsync(UInt32, UInt32)` | async method (`StorageItemQueryResult`) | Retrieves items (files and folders) in a specified range. |
| `GetItemCountAsync()` | async method (both) | Retrieves the number of folders/file groups (or items) in the result set. |
| `ApplyNewQueryOptions(QueryOptions)` | method (both) | Updates the query with new `QueryOptions` without recreating it. |
| `GetCurrentQueryOptions()` | method (both) | Retrieves the `QueryOptions` currently used by the query. |
| `FindStartIndexAsync(Object)` | method (both) | Retrieves the index of the folder/item that most closely matches a property value, using the first `SortEntry` of `QueryOptions.SortOrder`. |
| `ContentsChanged` | event (both) | Fires when a file/item is added, deleted, or modified in the queried folder. Only fires after the corresponding `Get*Async` method has been called at least once. |
| `OptionsChanged` | event (both) | Fires when the query options change. |

## Notes

- Obtain a `StorageFolderQueryResult` via `StorageFolder.CreateFolderQuery`/`CreateFolderQueryWithOptions(QueryOptions)` (or the equivalent `FolderInformation` methods); obtain a `StorageItemQueryResult` via `StorageFolder.CreateItemQuery`/`CreateItemQueryWithOptions(QueryOptions)`. Neither is constructed directly.
- `StorageFolderQueryResult` enumerates only folders — pass a `CommonFolderQuery` (e.g. `GroupByMonth`, `GroupByYear`) via `QueryOptions(CommonFolderQuery)` to group files into per-period virtual subfolders instead of literal subdirectories.
- `StorageItemQueryResult` enumerates both files and folders together as `IStorageItem`, unlike `StorageFileQueryResult` (files only) and `StorageFolderQueryResult` (folders only).
- Both implement `IStorageQueryResultBase` and are agile for threading/marshaling purposes, same as `StorageFileQueryResult`.
- Accessing library folders such as `KnownFolders.PicturesLibrary` requires the corresponding capability declared in the app manifest.

## Related

- [StorageFileQueryResult](./storage-file-query-result.md)
- [QueryOptions](./query-options.md)
- [CommonFileQuery](./common-file-query.md)
