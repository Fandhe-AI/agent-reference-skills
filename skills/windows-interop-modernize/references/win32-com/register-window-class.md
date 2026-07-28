# RegisterClassExW / WNDCLASSEXW

Registers a window class for subsequent use in `CreateWindow` / `CreateWindowEx` calls. `WNDCLASSEXW` is the structure that describes the class attributes passed to `RegisterClassExW`.

## Signature / Usage

```cpp
ATOM RegisterClassExW(
  [in] const WNDCLASSEXW *unnamedParam1
);

typedef struct tagWNDCLASSEXW {
  UINT      cbSize;
  UINT      style;
  WNDPROC   lpfnWndProc;
  int       cbClsExtra;
  int       cbWndExtra;
  HINSTANCE hInstance;
  HICON     hIcon;
  HCURSOR   hCursor;
  HBRUSH    hbrBackground;
  LPCWSTR   lpszMenuName;
  LPCWSTR   lpszClassName;
  HICON     hIconSm;
} WNDCLASSEXW, *PWNDCLASSEXW, *NPWNDCLASSEXW, *LPWNDCLASSEXW;
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| cbSize | UINT | Must be set to `sizeof(WNDCLASSEX)` before calling `RegisterClassExW`/`GetClassInfoEx` |
| style | UINT | Class style bits (see class styles, e.g. `CS_HREDRAW`) |
| lpfnWndProc | WNDPROC | Pointer to the window procedure |
| cbClsExtra / cbWndExtra | int | Extra bytes to allocate after the class / instance structure |
| hInstance | HINSTANCE | Instance containing the window procedure |
| hIcon / hIconSm | HICON | Large and small class icons |
| hCursor | HCURSOR | Class cursor |
| hbrBackground | HBRUSH | Background brush or a `COLOR_*` system color + 1 |
| lpszMenuName | LPCWSTR | Default menu resource name |
| lpszClassName | LPCWSTR | Class name (max length 256) |

Return value: `ATOM` class atom on success, `0` on failure (call `GetLastError`).

## Notes

- All classes an application registers are automatically unregistered on termination; a DLL must explicitly call `UnregisterClass` when unloaded.
- `RegisterClassExW` is the Unicode form; requests Unicode text parameters for messages sent to windows of this class.

## Related

- [CreateWindowExW](./create-window.md)
- [WNDPROC](./window-procedure.md)
