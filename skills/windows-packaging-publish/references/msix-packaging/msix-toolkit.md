# MSIX Toolkit

The MSIX Toolkit is a community-driven, open source collection of scripts, redistributables, and tools (hosted on GitHub) that help IT pros and developers build and manage MSIX packages beyond the core SDK/CLI tooling.

## Signature / Usage

```powershell
# ModifyPackagePublisher: update publisher info to match a certificate, then re-sign
.\modify-package-publisher.ps1 -directory "C:\MSIX" -redist "C:\MSIX-Toolkit\Redist" -certPath "C:\cert\mycert.cer" -pfxPath "C:\cert\CertKey.pfx"
```

## Options / Props

| Component | Type | Description |
|-----------|------|-------------|
| BulkConversion | Script | PowerShell scripts for bulk conversion of applications into MSIX package format |
| ModifyPackagePublisher | Script | PowerShell script that updates an MSIX app's publisher in the manifest to match a signing certificate, then optionally re-signs it |
| Redist.x64 / Redist.x86 | Redistributable | Windows 10 SDK binaries/tools required by the toolkit scripts, for 64-bit/32-bit devices |
| AppInstallerFileBuilder | Tool | Windows 10 app that simplifies creating `.appinstaller` files, letting users pick packages to distribute and update options |

`ModifyPackagePublisher` parameters (`modify-package-publisher.ps1`):

| Name | Type | Required | Description |
|------|------|----------|--------------|
| `-directory` | String | Yes | Root directory recursively searched for MSIX packages |
| `-certPath` | String | Yes | Path to the `.cer` certificate providing the new publisher info |
| `-redist` | String | Yes | Path to the toolkit's redistributable (x86 or x64) used to repackage |
| `-pfxPath` | String | No | Path to the `.pfx` code-signing certificate used to re-sign after updating the publisher |
| `-password` | String | No | Password for a password-protected `.pfx` |
| `-forceContinue` | Switch | No | Continue processing remaining packages even if an error occurs on one |

## Notes

- Distinct from the MSIX SDK and MSIX Packaging Tool: the toolkit is a grab-bag of community-contributed scripts/tools rather than a single application or cross-platform library.
- Signing with a SHA1 certificate is unsupported by `ModifyPackagePublisher`.
- `ModifyPackagePublisher` currently supports MSIX apps only, not MSIX bundles.
- External contributions require a signed Contributor License Agreement (CLA) and a readme with build instructions.

## Related

- [MSIX Packaging Tool](./msix-packaging-tool.md)
- [makeappx.exe CLI](./makeappx-cli.md)
- [MSIX SDK](./msix-sdk.md)
