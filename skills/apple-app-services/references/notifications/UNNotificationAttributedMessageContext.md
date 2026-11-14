# UNNotificationAttributedMessageContext

A context that gives the system a message intent and attributed content for a notification.

## Signature / Usage

```swift
class UNNotificationAttributedMessageContext
```

Adapted (not in the official docs): minimal usage built from the declared initializer and `UNNotificationContent.updating(from:)`; the official page has no code example. Call it from a notification service extension.

```swift
import UserNotifications
import Intents

func contextualize(_ content: UNNotificationContent,
                   intent: INSendMessageIntent,
                   text: NSAttributedString) throws -> UNNotificationContent {
    let context = UNNotificationAttributedMessageContext(sendMessageIntent: intent,
                                                         attributedContent: text)
    return try content.updating(from: context)
}
```

## Options / Props

| Member | Type | Description |
|--------|------|-------------|
| `init(sendMessageIntent:attributedContent:)` | `convenience init(sendMessageIntent: INSendMessageIntent, attributedContent: NSAttributedString)` | Creates the context from a send-message intent and attributed content |

## Notes

- Available iOS 18.0+, iPadOS 18.0+, Mac Catalyst 18.0+, macOS 15.0+, visionOS 2.0+, watchOS 11.0+. Inherits from `NSObject`; conforms to `UNNotificationContentProviding`.
- The official page has an empty abstract and no overview; the description above is inferred from the initializer signature and the protocol conformance. `updating(from:)` is documented as returning a copy of the notification that includes content from a `UNNotificationContentProviding` provider, and it throws a `UNError.Code` error if the provider is invalid.
- Source: https://developer.apple.com/documentation/usernotifications/unnotificationattributedmessagecontext (fetched 2026-11-14)
- Source: https://developer.apple.com/documentation/usernotifications/unnotificationcontent/updating(from:) (fetched 2026-11-14)

## Related

- [UNNotificationContentProviding](./UNNotificationContentProviding.md)
- [UNNotificationServiceExtension](./UNNotificationServiceExtension.md)
- [UNNotificationContent](./UNNotificationContent.md)
