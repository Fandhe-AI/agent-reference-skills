---
source: https://developer.apple.com/documentation/appintents/appentity
---

# AppEntity

An interface for making a custom type or app-specific concept discoverable by Apple Intelligence and experiences like Siri or the Shortcuts app.

## Signature / Usage

```swift
protocol AppEntity : AppValue, DisplayRepresentable, Identifiable where Self == Self.ValueType, Self.ID : EntityIdentifierConvertible, Self.ID : Sendable
```

```swift
struct TrailEntity: AppEntity {
    // Provide the system with the interface required to query `TrailEntity` structures.
    static let defaultQuery = TrailEntityQuery()

    // The system requires the `AppEntity` identifier to be unique and persistant because the system may save it in a shortcut.
    var id: Trail.ID

    @Property var name: String

    @Property(title: "Region")
    var regionDescription: String

    @Property var trailLength: Measurement<UnitLength>

    var imageName: String

    var currentConditions: String

    var displayRepresentation: DisplayRepresentation {
        DisplayRepresentation(title: "\(name)",
                              subtitle: "\(regionDescription)",
                              image: DisplayRepresentation.Image(named: imageName))
    }

    init(trail: Trail) {
        self.id = trail.id
        self.imageName = trail.featuredImage
        self.currentConditions = trail.currentConditions
        self.name = trail.name
        self.regionDescription = trail.regionDescription
        self.trailLength = trail.trailLength
    }
}

extension TrailEntity: URLRepresentableEntity {
    static var urlRepresentation: URLRepresentation {
        "https://example.com/trail/\(.id)/details"
    }
}
```

## Options / Props

| Name | Declaration | Description |
| --- | --- | --- |
| `Property` | `typealias Property` | Specifying properties (`AppEntity.Property`) |
| `defaultQuery` | `static var defaultQuery: Self.DefaultQuery` (required; 2 default implementations) | The default query to use to retrieve entity property instances |
| `DefaultQuery` | `associatedtype DefaultQuery : EntityQuery` (required) | Query type for the entity |
| `defaultResolverSpecification` | `static var defaultResolverSpecification: EmptyResolverSpecification<Self>`; and `static var defaultResolverSpecification: some ResolverSpecification` when `Self` conforms to `AppEnum` | Resolver specification defaults |
| `ValueRepresentation` | `typealias ValueRepresentation` | A type alias for `IntentValueRepresentation`, providing a convenient way to define transfer representations that convert between app entities and system intent values |

## Notes

- iOS 16.0+, iPadOS 16.0+, Mac Catalyst 16.0+, macOS 13.0+, tvOS 16.0+, watchOS 9.0+ (visionOS: no `introducedAt` in the source JSON; the framework is visionOS 1.0+)
- `AppEntity` instances have a total size limit of 10 MB, including all child properties and their values. If an entity exceeds this limit, the system throws an exception and the app might crash. Use the `@DeferredProperty` property wrapper to reduce size.
- Conforming to `AppEntity` directly on app data models is optional; in many cases create models specific to app intents that shadow the app data models.
- Inherited by: `AssistantEntity`, `AssistantSchemaEntity`, `FileEntity`, `IndexedEntity`, `OwnershipProvidingEntity`, `SyncableEntity`, `TransientAppEntity`, `URLRepresentableEntity`, `UniqueAppEntity`.
- Sample code: Accelerating app interactions with App Intents. Articles: Defining app entities for your custom data types; Making app entities available in Spotlight; Adding parameters to an app intent; Providing contextual cues to Apple Intelligence and Siri; Getting started with the App Intents framework.

## Related

- [FileEntity](./fileentity.md)
- [IndexedEntity](./indexedentity.md)
- [SyncableEntity](./syncableentity.md)
- [TransientAppEntity](./transientappentity.md)
- [UniqueAppEntity](./uniqueappentity.md)
- [OwnershipProvidingEntity](./ownershipprovidingentity.md)
- [URLRepresentableEntity](./urlrepresentableentity.md)
- [EntityIdentifierConvertible](./entityidentifierconvertible.md)
- [DisplayRepresentable protocols](./display-representable-protocols.md)
