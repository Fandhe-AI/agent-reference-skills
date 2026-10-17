---
source: https://developer.apple.com/documentation/appintents/adopting-app-intents-to-support-system-experiences
---

# Adopt App Intents to Support System Experiences

Expose a landmark and photo app's actions and content to Shortcuts, Spotlight, Siri, widgets, and visual intelligence: open intents, entities, transferable representations, onscreen context, entity collections, sync, schemas, union values, long-running and undoable intents, execution targets, snippets, indexing, and visual search.

```swift
// 1. OpenIntent that opens a landmark
public struct OpenLandmarkIntent: OpenIntent {
    public static let title: LocalizedStringResource = "Open Landmark"
    public init() {}

    @Parameter(title: "Landmark", requestValueDialog: "Which landmark?")
    public var target: LandmarkEntity

    public init(target: LandmarkEntity) {
        self.target = target
    }

    /**
     If your app intent conforms to the `OpenIntent` protocol and the intent's only
     functionality is to open the app to a specific scene,
     you don't have to implement your own `perform()` method in your iOS, iPadOS, or Mac app you built with Mac Catalyst.
     */
    #if os(macOS)
    @Dependency var navigator: Navigator

    public func perform() async throws -> some IntentResult {

        await navigator.navigate(to: target)

        return .result()
    }
    #endif
}

// 2. App entity
public struct LandmarkEntity: IndexedEntity {
    public static var typeDisplayRepresentation: TypeDisplayRepresentation {
        return TypeDisplayRepresentation(
            name: LocalizedStringResource(
                "Landmark",
                table: "AppIntents",
                comment: "The type name for the landmark entity"
            ),
            numericFormat: "\(placeholder: .int) landmarks"
        )
    }

    public var displayRepresentation: DisplayRepresentation {
        DisplayRepresentation(
            title: "\(name)",
            subtitle: "\(continent)",
            image: .init(named: landmark.thumbnailImageName)
        )
    }

    public static let defaultQuery = LandmarkEntityQuery()

    public var id: Int { landmark.id }

    @ComputedProperty(indexingKey: \.displayName)
    public var name: String { landmark.name }

    // ...

}

// 3. Transferable representations
extension LandmarkEntity: Transferable {
    public static var transferRepresentation: some TransferRepresentation {

        FileRepresentation(exportedContentType: .pdf) { @MainActor landmark in
            let url = URL.documentsDirectory.appending(path: "\(landmark.name).pdf")

            let renderer = ImageRenderer(content: VStack {
                Image(landmark.landmark.backgroundImageName)
                    .resizable()
                    .aspectRatio(contentMode: .fit)
                Text(landmark.name)
                Text("Continent: \(landmark.continent)")
                Text(landmark.description)
            }.frame(width: 600))

            renderer.render { size, renderer in
                var box = CGRect(x: 0, y: 0, width: size.width, height: size.height)

                guard let pdf = CGContext(url as CFURL, mediaBox: &box, nil) else {
                    return
                }
                pdf.beginPDFPage(nil)
                renderer(pdf)
                pdf.endPDFPage()
                pdf.closePDF()
            }

            return .init(url)
        }

        DataRepresentation(exportedContentType: .image) {
            try $0.imageRepresentationData
        }

        DataRepresentation(exportedContentType: .plainText) {
            Data("""
            Landmark: \($0.name)
            Description: \($0.description)
            """.utf8)
        }

        ValueRepresentation(exporting: \.placeDescriptor)
    }
}

public var placeDescriptor: PlaceDescriptor {
    PlaceDescriptor(
        representations: [.coordinate(landmark.locationCoordinate)],
        commonName: landmark.name
    )
}

// 4. Onscreen context
ScrollView(.vertical) {
    // ... landmark content
}
.appEntityIdentifier(EntityIdentifier(for: LandmarkEntity.self, identifier: landmark.id))

GalleryHorizontalListView(
    items: landmarkList,
    entityIdentifier: { EntityIdentifier(for: LandmarkEntity.self, identifier: $0.id) }
)

// 5. EntityCollection: pass identifiers without resolving each entity
public struct TagPhotosIntent: AppIntent {
    public static let title: LocalizedStringResource = "Tag Travel Photos"
    public init() {}
    public static let description: IntentDescription = "Tag selected travel photos with a label."

    @Parameter(title: "Photos", requestValueDialog: "Which photo?")
    var photos: EntityCollection<PhotoEntity>

    @Parameter(title: "Tag", default: "favorite")
    var tag: String

    @Dependency var modelData: ModelData

    public static var parameterSummary: some ParameterSummary {
        Summary("Tag \(\.$photos) with \(\.$tag)")
    }

    public func perform() async throws -> some IntentResult & ProvidesDialog {
        let start = ContinuousClock.now
        await tagPhotos(with: tag)
        let elapsed = start.duration(to: .now)
        let millis = elapsed.components.seconds * 1000 + elapsed.components.attoseconds / 1_000_000_000_000_000
        return .result(dialog: "Tagged \(photos.count) photos with '\(tag)' in \(millis)ms.")
    }

    // Use identifiers for bulk operations, which avoids resolving each `PhotoEntity`.
    private func tagPhotos(with tag: String) async {
        await modelData.tagPhotos(ids: photos.identifiers, tag: tag)
    }
}

// 6. SyncableEntity: IDs stable across devices
@AppEntity(schema: .photos.asset)
struct PhotoEntity: IndexedEntity, SyncableEntity {
    // ...
    var id: Int  // Stable across devices.
    // ...
}

struct PhotoEntity: AppEntity, SyncableEntity {
    var id: SyncableEntityIdentifier<String, String>

    init(localID: String, stableID: String) {
        self.id = SyncableEntityIdentifier(local: localID, stable: stableID)
    }
}

// 7. App schema
@AppEntity(schema: .photos.asset)
public struct PhotoEntity: IndexedEntity, SyncableEntity {
    // ...
}

// 8. Union value parameter for a widget configuration intent
@UnionValue
enum TravelGalleryContent {
    case landmarkCollection(LandmarkCollectionEntity)
    case photoAlbum(PhotoAlbumEntity)

    static var typeDisplayRepresentation: TypeDisplayRepresentation { "Travel Gallery" }
    static let caseDisplayRepresentations: [Cases: DisplayRepresentation] = [
        .landmarkCollection: "Landmark Collection",
        .photoAlbum: "Photo Album"
    ]

    /// Stable identifier that scopes widget state (gallery index) per
    /// configured content, so two widgets showing different albums or
    /// collections track their position independently.
    var contentKey: String {
        switch self {
        case .landmarkCollection(let collection): "landmarkCollection-\(collection.id)"
        case .photoAlbum(let album): "photoAlbum-\(album.id)"
        }
    }
}

struct TravelGalleryWidgetIntent: WidgetConfigurationIntent {
    static let title: LocalizedStringResource = "Travel Gallery"
    static let description: IntentDescription = "Choose a landmark collection or photo album to display as a slideshow."

    @Parameter var content: TravelGalleryContent?

    static var parameterSummary: some ParameterSummary {
        Switch(\.$content) {
            Case(.landmarkCollection) {
                Summary("Show landmarks from \(\.$content)")
            }
            Case(.photoAlbum) {
                Summary("Cycle through \(\.$content) photos")
            }
            DefaultCase {
                Summary("Show \(\.$content)")
            }
        }
    }
}

// 9. Long-running, cancellable intent
public struct UploadPhotoIntent: LongRunningIntent, CancellableIntent {
    public static let title: LocalizedStringResource = "Upload Photo"
    public static let description: IntentDescription = "Upload the current photo with progress tracking."
    
    @Parameter(requestValueDialog: "Which photo?")
    public var photo: IntentFile
    
    var name: String { photo.filename }
    
    public init() {}
    
    public init(photo: IntentFile) {
        self.photo = photo
    }
    
    public func perform() async throws -> some IntentResult & ProvidesDialog {
        let result = try await performBackgroundTask { @Sendable in
            let chunks = calculateChunks()
            progress.totalUnitCount = Int64(chunks)
            progress.localizedDescription = "\(name)"
            progress.localizedAdditionalDescription = "Preparing upload…"
            
            for chunk in 1...chunks {
                try await uploadChunk(chunk)
                progress.completedUnitCount = Int64(chunk)
                progress.localizedAdditionalDescription = "Uploaded \(Int((Double(chunk) / Double(chunks)) * 100))%"
            }
            return "Uploaded \(name) successfully!"
        } onCancel: { reason in
            cleanup(for: reason)
        }
        return .result(dialog: "\(result)")
    }
    
    // ...
}

// 10. Undoable intent
public struct UpdateFavoriteIntent: AppIntent, UndoableIntent {
    // ...

    @MainActor
    public func perform() async throws -> some IntentResult {
        switch item {
        case .landmark(let landmark):
            modelData.updateFavorite(isFavorite, landmark: landmark)
        case .photo(let photo):
            modelData.updateFavorite(isFavorite, photoID: photo.id)
        }
        WidgetCenter.shared.reloadTimelines(ofKind: "TravelGalleryWidget")
        return .result()
    }

    @MainActor
    public func undo() async throws {
        switch item {
        case .landmark(let landmark):
            modelData.updateFavorite(!isFavorite, landmark: landmark)
        case .photo(let photo):
            modelData.updateFavorite(!isFavorite, photoID: photo.id)
        }
        WidgetCenter.shared.reloadTimelines(ofKind: "TravelGalleryWidget")
    }
}

// 11. Execution targets: run the write in the main app
struct UpdateFavoriteIntent: AppIntent {
    // ...

    static var allowedExecutionTargets: ExecutionTargets { .main }

    // ...
}

// 12. Return a snippet intent
public struct ClosestLandmarkIntent: AppIntent {
    public static let title: LocalizedStringResource = "Find Closest Landmark"
    public init() {}

    @Dependency var modelData: ModelData

    public func perform() async throws -> some ReturnsValue<LandmarkEntity> & ShowsSnippetIntent & ProvidesDialog {
        let landmark = await self.findClosestLandmark()

        return .result(
            value: landmark,
            dialog: IntentDialog(
                full: "The closest landmark is \(landmark.name).",
                supporting: "\(landmark.name) is located in \(landmark.continent)."
            ),
            snippetIntent: LandmarkSnippetIntent(landmark: landmark)
        )
    }
}

// 13. Spotlight indexing keys and donation
struct LandmarkEntity: IndexedEntity {
    // ...

    // Maps the description variable to the Spotlight indexing key `contentDescription`.
    @ComputedProperty(indexingKey: \.contentDescription)
    public var description: String { landmark.description }

    // Custom Spotlight attribute key for the continent. The key name is a compile-time-known
    // identifier; the precondition fails fast with a useful message if it ever becomes invalid.
    private static let continentIndexingKey: CSCustomAttributeKey = {
        guard let key = CSCustomAttributeKey(
            keyName: "com_AppIntentsTravelTracking_LandmarkEntity_continent"
        ) else {
            preconditionFailure("Invalid CSCustomAttributeKey name; must satisfy reserved-name rules.")
        }
        return key
    }()

    // Maps the continent variable to a custom Spotlight indexing key.
    @ComputedProperty(customIndexingKey: continentIndexingKey)
    public var continent: String { landmark.continent }

    // ...
}

public static func donateLandmarks(modelData: ModelData) async throws {
    let landmarkEntities = await modelData.landmarkEntities
    try await CSSearchableIndex.default().indexAppEntities(landmarkEntities)
}

// 14. Visual intelligence search
@UnionValue
enum VisualSearchResult {
    case landmark(LandmarkEntity)
    case collection(LandmarkCollectionEntity)
}

struct LandmarkIntentValueQuery: IntentValueQuery {

    @Dependency var modelData: ModelData
    init() {}

    func values(for input: SemanticContentDescriptor) async throws -> [VisualSearchResult] {

        guard let pixelBuffer: CVReadOnlyPixelBuffer = input.pixelBuffer else {
            return []
        }

        let landmarks = try await modelData.search(matching: pixelBuffer)

        return landmarks
    }
}
```

## Notes

- Source article: "Adopting App Intents to support system experiences" (https://developer.apple.com/documentation/appintents/adopting-app-intents-to-support-system-experiences), a sample code article. The 19 article listings appear here in article order, grouped under 14 numbered comments; they are separate fragments, not one compilable file.
- Target OS: iOS 27.0+, iPadOS 27.0+, Mac Catalyst 27.0+, macOS 27.0+, Xcode 27.0 (article metadata). Individual protocols differ: `UndoableIntent` is iOS 26.0, `CancellableIntent` is iOS 26.4, while `LongRunningIntent`, `SyncableEntity`, and `EntityCollection` are iOS 27.0 (check each page under references/).
- The sample organizes code in a shared Swift package with three layered libraries (`TravelTrackingCore`, `TravelTrackingIntents`, `TravelTrackingSnippets`) so the app and its widget extension define intents and entities once.
- `ExecutionTargets` is available on both `AppIntent` and `EntityQuery` (`.main`, `.appIntentsExtension`, `.widgetKitExtension`, or a combination); `EntityCollection` stores identifiers only, so use it for bulk operations such as tagging or deleting.
- The `WidgetConfigurationIntent` and widget timeline reload shown here belong to WidgetKit; the widget side is covered by apple-app-services.
