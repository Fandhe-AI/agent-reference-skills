---
source: https://developer.apple.com/documentation/appintents/liveactivityintent
---

# LiveActivityIntent

An intent that starts, pauses, or otherwise modifies a Live Activity when it runs.

## Signature / Usage

```swift
protocol LiveActivityIntent : SystemIntent
```

Conform to this protocol to gain permission for starting Live Activities from the intent's `perform()` method:

```swift
struct StartActivityIntent: LiveActivityIntent {
    static var title: LocalizedStringResource = "Start Activity"

    func perform() async throws -> some IntentResult {
        // Start the Live Activity here (ActivityKit).
        return .result()
    }
}
```

## Notes

- iOS 17.0+, iPadOS 17.0+, Mac Catalyst 17.0+, visionOS (no `introducedAt` given in the source JSON)
- In general the app must be in the foreground to start a Live Activity. With a `LiveActivityIntent`, the system launches the app process without opening the app, performs the intent, and starts the Live Activity. Example: a control in Control Center that performs a `LiveActivityIntent`.
- Inherits from `SystemIntent`, `AppIntent`, `PersistentlyIdentifiable`, `Sendable`, `SendableMetatype`.
- Replaces the deprecated `LiveActivityStartingIntent`.
- The snippet above is an illustrative minimal conformance; the official page has no code listing (the Live Activity start call itself is ActivityKit, not App Intents).
- Scope: ActivityKit (`Activity`, `ActivityConfiguration`) is covered by the apple-app-services skill, not here.
- Source retrieved 2026-10-16 (DocC JSON, SDK 27.0).

## Related

- [LiveActivityStartingIntent](./liveactivitystartingintent.md)
- [ControlConfigurationIntent](./controlconfigurationintent.md)
- [SystemIntent](../intent-types/systemintent.md)
