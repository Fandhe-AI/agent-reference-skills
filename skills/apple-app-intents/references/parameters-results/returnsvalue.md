---
source: https://developer.apple.com/documentation/appintents/returnsvalue
---

# ReturnsValue

The result of performing an action that delivers a value back to the initiator.

## Signature / Usage

```swift
protocol ReturnsValue<Value> : IntentResult
```

Used as an opaque return type of `perform()`:

```swift
func perform() async throws -> some ReturnsValue<Int> & OpensIntent {
    .result(value: 1, opensIntent: MyOpensIntent())
}
```

## Notes

- iOS 16.0+, iPadOS 16.0+, Mac Catalyst 16.0+, macOS 13.0+, tvOS 16.0+, watchOS 9.0+. The source data carries no `introducedAt` for visionOS.
- `IntentResult.Value` is declared as `associatedtype Value : _IntentValue = Never`.
- The official page's example writes `& OpensAppIntent`, which is the IntentResult associated type, not a protocol; the composable protocol is `OpensIntent` (corrected here).

## Related

- [IntentResult](./intentresult.md)
- [IntentResultContainer](./intentresultcontainer.md)
- [OpensIntent](./opensintent.md)
