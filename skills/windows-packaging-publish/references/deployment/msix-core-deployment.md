# Deploy with MSIX Core (Configuration Manager, Troubleshooting)

Install, query, and remove MSIX packages on down-level Windows with `msixmgr.exe`, deploy MSIX Core and MSIX Core apps through Microsoft Configuration Manager, and troubleshoot error codes.

## Signature / Usage

```powershell
# Trust the signing certificate (elevated prompt)
certutil -addstore root <insert certificate.cert>

# Install (-quietUX hides the installer UI)
msixmgr.exe -AddPackage C:\NotePadPlus\notepadplus.msix -quietUX

# Query by package full name / family name; * and ? wildcards supported
msixmgr.exe -FindPackage *padplus_0.0.*

# Uninstall
msixmgr.exe -RemovePackage notepadplus_0.0.0.1_x64__8wekyb3d8bbwe -quietUX
```

## Options / Props

Error codes (common):

| Error code | Description |
| --- | --- |
| 0x8BAD0042 | Certificate the app was signed with isn't installed (CertNotTrusted). Install the certificate and retry. |
| 0x80070032 | Package contains unsupported items, e.g. Package Support Framework features such as a script run at end of install, scripts set to run once = false, or badly formatted PSF. |
| 0x8BAD0071 | Attempting to install a bundle; MSIX Core doesn't support bundles. |
| 0x8BAD0031 - 0x8BAD0037 | Package format: MissingAppxSignatureP7X, MissingContentTypesXML, MissingAppxBlockMapXML, MissingAppxManifestXML, DuplicateFootprintFile, UnknownFileNameEncoding, DuplicateFile. |
| 0x8BAD0001 - 0x8BAD0005 | File issues: FileOpen, FileSeek, FileRead, FileWrite (listed as 0x8BAD0003 in the source), FileCreateDirectory, FileSeekOutOfRange. |
| 0x8BAD0041 / 0x8BAD0042 / 0x8BAD0043 | SignatureInvalid / CertNotTrusted / PublisherMismatch. |
| 0x8BAD0011 - 0x8BAD0017 | Zip errors (central directory header, local file header, Zip64 records, hidden data, bad extended data). |
| 0x8BAD0051 / 0x8BAD0052 | BlockMapSemanticError / BlockMapInvalidData. |
| 0x8BAD0061 | AppxManifestSemanticError. |
| 0x8BAD0081 / 0x8BAD0082 / 0x8BAD0083 | DeflateWrite / DeflateInitialize / DeflateRead. |
| 0x8BAD1001 - 0x8BAD1004 | XmlWarning / XmlError / XmlFatal / XmlInvalidData. |

Tracing: download `msixtrace.ps1` from the MSIX-Core-1.1 release page and run `msixtrace.ps1 -wait`, or `msixtrace.ps1 -start`, install the package, then `msixtrace.ps1 -stop`.

## Notes

- Prefer the MSI installers `msixmgrSetup-x64.msi` / `msixmgrSetup-86.msi` (names as in the source; they may change by version): they add `msixmgr.exe` to the search path and associate the MSIX extension. Choose the architecture matching the device.
- MSIX packages must be signed; install the signing certificate first, under Trusted Root Certification Authority in all scenarios. `msixmgr.exe` is intended for system administrators and most useful from an administrator prompt.
- ConfigMgr, MSIX Core application: download MSIX Core x86/x64 MSI to a share, create an application of type **Windows Installer (*.msi file)** with deployment types named "... - 64-bit" / "... - 32-bit" and a Device > Operating System requirement (for example Windows 7 64-bit / 32-bit), then **Distribute Content** to distribution points.
- ConfigMgr, MSIX Core-enlightened app: create an application with a **Script Installer** deployment type named with a " - MSIXCore" suffix; installation program `"C:\Program Files\msixmgr\msixmgr.exe" -AddPackage "[Application.msix]" -quietUX` (the source quotes the whole command line including arguments; that form would be read as one executable path, so it is corrected here to quote only the executable path, as in the uninstall example), uninstall `"C:\Program Files\msixmgr\msixmgr.exe" -RemovePackage [Package Family Name] -quietUX`; detect with a PowerShell script that runs `msixmgr.exe -FindPackage [Package Family Name]*` and returns 1 when it yields an array; install behavior **Install for User**, visibility **Hidden**; add a dependency group **MSIX Core** (32-bit and 64-bit deployment types); optionally add a second non-MSIX Core deployment type of type **Windows app package** for native MSIX systems.
- Other error codes: see system error codes and `MsixErrors.hpp` in `microsoft/msix-packaging`.
- Sources: https://learn.microsoft.com/en-us/windows/msix/msix-core/deploy-with-msix-core, last updated 12/19/2019 (ms.date); https://learn.microsoft.com/en-us/windows/msix/msix-core/deploy-msix-core-with-configmgr, last updated 03/02/2020 (ms.date); https://learn.microsoft.com/en-us/windows/msix/msix-core/deploy-msix-core-app-with-configmgr, last updated 03/02/2020 (ms.date); https://learn.microsoft.com/en-us/windows/msix/msix-core/msixcore-troubleshoot, last updated 11/15/2019 (ms.date).

## Related

- [MSIX Core](./msix-core.md)
- [Deploy with Configuration Manager](./configmgr-deployment.md)
