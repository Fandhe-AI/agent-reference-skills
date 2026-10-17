---
source: https://developer.apple.com/documentation/appintents/appentitycontext
---

# AppEntityContext

The context used to scope suggested entity donations to a specific domain.

## Signature / Usage

```swift
struct AppEntityContext
```

```swift
static func audio(AudioContext) -> AppEntityContext
```

## Options / Props

| Member | Description |
| --- | --- |
| `audio(_:)` | An audio-related context. |

## Notes

- iOS 27.0+, iPadOS 27.0+, Mac Catalyst 27.0+, macOS 27.0+, tvOS 27.0+, visionOS 27.0+, watchOS 27.0+
- Pass an `AppEntityContext` when donating or removing entities via `RelevantEntities` to associate suggestions with the appropriate part of the app experience.
- Framework overlays (such as the HealthKit overlay) define extensions that create context values for specific domains.
- Conforms to `Equatable`, `Hashable`, `Sendable`, `SendableMetatype`.

## Related

- [RelevantEntities](./relevantentities.md)
- [AudioContext](./audiocontext.md)
