# Optimize file access

Techniques for efficient file-system access (property prefetch) and tuning `.NET`/Windows Runtime stream buffering.

## Signature / Usage

```csharp
// Prefetch specific properties instead of querying them one-by-one per file.
var queryOptions = new Windows.Storage.Search.QueryOptions(CommonFileQuery.OrderByDate, null);
queryOptions.SetThumbnailPrefetch(ThumbnailMode.PicturesView, 100, ThumbnailOptions.ReturnOnlyIfCached);
queryOptions.SetPropertyPrefetch(PropertyPrefetchOptions.ImageProperties, new string[] { "System.Size" });

StorageFileQueryResult queryResults = KnownFolders.PicturesLibrary.CreateFileQueryWithOptions(queryOptions);
IReadOnlyList<StorageFile> files = await queryResults.GetFilesAsync();
```

## Options / Props

| API | Purpose |
|-----|---------|
| `QueryOptions.SetPropertyPrefetch` | Batch-prefetch file properties beyond Name/FileType/Path for a collection query — dramatically faster than per-file `Properties.GetImagePropertiesAsync` calls |
| `AsStreamForRead` / `AsStreamForWrite` / `AsStream` (`bufferSize`) | Control the internal buffer size of the adapter between a Windows Runtime stream and a `System.IO.Stream` |
| `Stream.CopyToAsync(destination, bufferSize)` | Override the default copy buffer size for large stream copies |

## Notes

- Avoid buffer sizes larger than ~80 KB where possible — larger buffers land on the large object heap and can degrade garbage collection performance (see garbage collection guidance).
- Set `bufferSize: 0` to disable buffering entirely for low-latency scenarios (e.g. network chat streams) where messages must be sent immediately rather than batched.
- Reuse a local variable for repeatedly-accessed `Windows.Storage` objects (e.g. `ApplicationData.Current.LocalFolder`) instead of re-resolving them each access.

## Related

- [Improve garbage collection performance](./improve-garbage-collection-performance.md)
- [Disk use and memory improvements](./disk-memory.md)
