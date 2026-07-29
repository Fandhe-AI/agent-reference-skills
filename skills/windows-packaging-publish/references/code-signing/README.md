# Code Signing

| Name | Description | Path |
| --- | --- | --- |
| Signing with a Certificate in Azure Key Vault | Signs an app package using a certificate whose private key never leaves Azure Key Vault | [azure-key-vault-signing.md](./azure-key-vault-signing.md) |
| Azure Trusted Signing (Azure Artifact Signing) | Microsoft's managed code signing service for MSIX packages distributed outside Microsoft Store | [azure-trusted-signing.md](./azure-trusted-signing.md) |
| Certificate Types for Code Signing | Comparison of Azure Artifact Signing, OV, EV, and self-signed certificates | [certificate-types.md](./certificate-types.md) |
| CI/CD Pipeline Signing (GitHub Actions, Azure Pipelines) | Signing MSIX packages as part of a build pipeline using Azure Artifact Signing | [cicd-signing.md](./cicd-signing.md) |
| Device Guard Signing (DGSS v2) | Retired enterprise code signing service; historical reference and successor guidance | [device-guard-signing.md](./device-guard-signing.md) |
| MSIX Package Signing Requirements | Windows requires every MSIX package to be signed with a valid code signing certificate | [msix-signing-requirements.md](./msix-signing-requirements.md) |
| Self-Signed Certificate Creation | Creating and trusting a self-signed code signing certificate for MSIX package signing | [self-signed-certificate.md](./self-signed-certificate.md) |
| Signing Errors and Troubleshooting | Common SignTool signing failures for MSIX packages and their causes | [signing-troubleshooting.md](./signing-troubleshooting.md) |
| SignTool sign | `signtool sign` digitally signs an MSIX/APPX app package or bundle with a certificate | [signtool-sign.md](./signtool-sign.md) |
| SignTool Timestamp Options | Specifying a timestamp server when signing or timestamping an already-signed file | [signtool-timestamp.md](./signtool-timestamp.md) |
| SignTool verify | `signtool verify` checks the digital signature of a file | [signtool-verify.md](./signtool-verify.md) |
| SmartScreen Reputation Mechanics | Microsoft Defender SmartScreen's publisher reputation and file hash reputation signals | [smartscreen-reputation.md](./smartscreen-reputation.md) |
