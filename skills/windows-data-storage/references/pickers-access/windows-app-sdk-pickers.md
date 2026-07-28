# Microsoft.Windows.Storage.Pickers (Windows App SDK)

The `Microsoft.Windows.Storage.Pickers` namespace (Windows App SDK 1.8+) lets desktop apps (WinUI 3, WPF, WinForms) present a streamlined file/folder picker UI without any window-handle interop code, and works in **elevated (administrator)** processes where `Windows.Storage.Pickers` does not.

## Signature / Usage

```csharp
using Microsoft.Windows.Storage.Pickers;

// windowId comes from the WinUI 3 Window, e.g.:
// var windowId = Microsoft.UI.Win32Interop.GetWindowIdFromWindow(hWnd);

var openPicker = new FileOpenPicker(windowId);
openPicker.FileTypeFilter.Add(".jpg");
openPicker.FileTypeFilter.Add(".png");
openPicker.SuggestedStartLocation = PickerLocationId.PicturesLibrary;

PickFileResult result = await openPicker.PickSingleFileAsync();
if (result != null)
{
    string path = result.Path;
}
```

## Options / Props

| Name | Type | Description |
|------|------|--------------|
| `FileOpenPicker(WindowId)` / `FileSavePicker(WindowId)` / `FolderPicker(WindowId)` | constructor | Takes a `Microsoft.UI.WindowId` linking the picker to its host window — no HWND interop call needed. |
| `FileTypeFilter` | `IList<string>` | Extension filters (`FileOpenPicker`, `FolderPicker`). Defaults to all types (`*.*`) if unset. |
| `FileTypeChoices` | `IDictionary<string, IList<string>>` | Labeled file-type groups (`FileOpenPicker`, `FileSavePicker`). |
| `SuggestedStartLocation` | `PickerLocationId` | Initial picker location. |
| `SuggestedStartFolder` / `SuggestedFolder` | `string` / folder | Suggested folder the dialog opens to. |
| `ViewMode` | `PickerViewMode` | Display mode for items. |
| `CommitButtonText` | `string` | Commit button label. |

## Methods

| Name | Description |
|------|--------------|
| `PickSingleFileAsync()` (`FileOpenPicker`) | Returns a `PickFileResult` (with `.Path`) or `null`. |
| `PickMultipleFilesAsync()` (`FileOpenPicker`) | Returns multiple `PickFileResult` objects. |
| `PickSaveFileAsync()` (`FileSavePicker`) | Returns a `PickFileResult` for the chosen save path. |
| `PickSingleFolderAsync()` (`FolderPicker`) | Returns a `PickFolderResult` (with `.Path`) or `null`. |

## Notes

- Namespace: `Microsoft.Windows.Storage.Pickers` (Windows App SDK 1.8+). Distinct from the UWP `Windows.Storage.Pickers` namespace (`FileOpenPicker`/`FileSavePicker`/`FolderPicker`) — the App SDK pickers require **no** `IInitializeWithWindow`/HWND initialization and return lightweight path-based `PickFileResult`/`PickFolderResult` objects instead of `StorageFile`/`StorageFolder`.
- Primary reason to use this namespace: `Windows.Storage.Pickers` doesn't function when the app is elevated (running as administrator); `Microsoft.Windows.Storage.Pickers` does.
- Because results are plain file-system paths, integrate with `System.IO` or convert to `StorageFile.GetFileFromPathAsync(path)` if `Windows.Storage` APIs are needed downstream.
- For non-elevated WinUI 3 apps, either picker namespace works; Microsoft's WinUI guidance favors `Microsoft.Windows.Storage.Pickers` since it avoids the HWND interop step entirely.

## Related

- [FileOpenPicker](./file-open-picker.md)
- [FileSavePicker](./file-save-picker.md)
- [FolderPicker](./folder-picker.md)
- [HWND Initialization for WinRT UI Objects](./hwnd-initialization.md)
