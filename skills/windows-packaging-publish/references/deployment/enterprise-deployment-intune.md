# Enterprise Deployment with Microsoft Intune

Deploys MSIX-packaged apps to managed Windows devices through Microsoft Intune as a Windows line-of-business (LOB) app. Microsoft Store for Business/Education retired on March 31, 2023, so it is no longer a distribution path for new LOB apps.

## Signature / Usage

```powershell
# Self-signed certificate signing path (Option A) — create and export a cert for Intune distribution
$cert = New-SelfSignedCertificate -Subject "CN=MyCompany, O=MyCompany, C=US" `
    -Type CodeSigningCert -CertStoreLocation Cert:\CurrentUser\My -HashAlgorithm SHA256
Export-Certificate -Cert $cert -FilePath "MyCompanyCert.cer"
signtool sign /fd SHA256 /sha1 $cert.Thumbprint "MyApp.msix"
```

## Options / Props

| Path | Code signing | Intune configuration needed |
| --- | --- | --- |
| Self-signed cert (internal/managed devices only) | Free, but must be trusted per-device | Deploy a **Trusted Certificate** profile (destination: **Local Computer - Trusted People**) before or alongside the app |
| Azure Artifact Signing (formerly Trusted Signing) | CA-trusted, no hardware token, CI/CD-friendly | None — trusted automatically |

LOB app creation flow: **Apps > All apps > Add > Line-of-business app** → upload signed `.msix`/`.msixbundle` → set **App install context** (**Device** for machine-wide, **User** for per-user) → assign as **Required** / **Available for enrolled devices** / **Uninstall**.

Common error codes:

| Error code | Meaning |
| --- | --- |
| `0x80073CF3` | `ERROR_INSTALL_PACKAGE_DOWNGRADE` — a newer version is already installed on the device |
| `0x80073CF0` | `ERROR_INSTALL_OPEN_PACKAGE_FAILED` — package corrupted or upload interrupted |
| `0x80070005` | `E_ACCESSDENIED` — permissions or install-context mismatch (User vs. Device) |

## Notes

- Intune detects updates by the version number in the MSIX manifest (`.appxmanifest`) — increment it before each release and re-upload to the same app entry.
- **Microsoft Store for Business and Microsoft Store for Education retired on March 31, 2023** (the earlier "retiring, postponed" wording here was outdated; per the LOB distribution guide updated 2026-10-14). The enterprise association, private store, and offline Store licensing workflow they provided is no longer a distribution path for new LOB apps.
- Company Portal is the private app repository for organizations that use Intune. Add an internal app directly to Intune as a LOB app, or add an eligible public Microsoft Store app from the Store catalog in Intune.
- Partner Center "Organizational licensing" settings (including the Store-managed online licensing option) are legacy and apply only to publicly published Store apps; they do not create a private catalog. For internal private apps use Intune, Configuration Manager, App Installer, or direct sideloading. A Partner Center Private audience contains individually named personal Microsoft accounts (not Entra work or school accounts), so it is not a replacement for enterprise deployment.
- Diagnostics: `%ProgramData%\Microsoft\IntuneManagementExtension\Logs\IntuneManagementExtension.log` (LOB app deployment) and **Event Viewer > Applications and Services Logs > Microsoft > Windows > AppxDeployment-Server** (MSIX install itself).

## Related

- [Sideloading prerequisites](./sideloading-prerequisites.md)
- [Choose a distribution path](./choose-distribution-path.md)
- [Enterprise IT-Admin Deployment Tools](./enterprise-deployment-tools.md)
