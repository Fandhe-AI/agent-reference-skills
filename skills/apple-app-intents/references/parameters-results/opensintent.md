---
source: https://developer.apple.com/documentation/appintents/opensintent
---

# OpensIntent

A result type that indicates your app intent returns another app intent.

## Signature / Usage

```swift
protocol OpensIntent : IntentResult
```

Add this protocol as a return type for an app intent's `perform()` method when the method returns another app intent to run. When returning the result, you can return any type of app intent that makes sense for the current action. For example, an app intent to create a photo album might return an app intent to open that album in the app's interface. After you return an app intent as a result, the system runs it to perform its action.

```swift
func perform() async throws -> some ReturnsValue<Int> & OpensIntent {
    .result(value: 1, opensIntent: MyCustomAppIntent())
}
```

## Notes

- iOS 16.0+, iPadOS 16.0+, Mac Catalyst 16.0+, macOS 13.0+, tvOS 16.0+, watchOS 9.0+. The source data carries no `introducedAt` for visionOS.
- The protocol name is `OpensIntent`; the associated type on `IntentResult` is `OpensAppIntent : AppIntent` (default `Never`).
- `IntentResultContainer` conforms to `OpensIntent` when `Value` conforms to `_IntentValue`, `OpensAppIntent` conforms to `AppIntent`, and `Snippet` / `Dialog` conform to `Copyable` and `Escapable`.

## Related

- [IntentResult](./intentresult.md)
- [IntentResultContainer](./intentresultcontainer.md)
- [AppIntent](../intents/appintent.md)
