---
source: https://developer.apple.com/documentation/foundationmodels/generating-content-and-performing-tasks-with-foundation-models, https://developer.apple.com/documentation/foundationmodels/adding-intelligent-app-features-with-generative-models
---

# Check Model Availability

Check `SystemLanguageModel.default.availability` before showing intelligence UI, and plan a fallback.

```swift
struct GenerativeView: View {
    // Create a reference to the system language model.
    private var model = SystemLanguageModel.default

    var body: some View {
        switch model.availability {
        case .available:
            // Show your intelligence UI.
        case .unavailable(.deviceNotEligible):
            // Show an alternative UI.
        case .unavailable(.modelNotReady):
            // The model isn't ready because it's downloading or because of other system reasons.
        case .unavailable(let other):
            // The model is unavailable for an unknown reason.
        }
    }
}
```

The trip-planner sample handles the Apple Intelligence disabled case:

```swift
let landmark: Landmark
private let model = SystemLanguageModel.default

var body: some View {
    switch model.availability {
    case .available:
        LandmarkTripView(landmark: landmark)
    case .unavailable(.appleIntelligenceNotEnabled):
        MessageView(
            landmark: self.landmark,
            message: """
                     Trip Planner is unavailable because \
                     Apple Intelligence hasn't been turned on.
                     """
        )
    case .unavailable(.modelNotReady):
        MessageView(
            landmark: self.landmark,
            message: "Trip Planner isn't ready yet. Try again later."
        )
    }
}
```

## Notes

- It can take some time for the model to download and become available after a person turns on Apple Intelligence.
- Availability depends on whether the device and region support Apple Intelligence.
- The second listing is from the sample-code page (iOS 26.0+, Xcode 26.0+) and does not cover every `Availability` case; the article listing above shows `deviceNotEligible` and a catch-all.
