# SetProcessDpiAwarenessContext / GetDpiForWindow

Functions for opting a process into per-monitor DPI awareness and querying the effective DPI of a given window, needed to render crisply on high-DPI displays.

## Signature / Usage

```cpp
BOOL SetProcessDpiAwarenessContext(
  [in] DPI_AWARENESS_CONTEXT value
);

UINT GetDpiForWindow(
  [in] HWND hwnd
);
```

```cpp
SetProcessDpiAwarenessContext(DPI_AWARENESS_CONTEXT_PER_MONITOR_AWARE_V2);
// ... after window creation ...
UINT dpi = GetDpiForWindow(hwnd);
float scale = dpi / 96.0f;
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| value | DPI_AWARENESS_CONTEXT | e.g. `DPI_AWARENESS_CONTEXT_UNAWARE`, `DPI_AWARENESS_CONTEXT_SYSTEM_AWARE`, `DPI_AWARENESS_CONTEXT_PER_MONITOR_AWARE`, `DPI_AWARENESS_CONTEXT_PER_MONITOR_AWARE_V2` |
| hwnd | HWND | Window to query |

Return values: `SetProcessDpiAwarenessContext` returns `TRUE`/`FALSE` (`GetLastError` on failure: `ERROR_INVALID_PARAMETER`, `ERROR_ACCESS_DENIED`); `GetDpiForWindow` returns the DPI value (`0` for an invalid `hwnd`).

## Notes

- Microsoft recommends setting default DPI awareness via the application manifest rather than this API call, to avoid unexpected behavior.
- Must be called before creating any UI in the process; once set (via manifest or API), later calls fail.
- `GetDpiForWindow`'s return depends on the window's `DPI_AWARENESS`: base 96 if unaware, system DPI if system-aware, or the monitor's DPI if per-monitor aware.

## Related

- [CreateWindowExW](./create-window.md)
