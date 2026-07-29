# Consume COM Components with C++/WinRT

Shows how to use `winrt::com_ptr` and other C++/WinRT facilities to consume classic (non-WinRT) COM components and interfaces — such as the DirectX/Direct2D APIs — mixing COM and Windows Runtime programming in the same project.

## Signature / Usage

```cppwinrt
#include <d2d1_1.h>
// Uninitialized smart pointer to a classic COM interface.
winrt::com_ptr<ID2D1Factory1> factory;

// A function returning an interface pointer as void** (e.g. D2D1CreateFactory).
winrt::check_hresult(D2D1CreateFactory(
    D2D1_FACTORY_TYPE_SINGLE_THREADED,
    __uuidof(factory),
    options,
    factory.put_void()));

// A function returning a specific interface pointer (e.g. D3D11CreateDevice).
winrt::com_ptr<ID3D11Device> device;
D3D11CreateDevice(/* ... */, device.put(), /* ... */);

// Query for a different interface.
winrt::com_ptr<IDXGIDevice> const dxdevice{ device.as<IDXGIDevice>() };
```

## Options / Props

| Member / function | Description |
|------|-------------|
| `com_ptr<T>::put_void()` | Returns `void**` for COM functions that return an interface pointer as `void**` (e.g. `D2D1CreateFactory`). |
| `com_ptr<T>::put()` | Returns `T**` for COM functions that return a specific interface pointer type (e.g. `D3D11CreateDevice`); cast with `reinterpret_cast<IUnknown**>(p.put())` for functions returning `IUnknown**`. |
| `com_ptr<T>::get()` | Returns the raw `T*`, for passing to functions that take a specific interface pointer or (via `winrt::get_unknown`) an `IUnknown*`. |
| `com_ptr<T>::as<U>()` | Queries for interface `U`; throws if the query fails. |
| `com_ptr<T>::try_as<U>()` | Queries for interface `U`; returns comparable-to-`nullptr` value instead of throwing on failure. |
| `com_ptr<T>::capture(source, &Interface::Method, args...)` | Calls a COM method that returns an interface pointer via an out-parameter, capturing the result directly into the `com_ptr` (e.g. `factory.capture(adapter, &IDXGIAdapter::GetParent)`). |
| `winrt::check_hresult(hr)` | Throws an exception if the `HRESULT` represents an error code. |
| `winrt::get_unknown(obj)` | Returns a pointer to the underlying raw `IUnknown` of a projected-type object, for passing to APIs that take `IUnknown*`. |

## Notes

- Re-seating an already-seated `com_ptr` (one whose internal raw pointer already targets an object) requires assigning `nullptr` to it first — calling `put()`/`put_void()` on an already-seated `com_ptr` asserts that the internal pointer is null.
- A function taking a `winrt::com_ptr` parameter should take it by const reference (or reference); a function returning a `winrt::com_ptr` should return it by value.
- For classic COM value types such as `BSTR` and `VARIANT`, use the [Windows Implementation Library (WIL)](https://github.com/Microsoft/wil) wrappers (`wil::unique_bstr`, `wil::unique_variant`) rather than raw COM types or hand-written wrappers; WIL supersedes ATL and the Visual C++ COM Support for this purpose.
- Liberal `using namespace` directives can create ambiguous-symbol errors between C++/WinRT and classic COM types with the same unqualified name (e.g. `winrt::Windows::Foundation::IUnknown` vs. `::IUnknown`); isolate C++/WinRT namespaces inside `namespace winrt { using namespace ...; }` (or qualify the global COM name with `::`) to resolve the collision.
- You can mix COM and Windows Runtime programming freely within the same C++/WinRT project; this page's full Direct2D example (`ID2D1Factory1`, `ID3D11Device`, `IDXGISwapChain1`) demonstrates that mix end-to-end.
- Distinct from authoring your own COM coclasses (see Author COM Components) and from `com_ptr` usage scoped to your own implementation types via `make_self`/`get_self` (see `winrt::com_ptr` and `IInspectable`) — this page is specifically about consuming third-party classic COM APIs.

## Related

- [winrt::com_ptr and IInspectable](./com-ptr-iinspectable.md)
- [Author COM Components with C++/WinRT](./author-coclasses.md)
- [Error Handling](./error-handling.md)
- [Interop between C++/WinRT and the ABI](./interop-abi.md)
- [Consume APIs with C++/WinRT](./consume-apis.md)
