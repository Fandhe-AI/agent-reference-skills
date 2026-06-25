# Product.SubscriptionInfo.Status

Renewal status information for an auto-renewable subscription at a point in time.

## Signature / Usage

```swift
struct Status
```

```swift
let statuses = try await product.subscription?.status ?? []
for status in statuses {
    switch status.state {
    case .subscribed:
        // Active subscription — grant access
        if case .verified(let transaction) = status.transaction {
            // Use transaction.productID
        }
    case .expired:
        break
    case .inGracePeriod:
        // Still grant access during grace period
        break
    default:
        break
    }
}
```

## Options / Props

| Property | Type | Description |
|----------|------|-------------|
| `state` | `Product.SubscriptionInfo.RenewalState` | Current renewal state |
| `transaction` | `VerificationResult<Transaction>` | Latest transaction for the subscription group |
| `renewalInfo` | `VerificationResult<Product.SubscriptionInfo.RenewalInfo>` | Signed renewal information |

## Notes

Available iOS 15.0+, iPadOS 15.0+, macOS 12.0+, tvOS 15.0+, watchOS 8.0+, visionOS 1.0+.

`Product.SubscriptionInfo.status` returns an array because a customer may have multiple subscriptions in the same group (e.g., an upgrade). Always verify `transaction` and `renewalInfo` before using their payloads.

## Related

- [Product.SubscriptionInfo.RenewalState](./product-subscriptioninfo-renewalstate.md)
- [Product.SubscriptionInfo](./product-subscriptioninfo.md)
- [VerificationResult](./verificationresult.md)
