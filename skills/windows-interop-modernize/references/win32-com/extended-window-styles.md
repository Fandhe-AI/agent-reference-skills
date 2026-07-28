# Extended Window Styles (WS_EX_*)

Style bits passed as the `dwExStyle` parameter of `CreateWindowExW`, extending window appearance and behavior beyond the base `WS_*` styles.

## Signature / Usage

```cpp
HWND hwnd = CreateWindowExW(
    WS_EX_CLIENTEDGE | WS_EX_APPWINDOW,
    className, L"Title", WS_OVERLAPPEDWINDOW,
    CW_USEDEFAULT, CW_USEDEFAULT, CW_USEDEFAULT, CW_USEDEFAULT,
    nullptr, nullptr, hInstance, nullptr);
```

## Options / Props

| Name | Description |
|------|-------------|
| WS_EX_ACCEPTFILES | Window accepts drag-drop files |
| WS_EX_APPWINDOW | Forces a top-level window onto the taskbar |
| WS_EX_CLIENTEDGE | Sunken-edge border |
| WS_EX_COMPOSITED | Bottom-to-top double-buffered painting for descendant windows |
| WS_EX_CONTEXTHELP | Title bar shows a context-help question mark; cannot combine with `WS_MAXIMIZEBOX`/`WS_MINIMIZEBOX` |
| WS_EX_CONTROLPARENT | Children participate in dialog-style keyboard navigation |
| WS_EX_DLGMODALFRAME | Double border, optionally with a title bar |
| WS_EX_LAYERED | Layered window (alpha/transparency effects) |
| WS_EX_LAYOUTRTL | Right-to-left horizontal layout origin |
| WS_EX_MDICHILD | MDI child window |
| WS_EX_NOACTIVATE | Does not become the foreground window on click |
| WS_EX_NOPARENTNOTIFY | Suppresses `WM_PARENTNOTIFY` to the parent |
| WS_EX_OVERLAPPEDWINDOW | `WS_EX_WINDOWEDGE \| WS_EX_CLIENTEDGE` |
| WS_EX_TOOLWINDOW | Floating toolbar window; excluded from taskbar and Alt+Tab |
| WS_EX_TOPMOST | Stays above all non-topmost windows; toggle via `SetWindowPos` |
| WS_EX_TRANSPARENT | Not painted until sibling windows beneath it are painted |
| WS_EX_WINDOWEDGE | Raised-edge border |

## Notes

- Used only together with `CreateWindowExW` (not `CreateWindow`).
- `WS_EX_NOACTIVATE` combined with `WM_MOUSEACTIVATE` handling is a common pattern for tool/overlay windows that should not steal focus.

## Related

- [CreateWindowExW](./create-window.md)
- [Window Styles](./window-styles.md)
