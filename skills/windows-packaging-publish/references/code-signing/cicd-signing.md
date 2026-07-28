# CI/CD Pipeline Signing (GitHub Actions, Azure Pipelines)

Signing MSIX packages as part of a build pipeline using Azure Artifact Signing (formerly Trusted Signing), via the official GitHub Action or the Azure DevOps extension. Both avoid storing a raw certificate secret directly in the pipeline; instead, credentials authenticate to the Azure signing account at build time.

## Signature / Usage

GitHub Actions, using [`azure/trusted-signing-action`](https://github.com/azure/trusted-signing-action):

```yaml
- name: Sign MSIX with Azure Artifact Signing
  uses: azure/trusted-signing-action@v0
  with:
    azure-tenant-id: ${{ secrets.AZURE_TENANT_ID }}
    azure-client-id: ${{ secrets.AZURE_CLIENT_ID }}
    azure-client-secret: ${{ secrets.AZURE_CLIENT_SECRET }}
    endpoint: ${{ secrets.AZURE_TRUSTED_SIGNING_ENDPOINT }}
    trusted-signing-account-name: ${{ secrets.AZURE_CODE_SIGNING_NAME }}
    certificate-profile-name: ${{ secrets.AZURE_CERT_PROFILE_NAME }}
    files-folder: ${{ github.workspace }}\output
    files-folder-filter: msix
```

Azure DevOps, using the **Artifact Signing** marketplace task (`AzureArtifactSigning@<version>`) after installing the extension into the organization from the Visual Studio Marketplace.

## Options / Props

| Name | Type | Description |
| --- | --- | --- |
| `azure-tenant-id` | secret | Azure AD tenant ID for the service principal used to authenticate. |
| `azure-client-id` | secret | App registration (service principal) client ID. |
| `azure-client-secret` | secret | App registration client secret. |
| `endpoint` | secret/string | Region-specific Artifact Signing account endpoint (e.g. `https://eus.codesigning.azure.net`). |
| `trusted-signing-account-name` | secret/string | Artifact Signing account name. |
| `certificate-profile-name` | secret/string | Certificate profile name within the account. |
| `files-folder` / `files-folder-filter` | string | Folder to scan for files to sign, and extension filter (e.g. `msix`). |

## Notes

- Authentication uses `DefaultAzureCredential`, which tries multiple credential sources in order (environment variables, managed identity, Azure CLI, etc.); disable unused ones via `ExcludeCredentials` in `metadata.json` when signing manually with SignTool instead of the pipeline task.
- Store `AZURE_TENANT_ID`, `AZURE_CLIENT_ID`, `AZURE_CLIENT_SECRET`, and the Artifact Signing account details as pipeline secrets (GitHub Actions repository/organization secrets, or Azure DevOps secret variables/variable groups) — never commit them to source.
- The Azure DevOps **Artifact Signing** extension must be installed from the Visual Studio Marketplace into the organization; it is not a Visual Studio IDE `.vsix` and must not be run through `VSIXInstaller.exe` on a workstation — doing so fails with a misleading `InvalidSignature` / `NullReferenceException`.
- The task runs on both Microsoft-hosted and self-hosted Azure Pipelines agents once the extension is installed at the organization level — no per-agent install required.
- For manual/scripted signing outside these two integrations, see SignTool with the Artifact Signing dlib.
- Traditional OV/EV PFX-based signing in CI/CD should treat the PFX file and its password as pipeline secrets (e.g. base64-encoded PFX stored as a secret, decoded at build time) since there's no managed identity flow for a CA-issued certificate.

## Related

- [Azure Trusted Signing](./azure-trusted-signing.md)
- [SignTool Sign Command](./signtool-sign.md)
- [SignTool Timestamp Options](./signtool-timestamp.md)
