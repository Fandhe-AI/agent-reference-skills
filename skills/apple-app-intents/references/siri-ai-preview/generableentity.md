---
source: https://developer.apple.com/documentation/appintents/generableentity
---

# GenerableEntity

An interface that tells a model it can create an entity and fill in its properties directly.

## Signature / Usage

```swift
protocol GenerableEntity : TransientAppEntity
```

```swift
@AppEntity(.generable)
struct FlightSearch: TransientAppEntity {
    @Property(title: "Origin", description: "IATA code of the departure airport")
    var origin: String

    @Property(title: "Destination", description: "IATA code of the arrival airport")
    var destination: String

    @Property(title: "Date", description: "The day to depart")
    var date: Date
    // ...
}
```

Use it as a tool parameter type:

```swift
@AppIntent(.tool)
struct SearchFlights: AppIntent {
    static let title: LocalizedStringResource = "Search Flights"
    static let description = IntentDescription("Finds flights for a route and date.")

    @Parameter(title: "Search", description: "The route and date to search")
    var search: FlightSearch

    func perform() async throws -> some ReturnsValue<[FlightEntity]> {
        .result(value: try await FlightService.search(search))
    }
}
```

## Options / Props

| Property type allowed in a generable entity | Notes |
| --- | --- |
| A plain value type such as `Int`, `String` or `Date` | Include `title` and `description` on each property so the model can map its output to the value (for example an IATA code). |
| An `AppEnum` type | |
| Another `GenerableEntity` type | |
| An array of one of the above | |

## Notes

- iOS 27.3+ (beta), iPadOS 27.3+, Mac Catalyst 27.3+, macOS 27.3+, visionOS 27.3+. Inherits from `TransientAppEntity`, `AppEntity` and related display / identity protocols.
- Precede the type with `@AppEntity` and the generable trait, and adopt `TransientAppEntity` so the system can create instances. The compiler reports an error if a property contains a non-generable type.
- If a tool parameter contains a non-generable, app-owned entity type, the system runs entity queries to set the value instead of creating the entity directly.
- Unrelated to the Foundation Models framework and its generation APIs, which belong to the apple-intelligence skill; this protocol only lets Siri's model create an App Intents entity.
- Apple states that during the Siri AI Developer Preview the App Intents API and Siri functionality may change.
- Source: https://developer.apple.com/documentation/appintents/generableentity (fetched 2026-11-14)

## Related

- [AppEntity(_:) / AppEntity(_:schema:) / AppEntityTraits](./appentity-generable-macros.md)
- [ToolIntent](./toolintent.md)
- [TransientAppEntity](../entities/transientappentity.md)
