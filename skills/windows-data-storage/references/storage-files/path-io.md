# PathIO

Static helper class that provides methods for reading and writing a file directly by its absolute path or URI, without first obtaining a `StorageFile` object.

## Signature / Usage

```csharp
public static class PathIO

string filePathOrURI = @"C:\examplepath\sampleFile.dat"; // or "ms-appdata:///local/sampleFile.dat"

// Write text
await PathIO.WriteTextAsync(filePathOrURI, "Swift as a shadow");

// Read text
string content = await PathIO.ReadTextAsync(filePathOrURI);
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `ReadTextAsync(String, UnicodeEncoding)` | static method | Reads the file at the path/URI and returns its contents as a string. |
| `WriteTextAsync(String, String, UnicodeEncoding)` | static method | Overwrites the file at the path/URI with the given string. |
| `AppendTextAsync(String, String, UnicodeEncoding)` | static method | Appends the given string to the file at the path/URI. |
| `ReadLinesAsync(String, UnicodeEncoding)` | static method | Reads the file and returns its contents as a list of lines. |
| `WriteLinesAsync(String, IIterable<String>, UnicodeEncoding)` | static method | Overwrites the file with the given collection of lines. |
| `AppendLinesAsync(String, IIterable<String>, UnicodeEncoding)` | static method | Appends the given collection of lines to the file. |
| `ReadBufferAsync(String)` | static method | Reads the file's contents into an `IBuffer`. |
| `WriteBufferAsync(String, IBuffer)` | static method | Writes an `IBuffer` to the file, overwriting existing contents. |
| `WriteBytesAsync(String, Byte[])` | static method | Writes a byte array to the file, overwriting existing contents. |

## Notes

- Namespace `Windows.Storage`. Static class — cannot be instantiated.
- Accepts either a file-system path (`C:\...`) or an app URI (e.g. `ms-appdata:///local/...`, `ms-appx:///Assets/...`).
- Requires that the app already has permission to access the target location (see File access permissions in the official docs); it does not itself grant access the way a file picker does.
- Functionally equivalent to `FileIO`, but skips the intermediate `StorageFile.GetFileFromPathAsync` call — convenient for quick, one-off reads/writes when you already know the path.

## Related

- [FileIO](./file-io.md)
- [StorageFile](./storage-file.md)
