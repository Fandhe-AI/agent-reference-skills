# CoInitializeEx / COM Apartments (STA / MTA)

Initializes the COM library for the calling thread, sets its concurrency model, and creates an apartment if required. Every thread that uses COM must call this (or `CoInitialize`) before calling most other COM functions.

## Signature / Usage

```cpp
HRESULT CoInitializeEx(
  [in, optional] LPVOID pvReserved,
  [in]           DWORD  dwCoInit
);
```

```cpp
HRESULT hr = CoInitializeEx(nullptr, COINIT_APARTMENTTHREADED);
if (SUCCEEDED(hr))
{
    // ... use COM ...
    CoUninitialize();
}
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| pvReserved | LPVOID | Reserved; must be `NULL` |
| dwCoInit | DWORD | `COINIT` value: `COINIT_APARTMENTTHREADED` (STA) or `COINIT_MULTITHREADED` (MTA); flags cannot combine both |

Return values: `S_OK` (initialized), `S_FALSE` (already initialized on this thread), `RPC_E_CHANGED_MODE` (conflicting concurrency model already set), plus `E_INVALIDARG` / `E_OUTOFMEMORY` / `E_UNEXPECTED`.

## Notes

- **STA (single-threaded apartment)**: objects receive calls only from their apartment's thread; the thread must pump messages (`GetMessage`/`PeekMessage`) for calls to be dispatched. Typical for UI-thread COM objects.
- **MTA (multithread apartment)**: objects can be called from any thread concurrently; the object implementation must provide its own synchronization.
- Each successful `CoInitializeEx` call (including one returning `S_FALSE`) must be balanced by a call to `CoUninitialize`.
- Do not call `CoInitializeEx`/`CoUninitialize` from `DllMain`.

## Related

- [CoCreateInstance / CLSID / IID](./com-create-instance.md)
- [IUnknown](./iunknown.md)
