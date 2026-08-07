# DataPackage

Contains the data that a user wants to exchange with another app, used both for clipboard operations and for the share (`DataTransferManager`) contract.

## Signature / Usage

```csharp
private void DataRequested(DataTransferManager sender, DataRequestedEventArgs e)
{
    DataRequest request = e.Request;
    request.Data.Properties.Title = "Share Text Example";
    request.Data.Properties.Description = "An example of how to share text.";
    request.Data.SetText("Hello World!");
}
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `Properties` | `DataPackagePropertySet` | Metadata such as `Title` / `Description` shown on the content being shared. |
| `RequestedOperation` | `DataPackageOperation` | None, Move, Copy, or Link — the intended operation for the transfer. |
| `ResourceMap` | property | Maps a URI to a file, used to ensure content referenced in HTML (e.g. an `<img>`) is included in the package. |
| `SetText(String)` | method | Sets the plain text content. |
| `SetHtmlFormat(String)` / `SetRtf(String)` | method | Sets HTML / RTF content. |
| `SetBitmap(RandomAccessStreamReference)` | method | Sets a bitmap image. |
| `SetStorageItems(IIterable<IStorageItem>, Boolean)` | method | Adds files/folders to the package. |
| `SetApplicationLink(Uri)` / `SetWebLink(Uri)` | method | Sets an app link / web link (replaces the deprecated `SetUri`). |
| `SetData(String, Object)` / `SetDataProvider(String, DataProviderHandler)` | method | Custom format data, optionally provided lazily via a delegate. |
| `GetView()` | method | Returns a read-only `DataPackageView` copy of this package. |
| `Destroyed` / `OperationCompleted` / `ShareCompleted` / `ShareCanceled` | event | Lifecycle events for the package during clipboard or share operations. |

## Notes

- Namespace: `Windows.ApplicationModel.DataTransfer` (WinRT).
- Source apps put data into a `DataPackage` and hand it to the target app (via Clipboard or DataTransferManager); target apps read it back through the read-only `DataPackageView`.
- `SetDataProvider` lets a source app defer generating data (e.g. multiple image formats) until the target app actually requests a specific format.
- Prefer `SetWebLink` (or `SetApplicationLink` for deep links) over `SetText` when sharing a URL through the Windows Share Sheet — target apps can then generate rich link previews and route navigation correctly instead of treating it as plain text.
- Always set `Properties.Title` when sharing; it's required for the Share Sheet to render the content clearly.

## Related

- [DataPackageView](./data-package-view.md)
- [Clipboard](./clipboard.md)
- [DataTransferManager](./data-transfer-manager.md)
