# DataReader / DataWriter

`DataReader` reads typed data from an `IInputStream`; `DataWriter` writes typed data to an `IOutputStream`. Both operate over an `IRandomAccessStream` (e.g. one opened from a `StorageFile`) or an in-memory buffer, and are the standard way to serialize primitive values, strings, and buffers in WinRT.

## Signature / Usage

```csharp
public sealed class DataReader : IDisposable, IDataReader
public sealed class DataWriter : IDisposable, IDataWriter

// Writing
using (IRandomAccessStream stream = await file.OpenAsync(FileAccessMode.ReadWrite))
using (DataWriter writer = new DataWriter(stream))
{
    writer.UnicodeEncoding = UnicodeEncoding.Utf8;
    writer.WriteUInt32((uint)writer.MeasureString("hello"));
    writer.WriteString("hello");
    await writer.StoreAsync();
    await writer.FlushAsync();
}

// Reading
using (IRandomAccessStream stream = await file.OpenReadAsync())
using (DataReader reader = new DataReader(stream))
{
    reader.UnicodeEncoding = UnicodeEncoding.Utf8;
    await reader.LoadAsync((uint)stream.Size);
    uint length = reader.ReadUInt32();
    string text = reader.ReadString(length);
}
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `DataReader(IInputStream)` | constructor | Wraps an input stream for reading. |
| `LoadAsync(UInt32)` | method | Buffers up to the specified number of bytes from the stream before reading. |
| `ReadString(UInt32)` / `ReadByte()` / `ReadInt32()` / `ReadBuffer(UInt32)` / etc. | method | Typed read methods; `ReadString` requires the byte length to read (commonly length-prefixed). |
| `UnconsumedBufferLength` | `uint` | Bytes remaining in the buffer loaded by `LoadAsync`. |
| `DetachStream()` / `DetachBuffer()` | method | Detaches the stream/buffer so it survives disposal of the reader. |
| `DataWriter()` / `DataWriter(IOutputStream)` | constructor | Creates a writer over an in-memory buffer, or over an output stream. |
| `WriteString(String)` / `WriteByte(Byte)` / `WriteInt32(Int32)` / `WriteBuffer(IBuffer)` / etc. | method | Typed write methods, buffered until stored. |
| `StoreAsync()` | method | Commits the buffered data to the underlying stream; fails if the writer has no backing stream. |
| `FlushAsync()` | method | Flushes stored data to the underlying store. |
| `MeasureString(String)` | method | Returns the byte size a string would occupy when written, for length-prefixing. |
| `UnicodeEncoding` (both) | `UnicodeEncoding` | Character encoding (`Utf8`, `Utf16LE`, `Utf16BE`) used for string I/O; reader and writer settings must match. |
| `ByteOrder` (both) | `ByteOrder` | Byte order (`LittleEndian`/`BigEndian`) for numeric values; reader and writer settings must match. |

## Notes

- Namespace `Windows.Storage.Streams`.
- `DataReader`/`DataWriter` instances do not support concurrent reads/writes — concurrent use throws `ERROR_INVALID_OPERATION`.
- `ReadString` needs an explicit byte count (not null-terminated), so writers typically prefix each string with its `MeasureString` length via `WriteUInt32`.
- Call `DetachStream()` before disposing if the underlying stream must remain open/usable afterward (e.g. handing it to another consumer).

## Related

- [IRandomAccessStream](./irandom-access-stream.md)
- [StorageStreamTransaction](./storage-stream-transaction.md)
- [StorageFile](./storage-file.md)
