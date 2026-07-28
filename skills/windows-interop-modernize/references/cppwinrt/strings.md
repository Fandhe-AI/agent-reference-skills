# String Handling: winrt::hstring, to_hstring, c_str

C++/WinRT lets you call Windows Runtime APIs using standard C++ wide string types (`std::wstring`, wide string literals, `std::wstring_view`), or the custom `winrt::hstring` type that WinRT constructors/functions/properties actually take and return.

## Signature / Usage

```cppwinrt
#include <winrt/Windows.Foundation.h>

using namespace winrt;
using namespace Windows::Foundation;

// Construct from a literal, a string view, or a std::wstring — all valid.
Uri contosoUri{ L"http://www.contoso.com" };
std::wstring wideString{ L"http://www.adventure-works.com" };
Uri awUri{ wideString };

// hstring converts to std::wstring_view / std::wstring at no cost.
std::wstring domainWstring{ contosoUri.Domain() };

// hstring::c_str, like std::wstring::c_str.
std::wcout << contosoUri.ToString().c_str() << std::endl;

// UTF-8 <-> UTF-16 conversion helpers.
winrt::hstring w{ L"Hello, World!" };
std::string c = winrt::to_string(w);
w = winrt::to_hstring(c);
```

## Options / Props

| Function | Description |
|------|-------------|
| `winrt::hstring` | Immutable string type backed by the WinRT `HSTRING` ABI type; provides conversion constructors/operators to and from `std::wstring`/`std::wstring_view`. |
| `hstring::c_str()` | Returns a null-terminated `const wchar_t*`, mirroring `std::wstring::c_str()`. |
| `winrt::to_hstring(T)` | Converts a `std::string` (UTF-8) or other supported type to `winrt::hstring`. |
| `winrt::to_string(hstring)` | Converts a `winrt::hstring` to `std::string` (UTF-8). |

## Notes

- `winrt::hstring` is defined in the C++/WinRT base library (`winrt/base.h`) and is used because the WinRT ABI is not a subset of what `std::wstring`/`std::wstring_view` provide; using those directly would be inefficient.
- C++/WinRT does **not** support narrow `std::string` for calling WinRT APIs directly — only wide string types and `hstring`.
- Don't use `winrt::param::hstring` directly; it exists only to optimize input-parameter binding. Use `std::wstring_view` in your own function signatures if you want a similar optimization.
- Setting a property: call the setter function, e.g. `myTextBlock.Text(L"Hello!")`. Writing `myTextBlock.Text() = L"Hello!"` compiles but is wrong — it modifies a temporary and throws the result away.
- An `hstring` is a range (supports range-based `for`, comparison operators, and use as an associative-container key).

## Related

- [Overview](./overview.md)
- [Error Handling](./error-handling.md)
- [Interop with the ABI](./interop-abi.md)
