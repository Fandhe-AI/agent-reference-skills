# WNDPROC / DefWindowProcW

`WNDPROC` is the callback signature for an application-defined window procedure that processes messages sent to a window. `DefWindowProcW` provides the default processing for any message the application does not handle, and should be called for every unhandled message.

## Signature / Usage

```cpp
LRESULT CALLBACK WindowProc(
  HWND   hWnd,
  UINT   uMsg,
  WPARAM wParam,
  LPARAM lParam
);

LRESULT DefWindowProcW(
  [in] HWND   hWnd,
  [in] UINT   Msg,
  [in] WPARAM wParam,
  [in] LPARAM lParam
);
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| hWnd | HWND | Handle to the target window |
| uMsg / Msg | UINT | The message code (e.g. `WM_PAINT`) |
| wParam | WPARAM | Additional message-specific data |
| lParam | LPARAM | Additional message-specific data |

Return value: `LRESULT`, meaning depends on the message.

## Notes

- Assign the window procedure to `WNDCLASSEXW.lpfnWndProc` before calling `RegisterClassExW`.
- Uncaught C++ exceptions thrown from `WNDPROC` are handled differently depending on OS/architecture; do not let exceptions escape the callback.
- Any message the application does not explicitly handle should return `DefWindowProcW(hWnd, uMsg, wParam, lParam)` to guarantee correct default behavior.

## Related

- [RegisterClassExW / WNDCLASSEXW](./register-window-class.md)
- [Message Loop](./message-loop.md)
- [Window Messages](./window-messages.md)
- [Win32 Data Types](./win32-data-types.md)
