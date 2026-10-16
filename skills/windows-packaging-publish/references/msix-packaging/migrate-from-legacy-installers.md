# Packaging Overview and Migrating from Legacy Installers

Packaging defines how an app is installed, updated, and integrated with Windows. This page compares packaged (MSIX), packaging with external location (sparse), and unpackaged models, and maps legacy installers to an MSIX migration path.

## Signature / Usage

Detect package identity at runtime and the errors seen without it (identifiers from the page; the page points to the Inside MSIX blog for C++ and C# samples):

```text
GetCurrentPackageFullName      # detect whether the process has package identity
E_ILLEGAL_METHOD_CALL          # symptom of missing package identity
APPMODEL_ERROR_NO_PACKAGE      # symptom of missing package identity
```

## Options / Props

Packaging models:

| Model | Package identity | Installer | Store eligible | Best for |
|-------|------------------|-----------|----------------|----------|
| Packaged (MSIX) | Yes | MSIX replaces installer | Yes (MSIX submission) | New apps, Store publishing, enterprise MDM |
| Packaging with external location | Yes | Your existing installer | Yes (MSI/EXE submission) | Existing apps with own installer, ISVs |
| Unpackaged | No | MSI or EXE (also XCopy or script for non-Store) | Yes (MSI/EXE submission; needs silent install support) | Broad Win32 distribution, internal tools |

Migration paths:

| Current installer | Recommended path | Source code required |
|-------------------|------------------|----------------------|
| MSI | MSIX Packaging Tool converts MSI directly; handles most patterns including custom actions | No |
| ClickOnce (.NET) | Rebuild from source with the Visual Studio MSIX packaging project; replace auto-update with Store updates or App Installer | Yes |
| InstallShield / Advanced Installer | MSIX Packaging Tool capture on a clean VM; complex custom actions may need Package Editor fixup | No |
| Inno Setup / NSIS | MSIX Packaging Tool VM-based capture workflow | No |
| App-V | MSIX Packaging Tool (supports App-V 5.x packages as input) | No |
| MSIX needing modifications | Package Support Framework runtime fixes (file/registry redirection) | No |

Scenario guidance:

| Scenario | Recommended model |
|----------|-------------------|
| Indie developer publishing to the Store | Packaged (MSIX); Store signs for free |
| Enterprise via Intune / Configuration Manager | Packaged, or external location for existing installers; sign with self-signed cert trusted via Intune / Group Policy / Configuration Manager, or Azure Artifact Signing (formerly Trusted Signing) |
| ISV direct download with own installer | External location; CA-trusted certificate required for non-Store distribution; Azure Artifact Signing recommended lower-cost option |
| Internal tool / developer utility | Unpackaged |

## Notes

- WinUI 3 apps are packaged by default.
- Features requiring package identity (full MSIX or external location) include background tasks, push notifications, share targets, custom context menu extensions, manifest-based file type and protocol associations, and Windows AI APIs.
- Packaging with external location (sparse packages) was introduced in Windows 10 version 2004 (build 19041).
- Win32 MSI/EXE Store submissions: the Store does not push updates to existing users; the app or installer must handle updates.
- Complex installers with kernel drivers, services running as SYSTEM, or machine-wide COM registrations that MSIX doesn't support: consider external location.
- MSIX itself supports session-0 (per-machine) services under LocalSystem, LocalService, or NetworkService and does not support per-user services or kernel drivers; see Prepare to Package a Desktop App.
- Run the MSIX Packaging Tool on a clean VM; plan explicit settings/data migration when running MSIX alongside a legacy install, because identity and storage locations differ.
- Framework-dependent vs self-contained Windows App SDK deployment is independent of the packaging model.
- Source: https://learn.microsoft.com/en-us/windows/apps/package-and-deploy/packaging/, last updated 2026-08-29 (ms.date).

## Related

- [MSIX Overview](./msix-overview.md)
- [MSIX Packaging Tool](./msix-packaging-tool.md)
- [Package Support Framework](./package-support-framework.md)
- [MSIX on Windows 10 and Windows 11](./msix-windows10-windows11.md)
- [Prepare to Package a Desktop App](./prepare-desktop-app-for-packaging.md)
