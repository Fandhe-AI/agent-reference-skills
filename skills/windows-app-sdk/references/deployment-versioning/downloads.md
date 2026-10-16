# Downloads

Where to obtain the latest Windows App SDK runtime installers/redistributables (per release channel) and the NuGet SDK package.

## Signature / Usage

```
https://aka.ms/windowsappsdk/<minor>/<version>/windowsappruntimeinstall-<arch>.exe
https://aka.ms/windowsappsdk/<minor>/<version>/Microsoft.WindowsAppRuntime.Redist.<minor>.zip
```

Each stable/preview/experimental release publishes per-architecture (x64, x86, arm64) `.exe` installers plus a redistributable ZIP containing the installer and MSIX packages for all architectures.

## Options / Props

| Download | Description |
|---|---|
| NuGet package `Microsoft.WindowsAppSDK` | Provides the SDK APIs; included with Visual Studio WinUI 3 project templates, or installed directly into an existing project. |
| Installer (`WindowsAppRuntimeInstall.exe`) | Standalone runtime installer, available since Windows App SDK 1.0.1; installs Framework, Main, Singleton, and DDLM packages. Separate per architecture. |
| Redistributable (`Microsoft.WindowsAppRuntime.Redist`) | ZIP containing the installer and MSIX packages for all architectures (x64, x86, arm64). |

### Latest releases (page updated 2026-09-29)

| Channel | Latest | Date | Installer URL pattern |
|---|---|---|---|
| Stable | 2.5.1 | 09/16/2026 | `https://aka.ms/windowsappsdk/2.5/2.5.1/windowsappruntimeinstall-<arch>.exe` |
| Preview | 2.0.0-preview2 | 03/31/2026 | `https://aka.ms/windowsappsdk/2.0/2.0.0-preview2/windowsappruntimeinstall-<arch>.exe` |
| Experimental | 2.5.4-experimental | 09/29/2026 | `https://aka.ms/windowsappsdk/2.5/2.5.4-experimental/windowsappruntimeinstall-<arch>.exe` |

Stable 2.x versions listed: 2.5.1, 2.4.0 (08/13/2026), 2.3.1 (07/16/2026), 2.2.0 (06/09/2026), 2.1.3 (05/21/2026), 2.0.1 (04/29/2026). The redistributable ZIP is named per minor line (e.g. `Microsoft.WindowsAppRuntime.Redist.2.5.zip`).

## Notes

- Stable 1.x releases (e.g. 1.8) are no longer on the main downloads table; older releases are on the Archive of Windows App SDK downloads page.
- Three parallel channel download tables exist on the page (Stable / Preview / Experimental), each version linking to its release notes and GitHub source tag.
- Older releases are listed on a separate Archive of Windows App SDK downloads page.

## Related

- [Release Channels](./release-channels.md)
- [Deployment Guide for Unpackaged Apps](./deploy-unpackaged-apps.md)
