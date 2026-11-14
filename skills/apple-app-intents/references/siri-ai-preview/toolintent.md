---
source: https://developer.apple.com/documentation/appintents/toolintent
---

# ToolIntent

A protocol that identifies an app intent that Siri can call while handling a person's request.

## Signature / Usage

```swift
protocol ToolIntent : AppIntent
```

```swift
@AppIntent(.tool)
struct AddToCart: AppIntent {
    static let title: LocalizedStringResource = "Add to Cart"
    static let description = IntentDescription("Adds a product to the shopping cart.")

    @Parameter(title: "Item", description: "The product to add")
    var item: ProductEntity

    @Parameter(title: "Quantity", description: "How many to add", default: 1)
    var quantity: Int

    func perform() async throws -> some IntentResult {
        try await Cart.shared.add(item, quantity: quantity)
        return .result()
    }
}
```

An intent that conforms to a schema can also be a tool. Add the tool trait to the intent's existing macro:

```swift
@AppIntent(.tool, schema: .books.openBook)
struct OpenBookIntent: OpenIntent {
    // A book the action navigates to in the reading app.
    var target: BookEntity

    func perform() async throws -> some IntentResult {
        // ...
    }
}
```

## Options / Props

| Name | Description |
| --- | --- |
| `@AppIntent(.tool)` | Adds `ToolIntent` conformance to an existing `AppIntent` ([AppIntent(_:)](./appintent-tool-macros.md)). |
| `@AppIntent(.tool, schema:)` | Same for a schema-conforming intent; only schemas available exclusively in Shortcuts, such as `openBook`. |
| `title` / `description` | Metadata that helps Siri's model understand the tool; add one in each parameter's `@Parameter` attribute too. |

## Notes

- iOS 27.3+ (beta), iPadOS 27.3+, Mac Catalyst 27.3+, macOS 27.3+, visionOS 27.3+. Inherits from `AppIntent`, `PersistentlyIdentifiable`, `Sendable`, `SendableMetatype`.
- Siri can call a tool from a specific app when the person mentions the app by name, the app is in the foreground, or a relevant entity from that app appears in a search result.
- Good candidates are actions a person can request in one sentence with parameters Siri can fill from the request. Poor candidates: widget configuration intents, intents that serve as one step in a shortcut, and intents with side effects a person must start explicitly (such as placing an order and paying for it).
- Write descriptions for someone who does not know your app and include the format of a string, the range of a floating-point number, or the units of an integer.
- Parameters may be plain value types or `AppEntity` types (Siri runs the entity's query); consider a generable `TransientAppEntity` (see GenerableEntity) when Siri can fill all properties from the request alone.
- Adding the tool trait to an intent that conforms to a schema Siri already supports, such as `sendMessage`, is a build error.
- The `AddToCart` listing here differs from the one in "Bringing custom actions and content to Siri" (no `LocalizedStringResource(...)` wrapping); both are kept as published.
- Apple states that during the Siri AI Developer Preview the App Intents API and Siri functionality may change.
- Source: https://developer.apple.com/documentation/appintents/toolintent (fetched 2026-11-14)

## Related

- [AppIntent(_:) / AppIntent(_:schema:) / AppIntentTraits](./appintent-tool-macros.md)
- [IntentVisibility](./intentvisibility.md)
- [GenerableEntity](./generableentity.md)
- [Bringing custom actions and content to Siri](./bringing-custom-actions-and-content-to-siri.md)
