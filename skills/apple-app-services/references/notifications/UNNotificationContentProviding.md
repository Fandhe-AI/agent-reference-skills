# UNNotificationContentProviding

A protocol the system uses to provide context relevant to user notifications. The system allows only objects in the Apple SDK that conform to this protocol; conforming types outside the SDK are ignored.

## Signature / Usage

```swift
protocol UNNotificationContentProviding : NSObjectProtocol
```

## Notes

- iOS 15.0+, iPadOS 15.0+, macOS 12.0+, Mac Catalyst 15.0+, tvOS 15.0+, watchOS 8.0+, visionOS 1.0+
- No public methods or properties to implement directly; conforming types (e.g. `UNNotificationAttributedMessageContext`) are provided by the Apple SDK itself, used for communication notifications

## Related

- [UNMutableNotificationContent](./UNMutableNotificationContent.md)
- [UNNotificationContent](./UNNotificationContent.md)
- [UNNotificationAttachment](./UNNotificationAttachment.md)
- [UNNotificationSound](./UNNotificationSound.md)
