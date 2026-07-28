# BackgroundDownloader

Configures a background download before creating the actual `DownloadOperation` via `CreateDownload`. Downloads persist across app suspension and termination.

## Signature / Usage

```csharp
using Windows.Networking.BackgroundTransfer;
using Windows.Storage;

Uri source = new Uri("https://contoso.com/movie.mp4");
StorageFile destinationFile = await KnownFolders.VideosLibrary.CreateFileAsync(
    "movie.mp4", CreationCollisionOption.GenerateUniqueName);

BackgroundDownloader downloader = new BackgroundDownloader();
DownloadOperation download = downloader.CreateDownload(source, destinationFile);
await download.StartAsync();
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `CostPolicy` | `BackgroundTransferCostPolicy` | Cost policy governing whether the transfer runs on metered/roaming connections. |
| `ServerCredential` / `ProxyCredential` | `PasswordCredential` | Authentication credentials, securely stored via WinVault when supported by WinINet. |
| `Method` | `String` | HTTP method for the download; defaults to GET. |
| `TransferGroup` | `BackgroundTransferGroup` | Group the operation belongs to, for grouped enumeration/prioritization. |
| `CreateDownload(Uri, IStorageFile)` / `CreateDownload(Uri, IStorageFile, IStorageFile)` | method | Creates a `DownloadOperation` for the given source URI and destination file. |
| `CreateDownloadAsync(Uri, IStorageFile, IInputStream)` | method | Creates a download that also uploads a request body from the given input stream. |
| `GetCurrentDownloadsAsync()` / `GetCurrentDownloadsForTransferGroupAsync(BackgroundTransferGroup)` | method | Enumerates pending downloads; call at app start-up to reattach downloads from a previous session. |
| `SetRequestHeader(String, String)` | method | Sets an HTTP request header for the download. |

## Notes

- Namespace: `Windows.Networking.BackgroundTransfer` (WinRT). Requires `internetClient`, `internetClientServer`, and `privateNetworkClientServer` app capabilities.
- Intended for long-term transfers of large resources (video, music, large images). For short transfers of a few KB, use `Windows.Web.Http.HttpClient` instead.
- Background transfer does not support concurrent downloads of the same URI; starting two downloads of the same URI at once may result in truncated files.
- FTP downloads are supported, with credentials embedded in the URI (`ftp://user:password@server/file.txt`).
- At every app start-up, enumerate existing `DownloadOperation` instances via `GetCurrentDownloadsAsync` and reattach (`AttachAsync`) or cancel them; unenumerated operations remain incomplete and continue occupying resources.

## Related

- [DownloadOperation](./download-operation.md)
- [BackgroundUploader](./background-uploader.md)
- [Windows.Web.Http vs System.Net.Http](./windows-vs-dotnet-http.md)
