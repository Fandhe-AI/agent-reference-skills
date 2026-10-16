# ResultsObserver

Observes and tracks changes to a collection of persistent models in a model context, keeping a fetched result set (optionally sectioned) synchronized as local, remote, or CloudKit-sync changes occur.

## Signature / Usage

```swift
final class ResultsObserver<Element, SectionTitle>
where Element : PersistentModel, SectionTitle : Hashable
```

```swift
// Unsectioned observer driven by a predicate and sort order
let observer = try ResultsObserver<Book, Never>(
    filterBy: #Predicate { $0.isPublished },
    sortBy: [SortDescriptor(\.title)],
    modelContext: context
)

// Sectioned observer grouped by a key path
let sectioned = try ResultsObserver<Book, String>(
    sectionBy: \.genre,
    modelContext: context
)
```

## Options / Props

| Member | Type | Description |
|--------|------|-------------|
| `init(fetchDescriptor:modelContext:isolation:)` | initializer | Builds an unsectioned observer (`SectionTitle` is `Never`) from a complete `FetchDescriptor` |
| `init(fetchDescriptor:sectionBy:modelContext:isolation:)` | initializer | Sectioned (`SectionTitle` is `String`); `sectionBy` is `KeyPath<Element, String>` or `KeyPath<Element, String?>` |
| `init(filterBy:sortBy:modelContext:isolation:)` | initializer | Builds an unsectioned observer from `Predicate<Element>?` and `[SortDescriptor<Element>]?` |
| `init(filterBy:sortBy:sectionBy:modelContext:isolation:)` | initializer | Sectioned; `sectionBy` is `KeyPath<Element, String>` or `KeyPath<Element, String?>` |
| `init(fetchDescriptor:modelContainer:isolation:)` | initializer | Same as the `modelContext:` form, taking a `ModelContainer` |
| `init(fetchDescriptor:sectionBy:modelContainer:isolation:)` | initializer | Sectioned; `KeyPath<Element, String>` / `KeyPath<Element, String?>` |
| `init(filterBy:sortBy:modelContainer:isolation:)` | initializer | Unsectioned; predicate and sort descriptors with a `ModelContainer` |
| `init(filterBy:sortBy:sectionBy:modelContainer:isolation:)` | initializer | Sectioned; `KeyPath<Element, String>` / `KeyPath<Element, String?>` |
| `modelContext` | `let ModelContext` | The model context from which models are fetched |
| `fetchDescriptor` | `FetchDescriptor<Element>` | The effective fetch criteria backing the observer |
| `filterBy` | `Predicate<Element>?` | Predicate used to filter observed models |
| `sortBy` | `[SortDescriptor<Element>]` | Sort order applied to results |
| `sectionBy` | `PartialKeyPath<Element>?` | Key path used to section results, if any |
| `sections` | `SectionedResults<Element, SectionTitle>?` | Sections computed from the current results, grouped by `sectionBy` |
| `results` | `FetchResultsCollection<Element>` | The live collection of fetched results |
| `element(at:)` | `(IndexPath) -> Element?` | Returns the element at a given index path |
| `indexPath(for:)` | `(Element) -> IndexPath?` | Returns the index path for a given element |

## Notes

- iOS 27.0+, iPadOS 27.0+, Mac Catalyst 27.0+, macOS 27.0+, tvOS 27.0+, visionOS 27.0+, watchOS 27.0+
- `Observable`, so SwiftUI views can bind directly to `results` or `sections` and update automatically
- Reacts to local changes in the same context, remote changes from other contexts in the same container, and external changes (other processes / CloudKit sync)
- Use `Never` as `SectionTitle` for an unsectioned observer, or a `Hashable` section value type (e.g. `String`) with `sectionBy` for grouped results
- Source: https://developer.apple.com/documentation/swiftdata/resultsobserver , https://developer.apple.com/documentation/swiftdata/resultsobserver/init(fetchdescriptor:modelcontainer:isolation:) (fetched 2026-10-16, iOS 27 SDK docs)

## Related

- [ModelContext](./model-context.md)
- [FetchDescriptor](./fetch-descriptor.md)
- [History tracking](./history-tracking.md)
- [SectionedResults / ResultsSection](./sectioned-results.md)
