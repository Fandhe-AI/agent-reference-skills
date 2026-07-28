# DataPackageView

A read-only version of a `DataPackage`. Apps that receive shared or pasted content (via `Clipboard.GetContent()` or a share target) get this object to acquire the data.

## Signature / Usage

```csharp
DataPackageView dataPackageView = Clipboard.GetContent();
if (dataPackageView.Contains(StandardDataFormats.Text))
{
    string text = await dataPackageView.GetTextAsync();
}
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `AvailableFormats` | property | The formats the view contains (e.g. `StandardDataFormats.Text`). |
| `Properties` | `DataPackagePropertySetView` | Read-only metadata (title, description) set by the source app. |
| `RequestedOperation` | `DataPackageOperation` | Requested operation (copy/move/link); primarily used for clipboard actions. |
| `Contains(String)` | method | Checks whether the view contains a specific data format. |
| `GetTextAsync()` / `GetTextAsync(String)` | method | Gets the text content. |
| `GetHtmlFormatAsync()` / `GetRtfAsync()` / `GetBitmapAsync()` | method | Gets HTML / RTF / bitmap content. |
| `GetStorageItemsAsync()` | method | Gets files and folders stored in the package. |
| `GetApplicationLinkAsync()` / `GetWebLinkAsync()` | method | Gets an app link / web link. |
| `GetDataAsync(String)` | method | Gets custom-format data. |
| `GetResourceMapAsync()` | method | Gets data (such as images) referenced inside HTML content. |
| `ReportOperationCompleted(DataPackageOperation)` | method | Informs the system your app finished using the view (mainly for Clipboard operations). |
| `RequestAccessAsync()` | method | Requests permission to unlock a package secured with an enterprise protection policy. |

## Notes

- Namespace: `Windows.ApplicationModel.DataTransfer` (WinRT).
- Use `AvailableFormats` or `Contains` to probe supported formats before calling the matching `GetXxxAsync` method.

## Related

- [DataPackage](./data-package.md)
- [Clipboard](./clipboard.md)
- [DataTransferManager](./data-transfer-manager.md)
