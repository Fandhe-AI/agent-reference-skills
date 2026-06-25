# @FetchRequest (SwiftUI)

SwiftUI property wrapper that executes a Core Data fetch request and provides live-updating results to a view. Re-renders the view whenever the fetched data changes.

## Signature / Usage

```swift
@MainActor
@propertyWrapper
struct FetchRequest<Result> where Result : NSFetchRequestResult

// Inline sort + predicate
@FetchRequest(
    sortDescriptors: [SortDescriptor(\.timestamp, order: .reverse)],
    predicate: NSPredicate(format: "isComplete == false"),
    animation: .default
)
private var items: FetchedResults<MyEntity>

// Pre-built NSFetchRequest
@FetchRequest(fetchRequest: MyEntity.activeItemsRequest())
private var items: FetchedResults<MyEntity>
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `wrappedValue` | `FetchedResults<Result>` | The live collection of fetched managed objects |
| `projectedValue` | `Binding<FetchRequest<Result>.Configuration>` | Binding to update predicate/sortDescriptors at runtime |

### Initializers

| Initializer | When to use |
|---|---|
| `init(sortDescriptors:predicate:animation:)` | Infers entity from `Result` type |
| `init(entity:sortDescriptors:predicate:animation:)` | Explicit entity description |
| `init(fetchRequest:animation:)` | Use a pre-configured `NSFetchRequest` |

## Notes

- iOS 13.0+, macOS 10.15+, tvOS 13.0+, watchOS 6.0+, visionOS 1.0+ (SwiftUI framework)
- Requires `\.managedObjectContext` in the SwiftUI environment (set via `.environment(\.managedObjectContext, container.viewContext)`).
- Always declare as `private` to prevent accidental memberwise initialization.
- To change the predicate or sort descriptors at runtime, use the `$` projected value binding: `$items.predicate = ...`.
- Use `SectionedFetchRequest` for grouped results.

```swift
struct ContentView: View {
    @Environment(\.managedObjectContext) private var context
    @FetchRequest(
        sortDescriptors: [SortDescriptor(\.name)],
        animation: .default
    )
    private var items: FetchedResults<MyEntity>

    var body: some View {
        List(items) { item in
            Text(item.name ?? "")
        }
    }
}
```

## Related

- [NSFetchRequest](./nsfetchrequest.md)
- [NSFetchedResultsController](./nsfetchedresultscontroller.md)
- [NSManagedObjectContext](./nsmanagedobjectcontext.md)
