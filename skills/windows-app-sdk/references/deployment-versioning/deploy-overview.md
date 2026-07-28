# Deployment Overview

Decision-level overview of the two Windows App SDK deployment modes — framework-dependent and self-contained — with their trade-offs, initialization guidance, and multi-architecture (x64/ARM64) considerations.

## Signature / Usage

- **Framework-dependent** (default): app depends on the Windows App SDK runtime/Framework package present on the target machine.
- **Self-contained**: app carries the Windows App SDK dependencies with it; no separate runtime install needed.

## Options / Props

| | Framework-dependent | Self-contained |
|---|---|---|
| Advantages | Small deployment (runtime shared); serviceable (auto servicing updates via Framework package) | You control the Windows App SDK version deployed; isolated from other apps; xcopy deployment |
| Disadvantages | Additional install dependency; shared-dependency uninstall risk; compatibility risk from servicing updates | Larger deployment size and slower load/more memory for unpackaged apps; not serviceable (requires app rebuild) |

### Initialize the Windows App SDK

| App type | Deployment | How to initialize |
|---|---|---|
| Packaged | Framework-dependent | Call the Deployment API — see deploy-packaged-apps |
| Packaged | Self-contained | No initialization necessary |
| Unpackaged / packaged with external location | Framework-dependent | Use the bootstrapper API — see tutorial-unpackaged-deployment |
| Unpackaged / packaged with external location | Self-contained | Configure `WindowsAppSdkUndockedRegFreeWinRTInitialize` as needed |

## Notes

- `PublishSingleFile` (single-file EXE) requires the app to be both unpackaged and self-contained; not supported for packaged or framework-dependent apps.
- Architecture: ship binaries for each target architecture (x64, ARM64). Native ARM64 is recommended over x64 emulation ("Prism") for performance/battery, especially for on-device AI workloads on Copilot+ PCs. Arm64EC allows incremental migration of large C/C++ codebases by mixing x64 and native ARM64 code in one process.
- `dotnet publish -r win-x64 --self-contained true` / `-r win-arm64 --self-contained true` publishes per-architecture self-contained builds.

## Related

- [Deployment Architecture](./deployment-architecture.md)
- [Self-Contained Deployment](./deploy-self-contained-apps.md)
- [Deployment Guide for Packaged Apps](./deploy-packaged-apps.md)
- [Deployment Guide for Unpackaged Apps](./deploy-unpackaged-apps.md)
