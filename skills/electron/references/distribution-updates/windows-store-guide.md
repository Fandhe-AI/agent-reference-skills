---
source: https://www.electronjs.org/docs/latest/tutorial/windows-store-guide
---

# Windows Store Guide

Microsoft developed a tool (`electron-windows-store`) that compiles Electron apps as `.appx` packages, enabling some of the features of the Universal Windows Platform (UWP) application model and installation/updating through the Windows Store.

## Signature / Usage

Install the CLI, then run it from an elevated PowerShell (as Administrator):

```sh
npm install -g electron-windows-store
```

```powershell
electron-windows-store `
    --input-directory C:\myelectronapp `
    --output-directory C:\output\myelectronapp `
    --package-version 1.0.0.0 `
    --package-name myelectronapp
```

## Requirements

- Windows 10 with Anniversary Update (released August 2nd, 2016)
- The Windows 10 SDK
- At least Node 4

Windows 10 Anniversary Update can run win32 `.exe` binaries with a virtualized filesystem and registry, created during compilation by running app and installer inside a Windows Container. The exe launches inside the appx model and can use many UWP APIs; an app can also pair with an invisible UWP background task launched together with the `exe`.

## Steps

1. Package the application with `@electron/packager` (or a similar tool). Remove `node_modules` you do not need to keep size down.
2. Run `electron-windows-store` from an elevated PowerShell. It flattens `node_modules`, archives the app as `app.zip`, uses an installer and a Windows Container to create an "expanded" AppX package (including `AppXManifest.xml`, virtual file system and registry), then uses `MakeAppx.exe` to create a single-file AppX package. It can also create a trusted certificate to sign the package and install it automatically.
3. Users need Windows 10 with the Anniversary Update. Packaged apps currently need a manual verification process (apply via the Desktop Bridge campaigns page); meanwhile users can install the package by double-clicking it. In managed environments the `Add-AppxPackage` PowerShell cmdlet can install it.

Optional: pair the app with an invisible UWP background task for push notifications, Cortana integration, or live tiles (see the Microsoft-provided `electron-uwp-background` sample).

Optional: convert using container virtualization. Set up the "Windows Desktop App Converter" once (`DesktopAppConverter.zip` and `BaseImage-14316.wim`):

```powershell
.\DesktopAppConverter.ps1 -Setup -BaseImage .\BaseImage-14316.wim
```

Before that, from an elevated PowerShell, ensure `Set-ExecutionPolicy bypass`; reboot and rerun if prompted.

## Notes

- Limitation: the compiled AppX package still contains a win32 executable, so it will not run on Xbox, HoloLens, or Phones.
- The Desktop App Converter reference and Windows 10 Anniversary Update era requirements are as stated in the original page for this version.
- Distance line: Electron-specific AppX packaging via `electron-windows-store` only. General MSIX packaging and Microsoft Store publishing are covered by windows-packaging-publish.

## Related

- [Code Signing](./code-signing.md)
- [Windows 10 on Arm](./windows-arm.md)
- [autoUpdater](./auto-updater.md)
