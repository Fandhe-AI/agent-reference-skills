# NSBatchDeleteRequest

Deletes managed objects directly at the SQLite store level without loading them into memory. Efficient for bulk deletions; bypasses context change tracking.

## Signature / Usage

```swift
class NSBatchDeleteRequest : NSPersistentStoreRequest

// From a fetch request (most flexible)
let fetch = NSFetchRequest<NSFetchRequestResult>(entityName: "LogEntry")
fetch.predicate = NSPredicate(format: "timestamp < %@", cutoffDate as CVarArg)
let request = NSBatchDeleteRequest(fetchRequest: fetch)
request.resultType = .resultTypeObjectIDs

let result = try context.execute(request) as! NSBatchDeleteResult
let ids = result.result as! [NSManagedObjectID]
NSManagedObjectContext.mergeChanges(
    fromRemoteContextSave: [NSDeletedObjectsKey: ids],
    into: [context]
)

// From known object IDs
let request = NSBatchDeleteRequest(objectIDs: [id1, id2])
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `fetchRequest` | `NSFetchRequest<NSFetchRequestResult>` | Identifies objects to delete |
| `resultType` | `NSBatchDeleteRequestResultType` | `.resultTypeStatusOnly` (default), `.resultTypeObjectIDs`, `.resultTypeCount` |

## Notes

- iOS 9.0+, macOS 10.11+, tvOS 9.0+, watchOS 2.0+, visionOS 1.0+
- Only works with **SQLite** persistent stores; in-memory stores are not supported.
- Does **not** automatically update in-memory contexts. Always set `resultType = .resultTypeObjectIDs` and call `NSManagedObjectContext.mergeChanges(fromRemoteContextSave:into:)`.
- Incompatible with **Deny** delete rules. Ensure relationships use Nullify, Cascade, or No Action.
- All IDs in `init(objectIDs:)` must belong to the same entity type.

## Related

- [NSBatchInsertRequest](./nsbatchinsertrequest.md)
- [NSManagedObjectContext](./nsmanagedobjectcontext.md)
- [NSFetchRequest](./nsfetchrequest.md)
