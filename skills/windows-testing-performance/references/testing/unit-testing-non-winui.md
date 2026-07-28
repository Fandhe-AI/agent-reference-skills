# Unit Testing Non-WinUI Code (MSTest / xUnit / NUnit)

For app functionality that doesn't depend on `Microsoft.UI.Xaml` types, use standard .NET testing tools — MSTest, NUnit, or xUnit — instead of a WinUI Unit Test App project.

## Signature / Usage

```xml
<!-- .csproj of the test project, when it references a WinUI 3 project -->
<TargetFramework>net8.0-windows10.0.19041.0</TargetFramework>

<RuntimeIdentifiers Condition="$([MSBuild]::GetTargetFrameworkVersion('$(TargetFramework)')) &gt;= 8">win-x86;win-x64;win-arm64</RuntimeIdentifiers>
<RuntimeIdentifiers Condition="$([MSBuild]::GetTargetFrameworkVersion('$(TargetFramework)')) &lt; 8">win10-x86;win10-x64;win10-arm64</RuntimeIdentifiers>

<PropertyGroup>
  <WindowsAppSdkBootstrapInitialize>true</WindowsAppSdkBootstrapInitialize>
</PropertyGroup>
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| **MSTest Test Project** | VS project template | C#/Windows/Test category; add via Solution Explorer > **Add** > **New Project** |
| **NUnit Test Project** | VS project template | Alternative test framework project template |
| **xUnit Test Project** | VS project template | Alternative test framework project template |
| `TargetFramework` | csproj property | Must match the WinUI 3 project's TFM (e.g. `net8.0-windows10.0.19041.0`), not the default cross-platform TFM |
| `WindowsAppSdkBootstrapInitialize` | csproj property | Set `true` so the test run loads the Windows App SDK runtime |

## Notes

- When an MSTest/NUnit/xUnit project references a WinUI 3 project, you must update `TargetFramework` and `RuntimeIdentifiers` to match the WinUI 3 project's Windows-specific TFM — by default these test project templates target the full cross-platform range of .NET, which is incompatible with a WinUI 3 project.
- The Windows App SDK runtime must be installed on the machine running the tests for `WindowsAppSdkBootstrapInitialize` to succeed.
- For deployment details, see the Windows App SDK deployment guide for framework-dependent/unpackaged apps.
- This category applies to code that does not construct `Microsoft.UI.Xaml.Controls.*` objects; for XAML-dependent code use the WinUI Unit Test App template instead (`[UITestMethod]`).

## Related

- [Unit Testing WinUI 3 Apps](./unit-testing-winui3.md)
