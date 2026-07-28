# Certificate Types for Code Signing

Comparison of the certificate options available for signing Windows apps distributed outside the Microsoft Store: Azure Artifact Signing (formerly Azure Trusted Signing), OV certificates, EV certificates, and self-signed certificates.

## Comparison at a glance

| Option | Cost | Availability | SmartScreen behavior | Store eligible | Best for |
| --- | --- | --- | --- | --- | --- |
| Microsoft Store (MSIX, Store re-signs) | Free | Worldwide | No warnings | Yes | Recommended for most new apps |
| Microsoft Store (MSI/EXE, publisher signs) | Cert chaining to Trusted Root Program CA | Worldwide | No SmartScreen prompts during Store install | Yes | Existing Win32 apps via MSI/EXE path |
| Azure Artifact Signing (formerly Trusted Signing) | ~$9.99/month | Organizations: USA, Canada, EU, UK. Individuals: USA, Canada only | Reputation builds over time; initial warnings expected | No | Recommended for non-Store distribution |
| OV certificate (e.g. DigiCert, Sectigo) | $150-300/year (up to $500/year) | Worldwide | Same as Azure Artifact Signing | No | Developers who can't use Azure Artifact Signing, or prefer a traditional CA |
| EV certificate | $400+/year | Worldwide | Same as OV since 2024 — no longer instant bypass | No | No longer recommended specifically for SmartScreen bypass |
| Self-signed certificate | Free | - | Blocks installation for public users | No | Dev/testing only, or enterprise with managed certificate trust |
| No signature | Free | - | Strong SmartScreen block; enterprises may block entirely | No | Not recommended for public distribution |

## Azure Artifact Signing (formerly Trusted Signing) — recommended for non-Store distribution

- **Cost**: approximately $9.99/month, significantly less than a traditional OV/EV certificate.
- **Identity validation**: Microsoft validates your organization or individual identity before issuing certificates; plan for a few business days.
- **No hardware token required**: integrates directly with CI/CD pipelines (GitHub Actions, Azure DevOps, and others).
- **SmartScreen**: same reputation-building model as OV certificates — new files show a SmartScreen warning until they accumulate download history. Does not provide instant SmartScreen trust.
- **Geographic limitation**: available to organizations in the USA, Canada, the EU, and the UK; individual developers limited to the USA and Canada.

## OV (Organization Validated) certificates

- Traditional CA option from providers such as DigiCert, Sectigo, or GlobalSign.
- **Cost**: typically $150-300/year (up to $500/year) depending on the CA and certificate tier.
- **Identity validation**: the CA validates your organization's legal identity; allow several business days.
- **HSM requirement**: as of June 2023, the CA/Browser Forum requires OV certificate private keys to be stored on a hardware security module (HSM) or hardware token.
- **SmartScreen**: functionally equivalent to Azure Artifact Signing — reputation accumulates per file hash over time.
- Right choice when you're outside the Azure Artifact Signing eligible regions, or your organization/customers require a specific CA relationship.

## EV (Extended Validation) certificates — no longer recommended for SmartScreen

- Previously bypassed SmartScreen entirely on first download; **that behavior was removed in 2024**. EV-signed files now go through the same reputation-building process as OV certificates.
- If you already have an EV certificate it remains valid and usable — keep using it until it expires.
- EV certificates still require more rigorous identity validation, which may matter for enterprise procurement or trust contexts, but paying the EV premium ($400+/year) solely to avoid SmartScreen warnings is no longer justified.

## Self-signed certificates — dev and testing only

- Not trusted by Windows by default; triggers a strong SmartScreen block for any user who hasn't manually installed the certificate as a trusted root.
- Appropriate uses: local development/testing (you control the machine), and enterprise internal distribution where IT deploys the certificate as a trusted root via Intune or Group Policy.
- See [Self-Signed Certificate Creation](./self-signed-certificate.md) for creation steps.

## Open source option

[SignPath Foundation](https://signpath.io) offers free OV-level code signing for qualifying open-source projects through a managed pipeline.

## Notes

- "Signing" here refers specifically to Authenticode/MSIX code signing certificates, distinct from other Windows publishing identities such as the Microsoft Store Partner Center publisher account.

## Related

- [MSIX Signing Requirements](./msix-signing-requirements.md)
- [Self-Signed Certificate Creation](./self-signed-certificate.md)
- [Azure Trusted Signing](./azure-trusted-signing.md)
