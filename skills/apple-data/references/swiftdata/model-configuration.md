# ModelConfiguration

Describes the storage configuration for an app's schema or a specific group of models, including on-disk location, in-memory mode, and CloudKit options.

## Signature / Usage

```swift
struct ModelConfiguration: Equatable, Hashable, Identifiable, Sendable
```

```swift
// In-memory store (useful for previews and tests)
let config = ModelConfiguration(isStoredInMemoryOnly: true)

// Named on-disk store at a custom URL
let storeURL = URL.documentsDirectory.appending(path: "trips.store")
let config = ModelConfiguration("trips", schema: Schema([Trip.self]), url: storeURL)

// Use with ModelContainer
let container = try ModelContainer(
    for: Trip.self,
    configurations: config
)
```

## Options / Props

| Property | Type | Description |
|----------|------|-------------|
| `url` | `URL` | On-disk location of the persistent store |
| `isStoredInMemoryOnly` | `Bool` | Ephemeral in-memory store when `true` |
| `allowsSave` | `Bool` | Whether the store is writable |
| `cloudKitDatabase` | `CloudKitDatabase` | CloudKit database option |
| `cloudKitContainerIdentifier` | `String?` | CloudKit container identifier |
| `groupContainer` | `GroupContainer` | App-group container option |
| `groupAppContainerIdentifier` | `String?` | App-group container identifier |

### Key initializers

```swift
// In-memory only
init(isStoredInMemoryOnly: Bool)

// For specific model types
init(for models: any PersistentModel.Type..., isStoredInMemoryOnly: Bool)

// Named, with custom URL
init(_ name: String?, schema: Schema?, url: URL, allowsSave: Bool,
     cloudKitDatabase: ModelConfiguration.CloudKitDatabase)

// Named, in-memory with CloudKit/group options
init(_ name: String?, schema: Schema?, isStoredInMemoryOnly: Bool, allowsSave: Bool,
     groupContainer: ModelConfiguration.GroupContainer,
     cloudKitDatabase: ModelConfiguration.CloudKitDatabase)
```

## Notes

- iOS 17.0+, macOS 14.0+, tvOS 17.0+, watchOS 10.0+, visionOS 1.0+
- Pass multiple `ModelConfiguration` values to `ModelContainer` to isolate different model groups in separate stores
- Set `isStoredInMemoryOnly: true` in SwiftUI previews to avoid touching the real database

## Related

- [ModelContainer](./model-container.md)
- [Schema](./schema.md)
