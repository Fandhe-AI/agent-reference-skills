---
source: https://developer.apple.com/documentation/appintents/displaying-static-and-interactive-snippets
---

# Display Static and Interactive Snippets

Return a SwiftUI view from an intent, or hand off to a `SnippetIntent` that renders an interactive snippet.

```swift
// Static snippet
func perform() async throws -> some IntentResult & ShowsSnippetView {
    // ...
    
    return .result(view: Text("Some example text.").font(.title))
}

// Intent that returns an interactive snippet
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

// The snippet intent that builds the view
import AppIntents
import SwiftUI

struct LandmarkSnippetIntent: SnippetIntent {
    static let title: LocalizedStringResource = "Landmark Snippet"

    @Parameter var landmark: LandmarkEntity
    @Dependency var modelData: ModelData

    init() {}

    func perform() async throws -> some IntentResult & ShowsSnippetView {
        let isFavorite = await modelData.isFavorite(landmark: landmark)

        return .result(
            view: LandmarkView(landmark: landmark, isFavorite: isFavorite)
        )
    }
}

extension LandmarkSnippetIntent {
    init(landmark: LandmarkEntity) {
        self.landmark = landmark
    }
}
```

## Notes

- Source article: "Displaying static and interactive snippets" (https://developer.apple.com/documentation/appintents/displaying-static-and-interactive-snippets). The article also covers the snippet lifecycle, `requestConfirmation` sequences, and `reload()`; those listings are not reproduced here.
- Target OS: `SnippetIntent` and `ShowsSnippetIntent` availability is on references/system-integration/snippetintent.md and showssnippetintent.md (SDK 27.0, Xcode 27.0).
- The article first shows a `ClosestLandmarkIntent` that returns only `ReturnsValue<LandmarkEntity>`; the listing reproduced here is the article's later, verbatim version that adds `ShowsSnippetIntent` and `snippetIntent:` to hand off to the snippet intent.
