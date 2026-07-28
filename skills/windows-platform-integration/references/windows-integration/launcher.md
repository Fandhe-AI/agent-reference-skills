# Launcher

Static class that starts the default app associated with the specified file, folder, or URI.

## Signature / Usage

```csharp
// Launch a URI with the default handler
var uri = new Uri("https://learn.microsoft.com");
bool success = await Windows.System.Launcher.LaunchUriAsync(uri);

// Launch a file with the default handler
StorageFile file = await KnownFolders.PicturesLibrary.GetFileAsync("photo.jpg");
await Windows.System.Launcher.LaunchFileAsync(file);

// Launch with a warning dialog for untrusted content
var options = new Windows.System.LauncherOptions { TreatAsUntrusted = true };
await Windows.System.Launcher.LaunchUriAsync(uri, options);
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `LaunchUriAsync(Uri)` / `LaunchUriAsync(Uri, LauncherOptions)` / `LaunchUriAsync(Uri, LauncherOptions, ValueSet)` | method | Starts the default app registered for the URI's scheme name. |
| `LaunchFileAsync(IStorageFile)` / `LaunchFileAsync(IStorageFile, LauncherOptions)` | method | Starts the default app associated with the specified file. |
| `LaunchFolderAsync(IStorageFolder, FolderLauncherOptions)` / `LaunchFolderPathAsync(String, FolderLauncherOptions)` | method | Opens File Explorer at the specified folder/path. |
| `LaunchUriForResultsAsync(Uri, LauncherOptions, ValueSet)` | method | Launches a URI and asynchronously awaits a result `ValueSet` from the target app (requires the target to declare `ReturnResults`). |
| `FindAppUriHandlersAsync(Uri)` / `FindUriSchemeHandlersAsync(String)` / `FindFileHandlersAsync(String)` | method | Enumerates apps registered to handle a given URI / scheme / file type. |
| `QueryAppUriSupportAsync(Uri)` / `QueryFileSupportAsync(StorageFile)` / `QueryUriSupportAsync(Uri, LaunchQuerySupportType)` | method | Queries whether an app can be activated for the given URI/file before launching. |
| `LauncherOptions.TreatAsUntrusted` | property | Displays a warning dialog before launching (recommended for URIs from untrusted sources). |
| `LauncherOptions.ContentType` | property | Overrides the content type used to pick a handler for a URI. |

## Notes

- Namespace: `Windows.System` (WinRT). `Launcher` is not agile — consider its threading/marshaling model when calling from background threads.
- To have your app itself appear as a launch target, declare a `uap:Protocol` or `uap:FileTypeAssociation` extension in the package manifest — see [Protocol and FileTypeAssociation](./protocol-file-association.md).

## Related

- [Protocol and FileTypeAssociation](./protocol-file-association.md)
- [Protocol activation](./protocol-activation.md)
- [AppDiagnosticInfo](./app-diagnostic-info.md)
