# BackgroundUploader

Configures a background upload before creating the actual `UploadOperation` via `CreateUpload`. Uploads persist across app suspension and termination.

## Signature / Usage

```csharp
using Windows.Networking.BackgroundTransfer;
using Windows.Storage;
using Windows.Storage.Pickers;

Uri uri = new Uri("https://contoso.com/upload");
FileOpenPicker picker = new FileOpenPicker();
picker.FileTypeFilter.Add("*");
StorageFile file = await picker.PickSingleFileAsync();

BackgroundUploader uploader = new BackgroundUploader();
uploader.SetRequestHeader("Filename", file.Name);
UploadOperation upload = uploader.CreateUpload(uri, file);
await upload.StartAsync();
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `CostPolicy` | `BackgroundTransferCostPolicy` | Cost policy governing whether the transfer runs on metered/roaming connections. |
| `ServerCredential` / `ProxyCredential` | `PasswordCredential` | Authentication credentials, securely stored via WinVault when supported by WinINet. |
| `Method` | `String` | HTTP method for the upload; defaults to POST. |
| `TransferGroup` | `BackgroundTransferGroup` | Group the operation belongs to. |
| `CreateUpload(Uri, IStorageFile)` | method | Creates an `UploadOperation` for the given destination URI and source file. |
| `CreateUploadAsync(Uri, IIterable<BackgroundTransferContentPart>, ...)` | method | Creates a multipart form-data upload from one or more content parts. |
| `CreateUploadFromStreamAsync(Uri, IInputStream)` | method | Creates an upload sourced from an input stream. |
| `GetCurrentUploadsAsync()` / `GetCurrentUploadsForTransferGroupAsync(BackgroundTransferGroup)` | method | Enumerates pending uploads; call at app start-up to reattach uploads from a previous session. |
| `SetRequestHeader(String, String)` | method | Sets an HTTP request header for the upload. |

## Notes

- Namespace: `Windows.Networking.BackgroundTransfer` (WinRT). Requires `internetClient`, `internetClientServer`, and `privateNetworkClientServer` app capabilities.
- Works in WinUI 3 (Windows App SDK) desktop apps and UWP apps, but requires package identity; unpackaged apps cannot use this API.
- An app should not have more than 200 transfers (DownloadOperations + UploadOperations) at any given time; exceeding that limit may leave the transfer queue in an unrecoverable state.
- Intended for long-term transfers of large resources. For short transfers of a few KB, use `Windows.Web.Http.HttpClient` instead.
- FTP uploads are not supported.
- After app termination, enumerate existing `UploadOperation` instances via `GetCurrentUploadsAsync` at next start-up; once enumerated, PUT uploads automatically restart while POST uploads terminate.

## Related

- [BackgroundDownloader](./background-downloader.md)
- [DownloadOperation](./download-operation.md)
