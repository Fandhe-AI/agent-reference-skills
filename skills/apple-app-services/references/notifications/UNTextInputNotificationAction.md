# UNTextInputNotificationAction

An action that accepts user-typed text. When selected, the system displays controls for text entry or dictation, and includes the response in the notification response object delivered to your app.

## Signature / Usage

```swift
let replyAction = UNTextInputNotificationAction(
    identifier: "REPLY_ACTION",
    title: "Reply",
    options: [],
    textInputButtonTitle: "Send",
    textInputPlaceholder: "Type your message"
)

let category = UNNotificationCategory(
    identifier: "MESSAGE_CATEGORY",
    actions: [replyAction],
    intentIdentifiers: [],
    options: []
)
```

## Options / Props

| Property | Type | Description |
|----------|------|-------------|
| `textInputButtonTitle` | `String` | The localized title of the text input button the system displays to the user |
| `textInputPlaceholder` | `String` | The placeholder text the system localizes and displays in the text input field |

### Initializers

```swift
convenience init(
    identifier: String,
    title: String,
    options: UNNotificationActionOptions,
    textInputButtonTitle: String,
    textInputPlaceholder: String
)

convenience init(
    identifier: String,
    title: String,
    options: UNNotificationActionOptions,
    icon: UNNotificationActionIcon?,
    textInputButtonTitle: String,
    textInputPlaceholder: String
)
```

## Notes

- iOS 10.0+, iPadOS 10.0+, macOS 10.14+, Mac Catalyst 13.1+, watchOS 3.0+, visionOS 1.0+
- Inherits from `UNNotificationAction`
- Selecting this action delivers a `UNTextInputNotificationResponse` to your delegate instead of a plain `UNNotificationResponse`

## Related

- [UNNotificationAction](./UNNotificationAction.md)
- [UNNotificationCategory](./UNNotificationCategory.md)
- [UNTextInputNotificationResponse](./UNTextInputNotificationResponse.md)
