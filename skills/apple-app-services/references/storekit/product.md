# Product

Information about a product that you configure in App Store Connect.

## Signature / Usage

```swift
struct Product
```

```swift
// Fetch products
let products = try await Product.products(for: ["com.example.premium"])

// Purchase
let result = try await product.purchase()
```

## Options / Props

| Member | Type | Description |
|--------|------|-------------|
| `id` | `String` | Unique product identifier |
| `type` | `Product.ProductType` | In-app purchase product type |
| `displayName` | `String` | Localized display name |
| `description` | `String` | Localized product description |
| `displayPrice` | `String` | Localized formatted price string |
| `price` | `Decimal` | Price in local currency |
| `priceFormatStyle` | `Decimal.FormatStyle.Currency` | Format style for calculations on the price; use `displayPrice` for direct display |
| `isFamilyShareable` | `Bool` | Whether the product is available via Family Sharing |
| `subscription` | `Product.SubscriptionInfo?` | Subscription info for auto-renewable subscriptions |
| `latestTransaction` | `VerificationResult<Transaction>?` | Most recent transaction for this product |
| `currentEntitlements` | `Transaction.Transactions` | Current entitlement transactions for this product |
| `jsonRepresentation` | `Data` | UTF-8 encoded JSON representation of the product, for decoding into a custom type |

## Notes

Available iOS 15.0+, iPadOS 15.0+, macOS 12.0+, tvOS 15.0+, watchOS 8.0+, visionOS 1.0+.

Key static method: `Product.products(for: [String])` fetches products from App Store. Purchase via `product.purchase(options:)` or `product.purchase(confirmIn:options:)`.

`Product.purchase(options:)` and related purchase methods throw `Product.PurchaseError` (`productUnavailable`, `purchaseNotAllowed`, `invalidOfferIdentifier`, `ineligibleForOffer`, `invalidOfferPrice`, `invalidOfferSignature`, `invalidQuantity`, `missingOfferParameters`, `paymentMethodBindingConfigurationRequired`, iOS 15.0+).

`Product.PromotionInfo` (iOS 16.4+) customizes the display order and visibility of promoted in-app purchases on a per-device basis, via `Product.PromotionInfo.updateProductOrder(byID:)` / `updateProductVisibility(_:for:)`.

`Product.SubscriptionRelationship` (iOS 17.0+, macOS 14.0+, watchOS 10.0+) is an `OptionSet` describing how a subscription relates to another (`current`, `upgrade`, `downgrade`, `crossgrade`, `all`), used when filtering subscription offerings.

## Related

- [Product.PurchaseResult](./product-purchaseresult.md)
- [Product.PurchaseOption](./product-purchaseoption.md)
- [Product.SubscriptionInfo](./product-subscriptioninfo.md)
- [Transaction](./transaction.md)
- [VerificationResult](./verificationresult.md)
