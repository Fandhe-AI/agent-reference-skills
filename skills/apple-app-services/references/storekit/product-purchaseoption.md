# Product.PurchaseOption

Optional settings for a product purchase that add account info, offer details, or behavioral flags.

## Signature / Usage

```swift
struct PurchaseOption
```

```swift
let result = try await product.purchase(options: [
    .appAccountToken(accountUUID),
    .quantity(2)
])
```

## Options / Props

| Option | Description |
|--------|-------------|
| `appAccountToken(_:)` | Associates a UUID with the purchase to link it to an account in your system |
| `quantity(_:)` | Sets the quantity for consumable purchases |
| `winBackOffer(_:)` | Applies a win-back offer to the purchase |
| `promotionalOffer(_:compactJWS:)` | Applies a promotional offer using a compact JWS |
| `introductoryOfferEligibility(compactJWS:)` | Sets introductory offer eligibility via JWS |
| `onStorefrontChange(shouldContinuePurchase:)` | Controls whether the purchase continues if the storefront changes |
| `simulatesAskToBuyInSandbox(_:)` | Simulates Ask to Buy in sandbox testing |
| `custom(key:value:)` | Adds a custom key-value pair to the purchase |

## Notes

Available iOS 15.0+, iPadOS 15.0+, macOS 12.0+, tvOS 15.0+, watchOS 8.0+, visionOS 1.0+.

Invalid options cause the purchase to throw `StoreKitError` or `Product.PurchaseError`. `appAccountToken` is the primary mechanism for associating purchases with your backend user accounts.

## Related

- [Product](./product.md)
- [Product.PurchaseResult](./product-purchaseresult.md)
