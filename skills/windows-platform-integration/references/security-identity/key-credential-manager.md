# KeyCredentialManager

Static class providing basic management of key credentials — RSA 2048-bit asymmetric keys used for Windows Hello / passwordless authentication. Namespace: `Windows.Security.Credentials`.

## Signature / Usage

```csharp
var keyCredentialAvailable = await KeyCredentialManager.IsSupportedAsync();
if (!keyCredentialAvailable)
{
    // User hasn't set up Windows Hello (PIN/biometric) yet.
    return;
}

var creationResult = await KeyCredentialManager.RequestCreateAsync(
    accountId, KeyCredentialCreationOption.ReplaceExisting);

if (creationResult.Status == KeyCredentialStatus.Success)
{
    KeyCredential userKey = creationResult.Credential;
}
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| DeleteAsync(String accountId) | static method | Deletes a previously provisioned key credential for the current user and application. |
| GetSecureId() | static method | Retrieves a secure identifier for the current session. |
| IsSupportedAsync() | static method | Determines whether the current device and user can provision a key credential (that is, whether Windows Hello is set up). |
| OpenAsync(String accountId) | static method | Retrieves an existing key credential for the current user and application. |
| OpenAsync(String, ChallengeResponseKind, AttestationChallengeHandler) | static method | Retrieves a key credential, including a challenge/response attestation flow. |
| RenewAttestationAsync() | static method | Renews the attestation for a key credential. |
| RequestCreateAsync(String accountId, KeyCredentialCreationOption) | static method | Creates a new key credential for the current user and application. |
| RequestCreateAsync(..., KeyCredentialCacheConfiguration, WindowId, ChallengeResponseKind, AttestationChallengeHandler) | static method | Extended overload for desktop apps that need a `WindowId` and attestation challenge handling. |
| RequestCreateForWindowAsync(WindowId, String, KeyCredentialCreationOption) | static method | Creates a key credential for desktop apps, associating UI with a specific window. |

## Notes

- Key type: RSA 2048-bit. Signature format: PKCS #1 RSA-PSS with SHA-256.
- The generated private key never leaves the device (and is TPM-bound where hardware supports it); the app only ever receives the public key and can request sign/derive operations via `KeyCredential`.
- `RequestCreateAsync` triggers the OS Windows Hello enrollment UI (PIN or biometric gesture) if not already configured.
- Desktop apps needing UI tied to a specific window should use `RequestCreateForWindowAsync` with a `WindowId` obtained via window interop, rather than the UWP-only `RequestCreateAsync(String, KeyCredentialCreationOption)`.

## Related

- [KeyCredential](./key-credential.md)
- [UserConsentVerifier](./user-consent-verifier.md)
- [windows-hello-passkeys](./windows-hello-passkeys.md)
