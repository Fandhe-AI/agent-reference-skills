# ShowWindow / UpdateWindow / DestroyWindow

Functions that control a window's visibility, force an initial repaint, and tear the window down.

## Signature / Usage

```cpp
BOOL ShowWindow(
  [in] HWND hWnd,
  [in] int  nCmdShow
);

BOOL UpdateWindow(
  [in] HWND hWnd
);

BOOL DestroyWindow(
  [in] HWND hWnd
);
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| hWnd | HWND | Target window handle |
| nCmdShow | int | Show-state flag: `SW_HIDE`, `SW_SHOWNORMAL`, `SW_SHOWMINIMIZED`, `SW_SHOWMAXIMIZED`, `SW_SHOWNOACTIVATE`, `SW_SHOW`, `SW_MINIMIZE`, `SW_SHOWMINNOACTIVE`, `SW_SHOWNA`, `SW_RESTORE`, `SW_SHOWDEFAULT`, `SW_FORCEMINIMIZE` |

Return values: `ShowWindow` returns nonzero if the window was previously visible; `UpdateWindow`/`DestroyWindow` return nonzero on success, zero on failure (`GetLastError`).

## Notes

- `ShowWindow`'s first call should use the `nCmdShow` value passed to `WinMain`; subsequent calls use an explicit `SW_*` value.
- `UpdateWindow` sends `WM_PAINT` directly to the window procedure (bypassing the queue) only if the update region is non-empty.
- `DestroyWindow` sends `WM_DESTROY` then `WM_NCDESTROY`; it recursively destroys owned/child windows first. A thread cannot destroy a window created by a different thread.
- Call `PostQuitMessage` from the `WM_DESTROY` handler of the main window to end the message loop.

## Related

- [CreateWindowExW](./create-window.md)
- [Window Messages](./window-messages.md)
- [Message Loop](./message-loop.md)
