# Interop between C++/WinRT and the ABI

Techniques for converting between application binary interface (ABI) types (declared with `HRESULT`-returning COM-style methods, in the `ABI::` namespace) and C++/WinRT projected types.

## Signature / Usage

```cppwinrt
// pch.h
#include <windows.foundation.h>
#include <unknwn.h>
#include "winrt/Windows.Foundation.h"

namespace winrt { using namespace Windows::Foundation; }
namespace abi { using namespace ABI::Windows::Foundation; }

int main()
{
    winrt::init_apartment();
    winrt::Uri uri(L"http://aka.ms/cppwinrt");

    // Convert to an ABI type (calls QueryInterface).
    winrt::com_ptr<abi::IStringable> ptr{ uri.as<abi::IStringable>() };

    // Convert from an ABI type.
    uri = ptr.as<winrt::Uri>();
}
```

Getting the raw ABI pointer for a C++/WinRT object without a `QueryInterface` call (only `AddRef`):

```cppwinrt
winrt::com_ptr<abi::IStringable> ptr;
winrt::copy_to_abi(uriAsIStringable, *ptr.put_void());
```

Lowest-level, address-only conversions:

```cppwinrt
abi::IStringable* non_owning{
    reinterpret_cast<abi::IStringable*>(winrt::get_abi(uriAsIStringable)) };
```

## Options / Props

| Function | Description |
|------|-------------|
| `winrt::Windows::Foundation::IUnknown::as<T>()` / `try_as<T>()` | Highest-level conversion; calls `QueryInterface`. |
| `winrt::com_ptr<T>` | Smart pointer wrapping an ABI or implementation interface pointer. |
| `winrt::copy_to_abi` / `copy_from_abi` | Lower-level conversions calling only `AddRef`, using `void*`. |
| `winrt::get_abi` / `detach_abi` / `attach_abi` | Lowest-level; copy addresses only, no ref-count changes (except `detach_abi`, which transfers ownership out). |
| `winrt::get_unknown(obj)` | Returns the raw ABI `::IUnknown*` for a projected C++/WinRT object — the common entry point for handing a WinRT object to ABI-level or classic-COM code. |
| `winrt::guid` | Projection of the ABI `GUID` struct; auto-converts to/from `GUID` if `<unknwn.h>` is included before any C++/WinRT header. |

## Notes

- ABI namespace headers (produced by MIDL) live under `%WindowsSdkDir%Include\<Version>\winrt`; they declare types in the `ABI::` namespace, e.g. `ABI::Windows::Foundation::IUriRuntimeClass : public IInspectable`, with `HRESULT`-returning methods.
- When interoperating with ABI types, the ABI type used **must** correspond to the C++/WinRT object's default interface, or calls land on the wrong vtable slot — `copy_to_abi`/`copy_from_abi` don't protect against this because they use `void*` throughout.
- `winrt::hstring` ↔ `HSTRING` conversions use the same `get_abi`/`detach_abi`/`put_abi`/`attach_abi`/`copy_from_abi`/`copy_to_abi` family as object types.
- To hand a C++/WinRT object to a plain `IUnknown*`-consuming API (classic COM, or native interop interfaces like `ISwapChainPanelNative`), use `winrt::get_unknown` or `.as<T>()` where `T` is the target native/ABI interface — see `native-interop.md` for `ISwapChainPanelNative` and `IWindowNative` specifically.

## Related

- [Native Interop: ISwapChainPanelNative / IWindowNative](./native-interop.md)
- [Error Handling](./error-handling.md)
- [Consume APIs](./consume-apis.md)
