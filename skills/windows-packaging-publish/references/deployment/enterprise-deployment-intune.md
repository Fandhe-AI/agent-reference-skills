# Enterprise Deployment with Microsoft Intune

Deploys MSIX-packaged (and, via the newer Microsoft Store integration, Win32) apps silently to managed Windows devices through Microsoft Intune — the recommended successor now that Microsoft Store for Business/Education is retiring.

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
- **Microsoft Store for Business and Education is retiring** (originally announced for March 31, 2023, postponed pending a new date); its successor is the **Microsoft Store app (new)** integration inside Intune (**Apps > All Apps > Create > Microsoft Store app (new)**), combined with the Company Portal and `winget`. Native Store client no longer brokers Entra ID authentication for enterprise app acquisition.
- Diagnostics: `%ProgramData%\Microsoft\IntuneManagementExtension\Logs\IntuneManagementExtension.log` (LOB app deployment) and **Event Viewer > Applications and Services Logs > Microsoft > Windows > AppxDeployment-Server** (MSIX install itself).

## Related

- [Sideloading prerequisites](./sideloading-prerequisites.md)
- [Choose a distribution path](./choose-distribution-path.md)
