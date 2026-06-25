# NSPersistentStoreDescription

Configuration object for creating and loading a persistent store. Pass an array to `NSPersistentContainer.persistentStoreDescriptions` before calling `loadPersistentStores`.

## Signature / Usage

```swift
class NSPersistentStoreDescription : NSObject

let description = NSPersistentStoreDescription(url: storeURL)
description.type = NSSQLiteStoreType
description.shouldMigrateStoreAutomatically = true
description.shouldInferMappingModelAutomatically = true
container.persistentStoreDescriptions = [description]
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `url` | `URL?` | File location for the persistent store |
| `type` | `String` | Store type (e.g., `NSSQLiteStoreType`, `NSInMemoryStoreType`) |
| `configuration` | `String?` | Named model configuration to use |
| `timeout` | `TimeInterval` | Connection timeout |
| `isReadOnly` | `Bool` | Open store in read-only mode |
| `shouldAddStoreAsynchronously` | `Bool` | Load store on a background queue |
| `shouldMigrateStoreAutomatically` | `Bool` | Perform lightweight migration automatically |
| `shouldInferMappingModelAutomatically` | `Bool` | Infer mapping model during migration |
| `cloudKitContainerOptions` | `NSPersistentCloudKitContainerOptions?` | CloudKit sync configuration |

## Notes

- iOS 10.0+, macOS 10.12+, tvOS 10.0+, watchOS 3.0+, visionOS 1.0+
- Set `persistentStoreDescriptions` **before** calling `loadPersistentStores`; changes afterwards have no effect.
- Use `setOption(_:forKey:)` for less common options such as `NSMigratePersistentStoresAutomaticallyOption`.

## Related

- [NSPersistentContainer](./nspersistentcontainer.md)
- [NSPersistentStoreCoordinator](./nspersistentstorecoordinator.md)
