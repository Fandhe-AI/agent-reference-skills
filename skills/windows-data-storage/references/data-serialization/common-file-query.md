# CommonFileQuery

Enum specifying how to sort files in query results and whether the query is shallow (current folder only) or deep (recursive through subfolders).

## Signature / Usage

```csharp
public enum CommonFileQuery
```

```csharp
var queryOptions = new QueryOptions(CommonFileQuery.OrderByName, new List<string> { ".jpg" });
StorageFileQueryResult query = someFolder.CreateFileQueryWithOptions(queryOptions);
```

## Options / Props

| Value | Numeric | Description |
|-------|---------|-------------|
| `DefaultQuery` | 0 | Shallow list of files in the current folder only, similar to File Explorer. Usable for any storage location. |
| `OrderByName` | 1 | Deep, flat list of files sorted by `System.ItemNameDisplay`. Usable for any storage location. |
| `OrderByTitle` | 2 | Deep, flat list sorted by `System.Title`. Only usable for folders in a library or the HomeGroup folder. |
| `OrderByMusicProperties` | 3 | Deep, flat list sorted by music properties. Library/HomeGroup folders only. |
| `OrderBySearchRank` | 4 | Deep, flat list sorted by `System.Search.Rank` then `System.DateModified`. Usable for any storage location. |
| `OrderByDate` | 5 | Deep, flat list sorted by `System.ItemDate` (a computed, content-type-dependent property, e.g. `System.Photo.DateTaken` for photos). Library/HomeGroup folders only. |

## Notes

- Files without a value for the property used to sort are typically excluded from query results.
- Call `StorageFolder.IsCommonFileQuerySupported(CommonFileQuery)` to check whether a given value is supported for the current folder before using it.
- A `CommonFileQuery` value is consumed by `StorageFolder.CreateFileQuery`, `StorageFolder.GetFilesAsync(CommonFileQuery)`, or via the `QueryOptions(CommonFileQuery, IIterable<String>)` constructor, which uses it to initialize `FolderDepth`, `IndexerOption`, and `SortOrder`.

## Related

- [QueryOptions](./query-options.md)
- [StorageFileQueryResult](./storage-file-query-result.md)
