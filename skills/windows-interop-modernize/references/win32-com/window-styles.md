# Window Styles (WS_*)

Style bits passed as the `dwStyle` parameter of `CreateWindowExW` (and stored in `WNDCLASSEXW`-created windows), controlling frame, border, and behavior.

## Signature / Usage

```cpp
HWND hwnd = CreateWindowExW(
    0, className, L"Title",
    WS_OVERLAPPEDWINDOW,       // WS_OVERLAPPED | WS_CAPTION | WS_SYSMENU | WS_THICKFRAME | WS_MINIMIZEBOX | WS_MAXIMIZEBOX
    CW_USEDEFAULT, CW_USEDEFAULT, CW_USEDEFAULT, CW_USEDEFAULT,
    nullptr, nullptr, hInstance, nullptr);
```

## Options / Props

| Name | Description |
|------|-------------|
| WS_BORDER | Thin-line border |
| WS_CAPTION | Title bar (includes `WS_BORDER`) |
| WS_CHILD | Child window; cannot combine with `WS_POPUP` |
| WS_CLIPCHILDREN | Excludes child-window area when drawing in the parent |
| WS_CLIPSIBLINGS | Clips sibling windows during `WM_PAINT` |
| WS_DISABLED | Initially disabled; cannot receive user input |
| WS_DLGFRAME | Dialog-style border; cannot have a title bar |
| WS_GROUP | First control of a navigation group |
| WS_HSCROLL / WS_VSCROLL | Adds a horizontal / vertical scroll bar |
| WS_MAXIMIZE / WS_MINIMIZE (WS_ICONIC) | Initially maximized / minimized |
| WS_MAXIMIZEBOX / WS_MINIMIZEBOX | Adds maximize / minimize button (requires `WS_SYSMENU`) |
| WS_OVERLAPPED (WS_TILED) | Overlapped window with title bar and border |
| WS_OVERLAPPEDWINDOW (WS_TILEDWINDOW) | `WS_OVERLAPPED \| WS_CAPTION \| WS_SYSMENU \| WS_THICKFRAME \| WS_MINIMIZEBOX \| WS_MAXIMIZEBOX` |
| WS_POPUP | Pop-up window; cannot combine with `WS_CHILD` |
| WS_POPUPWINDOW | `WS_POPUP \| WS_BORDER \| WS_SYSMENU` |
| WS_SIZEBOX (WS_THICKFRAME) | Sizing border |
| WS_SYSMENU | Window menu on the title bar (requires `WS_CAPTION`) |
| WS_TABSTOP | Control participates in TAB navigation |
| WS_VISIBLE | Initially visible; toggle with `ShowWindow`/`SetWindowPos` |

## Notes

- After window creation these styles generally cannot be changed except via documented mechanisms (e.g. `SetWindowLong`, `ShowWindow`).
- Combine flags with bitwise OR when passed to `CreateWindowExW`.

## Related

- [CreateWindowExW](./create-window.md)
- [Extended Window Styles](./extended-window-styles.md)
