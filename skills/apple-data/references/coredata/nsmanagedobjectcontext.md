# NSManagedObjectContext

An in-memory scratchpad that tracks, validates, and persists changes to a graph of `NSManagedObject` instances. All Core Data reads and writes go through a context.

## Signature / Usage

```swift
class NSManagedObjectContext : NSObject

// Preferred initializer
init(_ concurrencyType: NSManagedObjectContext.ConcurrencyType)
// .mainQueueConcurrencyType  — for UI work
// .privateQueueConcurrencyType — for background work
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `concurrencyType` | `NSManagedObjectContextConcurrencyType` | Queue affinity of the context |
| `persistentStoreCoordinator` | `NSPersistentStoreCoordinator?` | Root store coordinator |
| `parent` | `NSManagedObjectContext?` | Parent context (save propagates one level up) |
| `automaticallyMergesChangesFromParent` | `Bool` | Merge parent saves automatically |
| `mergePolicy` | `Any` | Conflict resolution policy |
| `undoManager` | `UndoManager?` | Undo/redo support |
| `hasChanges` | `Bool` | Whether there are unsaved changes |
| `insertedObjects` | `Set<NSManagedObject>` | Objects inserted since last save |
| `updatedObjects` | `Set<NSManagedObject>` | Objects updated since last save |
| `deletedObjects` | `Set<NSManagedObject>` | Objects deleted since last save |

## Notes

- iOS 3.0+, macOS 10.4+, tvOS, watchOS 2.0+, visionOS 1.0+
- Contexts are **thread-confined**. Never access a context from a thread other than the one it was created on.
- Use `perform(_:)` (async) or `performAndWait(_:)` (sync) for safe cross-thread access.
- `save()` only commits to the parent or coordinator — root contexts flush to disk; child contexts flush to their parent.
- Do not subclass `NSManagedObjectContext`.
- Register for `NSManagedObjectContextDidSave` on a specific context object, not `nil`, to avoid unexpected framework notifications.

```swift
// Background save pattern
let context = container.newBackgroundContext()
context.perform {
    let object = MyEntity(context: context)
    object.name = "Example"
    try? context.save()
}
```

## Related

- [NSPersistentContainer](./nspersistentcontainer.md)
- [NSFetchRequest](./nsfetchrequest.md)
- [NSManagedObject](./nsmanagedobject.md)
