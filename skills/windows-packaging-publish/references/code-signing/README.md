# Code Signing

| Name | Description | Path |
| --- | --- | --- |
| MSIX Package Signing Requirements | Signing/trust model for MSIX packages, bundles, timestamping, sideloading modes | [msix-signing-requirements.md](./msix-signing-requirements.md) |
| Certificate Types | Comparison of Azure Artifact Signing, OV, EV, and self-signed certificates | [certificate-types.md](./certificate-types.md) |
| Self-Signed Certificate Creation | `New-SelfSignedCertificate` / PKI module workflow and Subject/Publisher matching | [self-signed-certificate.md](./self-signed-certificate.md) |
| SignTool sign | `signtool sign` command options for signing MSIX packages | [signtool-sign.md](./signtool-sign.md) |
| SignTool Timestamp Options | `/t`, `/tr`, `/td` timestamp server options for sign/timestamp commands | [signtool-timestamp.md](./signtool-timestamp.md) |
| SignTool verify | `signtool verify` command options (`/pa`, `/v`, catalog verification) | [signtool-verify.md](./signtool-verify.md) |
| Azure Trusted Signing (Azure Artifact Signing) | Managed signing service setup, metadata.json, SignTool integration | [azure-trusted-signing.md](./azure-trusted-signing.md) |
| CI/CD Pipeline Signing | GitHub Actions and Azure Pipelines signing with Azure Artifact Signing | [cicd-signing.md](./cicd-signing.md) |
| Device Guard Signing (DGSS v2) | Retired enterprise signing service; historical reference and successor guidance | [device-guard-signing.md](./device-guard-signing.md) |
| Signing Errors and Troubleshooting | Common SignerSign() errors, event IDs, and PE size limits | [signing-troubleshooting.md](./signing-troubleshooting.md) |
