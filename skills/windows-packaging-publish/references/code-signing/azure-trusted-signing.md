# Azure Trusted Signing (Azure Artifact Signing)

Microsoft's managed code signing service — renamed **Azure Artifact Signing**, formerly **Azure Trusted Signing** — is the recommended option for signing MSIX packages distributed outside the Microsoft Store. Reputation accumulates against your verified publisher identity rather than a single certificate, certificates are short-lived (issued daily, valid ~3 days), and it integrates directly with SignTool and CI/CD pipelines without a hardware token.

## Signature / Usage

Install the client tools (dlib plugin, compatible SignTool, .NET 8 runtime):

```powershell
winget install -e --id Microsoft.Azure.ArtifactSigningClientTools
```

Create `metadata.json` with your account details (endpoint must match the account's Azure region):

```json
{
  "Endpoint": "https://<region>.codesigning.azure.net/",
  "CodeSigningAccountName": "<your-account-name>",
  "CertificateProfileName": "<your-certificate-profile-name>",
  "CorrelationId": "<Optional CorrelationId value>"
}
```

Authenticate (App Registration credentials for CI/CD, or `az login` for interactive local signing):

```powershell
$env:AZURE_CLIENT_ID     = "<your-client-id>"
$env:AZURE_TENANT_ID     = "<your-tenant-id>"
$env:AZURE_CLIENT_SECRET = "<your-client-secret>"
```

Sign with SignTool using the Artifact Signing dlib plugin and RFC 3161 timestamp:

```console
signtool sign /v /debug /fd SHA256 ^
  /tr "http://timestamp.acs.microsoft.com" /td SHA256 ^
  /dlib "C:\Program Files (x86)\Microsoft\ArtifactSigningClientTools\bin\Azure.CodeSigning.Dlib.dll" ^
  /dmdf metadata.json ^
  MyApp.msix
```

## Options / Props

| Name | Type | Description |
| --- | --- | --- |
| `/dlib <DLL>` | path | Points SignTool at `Azure.CodeSigning.Dlib.dll`, the plugin implementing `AuthenticodeDigestSign` for the service. A standard Windows SDK SignTool invocation without this plugin will not work. |
| `/dmdf <Path>` | path | Path to `metadata.json` describing the Artifact Signing account/certificate profile to sign with. |
| `Endpoint` (JSON) | string | Region-specific account endpoint, e.g. `https://eus.codesigning.azure.net` (East US), `https://weu.codesigning.azure.net` (West Europe), `https://jpe.codesigning.azure.net` (Japan East). A region mismatch commonly causes a 403 Forbidden / internal `SignerSign()` failure. |
| `CodeSigningAccountName` (JSON) | string | Artifact Signing account name. |
| `CertificateProfileName` (JSON) | string | Certificate profile name within the account. |
| `CorrelationId` (JSON) | string, optional | Opaque value to correlate sign requests with your own build/workflow identifiers. |
| `ExcludeCredentials` (JSON) | string[], optional | Disables specific `DefaultAzureCredential` authentication methods (e.g. `EnvironmentCredential`, `AzureCliCredential`) so only the intended one is attempted. |

## Prerequisites

- An Artifact Signing account with identity validation completed and a certificate profile created.
- The **Trusted Signing Certificate Profile Signer** (Artifact Signing Certificate Profile Signer) role assigned to the signing identity.
- Windows 10 version 1809 or later, Windows 11 (all versions), or Windows Server 2016 or later.
- Windows SDK SignTool.exe minimum version 10.0.2261.755 (the 20348 Windows SDK version is not supported with this dlib).
- .NET 8 Runtime matching the SignTool architecture (x86/x64), plus the Microsoft Visual C++ Redistributable.

## Notes

- Eligibility: organizations in the USA, Canada, the EU, and the UK can sign up; individual developers are limited to the USA and Canada. Organizations must have a verifiable tax history of three or more years.
- Does **not** provide instant SmartScreen trust — reputation builds over weeks of clean installs, same as an OV certificate.
- Certificates are issued daily and valid for about 3 days, so timestamping (`/tr http://timestamp.acs.microsoft.com /td SHA256`) is effectively required for continued validation.
- **AzureSignTool** is a separate, unrelated community tool for signing with certificates stored in Azure Key Vault directly — it does not support Artifact Signing.
- Use `/debug` for detailed diagnostic output (certificate chain, authentication details) when signing fails.

## Related

- [SignTool Sign Command](./signtool-sign.md)
- [SignTool Timestamp Options](./signtool-timestamp.md)
- [CI/CD Signing](./cicd-signing.md)
- [Certificate Types](./certificate-types.md)
- [Signing Troubleshooting](./signing-troubleshooting.md)
