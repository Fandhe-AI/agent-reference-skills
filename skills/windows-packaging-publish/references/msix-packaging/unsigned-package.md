# Unsigned MSIX Package (Local Testing)

Since Windows 11, an MSIX package can be installed via PowerShell without being signed, to make local iteration faster. It's a testing-only mechanism — never use it to distribute an app.

## Signature / Usage

```xml
<!-- Identity element requires a special OID value to be installable unsigned -->
<Identity Name="NumberGuesserManifest"
          Publisher="CN=AppModelSamples, OID.2.25.311729368913984317654407730594956997722=1"
          Version="1.0.0.0" />
```

```powershell
# Requires elevated PowerShell when the package contains executable content
Add-AppxPackage -Path ".\MyEmployees.appx" -AllowUnsigned
```

## Options / Props

| Requirement | Value |
|-------------|-------|
| `Add-AppxPackage -AllowUnsigned` | Flag required to install the unsigned package |
| Administrator privilege | Required if the package contains executable content (installs for all users); not required for packages with only non-executable content (images, assets, scripts) |
| `Identity` OID | The magic OID `2.25.311729368913984317654407730594956997722=1` must be appended to the `Publisher` attribute, otherwise the package won't register |

## Notes

- An unsigned package never shares identity with a signed package built from the same manifest — this prevents an unsigned package from conflicting with or spoofing a signed one.
- Before distributing the app, remove the special OID from `Publisher` and sign the package with a certificate whose subject name matches the manifest's publisher name.

## Related

- [Certificate Types](../code-signing/certificate-types.md)
- [Self-Signed Certificate](../code-signing/self-signed-certificate.md)
- [MSIX Signing Requirements](../code-signing/msix-signing-requirements.md)
