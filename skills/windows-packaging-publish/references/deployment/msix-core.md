# MSIX Core (Windows 10 1703 and Earlier)

MSIX Core is an open source project that brings MSIX installation support to Windows versions earlier than Windows 10 version 1709. Covers manifest changes, and building a ClickOnce `setup.exe` bootstrapper from source.

## Signature / Usage

Manifest `TargetDeviceFamily` entries (Windows 7 SP1 minimum plus native MSIX on 1709+):

```xml
<Dependencies>
  <TargetDeviceFamily Name="MSIXCore.Desktop" MinVersion="6.1.7601.0" MaxVersionTested="10.0.10240.0" />
  <TargetDeviceFamily Name="Windows.Desktop" MinVersion="10.0.16299.0" MaxVersionTested="10.0.18362.0" />
</Dependencies>
```

Create a ClickOnce-based `setup.exe` pointing at a hosted MSIX:

```powershell
.\setup.exe -url=<location of your msix in the webservice>
```

## Options / Props

Windows versions supported by MSIX Core:

| Name | Version |
| --- | --- |
| Windows 7, SP 1 | 6.1.7601.0 |
| Windows 8.1 (Update 1) | 6.3.9600.0 |
| Windows 10 2015 LTSB (1507) | 10.0.10240.0 |
| Windows 10 2016 LTSB (1607) | 10.0.14393.0 |
| Windows Server 2008 R2 | 6.1.7601.0 |
| Windows Server 2012 | 6.2.9200.0 |
| Windows Server 2012 R2 | 6.3.9600.0 |
| Windows Server 2016 | 10.0.14393.0 |

## Notes

- Designed for Windows 7 SP1, Windows 8.1, currently supported Windows Server (with Desktop Experience), and Windows 10 versions prior to 1709. Developers use the MSIX Core Library; IT pros use the MSIX Core Installer (command line plus double-click install).
- MSIX Core provides a subset of native MSIX features, functioning like existing Win32 installers. It doesn't provide container benefits, doesn't let Windows 10-specific features work on older versions, and has no Microsoft Store integration. App execution aliases work only from **Win+R**, not from Command Prompt or PowerShell, on down-level OS.
- Manifest: `TargetDeviceFamily` with name `MSIXCore.Desktop` and a `MinVersion` matching the OS build number; also include the Windows 10 version 1709-or-later entry. `MSIXCore.Desktop` apps deploy to Windows Server with Desktop Experience with the same build number; use `MSIXCore.Server` for server-only apps. Windows Server Core is not supported.
- Update an existing package with the MSIX Packaging Tool Package Editor (**MSIX Core Support** checkbox or manual manifest edit, then re-sign and save). From MSIX Packaging Tool version 1.2020.402.0 you can enable MSIX Core support by default (**Tool Defaults**) or per conversion.
- ClickOnce flow: host the package on a web server (Azure Web App, IIS, or AWS S3 with MIME types `.appx` = `application/appx`, `.msix` = `application/msix`), build the MSIX Core ClickOnce solution (`microsoft/msix-packaging` `MsixCore`), run the `-url` command to generate a new `setup.exe`, and re-sign it with SignTool.
- MSIX Core targets Windows 10 version 1703 and earlier; App Installer is the ideal path for 1709 and later. MSIX Core detects a 1709+ consumer and redirects to App Installer. On Microsoft Edge, `getHostEnvironmentValue()` returns an `os-build` field to choose between MSIX Core and App Installer.
- User experience: the user runs `setup.exe`; if the MSIX Core installer isn't installed, the ClickOnce prompt installs it, then the install screen for the package in the query string appears.

## Related

- [MSIX Core deployment](./msix-core-deployment.md)
- [Web install with App Installer](./web-install-app-installer.md)
