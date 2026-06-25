# Schema

Maps model classes to persistent storage and handles migration of data between releases.

## Signature / Usage

```swift
final class Schema: Equatable, Hashable, Codable, Sendable
```

```swift
// Typically inferred from model types by ModelContainer
let container = try ModelContainer(for: Trip.self, Destination.self)

// Explicit schema with version
let schema = Schema([Trip.self, Destination.self], version: Schema.Version(1, 0, 0))

// From a VersionedSchema type
let schema = Schema(versionedSchema: TripSchemaV1.self)
```

## Options / Props

| Member | Type | Description |
|--------|------|-------------|
| `entities` | `[Schema.Entity]` | All entities in the schema |
| `entitiesByName` | `[String: Schema.Entity]` | Entity lookup by name |
| `version` | `Schema.Version` | Current schema version |

### Nested types

| Type | Description |
|------|-------------|
| `Schema.Entity` | Blueprint for a model class |
| `Schema.Version` | Semantic version (`major.minor.patch`) |
| `Schema.PropertyMetadata` | Metadata about a model property |
| `Schema.Attribute.Option` | Options used with `@Attribute` |
| `Schema.Relationship.DeleteRule` | Rules for cascading deletes |

### Key methods

```swift
func entity<T>(for: T.Type) -> Schema.Entity?
static func entityName<T>(for: T.Type) -> String
func save(to: URL) throws
static func load(from: URL) throws -> Schema
```

## Notes

- iOS 17.0+, macOS 14.0+, tvOS 17.0+, watchOS 10.0+, visionOS 1.0+
- `ModelContainer` builds a schema automatically when given model types; construct `Schema` explicitly only when you need versioning or a migration plan

## Related

- [ModelContainer](./model-container.md)
- [VersionedSchema](./versioned-schema.md)
- [SchemaMigrationPlan](./schema-migration-plan.md)
