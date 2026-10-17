---
source: https://developer.apple.com/documentation/appintents/intentvaluequery
---

# IntentValueQuery

A query that provides entity values to the system; for example, for visual intelligence search.

## Signature / Usage

```swift
protocol IntentValueQuery : PersistentlyIdentifiable, _SupportsAppDependencies, Sendable
```

```swift
struct LandmarkIntentValueQuery: IntentValueQuery {

    @Dependency var modelData: ModelData

    func values(for input: SemanticContentDescriptor) async throws -> [VisualSearchResult] {

        guard let pixelBuffer = input.pixelBuffer else {
            return []
        }

        let landmarks = try await modelData.search(matching: pixelBuffer)

        return landmarks
    }
}
```

## Options / Props

| Member | Declaration | Description |
|--------|-------------|-------------|
| `Input` | `associatedtype Input : _IntentValue` | Required. The input value type, for visual intelligence `SemanticContentDescriptor`. |
| `Result` | `associatedtype Result : ResultsCollection = [Self.ResultValue]` | Required. The collection type that `values(for:)` returns. |
| `ResultValue` | `associatedtype ResultValue = Self.Result.Result.ValueType` | Required. The element value type of the result. |
| `init()` | `init()` | Required initializer. |
| `values(for:)` | `func values(for: Self.Input) async throws -> Self.Result` | Required. Returns the values for the input. |
| `allowedExecutionTargets` | `static var allowedExecutionTargets: IntentExecutionTargets` | Required (2 default implementations exist). A set of targets that can run this query. |
| `ExecutionTargets` | `typealias ExecutionTargets` | Type alias for execution targets. |

## Notes

- iOS 26.0+, iPadOS 26.0+, Mac Catalyst 26.0+, macOS 26.0+, tvOS 26.0+, visionOS 26.0+, watchOS 26.0+
- Inherits from `PersistentlyIdentifiable`, `Sendable`, `SendableMetatype`. Listed under "Intent queries" with `IntentValueContainer` and `IntentValueExpression`.
- Adoption steps for visual intelligence search: adopt `IntentValueQuery`, implement `values(for:)` taking a `SemanticContentDescriptor`, search the app content using `labels` and/or an image created from `pixelBuffer`, and return `AppEntity` objects.
- Only one `IntentValueQuery` taking a `SemanticContentDescriptor` is allowed per app. To return more than one entity type from that query, use the `@UnionValue` macro on an enum:

```swift
@UnionValue
enum VisualSearchResult {
    case landmark(LandmarkEntity)
    case collection(CollectionEntity)
}
```

- Return results quickly and limit the list; the article suggests returning the first hundred for several hundred matches and linking to the full list in the app.
- Not an `EntityQuery`: `IntentValueQuery` takes an input value and returns entity values, while the `EntityQuery` family resolves entities by identifier / string / property.

## Related

- [SemanticContentDescriptor](./semanticcontentdescriptor.md)
- [Visual Intelligence (framework overview)](./visualintelligence-overview.md)
- [Visual intelligence schema domain](./domain-visual-intelligence.md)
- [IntentValueContainer](../data-types/intentvaluecontainer.md)
- [IntentValueExpression](../data-types/intentvalueexpression.md)
- [EntityQuery](../queries/entityquery.md)
- [IntentExecutionTargets](../intents/intentexecutiontargets.md)
