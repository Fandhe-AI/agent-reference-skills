# ModelContainer

Manages an app's schema and model storage configuration. Acts as the bridge between model contexts and the persistent store; handles fetch coordination, schema migration, and optional CloudKit syncing.

## Signature / Usage

```swift
final class ModelContainer: Equatable, Sendable
```

```swift
// Attach to the SwiftUI app scene
@main
struct RecipesApp: App {
    var body: some Scene {
        WindowGroup {
            ContentView()
        }
        .modelContainer(for: Recipe.self)
    }
}

// Manual initialization with migration plan
let container = try ModelContainer(
    for: Recipe.self,
    migrationPlan: RecipeMigrationPlan.self,
    configurations: ModelConfiguration(isStoredInMemoryOnly: false)
)
```

## Options / Props

| Member | Type | Description |
|--------|------|-------------|
| `schema` | `Schema` | Schema that maps model classes to persistent storage |
| `configurations` | `Set<ModelConfiguration>` | Storage configurations for model groups |
| `migrationPlan` | `(any SchemaMigrationPlan.Type)?` | Plan describing schema evolution |
| `mainContext` | `ModelContext` | Main-actor-bound model context |

### Key initializers

```swift
// Convenience — one or more model types
convenience init(for models: any PersistentModel.Type..., configurations: any DataStoreConfiguration...) throws

// Full control
init(for schema: Schema, migrationPlan: (any SchemaMigrationPlan.Type)?, configurations: [ModelConfiguration]) throws
```

### Key methods

| Method | Description |
|--------|-------------|
| `deleteAllData()` | Removes all persisted data from storage. Deprecated in iOS/iPadOS/Mac Catalyst/macOS/tvOS/visionOS/watchOS 27.2 — renamed to `erase()`: "deleteAllData has been replaced by `erase`. Use `erase` to completely remove all of the data from a store." |
| `erase() throws` | Erases the container's store. iOS 18.0+, iPadOS 18.0+, Mac Catalyst 18.0+, macOS 15.0+, tvOS 18.0+, visionOS 2.0+, watchOS 11.0+ |
| `storeIdentifier(forConfigurationNamed:) -> String?` | Returns the on-disk store identifier for the given `ModelConfiguration` name (`nil` if no store is associated or after `invalidate()`). iOS 27.0+ and the other OSes at 27.0+ |
| `configurationName(forStoreIdentifier:) -> String?` | Returns the configuration name for a store identifier. iOS 27.0+ and the other OSes at 27.0+ |

## Notes

- iOS 17.0+, macOS 14.0+, tvOS 17.0+, watchOS 10.0+, visionOS 1.0+
- Use `.modelContainer(for:)` SwiftUI modifier for the simplest setup
- Store identifiers are not configuration names; use `storeIdentifier(forConfigurationNamed:)` to filter a `HistoryDescriptor` or interpret `PersistentIdentifier.storeIdentifier` (default configuration name is `"default"`)
- `mainContext` is suitable for UI reads; create additional contexts for background work
- Source: https://developer.apple.com/documentation/swiftdata/modelcontainer (fetched 2026-10-16, iOS 27 SDK docs); `deleteAllData()` deprecation: https://developer.apple.com/documentation/swiftdata/modelcontainer/deletealldata()

## Related

- [ModelContext](./model-context.md)
- [ModelConfiguration](./model-configuration.md)
- [Schema](./schema.md)
- [SchemaMigrationPlan](./schema-migration-plan.md)
