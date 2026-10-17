---
source: https://developer.apple.com/documentation/visualintelligence
---

# Visual Intelligence (framework overview)

Include your app's content in search results that visual intelligence provides.

## Signature / Usage

The framework is used together with App Intents: the Visual Intelligence framework provides the captured information, and the app receives it through an App Intents query and returns matching app entities.

```swift
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
```

## Notes

- iOS 26.0+, iPadOS 26.0+, Mac Catalyst 26.0+, macOS 27.0+ (framework introduction versions from the page metadata).
- People use visual intelligence to learn about places and objects around them and onscreen: point the visual intelligence camera at the surroundings and tap the search button, or select objects in a screenshot. Matches from apps that integrate appear in the visual intelligence experience, where people can view and open items or see additional search results in the app.
- The Visual Intelligence framework page lists `SemanticContentDescriptor` as its only symbol (the `semanticContentSearch` code listing uses `VisualIntelligence.SceneDescriptor` instead; see the Source discrepancy note in [Visual intelligence schema domain](./domain-visual-intelligence.md)). The integration flow in "Integrating your app with visual intelligence":
  1. Adopt `IntentValueQuery` and implement `values(for:)` with a `SemanticContentDescriptor` input.
  2. Read `labels` and/or `pixelBuffer`, search the app's content.
  3. Return the matches as `AppEntity` values. Visual intelligence shows them using each entity's `DisplayRepresentation` (title, subtitle, image).
  4. Provide an `OpenIntent` so tapping an item opens it in the app. If the query returns several entity types with `@UnionValue`, create an `OpenIntent` for each entity type in the union.
  5. For many results, return a limited set (the article suggests the first hundred when there are several hundred matches) and link to the full list with an app intent conforming to the `semanticContentSearch` schema (the "More results" button).
- An app cannot contain more than one `IntentValueQuery` that takes a `SemanticContentDescriptor`.
- Labels are general, high-level terms in the `en_US` locale and might change over time; they are not translated and carry no synonyms or proper names (for example `tower` or `building`, not a landmark's actual name).
- Page topics: Visual Intelligence updates; Integrating your app with visual intelligence; Adopting App Intents to support system experiences (sample code); `SemanticContentDescriptor`; Making actions and content discoverable by Apple Intelligence; Creating your first app intent.
- Distinct from the Vision framework (image analysis requests) covered by apple-ml; this framework only delivers what visual intelligence captured to your App Intents query.

## Related

- [SemanticContentDescriptor](./semanticcontentdescriptor.md)
- [IntentValueQuery](./intentvaluequery.md)
- [Visual intelligence schema domain](./domain-visual-intelligence.md)
- [OpenIntent](../intent-types/openintent.md)
- [AppEntity](../entities/appentity.md)
