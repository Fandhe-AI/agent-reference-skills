---
source: https://developer.apple.com/documentation/appintents/providesdialog
---

# ProvidesDialog

The result of performing an action that delivers a dialog back to the initiator of the action.

## Signature / Usage

```swift
protocol ProvidesDialog : IntentResult where Self.Dialog == IntentDialog
```

## Notes

- iOS 16.0+, iPadOS 16.0+, Mac Catalyst 16.0+, macOS 13.0+, tvOS 16.0+, watchOS 9.0+. The source data carries no `introducedAt` for visionOS.
- `IntentResult.Dialog` defaults to `Never`; this protocol constrains it to `IntentDialog`.
- `IntentResultContainer` conforms when `Dialog` is `IntentDialog` (see that page for the other constraints).

## Related

- [IntentResult](./intentresult.md)
- [IntentDialog](./intentdialog.md)
- [IntentResultContainer](./intentresultcontainer.md)
