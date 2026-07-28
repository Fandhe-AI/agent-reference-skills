# IRandomAccessStream

Interface supporting random (seekable) access to data in input and output streams. Implemented by `StorageFile`'s stream results, `InMemoryRandomAccessStream`, `FileRandomAccessStream`, and `StorageItemThumbnail`, among others.

## Signature / Usage

```csharp
public interface IRandomAccessStream : IDisposable, IInputStream, IOutputStream

IRandomAccessStream stream = await file.OpenAsync(FileAccessMode.ReadWrite);
stream.Seek(0);
ulong size = stream.Size;

// Read/write via IInputStream/IOutputStream members (typically through DataReader/DataWriter)
IBuffer buffer = new Windows.Storage.Streams.Buffer(1024);
await stream.ReadAsync(buffer, 1024, InputStreamOptions.None);
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `Size` | `ulong` | Gets or sets the size of the stream. |
| `Position` | `ulong` | Current byte offset within the stream. |
| `CanRead` / `CanWrite` | `bool` | Whether the stream supports reading / writing. |
| `Seek(UInt64)` | method | Sets the stream position to the specified offset. |
| `GetInputStreamAt(UInt64)` | method | Returns an `IInputStream` positioned at the given offset. |
| `GetOutputStreamAt(UInt64)` | method | Returns an `IOutputStream` positioned at the given offset. |
| `CloneStream()` | method | Creates a new `IRandomAccessStream` over the same underlying resource, with an independent position. |
| `ReadAsync(IBuffer, UInt32, InputStreamOptions)` | method (from `IInputStream`) | Reads data asynchronously into a buffer. |
| `WriteAsync(IBuffer)` | method (from `IOutputStream`) | Writes data asynchronously from a buffer. |
| `FlushAsync()` | method (from `IOutputStream`) | Flushes buffered data to the underlying store. |

## Notes

- Namespace `Windows.Storage.Streams`. Obtained from `StorageFile.OpenAsync` / `OpenReadAsync` / `OpenTransactedWriteAsync`, or created directly via `InMemoryRandomAccessStream` for in-memory buffers.
- Rarely used raw for reading/writing typed data — pair with `DataReader`/`DataWriter` for structured reads/writes, or convert to/from a .NET `Stream` via the `AsStream()` / `AsRandomAccessStream()` extension methods (`System.IO` interop) when working with .NET APIs like `BinaryReader`.
- Implements both `IDisposable` and WinRT's `IClosable` — dispose/close when done.

## Related

- [StorageStreamTransaction](./storage-stream-transaction.md)
- [DataReader / DataWriter](./data-reader-writer.md)
- [StorageItemThumbnail](./storage-item-thumbnail.md)
- [System.IO vs Windows.Storage](./system-io-vs-windows-storage.md)
