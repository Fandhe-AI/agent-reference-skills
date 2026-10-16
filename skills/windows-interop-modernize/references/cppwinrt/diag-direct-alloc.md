# Diagnosing Direct Allocations (winrt::make)

C++/WinRT 2.0 turns direct allocation of an implementation type (on the stack, with `new`, `std::make_shared`, `std::make_unique`) into a compile error, steering you to `winrt::make` / `winrt::make_self`.

## Signature / Usage

```cppwinrt
struct MyStringable : implements<MyStringable, IStringable>
{
    winrt::hstring ToString() const { return L"MyStringable"; }
};

// Correct: allocate with winrt::make (or winrt::make_self).
IStringable stringable{ winrt::make<MyStringable>() };
```

Mistakes that compiled with C++/WinRT 1.0 but are compile errors in 2.0:

```cppwinrt
IStringable MakeStringable()
{
    return MyStringable(); // Incorrect.
}

IStringable stringable{ MyStringable() }; // Also incorrect.
MyStringable* stringable{ new MyStringable() }; // Very inadvisable.
auto stringable{ std::make_shared<MyStringable>(); } // Also very inadvisable.
auto stringable{ std::make_unique<MyStringable>() }; // Highly dubious.
```

Passing `*this` (not `this`) to a function expecting the projected type uses the implicit conversion:

```cppwinrt
void Call()
{
    Print(*this);
}
```

## Notes

- The compiler error refers to an abstract function named `use_make_function_to_create_this_object`. It is not exactly a `static_assert`, but it is described as the most reliable way to detect all the mistakes.
- The virtual function is present in debug builds only, so detection doesn't affect vtable size in optimized builds.
- `winrt::make` derives from your implementation with a `final` class that provides the override; therefore your implementation can't be `final`, and can't have a private destructor. Marking individual virtual functions `final` is still allowed.
- An implementation type is not the projected type (`MyStringable` is not an `IStringable`); the implementation provides implicit conversions to the projected types it implements.
- A `std::shared_ptr` creates a second reference count for the same object, which is incompatible with the intrinsic COM reference count.
- Source: https://learn.microsoft.com/en-us/windows/apps/develop/cpp-winrt/diag-direct-alloc (en-us, fetched 2026-10-16)

## Related

- [C++/WinRT Configuration Macros](./macros.md)
- [Author APIs](./author-apis.md)
- [Consume APIs](./consume-apis.md)
- [Extension Points for Implementation Types](./extension-points.md)
