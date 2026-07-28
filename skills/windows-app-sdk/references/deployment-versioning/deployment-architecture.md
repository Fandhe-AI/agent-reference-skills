# Deployment Architecture

High-level architecture of Windows App SDK framework-dependent deployment: the Windows App SDK runtime packages, how apps reference the shared Framework package, and how the MSIX deployment pipeline stages/registers packages.

## Signature / Usage

Framework-dependent apps depend on the Windows App SDK runtime being present on the target machine. Two distribution options:

| App deployment method | Requirements |
|---|---|
| Packaged | Declare dependency on Framework package in the package manifest. Deployment API required for Store apps, recommended for non-Store apps. |
| Packaged with external location or unpackaged | Distribute runtime via Installer or MSIX packages directly. Must initialize access via the Bootstrap API. |

## Options / Props

| Term | Definition |
|---|---|
| Windows App SDK runtime | The MSIX packages required to use the Windows App SDK: Framework, Main, Singleton, and DDLM. |
| Framework package | Contains binaries used at run time by most Windows App SDK features. Includes a bootstrapper component. Follows Semantic Versioning 2.0.0 after 1.0. |
| Main package | Contains background tasks that track dynamic dependencies and enable automatic Framework package updates from the Microsoft Store. |
| Singleton package | Contains background tasks/services/app extensions not in the Framework package (e.g. Push Notifications). One long-running process brokered between apps. |
| Dynamic Dependency Lifetime Manager (DDLM) | Prevents OS servicing updates to MSIX packages while a packaged-with-external-location or unpackaged app is in use. One DDLM per version+architecture of the Framework package. |
| Bootstrapper | App-local binary used by packaged-with-external-location and unpackaged apps to locate/load the best matching Windows App SDK version. Ships as `Microsoft.WindowsAppRuntime.Bootstrap.dll` (C++/C#) and `Microsoft.WindowsAppRuntime.Bootstrap.Net.dll` (C# wrapper). |
| Provisioning | Staging packages system-wide so any user can register/use them without repeating per-machine staging. |
| Installer | The `.exe` installer (`WindowsAppRuntimeInstall.exe`) that deploys Framework, Main, Singleton, and DDLM packages. |
| MSIX | Modern installer technology for safe per-user or system-wide app installation. |

### MSIX deployment pipeline

| Stage | Scope | What happens |
|---|---|---|
| Index | Per-machine | Parses the package manifest, records metadata and intended install path. |
| Stage | Per-machine | Creates the package directory, extracts payload, applies ACLs. |
| Register | Per-user | Associates the staged package with a specific user (Start menu entries, file associations, runtime data). |

Staging happens once per machine; registration is per-user, so a package can be enabled/removed for one user without affecting others. `PackageManager` submits Add/Stage/Register/Remove operations to the deployment queue — "install" is informal, not a formal MSIX concept.

## Notes

- Additional requirements: packaged apps need the VCLibs framework package; unpackaged apps need the Visual C++ Redistributable; C# apps need the .NET runtime.
- When a new Framework package version is serviced, all framework-dependent apps get it automatically on relaunch — no redistribution needed. Older versions stay until no longer in use.
- The Singleton package enables push notifications for unpackaged apps and packaged Win32 apps on Windows versions below 20H1.

## Related

- [Deployment Guide for Packaged Apps](./deploy-packaged-apps.md)
- [Deployment Guide for Unpackaged Apps](./deploy-unpackaged-apps.md)
- [Deployment Overview](./deploy-overview.md)
