# UserConsentVerificationResult

Enum describing the result of a `UserConsentVerifier` verification operation. Namespace: `Windows.Security.Credentials.UI`.

## Signature / Usage

```csharp
switch (consentResult)
{
    case UserConsentVerificationResult.Verified:
        // user verified
        break;
    case UserConsentVerificationResult.DeviceNotPresent:
    case UserConsentVerificationResult.NotConfiguredForUser:
    case UserConsentVerificationResult.DisabledByPolicy:
    case UserConsentVerificationResult.DeviceBusy:
    case UserConsentVerificationResult.RetriesExhausted:
    case UserConsentVerificationResult.Canceled:
        // handle failure/fallback path
        break;
}
```

## Options / Props

| Name | Value | Description |
|------|-------|-------------|
| Verified | 0 | The user was verified. |
| DeviceNotPresent | 1 | No authentication device is available. |
| NotConfiguredForUser | 2 | An authentication verifier device is not configured for this user. |
| DisabledByPolicy | 3 | Group policy has disabled authentication device verification. |
| DeviceBusy | 4 | The authentication device is performing another operation. |
| RetriesExhausted | 5 | After 10 failed attempts, the request and subsequent attempts were not verified. |
| Canceled | 6 | The verification operation was canceled. |

## Related

- [UserConsentVerifier](./user-consent-verifier.md)
