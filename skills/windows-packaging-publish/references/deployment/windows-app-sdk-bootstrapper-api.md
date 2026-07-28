# Windows App SDK Bootstrapper API

Initializes access to the Windows App SDK runtime for packaged-with-external-location and unpackaged apps, before any other Windows App SDK feature (WinUI 3, App Lifecycle, MRT Core, DWriteCore) can be used.

## Signature / Usage

```xml
<!-- Simplest option: auto-initialization at app startup -->
<WindowsPackageType>None</WindowsPackageType>
```

```csharp
// Explicit control via the .NET wrapper (Microsoft.WindowsAppRuntime.Bootstrap.Net.dll)
using Microsoft.Windows.ApplicationModel.DynamicDependency;

Bootstrap.TryInitialize(0x00010000 /* major.minor version */, out int hr);
// ... use Windows App SDK features ...
Bootstrap.Shutdown();
```

## Options / Props

| API / Property | Description |
| --- | --- |
| `MddBootstrapInitialize` / `MddBootstrapInitialize2` (C/C++, `mddbootstrap.h`) | Initializes the process to use the best-matching Windows App SDK Framework package version; must be one of the first calls at startup. `Initialize2` available from 1.1. |
| `MddBootstrapShutdown` | Reverses initialization; after this call the app can't use Windows App SDK APIs. |
| `Bootstrap.Initialize` / `TryInitialize` / `Shutdown` (.NET wrapper) | `Microsoft.WindowsAppRuntime.Bootstrap.Net.dll` — friendlier wrapper over the C/C++ API for .NET apps. |
| `<WindowsPackageType>None</WindowsPackageType>` | Enables auto-initializers that call the bootstrapper API automatically; simplest option for most apps. |
| `<WindowsAppSdkBootstrapInitialize>false</WindowsAppSdkBootstrapInitialize>` | Disables the auto-initializer so the app can call the bootstrapper API explicitly. |
| `<WindowsAppSDKBootstrapAutoInitializeOptions_*>` | Family of properties controlling auto-init error behavior (e.g. `OnError_FailFast`, `OnNoMatch_ShowUI`). |

## Notes

- Auto-initializers apply only to projects producing an executable (`OutputType` = `Exe`/`WinExe`) as of Windows App SDK 1.2 stable; explicitly opt in for non-executables (e.g. test DLLs) with `<WindowsAppSdkBootstrapInitialize>true</WindowsAppSdkBootstrapInitialize>`.
- The bootstrapper library (`Microsoft.WindowsAppRuntime.Bootstrap.dll` / `.Bootstrap.Net.dll`) is a small DLL that must be distributed with the app — it is not part of the Framework package itself.
- Also initializes the Dynamic Dependency Lifetime Manager (DDLM) to prevent OS servicing of the Framework package while in use.
- For referencing framework packages other than the Windows App SDK itself, use the broader Dynamic Dependencies API.

## Related

- [Windows App SDK deployment architecture](./windows-app-sdk-deployment-architecture.md)
- [Windows App SDK deployment guide for framework-dependent apps packaged with external location or unpackaged](./windows-app-sdk-deploy-unpackaged-apps.md)
