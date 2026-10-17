---
source: https://developer.apple.com/documentation/appintents/progressreportingintent
---

# ProgressReportingIntent

An intent that reports progress to the system during its execution.

## Signature / Usage

```swift
protocol ProgressReportingIntent : AppIntent
```

```swift
var progress: Progress
```

## Options / Props

| Name | Declaration | Description |
| --- | --- | --- |
| `progress` | `var progress: Progress` | An object representing the progress of the intent's action. |

## Notes

- iOS 17.0+, iPadOS 17.0+, Mac Catalyst 17.0+, macOS 14.0+, tvOS 17.0+, visionOS (version not listed on the page), watchOS 10.0+
- Inherits from `AppIntent`, `PersistentlyIdentifiable`, `Sendable`, `SendableMetatype`. Inherited by `LongRunningIntent`.
- Listed under "Communication actions" with `PushToTalkTransmissionIntent` and `ShowInAppSearchResultsIntent` in the source. The page has no overview text beyond the abstract.

## Related

- [PushToTalkTransmissionIntent](./pushtotalktransmissionintent.md)
- [ShowInAppSearchResultsIntent](./showinappsearchresultsintent.md)
