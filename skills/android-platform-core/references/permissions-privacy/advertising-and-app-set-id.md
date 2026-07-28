# Advertising ID and App Set ID

Two user-resettable device identifiers with distinct privacy scopes: the Advertising ID (AAID) for ads-only use cases, and the App Set ID for cross-app analytics within a single organization.

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| Advertising ID (AAID) | identifier, via `AdvertisingIdClient` (Google Play services) | — | Device-wide, user-resettable identifier for ad targeting, measurement, conversions, and remarketing only. |
| `AdvertisingIdClient.Info.isLimitAdTrackingEnabled()` | function | — | Must be checked before using the AAID for ad personalization; honor the opt-out if `true`. |
| App Set ID | identifier | — | Scoped to apps published by the same organization; usable for cross-app analytics, crash reporting, and testing, but not for advertising. |

## Notes

- Both identifiers are user-resettable from Android Settings; do not bridge across a reset by linking the old and new IDs without explicit user consent.
- The AAID must not be linked to personally identifiable information or to persistent hardware identifiers (IMEI, MAC address, Android ID) without explicit user consent, and may only be used for advertising-related purposes.
- As of the late-2021 Google Play services update, when a user opts out of ad personalization, `AdvertisingIdClient` returns a string of zeros instead of the real AAID.
- Preferred identifier priority: user-resettable IDs first; avoid hardware identifiers; use the AAID strictly for ads; use App Set ID / Firebase Installation ID / a generated GUID for non-ad use cases.

## Related

- [package-visibility](../app-components/package-visibility.md)
- [data-safety-and-privacy-policy](./data-safety-and-privacy-policy.md)
