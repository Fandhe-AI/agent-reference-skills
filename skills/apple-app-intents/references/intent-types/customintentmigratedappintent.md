---
source: https://developer.apple.com/documentation/appintents/customintentmigratedappintent
---

# CustomIntentMigratedAppIntent

An interface for replacing a custom SiriKit intent that allows existing shortcuts and donations to continue working.

## Signature / Usage

```swift
protocol CustomIntentMigratedAppIntent : AppIntent
```

```swift
static var intentClassName: String
```

## Options / Props

| Name | Declaration | Description |
| --- | --- | --- |
| `intentClassName` | `static var intentClassName: String` | The name of the SiriKit Intent class that this app intent replaces. |

## Notes

- iOS 16.0+, iPadOS 16.0+, Mac Catalyst 16.0+, macOS 13.0+, tvOS 16.0+, visionOS (version not listed on the page), watchOS 9.0+
- Inherits from `AppIntent`, `PersistentlyIdentifiable`, `Sendable`, `SendableMetatype`.
- SiriKit has no skill in this repository. This protocol is the migration target for a custom SiriKit `INIntent` subclass: set `intentClassName` to the name of the SiriKit Intent class being replaced so existing shortcuts and donations keep working.
- The source lists one related item under "SiriKit intent migration": the sample code "Soup Chef with App Intents: Migrating custom intents" (see this skill's samples/migrate-sirikit-custom-intents).
- The page has no overview text beyond the abstract.

## Related

- [SystemIntent](./systemintent.md)
- [DeprecatedAppIntent](./deprecatedappintent.md)
