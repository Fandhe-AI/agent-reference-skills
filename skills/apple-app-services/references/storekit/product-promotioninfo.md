# Product.PromotionInfo

Information about a promoted in-app purchase that customizes its order and visibility on the device.

## Signature / Usage

```swift
struct PromotionInfo
```

```swift
var info = try await Product.PromotionInfo.current(for: "com.example.premium")
info?.visibility = .hidden
try await info?.update()
```

## Options / Props

| Member | Type | Description |
|--------|------|-------------|
| `productID` | `String` | The product identifier of the promoted in-app purchase |
| `visibility` | `Product.PromotionInfo.Visibility` | Whether the promoted in-app purchase is visible or hidden on the user's device |
| `currentOrder` (static) | `[String]` | The customized order of promoted product identifiers |
| `update()` | `() async throws -> Void` | Saves changes to the promoted product's visibility |
| `updateProductOrder(byID:)` (static) | — | Sets the display order of promoted in-app purchases using product identifiers |
| `updateProductVisibility(_:for:)` (static) | — | Updates whether a promoted in-app purchase appears on the App Store product page |
| `updateAll(_:)` (static) | — | Sets the order and visibility of all promoted products and saves changes |

## Notes

Available iOS 16.4+, iPadOS 16.4+, Mac Catalyst 16.4+.

Conforms to `Equatable`. Used to control the built-in promoted in-app purchases feature on App Store product pages, separate from purchase flow types such as `Product.PurchaseOption`.

## Related

- [Product](./product.md)
