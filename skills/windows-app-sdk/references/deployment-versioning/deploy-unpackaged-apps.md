# Deployment Guide for Unpackaged Apps

Guidance for deploying framework-dependent apps that are packaged with external location, or fully unpackaged: deploying the Windows App SDK runtime via installer or direct MSIX packages, and runtime requirements (Bootstrapper, Dynamic Dependencies).

## Signature / Usage

Two options to deploy the Windows App SDK runtime:

- **Option 1 — Installer**: run the standalone `WindowsAppRuntimeInstall.exe` (separate per architecture: x86/x64/Arm64).

```console
WindowsAppRuntimeInstall.exe --quiet
WindowsAppRuntimeInstall.exe --force
```

- **Option 2 — Direct MSIX install**: your own setup/MSI installs the MSIX packages directly, checking prior installation via `PackageManager.FindPackagesForUserWithPackageTypes`.

## Options / Props

| Item | Description |
|---|---|
| `--quiet` | Suppresses all installer text output/UI. |
| `--force` | Force-updates MSIX packages, shutting down running Windows App SDK processes (introduced 1.1). |
| `--h` | Lists all installer command-line options. |

### Installer return codes

| Return code | Description |
|---|---|
| 0x0 | Success. |
| 0x80073d06 | One or more packages failed to install. |
| 0x80070005 | Not elevated / user lacks admin privileges for system-wide install. |

### Architecture composition (packages required per system)

| System | Framework | Main/Singleton | DDLM |
|---|---|---|---|
| x86 | x86 | x86 | x86 |
| x64 | x86, x64 | x64 | x86, x64 |
| arm64 | x86, x64, arm64 | arm64 | x86, x64, arm64 |

## Notes

- Experimental/preview versions require sideloading enabled (**Settings > Privacy & security > For developers > Developer mode**).
- Additional prerequisites: Visual C++ Redistributable; .NET 6+ for C# apps.
- Runtime requirement: unpackaged apps must call the Bootstrapper API before using WinUI 3, App lifecycle, MRT Core, or DWriteCore features — see the bootstrapper API guide.
- The Dynamic Dependencies API lets unpackaged apps reference other framework packages (e.g. DirectX) beyond the Windows App SDK.
- Deploying `.winmd` metadata files alongside the app is recommended unless size is a strong concern.

## Related

- [Use the Windows App SDK Runtime (Bootstrapper API)](./use-windows-app-sdk-run-time.md)
- [Tutorial: Bootstrapper API in an Unpackaged App](./tutorial-unpackaged-deployment.md)
- [Deployment Architecture](./deployment-architecture.md)
- [Downloads](./downloads.md)
