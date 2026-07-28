# FileIO

Static helper class that provides methods for reading and writing files represented by `IStorageFile` (i.e. `StorageFile`) objects, without manually opening streams.

## Signature / Usage

```csharp
public static class FileIO

// Write text
await FileIO.WriteTextAsync(file, "Swift as a shadow");

// Read text
string content = await FileIO.ReadTextAsync(file);

// Append text
await FileIO.AppendTextAsync(file, "\nmore text");

// Read line by line
IList<string> lines = await FileIO.ReadLinesAsync(file);
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `ReadTextAsync(IStorageFile, UnicodeEncoding)` | static method | Reads the file's full contents as a string, with optional explicit encoding. |
| `WriteTextAsync(IStorageFile, String, UnicodeEncoding)` | static method | Overwrites the file's contents with the given string. |
| `AppendTextAsync(IStorageFile, String, UnicodeEncoding)` | static method | Appends the given string to the end of the file. |
| `ReadLinesAsync(IStorageFile, UnicodeEncoding)` | static method | Reads the file and returns its contents as a list of lines. |
| `WriteLinesAsync(IStorageFile, IIterable<String>, UnicodeEncoding)` | static method | Overwrites the file with the given collection of lines. |
| `AppendLinesAsync(IStorageFile, IIterable<String>, UnicodeEncoding)` | static method | Appends the given collection of lines to the file. |
| `ReadBufferAsync(IStorageFile)` | static method | Reads the file's contents into an `IBuffer`. |
| `WriteBufferAsync(IStorageFile, IBuffer)` | static method | Writes an `IBuffer` to the file, overwriting existing contents. |
| `WriteBytesAsync(IStorageFile, Byte[])` | static method | Writes a byte array to the file, overwriting existing contents. |

## Notes

- Namespace `Windows.Storage`. Static class — cannot be instantiated; call methods directly (`FileIO.ReadTextAsync(...)`).
- All read/write operations overwrite the entire file content unless using an `Append*` variant; there is no partial/random-access write via `FileIO` — use `StorageFile.OpenAsync` + `IRandomAccessStream`/`DataWriter` for that.
- For repeated writes to the same file, opening the file once with `OpenAsync`/`OpenTransactedWriteAsync` and using `DataWriter` is more efficient than repeated `FileIO` calls.
- Counterpart operating on paths/URIs directly (without first obtaining a `StorageFile`) is `PathIO`.

## Related

- [PathIO](./path-io.md)
- [StorageFile](./storage-file.md)
- [StorageStreamTransaction](./storage-stream-transaction.md)
- [DataReader / DataWriter](./data-reader-writer.md)
