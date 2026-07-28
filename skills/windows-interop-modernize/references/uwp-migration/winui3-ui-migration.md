# User interface migration (including WinUI)

Migration guidance for UI code moving to WinUI 3: `Window.Current` replacement, HWND initialization for `MessageDialog`/file pickers, `ContentDialog`/`Popup` `XamlRoot`, page navigation, Visual State Manager, and `AcrylicBrush`.

## Signature / Usage

```csharp
// File/message picker HWND initialization — MainWindow.xaml.cs in a WinUI app
var showDialog = new Windows.UI.Popups.MessageDialog("Message here");
WinRT.Interop.InitializeWithWindow.Initialize(showDialog,
    WinRT.Interop.WindowNative.GetWindowHandle(this));
await showDialog.ShowAsync();
```

The same `WinRT.Interop.InitializeWithWindow.Initialize` / `WindowNative.GetWindowHandle` pattern applies to `FileOpenPicker`, `FileSavePicker`, and `FolderPicker`.

```cppwinrt
// pch.h
#include <Shobjidl.h>
#include <microsoft.ui.xaml.window.h>
#include <winrt/Windows.UI.Popups.h>
...
// MainWindow.xaml.cpp
auto showDialog{ Windows::UI::Popups::MessageDialog(L"Message here") };
auto windowNative{ this->m_inner.as<::IWindowNative>() };
HWND hWnd{ 0 };
windowNative->get_WindowHandle(&hWnd);
showDialog.as<::IInitializeWithWindow>()->Initialize(hWnd);
co_await showDialog.ShowAsync();
```

## Options / Props

| Scenario | UWP | Windows App SDK |
|------|-------------|------|
| Current/main window | `Windows.UI.Xaml.Window.Current` | Static `App.Window` property you define yourself |
| Message dialog / pickers | Shown directly | Must call `IInitializeWithWindow`/`InitializeWithWindow.Initialize` with the owning HWND before `ShowAsync` |
| `ContentDialog` / `Popup` | Shown directly | Must set `XamlRoot` (e.g. `this.Content.XamlRoot`) before `ShowAsync` |
| `DataTransferManager.ShowShareUI` | `GetForCurrentView()` | Must be associated with the window manually (see "Display WinRT UI objects that depend on CoreWindow") |
| `AcrylicBrush.BackgroundSource` | Configurable background source | Removed — `AcrylicBrush` always samples app content; use `DesktopAcrylicController` for backdrop control |
| `DisplayInformation.GetForCurrentView` | Provides DPI/scale/orientation | Throws (no `CoreWindow`) — use `XamlRoot.RasterizationScale` and the `XamlRoot.Changed` event instead |

## Notes

- `Window.Current` isn't supported in the Windows App SDK — define a public static `Window` property on your `App` class, set it once in `OnLaunched`, and change `Window.Current` references to `App.Window` (or plain `window`/`this` inside the `App` class itself).
- File pickers and `MessageDialog` require the **file picker HWND initialization** pattern above; without it, `ShowAsync` throws because there is no implicit owning window like UWP's `CoreWindow`.
- New Windows App SDK projects have no `Page`/navigation code by default (unlike the UWP template). For single-page apps you can copy XAML/code-behind into `MainWindow`, but `Window` isn't a `DependencyObject`, so `<Page.Resources>` must be reparented under the root layout container (e.g. `<Grid.Resources>`), and Visual State Manager markup requires wrapping content in a `UserControl` or `Page`.
- **Virtualized list null-placeholder behavior differs**: UWP's `ListView`/`GridView` tolerate `null` items in an `IItemsRangeInfo`-virtualized data source; WinUI 3 crashes with `E_POINTER` (`0x80004003`) on `null` items — use a non-null sentinel placeholder object instead.
- **Empty `Image.Source`**: `<Image Source="" />` or `Source="{x:Null}"` is harmless in UWP but causes a fail-fast crash at startup in WinUI 3 — omit the `Source` attribute and set it in code only when a valid URI is available.
- Applies to `Microsoft.UI.Xaml.Controls.ContentDialog` / `Microsoft.UI.Xaml.Controls.Primitives.Popup` (WinUI 3) — distinct from `System.Windows.Controls.ContentDialog`-style constructs in WPF, which don't share this API.

## Related

- [Windowing functionality migration](./windowing-migration.md)
- [Mapping UWP APIs to the Windows App SDK](./namespace-mapping.md)
- [What's supported when migrating from UWP to WinUI](./what-is-supported.md)
- [Application lifecycle functionality migration](./applifecycle-migration.md)
