# Self-Contained Deployment

Guide for switching a Windows App SDK project from the default framework-dependent deployment to self-contained deployment, bundling the Framework package contents into the app's build output.

## Signature / Usage

```xml
<PropertyGroup>
  <WindowsAppSDKSelfContained>true</WindowsAppSDKSelfContained>
</PropertyGroup>
```

Set this in the app project's main `PropertyGroup` (and in the packaging project's file too, if using a Windows Application Packaging Project rather than single-project MSIX). Reload the project after editing.

## Options / Props

| Property | Description |
|---|---|
| `WindowsAppSDKSelfContained` | `true` to deploy self-contained (Framework package extracted to build output); absent = framework-dependent (default). |
| `WindowsAppSdkUndockedRegFreeWinRTInitialize` | Controls automatic UndockedRegFreeWinRT support, needed for unpackaged self-contained apps running downlevel of Windows 10 1903. Defaults `true` when `WindowsAppSDKSelfContained=true`, `WindowsPackageType=None`, and `OutputType` is `Exe`/`WinExe`. |
| `UseCrtSDKReferenceStaticWarning` | Set `false` in packaged app projects using the hybrid CRT, to suppress the static-CRT-link build warning. |

## Notes

- .NET apps must also be [published as self-contained](https://learn.microsoft.com/en-us/dotnet/core/deploying/) (via publish profile) to be fully self-contained; `dotnet publish` cannot produce a single-file EXE for WinUI 3 — native runtime dependencies stay as separate files.
- C++ apps need the hybrid CRT (import `HybridCRT.props`) to be fully self-contained.
- Packaged self-contained apps: dependencies included as content inside the MSIX; still requires registering the package normally.
- Packaged-with-external-location/unpackaged self-contained apps: dependencies copied next to the `.exe`; xcopy-deployable.
- Some APIs (push/app notifications) still depend on the Singleton package even in self-contained apps. Options: check `IsSupported` at runtime and degrade gracefully, deploy the required MSIX packages as part of app install, or avoid the API.
- Library projects should never set `WindowsAppSDKSelfContained` — only app (and packaging) projects.

## Related

- [Deployment Overview](./deploy-overview.md)
- [Project Properties and Auto-Initializers](./project-properties.md)
