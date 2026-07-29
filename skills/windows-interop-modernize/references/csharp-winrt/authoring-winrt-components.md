# Authoring WinRT Components with C#/WinRT

C#/WinRT lets .NET developers author their own WinRT components in C# using a class library project, producing a `.winmd` file that can be consumed from any WinRT-compatible language (C++/WinRT, C#, etc.), typically distributed as a NuGet package.

## Signature / Usage

```xml
<!-- AuthoringDemo.csproj -->
<Project Sdk="Microsoft.NET.Sdk">
  <PropertyGroup>
    <TargetFramework>net8.0-windows10.0.19041.0</TargetFramework>
    <Platforms>x64</Platforms>
    <CsWinRTComponent>true</CsWinRTComponent>
    <GeneratePackageOnBuild>true</GeneratePackageOnBuild>
  </PropertyGroup>
</Project>
```

```csharp
// Example.cs — public types/members become the runtime class's WinRT surface.
namespace AuthoringDemo
{
    public sealed class Example
    {
        public int SampleProperty { get; set; }

        public static string SayHello()
        {
            return "Hello from your C# WinRT component";
        }
    }
}
```

## Options / Props

| Project property | Description |
| --- | --- |
| `TargetFramework` | Version-specific TFM (e.g. `net8.0-windows10.0.19041.0`); required to access WinRT types when authoring. |
| `CsWinRTComponent` | Set to `true` to mark the project as a WinRT component, so a `.winmd` is generated on build. |
| `GeneratePackageOnBuild` | Set to `true` to produce a NuGet package on every build (alternative: right-click **Pack** in Visual Studio). |

## Notes

- Requires the `Microsoft.Windows.CsWinRT` NuGet package installed in the authoring project.
- Only `public` classes/members are exposed in the generated `.winmd`; mark runtime classes `sealed` as WinRT does not support arbitrary inheritance across the ABI.
- Consuming apps that are **not packaged** (e.g. a native C++/WinRT console app) must register activatable classes via an application manifest (`*.exe.manifest`) with `<activatableClass>` entries pointing at `WinRT.Host.dll`; packaged apps register them in `Package.appxmanifest` instead.
- Consuming a C#/WinRT-authored component from another C#/.NET app (package or project reference) does not involve WinRT activation in most cases — it behaves like an ordinary class library reference. Project references from C# consumers require C#/WinRT 1.3.5+ and .NET 6+.
- For AOT-published authored components, classes must be marked `partial`; see [AOT and Trimming with C#/WinRT](./aot-trimming.md).

## Related

- [C#/WinRT Overview](./overview.md)
- [Generate a C# Projection from a C++/WinRT Component](./net-projection-from-cppwinrt-component.md)
- [AOT and Trimming with C#/WinRT](./aot-trimming.md)
