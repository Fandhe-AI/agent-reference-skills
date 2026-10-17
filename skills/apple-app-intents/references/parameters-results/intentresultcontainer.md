---
source: https://developer.apple.com/documentation/appintents/intentresultcontainer
---

# IntentResultContainer

An object that represents the output of a completed intent. Use the `IntentResult.result()` family of functions to create instances.

## Signature / Usage

```swift
struct IntentResultContainer<Value, OpensAppIntent, Snippet, Dialog> where Value : _IntentValue, OpensAppIntent : AppIntent
```

## Options / Props

| Name | Declaration |
|------|-------------|
| activityIdentifier | `var activityIdentifier: String?` |
| dialog | `var dialog: IntentDialog?` |
| opensIntent | `var opensIntent: OpensAppIntent?` |

## Notes

- iOS 16.0+, iPadOS 16.0+, Mac Catalyst 16.0+, macOS 13.0+, tvOS 16.0+, watchOS 9.0+. The source data carries no `introducedAt` for visionOS.
- Conditional conformances (all available when `Value` conforms to `_IntentValue`, `OpensAppIntent` conforms to `AppIntent`, and the `Snippet` / `Dialog` constraints hold):
  - `OpensIntent`: `Snippet` and `Dialog` conform to `Copyable` and `Escapable`.
  - `ProvidesDialog`: `Snippet` conforms to `Copyable` and `Escapable`; `Dialog` is `IntentDialog`.
  - `ReturnsValue`: `Snippet` and `Dialog` conform to `Copyable` and `Escapable`.
  - `ShowsSnippetView`: `Snippet` is `_SnippetViewContainer`; `Dialog` conforms to `Copyable` and `Escapable`.

## Related

- [IntentResult](./intentresult.md)
- [IntentDialog](./intentdialog.md)
- [OpensIntent](./opensintent.md)
- [ProvidesDialog](./providesdialog.md)
- [ReturnsValue](./returnsvalue.md)
- [ShowsSnippetView](./showssnippetview.md)
