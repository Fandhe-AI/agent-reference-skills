# C++/WinRT Projection Headers (winrt/*.h)

For every Windows Runtime type declared in metadata (`.winmd`), C++/WinRT defines a C++-friendly equivalent (the *projected type*) inside a `winrt/<Namespace>.h` header.

## Signature / Usage

```cppwinrt
// To use Windows::Foundation::Collections::PropertySet, include its namespace header:
#include <winrt/Windows.Foundation.Collections.h>

// To use Windows::Security::Cryptography::Certificates types:
#include <winrt/Windows.Security.Cryptography.Certificates.h>
```

## Notes

- Headers live under `%WindowsSdkDir%Include\<WindowsTargetPlatformVersion>\cppwinrt\winrt\` for Windows namespace types; your project (via `cppwinrt.exe`) also regenerates them into `$(GeneratedFilesDir)`, so there's no strict dependency on the Windows SDK copy.
- A projected type has the same fully-qualified name as the Windows type, but lives in the C++ `winrt` namespace (for example `Windows::Foundation::Uri` → `winrt::Windows::Foundation::Uri`).
- You must explicitly `#include` the header matching each namespace you use, even if one header transitively includes another — that's an implementation detail you shouldn't rely on. Forgetting an include is a common source of linker errors (missing `consume_` classes) rather than compile errors.
- `cppwinrt.exe` (from the **Microsoft.Windows.CppWinRT** NuGet package) generates these headers by pointing at a `.winmd` file; it also generates implementation stubs when authoring runtime classes from IDL.
- Don't use anything from the `winrt::impl` namespace or types like `winrt::param::hstring` directly — those are optimization/implementation details subject to change. Use standard C++ types or `winrt` namespace types instead.

## Related

- [Overview](./overview.md)
- [Consume APIs](./consume-apis.md)
- [Author APIs and IDL](./author-apis.md)
