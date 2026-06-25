# SchemaMigrationPlan

Protocol that describes the evolution of a schema across versions and the migration stages between them. Pass the conforming type to `ModelContainer` to enable automatic migration.

## Signature / Usage

```swift
protocol SchemaMigrationPlan: SendableMetatype
```

```swift
enum TripMigrationPlan: SchemaMigrationPlan {
    static var schemas: [any VersionedSchema.Type] {
        [TripSchemaV1.self, TripSchemaV2.self]
    }

    static var stages: [MigrationStage] {
        [migrateV1toV2]
    }

    // Lightweight migration (no custom logic needed)
    static let migrateV1toV2 = MigrationStage.lightweight(
        fromVersion: TripSchemaV1.self,
        toVersion: TripSchemaV2.self
    )
}

// Use with ModelContainer
let container = try ModelContainer(
    for: Trip.self,
    migrationPlan: TripMigrationPlan.self
)
```

### Custom migration with data transformation

```swift
static let migrateV1toV2 = MigrationStage.custom(
    fromVersion: TripSchemaV1.self,
    toVersion: TripSchemaV2.self,
    willMigrate: nil,
    didMigrate: { context in
        let trips = try context.fetch(FetchDescriptor<TripSchemaV2.Trip>())
        for trip in trips {
            trip.endDate = trip.startDate.addingTimeInterval(86400 * 7)
        }
        try context.save()
    }
)
```

## Options / Props

| Requirement | Type | Description |
|-------------|------|-------------|
| `schemas` (static) | `[any VersionedSchema.Type]` | All schema versions in chronological order |
| `stages` (static) | `[MigrationStage]` | Migration steps between consecutive versions |

### `MigrationStage` cases

| Case | Description |
|------|-------------|
| `.lightweight(fromVersion:toVersion:)` | Automatic migration for additive changes (new properties with defaults, renames via `originalName`) |
| `.custom(fromVersion:toVersion:willMigrate:didMigrate:)` | Manual migration with optional before/after hooks |

## Notes

- iOS 17.0+, macOS 14.0+, tvOS 17.0+, watchOS 10.0+, visionOS 1.0+
- Lightweight migration handles: adding optional/defaulted properties, renaming (with `originalName`), adding/removing relationships
- Use `.custom` when you need to transform existing data values during migration
- Stages must cover every consecutive pair of schema versions listed in `schemas`

## Related

- [VersionedSchema](./versioned-schema.md)
- [ModelContainer](./model-container.md)
- [Schema](./schema.md)
- [@Attribute](./attribute-macro.md)
