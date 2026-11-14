---
source: https://learn.microsoft.com/en-us/windows/apps/develop/files/using-file-folder-pickers
---

# Microsoft.Windows.Storage.Pickers (Windows App SDK)

The `Microsoft.Windows.Storage.Pickers` namespace (Windows App SDK 1.8+) lets desktop apps (WinUI 3, WPF, WinForms) present a streamlined file/folder picker UI without any window-handle interop code, and works in **elevated (administrator)** processes where `Windows.Storage.Pickers` does not. Pickers return lightweight `PickFileResult` / `PickFolderResult` objects that expose the picked `Path`.

## Signature / Usage

```csharp
using Microsoft.Windows.Storage.Pickers;

var openPicker = new FileOpenPicker(this.AppWindow.Id)
{
    // (Optional) Specify the initial location for the picker. 
    //     If the specified location doesn't exist on the user's machine, it falls back to the DocumentsLibrary.
    //     If not set, it defaults to PickerLocationId.Unspecified, and the system will use its default location.
    SuggestedStartLocation = PickerLocationId.DocumentsLibrary,

    // (Optional) specify the text displayed on the commit button. 
    //     If not specified, the system uses a default label of "Open" (suitably translated).
    CommitButtonText = "Choose selected files",

    // (Optional) specify file extension filters. If not specified, defaults to all files (*.*).
    FileTypeFilter = { ".txt", ".pdf", ".doc", ".docx" },

    // (Optional) specify the view mode of the picker dialog. If not specified, defaults to List.
    ViewMode = PickerViewMode.List,
};

var result = await openPicker.PickSingleFileAsync();
if (result is not null)
{
    var content = System.IO.File.ReadAllText(result.Path);
}
else
{
    // Add your error handling here.
}
```

```csharp
using Microsoft.Windows.Storage.Pickers;

var openPicker = new FileOpenPicker(this.AppWindow.Id);

var results = await openPicker.PickMultipleFilesAsync();
if (results.Count > 0)
{
    var pickedFilePaths = results.Select(f => f.Path);
    foreach (var path in pickedFilePaths)
    {
        var content = System.IO.File.ReadAllText(path);
    }
}
else
{
    // Add your error handling here.
}
```

```csharp
using Microsoft.Windows.Storage.Pickers;

var folderPicker = new FolderPicker(this.AppWindow.Id)
{
    // (Optional) Specify the initial location for the picker. 
    //     If the specified location doesn't exist on the user's machine, it falls back to the DocumentsLibrary.
    //     If not set, it defaults to PickerLocationId.Unspecified, and the system will use its default location.
    SuggestedStartLocation = PickerLocationId.DocumentsLibrary,

    // (Optional) specify the text displayed on the commit button. 
    //     If not specified, the system uses a default label of "Open" (suitably translated).
    CommitButtonText = "Select Folder",

    // (Optional) specify the view mode of the picker dialog. If not specified, default to List.
    ViewMode = PickerViewMode.List,
};

var result = await folderPicker.PickSingleFolderAsync();

if (result is not null)
{
    var path = result.Path;
}
else
{
    // Add your error handling here.
}
```

## Options / Props

Members documented on the `FileOpenPicker`, `FileSavePicker` and `FolderPicker` API reference pages (property types are not listed there and are omitted).

| Name | Available on | Description |
|------|--------------|-------------|
| `FileOpenPicker(WindowId)` / `FileSavePicker(WindowId)` / `FolderPicker(WindowId)` | all three | Constructor taking a `Microsoft.UI.WindowId` that references the parent window of the dialog. |
| `FileTypeFilter` | `FileOpenPicker` | Extension filters. If not specified, defaults to all types (`*.*`). Not available on `FolderPicker`. |
| `FileTypeChoices` | `FileOpenPicker`, `FileSavePicker` | Groups file types into labeled choices. On `FileSavePicker`, if not specified, `All Files (*.*)` is allowed. |
| `DefaultFileExtension` | `FileSavePicker` | Default extension appended after the default file name; nothing is appended if not specified. |
| `SuggestedFileName` | `FileSavePicker` | Default file name shown when the picker opens. |
| `SuggestedFolder` | all three | Folder (path string) the dialog tries to display when it opens. |
| `SuggestedStartFolder` | all three | Suggested start folder the dialog displays when it opens. |
| `SuggestedStartLocation` | all three | `PickerLocationId` initial location; defaults to `PickerLocationId.Unspecified`. |
| `ViewMode` | `FileOpenPicker`, `FolderPicker` | `PickerViewMode` display mode; defaults to `List`. |
| `CommitButtonText` | all three | Commit button label; the system default is used if not specified. |
| `SettingsIdentifier` | all three | Identifier used to save and restore the picker state. |
| `InitialFileTypeIndex`, `Title` | `FileOpenPicker`, `FileSavePicker` (`Title` also `FolderPicker`) | Listed on the API reference without a description. |
| `ShowOverwritePrompt` | `FileSavePicker` | Listed on the API reference without a description. |

## Notes

- Methods: `PickSingleFileAsync()` / `PickMultipleFilesAsync()` (`FileOpenPicker`) return a `PickFileResult` (with `.Path`) or a collection of them; `PickSaveFileAsync()` (`FileSavePicker`) returns a `PickFileResult`; `PickSingleFolderAsync()` (`FolderPicker`) returns a `PickFolderResult` (with `.Path`). `FolderPicker` also lists `PickMultipleFoldersAsync()` on its API reference page without a description. Cancellation yields `null`.
- Namespace: `Microsoft.Windows.Storage.Pickers` (Windows App SDK 1.8+). Distinct from the UWP `Windows.Storage.Pickers` namespace, which needs `IInitializeWithWindow` / HWND initialization and returns `StorageFile` / `StorageFolder`. If the project targets Windows App SDK 1.7 or earlier, use the legacy WinRT pickers with HWND interop (see HWND Initialization for WinRT UI Objects).
- Primary reason to use this namespace: `Windows.Storage.Pickers` doesn't function when the app is elevated (running as administrator); `Microsoft.Windows.Storage.Pickers` does.
- Because results are plain file-system paths, integrate with `System.IO` or convert to `StorageFile.GetFileFromPathAsync(path)` if `Windows.Storage` APIs are needed downstream.
- Official tip: when the app accesses a file or folder through a picker, add it to `FutureAccessList` or `MostRecentlyUsedList` (WinRT APIs) to keep track of it. See StorageApplicationPermissions.
- The official examples set `SuggestedStartLocation` to `DocumentsLibrary`; if the specified location doesn't exist on the user's machine, it falls back to the `DocumentsLibrary`.
- Updated in this revision (official page ms.date 2026-11-10): the previous version of this page listed `FileTypeFilter` as available on `FolderPicker`; the official files overview states `FolderPicker.FileTypeFilter` is excluded, and `FileSavePicker` and `FileOpenPicker` are the pickers with `FileTypeChoices`.
- Source: https://learn.microsoft.com/en-us/windows/apps/develop/files/using-file-folder-pickers (retrieved 2026-11-14)
- Source: https://learn.microsoft.com/en-us/windows/windows-app-sdk/api/winrt/microsoft.windows.storage.pickers.fileopenpicker (API reference, retrieved 2026-11-14; the `filesavepicker` and `folderpicker` pages under the same path were read too)

### Differences from the WinRT pickers

From the official files overview (https://learn.microsoft.com/en-us/windows/apps/develop/files/, retrieved 2026-11-14):

- Returns string-based paths through `PickFileResult` / `PickFolderResult` instead of `StorageFile` / `StorageFolder`, which avoids complications with storage capabilities in elevated scenarios.
- `FileSavePicker.SuggestedSaveFile` (which returned a `StorageFile`) is replaced by the string properties `SuggestedFolder` and `SuggestedFileName`.
- Designed for desktop apps; a `WindowId` replaces the `WinRT.Interop.InitializeWithWindow.Initialize` pattern.
- `FileTypeFilter` / `FileTypeChoices` need not be specified (UWP pickers throw when they are not set); the new pickers show all files by default.
- The HomeGroup location is excluded from the new `PickerLocationId` enum (no longer supported starting in Windows 10).
- Deprecated or "Do not use" members (for example `PickSingleFileAndContinue`, `ContinuationData`, `ResumePickSingleFileAsync`) and multi-user-mode members are excluded.

## Related

- [FileOpenPicker](./file-open-picker.md)
- [FileSavePicker](./file-save-picker.md)
- [FolderPicker](./folder-picker.md)
- [Save a file with a Windows App SDK picker](./windows-app-sdk-save-picker.md)
- [HWND Initialization for WinRT UI Objects](./hwnd-initialization.md)
- [StorageApplicationPermissions](./storage-application-permissions.md)
