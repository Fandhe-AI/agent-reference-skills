# MSIX Troubleshooting Guide (Installation, Signing, Deployment Validation)

Common MSIX installation, signing, App Installer delivery, dependency, and runtime errors on Windows 10 and Windows 11, with deployment log reading and error code tables. References to `.msix` apply equally to `.msixbundle`, `.appx`, `.appxbundle`, and encrypted variants.

## Signature / Usage

Read deployment logs (Event Viewer: `Applications and Services Logs > Microsoft > Windows > AppxDeployment-Server > Operational`) and inspect the package:

```powershell
Get-AppxLog | Out-GridView
MakeAppx unpack /p "C:\path\to\app.msix" /d "C:\unpack-output"
```

## Options / Props

Common error codes:

| Error code | Name | Fix |
| --- | --- | --- |
| 0x80073CF0 | `ERROR_INSTALL_OPEN_PACKAGE_FAILED` | Verify the file exists; use a local path, not UNC; run elevated. |
| 0x80073CF3 | `ERROR_INSTALL_RESOLVE_DEPENDENCY_FAILED` | Package failed updates, dependency or conflict validation: install dependencies first, e.g. `-DependencyPath`. |
| 0x80073D06 | `ERROR_INSTALL_PACKAGE_DOWNGRADE` | Newer version installed: raise the manifest version, or use `-ForceUpdateFromAnyVersion`. |
| 0x80073CF6 | `ERROR_INSTALL_REGISTRATION_FAILURE` | `wsreset -i`, `sfc /scannow`, or Settings repair; check Event Viewer for the inner error. |
| 0x80073CF9 | `ERROR_INSTALL_FAILED` | General install failure: check Event Viewer (AppxDeployment-Server) for the inner error. Missing dependencies are installed with e.g. `Add-AppxPackage main.msix -DependencyPath dep1.msix, dep2.msix`. |
| 0x80073CFA | `ERROR_REMOVE_FAILED` | Close all app instances; inbox apps can't be removed via `Remove-AppxPackage`. |
| 0x80073CFB | `ERROR_PACKAGE_ALREADY_EXISTS` | `Get-AppxPackage <PackageName> \| Remove-AppxPackage` first. |
| 0x80073D02 | `ERROR_PACKAGES_IN_USE` | Close running instances (see below). |
| 0x8007000D | `ERROR_INVALID_DATA` | Corrupt package or manifest `Publisher` doesn't exactly match the certificate Subject; rebuild and re-sign. |
| 0x8BAD0042 | `CertNotTrusted` | Import the certificate to **Local Computer > Trusted People**. |
| 0x80070005 | `E_ACCESSDENIED` | Run with admin privileges; for all users use `Add-AppxProvisionedPackage`; check AV and ACLs. |
| 0x80070002 | `ERROR_FILE_NOT_FOUND` | A manifest-referenced file is missing; rebuild and verify with `MakeAppx unpack`. |
| 0x800B0109 | Certificate not trusted | Import the signing certificate into `Cert:\LocalMachine\TrustedPeople` (App Installer only checks the machine store). Don't import into Trusted Root unless it's a root CA. |
| 0x8007000B (Event ID 150) | Publisher name mismatch | Manifest `Publisher` must exactly match the signing certificate subject, in the same field order. |

Visual Studio / MSBuild `DEP` codes: `DEP0700` package registration failed (manifest schema error), `DEP3300` dependency not found, `DEP3301` package already registered with a different architecture.

Servicing a package in use (`ERROR_PACKAGES_IN_USE`, `0x80073D02`):

| Approach | Command / option |
| --- | --- |
| Force shutdown of the target app | `Add-AppxPackage -Path .\updated-app.msix -ForceTargetApplicationShutdown` (`AddPackageOptions.ForceTargetAppShutdown`); can terminate the app. |
| Defer registration | `Add-AppxPackage -Path .\updated-app.msix -DeferRegistrationWhenPackagesAreInUse` (`AddPackageOptions.DeferRegistrationWhenPackagesAreInUse`). |
| Defer removal | `PackageManager.RemovePackageAsync` with `RemovalOptions.DeferRemovalWhenPackagesAreInUse`. |

## Notes

- Source: https://learn.microsoft.com/en-us/windows/msix/msix-troubleshooting-guide
- The source page maps 0x80073CF3 to `ERROR_INSTALL_PACKAGE_DOWNGRADE` and 0x80073CF9 to `ERROR_INSTALL_PACKAGE_NOT_FOUND`; per winerror.h 0x80073CF3 is `ERROR_INSTALL_RESOLVE_DEPENDENCY_FAILED`, downgrade is 0x80073D06 `ERROR_INSTALL_PACKAGE_DOWNGRADE`, and 0x80073CF9 is `ERROR_INSTALL_FAILED`.
- The source page's filter example `Where-Object {$_.EventId -eq 404}` is not reproduced: event records returned by `Get-AppxLog` expose the event number as `Id`, not `EventId`; filter with `Where-Object { $_.Id -eq 404 }`.
- Installing from a UNC network share is a common cause of misleading 0x80073CF0 / 0x80070002 errors; copy the package locally first.
- On Windows 11 version 24H2 and later a package can declare `uap17:UpdateWhileInUse` with value `defer`, which takes precedence over force-shutdown options. Windows App SDK apps can call `PackageDeploymentManager.IsPackageRegistrationPending` (and `IsPackageRegistrationPendingForUser` as an administrator) to detect a deferred registration.
- `Add-AppxPackage` installs for the current user only; use `Add-AppxProvisionedPackage` for all users. An app missing from Start after a successful install may be a per-user vs per-machine issue, a refresh issue, a missing `VisualElements` / `Square150x150Logo`, or a package family name conflict.
- MinVersion or architecture mismatch: build for the target OS, or use an `.msixbundle` to serve multiple architectures.
- `.appinstaller` schema: use the minimum schema version your lowest-supported OS requires (source table: version 1709 = 1.0.0.0, 1803 = 1.1.0.0, 1809 = 1.2.0.0, 1903 and later and Windows 11 = 1.3.0.0, 1.4.0.0, 1.5.0.0). Serve `.msix` / `.msixbundle` / `.appinstaller` / `.appx` / `.appxbundle` with MIME types `application/msix`, `application/msixbundle`, `application/appinstaller`, `application/appx`, `application/appxbundle` and a valid `Content-Length` on both GET and HEAD (a generic failure such as `0x80072F76` may indicate this).
- Missing frameworks (VCLibs, .NET, Windows App SDK): install first or use `-DependencyPackages` / `-DependencyPath`; for distribution include them in `<Dependencies>` of the `.appinstaller` file. Store distribution installs dependencies automatically.
- SignTool is part of the Windows SDK and is not on CI runners by default; options include installing the SDK with winget, the WinApp CLI (`winapp sign`), or the `azure/trusted-signing-action` GitHub Action (official action despite the Artifact Signing rebranding).
- Runtime virtualization is by design: the troubleshooting guide says writes to protected paths such as `C:\Program Files\MyApp\` are redirected to `%LocalAppData%\Packages\<PackageFamilyName>\LocalCache\Local\VFS\`; `HKLM\Software` writes go to a per-package registry hive deleted on uninstall. This is too general: writes inside the package install folder (`C:\Program Files\WindowsApps\<package>`) are not allowed (see packaged-desktop-app-internals.md), and the resulting `Access denied` is fixed with the Package Support Framework File Redirection Fixup (see psf-common-fixes.md).
- Persistent data: `ApplicationData.Current.LocalFolder` persists across launches and updates but is deleted on uninstall. The troubleshooting guide calls `HKEY_CURRENT_USER\Software\<AppName>` "not virtualized and persist", but desktop-to-uwp-behind-the-scenes (packaged-desktop-app-internals.md) describes HKCU writes as copy-on-write to a per-user, per-app private location, and flexible-virtualization.md says such data is removed on uninstall. If HKCU data must survive uninstall, explicitly exclude it from virtualization (`virtualization:ExcludedKey` / `desktop6:RegistryWriteVirtualization=disabled`; see flexible-virtualization.md).
- Windows 10 limitations: auto-update 2021 schema, `uap10:PackageIntegrity` enforcement, and App Installer auto-repair need Windows 10 2004 (build 19041); the troubleshooting guide's Windows 10 vs Windows 11 table lists "Sparse package identity without full packaging" as requiring Windows 11, while packaging with external location itself is supported from Windows 10 2004 (build 19041) per supported-platforms.md / sparse-packages-external-location.md; Windows 10 before 1709 needs MSIX Core. Some manifest namespace extensions are Windows 11-only (check `MinOSVersion` in the schema reference).
- Prerequisites: signing certificate in **Local Computer > Trusted People**; Windows App SDK runtime installed unless self-contained; the App Installer app present if double-clicking an `.msix` does nothing.

## Related

- [Container runtime troubleshooting](./msix-container-runtime-troubleshooting.md)
- [Tamper protection](./tamper-protection.md)
- [App Installer troubleshooting](./app-installer-troubleshooting.md)
- [MSIX Core deployment](./msix-core-deployment.md)
- [PSF common fixes](../msix-packaging/psf-common-fixes.md)
- [Packaged desktop app internals](../msix-packaging/packaged-desktop-app-internals.md)
- [Flexible virtualization](../msix-packaging/flexible-virtualization.md)
