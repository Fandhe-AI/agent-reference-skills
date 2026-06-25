# Transaction.currentEntitlements

A sequence of the latest transactions that entitle the customer to In-App Purchases and subscriptions.

## Signature / Usage

```swift
static var currentEntitlements: Transaction.Transactions { get }
```

```swift
func refreshPurchasedProducts() async {
    for await verificationResult in Transaction.currentEntitlements {
        switch verificationResult {
        case .verified(let transaction):
            // Grant access based on transaction.productID and transaction.productType
            break
        case .unverified(_, let error):
            // Handle per your business model
            break
        }
    }
}
```

## Notes

Available iOS 15.0+, iPadOS 15.0+, macOS 12.0+, tvOS 15.0+, watchOS 8.0+, visionOS 1.0+.

Includes: non-consumable purchases, active auto-renewable subscriptions (`.subscribed` or `.inGracePeriod`), and non-renewing subscriptions. Does not include consumables, revoked products, or expired subscriptions. Call at app launch to restore state. For subscriptions, also check `Product.SubscriptionInfo.Status` for full renewal state.

## Related

- [Transaction](./transaction.md)
- [Transaction.updates](./transaction-updates.md)
- [VerificationResult](./verificationresult.md)
