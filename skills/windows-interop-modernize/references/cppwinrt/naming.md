# C++/WinRT Naming Conventions

Reserved-name rules for the `winrt` namespace and its sub-namespaces, so application code knows which identifiers it may define versus which are reserved for C++/WinRT itself.

## Signature / Usage

```cpp
// Applications commonly compose namespaces like this — the imported sub-namespace
// names must therefore also follow the winrt naming rules below.
namespace winrt
{
    using namespace winrt::Windows::Foundation;
}
```

## Options / Props

| Namespace | Name pattern | App may define | App may use |
|------|-------------|------|------|
| `winrt::impl` | Any | No | No |
| `winrt` and sub-namespaces (except `impl`) | Starts with lowercase letter | No | Yes (e.g. specializing `winrt::is_guid_of`) |
| `winrt` and sub-namespaces (except `impl`) | Starts with uppercase letter | Yes | Yes |
| Any namespace | `WINRT_IMPL_*` | No | No |
| Any namespace | `WINRT_*` (excluding `WINRT_IMPL_*`) | Case-by-case (e.g. `WINRT_LEAN_AND_MEAN`) | Yes |

## Notes

- `winrt::impl` is fully reserved — never reference or define anything inside it directly.
- Lowercase names in `winrt` (e.g. `winrt::make`, `winrt::box_value`) are library-provided but some are documented as safe to overload/specialize (`winrt::is_guid_of` is a named example — see Author COM Components).
- The `WINRT_*` macro family (`WINRT_ASSERT`, `WINRT_LEAN_AND_MEAN`, `WINRT_NO_MAKE_DETECTION`, etc.) is documented per-macro in Macros — check there before defining or relying on one.
- Related diagnostic topics in the official docs — native debug visualization (`WINRT_NATVIS`) and diagnosing accidental direct allocation of implementation types (`WINRT_NO_MAKE_DETECTION`) — are covered in Macros rather than duplicated here.

## Related

- [Macros](./macros.md)
- [Author COM Components with C++/WinRT](./author-coclasses.md)
