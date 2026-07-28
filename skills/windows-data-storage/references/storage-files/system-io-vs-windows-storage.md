# System.IO vs Windows.Storage

Guidance on choosing between the WinRT `Windows.Storage` / `Windows.Storage.Streams` APIs and the .NET `System.IO` APIs (`File`, `Directory`, `FileStream`, `DirectoryInfo`, `DriveInfo`, ...) when building packaged Windows apps (UWP or WinUI 3 / Windows App SDK desktop apps).

## Signature / Usage

```csharp
// Windows.Storage (WinRT) — required for pickers, cloud/roaming-aware locations,
// sandboxed capability-based access, and cross-platform-friendly async APIs
StorageFile file = await StorageFile.GetFileFromPathAsync(path);
string text = await FileIO.ReadTextAsync(file);

// System.IO (.NET) — available in packaged desktop (WinUI 3) apps that declare
// the runFullTrust capability; same access as any other .NET desktop app
using FileStream fs = new(path, FileMode.Open, FileAccess.Read);
using StreamReader reader = new(fs);
string text2 = reader.ReadToEnd();

// Converting between .NET Stream and WinRT IRandomAccessStream/IInputStream/IOutputStream
using System.IO;
IRandomAccessStream winrtStream = dotnetStream.AsRandomAccessStream();
Stream dotnetStream2 = winrtStream.AsStream();
```

## Options / Props

| Approach | Availability | Typical use |
|----------|--------------|-------------|
| `Windows.Storage` (`StorageFile`, `StorageFolder`, `FileIO`, `PathIO`) | UWP apps; packaged WinUI 3 / Windows App SDK apps | File/folder pickers, `KnownFolders`, roaming/cloud-aware storage, capability-declared library access (`picturesLibrary`, etc.), sharing `StorageFile` objects across WinRT APIs (image decoding, media playback). |
| `System.IO` (`File`, `Directory`, `FileStream`, `DirectoryInfo`, `DriveInfo`) | Packaged desktop apps (WinUI 3) with `runFullTrust` capability; any .NET app | Full, unrestricted filesystem access equivalent to a classic desktop app; drive enumeration; synchronous I/O; interop with existing .NET code/libraries that expect `Stream`. |

## Notes

- A new WinUI 3 project's `Package.appxmanifest` declares `runFullTrust` by default, which grants `System.IO` the same unrestricted file-system access as any other .NET desktop app — it is not sandboxed the way pure UWP apps are.
- `Windows.Storage` APIs are all asynchronous (`IAsyncOperation`); `System.IO` offers both synchronous and asynchronous members.
- To bridge the two, use the `AsStream()` / `AsRandomAccessStream()` / `AsInputStream()` / `AsOutputStream()` extension methods (from `System.Runtime.InteropServices.WindowsRuntime` in .NET Framework, or built into WinRT projections in modern .NET) rather than re-reading data through both APIs.
- For file/folder pickers in WinUI 3 apps specifically, prefer the newer `Microsoft.Windows.Storage.Pickers` namespace (Windows App SDK 1.8+) over `Windows.Storage.Pickers`; it returns string paths (`PickFileResult`/`PickFolderResult`) instead of `StorageFile`/`StorageFolder`, and integrates with `System.IO` more directly.

## Related

- [StorageFile](./storage-file.md)
- [FileIO](./file-io.md)
- [PathIO](./path-io.md)
- [IRandomAccessStream](./irandom-access-stream.md)
