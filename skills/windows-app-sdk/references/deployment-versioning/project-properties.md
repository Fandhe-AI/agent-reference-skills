# Project Properties and Auto-Initializers

MSBuild project properties (`.csproj`/`.vcxproj`) that control how a Windows App SDK app is deployed and initialized, including the auto-initializer routines that run automatically before your app's entry point.

## Signature / Usage

```xml
<Project Sdk="Microsoft.NET.Sdk">
  <PropertyGroup>
    <OutputType>WinExe</OutputType>
    <TargetFramework>net8.0-windows10.0.19041.0</TargetFramework>
    <TargetPlatformMinVersion>10.0.17763.0</TargetPlatformMinVersion>
    <UseWinUI>true</UseWinUI>
    <EnableMsixTooling>true</EnableMsixTooling>
  </PropertyGroup>
</Project>
```

## Options / Props

| Property | Values | Purpose |
|---|---|---|
| `AppxPackage` | `false` (unpackaged) or absent (packaged) | Whether a WinUI app is packaged. |
| `EnableMsixTooling` | `true` or absent | Enables single-project MSIX. |
| `UseCrtSDKReferenceStaticWarning` | `false` or absent | Suppresses static-CRT-link warning for hybrid CRT self-contained apps. |
| `UseWinUI` | `true` or absent | Whether the app uses the WinUI UI framework. |
| `WindowsAppSDKSingleFileVerifyConfiguration` | `true` (default) / `false` | Build-time validation for `PublishSingleFile` requirements; set `false` to suppress checks. |
| `WindowsAppSdkBootstrapInitialize` | `true` (default for executables) / `false` (default for non-executables) | Enables the bootstrapper/dynamic-dependencies auto-initializer. |
| `WindowsAppSdkDeploymentManagerInitialize` | `true` (default) / `false` | Enables the Deployment Manager auto-initializer (calls `DeploymentManager.Initialize` for you). |
| `WindowsAppSDKRuntimePatchLevel1` / `2`, `WindowsAppSDKDisabledChanges` | various, or absent | Compatibility auto-initializer / `RuntimeCompatibilityOptions`. |
| `WindowsAppSDKSelfContained` | `true` or absent (`false`) | Deploys the app self-contained. |
| `WindowsAppSdkUndockedRegFreeWinRTInitialize` | `true` (default for executables) / `false` | Registration-free activation auto-initializer for self-contained apps running downlevel of Windows 10 1903. |
| `WindowsPackageType` | `None` or absent | `None` for an unpackaged app causes the bootstrapper auto-initializer to locate/load the best-matching Windows App SDK version. |

## Notes

- Auto-initializers run automatically before your app's entry point (implemented as a static class constructor in C++, a .NET module initializer in C#).
- A packaged app doesn't need the bootstrapper auto-initializer (the appx manifest expresses the framework dependency); a self-contained app doesn't need it either (no framework used).
- As of Windows App SDK 1.2 (stable channel), auto-initializers apply only to projects producing an executable (`OutputType` = `Exe`/`WinExe`) by default; opt in explicitly for non-executables (e.g. test DLLs) via `<WindowsAppSdkBootstrapInitialize>true</WindowsAppSdkBootstrapInitialize>`.
- For Deployment Manager auto-initializer: if your app needs Main/Singleton functionality, either let it run by default, or set `WindowsAppSdkDeploymentManagerInitialize=false` and call `DeploymentManager.Initialize` explicitly. Apps running in an AppContainer that call `DeploymentManager.Initialize` must declare the `packageManagement` restricted capability.

## Related

- [Self-Contained Deployment](./deploy-self-contained-apps.md)
- [Use the Windows App SDK Runtime (Bootstrapper API)](./use-windows-app-sdk-run-time.md)
- [DeploymentManager](./deploymentmanager.md)
