# Win32 Data Types (HWND / HINSTANCE / LRESULT / WPARAM / LPARAM)

Core opaque handle and message-parameter types used throughout the Win32 windowing API, declared in `WinDef.h` / `WinNT.h` / `BaseTsd.h`.

## Signature / Usage

```cpp
typedef HANDLE HWND;                  // handle to a window
typedef HANDLE HINSTANCE;             // handle to a module instance (base address in memory)
typedef HINSTANCE HMODULE;            // same representation as HINSTANCE today
typedef LONG_PTR LRESULT;             // signed result of message processing
typedef UINT_PTR WPARAM;              // message parameter
typedef LONG_PTR LPARAM;              // message parameter
typedef WORD ATOM;                    // atom (e.g. class-registration atom)
typedef int BOOL;                     // TRUE/FALSE
```

## Options / Props

| Name | Underlying type | Description |
|------|------------------|--------------|
| HWND | `HANDLE` | Handle to a window |
| HINSTANCE | `HANDLE` | Handle to a module instance; identical representation to `HMODULE` on current Windows |
| LRESULT | `LONG_PTR` | Signed result of window-procedure message processing |
| WPARAM | `UINT_PTR` | Additional message data (pointer-sized unsigned) |
| LPARAM | `LONG_PTR` | Additional message data (pointer-sized signed) |
| ATOM | `WORD` | 16-bit atom value, e.g. return of `RegisterClassExW` |
| BOOL | `int` | Boolean; compare against `TRUE`/`FALSE`, not just nonzero/zero for some APIs |
| HRESULT | `LONG` | COM/Win32 result code; test with `SUCCEEDED`/`FAILED` macros |

## Notes

- `WPARAM`/`LPARAM`/`LRESULT` are pointer-sized (`_PTR` typedefs), so they widen to 64 bits on 64-bit Windows even though they historically held 32-bit values.
- `HWND`, `HINSTANCE`, and most handle types are opaque `PVOID`-based `HANDLE`s; never dereference them directly.

## Related

- [WNDPROC / DefWindowProcW](./window-procedure.md)
- [CreateWindowExW](./create-window.md)
