---
source: https://developer.apple.com/documentation/appintents/making-actions-and-content-discoverable-by-apple-intelligence
---

# Make Actions and Content Discoverable by Apple Intelligence

Adopt app schemas with `@AppIntent(schema:)`, `@AppEntity(schema:)`, and `@AppEnum(schema:)`, and hide a new schema intent from Shortcuts while migrating.

```swift
// 1. Xcode code-completion trigger (type the domain, an underscore, then pick the schema)
photos_openAsset

// 2. The snippet expands into a template
@AppIntent(schema: .photos.openAsset)
struct OpenMediaAssetIntent: OpenIntent {
    var target: <#PhotoEntity#>

    func perform() async throws -> some IntentResult {
        <#code#>
    }
}

// 3. Placeholders replaced
@AppIntent(schema: .photos.openAsset)
struct OpenPlantPhotoIntent: OpenIntent {
    var target: PlantPhotoEntity

    func perform() async -> some IntentResult {
        // Present the photo for this plant on the display
        // by calling into the app's main code.
        // ...

        return .result()
    }
}

// 4. Entity schema
@AppEntity(schema: .photos.asset)
struct PlantPhotoEntity {

    var displayRepresentation: DisplayRepresentation {
        DisplayRepresentation(
            title: "\(photo.name)",
            subtitle: "\(photo.creationDate.formatted(date: .abbreviated, time: .omitted))"
        )
    }

    static let defaultQuery = PlantPhotoEntityQuery()

    var id: Int { photo.id }

    var creationDate: Date? { photo.creationDate }
    var location: PlaceDescriptor? { nil }
    var assetType: PhotoAssetType? { .photo }
    var isFavorite: Bool { photo.isFavorite }
    var isHidden: Bool { photo.isHidden }
    var hasSuggestedEdits: Bool { false }
    var aperture: Double? { nil }
    var exposure: Double? { nil }
    var saturation: Double? { nil }
    var warmth: Double? { nil }
    var filter: PhotoFilterEffectType? { nil }
    var isPortraitModeEnabled: Bool? { nil }

    var photo: PlantPhoto

    init(photo: PlantPhoto) {
        self.photo = photo
    }
}

// 5. Enum schema
@AppEnum(schema: .photos.assetType)
enum PhotoAssetType: String, Sendable {
    case photo
    case video

    static var caseDisplayRepresentations: [Self: DisplayRepresentation] {
        [
            .photo: "Photo",
            .video: "Video"
        ]
    }
}

// 6. New schema intent next to an older one: hide it from Shortcuts for now
@AppIntent(schema: .photos.createAssets)
struct CreateAssetsIntent: AppIntent {

    // ...

    static let isAssistantOnly: Bool = true

    // ...

    @MainActor
    func perform() async throws -> some ReturnsValue<[PlantPhotoEntity]> {
        // ...
    }
}
```

## Notes

- Source article: "Making actions and content discoverable by Apple Intelligence" (https://developer.apple.com/documentation/appintents/making-actions-and-content-discoverable-by-apple-intelligence). Listings are shown in article order as separate fragments; the article metadata lists no platform versions (SDK 27.0, Xcode 27.0 per the skill's pinned snapshot).
- Set schema properties to `nil` when the app does not support them; Apple Intelligence only uses the properties the schema defines, and extra optional properties are recognized only by Shortcuts.
- Adopt all schemas in a use-case group (for example Mail composition); Xcode warns for each missing schema in a partially supported group. Groups are listed for the Audio, Clock, Mail, Maps, and Messages domains.
- To finish a migration, remove `isAssistantOnly` so the new intent appears in Shortcuts, then retire the old intent. In the article's reference table `AppSchema.PhotosIntent.openAsset` carries a deprecated flag; check references/app-schemas/ before relying on a specific schema member.
