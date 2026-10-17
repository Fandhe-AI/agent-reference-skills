---
source: https://developer.apple.com/documentation/appintents/making-app-entities-available-in-spotlight
---

# Make App Entities Available in Spotlight

Adopt `IndexedEntity`, map properties to Spotlight keys, index entities with Core Spotlight, and open them from search results.

```swift
struct LandmarkEntity: IndexedEntity {
    // ...
}

// Map properties to Spotlight indexing keys
struct LandmarkEntity: IndexedEntity {
    // ...


    // Maps the description variable to the Spotlight indexing key `contentDescription`.
    @ComputedProperty(indexingKey: \.contentDescription)
    var description: String { landmark.description }


    // Maps the continent variable to a custom Spotlight indexing key. 
    @ComputedProperty(
        customIndexingKey: CSCustomAttributeKey(
            keyName: "com_AppIntentsTravelTracking_LandmarkEntity_continent"
        )!
    )
    var continent: String { landmark.continent }
    var landmark: Landmark
    var modelData: ModelData

    // ...
}

// Or supply the attribute set yourself
extension LandmarkEntity {
    var attributeSet: CSSearchableItemAttributeSet {
        let attributes = CSSearchableItemAttributeSet()
                
        attributes.latitude = NSNumber(value: landmark.latitude)
        attributes.longitude = NSNumber(value: landmark.longitude)
        attributes.supportsNavigation = true
        
        return attributes
    }
}

// Index the entities directly
static func donateLandmarks(modelData: ModelData) async throws {
    // Fetch the entities for the app.
    let landmarkEntities = await modelData.landmarkEntities
    
    // Index the entities using a named index.
    try await CSSearchableIndex(name: "AppIntentsTravelTracking_Landmarks").indexAppEntities(landmarkEntities)
}

// Reindexing support on the entity query
struct PhotoQuery: IndexedEntityQuery {
    func reindexEntities(for identifiers: [PhotoEntity.ID], indexDescription: CSSearchableIndexDescription) async throws {
        let photos = try await photoStore.fetch(ids: identifiers)
        try await CSSearchableIndex(name: "MyPhotosApp").indexAppEntities(photos)
    }

    func reindexAllEntities(indexDescription: CSSearchableIndexDescription) async throws {
        let allPhotos = try await photoStore.fetchAll()
        try await CSSearchableIndex(name: "MyPhotosApp").indexAppEntities(allPhotos)
    }

   // Other query-related methods.
}

// Open an entity from a search result
struct OpenLandmarkIntent: OpenIntent {
    static let title: LocalizedStringResource = "Open Landmark"

    @Parameter(title: "Landmark", requestValueDialog: "Which landmark?")
    var target: LandmarkEntity
}
```

## Notes

- Source article: "Making app entities available in Spotlight" (https://developer.apple.com/documentation/appintents/making-app-entities-available-in-spotlight). The article also shows adding entities to an existing `CSSearchableItem` flow with `attributes.associateAppEntity(intent, priority: weight)`; that listing is not reproduced here.
- Target OS: App Intents iOS 16.0+ / macOS 13.0+ (SDK 27.0, Xcode 27.0). Per-symbol availability for `IndexedEntity` / `IndexedEntityQuery` (iOS 27.0 for the query) is on references/entities/indexedentity.md and references/queries/indexedentityquery.md.
- Fragments are shown in article order and are alternatives, not one compilable file (the two `LandmarkEntity` declarations are successive steps).
- Core Spotlight (`CSSearchableIndex`, `CSSearchableItemAttributeSet`) is a separate framework and not covered by this skill.
