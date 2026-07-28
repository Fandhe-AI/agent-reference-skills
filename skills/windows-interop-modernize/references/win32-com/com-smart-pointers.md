# ComPtr / winrt::com_ptr

RAII smart pointers that wrap COM `IUnknown`-derived interface pointers and automate `AddRef`/`Release` calls, avoiding manual reference-count bookkeeping. `Microsoft::WRL::ComPtr` is part of the Windows Runtime C++ Template Library (WRL, `<wrl/client.h>`); `winrt::com_ptr` is the equivalent in C++/WinRT (`<winrt/base.h>`).

## Signature / Usage

```cpp
#include <wrl/client.h>
using Microsoft::WRL::ComPtr;

ComPtr<IWICImagingFactory> factory;
HRESULT hr = CoCreateInstance(
    CLSID_WICImagingFactory, nullptr, CLSCTX_INPROC_SERVER,
    IID_PPV_ARGS(&factory));
// factory.Get() / factory-> ; released automatically when it goes out of scope
```

```cpp
#include <winrt/base.h>

winrt::com_ptr<IWICImagingFactory> factory;
winrt::check_hresult(CoCreateInstance(
    CLSID_WICImagingFactory, nullptr, CLSCTX_INPROC_SERVER,
    IID_PPV_ARGS(factory.put())));
```

## Options / Props

| Type | Header | Key members |
|------|--------|-------------|
| `Microsoft::WRL::ComPtr<T>` | `wrl/client.h` | `Get()`, `GetAddressOf()`, `ReleaseAndGetAddressOf()`, `As()`, `Reset()` |
| `winrt::com_ptr<T>` | `winrt/base.h` | `get()`, `put()`, `try_as<U>()`, `as<U>()`, `copy_from()` |

## Notes

- `ComPtr::As<U>()` and `winrt::com_ptr::as<U>()` both wrap `QueryInterface` and throw/return `HRESULT` depending on the overload used.
- These are C++-only smart pointers, distinct from the `windows-rs` `ComInterface` bindings used in Rust; do not mix vocabulary across languages.

## Related

- [IUnknown](./iunknown.md)
- [CoCreateInstance / CLSID / IID](./com-create-instance.md)
- [windows-rs](./windows-rs.md)
