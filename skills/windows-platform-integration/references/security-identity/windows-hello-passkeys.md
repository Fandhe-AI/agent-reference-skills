# Windows Hello and passkeys

Windows Hello replaces reusable passwords with device-bound two-factor authentication (a PIN or biometric gesture releasing a TPM-protected private key). Passkeys are the FIDO2/WebAuthn-standardized form of this same key-pair model, portable across sites and platforms.

## Signature / Usage

```csharp
// 1. Check Windows Hello availability
bool available = await KeyCredentialManager.IsSupportedAsync();

// 2. Enroll: create a per-app, per-device identity key
var creationResult = await KeyCredentialManager.RequestCreateAsync(
    accountId, KeyCredentialCreationOption.ReplaceExisting);

// 3. Authenticate later: open the key and sign a server challenge
var openResult = await KeyCredentialManager.OpenAsync(accountId);
if (openResult.Status == KeyCredentialStatus.Success)
{
    var signResult = await openResult.Credential.RequestSignAsync(challengeBuffer);
}

// 4. Re-confirm presence for a sensitive action
var consent = await UserConsentVerifier.RequestVerificationAsync("Confirm this purchase");
```

## Options / Props

| Concept | API | Description |
|---------|-----|-------------|
| Enrollment / key creation | `KeyCredentialManager.RequestCreateAsync` | Creates the per-app RSA 2048-bit identity key, generated/protected by the TPM when available. |
| Sign challenge | `KeyCredential.RequestSignAsync` | Prompts Windows Hello and signs a server-issued challenge with the private key. |
| Re-authentication / step-up | `UserConsentVerifier.RequestVerificationAsync` | Confirms the current user's presence for a specific action without a full key exchange. |
| Attestation | `KeyCredential.GetAttestationAsync` | Proves the key is TPM-bound, for servers that want higher assurance. |
| Passkey/WebAuthn (browser & native) | Windows-native credential UX | Windows 11 22H2+ (with the relevant cumulative update) provides native passkey management from Settings/Edge; apps implementing WebAuthn typically rely on the browser/platform authenticator rather than calling WinRT APIs directly. |

## Notes

- Namespace: `Windows.Security.Credentials` / `Windows.Security.Credentials.UI` (WinRT). This is the native Windows Hello key-credential model; it is distinct from web-standard WebAuthn/passkeys, which Windows implements at the OS/browser level (native credential UX, FIDO Cross-Device Authentication) rather than exposing as a separate `Windows.Security.Authentication.WebAuthn` WinRT namespace for app developers.
- Each `KeyCredentialManager` key pair is unique per device; supporting multi-device sign-in requires the backend to store multiple public keys per user account.
- The private key is never exposed to app code, on either the client or server side — only signing/derive operations are requested through the API.
- For sign-in with a Microsoft account or Microsoft Entra ID account specifically (as opposed to a custom backend), prefer MSAL.NET with the Web Account Manager (WAM) broker over building a custom `KeyCredentialManager` challenge/response flow — see `WebAuthenticationCoreManager`.

## Related

- [KeyCredentialManager](./key-credential-manager.md)
- [KeyCredential](./key-credential.md)
- [UserConsentVerifier](./user-consent-verifier.md)
