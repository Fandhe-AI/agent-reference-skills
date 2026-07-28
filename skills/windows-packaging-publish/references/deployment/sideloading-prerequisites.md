# Sideloading Prerequisites

Requirements a target device must satisfy before it can sideload an MSIX app via the `.appinstaller` file or `Add-AppxPackage`.

## Signature / Usage

```powershell
# Trust a self-signed / non-CA package signing certificate on the target device
# (must be run with local administrator rights)
Import-Certificate -FilePath MyCompanyCert.cer -CertStoreLocation Cert:\LocalMachine\TrustedPeople
```

## Options / Props

| Requirement | Detail |
| --- | --- |
| Certificate trust | The certificate used to sign the package must be trusted by the device — imported into **Local Computer: Trusted People** (recommended) or **Local Computer: Trusted Root Authorities** (not recommended). |
| Windows 10 1909 and earlier | Device must be enabled for **Developer Mode** or **Sideload apps** (**Settings > Update & Security > For developers**). |
| Windows 10 version 2004+ / Windows 11 | Sideloading is enabled by default; no explicit setting required unless an enterprise policy blocks it. |
| `.appinstaller` schema support | The Windows 10 version on the device must support the `.appinstaller` file schema and distribution protocol used (see version table in troubleshooting). |

## Notes

- Do **not** import package signing certificates into the **User Certificate** store — App Installer only checks the machine (Local Computer) certificate stores when verifying package identity.
- Certificates from common public Certificate Authorities are trusted by the OS by default; only self-signed or internally-issued certificates require this manual/managed trust step.
- In managed enterprise environments, Intune can push a **Trusted Certificate** configuration profile to distribute a self-signed certificate's trust automatically, instead of manual `Import-Certificate` per device.

## Related

- [App Installer troubleshooting](./app-installer-troubleshooting.md)
- [Deploy MSIX apps with Microsoft Intune](./enterprise-deployment-intune.md)
- [App Installer file overview](./app-installer-file-overview.md)
