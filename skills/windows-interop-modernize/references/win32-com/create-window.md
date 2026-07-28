# CreateWindowExW

Creates an overlapped, pop-up, or child window with an extended window style. This is the primary Win32 function for instantiating a window from a previously registered window class.

## Signature / Usage

```cpp
HWND CreateWindowExW(
  [in]           DWORD     dwExStyle,
  [in, optional] LPCWSTR   lpClassName,
  [in, optional] LPCWSTR   lpWindowName,
  [in]           DWORD     dwStyle,
  [in]           int       X,
  [in]           int       Y,
  [in]           int       nWidth,
  [in]           int       nHeight,
  [in, optional] HWND      hWndParent,
  [in, optional] HMENU     hMenu,
  [in, optional] HINSTANCE hInstance,
  [in, optional] LPVOID    lpParam
);
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| dwExStyle | DWORD | Extended window style; see `WS_EX_*` constants |
| lpClassName | LPCWSTR | Registered class name (via `RegisterClassExW`) or a class atom |
| lpWindowName | LPCWSTR | Window title / control text |
| dwStyle | DWORD | Window style; combination of `WS_*` constants |
| X, Y | int | Initial position; `CW_USEDEFAULT` selects the system default (overlapped windows only) |
| nWidth, nHeight | int | Initial size in device units; `CW_USEDEFAULT` selects the system default |
| hWndParent | HWND | Parent/owner window handle; `HWND_MESSAGE` for a message-only window |
| hMenu | HMENU | Menu handle (top-level windows) or child-window identifier |
| hInstance | HINSTANCE | Module instance associated with the window |
| lpParam | LPVOID | Value passed via `CREATESTRUCT.lpCreateParams` in the `WM_CREATE` message |

Return value: `HWND` handle on success, `NULL` on failure (call `GetLastError`).

## Notes

- Sends `WM_NCCREATE`, `WM_NCCALCSIZE`, and `WM_CREATE` to the new window before returning.
- The class named by `lpClassName` must have been registered by the same module that calls `CreateWindowExW`.
- `CreateWindowExW` is the Unicode entry point; the encoding-neutral `CreateWindowEx` macro selects it when `UNICODE` is defined.
- To remove a window created this way, call `DestroyWindow`.

## Related

- [RegisterClassExW](./register-window-class.md)
- [Window Styles](./window-styles.md)
- [Extended Window Styles](./extended-window-styles.md)
- [DestroyWindow](./window-lifecycle.md)
- [WNDPROC](./window-procedure.md)
