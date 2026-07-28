# CertificateEnrollmentManager

Static class for creating PKCS #10 certificate requests, importing PFX data, and installing certificate chains into the app container. Namespace: `Windows.Security.Cryptography.Certificates`.

## Signature / Usage

```csharp
var requestProps = new CertificateRequestProperties { Subject = "CN=MyApp" };
string pkcs10Request = await CertificateEnrollmentManager.CreateRequestAsync(requestProps);

// After the CA issues a certificate chain (as a string), install it:
await CertificateEnrollmentManager.InstallCertificateAsync(certificateChainString, InstallOptions.None);
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| CreateRequestAsync(CertificateRequestProperties) | static method | Asynchronously creates a PKCS #10 certificate request. |
| InstallCertificateAsync(String certificateChain, InstallOptions) | static method | Installs a certificate chain into the app container on the local computer. |
| ImportPfxDataAsync(String pfxBlob, String password, ExportOption, KeyProtectionLevel, InstallOptions, String friendlyName[, String keyStorageProvider]) | static method | Imports a certificate (with private key) from a PFX message. |
| ImportPfxDataAsync(String, String, PfxImportParameters) | static method | Import overload taking a `PfxImportParameters` object. |
| UserCertificateEnrollmentManager | static property | The associated `UserCertificateEnrollmentManager` for user-scoped enrollment operations. |

## Notes

- Certificates enrolled/installed via this API are scoped to the app's own certificate store (app container), keeping them isolated from other apps' certificates on the same device — see `share-certificates` in the Windows apps security guide for cross-app sharing patterns.

## Related

- [Certificate](./certificate.md)
