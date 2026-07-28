# Certificate

Represents a cryptography (X.509) certificate. Namespace: `Windows.Security.Cryptography.Certificates`.

## Signature / Usage

```csharp
var certificate = new Windows.Security.Cryptography.Certificates.Certificate(certBlobBuffer);
string subject = certificate.Subject;
string issuer = certificate.Issuer;
bool hasPrivateKey = certificate.HasPrivateKey;

var chain = await certificate.BuildChainAsync(new[] { certificate });
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| Certificate(IBuffer certBlob) | constructor | Creates an instance from ASN.1 DER-encoded certificate data. |
| Subject / Issuer | String | Subject / issuer common name. |
| SerialNumber | IBuffer | Certificate serial number. |
| ValidFrom / ValidTo | DateTimeOffset | Validity period. |
| HasPrivateKey | Boolean | Whether the certificate has an associated private key. |
| IsStronglyProtected | Boolean | Whether the private key is strongly protected (for example requires user gesture). |
| IsSecurityDeviceBound | Boolean | Whether the key is bound to a security device (for example TPM/smart card). |
| KeyAlgorithmName | String | Cryptographic algorithm used for the key. |
| StoreName | String | The certificate store the certificate belongs to. |
| EnhancedKeyUsages / KeyUsages | collection | Key usage / EKU OIDs. |
| BuildChainAsync(IIterable\<Certificate\>, ChainBuildingParameters?) | method | Builds a certificate chain from end-entity to root. |
| GetCertificateBlob() | method | Gets the ASN.1 DER-encoded certificate blob. |
| GetHashValue() / GetHashValue(String algorithm) | method | Gets the certificate thumbprint (SHA1 by default, or a specified algorithm). |

## Notes

- Certificates are typically enumerated from the platform certificate store (via `Windows.Security.Cryptography.Certificates.CertificateStores`) rather than constructed directly, except when importing a raw blob.

## Related

- [CertificateEnrollmentManager](./certificate-enrollment-manager.md)
