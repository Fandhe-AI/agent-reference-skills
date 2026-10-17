---
source: https://developer.apple.com/documentation/appintents/defining-app-entities-for-your-custom-data-types
---

# Define App Entities for Your Custom Data Types

Model app data as an `AppEntity` with wrapped properties, a default `EntityQuery`, and display / transfer representations.

```swift
struct TrailEntity: AppEntity {
    var id: Trail.ID
    var imageName: String
    var currentConditions: String
    var trailStartLocation : CLLocationCoordinate2D

    // Wrapped properties.
    @Property var name: String
    @Property var trailLength: Measurement<UnitLength>

    @Property(title: "Region")
    var regionDescription: String

    // Type initializer.
    init(trail: Trail) {
        self.id = trail.id
        self.imageName = trail.featuredImage
        self.currentConditions = trail.currentConditions
        self.name = trail.name
        self.regionDescription = trail.regionDescription
        self.trailLength = trail.trailLength
    }

    // Query type.
    static let defaultQuery = TrailEntityQuery()
}

struct TrailEntityQuery: EntityQuery {
    
    @Dependency
    var trailManager: TrailDataManager

    func entities(for identifiers: [TrailEntity.ID]) async throws -> [TrailEntity] {
        Logger.entityQueryLogging.debug("[TrailEntityQuery] Query for IDs \(identifiers)")
        
        return trailManager.trails(with: identifiers)
                .map { TrailEntity(trail: $0) }
    }
}

extension TrailEntity {
    var displayRepresentation: DisplayRepresentation {
        DisplayRepresentation(title: "\(name)",
                              subtitle: "\(regionDescription)",
                              image: DisplayRepresentation.Image(named: imageName))
    }

    static var typeDisplayRepresentation: TypeDisplayRepresentation {
        TypeDisplayRepresentation(
            name: LocalizedStringResource("Trail", table: "AppIntents"),
            numericFormat: LocalizedStringResource("\(placeholder: .int) trails", table: "AppIntents")
        )
    }

    // This representation makes use of a coordinate value stored in the entity.
    static var transferRepresentation: some TransferRepresentation {
        IntentValueRepresentation(
            exporting: { trail in
                PlaceDescriptor(
                    representations: [.coordinate(trail.trailStartLocation)],
                    commonName: trail.name)
            }
        )
    }
}
```

## Notes

- Source article: "Defining app entities for your custom data types" (https://developer.apple.com/documentation/appintents/defining-app-entities-for-your-custom-data-types). Listings are combined from the article's later steps; the article's schema-based variant is `@AppEntity(schema: .photos.album) struct PhotoAlbumEntity: AppEntity { let id: UUID ... }`.
- Target OS: App Intents iOS 16.0+ / macOS 13.0+ / watchOS 9.0+ / visionOS 1.0+ (SDK 27.0, Xcode 27.0).
- The article states `AppEntity` instances have a 10 MB total size limit (use `@DeferredProperty` for large values) and that `id` should be `UUID`, `String`, or `Int` where possible.
- The article's listing declares the non-optional stored property `trailStartLocation` but does not assign it in `init(trail:)`; to compile, assign it from your `Trail` model's start coordinate (e.g. `self.trailStartLocation = <coordinate from trail>`). The article does not show which `Trail` property holds it.
- If entities are added to the Spotlight index, adopt `IndexedEntity` and `IndexedEntityQuery` (see spotlight-indexed-entities.md).
