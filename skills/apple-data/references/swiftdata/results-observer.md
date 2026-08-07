# ResultsObserver

Observes and tracks changes to a collection of persistent models in a model context, keeping a fetched result set (optionally sectioned) synchronized as local, remote, or CloudKit-sync changes occur.

## Signature / Usage

```swift
final class ResultsObserver<Element, SectionName>
where Element : PersistentModel, SectionName : Hashable
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
| `init(fetchDescriptor:modelContext:isolation:)` | initializer | Builds the observer from a complete `FetchDescriptor` |
| `init(filterBy:sortBy:modelContext:isolation:)` | initializer | Builds the observer from a predicate and sort descriptors |
| `sectionBy` (initializer variant) | `KeyPath<Element, String>` / `KeyPath<Element, String?>` | Groups results into named sections |
| `fetchDescriptor` | `FetchDescriptor<Element>` | The effective fetch criteria backing the observer |
| `filterBy` | `Predicate<Element>?` | Predicate used to filter observed models |
| `sortBy` | `[SortDescriptor<Element>]` | Sort order applied to results |
| `sectionBy` | `PartialKeyPath<Element>?` | Key path used to section results, if any |
| `sections` | `ResultsSectionCollection<Element, SectionName>?` | Sectioned view of the results, when configured |
| `results` | `FetchResultsCollection<Element>` | The live collection of fetched results |
| `element(at:)` | `(IndexPath) -> Element?` | Returns the element at a given index path |
| `indexPath(for:)` | `(Element) -> IndexPath?` | Returns the index path for a given element |

## Notes

- Beta: iOS 27.0+, iPadOS 27.0+, macOS 27.0+, tvOS 27.0+, visionOS 27.0+, watchOS 27.0+
- `Observable`, so SwiftUI views can bind directly to `results` or `sections` and update automatically
- Reacts to local changes in the same context, remote changes from other contexts in the same container, and external changes (other processes / CloudKit sync)
- Use `Never` as `SectionName` for an unsectioned observer, or a `Hashable` section value type (e.g. `String`) with `sectionBy` for grouped results

## Related

- [ModelContext](./model-context.md)
- [FetchDescriptor](./fetch-descriptor.md)
- [History tracking](./history-tracking.md)
