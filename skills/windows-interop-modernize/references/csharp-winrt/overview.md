# C#/WinRT Overview

C#/WinRT is a NuGet-packaged toolkit that provides Windows Runtime (WinRT) projection support for the C# language. A projection assembly is an interop assembly that lets you program WinRT APIs in a natural way from C#, hiding the interop details and mapping many WinRT types to .NET equivalents (strings, URIs, common value types, generic collections).

## Signature / Usage

```xml
<!-- Install the toolkit -->
<PackageReference Include="Microsoft.Windows.CsWinRT" Version="2.1.1" />
```

The **cswinrt.exe** compiler (shipped in the `Microsoft.Windows.CsWinRT` NuGet package) processes Windows Metadata (`.winmd`) files and generates C# source files, which are compiled into an interop assembly — analogous to how C++/WinRT generates headers for C++.

## Notes

- Prior to .NET 5, WinRT projection support was built into the .NET runtime/compiler. Starting with .NET 5+, that built-in support was removed and moved into the C#/WinRT toolkit, so C#/WinRT is a required dependency for consuming WinRT APIs from modern .NET.
- C#/WinRT supports Windows App SDK components, including WinUI 3.
- `Microsoft.Windows.CsWinRT` (the NuGet package) is distinct from `Microsoft.Windows.SDK.NET.Ref` (the targeting pack referenced implicitly via the TFM). See [Microsoft.Windows.SDK.NET.Ref and TargetFramework](./sdk-net-ref-targetframework.md).
- Embedded support (C#/WinRT 1.4.1+) lets you embed Windows SDK projection/runtime sources directly into your library or app output, removing the `WinRT.Runtime.dll` / `Microsoft.Windows.SDK.NET.dll` dependency.
- WinRT type activation for third-party components in a desktop app requires registration-free WinRT activation (Windows 10, version 1903+), or C#/WinRT's DLL-name fallback probing (for example `Contoso.Controls.Widget.dll` → `Contoso.Controls.dll` → `Contoso.dll`).
- Common error: `CS0246: The type or namespace name 'Windows' could not be found` — fix by setting a Windows-version-specific `<TargetFramework>`, e.g. `net8.0-windows10.0.19041.0`.
- Common error: `InvalidCastException` when casting to a `[ComImport]`-attributed interface — use the `.As<T>()` operator instead of a C# cast expression.

## Related

- [Microsoft.Windows.SDK.NET.Ref and TargetFramework](./sdk-net-ref-targetframework.md)
- [.NET Mappings of WinRT Types](./net-mappings-of-winrt-types.md)
- [Authoring WinRT Components with C#/WinRT](./authoring-winrt-components.md)
- [AOT and Trimming with C#/WinRT](./aot-trimming.md)
- [System.Runtime.InteropServices.WindowsRuntime Removal](./dotnet-winrt-removal.md)
