# Prepare to Package a Desktop App (and Known Packaging Issues)

Checklist of desktop app behaviors to address before packaging as MSIX, plus known issues that can occur when creating a package.

## Signature / Usage

Reference a Visual C++ runtime framework package in the manifest (values copied from `FrameworkIdentity-Retail` in the framework package's `SDKManifest.xml`):

```xml
<PackageDependency Name="Microsoft.VCLibs.140.00.UWPDesktop" MinVersion="14.0.27323.0" Publisher="CN=Microsoft Corporation, O=Microsoft Corporation, L=Redmond, S=Washington, C=US" />
```

Known-issue workarounds:

```xml
<AppxGeneratePrisForPortableLibrariesEnabled>false</AppxGeneratePrisForPortableLibrariesEnabled>
<TargetDeviceFamily Name="Windows.Desktop" MinVersion="10.0.14393.351" MaxVersionTested="10.0.14393.351"/>
```

```powershell
(Get-PfxCertificate <cert_file>).Subject
```

## Options / Props

| App trait | Guidance |
|-----------|----------|
| .NET Framework earlier than 4.6.2 | Target 4.6.2+ recommended. 4.0-4.6.1 expected to run unchanged; 2.0/3.5 generally work but need the .NET Framework 3.5 feature and may have performance issues; test fully |
| Always runs elevated | Must work as the interactive user; apps requiring elevation for any functionality are not accepted in the Store |
| Windows driver | Not supported |
| User Windows service | Per-user services not supported; session-0 (per-machine) services under LocalSystem, LocalService, or NetworkService are; otherwise use a background task |
| Modules loaded in-process into processes outside the package | Not permitted (e.g. shell extensions); two apps in one package can use IPC |
| Extensions that install elsewhere | If the default install location is changed, extensions with folder restrictions fail with 0x80073D01 (ERROR_DEPLOYMENT_BLOCKED_BY_POLICY) |
| Custom AUMID | `SetCurrentProcessExplicitAppUserModelID` may only use the AUMID generated for the package; custom AUMIDs cannot be defined |
| Modifies HKLM | Creating or opening HKLM keys for modification fails with access denied; use HKCU instead |
| `ddeexec` registry subkey | Use DelegateExecute verb handlers from the Activatable* manifest extensions |
| Shares data via AppData / registry | AppData is a private store; HKLM writes go to an isolated binary, HKCU to a private per-user, per-app location; use another IPC / app data mechanism |
| Writes to install directory | Not supported; use local app data store |
| Uses current working directory | Differs from the `.LNK` shortcut value; set CWD at runtime or use a PSF fixup |
| Installer needs user interaction | Installer must run silently and install all prerequisites not in a clean OS image |
| Exposes COM objects | Packaged COM (Creators Update+) registers OOP COM/OLE servers visible outside the package; does not work for extensions reading the registry directly |
| Exposes GAC assemblies | Not visible to processes outside the package; interop such as OLE from external processes will not work |
| CRT linking | VS 2005/2008: static only; VS 2010: both; VS 2012/2013: dynamic only; VS 2015/2017: both; always link to the latest publicly available CRT; VS 2017+ dynamic linking recommended |
| Loads assemblies from WinSxS | Not supported; link statically |
| Depends on System32 / SysWOW64 DLLs | Place DLLs in `VFS\SystemX64` and `VFS\SystemX86` in the package |
| Uses VCLibs framework package | Reference VC 14.0, 12.0, or 11.0 framework packages from the Windows SDK `ExtensionSDKs` folders as dependencies; dependencies are not installed when sideloading, install the `.appx` manually |
| Custom jump list | Architecture must match the OS; do not set AppID in code (use the manifest); link targets to package executables must use an app execution alias; absolute-path assets break on update, refresh the jump list or use `Windows.UI.StartScreen.JumpList` |
| Starts utilities (PowerShell, Cmd.exe) | Avoid; blocked on Windows 10 S; use UWP APIs |
| Hosts add-ins / plug-ins | Packaged extensions are isolated from the host; consider an app service for communication |
| Generates code | Keep in memory; do not write generated code to disk (certification and Windows 10 S) |

Known issues:

| Issue | Resolution |
|-------|------------|
| MSB4018 `GenerateResource` task failed (satellite assemblies to PRI) | Set `AppxGeneratePrisForPortableLibrariesEnabled` to `false` in the first PropertyGroup of the hosting project file (temporary) |
| Blue screen 0x139 `KERNEL_SECURITY_CHECK_FAILURE` after installing certain Store apps | Windows update 14393.351 (KB3197954) fixes it; developers can set `MinVersion` / `MaxVersionTested` to `10.0.14393.351` |
| Signtool `SignerSign() Failed` (-2147024885 / 0x8007000b) | Manifest Publisher must match the certificate Subject; view it with `Get-PfxCertificate`, File Explorer Details tab, or `certutil -dump <cert_file.pfx>` |
| Bad PE certificate (0x800700C1) | Corrupt certificate in a binary; set `APPXSIP_LOG=1` and re-sign to see `File has malformed certificate: <file>` |

## Notes

- All apps submitted to the Microsoft Store must be compatible with Windows 10 S; test the package on Windows 10 S.
- Packaged apps run on a per-user install; see the internals page for file system and registry behavior.
- Source pages last updated 10/04/2023 and 07/02/2026 (ms.date).

## Related

- [How Packaged Desktop Apps Run on Windows](./packaged-desktop-app-internals.md)
- [Know Your Installer (Conversion Readiness)](./know-your-installer.md)
- [Package Support Framework](./package-support-framework.md)
- [Visual Studio Packaging Project](./vs-packaging-project.md)
