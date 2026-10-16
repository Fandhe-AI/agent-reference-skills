# Code Signing

| Name | Description | Path |
| --- | --- | --- |
| Signing with a Certificate in Azure Key Vault | Signs an app package with a certificate whose private key never leaves the vault | [azure-key-vault-signing.md](./azure-key-vault-signing.md) |
| Azure Trusted Signing (Azure Artifact Signing) | Microsoft's managed code signing service for MSIX packages outside the Store | [azure-trusted-signing.md](./azure-trusted-signing.md) |
| Certificate Types for Code Signing | Comparison of certificate options for signing Windows apps | [certificate-types.md](./certificate-types.md) |
| CI/CD Pipeline Signing (GitHub Actions, Azure Pipelines) | Signs MSIX packages in a build pipeline using Azure Artifact Signing | [cicd-signing.md](./cicd-signing.md) |
| Device Guard Signing (DGSS v2) | Retired enterprise code signing service; historical reference | [device-guard-signing.md](./device-guard-signing.md) |
| Sign Your MSIX Package: End-to-End Guide (WinApp CLI, MSBuild, Artifact Signing, OV) | Stage-by-stage guide to signing MSIX packages | [msix-signing-guide.md](./msix-signing-guide.md) |
| MSIX Package Signing Requirements | Windows requires every MSIX package to be signed with a valid certificate | [msix-signing-requirements.md](./msix-signing-requirements.md) |
| Self-Signed Certificate Creation | Creating and trusting a self-signed code signing certificate | [self-signed-certificate.md](./self-signed-certificate.md) |
| Signing Errors and Troubleshooting | Common SignTool signing failures for MSIX packages and their causes | [signing-troubleshooting.md](./signing-troubleshooting.md) |
| SignTool sign | `signtool sign` digitally signs an MSIX/APPX package or bundle | [signtool-sign.md](./signtool-sign.md) |
| SignTool Timestamp Options | Specifying a timestamp server when signing or timestamping | [signtool-timestamp.md](./signtool-timestamp.md) |
| SignTool verify | `signtool verify` checks the digital signature of a file | [signtool-verify.md](./signtool-verify.md) |
| SmartScreen Reputation Mechanics | Microsoft Defender SmartScreen publisher and file hash reputation | [smartscreen-reputation.md](./smartscreen-reputation.md) |
