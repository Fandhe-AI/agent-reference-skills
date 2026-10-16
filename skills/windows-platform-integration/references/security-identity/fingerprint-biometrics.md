# Fingerprint biometrics (UserConsentVerifier how-to)

How to check for a fingerprint reader and request fingerprint consent before a sensitive action (for example an in-app purchase) with `UserConsentVerifier` in `Windows.Security.Credentials.UI`.

## Signature / Usage

```csharp
// Check availability
var ucvAvailability = await Windows.Security.Credentials.UI.UserConsentVerifier.CheckAvailabilityAsync();
if (ucvAvailability == Windows.Security.Credentials.UI.UserConsentVerifierAvailability.Available)
{
    // Request consent (modal dialog with your message)
    var consentResult = await Windows.Security.Credentials.UI.UserConsentVerifier.RequestVerificationAsync(
        "Please provide fingerprint verification.");

    switch (consentResult)
    {
        case Windows.Security.Credentials.UI.UserConsentVerificationResult.Verified:
            // Fingerprint verified
            break;
        case Windows.Security.Credentials.UI.UserConsentVerificationResult.RetriesExhausted:
            // Too many failed attempts
            break;
        case Windows.Security.Credentials.UI.UserConsentVerificationResult.Canceled:
            // Canceled
            break;
        // DeviceBusy, DeviceNotPresent, DisabledByPolicy, NotConfiguredForUser, default: unavailable
    }
}
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| UserConsentVerifier.CheckAvailabilityAsync | static method | Returns `UserConsentVerifierAvailability`: `Available`, `DeviceBusy`, `DeviceNotPresent`, `DisabledByPolicy`, `NotConfiguredForUser`. |
| UserConsentVerifier.RequestVerificationAsync(string) | static method | Shows a modal fingerprint prompt with the supplied message; returns `UserConsentVerificationResult`. |
| UserConsentVerificationResult | enum | `Verified`, `DeviceBusy`, `DeviceNotPresent`, `DisabledByPolicy`, `NotConfiguredForUser`, `RetriesExhausted`, `Canceled`. |

## Notes

- Usable from WinUI as well as WPF and WinForms desktop apps (WinRT APIs from the Windows SDK). The page targets packaged apps.
- Even when the device supports fingerprint authentication, provide a Settings option to enable or disable it.
- The user must have previously enrolled a fingerprint for verification to work.
- In desktop apps, `RequestVerificationAsync` is called through `UserConsentVerifierInterop.RequestVerificationForWindowAsync` with an HWND (see the UserConsentVerifier page); the how-to snippet above is the UWP-style call.

## Related

- [UserConsentVerifier](./user-consent-verifier.md)
- [UserConsentVerificationResult](./user-consent-verification-result.md)
- [Windows Hello and passkeys](./windows-hello-passkeys.md)
