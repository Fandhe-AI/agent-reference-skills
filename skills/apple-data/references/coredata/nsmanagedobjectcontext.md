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

### iOS 27.0: typed notification messages

New message structs for the `NotificationCenter` message API, nested in `NSManagedObjectContext` (all iOS 27.0+ and the other OSes at 27.0+). The official pages carry no code examples.

| Message | Conforms to | Posted when | Properties |
|---------|-------------|-------------|------------|
| `WillSaveMessage` | `MainActorMessage` | Before a main queue context saves | `context` |
| `DidSaveMessage` | `MainActorMessage` | After a main queue context saves | `context`, `inserted` / `updated` / `deleted` (`Set<NSManagedObject>`), `historyToken: NSPersistentHistoryToken?`, `queryGeneration: NSQueryGenerationToken?` |
| `ObjectsDidChangeMessage` | `MainActorMessage` | Objects in a main queue context change | `context`, `inserted` / `updated` / `deleted` / `refreshed` / `invalidated` (`Set<NSManagedObject>`), `invalidatedAll: Bool?` |
| `DidSaveObjectIDsMessage` | `MainActorMessage` | After a main queue context saves (object IDs instead of objects) | `context`, `insertedIDs` / `updatedIDs` / `deletedIDs` / `refreshedIDs` / `invalidatedIDs` (`Set<NSManagedObjectID>`), `historyToken`, `queryGeneration` |
| `DidSaveObjectIDsAsyncMessage` | `AsyncMessage` | After a private queue context saves (object IDs) | same as `DidSaveObjectIDsMessage` |
| `DidMergeChangesMessage` | `MainActorMessage` | After a main queue context merges changes from another context (object IDs) | same as `DidSaveObjectIDsMessage` |
| `DidMergeChangesAsyncMessage` | `AsyncMessage` | After a private queue context merges changes (object IDs) | same as `DidSaveObjectIDsMessage` |

- Use the main-queue messages only for contexts with `NSMainQueueConcurrencyType`; use the `Async` variants for `NSPrivateQueueConcurrencyType` contexts (per the official pages for `DidSaveMessage`, `DidSaveObjectIDsAsyncMessage`, `DidMergeChangesMessage`)
- `DidSaveMessage.historyToken` has no description on the official page
- The `NSManagedObjectContextDidSave` notification and related `NSNotification.Name` constants remain the pre-27 way to observe the same events; the typed messages are additive
- Source: https://developer.apple.com/documentation/coredata/nsmanagedobjectcontext/didsavemessage , https://developer.apple.com/documentation/coredata/nsmanagedobjectcontext/objectsdidchangemessage , https://developer.apple.com/documentation/coredata/nsmanagedobjectcontext/didsaveobjectidsmessage , https://developer.apple.com/documentation/coredata/nsmanagedobjectcontext/didsaveobjectidsasyncmessage , https://developer.apple.com/documentation/coredata/nsmanagedobjectcontext/didmergechangesmessage , https://developer.apple.com/documentation/coredata/nsmanagedobjectcontext/didmergechangesasyncmessage , https://developer.apple.com/documentation/coredata/nsmanagedobjectcontext/willsavemessage (fetched 2026-11-14, DocC JSON of the iOS & iPadOS 27.3 beta SDK)

## Related

- [NSPersistentContainer](./nspersistentcontainer.md)
- [NSFetchRequest](./nsfetchrequest.md)
- [NSManagedObject](./nsmanagedobject.md)
