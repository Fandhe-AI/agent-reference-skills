# NSBatchInsertRequest

Inserts a batch of records directly into the persistent store without loading objects into memory. Significantly faster than individual `NSManagedObject` insertions for large datasets.

## Signature / Usage

```swift
class NSBatchInsertRequest : NSPersistentStoreRequest

// Option 1: array of dictionaries
let request = NSBatchInsertRequest(
    entityName: "LogEntry",
    objects: [
        ["message": "a", "timestamp": Date()],
        ["message": "b", "timestamp": Date()]
    ]
)

// Option 2: dictionary handler (streaming, memory-efficient)
var index = 0
let request = NSBatchInsertRequest(entityName: "LogEntry") { dict in
    guard index < data.count else { return true } // return true to stop
    dict["message"] = data[index].message
    index += 1
    return false
}

let result = try context.execute(request) as? NSBatchInsertResult
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `entityName` | `String` | Name of the entity to insert into |
| `entity` | `NSEntityDescription?` | Alternative to `entityName` |
| `objectsToInsert` | `[[String: Any]]?` | Array-of-dictionaries payload |
| `dictionaryHandler` | `((NSMutableDictionary) -> Bool)?` | Streaming dictionary provider; return `true` to stop |
| `managedObjectHandler` | `((NSManagedObject) -> Bool)?` | Streaming managed-object provider; return `true` to stop |
| `resultType` | `NSBatchInsertRequestResultType` | `.statusOnly`, `.objectIDs`, `.count` |

## Notes

- iOS 13.0+, macOS 10.15+, tvOS 13.0+, watchOS 6.0+, visionOS 1.0+
- Bypasses the managed object context — in-memory contexts are **not** updated automatically. Merge results if needed.
- Validation rules still apply at the store level; constraint violations will cause an error.
- `managedObjectHandler` variant provides type-safe property access but has slightly more overhead than dictionary handler.

```swift
// Merge inserted IDs back into context
request.resultType = .objectIDs
let result = try context.execute(request) as! NSBatchInsertResult
let ids = result.result as! [NSManagedObjectID]
NSManagedObjectContext.mergeChanges(
    fromRemoteContextSave: [NSInsertedObjectsKey: ids],
    into: [viewContext]
)
```

## Related

- [NSBatchDeleteRequest](./nsbatchdeleterequest.md)
- [NSManagedObjectContext](./nsmanagedobjectcontext.md)
