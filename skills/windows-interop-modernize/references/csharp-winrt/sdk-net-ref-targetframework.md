# Microsoft.Windows.SDK.NET.Ref and TargetFramework

.NET 6+ desktop apps call WinRT APIs by specifying a Windows OS version-specific Target Framework Moniker (TFM) in the project file. This adds a reference to the [Microsoft.Windows.SDK.NET.Ref](https://www.nuget.org/packages/Microsoft.Windows.SDK.NET.Ref) targeting package (Windows SDK projection and runtime assemblies) at build time — no NuGet package reference is added manually.

## Signature / Usage

```xml
<Project Sdk="Microsoft.NET.Sdk">
  <PropertyGroup>
    <OutputType>WinExe</OutputType>
    <TargetFramework>net8.0-windows10.0.19041.0</TargetFramework>
  </PropertyGroup>
</Project>
```

To support running on an older Windows version than the TFM targets, also set `SupportedOSPlatformVersion` (and optionally `TargetPlatformMinVersion`):

```xml
<Project Sdk="Microsoft.NET.Sdk">
  <PropertyGroup>
    <OutputType>WinExe</OutputType>
    <TargetFramework>net8.0-windows10.0.19041.0</TargetFramework>
    <SupportedOSPlatformVersion>10.0.17763.0</SupportedOSPlatformVersion>
    <TargetPlatformMinVersion>10.0.17763.0</TargetPlatformMinVersion>
  </PropertyGroup>
</Project>
```

## Options / Props

| TFM component | Example | Meaning |
| --- | --- | --- |
| Target framework | `net8.0` | .NET version (`net8.0`, `net9.0`, `net10.0`, ...) |
| Target OS | `-windows` | Fixed literal for Windows desktop targeting |
| Target OS version | `10.0.19041.0` | Windows SDK version whose APIs are compiled against; selects reference assemblies and NuGet assets |

Common Windows-version TFM values (`net8.0` shown, substitute other .NET versions as needed):

| Windows version | TFM |
| --- | --- |
| Windows 11, version 24H2 | `net8.0-windows10.0.26100.0` |
| Windows 11, version 22H2 | `net8.0-windows10.0.22621.0` |
| Windows 11 (initial release) | `net8.0-windows10.0.22000.0` |
| Windows 10, version 2004 | `net8.0-windows10.0.19041.0` |
| Windows 10, version 1903 | `net8.0-windows10.0.18362.0` |
| Windows 10, version 1809 | `net8.0-windows10.0.17763.0` |

## Notes

- The TFM's OS version controls which APIs are available at **compile time** (selects reference assemblies / NuGet assets); it does not restrict which OS version the app can **run** on at runtime. `SupportedOSPlatformVersion` controls the minimum runtime OS version.
- When targeting a range of OS versions, guard calls to APIs unavailable on older versions with `ApiInformation` checks — see [Detecting WinRT API Availability](./api-availability-checks.md). Visual Studio emits warning `CA1416` for such unguarded calls when `SupportedOSVersion` is set.
- For .NET Core 3.x / .NET Framework projects (no TFM-based projection), install the `Microsoft.Windows.SDK.Contracts` NuGet package instead — but this path is legacy; new projects should use .NET 6+ and the TFM.
- Several `Windows.UI.*` WinRT APIs are unsupported in .NET 6+; use the `Microsoft.UI.*` equivalents provided by the Windows App SDK instead (e.g. `Windows.UI.Colors` → `Microsoft.UI.Colors`, `Windows.UI.Xaml.*` → `Microsoft.UI.Xaml.*`).
- Multi-targeting .NET 6+ and older frameworks in one project requires conditional `PackageReference` and `#if NET6_0_OR_GREATER` preprocessor blocks.

## Related

- [C#/WinRT Overview](./overview.md)
- [Detecting WinRT API Availability](./api-availability-checks.md)
- [WinRT APIs Not Supported in Desktop Apps](./winrt-api-desktop-support.md)
