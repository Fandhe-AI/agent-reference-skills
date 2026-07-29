# Agile Objects with C++/WinRT

An *agile* object can be accessed from any thread/apartment without marshaling. C++/WinRT types implementing `winrt::implements` are agile by default (COM `ThreadingModel = Both`); you can opt out, or wrap a non-agile object in an agile reference to pass it across apartments.

## Signature / Usage

```cppwinrt
struct MyType : winrt::implements<MyType, IStringable>
{
    winrt::hstring ToString() { return L"..."; }
};

// Because it's not opted out, MyType is agile: winrt::implements already
// implements IAgileObject and IMarshal (via CoCreateFreeThreadedMarshaler) for it.

winrt::com_ptr<MyType> myimpl{ winrt::make_self<MyType>() };
if (myimpl.try_as<IAgileObject>()) { /* myimpl is agile. */ }
```

Wrapping a non-agile object so it can cross an apartment boundary:

```cppwinrt
NonAgileType nonagile_obj;
auto agile{ winrt::make_agile(nonagile_obj) };

co_await resume_background();
NonAgileType nonagile_obj_again{ agile.get() }; // Safe to use on this thread.
```

## Options / Props

| API | Description |
|------|-------------|
| `winrt::implements<D, I...>` | Implements `IAgileObject` and `IMarshal` by default, making derived types agile. |
| `winrt::non_agile` (marker struct) | Add as a template argument (order doesn't matter) to `implements<...>` or `MyRuntimeClassT<...>` to opt a type out of default agility. |
| `winrt::agile_ref<T>` | Struct template holding an agile reference to an instance (or interface) of a non-agile type `T`; construct directly or via `winrt::make_agile`. |
| `winrt::make_agile(obj)` | Helper function returning a `winrt::agile_ref` for `obj`. |
| `agile_ref::get()` | Returns a proxy usable safely within the calling thread's context. |
| `IAgileObject` | Marker interface with no methods — success/failure of `.as<IAgileObject>()`/`.try_as<IAgileObject>()` is the only signal it provides. |

## Notes

- Agility is the simplest and most performant default; only opt out (`winrt::non_agile`) when your type has genuine single-apartment reentrancy requirements.
- An activation factory must always be agile, even when its corresponding runtime class is not.
- `single_threaded_vector`/`single_threaded_map` and friends (see Collections with C++/WinRT) return objects that are agile despite the "single-threaded" name — that name refers to lack of internal synchronization, not apartment affinity.
- Opting out with `winrt::non_agile` doesn't stop you from implementing `IMarshal` yourself (for example, to support marshal-by-value semantics).

## Related

- [Collections with C++/WinRT](./collections.md)
- [winrt::init_apartment / winrt::uninit_apartment](./init-apartment.md)
- [Concurrency and Coroutines](./async-coroutines.md)
