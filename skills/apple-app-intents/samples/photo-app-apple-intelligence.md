---
source: https://developer.apple.com/documentation/appintents/integrating-your-photo-app-with-apple-intelligence
---

# Integrate Your Photo App with Apple Intelligence

Adopt the photos-domain schemas: an `IndexedEntity` asset, a `Transferable` representation, a user-activity annotation, and a `createAlbum` intent.

```swift
// 1. Spotlight-indexed asset entity with the photos asset schema
@AppEntity(schema: .photos.asset)
struct AssetEntity: IndexedEntity {

    // MARK: Static

    static let defaultQuery = AssetQuery()

    // MARK: Properties

    let id: String
    let asset: Asset

    @Property(title: "Title")
    var title: String?

    var creationDate: Date?
    var location: PlaceDescriptor?
    var assetType: AssetType?
    var isFavorite: Bool
    var isHidden: Bool
    var hasSuggestedEdits: Bool
    var aperture: Double?
    var exposure: Double?
    var saturation: Double?
    var warmth: Double?
    var filter: AssetFilter?
    var isPortraitModeEnabled: Bool?

    var displayRepresentation: DisplayRepresentation {
        DisplayRepresentation(
            title: title.map { "\($0)" } ?? "Unknown",
            subtitle: assetType?.localizedStringResource ?? "Photo"
        )
    }
}

// 2. Make the entity shareable with other apps
extension AssetEntity: Transferable {
    // ...

    static var transferRepresentation: some TransferRepresentation {
        DataRepresentation(exportedContentType: .png) { entity in
            try await entity.asset.pngData()
        }
    }
}

// 3. Provide onscreen context with a user activity
var body: some View {
    // ...
    MediaView(
        image: image,
        duration: asset.duration,
        isFavorite: asset.isFavorite,
        proxy: proxy
    )
    .userActivity(
        "com.example.apple-samplecode.PhotosDomainExample.ViewingPhoto",
        element: asset.entity
    ) { asset, activity in
        activity.title = "Viewing a photo"
        activity.appEntityIdentifier = EntityIdentifier(for: asset)
    }
    // ...

// 4. Intent conforming to the createAlbum schema
@AppIntent(schema: .photos.createAlbum)
struct CreateAlbumIntent: AppIntent {
    var name: String

    @Dependency
    var library: MediaLibrary

    @MainActor
    func perform() async throws -> some ReturnsValue<AlbumEntity> {
        let album = try await library.createAlbum(with: name)
        return .result(value: album.entity)
    }
}
```

## Notes

- Source article: "Integrating your photo app with Apple Intelligence" (https://developer.apple.com/documentation/appintents/integrating-your-photo-app-with-apple-intelligence), a sample code article. Listings are separate fragments; listing 3 is truncated exactly as published.
- Target OS: iOS 27.0+, iPadOS 27.0+, Mac Catalyst 27.0+, macOS 27.0+, Xcode 27.0 (article metadata).
- The article states that schema conformance is a prerequisite for providing onscreen cues in this photos-domain sample; the view shows one photo at a time, so the app annotates an `NSUserActivity` with the visible entity instead of a per-view annotation.
- See samples/spotlight-indexed-entities.md for the donation side of `IndexedEntity`.
