# Product.SubscriptionInfo

Information about an auto-renewable subscription: status, period, group, and offer details.

## Signature / Usage

```swift
struct SubscriptionInfo
```

```swift
// Access via Product
if let subscription = product.subscription {
    let statuses = try await subscription.status
    let period = subscription.subscriptionPeriod
    let isEligible = await subscription.isEligibleForIntroOffer
}
```

## Options / Props

| Member | Type | Description |
|--------|------|-------------|
| `status` | `[Product.SubscriptionInfo.Status]` | Array of status objects for the subscription group |
| `subscriptionGroupID` | `String` | Subscription group identifier |
| `groupDisplayName` | `String` | Localized subscription group name |
| `groupLevel` | `Int` | Rank relative to other subscriptions in the group |
| `subscriptionPeriod` | `Product.SubscriptionPeriod` | Duration between renewals |
| `isEligibleForIntroOffer` | `Bool` | Whether the customer can receive the introductory offer |
| `introductoryOffer` | `Product.SubscriptionOffer?` | Introductory offer info, if configured |
| `promotionalOffers` | `[Product.SubscriptionOffer]` | Available promotional offers |
| `winBackOffers` | `[Product.SubscriptionOffer]` | Available win-back offers |

## Notes

Available iOS 15.0+, iPadOS 15.0+, macOS 12.0+, tvOS 15.0+, watchOS 8.0+, visionOS 1.0+.

Access via `product.subscription` — returns `nil` for non-subscription products. Use `status` to determine active entitlement. Use `isEligibleForIntroOffer` before displaying introductory pricing.

## Related

- [Product.SubscriptionInfo.Status](./product-subscriptioninfo-status.md)
- [Product.SubscriptionInfo.RenewalState](./product-subscriptioninfo-renewalstate.md)
- [Product](./product.md)
