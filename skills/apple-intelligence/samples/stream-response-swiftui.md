---
source: https://developer.apple.com/documentation/foundationmodels/adding-intelligent-app-features-with-generative-models
---

# Stream Partial Responses into SwiftUI

Stream `Itinerary.PartiallyGenerated` values with `streamResponse(generating:...)` and render them as they arrive.

```swift
private(set) var itinerary: Itinerary.PartiallyGenerated?

func suggestItinerary(dayCount: Int) async throws {
    let stream = session.streamResponse(
        generating: Itinerary.self,
        includeSchemaInPrompt: false,
        options: GenerationOptions(samplingMode: .greedy)
    ) {
        "Generate a \(dayCount)-day itinerary to \(landmark.name)."

        "Give it a fun title and description."

        "Here is an example, but don't copy it:"
        Itinerary.exampleTripToJapan
    }

    for try await partialResponse in stream {
        itinerary = partialResponse.content
    }
}
```

## Notes

- `@Generable` creates a `PartiallyGenerated` mirror type in which every property is optional; use it for the streamed value.
- `Itinerary` is a `@Generable` struct defined in the same sample project (its listing is on the source page).
- `.greedy` sampling makes the model return the same output for a given input.
- iOS 26.0+ / Xcode 26.0+ (sample-code page).
