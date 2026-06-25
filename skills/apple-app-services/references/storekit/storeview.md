# StoreView

A SwiftUI view that merchandises a collection of In-App Purchase products with localized names, descriptions, prices, and purchase buttons.

## Signature / Usage

```swift
@MainActor @preconcurrency
struct StoreView<Icon, PlaceholderIcon> where Icon: View, PlaceholderIcon: View
```

```swift
// Minimal: load by product IDs
StoreView(ids: ["com.example.premium", "com.example.pro"])

// With custom icons
StoreView(ids: productIDs) { product in
    Image(product.id)
        .resizable()
}

// With restore button
StoreView(ids: productIDs)
    .storeButton(.visible, for: .restorePurchases)
```

## Options / Props

| Initializer / Modifier | Description |
|------------------------|-------------|
| `init(ids:prefersPromotionalIcon:)` | Load products from App Store by identifier array |
| `init(ids:prefersPromotionalIcon:icon:)` | Load products with custom icon view per product |
| `init(products:prefersPromotionalIcon:)` | Merchandise preloaded `Product` values |
| `productViewStyle(_:)` | Apply `.compact`, `.regular`, or `.large` layout style |
| `storeButton(_:for:)` | Show/hide auxiliary buttons (e.g., `.restorePurchases`) |

## Notes

Available iOS 17.0+, iPadOS 17.0+, macOS 14.0+, tvOS 17.0+, watchOS 10.0+, visionOS 1.0+.

Manages product loading, layout, and purchase handling automatically. Grows to fill its container and scrolls when needed. Uses rows+columns on standard platforms, columns+rows on tvOS.

## Related

- [SubscriptionStoreView](./subscriptionstoreview.md)
- [Product](./product.md)
