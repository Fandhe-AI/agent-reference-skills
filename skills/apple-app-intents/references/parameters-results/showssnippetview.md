---
source: https://developer.apple.com/documentation/appintents/showssnippetview
---

# ShowsSnippetView

The result of performing an action that delivers a view back to the initiator of the action.

## Signature / Usage

```swift
protocol ShowsSnippetView : IntentResult where Self.Snippet == _SnippetViewContainer
```

## Notes

- iOS 16.0+, iPadOS 16.0+, Mac Catalyst 16.0+, macOS 13.0+, tvOS 16.0+, watchOS 9.0+. The source data carries no `introducedAt` for visionOS.
- When someone performs an action with Siri AI that invokes your app intent, the system might not display the `ShowsSnippetView` you return as an intent result.
- `IntentResult.Snippet` defaults to `Never`; `IntentResultContainer` conforms when `Snippet` is `_SnippetViewContainer`.
- For interactive snippets driven by a `SnippetIntent`, see the `result(dialog:snippetIntent:)` overloads on `IntentResult`.

## Related

- [IntentResult](./intentresult.md)
- [IntentResultContainer](./intentresultcontainer.md)
- SnippetIntent
