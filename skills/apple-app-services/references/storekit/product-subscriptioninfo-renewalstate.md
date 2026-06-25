# Product.SubscriptionInfo.RenewalState

The renewal states of auto-renewable subscriptions.

## Signature / Usage

```swift
struct RenewalState
```

```swift
switch status.state {
case .subscribed:
    grantAccess()
case .inGracePeriod:
    grantAccess() // Still entitled during grace period
case .inBillingRetryPeriod:
    showBillingPrompt()
case .expired:
    revokeAccess()
case .revoked:
    revokeAccess()
default:
    break
}
```

## Options / Props

| Value | Description |
|-------|-------------|
| `.subscribed` | Customer has an active subscription |
| `.expired` | Subscription has expired and was not renewed |
| `.inBillingRetryPeriod` | App Store is retrying a failed billing attempt |
| `.inGracePeriod` | Billing failed but customer retains access during the grace period |
| `.revoked` | App Store revoked the customer's access to the subscription group |

## Notes

Available iOS 15.0+, iPadOS 15.0+, macOS 12.0+, tvOS 15.0+, watchOS 8.0+, visionOS 1.0+.

Grant content access for both `.subscribed` and `.inGracePeriod`. During `.inBillingRetryPeriod`, access is revoked but the App Store continues retrying payment. Enabling Billing Grace Period in App Store Connect is required for `.inGracePeriod` to occur.

## Related

- [Product.SubscriptionInfo.Status](./product-subscriptioninfo-status.md)
- [Product.SubscriptionInfo](./product-subscriptioninfo.md)
