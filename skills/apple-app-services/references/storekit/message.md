# Message

An instance for receiving and displaying App Store messages (e.g., billing issue alerts) in your app.

## Signature / Usage

```swift
struct Message
```

```swift
// Set up listener at app launch to control when messages appear
Task {
    for await message in Message.messages {
        // Display when appropriate (avoid onboarding, critical flows)
        guard let windowScene = view.window?.windowScene else { continue }
        try? message.display(in: windowScene)
    }
}
```

## Options / Props

| Member | Type | Description |
|--------|------|-------------|
| `messages` | `static Message.Messages` | Async sequence that emits messages from the App Store |
| `reason` | `Message.Reason` | The reason the App Store sent the message |
| `display(in:)` | `func` | Requests the system to display the message in the given window scene |

## Notes

Available iOS 16.0+, iPadOS 16.0+, Mac Catalyst 16.0+, visionOS 1.0+. Not available on macOS, tvOS, or watchOS.

By setting up the listener early, you intercept messages before the system auto-displays them, giving you control over timing. Common `reason` values include billing issues. If you never call `display(in:)`, the message is suppressed for that session.

## Related

- [AppStore](./appstore.md)
