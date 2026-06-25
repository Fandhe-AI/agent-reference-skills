# Transaction.updates

An asynchronous sequence that emits transactions created or updated outside the app or on other devices.

## Signature / Usage

```swift
static var updates: Transaction.Transactions { get }
```

```swift
final class TransactionObserver {
    var updates: Task<Void, Never>?

    init() {
        updates = Task(priority: .background) {
            for await verificationResult in Transaction.updates {
                guard case .verified(let transaction) = verificationResult else { continue }
                // Deliver content, handle revocation/expiration
                await transaction.finish()
            }
        }
    }

    deinit { updates?.cancel() }
}
```

## Notes

Available iOS 15.0+, iPadOS 15.0+, macOS 12.0+, tvOS 15.0+, watchOS 8.0+, visionOS 1.0+.

Emits: transactions from Ask to Buy approvals, offer code redemptions, cross-device purchases, and unfinished transactions at app launch. Start listening at app initialization to avoid missing transactions. Does not emit transactions completed in the same `purchase()` call — those are returned via `Product.PurchaseResult.success`.

## Related

- [Transaction](./transaction.md)
- [Transaction.currentEntitlements](./transaction-currententitlements.md)
- [VerificationResult](./verificationresult.md)
