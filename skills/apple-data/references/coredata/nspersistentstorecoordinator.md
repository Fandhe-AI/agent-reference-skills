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

## Related

- [NSPersistentContainer](./nspersistentcontainer.md)
- [NSPersistentStoreDescription](./nspersistentstoredescription.md)
- [NSManagedObjectModel](./nsmanagedobjectmodel.md)
