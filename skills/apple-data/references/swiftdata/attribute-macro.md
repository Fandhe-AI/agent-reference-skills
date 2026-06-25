# @Attribute

Customizes how SwiftData persists a stored property on a `@Model` class. Common uses include enforcing uniqueness and renaming attributes across schema versions.

## Signature / Usage

```swift
@attached(peer)
macro Attribute(
    _ options: Schema.Attribute.Option...,
    originalName: String? = nil,
    hashModifier: String? = nil
)
```

```swift
@Model
class RemoteImage {
    @Attribute(.unique) var sourceURL: URL   // unique across all instances
    @Attribute(originalName: "imageData") var data: Data  // renamed from "imageData"
    var createdAt: Date

    init(sourceURL: URL, data: Data = Data()) {
        self.sourceURL = sourceURL
        self.data = data
    }
}
```

## Options / Props

| Parameter | Type | Description |
|-----------|------|-------------|
| `options` | `Schema.Attribute.Option...` | Behavior options (e.g., `.unique`, `.externalStorage`, `.allowsCloudEncryption`) |
| `originalName` | `String?` | Previous attribute name in the schema, used for lightweight renaming migrations |
| `hashModifier` | `String?` | Custom hash to force schema version change for the property |

### Common `Schema.Attribute.Option` values

| Option | Description |
|--------|-------------|
| `.unique` | Enforces uniqueness across all instances |
| `.externalStorage` | Stores large binary data outside the main store file |
| `.allowsCloudEncryption` | Encrypts the attribute value in CloudKit |
| `.spotlight` | Includes the value in Spotlight search index |
| `.preserveValueOnDeletion` | Retains the value in history records after the model is deleted |

## Notes

- iOS 17.0+, macOS 14.0+, tvOS 17.0+, watchOS 10.0+, visionOS 1.0+
- Apply only to stored properties of a `@Model` class; computed properties are always transient
- Use `originalName` together with `SchemaMigrationPlan` for lightweight column renames

## Related

- [@Model](./model-macro.md)
- [@Relationship](./relationship-macro.md)
- [@Transient](./transient-macro.md)
- [SchemaMigrationPlan](./schema-migration-plan.md)
