---
source: https://developer.apple.com/documentation/visualintelligence/integrating-your-app-with-visual-intelligence
---

# Integrate Your App with Visual Intelligence

Return app entities from an `IntentValueQuery` that receives a `SemanticContentDescriptor`, and open the selected item with an `OpenIntent`.

```swift
// 1. Localized display representation of the returned entity
struct LandmarkEntity: IndexedEntity {
    static var typeDisplayRepresentation: TypeDisplayRepresentation {
        TypeDisplayRepresentation(
            name: LocalizedStringResource("Landmark", table: "AppIntents", comment: "The type name for the landmark entity"),
            numericFormat: "\(placeholder: .int) landmarks"
        )
    }

    var displayRepresentation: DisplayRepresentation {
        DisplayRepresentation(
            title: "\(name)",
            subtitle: "\(continent)",
            image: .init(data: try! self.thumbnailRepresentationData)
        )
    }

    // ...
}

// 2. Search with the captured pixel buffer
struct LandmarkIntentValueQuery: IntentValueQuery {

    @Dependency var modelData: ModelData

    func values(for input: SemanticContentDescriptor) async throws -> [VisualSearchResult] {

        guard let pixelBuffer = input.pixelBuffer else {
            return []
        }

        let landmarks = try await modelData.search(matching: pixelBuffer)

        return landmarks
    }
}

// 3. Convert the pixel buffer to an image for an image search
private func createImage(_ pixelBuffer: CVReadOnlyPixelBuffer) -> CGImage? {
    let context = CIContext()
    let image = CIImage(cvPixelBuffer: pixelBuffer)
    return context.createCGImage(image, from: image.extent)
}

// 4. Open the tapped item in the app
struct OpenLandmarkIntent: OpenIntent {
    static let title: LocalizedStringResource = "Open Landmark"

    @Parameter(title: "Landmark", requestValueDialog: "Which landmark?")
    var target: LandmarkEntity
}

// 5. Return more than one entity type with a union value
@UnionValue
enum VisualSearchResult {
    case landmark(LandmarkEntity)
    case collection(CollectionEntity)
}

struct LandmarkIntentValueQuery: IntentValueQuery {

    @Dependency var modelData: ModelData

    func values(for input: SemanticContentDescriptor) async throws -> [VisualSearchResult] {
        // ...

        // Returned search results are either landmarks or a collection.
        let landmarks = try await modelData.search(matching: pixelBuffer)

        return landmarks
    }
}
```

## Notes

- Source article: "Integrating your app with visual intelligence" (https://developer.apple.com/documentation/visualintelligence/integrating-your-app-with-visual-intelligence). Listings are separate fragments; listings 2 and 5 show two stages of the same query type. The article cites the "Adopting App Intents to support system experiences" sample for listings 1 and 2.
- Target OS: the article lists no versions. The Visual Intelligence framework is iOS 26.0+, iPadOS 26.0+, Mac Catalyst 26.0+, macOS 27.0+ (see references/visual-intelligence/visualintelligence-overview.md).
- An app cannot contain more than one `IntentValueQuery` that takes a `SemanticContentDescriptor`; use `@UnionValue` to return several entity types, and add an `OpenIntent` for each entity type in the union.
- `SemanticContentDescriptor.labels` are general, high-level `en_US` terms that may change over time (for example `tower`, not a landmark name). Limit returned items (the article suggests the first hundred) and link to full results with an intent conforming to the `visualintelligence` `semanticContentSearch` schema (see references/visual-intelligence/domain-visual-intelligence.md).
- This is the Visual Intelligence search integration, not the Vision framework (image analysis requests), which is covered by apple-ml.
