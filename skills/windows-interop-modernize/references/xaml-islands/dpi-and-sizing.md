# DPI and sizing

Because the hosted WinUI 3 content lives in its own child HWND, the host application is responsible for keeping that HWND's size, position, and scale factor synchronized with the host window as it moves, resizes, or changes monitor (and therefore DPI).

## Signature / Usage

```csharp
// Re-run whenever the host window is resized or its DPI changes
// (e.g. WM_SIZE / WM_DPICHANGED in Win32, SizeChanged in WPF/WinForms).
DesktopChildSiteBridge bridge = xamlSource.SiteBridge;
bridge.MoveAndResize(new Windows.Graphics.RectInt32(x, y, newWidth, newHeight));

// Optional: override the scale used by the hosted ContentSite instead of
// inheriting the parent HWND's system DPI.
bridge.OverrideScale = customScaleFactor;
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `MoveAndResize(RectInt32 rect)` | method (`DesktopSiteBridge`) | Moves and resizes the hosted content's HWND to match the given host-relative rectangle; call on every host resize/layout pass. |
| `OverrideScale` | `float` (get/set, `DesktopSiteBridge`) | Overrides the scaling factor used by the `ContentSite` owned by the associated HWND, instead of using the ambient system/monitor DPI. |
| `ResizePolicy` | `ContentSizePolicy` (get/set, `DesktopChildSiteBridge`) | Controls whether the content resizes to match the parent HWND or the parent HWND resizes to match the content. |

## Notes

- WinUI 3 content is DPI-aware per-monitor by default (Windows App SDK apps are Per-Monitor-V2 by default); when the host window moves across monitors with different DPI, the hosted island picks up the new system DPI automatically unless `OverrideScale` is set.
- The host application must still explicitly call `MoveAndResize` in response to host-window size/DPI changes — there is no automatic layout binding between the host window and the child HWND.
- This differs from purely in-process WinUI 3 windowing where `AppWindow`/XAML layout handles resize automatically; XAML Islands always requires the host to drive the child HWND's bounds.

## Related

- [DesktopChildSiteBridge](./desktop-child-site-bridge.md)
- [Hosting in WPF, WinForms, and Win32 apps](./hosting-wpf-winforms-win32.md)
