# Passing Parameters into the ABI Boundary

C++/WinRT projected functions accept a wider range of parameter types than the raw ABI signature (`IIterable<T>`, `IVector<T>`, `IVectorView<T>`, `IMap<K,V>`, `IMapView<K,V>`) requires, via `winrt::param::*` conversion classes and `winrt::array_view`, avoiding manual collection construction at call sites.

## Signature / Usage

```cppwinrt
// IVector of a derived type doesn't convert directly — use the double-iterator form.
winrt::Windows::Foundation::Collections::IVector<winrt::Windows::Storage::StorageFile>
    storageFiles{ /* ... */ };

dataPackage.SetStorageItems(storageFiles);                                  // doesn't compile
dataPackage.SetStorageItems({ storageFiles.begin(), storageFiles.end() });  // works

// std::vector<T>&& and initializer lists are also accepted for IIterable<T> parameters.
storage.RetrievePropertiesAsync({ L"System.ItemUrl" });
```

## Options / Props

| Projected parameter type | Accepted alternatives (in addition to the WinRT type itself) |
|------|-------------|
| `winrt::hstring` | `{}`, `std::wstring_view` (must be null-terminated after the view), `std::wstring`, `wchar_t const*` |
| `IIterable<T>` | `std::vector<T> const&` (sync only), `std::vector<T>&&`, `std::initializer_list<T>`, `{ begin, end }` forward-iterator pair |
| `IIterable<IKeyValuePair<K,V>>` | `std::map<K,V>`/`std::unordered_map<K,V>` (by const-ref sync-only, or rvalue), `std::initializer_list<std::pair<K,V>>`, `{ begin, end }` |
| `IVectorView<T>` | `std::vector<T> const&`/`&&`, `std::initializer_list<T>`, `{ begin, end }` |
| `IMapView<K,V>` | `std::map<K,V>`/`std::unordered_map<K,V>` (const-ref or rvalue), `std::initializer_list<std::pair<K,V>>` |
| `IVector<T>` | `std::vector<T>&&` (moved into a temporary; mutations by the callee are *not* reflected back), `std::initializer_list<T>` |
| `IMap<K,V>` | `std::map<K,V>&&`/`std::unordered_map<K,V>&&` (moved, mutations not reflected back), `std::initializer_list<std::pair<K,V>>` |
| C-style array (`array_view<T>`) | `{}`, `U[]`, `std::array<U,N>`, `std::vector<U>`, `{ begin, end }` (`T*` pair), `std::initializer_list<T>`, `std::span<U,N>` (where `sizeof(U) == sizeof(T)`) |

## Notes

- The `winrt::param` namespace (`param::hstring`, `param::iterable<T>`, `param::vector<T>`, `param::map<K,V>`, `param::vector_view<T>`, `param::map_view<T>`, and `async_*` variants) is generated into projected function signatures automatically — application code should never name these types directly, only pass one of the accepted alternatives above.
- Async overloads generally require an rvalue (the parameter alternative that's moved, e.g. `std::vector<T>&&`) because the callee must own the data until the asynchronous operation completes; some sync-only alternatives (plain `const&` containers, `{ begin, end }`) aren't available for async calls.
- You can't pass `nullptr` for an empty `hstring` parameter — use `L""` or `{}` instead.
- Passing an `IVector<T>`/`IMap<K,V>` (not one of the temporary-conversion alternatives) is the only way to observe mutations the callee makes to the collection.

## Related

- [Collections with C++/WinRT](./collections.md)
- [Standard C++ Data Types and C++/WinRT](./std-cpp-data-types.md)
- [String Handling](./strings.md)
- [Interop with the ABI](./interop-abi.md)
