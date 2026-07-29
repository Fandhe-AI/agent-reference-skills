# Collections with C++/WinRT

Functions and base classes that let you pass `std::vector`/`std::map` data as Windows Runtime collections (`IVector`, `IMap`, `IIterable`, `IVectorView`, `IMapView`), or implement your own custom collection types, without hand-rolling the full WinRT collection interface surface.

## Signature / Usage

Create an empty general-purpose collection with `winrt::single_threaded_vector`, then treat it like any WinRT collection:

```cppwinrt
#include <winrt/Windows.Foundation.Collections.h>

winrt::init_apartment();

Windows::Foundation::Collections::IVector<int> coll{ winrt::single_threaded_vector<int>() };
coll.Append(1);
coll.Append(2);

for (auto const& el : coll)
{
    std::cout << el << std::endl;
}

Windows::Foundation::Collections::IVectorView<int> view{ coll.GetView() };
```

Prime a collection from existing data without copying (pass an rvalue):

```cppwinrt
auto coll1{ winrt::single_threaded_vector<int>({ 1, 2, 3 }) };

std::vector<int> values{ 1, 2, 3 };
auto coll2{ winrt::single_threaded_vector<int>(std::move(values)) };
```

Associative collections work the same way:

```cppwinrt
auto map{ winrt::single_threaded_map<winrt::hstring, int>(
    std::map<winrt::hstring, int>{ { L"AliceBlue", 0xfff0f8ff } }) };
```

## Options / Props

| Helper | Returns | Description |
|------|-------------|------|
| `winrt::single_threaded_vector<T>()` | `IVector<T>` | Non-observable random-access collection; optionally primed from an rvalue `std::vector<T>` or initializer list. |
| `winrt::single_threaded_observable_vector<T>()` | `IObservableVector<T>` | Observable vector; use element type `IInspectable` to bind to a XAML items control (via `ItemsControl.ItemsSource`). |
| `winrt::single_threaded_map<K, V>()` | `IMap<K, V>` | Non-observable associative collection; optionally primed from an rvalue `std::map`/`std::unordered_map`. |
| `winrt::single_threaded_observable_map<K, V>()` | `IObservableMap<K, V>` | Observable associative collection. |
| `winrt::vector_base<D, T>` / `winrt::vector_view_base<D, T>` | base struct | Derive from these (alongside `implements<D, IVector<T>, ...>`) and implement `get_container()` to author a custom vector/vector-view without hand-implementing `IIterable`/`IIterator`. |
| `winrt::map_base<D, K, V>` / `winrt::map_view_base<D, K, V>` | base struct | Same pattern as above, for `IMap`/`IMapView`. |
| `winrt::observable_vector_base<D, T>` / `winrt::observable_map_base<D, K, V>` | base struct | Adds `IObservableVector`/`IObservableMap` support on top of the corresponding `*_base` struct. |

## Notes

- "Single-threaded" in the helper names means *not thread-safe* (no internal synchronization) — it's unrelated to apartments. The returned objects are all agile (see Agile objects).
- `IVector`/`IVectorView` can be passed anywhere an `IIterable` is expected.
- To bind a custom vector/map to `ItemsControl.ItemsSource`, the element type must be `IVector<IInspectable>` (or an interop type like `IBindableObservableVector`).
- Implementing `IVector`/`IMap` yourself from scratch also requires implementing `IIterable` and `IIterator`; the `*_base` struct templates avoid that by requiring only a `get_container()` accessor whose return type provides `begin()`/`end()`.

## Related

- [XAML x:Bind](./xaml-binding.md)
- [Agile Objects](./agile-objects.md)
- [Boxing and Unboxing](./boxing.md)
- [Standard C++ Data Types](./std-cpp-data-types.md)
