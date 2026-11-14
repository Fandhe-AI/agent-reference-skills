# RedeemOption

An option that customizes the behavior of an offer code redemption.

## Signature / Usage

```swift
struct RedeemOption
```

## Options / Props

| Item | Description |
|------|-------------|
| Conforms to | `Equatable`, `Hashable`, `Sendable`, `SendableMetatype` |

## Notes

- Available iOS 27.0+, iPadOS 27.0+, Mac Catalyst 27.0+, macOS 27.0+, visionOS 27.0+.
- Pass a set of these values to `AppStore/presentOfferCodeRedeemSheet(from:options:)` to configure the offer code redemption. The page lists no members, and a DocC page for the `from:options:` overload could not be fetched on 2026-11-14, so its signature is not recorded here.
- The macOS `AppStore.presentOfferCodeRedeemSheet(from:)` page lists macOS 15.0 and marks it deprecated at 27.0.
- Source: https://developer.apple.com/documentation/storekit/redeemoption (fetched 2026-11-14)

## Related

- [AppStore](./appstore.md)
