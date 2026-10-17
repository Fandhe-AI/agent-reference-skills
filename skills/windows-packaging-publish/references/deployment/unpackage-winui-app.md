# Unpackage a WinUI App

Ship a WinUI 3 app without MSIX (enterprise scenarios or folder-based installs) by setting `WindowsPackageType` to `None`.

## Signature / Usage

C# (`.csproj`):

```xml
<PropertyGroup>
  <WindowsPackageType>None</WindowsPackageType><!-- add this -->
  <OutputType>WinExe</OutputType>
  <TargetFramework>net8.0-windows10.0.19041.0</TargetFramework>
</PropertyGroup>
```

C++ (`.vcxproj`, `PropertyGroup Label="Globals"`):

```xml
<AppxPackage>false</AppxPackage><!-- update this -->
<WindowsPackageType>None</WindowsPackageType><!-- add this -->
```

Single-file EXE (unpackaged and self-contained, Windows App SDK 1.5 and later):

```xml
<PropertyGroup>
  <WindowsPackageType>None</WindowsPackageType>
  <WindowsAppSDKSelfContained>true</WindowsAppSDKSelfContained>
  <SelfContained>true</SelfContained>
  <EnableMsixTooling>true</EnableMsixTooling>
  <IncludeAllContentForSelfExtract>true</IncludeAllContentForSelfExtract>
  <PublishSingleFile>true</PublishSingleFile>
</PropertyGroup>
```

## Options / Props

| Runtime option | Description |
| --- | --- |
| Windows App SDK runtime installer (`.exe`), recommended | Bundle the redistributable installer with your own installer or setup script; run once by users. Later app updates don't need reinstalling unless the required Windows App SDK version changes. |
| Self-contained (`<WindowsAppSDKSelfContained>true</WindowsAppSDKSelfContained>`) | Bundles the runtime into the output folder; no separate install, but a significantly larger output and each update carries the full runtime. |

## Notes

- Limitations: the Windows App SDK runtime must be present (or self-contained); no package identity, so no automatic updates via App Installer or Store, no background task registration, no file type associations / protocol handlers / Start menu tile customization via the manifest (traditional Win32 registry entries and shortcuts still work); not eligible as an MSIX Store submission (a traditional MSI / EXE installer submission is a separate workflow).
- Visual Studio: select the **Unpackaged** launch profile; with the **Package** profile you get a deployment error. For C++ the Start drop-down changes from Local Machine to Local Windows Debugger.
- `WindowsPackageType=None` makes the auto-initializer find and load the most appropriate Windows App SDK; for custom error handling or a specific version call the bootstrapper API explicitly.
- `PublishSingleFile` isn't supported for packaged or framework-dependent apps. Dependencies are extracted to a temp directory at first launch (not a zero-extraction binary). If you opt out of the `WindowsAppSdkUndockedRegFreeWinRTInitialize` auto-initializer, set the `MICROSOFT_WINDOWSAPPRUNTIME_BASE_DIRECTORY` environment variable to `AppContext.BaseDirectory` before program entry. The build emits errors if `EnableMsixTooling`, `WindowsPackageType=None`, or `IncludeAllContentForSelfExtract` are missing, and warnings if `WindowsAppSDKSelfContained` or `SelfContained` are absent.
- Alternatives to single-file extraction: MSIX packaging, a traditional installer (WiX, Inno Setup), or a different framework (WPF and WinForms support `PublishSingleFile` more broadly). Packaging with external location adds package identity without full MSIX conversion.
- Source: https://learn.microsoft.com/en-us/windows/apps/package-and-deploy/unpackage-winui-app, last updated 2026-10-02 (ms.date).

## Related

- [Windows App SDK deployment overview](./windows-app-sdk-deploy-overview.md)
- [Deploy unpackaged apps](./windows-app-sdk-deploy-unpackaged-apps.md)
- [Self-contained deployment](./windows-app-sdk-self-contained-deploy.md)
- [Project properties](./windows-app-sdk-project-properties.md)
