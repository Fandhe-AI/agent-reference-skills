# Self-Signed Certificate Creation

Creating and trusting a self-signed code signing certificate for MSIX package signing during development and testing, using the PowerShell PKI module's `New-SelfSignedCertificate` cmdlet.

## Signature / Usage

The certificate's `Subject` must exactly match the `Publisher` attribute of the app's `Identity` element in `AppxManifest.xml`:

```xml
<Identity Name="Contoso.AssetTracker"
  Version="1.0.0.0"
  Publisher="CN=Contoso Software, O=Contoso Corporation, C=US"/>
```

Create the certificate in an elevated PowerShell prompt using that same Subject:

```powershell
New-SelfSignedCertificate -Type Custom -KeyUsage DigitalSignature `
  -CertStoreLocation "Cert:\CurrentUser\My" `
  -TextExtension @("2.5.29.37={text}1.3.6.1.5.5.7.3.3", "2.5.29.19={text}") `
  -Subject "CN=Contoso Software, O=Contoso Corporation, C=US" `
  -FriendlyName "Your friendly name goes here"
```

Export to a password-protected PFX file, then import it into the Local Machine Trusted People store so packages signed with it can be installed:

```powershell
$password = ConvertTo-SecureString -String <Your Password> -Force -AsPlainText
Export-PfxCertificate -cert "Cert:\CurrentUser\My\<Certificate Thumbprint>" -FilePath <FilePath>.pfx -Password $password

Import-PfxCertificate -CertStoreLocation "Cert:\LocalMachine\TrustedPeople" -Password $password -FilePath <FilePath>.pfx
```

## Options / Props

| Name | Type | Description |
| --- | --- | --- |
| `-Type Custom` | switch value | Required for code signing certificates rather than a built-in template. |
| `-KeyUsage DigitalSignature` | enum | Restricts certificate usage to digital signatures. |
| `-CertStoreLocation` | path | Certificate store to create the certificate in, typically `Cert:\CurrentUser\My`. |
| `-TextExtension` | string[] | Sets EKU (`2.5.29.37={text}1.3.6.1.5.5.7.3.3` = Code Signing) and Basic Constraints (`2.5.29.19={text}` = end entity, not a CA). |
| `-Subject` | string | Distinguished name; must exactly match the app manifest's `Publisher` attribute. |
| `-FriendlyName` | string | Human-readable label for locating the certificate later. |

## Notes

- A self-signed certificate is untrusted by Windows by default. Only users/machines that explicitly trust the certificate (via import into `Cert:\LocalMachine\TrustedPeople`) can install the signed package.
- View created certificates with `Set-Location Cert:\CurrentUser\My; Get-ChildItem | Format-Table Subject, FriendlyName, Thumbprint`.
- `Export-PfxCertificate` requires either `-Password` or `-ProtectTo`; omitting both raises an error. `-ProtectTo` is useful when the account is backed by a domain controller.
- Adding a certificate to local machine certificate stores affects certificate trust for all users on that computer — remove it when no longer needed.
- For CMD-based (non-PowerShell) certificate creation, Microsoft documents an equivalent flow using MakeCert-derived tooling; the PKI cmdlet approach above is the current recommended path.
- The WinApp CLI (public preview) offers an equivalent one-step alternative: `winapp cert generate --manifest .\appxmanifest.xml --output .\devcert.pfx --install`.

## Related

- [Certificate Types](./certificate-types.md)
- [SignTool Sign Command](./signtool-sign.md)
- [Signing Troubleshooting](./signing-troubleshooting.md)
