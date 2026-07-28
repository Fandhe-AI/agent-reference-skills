# Signing Errors and Troubleshooting

Common SignTool signing failures for MSIX packages and their causes: internal `SignerSign()` errors, corrupt package errors, hash-mismatch/publisher-mismatch errors, and PE file size limits.

## Signature / Usage

Enable verbose diagnostic output for any failing sign command by placing `/debug` right after `sign`:

```console
signtool sign /debug /fd SHA256 /a /f cert.pfx /p password package.msix
```

For error `0x8007000B`, inspect Event Viewer for the specific sub-cause:

```
Eventvwr.msc
Applications and Services Logs > Microsoft > Windows > AppxPackagingOM > Microsoft-Windows-AppxPackaging/Operational
```

## Options / Props

| Error | Meaning | Fix |
| --- | --- | --- |
| `SignerSign() failed` (`-2147024885` / `0x8007000B`) | Generic internal signing failure; check Event Viewer event ID for the specific cause below. | Use `/debug`; inspect AppxPackagingOM operational log. |
| Event ID 150 — publisher/subject mismatch | App manifest `Publisher` doesn't exactly match the signing certificate's subject name. | Make the manifest `Publisher` match the certificate `Subject` exactly. |
| Event ID 151 — hash method mismatch | `/fd` hash algorithm doesn't match the algorithm used in the package's `AppxBlockMap.xml`. | Re-run SignTool with the `/fd` value matching the block map's `HashMethod`. |
| Event ID 152 — block map validation failure | Package contents don't validate against `AppxBlockMap.xml`; the package is corrupt. | Rebuild the package with MakeAppx.exe (regenerates the block map) and re-sign. |
| `0x8008xxxx` (e.g. `0x80080206` / `APPX_E_CORRUPT_CONTENT`) | Package being signed is invalid/corrupt. | Rebuild the package and run SignTool again. |
| `0x80080057` ("invalid parameter") | PE file (.exe, .sys, .cat) is 4 GB or larger, or the generated hash is inaccurate for files near/over that size. | Keep signed PE files under 4 GB — this is a design limitation of the PE header format with no planned fix. |

## Notes

- The `Publisher` mismatch (Event ID 150) is the most common real-world cause of `SignerSign()` failures — always verify manifest `Publisher` against certificate `Subject` first.
- The 4 GB PE signing limit applies to all tools, not just SignTool; it stems from a `ULONG` image-size field in the PE header and affects all supported Windows versions equally (32-bit and 64-bit SignTool are equally affected).
- For Azure Artifact Signing specifically, a region/endpoint mismatch in `metadata.json` commonly manifests as a 403 Forbidden and an internal `SignerSign()` failure — verify the `Endpoint` matches the region where the signing account and certificate profile were created.
- For ongoing certificate management pain (renewal, hardware tokens, expiry), Microsoft recommends moving to Azure Trusted Signing or Azure Key Vault-based signing rather than continuing to manage a local PFX/hardware token workflow.

## Related

- [SignTool Sign Command](./signtool-sign.md)
- [SignTool Verify](./signtool-verify.md)
- [Self-Signed Certificate Creation](./self-signed-certificate.md)
- [Azure Trusted Signing](./azure-trusted-signing.md)
