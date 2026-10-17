---
source: https://developer.apple.com/documentation/appintentstesting/resolvedvaluequeryresult
---

# ResolvedValueQueryResult

The result of an intent value query.

## Signature / Usage

```swift
struct ResolvedValueQueryResult
```

Use the resolved value query result to verify that your `IntentValueQuery` returns the expected results:

```swift
let result = try await searchQuery.values(for: "Arizona")

// Verify individual items.
XCTAssertEqual(try result.items[0].name, "Botanical Garden")

// Cast items to a concrete value for additional verifications.
let entity: AnyAppEntity =
    try result.items[0].as(AnyAppEntity.self)
```

## Options / Props

| Member | Declaration | Description |
|--------|-------------|-------------|
| `items` | `let items: DynamicPropertyPathCollection` | The results that the query returns. |

## Notes

- iOS 27.0+, iPadOS 27.0+, Mac Catalyst 27.0+, macOS 27.0+, tvOS 27.0+, visionOS 27.0+, watchOS 27.0+
- Conforms to `Sendable`, `SendableMetatype`.
- `IntentValueQuery` is described in the App Intents framework as "A query that provides entity values to the system; for example, for visual intelligence search."
- The `values(for:)` call in the example comes from the page's code listing; its declaration is not in this reference set.

## Related

- [ResolvedIntentResult](./resolvedintentresult.md)
- [DynamicPropertyPath](./dynamicpropertypath.md)
- [AnyAppEntity](./anyappentity.md)
