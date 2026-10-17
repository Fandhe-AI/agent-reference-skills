---
source: https://developer.apple.com/documentation/appintents/intentsystemcontext
---

# IntentSystemContext

Contextual information that the system provides while it performs an app intent.

## Signature / Usage

```swift
struct IntentSystemContext
```

```swift
var systemContext: IntentSystemContext   // AppIntent instance property
```

## Options / Props

| Member | Declaration | Description |
|--------|-------------|-------------|
| `currentMode` | `var currentMode: IntentModes.Current` | A value that indicates the foreground and background behavior for app intent's action. |
| `isVoiceOnly` | `var isVoiceOnly: Bool` | A Boolean value that indicates whether the system performs the app intent in a voice-only context. |
| `locale` | `var locale: Locale` | The locale in which the system performs the app intent. |
| `preciseTimestamp` | `var preciseTimestamp: Date?` | A precise timestamp for the performed action. |

## Notes

- iOS 16.0+, iPadOS 16.0+, Mac Catalyst 16.0+, macOS 13.0+, tvOS 16.0+, watchOS 9.0+ (the page JSON lists visionOS without an `introducedAt` value).
- Access it in your `perform()` implementation through `AppIntent.systemContext`. The available information varies by platform; for example, in watchOS it includes a precise timestamp when a person starts the action with the Action button on Apple Watch Ultra.

## Related

- [AppIntent](./appintent.md)
- [IntentModes](./intentmodes.md)
