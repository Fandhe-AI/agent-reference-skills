# Package Your App Using Single-Project MSIX

Single-project MSIX lets you build a packaged WinUI 3 desktop app from a single project — no separate **Windows Application Packaging Project** needed. New apps get it via the **WinUI Blank App (Packaged)** template; existing two-project solutions can be converted by moving `Package.appxmanifest` into the app project and enabling `EnableMsixTooling`.

## Signature / Usage

```xml
<!-- .csproj, inside the main <PropertyGroup> -->
<Project Sdk="Microsoft.NET.Sdk">
  <PropertyGroup>
    <OutputType>WinExe</OutputType>
    <TargetFramework>net8.0-windows10.0.19041.0</TargetFramework>
    <UseWinUI>true</UseWinUI>
    <EnableMsixTooling>true</EnableMsixTooling>
    <PublishProfile>Properties\PublishProfiles\win10-$(Platform).pubxml</PublishProfile>
  </PropertyGroup>
</Project>
```

```
msbuild /p:GenerateAppxPackageOnBuild=true
```

## Options / Props

| Property / setting | Project type | Purpose |
|---|---|---|
| `EnableMsixTooling` | C#/C++ | Turns on the single-project MSIX packaging tools for the project. |
| `PublishProfile` | C# | Points at the `win10-$(Platform).pubxml` profile used by the packaging tools. |
| `AppxPackage` = `true` | C++ (`.vcxproj`) | C++ equivalent enable flag, set alongside `EnableMsixTooling`. |
| `GenerateAppxPackageOnBuild=true` | msbuild CLI | Required to actually produce an MSIX on a command-line/CI build; without it the project builds but no package is generated. |
| `Package.appxmanifest` + `Images/` | both | Moved from the removed packaging project into the top level of the app project's folder hierarchy; image files need **Build Action** = `Content`. |

## Notes

- Supports only a single executable per MSIX; combining multiple executables in one package still requires a separate Windows Application Packaging Project (see windows-packaging-publish for that workflow) — this replaces that older two-project approach for the common single-exe WinUI 3 case.
- After moving files, enable the **Deploy** checkbox for every configuration/platform combination in Visual Studio's **Configuration Manager**, or deployment silently no-ops.
- Does not produce `.msixbundle` bundles; only a single `.msix`. Combine multiple architectures into a bundle with a separate bundler tool if needed.
- The single-project MSIX packaging tools ship with the Windows App SDK Visual Studio extension; only versions predating Windows App SDK 1.0 Preview 3 (C#) may need the standalone VSIX installed separately.

## Related

- [Project Properties and Auto-Initializers](./project-properties.md)
- [Deployment Guide for Packaged Apps](./deploy-packaged-apps.md)
