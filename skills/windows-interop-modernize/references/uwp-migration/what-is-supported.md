# What's supported when migrating from UWP to WinUI 3

Before migrating, review which UWP features are fully supported in WinUI 3 and the Windows App SDK (2.0), which have alternatives, and which aren't yet supported — including known control gaps and performance considerations.

## Options / Props

| UWP feature | WinUI status |
|------|-------------|
| Background acrylic | Available via `DesktopAcrylicController` |
| Background tasks | Supported; see `BackgroundTaskBuilder` (1.7+) |
| `ContentDialog` | Available. Preferred over `MessageDialog` (no HWND interop; set `XamlRoot` instead) |
| `RichEditBox` | Available |
| `WebView` (UWP) | Use `WebView2` (requires the WebView2 Runtime, pre-installed on most Windows 10/11 via Edge) |
| `DataGrid` | No first-party WinUI 3 control. CommunityToolkit DataGrid (7.1.0) is UWP-only, not ported. Community alt: WinUI.TableView. Or use `ListView`/`GridView` for simple tabular data |
| `CameraCaptureUI` | Supported; see `CameraCaptureUI` (1.7+); alt: Win32 video capture |
| Composition/DirectX interop | Mostly supported ("Enhance UI with the Visual layer") |
| Distributing via Store | Supported |
| Live Tiles (Windows 10) | Supported |
| `MapControl` | Supported (1.5+) |
| `MediaElement` and `MediaPlayerElement` | Use `MediaPlayerElement` (introduced 1.2) |
| MSAL library | Supported |
| MSIX | Supported |
| Single-instancing | Supported |
| `TaskbarManager` API | Supported |
| Toast notifications | Supported |
| Visual Studio App Center | Retired March 31, 2025; migrate to Azure Monitor |
| `WebAuthenticationBroker` | Supported; see `Microsoft.Security.Authentication.OAuth` (1.7+) |
| Best launch speed and performance | Slight disadvantage vs. UWP — see performance considerations |
| `CoreTextServicesManager` | Supported only on Windows 11 |
| `PrintManager` | Supported on Windows 11 only (not on Windows 10) |
| `CoreWindow` and related APIs | **Not supported in 2.0.** Alternatives: `AppWindow`, HWND-based APIs |
| Virtual key support for gamepad input | Not supported in 2.0 |
| `InkCanvas` | Experimental only (2.0 Experimental 1), not in stable channel. `InkToolbar` not available. Referencing either in XAML gives `WMC0001 Unknown type` |
| `Windows.Data.Html.HtmlUtilities` | Calls into IE/Trident (`iertutil.dll`), fail-fasts with `STATUS_STACK_BUFFER_OVERRUN` in packaged apps (same for legacy `WebView`). Use `WebView2` or a managed HTML library (e.g. HtmlAgilityPack) |
| `CaptureElement` | No WinUI 3 equivalent |
| `RadialController` interop | `IRadialControllerInterop.CreateForWindow` fail-fasts at runtime in packaged apps, despite being documented as desktop-supported. No workaround |
| Single-app kiosk | Not supported in 2.0 |
| Xbox and HoloLens | Not supported in 2.0 |

### Known control gaps (Windows App SDK 2.0)

| UWP control or API | Status | Alternatives |
|------|-------------|------|
| `InkCanvas` | Experimental only, not in stable | Win2D with pointer input handling; third-party inking libraries |
| `InkToolbar` | Not available | Custom toolbar paired with Win2D inking |
| `CaptureElement` | Not available | `MediaPlayerElement` with `MediaSource.CreateFromMediaFrameSource` for camera preview |
| `RadialController` | Runtime failure in packaged apps | No first-party alternative; custom dial UI or Win32 raw input |
| `DisplayRequest` | Not available | Win32 `SetThreadExecutionState` |

## Notes

- Applies to `Microsoft.UI.Xaml.Controls.*` (WinUI 3) controls — same-named UWP types under `Windows.UI.Xaml.Controls.*` are a distinct, non-interchangeable API.
- Experimental-channel APIs (for example `InkCanvas`) may change or be removed; do not use them in production apps.
- The XAML Designer **Design** tab in Visual Studio/Blend doesn't support WinUI 3 projects as of Windows App SDK 2.0 — use the runtime design workflow ("XAML runtime design tools for WinUI 3") instead.

## Related

- [Migration overview](./migration-overview.md)
- [Mapping UWP APIs to the Windows App SDK](./namespace-mapping.md)
- [Windowing functionality migration](./windowing-migration.md)
- [User interface migration (including WinUI)](./winui3-ui-migration.md)
