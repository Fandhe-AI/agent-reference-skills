# Generate a C# Projection from a C++/WinRT Component

Walks through using `cswinrt.exe` to generate a C# .NET projection (interop) assembly from an existing C++/WinRT Windows Runtime component's `.winmd`, then distributing the projection assembly together with the component's implementation DLL as a single NuGet package for .NET consumers.

## Signature / Usage

```xml
<!-- SimpleMathProjection.csproj — C# class library that projects a C++/WinRT component -->
<PropertyGroup>
  <TargetFramework>net8.0-windows10.0.19041.0</TargetFramework>
  <!-- AnyCPU lets the projection assembly be referenced from any app architecture. -->
  <Platform>AnyCPU</Platform>
</PropertyGroup>

<PropertyGroup>
  <CsWinRTIncludes>SimpleMathComponent</CsWinRTIncludes>
  <CsWinRTGeneratedFilesDir>$(OutDir)</CsWinRTGeneratedFilesDir>
</PropertyGroup>

<ItemGroup>
  <!-- Project (or PackageReference) to the C++/WinRT component supplying the .winmd -->
  <ProjectReference Include="..\SimpleMathComponent\SimpleMathComponent.vcxproj" />
</ItemGroup>
```

```csharp
// Program.cs — consuming app references only the generated NuGet package
var x = new SimpleMathComponent.SimpleMath();
Console.WriteLine(x.add(5.5, 6.5).ToString());
```

## Options / Props

| Project property | Description |
| --- | --- |
| `CsWinRTIncludes` | Semicolon-separated namespaces of the `.winmd` to project; scopes `cswinrt.exe` codegen to just those types. |
| `CsWinRTGeneratedFilesDir` | Output directory for the generated C# projection source files. |
| `NuspecFile` / `GeneratedNugetDir` / `GeneratePackageOnBuild` | Configure an accompanying `.nuspec` so the projection assembly and the component's implementation DLL are packed into one NuGet package on build. |
| `ResolveAssemblyWarnOrErrorOnTargetArchitectureMismatch` | Set to `None` to work around `MSB3271` (processor-architecture mismatch between the AnyCPU projection project and an architecture-specific `.winmd` implementation DLL). |

## Notes

- Since .NET 6, `.winmd` files can no longer be referenced directly by a .NET project (see .NET Mappings of WinRT Types / `dotnet-winrt-removal.md`); this projection-assembly workflow is the replacement — `cswinrt.exe` (from the `Microsoft.Windows.CsWinRT` package) turns the `.winmd` into ordinary C# that a .NET app can reference.
- Build **out of source** (a `Directory.Build.props` redirecting `OutDir`/`IntDir` outside the project tree) to prevent the C# compiler from picking up stray `.cs` files and causing duplicate-type errors across configurations.
- The resulting NuGet package must ship both the projection assembly (e.g. `SimpleMathProjection.dll`, architecture-neutral) and the component's implementation assembly (e.g. `SimpleMathComponent.dll`, architecture-specific — placed under a RID-specific `runtimes/win10-<arch>/native/` folder); the `.winmd` itself is not referenced by .NET consumers, only listed in the `.nuspec` for older non-.NET targets (UAP, .NET Framework).
- If the C++/WinRT component references Windows App SDK types, the projection project needs a matching Windows App SDK NuGet reference too, or codegen fails with `Type <T> could not be found`.
- This is distinct from Authoring WinRT Components with C#/WinRT (`authoring-winrt-components.md`), which starts from a C# class library and produces a `.winmd`; this page starts from an existing **C++/WinRT** component's `.winmd` and produces a **C#** consumption layer for it.

## Related

- [C#/WinRT Overview](./overview.md)
- [Authoring WinRT Components with C#/WinRT](./authoring-winrt-components.md)
- [System.Runtime.InteropServices.WindowsRuntime Removal](./dotnet-winrt-removal.md)
