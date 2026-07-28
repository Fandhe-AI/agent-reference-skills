# DownloadOperation

Represents and performs an asynchronous background download operation created via `BackgroundDownloader.CreateDownload`.

## Signature / Usage

```csharp
using Windows.Networking.BackgroundTransfer;

var progressCallback = new Progress<DownloadOperation>(op =>
{
    double percent = op.Progress.TotalBytesToReceive > 0
        ? 100.0 * op.Progress.BytesReceived / op.Progress.TotalBytesToReceive
        : 0;
});

await download.StartAsync().AsTask(progressCallback);
StorageFile resultFile = download.ResultFile;
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `Guid` | `String` | Unique identifier for the operation, stable for its lifetime. |
| `Progress` | `BackgroundDownloadProgress` | Current transfer progress (bytes received/total, status). |
| `ResultFile` | `IStorageFile` | The destination file supplied when the download was created. |
| `RequestedUri` | `Uri` | Source URI of the download. |
| `CostPolicy` | `BackgroundTransferCostPolicy` | Cost policy for the download. |
| `CurrentWebErrorStatus` | `WebErrorStatus` | Current error status, if any, observable during the download's lifetime. |
| `StartAsync()` | method | Starts the download. |
| `AttachAsync()` | method | Reattaches to monitor progress/completion of a download enumerated from a previous app session. |
| `Pause()` / `Resume()` | method | Pauses/resumes the download; resuming requires the server to support range requests. |
| `GetDownloadedRanges()` | method | Returns the file ranges downloaded so far. |
| `SetRequestHeader(String, String)` / `RemoveRequestHeader(String)` | method | Sets/removes an HTTP request header on the operation. |
| `RangesDownloaded` | event | Provides incremental download progress. |

## Notes

- Namespace: `Windows.Networking.BackgroundTransfer` (WinRT). Requires the same capabilities as `BackgroundDownloader`.
- Paused or incomplete downloads can only be resumed if the server accepts range requests.
- New connections time out after 5 minutes if not established; requests without a response within 2 minutes are aborted, with up to 3 automatic retries when internet connectivity is available.

## Related

- [BackgroundDownloader](./background-downloader.md)
- [BackgroundUploader](./background-uploader.md)
