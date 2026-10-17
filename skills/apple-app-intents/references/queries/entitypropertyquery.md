---
source: https://developer.apple.com/documentation/appintents/entitypropertyquery
---

# EntityPropertyQuery

An interface for locating entities by matching values against one or more of their properties.

## Signature / Usage

```swift
protocol EntityPropertyQuery : EntityQuery
```

```swift
class MyPhoto: AppEntity {
    @Property(title: "Date taken")
    let takenAt: Date

    @Property(title: "Tags")
    let tags: [String]
}

struct MyPhotoQuery: EntityPropertyQuery {
   static var properties = QueryProperties {
       Property(\.$takenAt) {
           LessThanComparator { URLQueryItem(name: "takenBefore", value: $0) }
           GreaterThanComparator { URLQueryItem(name: "takenAfter", value: $0) }
       }
       Property(\.$tags) {
           ContainsComparator { URLQueryItem(name: "tagsContains", value: $0) }
       }
   }

   func entities(
       matching comparators: [URLQueryItem],
       mode: ComparatorMode,
       sortedBy: [Sort<MyPhoto>],
       limit: Int?
   ) async throws -> [MyPhoto] {
       var components = URLComponents()
       components.queryItems = comparators
       let url = components.url(relativeTo: "https://myphotosbackend.com/photos")

       return try await PhotosBackend.fetch(url: url)
   }
}
```

## Options / Props

| Name | Declaration | Description |
| --- | --- | --- |
| `properties` | `static var properties: Self.QueryProperties` (required) | The set of query properties supported by this query. |
| `QueryProperties` | `typealias QueryProperties` | Type alias (no abstract on the page). |
| `Property` | `typealias Property` | Type alias (no abstract on the page). |
| `ComparatorMappingType` | `associatedtype ComparatorMappingType` (required) | Type produced by `EntityQueryComparator` mapping closures and supplied as input to `results`. |
| `sortingOptions` | `static var sortingOptions: Self.SortingOptions` (required) | The set of sorting orders supported by this query. |
| `SortingOptions` | `typealias SortingOptions` | Type alias (no abstract on the page). |
| `SortableBy` | `typealias SortableBy` | Type alias (no abstract on the page). |
| `entities(matching:mode:sortedBy:limit:)` | `func entities(matching: [Self.ComparatorMappingType], mode: Self.ComparatorMode, sortedBy: [EntityQuerySort<Self.Entity>], limit: Int?) async throws -> Self.Result` (required) | Retrieves instances matching the supplied comparators. |
| `Sort` | `typealias Sort` | Type alias (no abstract on the page). |
| `ComparatorMode` | `typealias ComparatorMode` | Type alias (no abstract on the page). |
| `EntityQueryComparatorMode` | `enum EntityQueryComparatorMode` | Modes that determine how to apply a query's comparators. |
| `findIntentDescription` | `static var findIntentDescription: IntentDescription?` (required, 1 default implementation) | Defines how the generated 'Find' Shortcuts action of this query type is displayed to the user. |

## Notes

- Platforms: iOS 16.0+, iPadOS 16.0+, Mac Catalyst 16.0+, macOS 13.0+, tvOS 16.0+, visionOS (no introduced version listed on the page), watchOS 9.0+.
- Provides an `EntityQuery` with the ability to query instances according to their traits as modeled through query properties and corresponding comparators.
- At runtime, `entities(matching:mode:sortedBy:limit:)` receives an array of `ComparatorMappingType` instances (a type of your choice representing the comparator mappings given by the user) and fetches entities matching them. The `properties` static property contains the set of `EntityQueryProperty` objects the query accepts; for each property's supported `EntityQueryComparator`s you supply a closure that transforms a runtime user-supplied value into a `ComparatorMappingType`.
- The App Intents runtime invokes the mapping closures for each comparator in the user request, gathers their `ComparatorMappingType` outputs, then invokes `entities`. Use whichever backend suits your app (in-memory lookup, Core Data, remote network call, and so on).
- The code listing is corrected from the official page, which writes `LessThanMapping` / `GreaterThanMapping` (the API names are `LessThanComparator` / `GreaterThanComparator`), `URLQueryItem(name: "takenAfter": value: $0)` (colon instead of comma), and `let components` (mutated afterwards).
- Per the `EnumerableEntityQuery` page, use `EntityPropertyQuery` when there may be many thousands of entities or individual entities may become large in memory, so only entities matching the criteria are fetched.

## Related

- [EntityQuery](./entityquery.md)
- [EntityQueryProperties](./entityqueryproperties.md)
- [EntityQueryProperty](./entityqueryproperty.md)
- [Property comparators](./property-comparators.md)
- [EntityQuerySortingOptions](./entityquerysortingoptions.md)
- [EntityQuerySort](./entityquerysort.md)
- [EnumerableEntityQuery](./enumerableentityquery.md)
