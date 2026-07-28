# IUnknown (QueryInterface / AddRef / Release)

The root COM interface. Enables clients to discover other interfaces on an object (`QueryInterface`) and manage the object's lifetime via reference counting (`AddRef`/`Release`). All COM interfaces inherit from `IUnknown`, so these three methods are always the first entries in an interface's vtable.

## Signature / Usage

```cpp
interface IUnknown
{
    virtual HRESULT QueryInterface(REFIID riid, void** ppvObject) = 0;
    virtual ULONG AddRef() = 0;
    virtual ULONG Release() = 0;
};
```

```cpp
IUnknown* pUnk = /* ... */;
IFoo* pFoo = nullptr;
if (SUCCEEDED(pUnk->QueryInterface(IID_PPV_ARGS(&pFoo))))
{
    // use pFoo ...
    pFoo->Release();
}
```

## Options / Props

| Method | Description |
|--------|-------------|
| QueryInterface(REFIID, void**) | Retrieves a pointer to a supported interface; returns `E_NOINTERFACE` if unsupported |
| AddRef() | Increments the reference count; call whenever an interface pointer is copied |
| Release() | Decrements the reference count; releases the object when it reaches zero |

## Notes

- Every successful `QueryInterface`/`CoCreateInstance` call returns a reference that must eventually be balanced by a `Release`.
- Prefer a smart pointer (`Microsoft::WRL::ComPtr`, `winrt::com_ptr`) over manual `AddRef`/`Release` bookkeeping.

## Related

- [CoCreateInstance / CLSID / IID](./com-create-instance.md)
- [ComPtr / winrt::com_ptr](./com-smart-pointers.md)
