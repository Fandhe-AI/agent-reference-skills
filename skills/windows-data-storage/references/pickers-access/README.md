# pickers-access

| Name | Description | Path |
|------|-------------|------|
| File Access Permissions | Overview of which file-system locations a Windows app can access by default, which require a picker interaction, and which require declaring a capability in the app package manifest — including the restricted `broadFileSystemAccess` capability. | [file-access-permissions.md](./file-access-permissions.md) |
| FileOpenPicker | UWP picker for opening one or more files (`Windows.Storage.Pickers`). | [file-open-picker.md](./file-open-picker.md) |
| FileSavePicker | UWP picker for choosing a save file name/location (`Windows.Storage.Pickers`). | [file-save-picker.md](./file-save-picker.md) |
| FolderPicker | UWP picker for choosing a single folder (`Windows.Storage.Pickers`). | [folder-picker.md](./folder-picker.md) |
| HWND Initialization for WinRT UI Objects | Required `IInitializeWithWindow`/`WinRT.Interop` setup for pickers in desktop apps. | [hwnd-initialization.md](./hwnd-initialization.md) |
| KnownFolders | Static class providing access to common user-content locations (Documents, Pictures, Music, Videos, removable devices, media server devices) as `StorageFolder` objects. | [known-folders.md](./known-folders.md) |
| Microsoft.Windows.Storage.Pickers (Windows App SDK) | The `Microsoft.Windows.Storage.Pickers` namespace (Windows App SDK 1.8+) lets desktop apps (WinUI 3, WPF, WinForms) present a streamlined file/folder picker UI without any window-handle interop code, and works in elevated (administrator) processes where `Windows.Storage.Pickers` does not. | [windows-app-sdk-pickers.md](./windows-app-sdk-pickers.md) |
| StorageApplicationPermissions | Future access list / most recently used list for retaining picked files. | [storage-application-permissions.md](./storage-application-permissions.md) |
</content>
