# DataTransferManager

Static class that programmatically initiates an exchange of content with other apps through the Windows Share Sheet. Fires `DataRequested` when a share operation starts, and can trigger the Share UI on demand with `ShowShareUI`.

## Signature / Usage

```csharp
// UWP app
DataTransferManager dataTransferManager = DataTransferManager.GetForCurrentView();
dataTransferManager.DataRequested += (sender, args) =>
{
    args.Request.Data.Properties.Title = "Share Demonstration";
    args.Request.Data.SetText("Hello World!");
};
dataTransferManager.ShowShareUI();
```

```csharp
// WinUI 3 desktop app: DataTransferManager has no CoreWindow, so it must be
// initialized with the owner HWND via IDataTransferManagerInterop.
[System.Runtime.InteropServices.ComImport]
[System.Runtime.InteropServices.Guid("3A3DCD6C-3EAB-43DC-BCDE-45671CE800C8")]
[System.Runtime.InteropServices.InterfaceType(
    System.Runtime.InteropServices.ComInterfaceType.InterfaceIsIUnknown)]
interface IDataTransferManagerInterop
{
    IntPtr GetForWindow(IntPtr appWindow, ref Guid riid);
    void ShowShareUIForWindow(IntPtr appWindow);
}

static readonly Guid _dtm_iid =
    new Guid(0xa5caee9b, 0x8708, 0x49d1, 0x8d, 0x36, 0x67, 0xd2, 0x5a, 0x8d, 0xa0, 0x0c);

var hWnd = WinRT.Interop.WindowNative.GetWindowHandle(this);
var interop = DataTransferManager.As<IDataTransferManagerInterop>();
IntPtr result = interop.GetForWindow(hWnd, _dtm_iid);
var dataTransferManager = WinRT.MarshalInterface<DataTransferManager>.FromAbi(result);

dataTransferManager.DataRequested += (s, args) =>
{
    args.Request.Data.Properties.Title = "In a desktop app...";
    args.Request.Data.SetText("...display WinRT UI objects that depend on CoreWindow.");
    args.Request.Data.RequestedOperation = DataPackageOperation.Copy;
};

interop.ShowShareUIForWindow(hWnd);
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `GetForCurrentView()` | method | Returns the `DataTransferManager` associated with the current (UWP) window. |
| `IsSupported()` | method | Returns whether the device supports sharing. |
| `ShowShareUI()` / `ShowShareUI(ShareUIOptions)` | method | Programmatically starts the Share UI for a UWP app. Desktop apps must instead call `IDataTransferManagerInterop.ShowShareUIForWindow`. |
| `DataRequested` | event | Raised when a share operation starts (user tapped Share, or `ShowShareUI` was called). Handler must populate `args.Request.Data`. |
| `ShareProvidersRequested` | event | Raised to let the app add custom share providers via `ShareProvidersRequestedEventArgs.Providers.Add()`. |
| `TargetApplicationChosen` | event | Raised when the user picks a target app in the Share UI. |
| `ShareUIOptions` | class | Passed to `ShowShareUI` to control the on-screen position/theme of the flyout (`SelectionRect`, `Theme`). |

## Notes

- Namespace: `Windows.ApplicationModel.DataTransfer` (WinRT). `DataTransferManager` is not agile — be mindful of its threading/marshaling model.
- **Desktop apps (WinUI 3, WPF, WinForms — packaged or unpackaged) have no `CoreWindow`.** Instead of `DataTransferManager.GetForCurrentView` / `ShowShareUI` (UWP-only), retrieve the manager and show the UI via the `IDataTransferManagerInterop` COM interface (`GetForWindow` / `ShowShareUIForWindow`) on a per-window basis. Obtain the HWND via `WinRT.Interop.WindowNative.GetWindowHandle(this)` (WinUI 3), `new System.Windows.Interop.WindowInteropHelper(this).Handle` (WPF), or `this.Handle` (WinForms).
- The share payload itself is built with [DataPackage](./data-package.md); the `DataRequested` handler must complete synchronously or call `args.Request.GetDeferral()` for async work.
- Prefer `DataPackage.SetWebLink` / `SetApplicationLink` over `SetText` when sharing a URL, so target apps can render rich link previews instead of treating it as plain text.

## Related

- [DataPackage](./data-package.md)
- [DataPackageView](./data-package-view.md)
