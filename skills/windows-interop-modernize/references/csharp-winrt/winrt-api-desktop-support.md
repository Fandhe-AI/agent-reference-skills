# WinRT APIs Not Supported in Desktop Apps

Most WinRT APIs work in WinUI 3, WPF, WinForms, and Win32 desktop apps, but two categories don't: APIs with dependencies on UWP-only UI features (they need a `CoreWindow` and UWP threading model), and APIs that require package identity (only available in MSIX-packaged desktop apps).

## Signature / Usage

```csharp
// CoreDispatcher (unsupported) -> use WinUI's DispatcherQueue instead.
Microsoft.UI.Dispatching.DispatcherQueue dispatcherQueue = this.DispatcherQueue;

// ApplicationView.GetForCurrentView (unsupported pattern) has no desktop alternative;
// classes with an interop counterpart use the *Interop COM interface, or
// its WinRT.Interop-projected .NET class, instead. Example: DataTransferManager.
// Use IDataTransferManagerInterop (native) or the equivalent WinRT.Interop class in .NET.
```

## Options / Props

| Category | Examples | Alternative |
| --- | --- | --- |
| Core unsupported classes | `ApplicationView`, `CoreApplicationView`, `CoreDispatcher`, `CoreWindow` | `Microsoft.UI.Xaml.Window` (WinUI), `Window.DispatcherQueue`, `Window.ExtendsContentIntoTitleBar` |
| `XxxForCurrentView` classes with a COM interop alternative | `AccountsSettingsPane`, `DataTransferManager`, `DisplayInformation`, `InputPane`, `PlayToManager`, `PrintManager`, `RadialController`, `SpatialInteractionManager`, `SystemMediaTransportControls`, `UIViewSettings` | Corresponding `IxxxInterop` COM interface, or its `WinRT.Interop`-projected .NET class (see [WinRT.Interop: Retrieving and Passing a Window Handle](./window-handle-interop.md)) |
| `XxxForCurrentView` classes with no alternative | `AppCapture`, `ConnectedAnimationService`, `EdgeGesture`, `SearchPane`, `SettingsPane`, `WebAuthenticationBroker`, etc. | None — not usable in desktop apps |
| APIs requiring package identity | `DataTransferManager` events (share), `PdfDocument`, XML DOM types, `SmartCard*`, `OcrEngine`, `ResourceManager`/`ResourceLoader`, `PackageManager`, most `Windows.Media.Capture.*` | Only usable in a desktop app packaged with MSIX (package identity at runtime) |

## Notes

- Even though `CoreWindow` itself is unsupported, many WinRT UI-dependent objects (pickers, popups, dialogs) can still be used in desktop apps by initializing them with an HWND via `IInitializeWithWindow` — see [WinRT.Interop: Retrieving and Passing a Window Handle](./window-handle-interop.md).
- Most `Request`-pattern methods (e.g. `AppCapability.RequestAccessAsync`, `StoreContext.RequestPurchaseAsync`) are unsupported in desktop apps because they internally depend on `Windows.UI.Popups`, which requires a `CoreWindow`.
- .NET apps can use the `WinRT.Interop`-projected classes (rather than raw COM interfaces) for the interop-alternative APIs listed above; those classes require the .NET 6 SDK or later.
- "Requires package identity" is a separate axis from "requires WinUI" — a non-packaged WPF or WinForms app calling one of these APIs fails even though the API itself is otherwise desktop-supported.

## Related

- [WinRT.Interop: Retrieving and Passing a Window Handle](./window-handle-interop.md)
- [Detecting WinRT API Availability](./api-availability-checks.md)
- [Microsoft.Windows.SDK.NET.Ref and TargetFramework](./sdk-net-ref-targetframework.md)
