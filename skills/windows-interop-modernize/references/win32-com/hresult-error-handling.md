# HRESULT Error Handling (SUCCEEDED/FAILED, HRESULT_FROM_WIN32)

`HRESULT` is the 32-bit result code returned by nearly every COM and Win32-interop API. It packs a severity bit, a facility code, and an error/status code into one value; test it with the `SUCCEEDED`/`FAILED` macros rather than comparing to `S_OK`.

## Signature / Usage

```cpp
HRESULT hr = pStream->Read(buffer, cb, &cbRead);
if (FAILED(hr))
{
    // handle or propagate hr
    return hr;
}
```

```cpp
// Wrap a Win32 GetLastError() value as an HRESULT
DWORD win32Err = GetLastError();
HRESULT hr = HRESULT_FROM_WIN32(win32Err);
if (FAILED(hr))
{
    return hr;
}
```

```cpp
#define SUCCEEDED(hr) (((HRESULT)(hr)) >= 0)
#define FAILED(hr)    (((HRESULT)(hr)) < 0)
```

## Options / Props

| Bits | Field | Description |
|------|-------|--------------|
| 31 | Severity | `0` = success, `1` = failure (`SEVERITY_SUCCESS` / `SEVERITY_ERROR`) |
| 30-28 | Reserved (R, C, N) | Reserved; must be zero for standard codes |
| 27 | Reserved (r) | Reserved; must be zero |
| 26-16 | Facility | System/component that produced the code, e.g. `FACILITY_WIN32` (7), `FACILITY_ITF` (4), `FACILITY_NULL` (0), `FACILITY_RPC` (1), `FACILITY_STORAGE` (3), `FACILITY_WINDOWS` (8) |
| 15-0 | Code | Facility-specific status/error code |

| Value | HRESULT | Meaning |
|-------|---------|---------|
| S_OK | `0x00000000` | Success |
| S_FALSE | `0x00000001` | Success, but with a secondary/false result |
| E_FAIL | `0x80004005` | Unspecified failure |
| E_INVALIDARG | `0x80070057` | One or more arguments are invalid |
| E_NOINTERFACE | `0x80004002` | Interface not supported (from `QueryInterface`) |
| E_NOTIMPL | `0x80004001` | Not implemented |
| E_POINTER | `0x80004003` | Invalid pointer, e.g. `NULL` out-parameter |
| E_OUTOFMEMORY | `0x8007000E` | Out of memory |
| E_ACCESSDENIED | `0x80070005` | General access-denied error |
| E_ABORT | `0x80004004` | Operation aborted |
| E_UNEXPECTED | `0x8000FFFF` | Catastrophic, unexpected failure |

## Notes

- Never test success/failure with `hr == S_OK`; some APIs return other non-negative success codes (e.g. `S_FALSE`), which `SUCCEEDED`/`FAILED` handle correctly and a plain equality check does not.
- `HRESULT_FROM_WIN32(x)` converts a `GetLastError()`-style Win32 error code into an `HRESULT` by placing it in the code field with `FACILITY_WIN32` and the severity bit set; if `x` is already non-positive it is returned unchanged.
- By convention names follow *Facility*\_*Severity*\_*Reason* (e.g. `STG_E_FILENOTFOUND`); codes from `FACILITY_NULL` omit the facility prefix (e.g. `S_OK`, `E_FAIL`).
- C++/WinRT surfaces `HRESULT` failures as C++ exceptions (`winrt::hresult_error`) instead of return codes; see `error-handling.md` in the cppwinrt category of this skill for that layer.
- In C#/.NET interop, a failing `HRESULT` returned across a P/Invoke or WinRT boundary is thrown as a `COMException`/`Exception` whose `HResult` property holds the value.

## Related

- [CoCreateInstance / CLSID / IID](./com-create-instance.md)
- [IUnknown (QueryInterface / AddRef / Release)](./iunknown.md)
- [Win32 Data Types (HWND / HINSTANCE / LRESULT / WPARAM / LPARAM)](./win32-data-types.md)
