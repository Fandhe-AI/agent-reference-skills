# Interop Between C++/WinRT and C++/CX

Helper functions (`from_cx`/`to_cx`) for converting objects, `hstring`/`Platform::String^`, and GUIDs between C++/CX and C++/WinRT within the same project, for teams that must port gradually rather than in one pass. Complements move-to-winrt-from-cx.md, which covers the full migration rather than temporary coexistence.

## Signature / Usage

```cppwinrt
// interop_helpers.h
template <typename T>
T from_cx(Platform::Object^ from)
{
    T to{ nullptr };
    if (from != nullptr)
    {
        winrt::check_hresult(reinterpret_cast<::IUnknown*>(from)
            ->QueryInterface(winrt::guid_of<T>(), winrt::put_abi(to)));
    }
    return to;
}

template <typename T>
T^ to_cx(winrt::Windows::Foundation::IUnknown const& from)
{
    return safe_cast<T^>(reinterpret_cast<Platform::Object^>(winrt::get_abi(from)));
}

inline winrt::hstring from_cx(Platform::String^ const& from)
{
    return reinterpret_cast<winrt::hstring&>(const_cast<Platform::String^&>(from));
}

inline Platform::String^ to_cx(winrt::hstring const& from)
{
    return reinterpret_cast<Platform::String^&>(const_cast<winrt::hstring&>(from));
}
```

Usage at a boundary point between ported and not-yet-ported code:

```cppwinrt
winrt::Uri uri(L"http://aka.ms/cppwinrt");
cx::Uri^ cx = to_cx<cx::Uri>(uri);          // C++/WinRT -> C++/CX
winrt::Uri uri_from_cx = from_cx<winrt::Uri>(cx); // C++/CX -> C++/WinRT
```

## Options / Props

| Function | Direction | Mechanism |
|------|-------------|------|
| `from_cx<T>(Platform::Object^)` | C++/CX → C++/WinRT | `QueryInterface`s the CX object's `IUnknown` for `T`'s GUID via `winrt::guid_of<T>()`/`winrt::put_abi`. |
| `to_cx<T>(IUnknown const&)` | C++/WinRT → C++/CX | `winrt::get_abi` retrieves the raw `IUnknown*`, then C++/CX `safe_cast` queries for `T^`. |
| `from_cx(Platform::String^)` / `to_cx(hstring)` | Both | Reinterpret-cast only — `Platform::String^` and `winrt::hstring` share ABI layout (`HSTRING`). |
| `from_cx(Platform::Guid)` / `to_cx(winrt::guid)` | Both | Reinterpret-cast only — identical layout. |

## Notes

- Requires the C++/WinRT NuGet package installed in the project, and (for coexistence rather than a one-pass port) C++/CX support explicitly turned back on: **C/C++ > General > Consume Windows Runtime Extension > Yes (/ZW)**.
- For a XAML project, all page types must be entirely C++/CX *or* entirely C++/WinRT at any given time even while this interop technique is in use elsewhere in the project (models/view-models can mix freely).
- Namespace aliasing (`namespace cx { using namespace Windows::Foundation; }` alongside `namespace winrt { using namespace Windows::Foundation; }`) avoids ambiguity between the two projections' identically-named types in the same translation unit.
- For coroutine/PPL-task interop specifically (calling coroutines from C++/CX task chains), the official docs point to a separate, more advanced async-interop topic beyond what's covered here.

## Related

- [Move to C++/WinRT from C++/CX](./move-to-winrt-from-cx.md)
- [Interop with the ABI](./interop-abi.md)
