---
source: https://developer.apple.com/documentation/foundationmodels/systemlanguagemodel/error
---

# SystemLanguageModel.Error

An error specific to the on-device system language model.

## Signature / Usage

```swift
enum Error
```

```swift
do {
    let response = try await session.respond(to: prompt)
} catch {
    if #available(iOS 27.0, macOS 27.0, visionOS 27.0, *),
        let error = error as? SystemLanguageModel.Error
    {
        // Handle the error.
    } else if case .assetsUnavailable = error as? LanguageModelSession.GenerationError {
        // Handle the deprecated error.
    }
}
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| assetsUnavailable(_:) | case | The assets required for the session are unavailable. |
| AssetsUnavailable | nested type | Information about unavailable model assets. |

## Notes

- Availability: iOS 27.0+, iPadOS 27.0+, Mac Catalyst 27.0+, macOS 27.0+, visionOS 27.0+.
- If the app deploys to iOS 26, macOS 26, or visionOS 26, where this error is unavailable, use an availability check and fall back to `LanguageModelSession.GenerationError.assetsUnavailable(_:)`.

## Related

- [SystemLanguageModel](./system-language-model.md)
- [LanguageModelError](./language-model-error.md)
- [Session errors](../sessions/session-errors.md)
