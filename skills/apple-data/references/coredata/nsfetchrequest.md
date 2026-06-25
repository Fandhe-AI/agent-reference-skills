# NSFetchRequest

Describes the search criteria — entity, predicate, sort order, and result shape — for retrieving data from a Core Data persistent store.

## Signature / Usage

```swift
class NSFetchRequest<ResultType> : NSPersistentStoreRequest
    where ResultType : NSFetchRequestResult

// Preferred: generated typed method on entity subclass
let request = MyEntity.fetchRequest()

// Manual
let request = NSFetchRequest<MyEntity>(entityName: "MyEntity")
request.predicate = NSPredicate(format: "status == %@", "active")
request.sortDescriptors = [NSSortDescriptor(keyPath: \MyEntity.name, ascending: true)]
request.fetchLimit = 50

let results = try context.fetch(request)
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `entityName` | `String?` | Name of the entity to fetch |
| `predicate` | `NSPredicate?` | Filter condition |
| `sortDescriptors` | `[NSSortDescriptor]?` | Ordering of results |
| `fetchLimit` | `Int` | Maximum number of objects returned (0 = unlimited) |
| `fetchOffset` | `Int` | Number of leading objects to skip |
| `fetchBatchSize` | `Int` | Incremental load batch size (0 = all at once) |
| `resultType` | `NSFetchRequestResultType` | `.managedObjectResultType` (default), `.managedObjectIDResultType`, `.dictionaryResultType`, `.countResultType` |
| `includesPendingChanges` | `Bool` | Include unsaved in-memory changes (default `true`) |
| `returnsObjectsAsFaults` | `Bool` | Return faults instead of fully loaded objects (default `true`) |
| `relationshipKeyPathsForPrefetching` | `[String]?` | Relationships to eagerly load |
| `propertiesToFetch` | `[Any]?` | Restrict fetched properties (dictionary result type) |
| `propertiesToGroupBy` | `[Any]?` | GROUP BY fields for aggregate queries |
| `havingPredicate` | `NSPredicate?` | HAVING clause for grouped results |
| `returnsDistinctResults` | `Bool` | Deduplicate results |

## Notes

- iOS 3.0+, macOS 10.4+, tvOS, watchOS 2.0+, visionOS 1.0+
- Always accesses the persistent store for the latest data; not a cached view.
- `NSFetchedResultsController` requires at least one `sortDescriptor`.
- Use `fetchBatchSize` to avoid loading large result sets fully into memory.

## Related

- [NSManagedObjectContext](./nsmanagedobjectcontext.md)
- [NSPredicate](./nspredicate.md)
- [NSSortDescriptor](./nssortdescriptor.md)
- [NSFetchedResultsController](./nsfetchedresultscontroller.md)
