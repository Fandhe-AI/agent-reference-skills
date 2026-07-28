# CoCreateInstance / CLSID / IID

Creates and default-initializes a single COM object of the class associated with a given `CLSID`, returning a pointer to the requested interface (`IID`).

## Signature / Usage

```cpp
HRESULT CoCreateInstance(
  [in]  REFCLSID  rclsid,
  [in]  LPUNKNOWN pUnkOuter,
  [in]  DWORD     dwClsContext,
  [in]  REFIID    riid,
  [out] LPVOID    *ppv
);
```

```cpp
IWICImagingFactory* pFactory = nullptr;
HRESULT hr = CoCreateInstance(
    CLSID_WICImagingFactory,
    nullptr,
    CLSCTX_INPROC_SERVER,
    IID_PPV_ARGS(&pFactory));
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| rclsid | REFCLSID | CLSID identifying the class to instantiate |
| pUnkOuter | LPUNKNOWN | Controlling `IUnknown` for aggregation, or `NULL` |
| dwClsContext | DWORD | `CLSCTX` value(s), e.g. `CLSCTX_INPROC_SERVER`, `CLSCTX_LOCAL_SERVER`, `CLSCTX_ALL` |
| riid | REFIID | IID of the interface requested |
| ppv | LPVOID* | Receives the interface pointer on success |

Return values: `S_OK`, `REGDB_E_CLASSNOTREG`, `CLASS_E_NOAGGREGATION`, `E_NOINTERFACE`, `E_POINTER`.

## Notes

- Equivalent to `CoGetClassObject` + `IClassFactory::CreateInstance` + releasing the class factory; use `CoGetClassObject` directly when creating many instances of the same class.
- For remote-machine instantiation use `CoCreateInstanceEx`.
- UWP apps can pass any CLSID but many out-of-process objects fail with `E_ACCESSDENIED`.
- Requires `CoInitializeEx` to have been called on the current thread first.

## Related

- [CoInitializeEx / COM Apartments](./com-initialization.md)
- [IUnknown](./iunknown.md)
- [ComPtr / winrt::com_ptr](./com-smart-pointers.md)
