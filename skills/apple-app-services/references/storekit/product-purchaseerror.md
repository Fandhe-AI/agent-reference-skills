# Product.PurchaseError

Error information for product purchase errors.

## Signature / Usage

```swift
enum PurchaseError
```

```swift
do {
    let result = try await product.purchase()
} catch Product.PurchaseError.productUnavailable {
    // Handle unavailable product
} catch Product.PurchaseError.purchaseNotAllowed {
    // Handle disallowed purchase
}
```

## Options / Props

| Case | Description |
|------|-------------|
| `invalidOfferIdentifier` | The promotional offer identifier provided in the purchase options is invalid |
| `productUnavailable` | The product isn't available |
| `purchaseNotAllowed` | The user isn't allowed to make purchases |
| `ineligibleForOffer` | The user isn't eligible for the offer |
| `invalidOfferPrice` | The price of the offer isn't valid |
| `invalidOfferSignature` | The offer signature isn't valid |
| `invalidQuantity` | The quantity to purchase is invalid |
| `missingOfferParameters` | The offer parameters are missing |
| `paymentMethodBindingConfigurationRequired` | The customer needs to add a payment method to their Apple Account before purchasing; use `PaymentMethodBinding` to prompt the customer |

## Notes

Available iOS 15.0+, iPadOS 15.0+, macOS 12.0+, tvOS 15.0+, watchOS 8.0+, visionOS 1.0+.

Conforms to `LocalizedError`, `Equatable`, `Hashable`, `Sendable`. Thrown by `Product.purchase(options:)` and related purchase methods when the purchase request itself is rejected, distinct from `Product.PurchaseResult` which represents a completed request's outcome.

## Related

- [Product](./product.md)
- [Product.PurchaseResult](./product-purchaseresult.md)
- [Product.PurchaseOption](./product-purchaseoption.md)
