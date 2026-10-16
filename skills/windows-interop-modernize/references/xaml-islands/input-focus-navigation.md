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
- Input integration is required even when pointer interaction appears to work without it. Incomplete message or focus handling can leave keyboard users unable to enter or leave the island.
- The host must call the native `ContentPreTranslateMessage` function for messages before dispatching them. This is required for a host that uses the Windows App SDK UI stack. The function has no managed projection; the official Windows Forms sample P/Invokes it from Microsoft.UI.Windowing.Core.dll and registers an `IMessageFilter`.
- Test tab order in both directions, accelerator keys, mnemonics, pointer input, text input, and input method editors (IME). Verify accessibility names, relationships, and focus order across the host and island with an accessibility inspection tool.
- WPF/WinForms host controls that wrap this pattern typically override the framework's own focus/tab-navigation hooks (e.g. WPF's `HwndHost.TabInto`) to call `NavigateFocus`.
- Source: https://learn.microsoft.com/en-us/windows/apps/desktop/modernize/host-controls-existing-desktop-apps (en-us, fetched 2026-10-16)
- Sample ContentPreTranslateMessage P/Invoke and IMessageFilter: https://github.com/microsoft/WindowsAppSDK-Samples/blob/f1be017f26a0feae4c8dc805748eab0a1f7b4fc6/Samples/Islands/cs-winforms-unpackaged/WindowsAppSdkHelper.cs

## Related

- [DesktopWindowXamlSource](./desktop-window-xaml-source.md)
- [Hosting in WPF, WinForms, and Win32 apps](./hosting-wpf-winforms-win32.md)
