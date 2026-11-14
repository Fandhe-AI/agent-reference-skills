---
source: https://developer.apple.com/documentation/appintents/siri-ai-developer-preview
---

# Siri AI Developer Preview

Bring custom actions and content to Siri AI.

## Signature / Usage

Snippet taken from https://developer.apple.com/documentation/appintents/bringing-custom-actions-and-content-to-siri (fetched 2026-11-14): a custom app intent made available to Siri as a tool.

```swift
@AppIntent(.tool)
struct AddToCart: AppIntent {
    static let title: LocalizedStringResource = "Add to Cart"
    static let description = IntentDescription(
        LocalizedStringResource("Adds a product to the shopping cart.")
    )

    @Parameter(title: "Item", description: LocalizedStringResource("The product to add"))
    var item: ProductEntity

    @Parameter(title: "Quantity", description: LocalizedStringResource("How many to add"), default: 1)
    var quantity: Int

    func perform() async throws -> some IntentResult {
        try await Cart.shared.add(item, quantity: quantity)
        return .result()
    }
}
```

## Options / Props

| Topic group | Pages (this category unless noted) |
| --- | --- |
| Getting started | [Bringing custom actions and content to Siri](./bringing-custom-actions-and-content-to-siri.md), [Orchestrating complex actions with app skills](./orchestrating-complex-actions-with-app-skills.md) |
| Tool support | [AppIntent(_:) / AppIntent(_:schema:) / AppIntentTraits](./appintent-tool-macros.md), [IntentVisibility](./intentvisibility.md), [ToolIntent](./toolintent.md) |
| Entity support | [GenerableEntity](./generableentity.md), [AppEntity(_:) / AppEntity(_:schema:) / AppEntityTraits](./appentity-generable-macros.md), `ComputedProperty(title:description:authenticationPolicy:visibility:)` and `DeferredProperty(...)` overloads (see entities/computedproperty and entities/deferredproperty) |

### What the preview supports

| Capability | Condition |
| --- | --- |
| Requests that do not mention your app | The app is in the foreground, a Live Activity is active, or the person continues a Siri app conversation that mentions your app. |
| Requests that mention your app | Needed while the app is in the background; Siri can then find custom content and perform custom actions. |
| Requests that span apps | Siri finds custom content in one app, transfers it to another app, and performs an action. |

## Notes

- Availability of the preview: iOS, iPadOS, macOS and visionOS, on devices that support Apple Intelligence and in regions where Apple Intelligence and Siri AI are available. The overview page itself carries no platform metadata; the symbols it lists are iOS 27.3+ (beta), see each page.
- Apple states that during the Siri AI Developer Preview the App Intents API and Siri functionality may change.
- Testing: build with Xcode, sign with a development profile and run on a device that supports the preview, or distribute to internal testers in TestFlight. The preview is not available to external TestFlight testers or to versions published on the App Store, even if the app uses App Intents API to integrate custom actions and content with Siri.
- Siri can only find custom content and perform custom actions that an app makes explicitly available using App Intents. Custom content is shown in card snippets the app provides (see CardSnippet in system-integration).
- For complex multi-step tasks, Siri may need extra guidance; the preview adds app skills (see the orchestrating page).
- Verification features: the Siri Integration Advisor in Xcode and the Siri Evaluations framework (scripted requests to Siri). Neither framework page was fetched; they are not covered by this skill.
- Intents that conform to a primary-domain app schema (for example the messages domain) are already available to Siri; see app-schemas.
- Source: https://developer.apple.com/documentation/appintents/siri-ai-developer-preview (fetched 2026-11-14, topic list read from the page JSON)

## Related

- [Bringing custom actions and content to Siri](./bringing-custom-actions-and-content-to-siri.md)
- [ToolIntent](./toolintent.md)
- [App schemas](../app-schemas/README.md)
