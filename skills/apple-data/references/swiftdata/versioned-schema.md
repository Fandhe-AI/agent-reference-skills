# VersionedSchema

Protocol that describes a specific version of a schema, listing the model types it contains and a version identifier. Used with `SchemaMigrationPlan` to manage schema evolution.

## Signature / Usage

```swift
protocol VersionedSchema: SendableMetatype
```

```swift
enum TripSchemaV1: VersionedSchema {
    static var versionIdentifier = Schema.Version(1, 0, 0)

    static var models: [any PersistentModel.Type] {
        [Trip.self, Destination.self]
    }

    @Model
    final class Trip {
        var name: String
        var startDate: Date
        init(name: String, startDate: Date) {
            self.name = name; self.startDate = startDate
        }
    }
}

enum TripSchemaV2: VersionedSchema {
    static var versionIdentifier = Schema.Version(2, 0, 0)

    static var models: [any PersistentModel.Type] {
        [Trip.self, Destination.self]
    }

    @Model
    final class Trip {
        var name: String
        var startDate: Date
        var endDate: Date    // new property
        init(name: String, startDate: Date, endDate: Date) {
            self.name = name; self.startDate = startDate; self.endDate = endDate
        }
    }
}
```

## Options / Props

| Requirement | Type | Description |
|-------------|------|-------------|
| `versionIdentifier` (static) | `Schema.Version` | Unique version identifier for this schema snapshot |
| `models` (static) | `[any PersistentModel.Type]` | Model types included in this version |

## Notes

- iOS 17.0+, macOS 14.0+, tvOS 17.0+, watchOS 10.0+, visionOS 1.0+
- Conventionally defined as nested enums (no stored state needed)
- Define a separate `@Model` class inside each versioned schema to represent the exact shape of data at that version

## Related

- [SchemaMigrationPlan](./schema-migration-plan.md)
- [Schema](./schema.md)
- [ModelContainer](./model-container.md)
