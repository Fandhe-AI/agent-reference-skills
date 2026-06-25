# NSFetchedResultsController

Manages the results of an `NSFetchRequest` and notifies a delegate when the result set changes. Primary adapter for driving UITableView / UICollectionView from a Core Data store.

## Signature / Usage

```swift
class NSFetchedResultsController<ResultType> : NSObject
    where ResultType : NSFetchRequestResult

let request = MyEntity.fetchRequest()
request.sortDescriptors = [NSSortDescriptor(keyPath: \MyEntity.name, ascending: true)]

let frc = NSFetchedResultsController(
    fetchRequest: request,
    managedObjectContext: container.viewContext,
    sectionNameKeyPath: nil,   // nil = single section
    cacheName: nil
)
frc.delegate = self
try frc.performFetch()
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `fetchRequest` | `NSFetchRequest<ResultType>` | The underlying fetch request (must have sort descriptors) |
| `managedObjectContext` | `NSManagedObjectContext` | Context used to execute the fetch |
| `sectionNameKeyPath` | `String?` | Key path whose value groups objects into sections |
| `cacheName` | `String?` | On-disk cache name; `nil` disables caching |
| `fetchedObjects` | `[ResultType]?` | Flat array of all fetched results |
| `sections` | `[NSFetchedResultsSectionInfo]?` | Section metadata including `numberOfObjects` |
| `delegate` | `NSFetchedResultsControllerDelegate?` | Receives change notifications |

## Notes

- iOS 3.0+, macOS 10.12+, tvOS, watchOS 2.0+, visionOS 1.0+
- `fetchRequest` **must** have at least one `sortDescriptor`; otherwise `performFetch()` throws.
- Three tracking modes: no tracking (delegate `nil`), memory-only (delegate set, `cacheName` `nil`), full persistent (delegate + `cacheName`).
- Even an empty `controllerDidChangeContent(_:)` implementation is enough to enable change tracking.
- Call `NSFetchedResultsController.deleteCache(withName:)` before modifying the fetch request's sort descriptors, predicate, or section key path.

```swift
// UITableView data source
override func tableView(_ tableView: UITableView,
                        numberOfRowsInSection section: Int) -> Int {
    frc.sections?[section].numberOfObjects ?? 0
}

override func tableView(_ tableView: UITableView,
                        cellForRowAt indexPath: IndexPath) -> UITableViewCell {
    let object = frc.object(at: indexPath)
    // configure cell
}
```

## Related

- [NSFetchRequest](./nsfetchrequest.md)
- [NSManagedObjectContext](./nsmanagedobjectcontext.md)
- [@FetchRequest (SwiftUI)](./fetchrequest-swiftui.md)
