# Input and focus navigation

`DesktopWindowXamlSource` participates in the host application's keyboard/tab navigation chain via focus events and the `NavigateFocus` method, since the hosted WinUI 3 content lives in a separate HWND from the host window.

## Signature / Usage

```csharp
xamlSource.GotFocus += (s, e) =>
{
    // The hosted content received focus (e.g. Tab pressed on the
    // preceding host control). Update host-side visual focus state.
};

xamlSource.TakeFocusRequested += (s, e) =>
{
    // The hosted content wants to give focus back to the host
    // (e.g. user tabbed past the last focusable element inside it).
    // Move focus to the next/previous host control based on e.Request.
};

// Programmatically push focus into the hosted content, e.g. when the
// host control preceding it receives Tab:
var request = new XamlSourceFocusNavigationRequest(XamlSourceFocusNavigationReason.First);
xamlSource.NavigateFocus(request);
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `NavigateFocus(XamlSourceFocusNavigationRequest request)` | method | Attempts to programmatically move focus into the `DesktopWindowXamlSource`'s content. |
| `GotFocus` | event | Raised when the source gains focus in the desktop application. |
| `TakeFocusRequested` | event | Raised when the hosted content requests that the host application take back focus (e.g. Tab/Shift+Tab reaches the boundary of the hosted content). |
| `HasFocus` | `bool` (get) | Whether the source currently has focus. |

## Notes

- Because the host window and the hosted WinUI 3 content are separate HWNDs, Tab-key navigation across the boundary is not automatic — the host app must handle `TakeFocusRequested` and call `NavigateFocus` to hand focus off in each direction, mirroring how the legacy UWP XAML Islands hosting API requires the same handshake.
- Mouse/pointer input is dispatched natively by Windows to whichever HWND is under the cursor, so pointer interaction generally works without extra wiring; keyboard focus traversal is the part that needs explicit handling.
- WPF/WinForms host controls that wrap this pattern typically override the framework's own focus/tab-navigation hooks (e.g. WPF's `HwndHost.TabInto`) to call `NavigateFocus`.

## Related

- [DesktopWindowXamlSource](./desktop-window-xaml-source.md)
- [Hosting in WPF, WinForms, and Win32 apps](./hosting-wpf-winforms-win32.md)
