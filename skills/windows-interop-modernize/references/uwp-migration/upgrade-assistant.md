# Migrate from UWP with the .NET Upgrade Assistant

The .NET Upgrade Assistant is a Visual Studio extension (recommended) and command-line tool that automates much of migrating a C# UWP project file and source code to a WinUI 3 / Windows App SDK project.

## Signature / Usage

```text
upgrade-assistant --version
```

High-level stages the tool performs:

```text
1. Optionally copy the project (leaving the original unchanged), or migrate in-place.
2. Upgrade the project from .NET Framework project format to the SDK-style project format.
3. Clean up NuGet package references (remove now-unneeded transitive references,
   add NuGet equivalents of referenced .NET Framework assemblies).
4. Target .NET 6+ and the Windows App SDK; change the TFM
   (e.g. net6.0-windows -> net8.0-windows10.0.19041.0).
5. Migrate UWP source from WinUI-for-UWP to WinUI, with source-specific code changes.
6. Add/update template, config, and code files (App.xaml.cs, MainWindow.xaml[.cs], ...).
7. Update namespaces and add MainPage navigation.
8. Detect/fix differing APIs; mark unsupported ones with Task List TODO comments.
```

Resulting `.csproj` (essentials):

```xml
<Project Sdk="Microsoft.NET.Sdk">
  <PropertyGroup>
    <TargetFramework>net8.0-windows10.0.19041.0</TargetFramework>
    <OutputType>WinExe</OutputType>
    <UseWinUI>true</UseWinUI>
    <TargetPlatformMinVersion>10.0.17763.0</TargetPlatformMinVersion>
    <RuntimeIdentifiers>win-x86;win-x64;win-arm64</RuntimeIdentifiers>
    <EnableMsixTooling>true</EnableMsixTooling>
  </PropertyGroup>
  <ItemGroup>
    <AppxManifest Include="Package.appxmanifest">
      <SubType>Designer</SubType>
    </AppxManifest>
  </ItemGroup>
  <ItemGroup>
    <PackageReference Include="Microsoft.WindowsAppSDK" Version="1.1.0" />
  </ItemGroup>
</Project>
```

## Options / Props

| Step in Visual Studio | Purpose |
|------|-------------|
| Right-click project > **Upgrade** | Launches the .NET Upgrade Assistant |
| **Upgrade project to a newer .NET version** | Chooses the .NET/WinUI upgrade path |
| **In-place project upgrade** (or copy) | Whether to modify files in place or work on a copy |
| Choose target framework | Sets the resulting TFM |
| **Upgrade selection** | Runs the tool; progress and messages appear in the Output window |
| **View > Task List** | Shows TODOs the tool generated for manual follow-up |

## Notes

- Currently supports **C# only**, not C++. Requires additional manual effort even for supported projects; treat it as an accelerator, not a complete migration.
- Not supported by the tool: migrating from `ApplicationView` APIs, migrating from `AppWindow`-related APIs, custom views (for example a dialog that extends `MessageDialog`), Windows Runtime Components, multi-window apps, and non-standard file layouts (`App.xaml`/`App.xaml.cs` not in the project root).
- After the tool runs, manual follow-up is required: `Package.appxmanifest` is **not** edited automatically — add the `rescap` namespace, change `EntryPoint` to `$targetentrypoint$`, replace any `Capability` with `<rescap:Capability Name="runFullTrust" />`, ensure `<XamlControlsResources>` is merged in `App.xaml`, and set `<OutputType>WinExe</OutputType>` / `<UseMaui>False</UseMaui>` in the `.csproj` if needed.
- File and content copy strategy, project renaming, and per-feature-area follow-up are the same as in [Overall migration strategy](./overall-migration-strategy.md) — the tool automates the project-file and namespace mechanics, not the feature-area rework covered by the other guides in this category.

## Related

- [Migration overview](./migration-overview.md)
- [Overall migration strategy](./overall-migration-strategy.md)
- [What's supported when migrating from UWP to WinUI](./what-is-supported.md)
