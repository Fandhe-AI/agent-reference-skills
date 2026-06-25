# VerificationResult

A type describing the result of StoreKit's automatic JWS verification.

## Signature / Usage

```swift
@frozen enum VerificationResult<SignedType>
```

```swift
// Pattern: switch on verification result before using payload
switch verificationResult {
case .verified(let transaction):
    // Safe to use — App Store signature validated
    await transaction.finish()
case .unverified(let transaction, let error):
    // Signature invalid; decide per business model
    print("Verification error: \(error)")
}

// Or use payloadValue (throws if unverified)
let transaction = try verificationResult.payloadValue
```

## Options / Props

| Case / Property | Type | Description |
|-----------------|------|-------------|
| `verified(_:)` | `SignedType` | Associated value passed StoreKit verification |
| `unverified(_:_:)` | `(SignedType, VerificationError)` | Verification failed; value and error both available |
| `payloadValue` | `SignedType` | Returns verified value or throws `VerificationError` |
| `unsafePayloadValue` | `SignedType` | Returns value without checking verification status |

## Notes

Available iOS 15.0+, iPadOS 15.0+, macOS 12.0+, tvOS 15.0+, watchOS 8.0+, visionOS 1.0+.

Used for `Transaction`, `Product.SubscriptionInfo.RenewalInfo`, and `AppTransaction`. Prefer `payloadValue` or `switch` over `unsafePayloadValue`. StoreKit performs automatic verification; manual JWS parsing is not needed in most apps.

## Related

- [Transaction](./transaction.md)
- [AppTransaction](./apptransaction.md)
- [Product.SubscriptionInfo](./product-subscriptioninfo.md)
