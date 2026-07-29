# StorageFile Streamed Content (CreateStreamedFileAsync)

Static `StorageFile` methods that let an app produce or download a file's content lazily, only when the returned `StorageFile` is first accessed, instead of writing the data up front.

## Signature / Usage

```csharp
using Windows.Storage;
using Windows.Storage.Streams;

// 1. Produce data on-demand via a handler invoked on first access
StorageFile streamedFile = await StorageFile.CreateStreamedFileAsync(
    "generated.txt",
    async request =>
    {
        using (IRandomAccessStream stream = request.AsStreamForWrite().AsRandomAccessStream())
        {
            // Write the content into `request` here, then request.Dispose()
        }
        request.Dispose();
    },
    thumbnail: null);

// 2. Replace an existing file's content on-demand
StorageFile replaced = await StorageFile.ReplaceWithStreamedFileAsync(
    existingFile, dataRequestedHandler, thumbnail: null);

// 3. Download from a URI on first access — system supplies the handler
StorageFile downloaded = await StorageFile.CreateStreamedFileFromUriAsync(
    "picture.jpg", new Uri("https://example.com/picture.jpg"), thumbnail: null);
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `CreateStreamedFileAsync(String displayNameWithExtension, StreamedFileDataRequestedHandler dataRequested, IRandomAccessStreamReference thumbnail)` | static method | Creates a `StorageFile` representing a stream of data the app produces on-demand: `dataRequested` is invoked the first time the returned file is accessed. |
| `ReplaceWithStreamedFileAsync(IStorageFile fileToReplace, StreamedFileDataRequestedHandler dataRequested, IRandomAccessStreamReference thumbnail)` | static method | Replaces the contents of `fileToReplace` with a new on-demand data stream; the returned `StorageFile` should be used afterward instead of the original. |
| `CreateStreamedFileFromUriAsync(String displayNameWithExtension, Uri uri, IRandomAccessStreamReference thumbnail)` | static method | Creates a `StorageFile` that downloads `uri` on first access; nearly equivalent to `CreateStreamedFileAsync` but the system supplies the `StreamedFileDataRequestedHandler` and implements the download itself. |

## Notes

- Namespace `Windows.Storage`. All three methods are attributed `[RemoteAsync]` — the returned `StorageFile` can be passed to other methods or handed to another app through app contracts (e.g. a share or picker contract), and the data-producing handler runs on the receiving side.
- Purpose is to defer expensive data production/download until the data is actually needed, avoiding UI delays at creation time.
- `thumbnail` is optional (`null` allowed); for a high-quality thumbnail, one edge should be at least 1024 pixels.
- `ReplaceWithStreamedFileAsync` takes the file to replace as `IStorageFile`, but still returns a concrete `StorageFile` that must be used for subsequent access instead of the original reference.

## Related

- [StorageFile](./storage-file.md)
- [IRandomAccessStream](./irandom-access-stream.md)
- [StorageItemThumbnail](./storage-item-thumbnail.md)
