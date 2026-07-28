# UserConsentVerifier

Static class that checks for availability of a verification device (Windows Hello PIN, biometric, or fingerprint reader) and performs a verification prompt. Namespace: `Windows.Security.Credentials.UI`.

## Signature / Usage

```csharp
// UWP apps
var consentResult = await Windows.Security.Credentials.UI.UserConsentVerifier.RequestVerificationAsync(userMessage);

// Desktop apps (WinUI 3 / WPF / WinForms): use the interop class with an HWND
var hwnd = WinRT.Interop.WindowNative.GetWindowHandle(this);
var consentResult = await Windows.Security.Credentials.UI.UserConsentVerifierInterop
    .RequestVerificationForWindowAsync(hwnd, userMessage);

if (consentResult == UserConsentVerificationResult.Verified)
{
    // proceed with the sensitive action
}
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| CheckAvailabilityAsync() | static method | Checks whether an authentication device (PIN, Windows Hello, fingerprint) is available. |
| RequestVerificationAsync(String message) | static method | Performs a verification prompt using an authentication device. UWP apps only. |
| RequestVerificationForWindowAsync(IntPtr hwnd, String message) | static method (interop) | Desktop-app equivalent, via `Windows.Security.Credentials.UI.UserConsentVerifierInterop`, requiring a window handle (HWND). |

## Notes

- Desktop apps (WPF, WinForms, WinUI 3) cannot call `RequestVerificationAsync` directly; they must obtain an HWND and call the `UserConsentVerifierInterop.RequestVerificationForWindowAsync` C#/WinRT interop method instead.
- Use `UserConsentVerifier` to re-confirm the current user's presence before a sensitive in-app action (for example, before authorizing a purchase), as distinct from `KeyCredentialManager`, which is used for provisioning/using a durable per-app identity key.

## Related

- [UserConsentVerificationResult](./user-consent-verification-result.md)
- [KeyCredentialManager](./key-credential-manager.md)
