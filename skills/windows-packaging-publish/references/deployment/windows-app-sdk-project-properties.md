# Windows App SDK Project Properties (Auto-initializers, MSBuild)

Project file properties (`.csproj` / `.vcxproj`) that customize how a Windows App SDK app is deployed, including the auto-initializers that run before the app's entry point (static class constructor in C++, .NET module initializer in C#).

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

| Property | Description | Values |
| --- | --- | --- |
| `AppxPackage` | Whether a WinUI app is packaged. | `false` (unpackaged) or absent (packaged) |
| `EnableMsixTooling` | Enables the single-project MSIX feature. | `true` or absent |
| `UseCrtSDKReferenceStaticWarning` | Suppresses the build warning when a C++ packaged app links the CRT statically (hybrid CRT for self-contained). | `false` or absent (default, warning enabled) |
| `UseWinUI` | Whether WinUI is used. | `true` or absent |
| `WindowsAppSDKSingleFileVerifyConfiguration` | Build-time validation when `PublishSingleFile` is set: errors if `EnableMsixTooling`, `WindowsPackageType=None`, `IncludeAllContentForSelfExtract` are missing; warnings if `WindowsAppSDKSelfContained` / `SelfContained` are absent. Defined in `Microsoft.WindowsAppSDK.SingleFile.targets`. | `true` (default), `false` |
| `WindowsAppSdkBootstrapInitialize` | Bootstrapper / dynamic dependencies auto-initializer. | `true` (default for executables), `false` (default for non-executables) |
| `WindowsAppSdkDeploymentManagerInitialize` | Deployment Manager auto-initializer. | `true` (default), `false` |
| `WindowsAppSDKRuntimePatchLevel1`, `WindowsAppSDKRuntimePatchLevel2`, `WindowsAppSDKDisabledChanges` | Compatibility auto-initializer and options for servicing-update behavior (A/B containment). | Various, or absent to disable |
| `WindowsAppSDKSelfContained` | Self-contained deployment. | `true` or absent |
| `WindowsAppSdkUndockedRegFreeWinRTInitialize` | Registration-free activation auto-initializer. | `true` (default for executables), `false` (default for non-executables) |
| `WindowsPackageType` | `None` for an unpackaged app makes the bootstrapper auto-initializer locate and load the most appropriate Windows App SDK version. | `None` or absent |

## Notes

- Bootstrapper auto-initializer: required for framework-dependent unpackaged apps; not needed for packaged apps (the manifest expresses the dependency) or self-contained apps. Opt out with `<WindowsAppSdkBootstrapInitialize>false</WindowsAppSdkBootstrapInitialize>`.
- Deployment Manager auto-initializer: required for framework-dependent packaged apps using Main/Singleton functionality (for example push notifications); not needed for self-contained apps. With Windows App SDK 1.8 or later it runs by default. If the app doesn't need Main/Singleton packages, opt out with `WindowsAppSdkDeploymentManagerInitialize=false`; if it does, keep the default or opt out and call `DeploymentManager.Initialize` explicitly. A process in an AppContainer that causes `DeploymentManager.Initialize` to be called must declare the `packageManagement` restricted capability.
- Registration-free activation auto-initializer: required for a self-contained app using manifest-based UndockedRegFreeWinRT on an OS earlier than Windows 10 version 1903; others can opt out with `<WindowsAppSdkUndockedRegFreeWinRTInitialize>false</WindowsAppSdkUndockedRegFreeWinRTInitialize>`.
- Compatibility auto-initializer: only needed for A/B containment (not the default); see RuntimeCompatibilityOptions.
- Source: https://learn.microsoft.com/en-us/windows/apps/package-and-deploy/project-properties, last updated 2026-10-02 (ms.date).

## Related

- [Windows App SDK deployment overview](./windows-app-sdk-deploy-overview.md)
- [Self-contained deployment](./windows-app-sdk-self-contained-deploy.md)
- [Unpackage a WinUI app](./unpackage-winui-app.md)
