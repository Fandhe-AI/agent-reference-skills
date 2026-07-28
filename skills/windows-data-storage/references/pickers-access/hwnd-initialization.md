# HWND Initialization for WinRT UI Objects

Certain WinRT objects — including `FileOpenPicker`, `FileSavePicker`, and `FolderPicker` — depend on a `CoreWindow`, which isn't supported in desktop apps (WinUI 3, WPF, WinForms). To display them from a desktop app, you must associate the object with an owner window handle (HWND) via the `IInitializeWithWindow` interop interface before use.

## Signature / Usage

```csharp
// MainWindow.xaml.cs (WinUI 3, also WPF/WinForms with .NET 6+)
private async void ShowFolderPickerAsync(IntPtr hWnd)
{
    var folderPicker = new Windows.Storage.Pickers.FolderPicker();

    // Associate the picker with the owner window handle (HWND).
    WinRT.Interop.InitializeWithWindow.Initialize(folderPicker, hWnd);

    folderPicker.FileTypeFilter.Add("*");
    var folder = await folderPicker.PickSingleFolderAsync();
}
```

```cppwinrt
// MainWindow.xaml.cpp (WinUI 3 with C++/WinRT)
winrt::fire_and_forget ShowFolderPickerAsync(HWND hWnd)
{
    Windows::Storage::Pickers::FolderPicker folderPicker;

    auto initializeWithWindow{ folderPicker.as<::IInitializeWithWindow>() };
    initializeWithWindow->Initialize(hWnd);

    folderPicker.FileTypeFilter().Append(L"*");
    auto folder{ co_await folderPicker.PickSingleFolderAsync() };
}
```

Retrieve the HWND of a WinUI 3 window with:

```csharp
var hWnd = WinRT.Interop.WindowNative.GetWindowHandle(this); // `this` is the Window
```

## Notes

- Required for classes implementing `IInitializeWithWindow`: `FileOpenPicker`, `FileSavePicker`, `FolderPicker` (`Windows.Storage.Pickers`), `GraphicsCapturePicker`, `MessageDialog`, `PopupMenu`, `StoreContext`, `SecondaryTile`, and others. If you skip this step in a desktop app, the picker throws or silently fails to appear.
- `WinRT.Interop.InitializeWithWindow` and `WinRT.Interop.WindowNative` are C# interop classes; usable in WPF/WinForms projects targeting .NET 6+ as well as WinUI 3.
- **Not required** when using `Microsoft.Windows.Storage.Pickers` (Windows App SDK 1.8+) pickers — those take a `WindowId` in their constructor instead and don't depend on `CoreWindow`.
- A related but separate interop path exists for `DataTransferManager` (`IDataTransferManagerInterop.GetForWindow` / `ShowShareUIForWindow`) and `UserConsentVerifier` (`IUserConsentVerifierInterop`), which use `XxxForWindow` methods rather than `IInitializeWithWindow.Initialize`.

## Related

- [FileOpenPicker](./file-open-picker.md)
- [FileSavePicker](./file-save-picker.md)
- [FolderPicker](./folder-picker.md)
- [Microsoft.Windows.Storage.Pickers (Windows App SDK)](./windows-app-sdk-pickers.md)
