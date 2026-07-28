# Window Messages (WM_PAINT / WM_DESTROY / WM_SIZE / WM_COMMAND)

Core `WM_*` notification codes handled inside a `WNDPROC`. A message is a numeric code (e.g. `WM_PAINT`) delivered with `wParam`/`lParam` payload, either posted through the message queue or sent directly by the system.

## Signature / Usage

```cpp
LRESULT CALLBACK WindowProc(HWND hWnd, UINT uMsg, WPARAM wParam, LPARAM lParam)
{
    switch (uMsg)
    {
    case WM_SIZE:
        // wParam: resize type (SIZE_MAXIMIZED, SIZE_MINIMIZED, SIZE_RESTORED, ...)
        // lParam: LOWORD = new client width, HIWORD = new client height
        return 0;

    case WM_COMMAND:
        // wParam: LOWORD = control/menu identifier, HIWORD = notification code
        // lParam: handle to the control window, or 0 for a menu command
        return 0;

    case WM_PAINT:
    {
        PAINTSTRUCT ps;
        HDC hdc = BeginPaint(hWnd, &ps);
        // ... drawing ...
        EndPaint(hWnd, &ps);
        return 0;
    }

    case WM_DESTROY:
        PostQuitMessage(0);
        return 0;
    }
    return DefWindowProc(hWnd, uMsg, wParam, lParam);
}
```

## Options / Props

| Message | wParam | lParam | Description |
|---------|--------|--------|-------------|
| WM_PAINT | unused | unused | Sent when a window's client area must be repainted; handle with `BeginPaint`/`EndPaint` |
| WM_DESTROY | unused | unused | Sent after the window is removed from the screen, as part of `DestroyWindow` processing; the main window's handler typically calls `PostQuitMessage` |
| WM_SIZE | resize type (`SIZE_RESTORED`, `SIZE_MINIMIZED`, `SIZE_MAXIMIZED`, ...) | LOWORD/HIWORD = new client width/height | Sent after the window's size has changed |
| WM_COMMAND | LOWORD = control/menu/accelerator ID, HIWORD = notification code | control window handle, or 0 for menu/accelerator | Sent when the user selects a menu item, a control sends a notification, or an accelerator key is pressed |

## Notes

- Always route unhandled messages to `DefWindowProc`/`DefWindowProcW` for default behavior.
- `WM_DESTROY` is distinct from `WM_NCDESTROY`, which is sent after `WM_DESTROY` once child windows are also destroyed.

## Related

- [WNDPROC / DefWindowProcW](./window-procedure.md)
- [Message Loop](./message-loop.md)
- [Window Lifecycle (ShowWindow / UpdateWindow / DestroyWindow)](./window-lifecycle.md)
