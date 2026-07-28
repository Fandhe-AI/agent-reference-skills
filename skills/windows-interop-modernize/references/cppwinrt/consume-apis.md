# Consume APIs with C++/WinRT

Shows how to consume runtime classes, whether they're part of Windows, implemented by a third-party component, or implemented in your own project.

## Signature / Usage

```cppwinrt
// main.cpp
#include <winrt/Windows.Foundation.h>

using namespace winrt;
using namespace Windows::Foundation;

int main()
{
    winrt::init_apartment();
    Uri contosoUri{ L"http://www.contoso.com" };
    Uri combinedUri = contosoUri.CombineUri(L"products");
}
```

Consuming a runtime class implemented in the same project (used from XAML), via `winrt::make`:

```cppwinrt
m_mainViewModel = winrt::make<Bookstore::implementation::BookstoreViewModel>();
```

Or via uniform construction (C++/WinRT 2.0+, requires an IDL constructor and `-opt[imize]`):

```cppwinrt
Bookstore::BookstoreViewModel m_mainViewModel; // constructed directly
```

## Notes

- A *projected type* has the same fully-qualified name as the WinRT type but lives in the `winrt` namespace; it's a proxy (smart pointer) to a backing object created via `RoActivateInstance`.
- Every projected type has a special `std::nullptr_t` constructor for delayed initialization; **all other constructors (including the default one) construct a backing object**. Beware unintentionally default-constructing objects in vectors/maps (`std::map<int, TextBlock> m; m[2] = value;` creates a throwaway `TextBlock` — use `insert_or_assign` instead).
- Don't confuse the delay-initializing `nullptr` constructor with a factory constructor that takes another delay-initialized object as its only parameter — passing a bare `nullptr` literal always resolves to the delay-initializing constructor.
- The C++/WinRT projection also injects a copy constructor that just copies the underlying smart pointer (aliasing, not cloning); to actually construct one runtime-class instance from another, call the activation factory explicitly via `winrt::get_activation_factory`.
- `IUnknown::as<T>()` (throws `hresult_no_interface` on failure) and `try_as<T>()` (returns null on failure) query for other projected interfaces; both are equivalent to `QueryInterface`.
- Consuming custom (third-party) WinRT types from an unpackaged console app doesn't work — the app needs a package identity, or use a **Windows Runtime Component (C++/WinRT)** / packaged WinUI 3 project template instead.

## Related

- [Author APIs and IDL](./author-apis.md)
- [Projection Headers](./projection-headers.md)
- [Interop with the ABI](./interop-abi.md)
