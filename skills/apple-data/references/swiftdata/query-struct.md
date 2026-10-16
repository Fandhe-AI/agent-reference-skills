# Query

A `DynamicProperty` struct that fetches models using specified criteria and keeps them in sync with the store. The `@Query` macro produces a `Query<Element, Result>` under the hood.

## Signature / Usage

```swift
@MainActor @preconcurrency
struct Query<Element, Result> where Element: PersistentModel
```

```swift
// Typically used via @Query macro; direct use for programmatic construction:
struct FilteredList: View {
    @Query var items: [Item]

    init(filter: Predicate<Item>) {
        let descriptor = FetchDescriptor<Item>(predicate: filter)
        _items = Query(descriptor)
    }

    var body: some View {
        List(items) { Text($0.name) }
    }
}
```

## Options / Props

| Member | Type | Description |
|--------|------|-------------|
| `wrappedValue` | `Result` | Most recent fetch result |
| `modelContext` | `ModelContext` | Context the query interacts with |
| `fetchError` | `(any Error)?` | Error from the most recent fetch |
| `sections` | `SectionedResults<Element, String>` | Sectioned results of a query created with a `sectionBy` initializer. iOS 27.0+ |

### Key initializers

```swift
init(_ descriptor: FetchDescriptor<Element>, animation: Animation?)
init(filter: Predicate<Element>?, sort: [SortDescriptor<Element>], animation: Animation?)
init<Value>(filter: Predicate<Element>?, sort: KeyPath<Element, Value>, order: SortOrder, animation: Animation?)

// Sectioned (iOS 27.0+); Element : PersistentModel
init(filter: Predicate<Element>? = nil, sort descriptors: [SortDescriptor<Element>] = [], animation: Animation, sectionBy sectionKeyPath: KeyPath<Element, String>) where Result == SectionedResults<Element, String>
init(filter: Predicate<Element>? = nil, sort descriptors: [SortDescriptor<Element>] = [], animation: Animation, sectionBy sectionKeyPath: KeyPath<Element, String?>) where Result == SectionedResults<Element, String>
```

## Notes

- iOS 17.0+, macOS 14.0+, tvOS 17.0+, watchOS 10.0+, visionOS 1.0+
- Conforms to `DynamicProperty` — SwiftUI automatically invalidates and re-renders when underlying data changes
- The `sectionBy` initializers (animation / transaction / filter-sort-order families) are iOS 27.0+, iPadOS 27.0+, Mac Catalyst 27.0+, macOS 27.0+, tvOS 27.0+, visionOS 27.0+, watchOS 27.0+; `Result` is `SectionedResults<Element, String>`
- Check `fetchError` to surface persistent-store errors in the UI

## Related

- [@Query](./query-macro.md)
- [FetchDescriptor](./fetch-descriptor.md)
