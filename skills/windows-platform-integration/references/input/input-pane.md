# InputPane (on-screen touch keyboard)

Enables an app to receive notifications when the docked touch keyboard, or Soft Input Panel (SIP), is about to be shown or hidden, to determine which portion of the app window it obscures, and to programmatically request that it show or hide. `Windows.UI.ViewManagement.InputPane` is distinct from `CoreTextEditContext`, which handles the actual text/IME data flow for a custom edit control.

## Signature / Usage

```csharp
using Windows.UI.ViewManagement;

// WinUI 3 / desktop apps: InputPane.GetForCurrentView() requires a CoreWindow and
// throws outside UWP — use the WinRT.Interop projection with the window HWND instead.
IntPtr hWnd = WinRT.Interop.WindowNative.GetWindowHandle(this);
InputPane inputPane = WinRT.Interop.InputPaneInterop.GetForWindow(hWnd);

// UWP apps only:
// InputPane inputPane = InputPane.GetForCurrentView();

inputPane.Showing += InputPane_Showing;
inputPane.Hiding += InputPane_Hiding;

private void InputPane_Showing(InputPane sender, InputPaneVisibilityEventArgs args)
{
    // sender.OccludedRect gives the region of the window covered by the keyboard.
    RootGrid.Margin = new Thickness(0, 0, 0, sender.OccludedRect.Height);
    args.EnsuredFocusedElementInView = true;
}

private void InputPane_Hiding(InputPane sender, InputPaneVisibilityEventArgs args)
{
    RootGrid.Margin = new Thickness(0);
}

// Manual show/hide, e.g. after setting CoreTextEditContext.InputPaneDisplayPolicy = Manual
inputPane.TryShow();
inputPane.TryHide();
```

## Options / Props

| Member | Type | Description |
|------|------|-------------|
| `InputPane.GetForCurrentView()` | static method | Returns the `InputPane` object for the currently visible app window/view. UWP-only — requires a `CoreWindow`, throws in a desktop (WinUI 3) app. |
| `InputPane.GetForUIContext(UIContext)` | static method | Returns the `InputPane` for the view identified by a `UIContext` (added 18362/1903). |
| `WinRT.Interop.InputPaneInterop.GetForWindow(IntPtr)` | static method | Desktop (WinUI 3 / Win32) equivalent of `GetForCurrentView`; returns the `InputPane` for the window identified by an HWND. |
| `InputPane.TryShow()` | method → `bool` | Best-effort request to show the SIP; shown only if no hardware keyboard is available, and rejected (`false`) if the app is not in the foreground. |
| `InputPane.TryHide()` | method → `bool` | Best-effort request to hide the SIP; rejected (`false`) if the app is not in the foreground. |
| `InputPane.OccludedRect` | `Windows.Foundation.Rect` | Region of the app window obscured by the input pane; accurate for a docked panel only. |
| `InputPane.Visible` | `bool` | Whether the input pane is shown; documented as valid for the Xbox device family only — use `OccludedRect` on other device families. |
| `InputPane.Showing` | event `TypedEventHandler<InputPane, InputPaneVisibilityEventArgs>` | Raised when the input pane starts sliding into view. |
| `InputPane.Hiding` | event `TypedEventHandler<InputPane, InputPaneVisibilityEventArgs>` | Raised when the input pane starts sliding out of view. |
| `InputPaneVisibilityEventArgs.OccludedRect` | `Rect` | Occluded region at the time of the event. |
| `InputPaneVisibilityEventArgs.EnsuredFocusedElementInView` | `bool` | Set to `true` in the handler once the app has scrolled/repositioned content so the focused control stays visible. |

## Notes

- Namespace: `Windows.UI.ViewManagement` (UWP). By default Windows already repositions content automatically when the SIP shows; use `InputPane` only to customize that behavior or to override display with `CoreTextEditContext.InputPaneDisplayPolicy = Manual` plus `TryShow`/`TryHide`.
- There is no `Occluded` event — visibility transitions are only `Showing`/`Hiding`; occlusion geometry itself is read from `OccludedRect` on the `InputPane` or on the event args.
- Microsoft recommends `CoreInputView` / `CoreInputViewOcclusion` / `CoreInputViewOcclusionKind` instead of `InputPane` on Windows 10 Creators Fall Update and later, since those APIs also report occlusion from undocked/floating/transitory panels (IME candidate windows, floating toolbars), not just a docked SIP.
- Overlay UI such as `InputPane` is not fully supported in full-screen apps (e.g. games) or Windows Holographic apps in holographic view.
- `InputPane` is listed among the `XxxForCurrentView` WinRT classes that are unsupported in desktop apps; `WinRT.Interop.InputPaneInterop.GetForWindow(hWnd)` is the documented COM interop replacement (see `WinRT.Interop` coverage in the windows-interop-modernize skill).

## Related

- [Custom text input and IME](./text-input-ime.md)
- [Keyboard input](./keyboard-input.md)
