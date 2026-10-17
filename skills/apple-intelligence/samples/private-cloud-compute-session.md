---
source: https://developer.apple.com/documentation/foundationmodels/adding-server-side-intelligence-with-private-cloud-compute
---

# Private Cloud Compute Session

Route a `LanguageModelSession` through `PrivateCloudComputeLanguageModel`, check availability and quota, and raise the reasoning level.

```swift
// Create a session with the server-side model.
let session = LanguageModelSession(model: PrivateCloudComputeLanguageModel())
```

```swift
if #available(iOS 27.0, macOS 27.0, watchOS 27.0, visionOS 27.0, *) {
    // Create a session using the server-based model.
} else {
    // Use the on-device model on older versions.
}
```

```swift
let model = PrivateCloudComputeLanguageModel()

switch model.availability {
case .available:
    // Show your intelligence UI.
case .unavailable(.deviceNotEligible):
    // Show an alternative UI.
case .unavailable(.systemNotReady):
    // PCC isn't ready to serve requests.
case .unavailable(let other):
    // The model is unavailable for an unknown reason.
}
```

```swift
let model = PrivateCloudComputeLanguageModel()

// Depending on the quota state, display a label to keep a person aware
// of the status of their daily limit.
if model.quotaUsage.isLimitReached {
    Text("Usage limit exceeded")
        .foregroundStyle(Color.red)
} else if case .belowLimit(let info) = model.quotaUsage.status {
    if info.isApproachingLimit {
        Text("Nearing usage limit")
            .foregroundStyle(Color.orange)
    }
}
    
// Display a button in your UI to present the available upgrade options.
if let suggestion = model.quotaUsage.limitIncreaseSuggestion {
    Button("Show options") {
        suggestion.show()
    }
}
```

```swift
let response = try await session.respond(
    to: "What are the tradeoffs in this architecture?",
    contextOptions: ContextOptions(reasoningLevel: .deep)
)
```

## Notes

- Requires iOS 27 / macOS 27 / watchOS 27 / visionOS 27 or later; PCC needs a network connection, so fall back to the on-device model when the request fails for lack of connectivity.
- Developing with PCC requires eligibility and the managed entitlement `com.apple.developer.private-cloud-compute`.
- Per the article, PCC offers a 32K-token context and multiple reasoning levels; the on-device model offers 4K tokens and no reasoning.
- `PrivateCloudComputeLanguageModel.Error.quotaLimitReached(_:)` is thrown when the daily quota is exhausted; Xcode scheme options can simulate approaching or reaching the limit.
