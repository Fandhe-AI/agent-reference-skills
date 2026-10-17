---
source: https://developer.apple.com/documentation/foundationmodels/adding-server-side-intelligence-with-private-cloud-compute
---

# Adding server-side intelligence with Private Cloud Compute

Access a larger context window and stronger reasoning by routing session requests through Private Cloud Compute.

## Signature / Usage

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

Usage limits:

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

Reasoning:

```swift
let response = try await session.respond(
    to: "What are the tradeoffs in this architecture?",
    contextOptions: ContextOptions(reasoningLevel: .deep)
)
```

## Options / Props

| Capability | `SystemLanguageModel` | `PrivateCloudComputeLanguageModel` |
|------------|-----------------------|------------------------------------|
| Preserves privacy | yes | yes |
| Works offline | yes | no |
| Usage limits | Unlimited | Limit per day |
| Reasoning | Not supported | Multiple levels |
| Context size | 4K | 32K |

Reasoning levels: `ContextOptions.ReasoningLevel.light`, `.moderate`, `.deep`.

## Notes

- Article in the Foundation Models framework (iOS 26.0+, iPadOS 26.0+, macOS 26.0+, Mac Catalyst 26.0+, visionOS 26.0+, watchOS 27.0+). `PrivateCloudComputeLanguageModel` is available on iOS 27, macOS 27, watchOS 27, and visionOS 27 or later; check availability and fall back to the on-device model on prior versions.
- The server-based model accessed through Private Cloud Compute (PCC) offers a 32K-token context size and stronger reasoning. No authentication or API key handling is needed; people need a device that supports Apple Intelligence and get a daily request limit, and can upgrade their iCloud+ subscription for more access.
- Developing with PCC requires meeting eligibility requirements and requesting the managed entitlement (https://developer.apple.com/private-cloud-compute/).
- Choosing PCC is best made after evaluating your feature: start with the on-device model, evaluate it with the Evaluations framework, and move to PCC if more reasoning or context size is needed.
- Both `PrivateCloudComputeLanguageModel` and `SystemLanguageModel` conform to `LanguageModel`, so either can be passed to `init(model:tools:instructions:)`; the respond methods, tools, and instructions carry over unchanged.
- PCC requires a network connection; if a request fails because the network is unavailable, retry with the on-device model. PCC is only available on devices that support Apple Intelligence (device and region dependent).
- Quota: use `quotaUsage.status` to determine whether a person is below, approaching, or over quota, and show UI instead of a dismissible alert. When the daily quota is exhausted the framework throws `PrivateCloudComputeLanguageModel.Error.quotaLimitReached(_:)`; unlike rate limiting, the person waits for refresh or upgrades. `resetDate` is empty when the reset date is unknown or the person is well below the limit.
- To simulate quota states in Xcode: Product > Scheme > Edit Scheme, Run page, Options tab, "Simulated Apple Foundation Models Availability" set to "Approaching Quota Usage Limit" or "Quota Usage Limit Reached".
- Reasoning: lower effort reduces latency; deeper reasoning trades latency for analysis of complex multi-step problems. Start with `.moderate`, use `.deep` when the task needs it. More reasoning uses more of the context window. Reasoning segments do not appear in final response content; reviewing them helps debugging.

## Related

- [Managing the context window](./managing-the-context-window.md)
- [Evaluating prompts](./evaluating-prompts.md)
- [Composing dynamic sessions with instructions and profiles](./dynamic-sessions.md)
