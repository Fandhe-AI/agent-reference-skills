# @Query

SwiftUI property-wrapper macro that fetches all instances of a model type and keeps the view in sync with the underlying store.

## Signature / Usage

```swift
@attached(accessor)
@attached(peer, names: prefixed(`_`))
macro Query()
```

```swift
struct TripListView: View {
    // Fetch all trips
    @Query private var trips: [Trip]

    // With filter and sort
    @Query(
        filter: #Predicate<Trip> { $0.startDate > .now },
        sort: \.startDate
    )
    private var upcomingTrips: [Trip]

    var body: some View {
        List(trips) { TripRowView($0) }
    }
}
```

## Options / Props

Common macro overloads (all available as `@Query(...)`):

| Parameter | Type | Description |
|-----------|------|-------------|
| `filter` | `Predicate<T>?` | Predicate to narrow results |
| `sort` | `[SortDescriptor<T>]` or `KeyPath` | Sort order |
| `order` | `SortOrder` | `.forward` or `.reverse` (with KeyPath sort) |
| `animation` | `Animation?` | Animation for result changes |
| `transaction` | `Transaction?` | Transaction for result changes |

Accepts a full `FetchDescriptor<T>` as an alternative to individual parameters.

## Notes

- iOS 17.0+, macOS 14.0+, tvOS 17.0+, watchOS 10.0+, visionOS 1.0+
- Requires a `ModelContainer` in the SwiftUI environment (set via `.modelContainer(for:)`)
- The backing type is `Query<Element, Result>`; dynamic filtering requires rebuilding the view with a new predicate

## Related

- [Query](./query-struct.md)
- [FetchDescriptor](./fetch-descriptor.md)
- [#Predicate](./predicate.md)
- [SortDescriptor](./sort-descriptor.md)
