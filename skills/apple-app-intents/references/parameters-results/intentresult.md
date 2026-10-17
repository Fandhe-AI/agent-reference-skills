---
source: https://developer.apple.com/documentation/appintents/intentresult
---

# IntentResult

A type that contains the result of performing an action, and includes optional information to deliver back to the initiator.

## Signature / Usage

```swift
protocol IntentResult : Sendable
```

Instead of implementing this protocol, use the `ReturnsValue`, `ProvidesDialog`, `ShowsSnippetView`, `OpensIntent` type aliases/protocols on your `AppIntent` implementation in combination with the `result` methods, as in the following example (corrected from the page's example, which writes `& OpensAppIntent`):

```swift
func perform() async throws -> some ReturnsValue<Int> & OpensIntent {
    .result(value: 1, opensIntent: MyOpensIntent())
}
```

## Options / Props

Associated types (all default to `Never`):

| Name | Declaration |
|------|-------------|
| Dialog | `associatedtype Dialog = Never` |
| OpensAppIntent | `associatedtype OpensAppIntent : AppIntent = Never` |
| Snippet | `associatedtype Snippet = Never` |
| Value | `associatedtype Value : _IntentValue = Never` |

Selected `result` factory methods (as listed in the page topics):

| Declaration | Description |
|-------------|-------------|
| `static func result() -> Self` | Indicates the `AppIntent` finished performing |
| `static func result<Intent>(actionButtonIntent: Intent) -> Self` | Indicates the Intent finished performing with an `AppIntent` to continue with (also with `activityIdentifier:` and/or `dialog:`) |
| `static func result(dialog: IntentDialog) -> Self` | Indicates the finished result with a dialog |
| `static func result<Content>(content: () -> Content) -> Self` | Result with view content (also with `dialog:`) |
| `static func result<Content>(dialog: IntentDialog, view: Content) -> Self` | Result with a dialog and a view |
| `static func result(opensIntent: some AppIntent) -> Self` | Result with a follow-on intent (also with `dialog:` and/or `content:`) |
| `static func result(dialog: IntentDialog, snippetIntent: some SnippetIntent) -> Self` | Indicates that a completed app intent displays an interactive snippet and a success dialog |
| `static func result(opensIntent: some AppIntent, dialog: IntentDialog, snippetIntent: some SnippetIntent) -> Self` | Interactive snippet with a dialog and returns another intent to open the originating app |

## Notes

- iOS 16.0+, iPadOS 16.0+, Mac Catalyst 16.0+, macOS 13.0+, tvOS 16.0+, watchOS 9.0+. The source data carries no `introducedAt` for visionOS.
- The official page's example writes `& OpensAppIntent`, which is the IntentResult associated type, not a protocol; the composable protocol is `OpensIntent` (corrected here).
- `AppIntent.perform()` is declared as `func perform() async throws -> Self.PerformResult`.
- The topic list shows the abbreviated declaration fragments; the full overload set is on the official page.

## Related

- [IntentDialog](./intentdialog.md)
- [IntentResultContainer](./intentresultcontainer.md)
- [ProvidesDialog](./providesdialog.md)
- [ReturnsValue](./returnsvalue.md)
- [ShowsSnippetView](./showssnippetview.md)
- [OpensIntent](./opensintent.md)
- [AppIntent](../intents/appintent.md)
