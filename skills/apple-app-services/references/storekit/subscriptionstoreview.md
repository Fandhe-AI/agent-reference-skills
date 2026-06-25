# SubscriptionStoreView

A SwiftUI view that merchandises auto-renewable subscription options within the same subscription group.

## Signature / Usage

```swift
@MainActor @preconcurrency
struct SubscriptionStoreView<Content> where Content: View
```

```swift
// By subscription group ID
SubscriptionStoreView(groupID: "com.example.subscriptions")

// With custom marketing content
SubscriptionStoreView(groupID: "com.example.subscriptions") {
    VStack {
        Image("hero")
        Text("Unlock all features")
    }
}

// By product IDs
SubscriptionStoreView(productIDs: ["com.example.monthly", "com.example.annual"])
```

## Options / Props

| Initializer / Modifier | Description |
|------------------------|-------------|
| `init(groupID:visibleRelationships:)` | Create from subscription group ID |
| `init(groupID:visibleRelationships:marketingContent:)` | With custom marketing content above options |
| `init(productIDs:)` | Create from explicit product ID collection |
| `init(subscriptions:)` | Create from preloaded `Product` values |
| `subscriptionStoreControlStyle(_:)` | Set the subscription picker style |
| `containerBackground(_:for:)` | Add custom background to header area |
| `subscriptionStoreControlIcon(icon:)` | Add decorative icon next to each subscription option |
| `subscriptionStorePolicyDestination(url:for:)` | Override terms/privacy URLs |
| `storeButton(_:for:)` | Control auxiliary button visibility |
| `subscriptionStoreSignInAction(_:)` | Provide sign-in button action |

## Notes

Available iOS 17.0+, iPadOS 17.0+, macOS 14.0+, tvOS 17.0+, watchOS 10.0+, visionOS 1.0+. Mac Catalyst 17.0+.

Handles subscription purchasing, active state display, and platform-appropriate layout automatically. Use `visibleRelationships` to filter which tier levels are shown. Marketing content appears above the subscription picker.

## Related

- [StoreView](./storeview.md)
- [Product.SubscriptionInfo](./product-subscriptioninfo.md)
- [Product](./product.md)
