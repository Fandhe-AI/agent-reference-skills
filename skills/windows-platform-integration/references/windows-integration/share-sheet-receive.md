# Receive content in your app (Share Target)

How-to guide for registering an app as a Windows Share Target and handling incoming shared content, across packaged apps (UWP/MSIX desktop), PWAs, and unpackaged Win32 apps.

## Signature / Usage

```xml
<!-- package.appxmanifest: declare only the file types/formats the app actually handles -->
<Extensions>
  <uap:Extension Category="windows.shareTarget">
    <uap:ShareTarget>
      <uap:SupportedFileTypes>
        <uap:FileType>.jpg</uap:FileType>
        <uap:FileType>.png</uap:FileType>
      </uap:SupportedFileTypes>
      <uap:DataFormat>Bitmap</uap:DataFormat>
    </uap:ShareTarget>
  </uap:Extension>
</Extensions>
```

```csharp
// UWP: override OnShareTargetActivated (Windows.UI.Xaml.Application).
protected override async void OnShareTargetActivated(ShareTargetActivatedEventArgs args)
{
    ShareOperation shareOperation = args.ShareOperation;
    shareOperation.ReportStarted();

    if (shareOperation.Data.Contains(StandardDataFormats.StorageItems))
    {
        IReadOnlyList<IStorageItem> items = await shareOperation.Data.GetStorageItemsAsync();
        // process items[0]...
    }

    shareOperation.ReportCompleted();
}
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `uap:Extension Category="windows.shareTarget"` / `uap:ShareTarget` | manifest extension | Registers a packaged app (UWP or packaged desktop) as a Share Target; declare only the specific `SupportedFileTypes`/`DataFormat` the app handles, avoid `<uap:SupportsAnyFileType />` unless it's a general-purpose file mover. |
| `OnShareTargetActivated` | override (`Windows.UI.Xaml.Application`) | UWP activation entry point for Share Target. Packaged desktop apps (WinUI 3/WPF/WinForms) instead check `ExtendedActivationKind.ShareTarget` via `AppInstance.GetActivatedEventArgs` in `Main`. |
| `ShareOperation.Data` | `DataPackageView` | The incoming shared payload; check `Contains(StandardDataFormats.*)` before calling the corresponding `GetXAsync()`. |
| `ShareOperation.ReportStarted` / `ReportDataRetrieved` / `ReportCompleted(QuickLink)` / `ReportError` | method | Progress/status reporting for the Share UI; `ReportStarted()` must be called before async work, `ReportCompleted` when done. |
| `share_target` (Web App Manifest) | manifest field | PWA registration as a Share Target; `action`/`method`/`enctype`/`params` define the POST endpoint and accepted file types. |
| `StorageItems` / `Bitmap` / `Text` / `Html` / `Uri` / `Rtf` | `DataFormat` values | Declare only the formats the app can actually process; see [DataFormat & FileType reference](https://learn.microsoft.com/en-us/windows/apps/develop/windows-integration/dataformat-reference). |

## Notes

- Namespace: `Windows.ApplicationModel.DataTransfer` (WinRT), same namespace as [DataTransferManager](./data-transfer-manager.md). This is the Windows Share Sheet contract, distinct from Apple's share sheet and Android's Sharesheet APIs.
- Unpackaged Win32 apps need [package identity](https://learn.microsoft.com/en-us/windows/apps/desktop/modernize/grant-identity-to-nonpackaged-apps) to register a Share Target — either repackage with MSIX, or add a sparse "external location" MSIX package (built with `MakeAppx.exe /nv`, signed with `SignTool.exe`) that carries only the manifest and share-target registration while the existing installer keeps managing binaries; the app must self-register and restart to gain identity.
- Declaring more than the app can handle (e.g. `<uap:SupportsAnyFileType />`) causes the app to appear in the Share Sheet for irrelevant content; narrow `SupportedFileTypes`/`DataFormat` to what's actually supported.
- For source-side sharing from the same desktop app, use `IDataTransferManagerInterop` as described in [share-sheet-send](./share-sheet-send.md).

## Related

- [Share content from your app (Send)](./share-sheet-send.md)
- [DataPackageView](./data-package-view.md)
- [DataTransferManager](./data-transfer-manager.md)
