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
| `IndexerOption` | property | Whether to use the system index (`UseIndexerWhenAvailable`, `OnlyUseIndexer`, `DoNotUseIndexer`) or the file system directly. The indexer is faster but not available in every location. |
| `UserSearchFilter` / `ApplicationSearchFilter` | property | Advanced Query Syntax (AQS) strings for keyword/property filtering; combined together. |
| `SortOrder` | property | List of `SortEntry` structures controlling result sort order. |
| `SetPropertyPrefetch(PropertyPrefetchOptions, IIterable<String>)` | method | Preloads specified properties for all result items to speed up later property access. |
| `SetThumbnailPrefetch(ThumbnailMode, UInt32, ThumbnailOptions)` | method | Preloads thumbnails of the given size/mode for result items. |
| `SaveToString()` / `LoadFromString(String)` | method | Serializes/restores `QueryOptions` state as a string, e.g. for persisting a query definition. |

## Notes

- Setting `IndexerOption.OnlyUseIndexer` lets you retrieve properties that depend on another app's property handler (e.g. document `Title`), but the query may fail or return nothing in unindexed locations.
- `SetPropertyPrefetch`/`SetThumbnailPrefetch` trade a longer initial query for faster subsequent property/thumbnail access on the result set — useful when displaying large lists of files with metadata.
- Pass the resulting `QueryOptions` to `StorageFolder.CreateFileQueryWithOptions` to obtain a `StorageFileQueryResult`.

## Related

- [StorageFileQueryResult](./storage-file-query-result.md)
- [StorageFolderQueryResult / StorageItemQueryResult](./storage-folder-item-query-result.md)
- [CommonFileQuery](./common-file-query.md)
