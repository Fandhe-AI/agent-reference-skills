# FolderPicker

Represents a UI element that lets the user choose a single folder. `Windows.Storage.Pickers.FolderPicker` targets UWP apps and desktop apps that require elevation.

## Signature / Usage

```csharp
using Windows.Storage.Pickers;

var folderPicker = new FolderPicker();
folderPicker.SuggestedStartLocation = PickerLocationId.Desktop;
folderPicker.FileTypeFilter.Add("*"); // required — throws if omitted

// In a WinUI 3 (or other desktop) app, initialize with the owner HWND first:
// WinRT.Interop.InitializeWithWindow.Initialize(folderPicker, hWnd);

StorageFolder folder = await folderPicker.PickSingleFolderAsync();
if (folder != null)
{
    // Application now has read/write access to all contents in the picked folder
    StorageApplicationPermissions.FutureAccessList.AddOrReplace("PickedFolderToken", folder);
}
```

## Options / Props

| Name | Type | Description |
|------|------|--------------|
| `SuggestedStartLocation` | `PickerLocationId` | Initial location where the folder picker looks for folders. |
| `FileTypeFilter` | `IList<string>` | Collection of file types displayed inside folders in the picker. **Required** — call with `"*"` to list all folders, or `PickSingleFolderAsync` throws. |
| `ViewMode` | `PickerViewMode` | View mode used to display items. |
| `CommitButtonText` | `string` | Label text of the commit button. |
| `SettingsIdentifier` | `string` | Identifier used to persist the picker's UI state. |

## Methods

| Name | Description |
|------|--------------|
| `PickSingleFolderAsync()` | Shows the picker so the user can pick a folder; returns a `StorageFolder` or `null` if cancelled. |

## Notes

- Package: `Windows.Storage.Pickers` (UWP APIs, also usable from non-elevated desktop apps). Distinct from `Microsoft.Windows.Storage.Pickers` (Windows App SDK), the WinUI 3-first replacement.
- Implements `IInitializeWithWindow`; requires `WinRT.Interop.InitializeWithWindow.Initialize(picker, hWnd)` in desktop apps before showing UI. See HWND Initialization for WinRT UI Objects.
- Picking a folder grants access to that folder and all its subfolder contents for the current app session; use `StorageApplicationPermissions.FutureAccessList` to retain access across launches.
- Doesn't work in elevated (administrator) desktop apps; use `Microsoft.Windows.Storage.Pickers.FolderPicker` instead.

## Related

- [FileOpenPicker](./file-open-picker.md)
- [FileSavePicker](./file-save-picker.md)
- [Microsoft.Windows.Storage.Pickers (Windows App SDK)](./windows-app-sdk-pickers.md)
- [HWND Initialization for WinRT UI Objects](./hwnd-initialization.md)
- [StorageApplicationPermissions](./storage-application-permissions.md)
