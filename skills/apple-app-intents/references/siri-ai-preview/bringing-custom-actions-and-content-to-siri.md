---
source: https://developer.apple.com/documentation/appintents/bringing-custom-actions-and-content-to-siri
---

# Bringing custom actions and content to Siri

Support the Siri AI Developer Preview by turning custom app intents into tools Siri can call, and by helping Siri understand your app entities.

## Signature / Usage

Make an intent a tool with the `@AppIntent(.tool)` macro, and give the intent and each parameter a `title` and `description`:

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

For an intent that conforms to a schema available only in Shortcuts, pass the tool trait and the schema:

```swift
@AppIntent(.tool, schema: .journal.createEntry)
struct CreateEntryIntent {
    // ...
}
```

## Options / Props

| Step | What to do |
| --- | --- |
| Turn intents into tools | Add `@AppIntent(.tool)` to a new or existing app intent; the macro adds `ToolIntent` conformance. Do not add it to an intent that already conforms to a schema in a primary domain (for example `sendMessage`), nor to an intent without a custom `perform()` action such as a `WidgetConfigurationIntent` that only configures a widget. |
| Describe intents | Provide `title` and `description` for the intent and for each parameter. |
| Describe entities | Pass a `description` (in addition to `title`) to each `@Property`, `@DeferredProperty` and `@ComputedProperty` of your app entities. |
| Protect sensitive data | Declare `IntentAuthenticationPolicy` on the entity (static `authenticationPolicy`) or per property; the per-property policy applies only to responses Siri provides, so set the policy at intent level for intent results. Use `visibility: .internal` to keep a property to your app and its extensions. |
| Let Siri fill an entity | Add the generable trait with `@AppEntity(.generable)` to a `TransientAppEntity`; every property must also be a generable type. |
| Let Siri find entities | Make entities available to Spotlight; the system can also retrieve them from an `EnumerableEntityQuery` you provide, or use a `DynamicOptionsProvider` for a parameter. |
| Onscreen context | Associate views, user activities and so on with app entities; the APIs are the same as for schema-conforming entities. |
| Discoverability | Donate app intents when people perform the actions in your app (behavioral cues). |
| Cross-app transfer | Make entities `Transferable` and provide transferable representations when intents use custom entities as parameters or results. |
| Verify | Test with the App Intents Testing framework, the Siri Integration Advisor in Xcode, the Siri Evaluations framework, and manually with Shortcuts, Spotlight and Siri. |

### Entity with authentication policy and internal property

```swift
struct BankAccount: AppEntity {
    static let authenticationPolicy: IntentAuthenticationPolicy =
        .alwaysAllowed

    @Property(
        title: "Nickname",
        description: "The name the account holder gave this account.",
        authenticationPolicy: .requiresAuthentication
    )
    var nickname: String

    @Property(
        title: "Balance",
        description: "The current balance, including pending transactions.",
        authenticationPolicy: .requiresLocalDeviceAuthentication
    )
    var balance: IntentCurrencyAmount

    @Property(title: "Branch", authenticationPolicy: .requiresAuthentication)
    var branch: String

    @Property(title: "Routing Number", visibility: .internal)
    var routingNumber: String
}
```

### Generable entity

```swift
@AppEntity(.generable)
struct FlightSearch: TransientAppEntity {
    static let typeDisplayRepresentation: TypeDisplayRepresentation =
        "Flight Search"

    @Property(title: "Origin", description: "IATA code of the departure airport")
    var origin: String

    @Property(title: "Destination", description: "IATA code of the arrival airport")
    var destination: String

    @Property(title: "Date", description: "The day to depart")
    var date: Date

    @Property(title: "Cabin", description: "The cabin class to search")
    var cabin: CabinClass  // An app enumeration with the different class types.

    var displayRepresentation: DisplayRepresentation {
        "\(origin) → \(destination)"
    }

    init() {}
}
```

## Notes

- iOS 27.3+ (beta) for the new symbols this article uses (`ToolIntent`, `AppIntentTraits`, `IntentVisibility`, `GenerableEntity`, the `visibility:` macro overloads). The article page itself carries no platform metadata.
- Apple states that during the Siri AI Developer Preview the App Intents API and Siri functionality may change.
- If an intent already conforms to a schema in a primary domain listed under app schema domains, Siri already supports it; adding `@AppIntent(.tool)` to it is not needed. A schema that Siri already supports (such as `sendMessage`) combined with the tool trait is a build error (stated on the ToolIntent page).
- Example code in this page is verbatim from the article; the first two listings differ slightly from the ToolIntent page (`LocalizedStringResource(...)` wrapping), which is kept as published.
- Known issue (iOS 27.3 beta release notes): if you define `authenticationPolicy` on an `AppEntity` or `AppEntity` property that requires unlock, Siri AI might not request an unlock before it displays these entities.
- Source: https://developer.apple.com/documentation/appintents/bringing-custom-actions-and-content-to-siri (fetched 2026-11-14)
- Source: https://developer.apple.com/documentation/ios-ipados-release-notes/ios-ipados-27_3-release-notes (fetched 2026-11-14)

## Related

- [ToolIntent](./toolintent.md)
- [GenerableEntity](./generableentity.md)
- [IntentVisibility](./intentvisibility.md)
- [Orchestrating complex actions with app skills](./orchestrating-complex-actions-with-app-skills.md)
