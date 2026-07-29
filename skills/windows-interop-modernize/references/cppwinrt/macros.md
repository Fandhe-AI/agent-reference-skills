# C++/WinRT Configuration Macros

Preprocessor macros that configure C++/WinRT's generated code (module locking, assertion handling, diagnostics, debug visualization). All macro settings for a given module (`.exe`/`.dll`, including static libraries linked into it) must be identical and must be defined before including any C++/WinRT header.

## Signature / Usage

```cppwinrt
// pch.h — must appear before any winrt/*.h include.
#define WINRT_LEAN_AND_MEAN   // Trim rarely-used features to reduce compile time.
#define WINRT_NO_MODULE_LOCK  // Typical for .exe projects: the module never unloads.

#include <winrt/Windows.Foundation.h>
```

## Options / Props

| Macro | Effect |
|------|-------------|
| `WINRT_LEAN_AND_MEAN` | Disables exclusive-interface implementation outside the component, `std::hash` specializations for smart pointers, and hstring/IStringable stream output — reduces compile times. Files with/without it may be linked together. |
| `WINRT_NO_MODULE_LOCK` | Disables object-count tracking; the module never unloads. Typical for executables. Mutually exclusive with `WINRT_CUSTOM_MODULE_LOCK`. |
| `WINRT_CUSTOM_MODULE_LOCK` | Lets you supply your own `winrt::get_module_lock` implementation (`++`/`--`/bool-test operators required). Mutually exclusive with `WINRT_NO_MODULE_LOCK`. |
| `WINRT_ASSERT` / `WINRT_VERIFY` | Customization points for assertion handling; default to `_ASSERTE` under `_DEBUG`, otherwise discard the expression (`WINRT_VERIFY` still evaluates it). |
| `WINRT_NO_MAKE_DETECTION` | Disables the diagnostic that catches implementation types constructed directly instead of via `winrt::make<T>()`. Not recommended — masks a common bug (a stack-allocated implementation type whose returned smart pointer dangles). |
| `WINRT_NO_SOURCE_LOCATION` | Disables file/line (and function, in debug) capture on originated errors. Reduces binary size; the info isn't used by C++/WinRT itself but is exposed for interop (e.g. WIL). Included by default under C++20+. |
| `WINRT_DIAGNOSTICS` | Enables internal counters: per-interface query counts, per-factory request counts (and agility). |
| `WINRT_NATVIS` | Enables native debug-visualization helpers in Visual Studio (no runtime effect); default-enabled under `_DEBUG`. Files with different settings may be linked together — if any file enables it, the whole module gets native visualizations. |
| `WINRT_EXPORT`, `WINRT_FAST_ABI_SIZE` | Reserved; don't use. |

## Notes

- All macro settings must be complete before the first C++/WinRT header include, and can't change afterward within the same translation unit.
- `WINRT_NO_MAKE_DETECTION` is the mechanism referenced elsewhere as "diagnosing direct allocations of implementation types" — leaving it enabled (the default) is what causes the compiler error when you write `MyRuntimeClass x;` instead of `winrt::make<MyRuntimeClass>()`.

## Related

- [Author APIs and IDL](./author-apis.md)
- [winrt::init_apartment / winrt::uninit_apartment](./init-apartment.md)
