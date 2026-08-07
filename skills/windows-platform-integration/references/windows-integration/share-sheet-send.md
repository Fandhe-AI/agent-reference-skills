# Share content from your app (Send)

How-to guide for implementing the sending side of the Windows Share Sheet across UWP apps, desktop apps (WinUI 3 / WPF / WinForms, packaged or unpackaged), and Progressive Web Apps (PWAs).

## Signature / Usage

```csharp
// UWP: DataTransferManager.GetForCurrentView has a CoreWindow to bind to.
DataTransferManager dtm = DataTransferManager.GetForCurrentView();
dtm.DataRequested += (sender, args) =>
{
    DataPackage data = args.Request.Data;
    data.Properties.Title = "My shared content";
    data.SetText("Here's some text to share");
    // data.SetWebLink(new Uri("https://example.com")); // for URLs, prefer SetWebLink/SetApplicationLink
};

// Trigger the Share Sheet from a button click or menu command:
DataTransferManager.ShowShareUI();
```

```json
// PWA: declare a share_target in the Web App Manifest, then call
// navigator.share({ title, text, url }) from JavaScript.
{
  "share_target": {
    "action": "/share",
    "method": "POST",
    "enctype": "multipart/form-data",
    "params": { "files": [{ "name": "media", "accept": ["image/*"] }] }
  }
}
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `DataTransferManager.GetForCurrentView` / `ShowShareUI` | API set | UWP-only path; not available to desktop apps (WinUI 3, WPF, WinForms), packaged or unpackaged. |
| `IDataTransferManagerInterop.GetForWindow` / `ShowShareUIForWindow` | API set (COM interop) | Per-window Share Sheet access for desktop apps, using an HWND from `WinRT.Interop.WindowNative.GetWindowHandle` (WinUI 3), `WindowInteropHelper` (WPF), or `this.Handle` (WinForms). |
| Web Share API (`navigator.share`) + `share_target` manifest | API set | PWA path; W3C standard, integrated with Windows share via the app manifest. |
| `DataTransferManager.DataRequested` | event | Fires when the user starts a share operation; handler must populate `args.Request.Data` (a [DataPackage](./data-package.md)). |
| `DataTransferManager.TargetApplicationChosen` | event | Fires when the user picks a target app; optional telemetry only. |
| `DataPackage.ShareCompleted` / `ShareCanceled` | event | Optional source-side telemetry for share completion/cancellation; not the same as `ShareOperation` events used on the receiving side. |

## Notes

- Namespace: `Windows.ApplicationModel.DataTransfer` (WinRT), same namespace as [DataTransferManager](./data-transfer-manager.md). This is the Windows Share Sheet contract, distinct from Apple's share sheet and Android's Sharesheet APIs.
- `DataTransferManager.GetForCurrentView`/`ShowShareUI` work only in UWP apps. Desktop apps (packaged or unpackaged) must use `IDataTransferManagerInterop` as shown in [DataTransferManager](./data-transfer-manager.md).
- Use `SetWebLink`/`SetApplicationLink` instead of `SetText` for URLs so target apps can render rich previews and route correctly.
- `DataPackage.OperationCompleted`/`Destroyed` are for Clipboard/paste workflows, not needed for Share source scenarios.
- Full sample: [WPF Share Source sample](https://github.com/microsoft/Windows-classic-samples/tree/master/Samples/ShareSource).

## Related

- [DataTransferManager](./data-transfer-manager.md)
- [DataPackage](./data-package.md)
- [Receive content in your app (Share Target)](./share-sheet-receive.md)
- [Appear in Share Sheet suggestions row](./share-sheet-contacts.md)
