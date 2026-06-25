# NSPersistentContainer

Convenience class that encapsulates the Core Data stack: `NSManagedObjectModel`, `NSPersistentStoreCoordinator`, and a main-queue `NSManagedObjectContext`.

## Signature / Usage

```swift
class NSPersistentContainer : NSObject

let container = NSPersistentContainer(name: "MyApp")
container.loadPersistentStores { _, error in
    if let error { fatalError("Store load failed: \(error)") }
}
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `name` | `String` | Name of the container and its model resource |
| `viewContext` | `NSManagedObjectContext` | Main-queue context for UI use |
| `managedObjectModel` | `NSManagedObjectModel` | The container's managed object model |
| `persistentStoreCoordinator` | `NSPersistentStoreCoordinator` | Underlying store coordinator |
| `persistentStoreDescriptions` | `[NSPersistentStoreDescription]` | Configurations for stores to load |

## Notes

- iOS 10.0+, macOS 10.12+, tvOS 10.0+, watchOS 3.0+, visionOS 1.0+
- Call `loadPersistentStores` before accessing `viewContext` or performing any fetch.
- `viewContext` is bound to the main queue; do not use it on background threads.
- For background work use `newBackgroundContext()` or `performBackgroundTask(_:)`.

```swift
// Background insert
container.performBackgroundTask { context in
    let item = MyEntity(context: context)
    item.value = 42
    try? context.save()
}
```

## Related

- [NSManagedObjectContext](./nsmanagedobjectcontext.md)
- [NSManagedObjectModel](./nsmanagedobjectmodel.md)
- [NSPersistentStoreDescription](./nspersistentstoredescription.md)
- [NSPersistentStoreCoordinator](./nspersistentstorecoordinator.md)
