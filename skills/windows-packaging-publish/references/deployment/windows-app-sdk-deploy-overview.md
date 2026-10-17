# Windows App SDK Deployment Overview (Framework-dependent vs Self-contained, ARM64 / Arm64EC)

The Windows App SDK can be deployed framework-dependent (default; depends on the runtime and/or Framework package on the target machine) or self-contained (app carries the dependencies). Also covers initialization per packaging mode and x64 / ARM64 architecture considerations.

## Signature / Usage

Self-contained publish per architecture (commands as in the source). Making the Windows App SDK itself self-contained additionally requires `<WindowsAppSDKSelfContained>true</WindowsAppSDKSelfContained>` in the project; `--self-contained true` covers the .NET runtime only:

```powershell
dotnet publish -c Release -r win-x64 --self-contained true
dotnet publish -c Release -r win-arm64 --self-contained true
```

## Options / Props

| | Framework-dependent | Self-contained |
| --- | --- | --- |
| Advantages | Small deployment; runtime and Framework package installed automatically for packaged apps (or via the runtime installer for external-location / unpackaged apps); serviceable via the Framework package. | You control the Windows App SDK version; isolated from other apps; xcopy deployment. |
| Disadvantages | Extra installation dependencies; shared dependencies can be uninstalled; compatibility risk from servicing updates. | Larger deployments and slower load / more memory (unpackaged apps only); not serviceable except by releasing a new app version. |

Initialization:

| App type | Framework-dependent | Self-contained |
| --- | --- | --- |
| Packaged | Call the Deployment API | No initialization necessary |
| Unpackaged / packaged with external location | Use the bootstrapper API | Opt out of (or into) automatic UndockedRegFreeWinRT support |

Arm64 approaches:

| Approach | Best for | Trade-off |
| --- | --- | --- |
| Full ARM64 recompile | Pure .NET apps, small C++ projects | Best performance; all dependencies must be ARM64-compatible |
| Arm64EC | Large C/C++ apps, apps with x64-only plugins or third-party DLLs | Incremental migration; emulated portions run slower |
| x64 only (emulated) | Apps that can't be recompiled | Simplest; reduced battery life, higher latency on ARM64 |

## Notes

- The source shows only `dotnet publish ... --self-contained true` and delegates Windows App SDK self-containment to a separate guide; the `WindowsAppSDKSelfContained` requirement above comes from that guide (see windows-app-sdk-self-contained-deploy.md), not from this page.
- `PublishSingleFile` (single-file EXE) is supported only for unpackaged, self-contained WinUI 3 apps (Windows App SDK 1.5 and later); packaged and framework-dependent apps don't support it.
- You must include binaries for each processor architecture your users need, in both deployment modes. For MSIX, create an `.msixbundle` with both `x64` and `ARM64` (Visual Studio generates it when building multiple platforms; the Store and App Installer select the architecture). For C++/WinRT build separate `x64` and `ARM64` configurations. Framework-dependent apps using the runtime installer need the architecture-specific installer (x64 and ARM64 are separate).
- Arm64EC lets x64 and ARM64 code mix in one process.
- Prism emulation on Windows 11 ARM64: x64 emulation is available on Windows 11 ARM64 only (not Windows 10 on ARM); x86 emulation on both Windows 10 and 11 ARM64. Native ARM64 builds are strongly recommended for production apps.
- For Store submissions upload architecture-specific packages or a bundle; the Store delivers only the matching architecture.
- Source: https://learn.microsoft.com/en-us/windows/apps/package-and-deploy/deploy-overview, last updated 2026-10-02 (ms.date).

## Related

- [Windows App SDK deployment architecture](./windows-app-sdk-deployment-architecture.md)
- [Self-contained deployment](./windows-app-sdk-self-contained-deploy.md)
- [Packaged apps deployment](./windows-app-sdk-deploy-packaged-apps.md)
- [Unpackaged apps deployment](./windows-app-sdk-deploy-unpackaged-apps.md)
- [Project properties](./windows-app-sdk-project-properties.md)
