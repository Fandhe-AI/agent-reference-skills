# Product.SubscriptionRelationship

An option set that describes the relationship between a subscription and other subscriptions in the same subscription group, used to filter subscription products.

## Signature / Usage

```swift
struct SubscriptionRelationship: OptionSet
```

```swift
let products = try await Product.products(
    for: productIDs,
    subscriptionRelationship: .upgrade
)
```

## Options / Props

| Member | Description |
|--------|-------------|
| `all` | Includes all subscriptions in the group |
| `current` | Includes the customer's current subscription |
| `upgrade` | Includes subscriptions that are an upgrade from the customer's current subscription |
| `downgrade` | Includes subscriptions that are a downgrade from the customer's current subscription |
| `crossgrade` | Includes subscriptions that are a crossgrade from the customer's current subscription |

## Notes

Available iOS 17.0+, iPadOS 17.0+, macOS 14.0+, tvOS 17.0+, watchOS 10.0+, visionOS 1.0+.

Conforms to `OptionSet`, `SetAlgebra`, `RawRepresentable`, `ExpressibleByArrayLiteral`, `Equatable`, `Hashable`. Members can be combined (e.g. `[.upgrade, .crossgrade]`) to filter results when fetching products relative to the customer's current subscription state.

## Related

- [Product](./product.md)
- [Product.SubscriptionInfo](./product-subscriptioninfo.md)
