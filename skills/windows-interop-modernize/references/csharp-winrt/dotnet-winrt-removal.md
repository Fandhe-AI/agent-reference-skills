# System.Runtime.InteropServices.WindowsRuntime Removal

Starting with .NET 5, built-in support for consuming WinRT APIs (via WinMD files) was removed from the CLR. Previously CoreCLR could consume Windows Metadata (WinMD) files directly to activate and consume WinRT types; in .NET 5+ it can no longer do so. This is a documented .NET breaking change, not a gradual deprecation.

## Signature / Usage

```xml
<!-- Before (.NET Core 3.x / .NET Framework): NuGet-based WinMD consumption -->
<PackageReference Include="Microsoft.Windows.SDK.Contracts" Version="10.0.19041.xxxx" />

<!-- After (.NET 5+): TFM-based consumption, no explicit package reference needed -->
<TargetFramework>net8.0-windows10.0.19041.0</TargetFramework>

<!-- For third-party .winmd components (not part of the Windows SDK) -->
<PackageReference Include="Microsoft.Windows.CsWinRT" Version="2.1.1" />
```

## Options / Props

| Behavior | Detail |
| --- | --- |
| Referencing an unsupported assembly | Throws `FileNotFoundException`. |
| Activating a WinRT class without the new projection | Throws `PlatformNotSupportedException`. |

Affected APIs removed/changed: `System.IO.WindowsRuntimeStorageExtensions`, `System.IO.WindowsRuntimeStreamExtensions`, `System.Runtime.InteropServices.WindowsRuntime` (namespace), `System.WindowsRuntimeSystemExtensions`, `Windows.Foundation.Point`, `Windows.Foundation.Size`, `Windows.UI.Color`.

## Notes

- Introduced in .NET 5. Reasons: decouple WinRT evolution from the .NET runtime, achieve symmetry with iOS/Android interop models, enable IL trimming and Native AOT, and simplify the runtime codebase.
- Migration: remove the `Microsoft.Windows.SDK.Contracts` package reference and instead specify the Windows API version via the `TargetFramework` property (e.g. `net8.0-windows10.0.19041.0`). For third-party `.winmd` components, reference `Microsoft.Windows.CsWinRT` and generate a C# projection with C#/WinRT.
- `System.WindowsRuntimeSystemExtensions` (the type providing `AsTask`/`AsAsyncAction`/`AsAsyncOperation`) is listed as an affected/removed built-in API, but C#/WinRT reintroduces equivalent async interop support as part of its projections — see [Calling Asynchronous WinRT APIs from .NET](./async-operations.md).

## Related

- [C#/WinRT Overview](./overview.md)
- [Microsoft.Windows.SDK.NET.Ref and TargetFramework](./sdk-net-ref-targetframework.md)
- [Calling Asynchronous WinRT APIs from .NET](./async-operations.md)
- [Generate a C# Projection from a C++/WinRT Component](./net-projection-from-cppwinrt-component.md)
