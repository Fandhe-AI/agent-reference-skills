# Standard C++ Data Types and C++/WinRT

C++/WinRT accepts Standard C++ types — `std::initializer_list`, `std::vector`, `std::array`, raw arrays, and pointer ranges — as arguments to WinRT APIs that expect a collection or array parameter, converting through `winrt::array_view` without introducing copies. Complements Passing Parameters into the ABI Boundary.

## Signature / Usage

```cppwinrt
#include <winrt/Windows.Storage.Streams.h>
using namespace winrt::Windows::Storage::Streams;

InMemoryRandomAccessStream stream;
DataWriter dataWriter{ stream };

dataWriter.WriteBytes({ 99, 98, 97 });                 // initializer_list -> winrt::array_view
std::vector<byte> theVector{ 99, 98, 97 };
dataWriter.WriteBytes(theVector);                      // std::vector -> winrt::array_view
std::array<byte, 3> theArray{ 99, 98, 97 };
dataWriter.WriteBytes(theArray);                        // std::array -> winrt::array_view
```

Passing a `std::vector` to an async API that expects a collection requires moving it in (the callee must own the data for the lifetime of the operation):

```cppwinrt
IAsyncAction retrieve_properties_async(StorageFile const storageFile, std::vector<winrt::hstring> vecH)
{
    auto properties{ co_await storageFile.Properties().RetrievePropertiesAsync(std::move(vecH)) };
}
```

## Options / Props

| Standard type | Converts to | Notes |
|------|-------------|------|
| `std::initializer_list<T>` | `winrt::array_view<T const>` (via constructor) | Also accepted directly where a WinRT collection parameter is expected — the callee constructs a `std::vector` from it. |
| `std::vector<T>` / `std::array<T,N>` | `winrt::array_view<T>` | Conversion constructors on `array_view`; `std::vector<T>` is also bound directly as a WinRT collection parameter. |
| Raw array / `{begin, end}` pointer range | `winrt::array_view<T>` | Conversion constructors from a C array and from a `T*` pair. |
| `IVector<T>` | Standard iteration | Supports range-based `for` directly — no conversion needed to iterate a WinRT vector with standard C++ constructs. |

## Notes

- `std::vector<T>` converts to the matching WinRT collection of `T`, but the C++ language won't then coerce the collection's type parameter — `std::vector<std::wstring>` does **not** satisfy a parameter expecting a collection of `winrt::hstring`; pass `std::vector<winrt::hstring>` instead.
- For async calls taking ownership of a `std::vector`, pass an rvalue (`std::move(vec)`) and don't touch the source vector afterward.
- `winrt::array_view` lives in the C++/WinRT base library (`winrt/base.h`) and is a range, so it works with range-based `for` and `std::for_each`.

## Related

- [Passing Parameters into the ABI Boundary](./pass-parms-to-abi.md)
- [Collections with C++/WinRT](./collections.md)
- [Concurrency and Coroutines](./async-coroutines.md)
