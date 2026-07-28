# Clipboard

Gets and sets information from the system clipboard object. Static class in `Windows.ApplicationModel.DataTransfer`.

## Signature / Usage

```csharp
// Write to clipboard
var dataPackage = new DataPackage();
dataPackage.SetText("Hello World!");
Clipboard.SetContent(dataPackage);

// Read from clipboard
DataPackageView dataPackageView = Clipboard.GetContent();
if (dataPackageView.Contains(StandardDataFormats.Text))
{
    string text = await dataPackageView.GetTextAsync();
}

// Track clipboard changes
Clipboard.ContentChanged += (s, e) =>
{
    DataPackageView view = Clipboard.GetContent();
};
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `SetContent(DataPackage)` | method | Sets the current content stored in the clipboard. |
| `SetContentWithOptions(DataPackage, ClipboardContentOptions)` | method | Sets clipboard content with options (introduced 1809/17763). |
| `GetContent()` | method | Returns a `DataPackageView` with the current clipboard content. |
| `Clear()` | method | Removes all data from the clipboard. |
| `Flush()` | method | Adds the content to the clipboard and releases the `DataPackage` from the source app, so content remains available after the app closes. |
| `IsHistoryEnabled()` / `IsRoamingEnabled()` | method | Indicate whether clipboard history / roaming sync is enabled for the current user. |
| `GetHistoryItemsAsync()` / `ClearHistory()` / `DeleteItemFromHistory(ClipboardHistoryItem)` / `SetHistoryItemAsContent(ClipboardHistoryItem)` | method | Clipboard history management (introduced 1809/17763). |
| `ContentChanged` | event | Occurs when the data stored in the clipboard changes. |
| `HistoryChanged` / `HistoryEnabledChanged` / `RoamingEnabledChanged` | event | Occur when clipboard history contents or the history/roaming settings change. |

## Notes

- Namespace: `Windows.ApplicationModel.DataTransfer` (WinRT). Static class — no instantiation needed.
- You can only access the clipboard when the calling app is in focus on the UI thread.
- `Clipboard` is not agile; consider its threading model when calling from background threads.

## Related

- [DataPackage](./data-package.md)
- [DataPackageView](./data-package-view.md)
