# QueryOptions

Specifies the parameters of a search query for enumerating the contents of storage folders: filters, sort order, folder depth, and whether the Windows Search indexer or the raw file system is used to produce results.

## Signature / Usage

```csharp
public sealed class QueryOptions
```

```csharp
List<string> fileTypeFilter = new List<string> { ".png" };
QueryOptions queryOptions = new QueryOptions(CommonFileQuery.OrderByName, fileTypeFilter)
{
    IndexerOption = IndexerOption.OnlyUseIndexer
};

StorageFileQueryResult queryResult =
    KnownFolders.PicturesLibrary.CreateFileQueryWithOptions(queryOptions);
var files = await queryResult.GetFilesAsync();

foreach (StorageFile file in files)
{
    var documentProperties = await file.Properties.GetDocumentPropertiesAsync();
    string title = documentProperties.Title;
}
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `QueryOptions()` | constructor | Default: `FolderDepth.Shallow`, `IndexerOption.DoNotUseIndexer` — folder-by-folder enumeration alphabetized by name. |
| `QueryOptions(CommonFileQuery, IIterable<String>)` | constructor | Initializes from a `CommonFileQuery` plus an optional file type extension filter. |
| `QueryOptions(CommonFolderQuery)` | constructor | Initializes for enumerating subfolders based on a `CommonFolderQuery`. |
| `FileTypeFilter` | property | List of file name extensions to include; empty means all types. |
| `FolderDepth` | property | `Shallow` or `Deep` (recursive) enumeration. |
| `IndexerOption` | property | Whether to use the system index (`UseIndexerWhenAvailable`, `OnlyUseIndexer`, `DoNotUseIndexer`, `OnlyUseIndexerAndOptimizeForIndexedProperties`) or the file system directly. The indexer is faster but not available in every location. `OnlyUseIndexerAndOptimizeForIndexedProperties` returns results as quickly as possible but only includes the properties specified in `SetPropertyPrefetch`. |
| `UserSearchFilter` / `ApplicationSearchFilter` | property | Advanced Query Syntax (AQS) strings for keyword/property filtering; combined together. |
| `SortOrder` | property | List of `SortEntry` structures controlling result sort order. |
| `SetPropertyPrefetch(PropertyPrefetchOptions, IIterable<String>)` | method | Preloads specified properties for all result items to speed up later property access. |
| `SetThumbnailPrefetch(ThumbnailMode, UInt32, ThumbnailOptions)` | method | Preloads thumbnails of the given size/mode for result items. |
| `SaveToString()` / `LoadFromString(String)` | method | Serializes/restores `QueryOptions` state as a string, e.g. for persisting a query definition. |

## Notes

- Setting `IndexerOption.OnlyUseIndexer` lets you retrieve properties that depend on another app's property handler (e.g. document `Title`), but the query may fail or return nothing in unindexed locations.
- `SetPropertyPrefetch`/`SetThumbnailPrefetch` trade a longer initial query for faster subsequent property/thumbnail access on the result set — useful when displaying large lists of files with metadata.
- Pass the resulting `QueryOptions` to `StorageFolder.CreateFileQueryWithOptions` to obtain a `StorageFileQueryResult`.
- Fast property access ("Fast access to file properties in WinUI"): set the properties the app will read with `SetPropertyPrefetch`; accessing a property that isn't prefetched incurs a significant performance penalty. With `IndexerOption.OnlyUseIndexerAndOptimizeForIndexedProperties`, results are returned 10 times faster than with the other `IndexerOption` values, and (per the sample's comment) reading prefetched properties via `file.Properties` then runs synchronously rather than asynchronously. Properties not in the query can still be requested, at a performance penalty.
- Page large result sets with `StorageFileQueryResult.GetFilesAsync(startIndex, maxNumberOfItems)` instead of a single `GetFilesAsync()`; it's recommended not to fetch more than 500 files at one time.
- Check `await folder.GetIndexedStateAsync()` first and stop if the state is `IndexedState.NotIndexed` or `IndexedState.Unknown`. If `folder.AreQueryOptionsSupported(options)` is false for the location, clear `SortOrder`.
- Exclude files protected with Windows Information Protection with `ApplicationSearchFilter = "System.Security.EncryptionOwners:[]"`.
- Don't use this pattern for apps that modify metadata of every file or interact with the resulting `StorageFile` objects beyond reading properties. A location can be added to the index with `StorageLibrary.RequestAddFolderAsync`.

## Related

- [File properties](../storage-files/file-properties.md)
- [StorageFileQueryResult](./storage-file-query-result.md)
- [StorageFolderQueryResult / StorageItemQueryResult](./storage-folder-item-query-result.md)
- [CommonFileQuery](./common-file-query.md)
