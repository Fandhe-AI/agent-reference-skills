# FileSavePicker

Represents a file picker that lets the user choose the file name, extension, and storage location for a file to be saved. `Windows.Storage.Pickers.FileSavePicker` targets UWP apps and desktop apps that require elevation.

## Signature / Usage

```csharp
using Windows.Storage.Pickers;

var savePicker = new FileSavePicker();
savePicker.SuggestedStartLocation = PickerLocationId.DocumentsLibrary;
// Dropdown of file types the user can save the file as
savePicker.FileTypeChoices.Add("Plain Text", new List<string>() { ".txt" });
savePicker.SuggestedFileName = "New Document";

// In a WinUI 3 (or other desktop) app, initialize with the owner HWND first:
// WinRT.Interop.InitializeWithWindow.Initialize(savePicker, hWnd);

StorageFile file = await savePicker.PickSaveFileAsync();
if (file != null)
{
    CachedFileManager.DeferUpdates(file);
    await FileIO.WriteTextAsync(file, "content");
    await CachedFileManager.CompleteUpdatesAsync(file);
}
```

## Options / Props

| Name | Type | Description |
|------|------|--------------|
| `FileTypeChoices` | `IDictionary<string, IList<string>>` | Collection of valid file type groups (label → extensions) the user can assign to a file. **Required** before calling `PickSaveFileAsync`, or it throws. |
| `SuggestedStartLocation` | `PickerLocationId` | Location the picker suggests as the save location. |
| `SuggestedFileName` | `string` | File name the picker suggests to the user. |
| `SuggestedSaveFile` | `StorageFile` | A `StorageFile` the picker suggests for saving (overwrite scenario). |
| `DefaultFileExtension` | `string` | Deprecated — use `FileTypeChoices` instead; the default extension is taken from the first type in the first group. |
| `CommitButtonText` | `string` | Label text of the commit button. |
| `EnterpriseId` | `string` | ID specifying the enterprise that owns the file. |

## Methods

| Name | Description |
|------|--------------|
| `PickSaveFileAsync()` | Shows the picker so the user can pick the file name, extension, and location; returns a `StorageFile` or `null` if cancelled. |

## Notes

- Package: `Windows.Storage.Pickers` (UWP APIs, also usable from non-elevated desktop apps). Distinct from `Microsoft.Windows.Storage.Pickers` (Windows App SDK), the WinUI 3-first replacement.
- Implements `IInitializeWithWindow`; requires `WinRT.Interop.InitializeWithWindow.Initialize(picker, hWnd)` in desktop apps before showing UI. See HWND Initialization for WinRT UI Objects.
- Doesn't work in elevated (administrator) desktop apps; use `Microsoft.Windows.Storage.Pickers` or the Win32 `IFileSaveDialog` (via CsWin32) instead.
- Showing the picker while the app is snapped throws an exception; ensure the app is unsnapped first.
- Add saved files to `StorageApplicationPermissions.FutureAccessList` / `MostRecentlyUsedList` to retain access across sessions.

## Related

- [FileOpenPicker](./file-open-picker.md)
- [FolderPicker](./folder-picker.md)
- [Microsoft.Windows.Storage.Pickers (Windows App SDK)](./windows-app-sdk-pickers.md)
- [HWND Initialization for WinRT UI Objects](./hwnd-initialization.md)
- [StorageApplicationPermissions](./storage-application-permissions.md)
