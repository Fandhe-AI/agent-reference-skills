# Staged migrations (NSStagedMigrationManager / NSLightweightMigrationStage / NSCustomMigrationStage)

Migrate complex data models containing changes that are incompatible with a single lightweight migration. Staged lightweight migrations reduce an incompatible migration into a series of compatible stages that a migration manager runs in a specific order.

## Signature / Usage

Source example (`addPersistentStore` arguments before `options:` are elided):

```swift
let manager = NSStagedMigrationManager(stages)
let options = [
    NSMigratePersistentStoresAutomaticallyOption: true,
    NSInferMappingModelAutomaticallyOption: true,
    NSPersistentStoreStagedMigrationManagerOptionKey: manager
]
let store = coordinator.addPersistentStore(
    ...
    options: options
)
```

Declarations:

```swift
class NSStagedMigrationManager
convenience init(_ stages: [NSMigrationStage])
let NSPersistentStoreStagedMigrationManagerOptionKey: String

class NSLightweightMigrationStage                 // : NSMigrationStage
convenience init(_ versionChecksums: [String])

class NSCustomMigrationStage                      // : NSMigrationStage
convenience init(migratingFrom currentModel: NSManagedObjectModelReference, to nextModel: NSManagedObjectModelReference)
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `NSStagedMigrationManager.stages` | `[NSMigrationStage]` | The migration stages. |
| `NSStagedMigrationManager.container` | `NSPersistentContainer?` | The container that provides access to the migrating persistent store. |
| `NSLightweightMigrationStage.versionChecksums` | `[String]` | The array of version checksums. |
| `NSCustomMigrationStage.currentModel` | `NSManagedObjectModelReference` | The reference that represents the migration's source model. |
| `NSCustomMigrationStage.nextModel` | `NSManagedObjectModelReference` | The reference that represents the migration's destination model. |
| `NSCustomMigrationStage.willMigrateHandler` | `((NSStagedMigrationManager, NSCustomMigrationStage) throws -> Void)?` | The handler to execute before the stage runs. |
| `NSCustomMigrationStage.didMigrateHandler` | `((NSStagedMigrationManager, NSCustomMigrationStage) throws -> Void)?` | The handler to execute after the stage runs. |
| `NSCustomMigrationStage.container` | `NSPersistentContainer?` | The container that provides access to the migrating persistent store. |
| `NSMigrationStage.label` | `String!` | The textual description of the migration stage's purpose. |
| `NSManagedObjectModelReference.resolvedModel` | `NSManagedObjectModel` | The resolved object model. |
| `NSManagedObjectModelReference.versionChecksum` | `String` | The version checksum of the resolved model. |

`NSManagedObjectModelReference` initializers (describes a specific version of an object model):

| Initializer | Description |
|-------------|-------------|
| `init(entityVersionHashes: [AnyHashable : Any], in: Bundle?, versionChecksum: String)` | Entities corresponding to the specified entity version hashes. |
| `init(fileURL: URL, versionChecksum: String)` | The model at the specified file URL. |
| `init(model: NSManagedObjectModel, versionChecksum: String)` | The specified model. |
| `init(name: String, in: Bundle?, versionChecksum: String)` | The named model in the specified bundle. |

## Notes

- Availability (source JSON): `NSStagedMigrationManager`, `NSLightweightMigrationStage`, `NSCustomMigrationStage`: iOS 17.0+, iPadOS 17.0+, Mac Catalyst 17.0+, macOS 14.0+, tvOS 17.0+, visionOS 1.0+, watchOS 10.0+.
- Use a staged migration when aggregate changes between two model versions exceed lightweight migration, e.g. changing an optional attribute to nonoptional (a lightweight migration cannot infer the default for existing `nil` values). A custom stage's handler can set those values before the stage runs.
- Staged lightweight migrations require properly versioned object models, with a distinct migration stage for each model version.
- A manager applies stages in the order you specify. Custom stages (`NSCustomMigrationStage`) let you run tasks immediately before and after a stage; lightweight stages (`NSLightweightMigrationStage`) cover model series Core Data can migrate automatically and maintain a consistent stage order for the entire migration.
- `NSMigrationStage` is an abstract base class: don't create instances of it; use a concrete subclass such as `NSLightweightMigrationStage` or `NSCustomMigrationStage`.
- To access the store being migrated inside a handler, use the `container` property of the migration manager Core Data provides to the handler.
- The source documentation says to pass the manager through the persistent store's options dictionary with `NSPersistentStoreStagedMigrationManagerOptionKey`.
- The official NSStagedMigrationManager code listing omits the comma after `NSInferMappingModelAutomaticallyOption: true`; it is added in the snippet above.
- Source: https://developer.apple.com/documentation/coredata/staged-migrations , https://developer.apple.com/documentation/coredata/nsstagedmigrationmanager (fetched 2026-10-16, iOS 27 SDK docs)

## Related

- [NSPersistentContainer](./nspersistentcontainer.md)
- [NSPersistentStoreCoordinator](./nspersistentstorecoordinator.md)
- [NSPersistentStoreDescription](./nspersistentstoredescription.md)
- [NSManagedObjectModel](./nsmanagedobjectmodel.md)
