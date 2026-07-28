# Weak References: get_weak / get_strong

The Windows Runtime is reference-counted. `winrt::implements` (the base of every C++/WinRT implementation type) provides `get_strong()` and `get_weak()` member functions to safely manage the lifetime of `this` across coroutine suspension points and inside event-handling delegates.

## Signature / Usage

Safely accessing `this` in a class-member coroutine:

```cppwinrt
struct MyClass : winrt::implements<MyClass, IInspectable>
{
    winrt::hstring m_value{ L"Hello, World!" };

    IAsyncOperation<winrt::hstring> RetrieveValueAsync()
    {
        auto strong_this{ get_strong() }; // Keep *this* alive across suspension.
        co_await 5s;
        co_return m_value;
    }
};
```

Weak-reference variant (doesn't keep the object alive, but lets you check):

```cppwinrt
IAsyncOperation<winrt::hstring> RetrieveValueAsync()
{
    auto weak_this{ get_weak() };
    co_await 5s;
    if (auto strong_this{ weak_this.get() })
    {
        co_return m_value;
    }
    co_return L"";
}
```

Capturing a weak reference in an event-handling lambda:

```cppwinrt
event_source.Event([weak_this{ get_weak() }](auto&& ...)
{
    if (auto strong_this{ weak_this.get() })
    {
        std::wcout << strong_this->m_value.c_str() << std::endl;
    }
});
```

Standalone weak-reference helpers (for types not derived from `winrt::implements`):

```cppwinrt
Class c;
winrt::weak_ref<Class> weak{ c };
// or
auto weak = winrt::make_weak(c);

if (Class strong = weak.get())
{
    strong.DoWork();
}
```

## Options / Props

| Member / helper | Description |
|------|-------------|
| `implements::get_strong()` | Returns a strong reference to `this`, incrementing the ref count; only callable from a type deriving from `winrt::implements`. |
| `implements::get_weak()` | Returns a weak reference to `this`; only callable from a type deriving from `winrt::implements`. |
| `winrt::weak_ref<T>` | Standalone weak-reference struct template; construct from any WinRT object `T`. |
| `winrt::make_weak(obj)` | Helper function returning a `weak_ref` for `obj`. |
| `weak_ref<T>::get()` | Attempts to promote to a strong reference; returns a null/falsy `T` if the object no longer exists. |
| `winrt::no_weak_ref` | Marker struct passed as a template argument to `implements<...>` (or `MyRuntimeClassT<...>`) to opt out of weak-reference support. |

## Notes

- Weak-reference support is on by default for nearly all WinRT types you consume or author in C++/WinRT; exceptions include `Windows.UI.Composition` and `Windows.Devices.Input.PenDevice`.
- The core hazard: in a coroutine, execution is synchronous only up to the first suspension point (`co_await`); after that, anything might have happened to an implicit `this` accessed via a raw pointer. Same hazard applies to event-handling delegates/lambdas that capture `this` by reference when the event source may outlive the recipient.
- If the recipient is guaranteed to outlive the event source (e.g. the page owns the button raising the event), capturing raw `this` is fine — no strong/weak reference needed.
- For plain C++ classes that aren't WinRT types (no `get_strong`/`get_weak` available), use `std::shared_ptr`/`std::weak_ptr` instead, combined with `winrt::auto_revoke`.
- Outside of XAML, you usually shouldn't need weak references at all — prefer API designs that avoid cyclic references in the first place.

## Related

- [Concurrency and Coroutines](./async-coroutines.md)
- [Events and Delegates](./events-delegates.md)
- [Author APIs and IDL](./author-apis.md)
