# Adding Windows App SDK to an Existing WPF/WinForms Project

The Windows App SDK ships as a NuGet package (`Microsoft.WindowsAppSDK`) you add to an existing WPF, WinForms, or C++ Win32 project to gain windowing (`AppWindow`), `DWriteCore`, `MRT Core` resources, and other modern Windows features — without changing the UI framework.

## Signature / Usage

```xml
<!-- .csproj -->
<Project Sdk="Microsoft.NET.Sdk">
  <PropertyGroup>
    <OutputType>WinExe</OutputType>
    <TargetFramework>net8.0-windows10.0.19041.0</TargetFramework>
    <UseWPF>true</UseWPF>
    <!-- Unpackaged desktop apps: -->
    <WindowsPackageType>None</WindowsPackageType>
  </PropertyGroup>

  <ItemGroup>
    <PackageReference Include="Microsoft.WindowsAppSDK" Version="1.7.*" />
    <PackageReference Include="Microsoft.Windows.SDK.BuildTools" Version="10.0.26100.*" />
  </ItemGroup>
</Project>
```

## Options / Props

| Setting | Description |
|---------|-------------|
| `PackageReference Microsoft.WindowsAppSDK` | Main NuGet package; installs sub-packages (`Foundation`, `WinUI`, etc.) |
| `WindowsPackageType = None` | Marks the app as unpackaged; MSBuild auto-generates `MddBootstrapAutoInitializer.cs` and `WindowsAppSDK-VersionInfo.cs` to auto-initialize the Windows App SDK runtime at startup |
| `WindowsAppSDKSelfContained = true` | Extracts the Windows App SDK Framework package contents into the build output and deploys them with the app, so the target machine does not need the runtime pre-installed (larger output, larger per-update payload) |
| Bootstrap API (`Bootstrap.TryInitialize`) | Manual alternative to auto-initialization, needed for custom error handling or pinning a specific runtime version |

## Notes

- An unpackaged WPF/WinForms app **must initialize the Windows App SDK runtime** before calling any Windows App SDK feature; setting `WindowsPackageType=None` triggers MSBuild's auto-initialization, which is sufficient for most apps.
- The target machine also needs the Windows App SDK **Runtime** installed unless `WindowsAppSDKSelfContained` is `true`; deploying it is the app's responsibility for unpackaged/external-location apps.
- If a *Class not registered* error occurs when using a Windows App SDK component, add a dynamic dependency on the Windows App SDK Framework package.
- Adding the Windows App SDK does not require adopting WinUI 3 or MSIX packaging — it is one of three independent modernization approaches (WinRT APIs, Windows App SDK, MSIX packaging) that can be combined incrementally.

## Related

- [winrt-apis-in-wpf-winforms.md](./winrt-apis-in-wpf-winforms.md)
- [dotnet-upgrade-assistant.md](./dotnet-upgrade-assistant.md)
