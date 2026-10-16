# FileOpenPicker

Represents a UI element that lets the user choose and open one or more files. `Windows.Storage.Pickers.FileOpenPicker` targets UWP apps and desktop apps that require elevation.

## Signature / Usage

```csharp
using Windows.Storage.Pickers;

var openPicker = new FileOpenPicker();
openPicker.ViewMode = PickerViewMode.Thumbnail;
openPicker.SuggestedStartLocation = PickerLocationId.PicturesLibrary;
openPicker.FileTypeFilter.Add(".jpg");
openPicker.FileTypeFilter.Add(".jpeg");
openPicker.FileTypeFilter.Add(".png");

// In a WinUI 3 (or other desktop) app, initialize with the owner HWND first:
// WinRT.Interop.InitializeWithWindow.Initialize(openPicker, hWnd);

StorageFile file = await openPicker.PickSingleFileAsync();
if (file != null)
{
    // Application now has read/write access to the picked file
}
```

## Options / Props

| Name | Type | Description |
|------|------|--------------|
| `SuggestedStartLocation` | `PickerLocationId` | Initial location where the picker looks for files (e.g. `PicturesLibrary`, `DocumentsLibrary`). |
| `FileTypeFilter` | `IList<string>` (append-only vector) | File extension filters shown to the user, e.g. `".jpg"`. Use `ReplaceAll` to swap out the whole list. |
| `ViewMode` | `PickerViewMode` | `Thumbnail` for a visual grid (pictures/videos) or `List`. |
| `CommitButtonText` | `string` | Label text of the picker's commit button. |
| `SettingsIdentifier` | `string` | Identifier used to persist the picker's UI state. |

## Notes

- Methods: `PickSingleFileAsync()` shows the picker so the user can pick one file and returns a `StorageFile` or `null` if cancelled; `PickMultipleFilesAsync()` lets the user pick multiple files and returns `IReadOnlyList<StorageFile>` (empty if cancelled).
- Package: `Windows.Storage.Pickers` (UWP APIs, also usable from desktop apps that do **not** require elevation). Distinct from `Microsoft.Windows.Storage.Pickers` (Windows App SDK), which is the WinUI 3-first replacement.
- Implements `IInitializeWithWindow`. In a desktop app (WinUI 3, WPF, WinForms), you must call `WinRT.Interop.InitializeWithWindow.Initialize(picker, hWnd)` before showing the picker, or it throws. See HWND Initialization for WinRT UI Objects.
- The file picker APIs (`Windows.Storage.Pickers`) don't work when the app runs elevated (as administrator); use `Microsoft.Windows.Storage.Pickers` or Win32 `IFileOpenDialog` via CsWin32 instead.
- Picked files are only accessible for the app session; add them to `StorageApplicationPermissions.FutureAccessList` to retain access across launches.
- Distinct from the Android `FileOpenPicker`/`ActivityResultContracts.OpenDocument` and Apple `UIDocumentPickerViewController` concepts; this is a WinRT/Windows App SDK API.

## Related

- [FileSavePicker](./file-save-picker.md)
- [FolderPicker](./folder-picker.md)
- [Microsoft.Windows.Storage.Pickers (Windows App SDK)](./windows-app-sdk-pickers.md)
- [HWND Initialization for WinRT UI Objects](./hwnd-initialization.md)
- [StorageApplicationPermissions](./storage-application-permissions.md)
