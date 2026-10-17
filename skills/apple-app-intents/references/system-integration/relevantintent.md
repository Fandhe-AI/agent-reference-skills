---
source: https://developer.apple.com/documentation/appintents/relevantintent
---

# RelevantIntent

A type that stores an app intent and indicates its relevance to someone.

## Signature / Usage

```swift
struct RelevantIntent
```

```swift
init<IntentType>(_: IntentType, widgetKind: String, relevance: RelevantContext)
```

## Options / Props

| Member | Description |
| --- | --- |
| `init(_:widgetKind:relevance:)` | Creates an instance of this type using the specified app intent and relevance information. `relevance` is a `RelevanceKit.RelevantContext`. |

## Notes

- iOS 17.0+, iPadOS 17.0+, Mac Catalyst 17.0+, macOS 14.0+, tvOS 17.0+, visionOS, watchOS 10.0+ (the source lists no `introducedAt` for visionOS)
- Specify an action someone might want to take and the conditions when the system might suggest it (for example, a sports app might start playback of a game shortly before the game starts). Specify the action using a `WidgetConfigurationIntent` structure, and register the relevant intent with the system using `RelevantIntentManager`.
- `RelevantContext` belongs to RelevanceKit (contextual clues for the Smart Stack on watchOS), a separate framework not covered by this skill. WidgetKit-side widget configuration is covered by apple-app-services.
- Conforms to `Copyable`, `CustomDebugStringConvertible`, `Escapable`.

## Related

- [RelevantIntentManager](./relevantintentmanager.md)
- [WidgetConfigurationIntent](../feature-integrations/widgetconfigurationintent.md)
