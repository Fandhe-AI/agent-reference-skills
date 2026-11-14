# NSPersistentStoreCoordinator

Mediates between one or more `NSManagedObjectContext` instances and one or more persistent stores. Presents multiple stores as a single aggregate data source.

## Signature / Usage

```swift
class NSPersistentStoreCoordinator : NSObject

let coordinator = NSPersistentStoreCoordinator(managedObjectModel: model)
try coordinator.addPersistentStore(
    type: .sqlite,
    at: storeURL,
    options: nil
)
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `managedObjectModel` | `NSManagedObjectModel` | The coordinator's managed object model |
| `persistentStores` | `[NSPersistentStore]` | Currently registered persistent stores |
| `name` | `String?` | Optional label for diagnostics |

## Notes

- iOS 3.0+, macOS 10.4+, tvOS, watchOS 2.0+, visionOS 1.0+
- Executes work serially on its own private queue. Use `perform(_:)` / `performAndWait(_:)` to safely dispatch work.
- Conforms to `NSLocking`; prefer `perform` APIs over explicit `lock()`/`unlock()`.
- After adding a store, the associated `NSManagedObjectModel` becomes immutable.

```swift
// Async execution
await coordinator.perform {
    // safely access coordinator here
}
```

### iOS 27.0: typed notification messages

New message structs nested in `NSPersistentStoreCoordinator` (iOS 27.0+ and the other OSes at 27.0+). The official pages carry no code examples.

| Message | Conforms to | Posted when | Properties |
|---------|-------------|-------------|------------|
| `RemoteChangeMessage` | `AsyncMessage` | A store receives a remote change notification from another process | `persistentStoreCoordinator`, `storeURL: URL`, `storeUUID: String`, `historyToken: NSPersistentHistoryToken?` |
| `StoresDidChangeMessage` | `MainActorMessage` | Stores are added or removed on the main queue | `persistentStoreCoordinator`, `addedStores` / `removedStores: [NSPersistentStore]`, `uuidChangedStores: (oldValue: NSPersistentStore, newValue: NSPersistentStore)?` |
| `StoresDidChangeAsyncMessage` | `AsyncMessage` | Stores are added or removed on a background queue | same as `StoresDidChangeMessage` |

- `RemoteChangeMessage` is the typed counterpart of the remote change notification enabled with `NSPersistentStoreRemoteChangeNotificationPostOptionKey` (see Persistent history)
- Source: https://developer.apple.com/documentation/coredata/nspersistentstorecoordinator/remotechangemessage , https://developer.apple.com/documentation/coredata/nspersistentstorecoordinator/storesdidchangemessage , https://developer.apple.com/documentation/coredata/nspersistentstorecoordinator/storesdidchangeasyncmessage (fetched 2026-11-14, DocC JSON of the iOS & iPadOS 27.3 beta SDK)

## Related

- [NSPersistentContainer](./nspersistentcontainer.md)
- [NSPersistentStoreDescription](./nspersistentstoredescription.md)
- [NSManagedObjectModel](./nsmanagedobjectmodel.md)
