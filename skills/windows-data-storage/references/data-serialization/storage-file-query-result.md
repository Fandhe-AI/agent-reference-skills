# StorageFileQueryResult

Provides access to the results of a query of the files in the location represented by a `StorageFolder` object. Use `StorageFileQueryResult` to enumerate the files in that `StorageFolder` location, optionally backed by the Windows Search indexer for faster/richer results.

## Signature / Usage

```csharp
public sealed class StorageFileQueryResult
```

```csharp
List<string> fileTypeFilter = new List<string> { ".jpg", ".png", ".bmp", ".gif" };
var queryOptions = new QueryOptions(CommonFileQuery.OrderByName, fileTypeFilter);

StorageFileQueryResult query = KnownFolders.PicturesLibrary.CreateFileQueryWithOptions(queryOptions);
IReadOnlyList<StorageFile> fileList = await query.GetFilesAsync();

foreach (StorageFile file in fileList)
{
    // Process file
}
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `Folder` | property | The `StorageFolder` that was queried; represents the scope of the query. |
| `GetFilesAsync()` | async method | Retrieves all files in the query result set. |
| `GetFilesAsync(UInt32, UInt32)` | async method | Retrieves a page of files in a specified range (start index, count) — useful for large result sets. |
| `GetItemCountAsync()` | async method | Retrieves the number of files in the result set. |
| `ApplyNewQueryOptions(QueryOptions)` | method | Updates the query with new `QueryOptions` without recreating it. |
| `GetCurrentQueryOptions()` | method | Retrieves the `QueryOptions` currently used by the query. |
| `ContentsChanged` | event | Fires when a file is added, deleted, or modified in the queried folder. Only fires after `GetFilesAsync` has been called at least once. |
| `OptionsChanged` | event | Fires when the query options change. |

## Notes

- Obtain a `StorageFileQueryResult` via `StorageFolder.CreateFileQuery(CommonFileQuery)`, `StorageFolder.CreateFileQueryWithOptions(QueryOptions)`, or the equivalent `FolderInformation` methods — it is not constructed directly.
- Accessing library folders such as `KnownFolders.PicturesLibrary` requires the corresponding capability declared in the app manifest.
- Use `GetFilesAsync(startIndex, count)` for paged enumeration of large folders instead of loading the entire result set with `GetFilesAsync()`.

## Related

- [QueryOptions](./query-options.md)
- [CommonFileQuery](./common-file-query.md)
- [StorageFolderQueryResult / StorageItemQueryResult](./storage-folder-item-query-result.md)
