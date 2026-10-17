---
source: https://developer.apple.com/documentation/appintents/pushtotalktransmissionintent
---

# PushToTalkTransmissionIntent

An intent that begins or ends an audio transmission with the Push to Talk framework.

## Signature / Usage

```swift
protocol PushToTalkTransmissionIntent : SystemIntent
```

## Notes

- iOS 17.4+, iPadOS 17.4+, visionOS (version not listed on the page). The declaration also lists Mac Catalyst, but the page's platform metadata gives no Mac Catalyst version.
- Inherits from `AppIntent`, `PersistentlyIdentifiable`, `Sendable`, `SendableMetatype`, `SystemIntent`.
- Create an app intent that conforms to this protocol to manually start or end an audio transmission that uses the Push to Talk framework. Transmitting audio with the Push to Talk framework itself is documented under the PushToTalk framework (outside this skill).
- The page declares no members.

## Related

- [ProgressReportingIntent](./progressreportingintent.md)
- [ShowInAppSearchResultsIntent](./showinappsearchresultsintent.md)
- [SystemIntent](./systemintent.md)
