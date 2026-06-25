# Transaction

Information that represents the customer's purchase of a product in your app.

## Signature / Usage

```swift
struct Transaction
```

```swift
// Listen for new/updated transactions at app launch
Task(priority: .background) {
    for await verificationResult in Transaction.updates {
        guard case .verified(let transaction) = verificationResult else { return }
        // Deliver content
        await transaction.finish()
    }
}

// Check current entitlements
for await result in Transaction.currentEntitlements {
    if case .verified(let transaction) = result {
        // Grant access
    }
}
```

## Options / Props

| Member | Type | Description |
|--------|------|-------------|
| `id` | `UInt64` | Unique transaction identifier |
| `originalID` | `UInt64` | Original transaction ID (consistent across renewals) |
| `productID` | `String` | Product identifier |
| `productType` | `Product.ProductType` | Type of In-App Purchase |
| `purchaseDate` | `Date` | Date of purchase |
| `expirationDate` | `Date?` | Subscription expiration date |
| `isUpgraded` | `Bool` | Whether a higher-tier subscription was purchased |
| `revocationDate` | `Date?` | Date the transaction was revoked |
| `revocationReason` | `Transaction.RevocationReason?` | Reason for revocation |
| `appAccountToken` | `UUID?` | UUID linking purchase to your backend account |
| `environment` | `AppStore.Environment` | App Store environment (production, sandbox, xcode) |
| `signedDate` | `Date` | Date the JWS was signed by the App Store |

## Notes

Available iOS 15.0+, iPadOS 15.0+, macOS 12.0+, tvOS 15.0+, watchOS 8.0+, visionOS 1.0+.

The App Store signs transactions in JWS format; StoreKit automatically verifies them and wraps in `VerificationResult`. Always call `transaction.finish()` after delivering content. Use `Transaction.updates` for ongoing listener and `Transaction.currentEntitlements` to restore state at launch.

Key sequences: `Transaction.updates`, `Transaction.currentEntitlements`, `Transaction.all`, `Transaction.unfinished`.

## Related

- [Transaction.updates](./transaction-updates.md)
- [Transaction.currentEntitlements](./transaction-currententitlements.md)
- [VerificationResult](./verificationresult.md)
- [Product](./product.md)
