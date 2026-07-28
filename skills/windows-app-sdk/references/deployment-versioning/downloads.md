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

## Notes

- Three parallel channel download tables exist on the page (Stable / Preview / Experimental), each version linking to its release notes and GitHub source tag.
- Older releases are listed on a separate Archive of Windows App SDK downloads page.

## Related

- [Release Channels](./release-channels.md)
- [Deployment Guide for Unpackaged Apps](./deploy-unpackaged-apps.md)
