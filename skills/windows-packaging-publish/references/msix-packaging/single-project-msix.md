# Single-Project MSIX Packaging

Single-project MSIX lets a WinUI 3 desktop app (Windows App SDK) build directly into an MSIX package from its own project — no separate Windows Application Packaging Project — using tooling bundled with the Windows App SDK's Visual Studio extension.

## Signature / Usage

```xml
<!-- C#: add to the app's .csproj <PropertyGroup> -->
<EnableMsixTooling>true</EnableMsixTooling>
<PublishProfile>Properties\PublishProfiles\win10-$(Platform).pubxml</PublishProfile>
```

```xml
<!-- C++: add/change in the app's .vcxproj <PropertyGroup Label="Globals"> -->
<EnableMsixTooling>true</EnableMsixTooling>
<AppxPackage>true</AppxPackage>
```

Move `Package.appxmanifest` and the `Images` folder from the (now removed) packaging project into the top level of the application project, then build and deploy — Visual Studio produces the MSIX package directly. For CI, `msbuild` with `/p:GenerateAppxPackageOnBuild=true` builds and packages in one step.

## Options / Props

| Property/Option | Description |
|---|---|
| `EnableMsixTooling` | MSBuild property (`.csproj`/`.vcxproj`) that turns on single-project MSIX build support |
| `AppxPackage` (C++ only) | Set to `true` in the `.vcxproj` to enable MSIX packaging output |
| `PublishProfile` (C#) | Points at the platform-specific publish profile used for packaging |
| `/p:GenerateAppxPackageOnBuild=true` | `msbuild` switch that generates the MSIX package on build; used to automate CI packaging |

## Notes

- Supported project types: WinUI 3 (Windows App SDK) C# and C++ Visual Studio templates only; non-WinUI desktop apps still use the separate Windows Application Packaging Project.
- Limitation: a single-project MSIX package can contain only one executable — apps that need multiple executables in one package must keep using the Windows Application Packaging Project.
- Limitation: single-project MSIX produces only a single `.msix`, not an `.msixbundle`; bundle the resulting `.msix` files with the MSIX Bundler if a bundle is needed.
- New WinUI 3 apps can start from the **WinUI Blank App (Packaged)** template, which already includes single-project MSIX support; existing apps migrate by moving `Package.appxmanifest`/`Images` into the app project and removing the packaging project.

## Related

- [Packaging with the Windows Application Packaging Project (Visual Studio)](./vs-packaging-project.md)
- [makeappx.exe (Command-Line Packaging)](./makeappx-cli.md)
