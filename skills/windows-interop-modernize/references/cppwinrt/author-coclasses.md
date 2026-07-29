# Author COM Components with C++/WinRT

Uses the same `winrt::implements` base struct that authors WinRT runtime classes to author classic COM components (coclasses) and class factories instead — distinct from IDL-based WinRT runtime-class authoring (see Author APIs and IDL).

## Signature / Usage

By default `winrt::implements` silently ignores classic (non-WinRT) COM interfaces — a `QueryInterface` for one fails with `E_NOINTERFACE`. Include `<unknwn.h>` before any C++/WinRT header (or include `wil\cppwinrt.h`) to enable classic COM support:

```cppwinrt
// pch.h
#pragma once
#include <unknwn.h>
#include <winrt/Windows.Foundation.h>
```

Implement a coclass and its class factory by deriving from `winrt::implements`:

```cppwinrt
struct __declspec(uuid("ddc36e02-18ac-47c4-ae17-d420eece2281")) IMyComInterface : ::IUnknown
{
    virtual HRESULT __stdcall Call() = 0;
};

struct MyCoclass : winrt::implements<MyCoclass, IPersist, IStringable, IMyComInterface>
{
    HRESULT __stdcall Call() noexcept override { return S_OK; }
    HRESULT __stdcall GetClassID(CLSID* id) noexcept override { *id = IID_IPersist; return S_OK; }
    winrt::hstring ToString() { return L"MyCoclass as a string"; }
};

auto mycoclass_instance{ winrt::make<MyCoclass>() };
winrt::check_hresult(mycoclass_instance.as<IMyComInterface>()->Call());
```

A class factory implements `IClassFactory`:

```cppwinrt
struct MyCoclassFactory : winrt::implements<MyCoclassFactory, IClassFactory>
{
    HRESULT __stdcall CreateInstance(IUnknown* outer, GUID const& iid, void** result) noexcept final
    {
        *result = nullptr;
        if (outer) { return CLASS_E_NOAGGREGATION; }
        return winrt::make<MyCoclass>()->QueryInterface(iid, result);
    }

    HRESULT __stdcall LockServer(BOOL) noexcept final { return S_OK; }
};
```

## Options / Props

| API / concept | Description |
|------|-------------|
| `winrt::implements<D, I...>` | Same authoring base as for WinRT runtime classes; requires classic-COM support enabled (`unknwn.h` included first) to implement non-WinRT interfaces. |
| `CoRegisterClassObject` | Registers a class factory instance with COM for out-of-process activation (local server). |
| `DllGetClassObject` / `DllCanUnloadNow` | Standard in-process COM server (DLL) exports; implemented by dispatching to your `winrt::implements`-based factories. |
| `LocalServer32` / `InprocServer32` (registry keys) | Distinguish an out-of-process (`.exe`) COM server registration from an in-process (`.dll`) one. |
| `winrt::is_guid_of<T>` specialization | Needed when one COM interface derives from another (interface derivation, absent from WinRT) so `QueryInterface`/`as<Base>()` succeeds against the derived-only implementation. |

## Notes

- A local (non-projected) class implementing *only* classic COM interfaces fails at `winrt::make<T>()` with `'first_interface': is not a member of 'winrt::impl::interface_list<>'` if classic COM support isn't enabled — because every interface was ignored, leaving the class with none.
- COM methods must be `noexcept`; catch all exceptions inside and convert with `winrt::to_hresult()` before returning, since exceptions must never escape an ABI boundary.
- A type deriving from `winrt::implements` and any `IInspectable`-derived interface automatically gets `IWeakReferenceSource`/`IWeakReference` support, letting classic COM coclasses opt into WinRT-style weak references.
- This page addresses classic COM coclass authoring specifically; WinRT runtime-class authoring via IDL is a separate, more common workflow — see Author APIs and IDL.

## Related

- [Author APIs and IDL](./author-apis.md)
- [winrt::com_ptr and IInspectable](./com-ptr-iinspectable.md)
- [Interop between C++/WinRT and the ABI](./interop-abi.md)
