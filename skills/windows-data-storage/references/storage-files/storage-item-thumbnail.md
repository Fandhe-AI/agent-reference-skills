# StorageItemThumbnail

Represents the thumbnail image associated with a system resource such as a file or folder. Returned by methods like `StorageFile.GetThumbnailAsync`.

## Signature / Usage

```csharp
public sealed class StorageItemThumbnail : IDisposable, IRandomAccessStreamWithContentType

const uint requestedSize = 190;
StorageItemThumbnail thumbnail = await file.GetThumbnailAsync(
    ThumbnailMode.PicturesView, requestedSize, ThumbnailOptions.UseCurrentScale);

// thumbnail implements IRandomAccessStream, so it can back a BitmapImage
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `Type` | `ThumbnailType` | Indicates whether the thumbnail is an `Icon` or an `Image`. |
| `OriginalHeight` / `OriginalWidth` | `uint` | Original (unscaled) dimensions of the thumbnail image. |
| `ReturnedSmallerCachedSize` | `bool` | Whether a smaller cached thumbnail was returned instead of the requested size. |
| `ContentType` | `string` | MIME type of the thumbnail image. |
| `Size` | `ulong` | Size in bytes of the thumbnail stream (from `IRandomAccessStream`). |
| `CanRead` / `CanWrite` | `bool` | Whether the thumbnail stream can be read/written. |
| `GetInputStreamAt(UInt64)` | method | Gets the raw, undecoded thumbnail image data as a stream. |

## Notes

- Namespace `Windows.Storage.FileProperties`. Implements `IRandomAccessStream`/`IRandomAccessStreamWithContentType`, so it can be assigned directly to XAML `BitmapImage.SetSourceAsync` or similar APIs.
- Obtained via `StorageFile.GetThumbnailAsync(ThumbnailMode, requestedSize, ThumbnailOptions)` / `GetScaledImageAsThumbnailAsync`, or the equivalent `StorageFolder` methods; not constructed directly.
- Other Windows Runtime objects (e.g. `Contact.Thumbnail`) expose the same type for their own thumbnail data.

## Related

- [StorageFile](./storage-file.md)
- [IRandomAccessStream](./irandom-access-stream.md)
