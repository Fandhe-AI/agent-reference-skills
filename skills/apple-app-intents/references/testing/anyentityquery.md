---
source: https://developer.apple.com/documentation/appintentstesting/anyentityquery
---

# AnyEntityQuery

A type-erased, intermediate representation of your entity query for testing purposes.

## Signature / Usage

```swift
struct AnyEntityQuery
```

The structure resolves to your concrete query type, and allows you to test your entity queries and verify their results:

```swift
let landmarkDef = definitions.entities["LandmarkEntity"]

// Query by string.
let stringQueryResults = try await landmarkDef.entities(matching: "Yosemite")

// Query by identifiers.
let specific = try await landmarkDef.entities(identifiers: ["yosemite-falls"])

// Get all entities.
let all = try await landmarkDef.allEntities()
```

## Notes

- iOS 27.0+, iPadOS 27.0+, Mac Catalyst 27.0+, macOS 27.0+, tvOS 27.0+, visionOS 27.0+, watchOS 27.0+
- Conforms to `Equatable`, `Sendable`, `SendableMetatype`.
- The page lists no members; the `entities(matching:)`, `entities(identifiers:)`, and `allEntities()` calls in the example are called on an entity definition (`definitions.entities[...]`) and their declarations are not in this reference set.

## Related

- [IntentDefinitions](./intentdefinitions.md)
- [AnyAppEntity](./anyappentity.md)
- [AnyAppIntent](./anyappintent.md)
