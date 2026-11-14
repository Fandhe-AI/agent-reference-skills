---
source: https://learn.microsoft.com/en-us/windows/apps/develop/files/pickers-save-file
---

# Save a file with a Windows App SDK picker

Use `Microsoft.Windows.Storage.Pickers.FileSavePicker` (Windows App SDK 1.8+) to let users choose the name, type and location of a file to save; the picked `PickFileResult` carries the file path.

## Signature / Usage

```csharp
using Microsoft.Windows.Storage.Pickers;
...
var savePicker = new FileSavePicker(this.AppWindow.Id)
{
    // (Optional) Specify the initial location for the picker. 
    //     If the specified location doesn't exist on the user's machine, it falls back to the DocumentsLibrary.
    //     If not set, it defaults to PickerLocationId.Unspecified, and the system will use its default location.
    SuggestedStartLocation = PickerLocationId.DocumentsLibrary,

    // (Optional) specify the default file name. If not specified, use system default.
    SuggestedFileName = "My Document",

    // (Optional) Sets the folder that the file save dialog displays when it opens.
    //     If not specified or the specified path doesn't exist, defaults to the last folder the user visited.
    SuggestedFolder = @"C:\MyFiles",

    // (Optional) specify the text displayed on the commit button. 
    //     If not specified, the system uses a default label of "Save" (suitably translated).
    CommitButtonText = "Save Document",

    // (Optional) categorized extension types. If not specified, "All Files (*.*)" is allowed.
    //     Note that when "All Files (*.*)" is allowed, end users can save a file without an extension.
    FileTypeChoices = {
        { "Documents", new List<string> { ".txt", ".doc", ".docx" } }
    },

    // (Optional) specify the default file extension (will be appended to SuggestedFileName).
    //      If not specified, no extension will be appended.
    DefaultFileExtension = ".txt",
};
```

```csharp
using Microsoft.Windows.Storage.Pickers;
...
var savePicker = new FileSavePicker(this.AppWindow.Id);
var result = await savePicker.PickSaveFileAsync();
if (result != null)
{
    if (!System.IO.File.Exists(result.Path))
    {
        // Create a file and write to it.
        System.IO.File.WriteAllText(result.Path, "Hello world." + Environment.NewLine);
    }
    else
    {
        // Append to the existing file.
        System.IO.File.AppendAllText(result.Path, "Hello again." + Environment.NewLine);
    }
}
else
{
    this.textBlock.Text = "Operation cancelled.";
}
```

## Options / Props

| Name | Description |
|------|-------------|
| `SuggestedStartLocation` | Initial location (`PickerLocationId`); falls back to `DocumentsLibrary` if the location doesn't exist. |
| `SuggestedFileName` | Default file name; the official page suggests an existing file name or the first line of a document. |
| `SuggestedFolder` | Folder the dialog displays when it opens; defaults to the last folder the user visited if not specified or nonexistent. |
| `CommitButtonText` | Commit button label; default is "Save" (suitably translated). |
| `FileTypeChoices` | Categorized extension types. The first choice is selected by default; `All Files (*.*)` is allowed if not specified, in which case users can save a file without an extension. |
| `DefaultFileExtension` | Default extension appended to `SuggestedFileName`; nothing is appended if not specified. |

## Notes

- `PickSaveFileAsync()` returns a lightweight `PickFileResult` (derive the file name from `Path` if needed) or `null` if the user cancels. Check that the saved file exists and is valid before further processing.
- The picker uses the currently selected file type to filter which files it displays. `FileSavePicker` displays with `PickerViewMode.List`.
- Make sure every file type listed in `FileTypeChoices` is supported by the app, because users can save as any of them.
- The legacy `Windows.Storage.Pickers.FileSavePicker` returns a `StorageFile` and needs HWND initialization; see FileSavePicker and Microsoft.Windows.Storage.Pickers (Windows App SDK).
- Source: https://learn.microsoft.com/en-us/windows/apps/develop/files/pickers-save-file (ms.date 2026-11-10, retrieved 2026-11-14)

## Related

- [Microsoft.Windows.Storage.Pickers (Windows App SDK)](./windows-app-sdk-pickers.md)
- [FileSavePicker](./file-save-picker.md)
- [HWND Initialization for WinRT UI Objects](./hwnd-initialization.md)
