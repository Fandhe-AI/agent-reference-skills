# KeyCredential

Represents a key credential — an RSA 2048-bit asymmetric key that represents a user's identity for an application, obtained via `KeyCredentialManager`. Namespace: `Windows.Security.Credentials`.

## Signature / Usage

```csharp
var openKeyResult = await KeyCredentialManager.OpenAsync(accountId);
if (openKeyResult.Status == KeyCredentialStatus.Success)
{
    KeyCredential userKey = openKeyResult.Credential;
    IBuffer publicKey = userKey.RetrievePublicKey();

    var signResult = await userKey.RequestSignAsync(challengeBuffer);
    if (signResult.Status == KeyCredentialStatus.Success)
    {
        IBuffer signature = signResult.Result;
    }
}
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| Name | String | The name of the key credential. |
| GetAttestationAsync() | method | Gets attestation data for the key, proving it was generated in/bound to the TPM. Call after provisioning. |
| RequestSignAsync(IBuffer data) | method | Prompts the user (via Windows Hello) to cryptographically sign data with the private key. |
| RequestSignForWindowAsync(WindowId, IBuffer) | method | Desktop-app variant of `RequestSignAsync` tied to a specific window. |
| RequestDeriveSharedSecretAsync(WindowId, String, IBuffer) | method | Derives a shared secret using the key credential, for a specific window. |
| RetrieveAuthorizationContext(IBuffer) | method | Retrieves an authorization context buffer for the key. |
| RetrievePublicKey() | method | Gets the public portion of the asymmetric key. |
| RetrievePublicKey(CryptographicPublicKeyBlobType) | method | Gets the public key in a specified blob format. |

## Notes

- The private key material is never exposed to app code; `RequestSignAsync` triggers the Windows Hello PIN/biometric gesture and the OS performs the signing operation internally (in the TPM when available).
- Server-side, verify the signature against the previously registered public key using standard RSA verification (for example `RSACng.VerifyData` with SHA-256 and PKCS#1 padding on .NET).

## Related

- [KeyCredentialManager](./key-credential-manager.md)
