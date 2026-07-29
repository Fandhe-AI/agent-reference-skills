# Signing with a Certificate in Azure Key Vault

Signs an app package (or any PE/PKCS file) using a certificate whose private key never leaves Azure Key Vault. Visual Studio 2022 17.8+ can select an Azure Key Vault certificate directly from the **Create App Packages** wizard; **AzureSignTool** is the equivalent community CLI for scripted/CI signing where SignTool's own AKV support doesn't apply. Both send the file's digest to Key Vault for cryptographic signing and receive the signed digest back — this is a distinct workflow from Azure Artifact Signing (formerly Azure Trusted Signing), which is a separate managed certificate-issuance service, not a Key Vault-based signing tool.

## Signature / Usage

Install AzureSignTool as a .NET global tool (or via `winget install vcsjones.azuresigntool`):

```console
dotnet tool install --global AzureSignTool
```

Sign with a service principal (client ID/tenant ID/secret):

```console
AzureSignTool sign -fd sha256 ^
  -kvu https://my-vault.vault.azure.net ^
  -kvi <client-id> -kvt <tenant-id> -kvs <secret> ^
  -kvc my-signing-cert ^
  -tr http://timestamp.digicert.com -td sha256 ^
  MyApp.msix
```

Sign using an ambient Managed Identity instead of explicit credentials (typical in Azure-hosted CI agents):

```console
AzureSignTool sign -fd sha256 -kvu https://my-vault.vault.azure.net -kvm -kvc my-signing-cert MyApp.msix
```

## Options / Props

| Name | Type | Description |
| --- | --- | --- |
| `-kvu, --azure-key-vault-url` | URL | Key Vault URL, e.g. `https://my-vault.vault.azure.net`. |
| `-kvc, --azure-key-vault-certificate` | string | Name of the certificate in the vault to sign with. |
| `-kvi, -kvt, -kvs` | string | Client ID, tenant ID, and client secret for a service principal — one of three supported authentication methods. |
| `-kva, --azure-key-vault-accesstoken` | string | Pre-generated Azure AD access token — alternative authentication method. |
| `-kvm, --azure-key-vault-managed-identity` | flag | Use the ambient Managed Identity of the host instead of explicit credentials — alternative authentication method. |
| `-fd, --file-digest` | string | File digest algorithm: `sha1`, `sha256` (default), `sha384`, `sha512`. |
| `-tr, --timestamp-rfc3161` | URL | RFC 3161 timestamp server URL. |
| `-td, --timestamp-digest` | string | Timestamp digest algorithm (default `sha256`). |
| `-du, --description-url` | URL | URL with information about the signed content. |
| `-ifl, --input-file-list` | path | Text file listing multiple files to sign in one invocation. |
| `-v, --verbose` | flag | Detailed logging. |

## Notes

- The private key never leaves Key Vault — AzureSignTool and Visual Studio's AKV signing both send a digest to the vault and receive back a signed digest, rather than exporting the key material.
- Visual Studio's built-in AKV signing (Create App Packages wizard → **Select from Azure Key Vault...**) requires access policies on the vault granting the signing account **Get**/**List** on both Certificate and Secret permissions, and only accepts a certificate actually imported into the vault — the vault's own auto-generated default certificate does not work for code signing.
- For CI/CD, authenticate with `DefaultAzureCredential` (service principal or managed identity) rather than an interactive Visual Studio sign-in.
- AzureSignTool is an independent open-source project (`vcsjones/AzureSignTool`), unrelated to and not a client for Azure Artifact Signing/Trusted Signing — use `azure-trusted-signing.md`'s dlib-based flow for that service instead.
- SmartScreen reputation building for AKV-signed files follows the same OV-certificate model described in `certificate-types.md` and `smartscreen-reputation.md` — Key Vault changes where the private key lives, not the reputation model.

## Related

- [Azure Trusted Signing (Azure Artifact Signing)](./azure-trusted-signing.md)
- [SmartScreen Reputation](./smartscreen-reputation.md)
- [SignTool Sign Command](./signtool-sign.md)
- [Certificate Types](./certificate-types.md)
- [CI/CD Signing](./cicd-signing.md)
