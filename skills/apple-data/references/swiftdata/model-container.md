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
| `deleteAllData()` | Removes all persisted data from storage |
| `erase() throws` | Erases the container's store |

## Notes

- iOS 17.0+, macOS 14.0+, tvOS 17.0+, watchOS 10.0+, visionOS 1.0+
- Use `.modelContainer(for:)` SwiftUI modifier for the simplest setup
- `mainContext` is suitable for UI reads; create additional contexts for background work

## Related

- [ModelContext](./model-context.md)
- [ModelConfiguration](./model-configuration.md)
- [Schema](./schema.md)
- [SchemaMigrationPlan](./schema-migration-plan.md)
