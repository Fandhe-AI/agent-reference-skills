# DesktopChildSiteBridge

`Microsoft.UI.Content.DesktopChildSiteBridge` is a sealed `DesktopSiteBridge` implementation for a Win32 `WS_CHILD` HWND. It is the object returned by `DesktopWindowXamlSource.SiteBridge` and controls the positioning, visibility, and Z-order of the hosted content island's HWND inside the host window.

## Signature / Usage

```csharp
public sealed class DesktopChildSiteBridge : DesktopSiteBridge, IContentSiteBridgeEndpointConnectionPrivate
```

```csharp
// Created directly (advanced scenario) as a child of an existing HWND
DesktopChildSiteBridge bridge = DesktopChildSiteBridge.Create(compositor, parentWindowId);
bridge.Connect(contentIsland);
bridge.MoveAndResize(new Windows.Graphics.RectInt32(0, 0, clientWidth, clientHeight));
bridge.Show();
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `Create(Compositor compositor, WindowId parentWindowId)` | static method | Creates a new `DesktopChildSiteBridge` as a child of the specified parent HWND. `compositor` must be associated with the current thread; `parentWindowId` must reference a `WS_OVERLAPPED`, `WS_POPUP`, or `WS_CHILD` window. |
| `CreateWithDispatcherQueue(DispatcherQueue, WindowId)` | static method | Same as `Create`, using an explicit `DispatcherQueue` instead of inferring one from the compositor's thread. |
| `Connect(ContentIsland island)` | method (inherited) | Connects a `ContentIsland` (the hosted content) to this bridge. |
| `MoveAndResize(RectInt32 rect)` | method (inherited) | Moves the associated HWND to the specified location and sets it to the specified size — used to keep the hosted island in sync with the host window's layout/DPI changes. |
| `Show()` / `Hide()` | method (inherited) | Shows or hides the associated HWND and any popups it owns. |
| `Enable()` / `Disable()` | method (inherited) | Enables or disables the associated HWND. |
| `MoveInZOrderAtTop()` / `MoveInZOrderAtBottom()` / `MoveInZOrderBelow(WindowId)` | method (inherited) | Adjusts the Z-order of the associated HWND. |
| `IsVisible` | `bool` (get, inherited) | Whether the associated HWND is currently visible. |
| `IsEnabled` | `bool` (get, inherited) | Whether the associated HWND is currently enabled. |
| `IsClosed` | `bool` (get, inherited) | Whether the associated HWND is closed. |
| `ResizePolicy` | `ContentSizePolicy` (get/set) | Resizing policy between the `ContentIsland` and its associated HWND (e.g. resize content to match the parent window vs. resize the parent window to match content). |
| `SiteView` | `ContentSite` (get) | Immutable view of the `ContentSite` created by this bridge. |
| `WindowId` | `Microsoft.UI.WindowId` (get, inherited) | `WindowId` of the associated HWND. |
| `Closed` | event (inherited) | Raised when the associated HWND is closed. |

## Notes

- Namespace `Microsoft.UI.Content` (Windows App SDK). In normal XAML Islands usage you obtain this object from `DesktopWindowXamlSource.SiteBridge` rather than calling `Create` directly; direct creation is for advanced content-hosting scenarios that bypass `DesktopWindowXamlSource`.
- There is no member literally named `SiteVisible` or `ResizeToParentWindow`; the equivalent members are `IsVisible` (read-only visibility state), `Show()`/`Hide()` (to change visibility), and `MoveAndResize(RectInt32)` (to resize/reposition, typically called on every host window `WM_SIZE`/DPI-change to keep the island in sync).
- Base class `DesktopSiteBridge` is abstract; the other concrete derived type is `PopupWindowSiteBridge` (for popup-style HWNDs), not used directly for standard XAML Islands hosting.

## Related

- [DesktopWindowXamlSource](./desktop-window-xaml-source.md)
- [DPI and sizing](./dpi-and-sizing.md)
