# Move to C++/WinRT from C++/CX

A catalog of the technical differences between C++/CX (`ref class`, hat `^` references, `ref new`) and C++/WinRT (standard C++17, value-typed projected objects), for porting existing C++/CX code.

## Signature / Usage

```cppcx
// C++/CX
using namespace Windows::Storage::Streams;
ref class Sample
{
    Buffer^ m_gamerPicBuffer = ref new Buffer(MAX_IMAGE_SIZE);
};
```

```cppwinrt
// C++/WinRT equivalent
using namespace winrt::Windows::Storage::Streams;
struct Sample
{
    Buffer m_gamerPicBuffer{ MAX_IMAGE_SIZE };
};
```

## Options / Props

| C++/CX | C++/WinRT | Notes |
|------|-------------|------|
| `Type^ t = ref new Type(...)` | `Type t{ ... }` | Projected objects are values (proxies), never allocated with `ref new`/`new`. |
| `t->Member` | `t.Member()` | Properties become get/set function calls, not field-like access. |
| `Platform::String^` | `winrt::hstring` | See `strings.md`. |
| `Platform::Object^` | `winrt::Windows::Foundation::IInspectable` | |
| `Platform::Exception^` | `winrt::hresult_error` (and derived types) | See `error-handling.md`. |
| `Platform::Agile<T>^` | `winrt::agile_ref<T>` | Thread-agile wrapper. |
| `Platform::Array^` | `std::vector`/`std::array`/initializer list | Any contiguous container works. |
| `myButton->Click += ref new RoutedEventHandler(...)` | `myButton().Click(...)` | See `events-delegates.md`. |
| `myButton->Click -= token` | `myButton().Click(token)` | Revoke by passing the token back to the same-named function. |
| PPL `concurrency::task` with hat refs | Coroutines (`co_await`) | No natural 1:1 mapping; requires redesign, not mechanical translation. |
| `dynamic_cast<T^>(obj)` | `obj.try_as<T>()` | `as<T>()` throws instead of returning null. |
| `o = 1;` (auto-boxes) | `o = winrt::box_value(1);` | Boxing is explicit in C++/WinRT. |

## Notes

- C++/WinRT requires an explicit `#include` of the projection header for **every** namespace consumed — C++/CX auto-generates from `.winmd` and doesn't require this, so this is a common source of build/link errors when porting.
- Runtime class headers: C++/CX allows multiple `ref class` per header; C++/WinRT requires one header per runtime class, matching the class name; and adds a Midl file (`.idl`) that C++/CX doesn't require (C++/CX autogenerates it internally).
- The default constructor difference matters for collections: `TextBox textBox;` **creates** a `TextBox` in C++/WinRT (unlike the always-null C++/CX hat reference `TextBox^ textBox;`) — use `TextBox textBox{ nullptr };` for an empty/delayed-init reference, and `insert_or_assign`/`resize(n, nullptr)` instead of `[]`/fixed-size construction for maps/vectors of empty references.
- For a XAML project, all XAML **page types** must be either entirely C++/CX or entirely C++/WinRT at any given time (mixing is fine elsewhere in the project, e.g. models/view models); a Windows Runtime Component project must be all-C++/CX or all-C++/WinRT.
- Porting async/PPL-task code to coroutines is called out as the one genuinely hard part of migration — everything else tends to be largely mechanical once that hurdle is crossed.

## Related

- [Overview](./overview.md)
- [String Handling](./strings.md)
- [Error Handling](./error-handling.md)
- [Events and Delegates](./events-delegates.md)
