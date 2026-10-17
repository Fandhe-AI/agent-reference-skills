---
source: https://developer.apple.com/documentation/appintents/enumerableentityquery
---

# EnumerableEntityQuery

An interface you use to provide a short list of entities that are relatively small in size.

## Signature / Usage

```swift
protocol EnumerableEntityQuery : EntityQuery
```

```swift
func allEntities() async throws -> Self.Result
static var findIntentDescription: IntentDescription?
```

## Options / Props

| Name | Declaration | Description |
| --- | --- | --- |
| `allEntities()` | `func allEntities() async throws -> Self.Result` (required, 1 default implementation) | Returns all available results. |
| `findIntentDescription` | `static var findIntentDescription: IntentDescription?` (required, 1 default implementation) | Defines how the generated 'Find' Shortcuts action of this query type is displayed to the user. |

## Notes

- Platforms: iOS 17.0+, iPadOS 17.0+, Mac Catalyst 17.0+, macOS 14.0+, tvOS 17.0+, visionOS (no introduced version listed on the page), watchOS 10.0+.
- Implementing `EnumerableEntityQuery` enables the Shortcuts app to generate a Find action and do filtering automatically.
- Use it when the count of entities is relatively small and their size in memory is limited. For many thousands of entities, or entities that may become large in memory, use `EntityPropertyQuery` so only entities matching the criteria are fetched from your model.
- Inherited by `UniqueAppEntityQuery`; conforming type `UniqueAppEntityProvider`.
- The official page has no code listing; the snippets above are the member declarations only.

## Related

- [EntityQuery](./entityquery.md)
- [EntityPropertyQuery](./entitypropertyquery.md)
- [UniqueAppEntityQuery](./uniqueappentityquery.md)
- [IndexedEntityQuery](./indexedentityquery.md)
