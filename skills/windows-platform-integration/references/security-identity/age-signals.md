# Age signals (User.GetUserAgeRangeAsync / GetAgeVerificationStatusAsync)

Privacy-preserving Windows Age APIs on `Windows.System.User` that return a coarse age group and an age-verification status so apps can adapt content, features, or access controls.

## Signature / Usage

The page defines the API surface and return values but provides no code sample; the following only restates the documented members.

```csharp
// Windows.System.User (Windows Runtime)
// GetUserAgeRangeAsync    -> UserAgeRange (Lower, Upper), or null when unknown
// GetAgeVerificationStatusAsync -> UserAgeVerificationStatus
//   Verified | Unverified | OptedOut | TemporarilyUnavailable | NotApplicable
```

## Options / Props

`GetUserAgeRangeAsync` return values:

| Age group | Return values |
|-----------|---------------|
| Under 10 | {0, 9} |
| 10-12 | {10, 12} |
| 13-15 | {13, 15} |
| 16-17 | {16, 17} |
| 18+ | {18, `INT32_MAX`} |
| Unknown | `null` |

`UserAgeVerificationStatus` values:

| Name | Description |
|------|-------------|
| Verified | The user has verified adult status. |
| Unverified | The user doesn't have verified adult status. This doesn't establish that the user is a minor. |
| OptedOut | The user has opted out of adult verification. |
| TemporarilyUnavailable | The status cannot currently be determined. |
| NotApplicable | Verification does not apply, no signal is available, or the feature is unavailable or disabled. |

Platform requirements:

| Requirement | Details |
|-------------|---------|
| Minimum OS version | Windows 11 |
| API surface | Windows Runtime methods on `Windows.System.User` |
| User context | Calls apply only to the user running the current process |
| App capability | Package must declare `userAccountInformation` |

## Notes

- A `null` age range means unknown or unavailable; do not interpret it as a specific age group. Provide fallback behavior.
- Handle every `UserAgeVerificationStatus` value; `NotApplicable` and `TemporarilyUnavailable` do not establish whether the user has verified adult status. An age-range result of 18 or older does not by itself establish verified adult status.
- Age verification checks whether a user who claims to be an adult is an adult. It does not establish a verified age or verify other age groups.
- Access is also subject to the user's consent for account information in Windows privacy settings; otherwise the call can fail with `E_ACCESSDENIED`. The `User` object must represent the user running the current process.
- When the Age APIs are unavailable or disabled, `GetUserAgeRangeAsync` returns `null` and `GetAgeVerificationStatusAsync` returns `NotApplicable`. Administrators can configure a default age group or verification status through Group Policy or MDM; the APIs then return the policy-defined value. A policy-defined `Verified` value is an administrative default, not evidence that the user completed the adult-verification flow. Check method availability before calling.
- Identity-provider age signals are currently retrieved only for Microsoft accounts; for other account types without an administrative default, the unavailable values above apply.
- No exact age or date of birth is ever returned. The APIs return an age bucket and an adult-verification status; age groups are generic and communicate common groups for use cases such as gaming or regional law.
- Typical uses: user-generated content, social/communication features, in-app purchases or virtual currencies, media with maturity ratings.
- Source: https://learn.microsoft.com/en-us/windows/apps/develop/security/age-signals/ (ms.date 2026-10-29, last updated 2026-11-03; fetched 2026-11-14). Wording of the three status descriptions refreshed from this revision (adult verification, not age verification).
- Signatures beyond the members listed are not confirmed in the source.

## Related

- [App capabilities](./app-capabilities.md)
- [Official docs: Age signals](https://learn.microsoft.com/en-us/windows/apps/develop/security/age-signals/)
