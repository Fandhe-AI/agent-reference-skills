# Sign Your MSIX Package: End-to-End Guide (WinApp CLI, MSBuild, Artifact Signing, OV)

Stage-by-stage guide to signing MSIX packages: self-signed certificates for development and testing, build-time signing with MSBuild, Azure Artifact Signing (formerly Trusted Signing) or an OV certificate for production, and Store signing on submission.

## Signature / Usage

Development signing with the WinApp CLI (self-signed certificate):

```powershell
winget install -e --id Microsoft.WinAppCLI --source winget
winapp cert generate --manifest .\appxmanifest.xml --output .\devcert.pfx --install
winapp sign MyApp.msix --cert .\devcert.pfx
```

Production signing with Azure Artifact Signing (SignTool + dlib plugin):

```powershell
winget install -e --id Microsoft.Azure.ArtifactSigningClientTools

signtool sign /v /fd SHA256 `
  /tr "https://timestamp.acs.microsoft.com" /td SHA256 `
  /dlib "C:\Program Files (x86)\Microsoft\ArtifactSigningClientTools\bin\Azure.CodeSigning.Dlib.dll" `
  /dmdf .\metadata.json `
  MyApp.msix
```

`metadata.json` (endpoint must match the account's Azure region, shown as **Account URI** in the portal):

```json
{
  "Endpoint": "https://<region>.codesigning.azure.net/",
  "CodeSigningAccountName": "<your-account-name>",
  "CertificateProfileName": "<your-certificate-profile-name>"
}
```

Build-time signing with MSBuild using a certificate in the store:

```cmd
msbuild MyApp.wapproj /p:Configuration=Release /p:Platform=x64 ^
  /p:AppxPackageSigningEnabled=true ^
  /p:PackageCertificateThumbprint=<thumbprint> ^
  /p:AppxPackageSigningTimestampServerUrl=http://timestamp.digicert.com ^
  /p:AppxPackageSigningTimestampDigestAlgorithm=SHA256
```

OV certificate (PFX from a CA):

```powershell
SignTool sign /fd SHA256 /a /f .\cert.pfx /p "YourPassword" `
  /tr http://timestamp.digicert.com /td SHA256 `
  MyApp.msix
```

## Options / Props

Signing approach by stage:

| Stage | Recommended approach | Windows version |
| --- | --- | --- |
| Local development and testing | WinApp CLI (self-signed cert) | Windows 10 and later |
| Distribute to testers (sideloading) | Self-signed cert with cert trust step | Windows 10 and later |
| Production distribution | Azure Artifact Signing (formerly Trusted Signing) | Windows 10 version 1809 and later, Windows Server 2016 and later |
| Microsoft Store distribution | Signed by the Store on submission | All supported Windows versions |

MSBuild properties for build-time signing (Windows Application Packaging Projects `.wapproj` and single-project MSIX apps):

| MSBuild property | Description |
| --- | --- |
| `AppxPackageSigningEnabled` | Set to `true` to sign the package during the build. |
| `PackageCertificateThumbprint` | Thumbprint of a certificate in the current user's Personal store (`Cert:\CurrentUser\My`). |
| `PackageCertificateKeyFile` | Path to a `.pfx` file, when the certificate isn't installed in the store. |
| `PackageCertificatePassword` | Password for the `.pfx` file, if password-protected. |
| `AppxPackageSigningTimestampServerUrl` | Timestamp server URL. Timestamping is strongly recommended so the signature stays valid after the certificate expires. |
| `AppxPackageSigningTimestampDigestAlgorithm` | Timestamp digest algorithm. Use `SHA256`. |

## Notes

- The Windows App Development CLI (WinApp CLI) is in public preview and requires Windows 10 with WinGet installed. `--manifest` reads the publisher from `appxmanifest.xml`; `--install` adds the certificate to the local machine trust store.
- PowerShell + SignTool alternative for self-signed certs: `New-SelfSignedCertificate` (elevated; `Subject` must exactly match the manifest `Publisher`, e.g. `-Type Custom -KeyUsage DigitalSignature -Subject "CN=MyPublisher" -CertStoreLocation "Cert:\CurrentUser\My" -TextExtension @("2.5.29.37={text}1.3.6.1.5.5.7.3.3", "2.5.29.19={text}")`), then `Export-PfxCertificate`, `Import-PfxCertificate -CertStoreLocation "Cert:\LocalMachine\TrustedPeople"`, and `SignTool sign /fd SHA256 /a /f .\devcert.pfx /p "YourPassword" MyApp.msix`.
- Self-signed packages install only where the certificate is trusted. Distribute to testers only the public-key-only `.cer`, which they trust in an elevated PowerShell with `Import-Certificate -CertStoreLocation "Cert:\LocalMachine\TrustedPeople" -FilePath .\devcert.cer`. The source page also allows sharing the `.pfx` with its password, but a `.pfx` contains the private key and lets the recipient sign packages as the same publisher; keep the `.pfx` on the signing machine (`Import-PfxCertificate` is for the signing environment only). Remove test certificates when no longer needed; use them for testing only.
- Sideloading is enabled by default on Windows 10 version 2004 and later and Windows 11. On earlier Windows 10 versions, enable **Sideload apps** in Settings > Update & Security > For developers.
- MSBuild: specify either `PackageCertificateThumbprint` or `PackageCertificateKeyFile`, not both. On a CI agent, prefer installing the certificate to the store and referencing the thumbprint so no password is passed on the command line. In Visual Studio, configure the certificate once on the Package.appxmanifest > Packaging tab; Visual Studio saves the equivalent properties.
- With Azure Artifact Signing or Azure Key Vault the private key never leaves the service: build unsigned with `/p:AppxPackageSigningEnabled=false`, then sign the produced `.msix` as a post-build step (SignTool with the dlib plugin, or Azure Key Vault signing).
- Azure Artifact Signing is the new name of Trusted Signing; the service is identical. "Trusted Signing" still appears in some tooling (e.g. the `azure/trusted-signing-action` GitHub Action and the role name "Trusted Signing Certificate Profile Signer").
- Availability: organizations in the USA, Canada, the European Union, and the United Kingdom can sign up; individual developers are currently limited to the USA and Canada. Others should use an OV certificate.
- Prerequisites: an Artifact Signing account with identity validation completed and a certificate profile created, and the Trusted Signing Certificate Profile Signer role assigned to the signing identity.
- The Artifact Signing Client Tools bundle the dlib plugin, a compatible SignTool, and the .NET 8 runtime. Standard SignTool syntax does not work with Artifact Signing without this package. Without WinGet (e.g. Windows Server build agent), install the MSI `ArtifactSigningClientTools.msi` from download.microsoft.com with `msiexec.exe /I ArtifactSigningClientTools.msi /quiet`.
- Authenticate with `AZURE_CLIENT_ID` / `AZURE_TENANT_ID` / `AZURE_CLIENT_SECRET` environment variables (App Registration, for CI/CD) or `az login` locally. Add `/debug` to SignTool for detailed output on failures.
- GitHub Actions: `azure/trusted-signing-action@v0` (when copying, pin to a commit SHA: `azure/trusted-signing-action@1d365fec12862c4aa68fcac418143d73f0cea293 # v0`) with `azure-tenant-id`, `azure-client-id`, `azure-client-secret`, `endpoint`, `trusted-signing-account-name`, `certificate-profile-name`, `files-folder`, `files-folder-filter: msix`.
- Neither Artifact Signing nor OV certificates provide instant SmartScreen trust; reputation builds over time (typically several weeks and hundreds of clean installs for new publishers).
- Microsoft Store distribution needs no self-signing: the Store signs the package on submission via Partner Center.
- OV certificates (from CAs such as DigiCert, Sectigo, GlobalSign) typically cost $300-500/year.
- Source: https://learn.microsoft.com/en-us/windows/msix/package/sign-msix-package-guide, last updated 07/02/2026 (ms.date).

## Related

- [Azure Trusted Signing](./azure-trusted-signing.md)
- [CI/CD Pipeline Signing](./cicd-signing.md)
- [Self-Signed Certificate](./self-signed-certificate.md)
- [SignTool Sign Command](./signtool-sign.md)
- [Azure Key Vault Signing](./azure-key-vault-signing.md)
- [SmartScreen Reputation](./smartscreen-reputation.md)
