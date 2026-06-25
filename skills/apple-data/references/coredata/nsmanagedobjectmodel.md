# NSManagedObjectModel

Programmatic representation of a `.xcdatamodeld` file. Contains `NSEntityDescription` objects that define the schema used by a `NSPersistentStoreCoordinator`.

## Signature / Usage

```swift
class NSManagedObjectModel : NSObject

// Load from bundle resource
let url = Bundle.main.url(forResource: "Model", withExtension: "momd")!
let model = NSManagedObjectModel(contentsOf: url)!

// Merge all models in a bundle
let model = NSManagedObjectModel.mergedModel(from: [.main])!
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `entities` | `[NSEntityDescription]` | All entities in the model |
| `entitiesByName` | `[String: NSEntityDescription]` | Entities keyed by name |
| `configurations` | `[String]` | Named entity configurations |
| `fetchRequestTemplatesByName` | `[String: NSFetchRequest<NSFetchRequestResult>]` | Predefined fetch request templates |
| `versionIdentifiers` | `Set<AnyHashable>` | Version tokens for migration checks |
| `versionChecksum` | `String` | Hash of current schema version |

## Notes

- iOS 3.0+, macOS 10.4+, tvOS, watchOS 2.0+, visionOS 1.0+
- Models are **editable until first use** by a coordinator or context. After that, mutations raise an exception.
- Adding new entities or attributes makes the model incompatible with existing stores; use lightweight migration or `NSMigrationManager`.
- Adding validation constraints or default values does **not** break compatibility with existing stores.

```swift
// Programmatic merge for modular models
let merged = NSManagedObjectModel(byMerging: [modelA, modelB])
```

## Related

- [NSPersistentContainer](./nspersistentcontainer.md)
- [NSPersistentStoreCoordinator](./nspersistentstorecoordinator.md)
- [NSEntityDescription](./nsentitydescription.md)
