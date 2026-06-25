# Product.PurchaseResult

The result of a product purchase.

## Signature / Usage

```swift
enum PurchaseResult
```

```swift
let result = try await product.purchase()
switch result {
case .success(let verificationResult):
    switch verificationResult {
    case .verified(let transaction):
        await transaction.finish()
    case .unverified(_, _):
        break
    }
case .pending:
    break
case .userCancelled:
    break
@unknown default:
    break
}
```

## Options / Props

| Case | Associated Value | Description |
|------|-----------------|-------------|
| `success(_:)` | `VerificationResult<Transaction>` | Purchase succeeded; transaction requires verification |
| `userCancelled` | — | The user cancelled the purchase sheet |
| `pending` | — | Purchase is pending (e.g., Ask to Buy awaiting approval) |

## Notes

Available iOS 15.0+, iPadOS 15.0+, macOS 12.0+, tvOS 15.0+, watchOS 8.0+, visionOS 1.0+.

Always handle `@unknown default` to future-proof against new cases. For `.success`, verify via `VerificationResult` before granting access, then call `transaction.finish()`.

## Related

- [Product](./product.md)
- [VerificationResult](./verificationresult.md)
- [Transaction](./transaction.md)
