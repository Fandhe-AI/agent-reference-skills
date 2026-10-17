---
source: https://developer.apple.com/documentation/appintents/snippetintent
---

# SnippetIntent

An app intent that presents an interactive snippet onscreen.

## Signature / Usage

```swift
protocol SnippetIntent : AppIntent where Self.PerformResult : ShowsSnippetView
```

```swift
struct ShowTodoListIntent: SnippetIntent {
    // ...

    @Parameter var todos: [Todo]

    // ...

    func perform() async throws -> some IntentResult & ShowsSnippetView {
        // Fetch persisted todos to have the right
        // up-to-date state when performing this method. Make sure to
        // consider that the system calls perform() several times.
        let currentTodos = await TodoStore().find(todos)
        let snippet = TodoListView(todos: currentTodos)
        return .result(view: snippet)
    }
}
```

```swift
func handleTodoUpdates(todos: [Todo]) {
    //...

    ShowTodoListIntent.reload()
}
```

## Options / Props

| Member | Description |
| --- | --- |
| `static func reload()` | Refreshes the intent's snippet presentation. |

## Notes

- iOS 26.0+, iPadOS 26.0+, Mac Catalyst 26.0+, macOS 26.0+, tvOS 26.0+, visionOS 26.0+, watchOS 26.0+
- An app intent can present custom SwiftUI views to show the result of an action, confirm a selection, and more. A snippet can include buttons or toggles that use an `AppIntent`, like widgets and Live Activities; views of an interactive widget or Live Activity can often be reused.
- The system can call a `SnippetIntent` multiple times. When someone interacts with a snippet's button or toggle, the system first performs its associated app intent, then calls the snippet intent's `perform()` again. Handle multiple `perform()` calls by fetching the most recent data each time.
- Only app intents that conform to this protocol can present views whose interactive elements (buttons, toggles) work, and conforming tells the system to call `perform` again to render the new state.
- If the snippet is visible and your app detects changed content, call `reload()` to ask the system to reload the visible snippet.
- An intent that does more than return a snippet (for example, returns a value and a snippet) is automatically discoverable in Shortcuts and Spotlight. An intent whose return type only conforms to `IntentResult` and `ShowsSnippetView` is not discoverable there; set `isDiscoverable` to `true` explicitly to make it discoverable.
- SwiftUI view types (`Button`, `Toggle`) used inside snippets are covered by apple-swiftui.
- Article: "Displaying static and interactive snippets" (`/documentation/appintents/displaying-static-and-interactive-snippets`).
- Inherits from `AppIntent`, `PersistentlyIdentifiable`, `Sendable`, `SendableMetatype`. Conforming type: `EmptySnippetIntent`.

## Related

- [ShowsSnippetIntent](./showssnippetintent.md)
- [EmptySnippetIntent](./emptysnippetintent.md)
- [ShowsSnippetView](../parameters-results/showssnippetview.md)
- [AppIntent](../intents/appintent.md)
