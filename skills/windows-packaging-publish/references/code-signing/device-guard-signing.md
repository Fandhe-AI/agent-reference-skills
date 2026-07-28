# Device Guard Signing (DGSS v2)

Device Guard Signing Service v2 (DGSS) was an enterprise code signing service tied to a Microsoft Store for Business / Microsoft Store for Education tenant, used to sign line-of-business MSIX apps, catalog files, and Windows Defender Application Control (WDAC) policies from a guaranteed trusted source.

## Signature / Usage

```console
signtool sign /fd sha256 /dlib Microsoft.Acs.Dlib.dll /dmdf <Azure AAD token in .json format> /t <timestamp-service-url> <your .msix package>
```

## Options / Props

| Name | Type | Description |
| --- | --- | --- |
| `/dlib` | path | `Microsoft.Acs.Dlib.dll` from the `Microsoft.Acs.Dgss.Client` NuGet package, implementing the DGSS v2 signing plugin. |
| `/dmdf` | path | Azure AD access token (JSON) obtained via OAuth 2.0 code grant flow against the Microsoft Store for Business tenant. |
| `/t` | URL | Timestamp service URL — recommended, since DGSS v2 certificates are valid for only one day. |
| `/fd sha256` | string | Only SHA256 is supported for DGSS v2 signing. |

## Notes

- **Retired.** Device Guard Signing Service v2 is no longer available: Microsoft Store for Business and Microsoft Store for Education, which DGSS required for authentication, were retired March 31, 2023. This page is retained for historical reference only.
- For current enterprise/production MSIX code signing, use Azure Trusted Signing (Azure Artifact Signing), the successor service — it offers managed certificate lifecycle and CI/CD integration without the retired DGSS dependency.
- Historical requirement: the app manifest `Publisher` must match the leaf certificate subject exactly (e.g. leaf certificate `CompanyName` requires manifest `Publisher="CN=CompanyName"`), otherwise signing fails.
- Common historical error `0x800700d` indicated an invalid Azure AD JSON token format.
- This "Device Guard" signing service is distinct from Windows Defender Application Control (WDAC) itself — DGSS was one mechanism used to sign WDAC policies and line-of-business apps, not the policy engine.

## Related

- [Azure Trusted Signing](./azure-trusted-signing.md)
- [SignTool Sign Command](./signtool-sign.md)
