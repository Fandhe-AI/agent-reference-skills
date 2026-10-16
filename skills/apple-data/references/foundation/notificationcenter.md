# NotificationCenter

A class providing a notification dispatch mechanism for broadcasting information to registered observers within a single process.

## Signature / Usage

```swift
// Post a notification
NotificationCenter.default.post(name: .myEvent, object: self, userInfo: ["key": "value"])

// Block-based observer (recommended)
let token = NotificationCenter.default.addObserver(
    forName: .myEvent,
    object: nil,
    queue: .main
) { notification in
    print(notification.userInfo)
}

// Remove when done
NotificationCenter.default.removeObserver(token)

// Async sequence (Swift concurrency)
for await notification in NotificationCenter.default.notifications(named: .myEvent) {
    // handle
}

// Concurrency-safe message API (iOS 26.0+)
// Store the returned NotificationCenter.ObservationToken (distinct from the
// NSObjectProtocol token above) in a property for as long as you intend to observe.
let timeZoneToken: NotificationCenter.ObservationToken = NotificationCenter.default.addObserver(
    of: TimeZone.self,
    for: .systemTimeZoneDidChange)
{ message in
    let identifier = message.previousTimeZone?.identifier ?? "(unknown)"
    print("Time zone changed from \(identifier).")
}
```

## Options / Props

| Method / Property | Description |
|-------------------|-------------|
| `NotificationCenter.default` (class) | Shared notification center |
| `addObserver(forName:object:queue:using:)` | Block-based observer; returns an opaque token |
| `addObserver(_:selector:name:object:)` | Selector-based observer (Objective-C style) |
| `post(name:object:)` | Post notification synchronously |
| `post(name:object:userInfo:)` | Post with additional `userInfo` dictionary |
| `post(_:)` | Post a pre-constructed `Notification` |
| `removeObserver(_:)` | Remove all notifications for an observer/token |
| `removeObserver(_:name:object:)` | Remove a specific observer registration |
| `publisher(for:object:)` | Combine `Publisher` emitting `Notification` |
| `notifications(named:object:)` | Async sequence of `Notification` |

### Concurrency-safe message API (iOS 26.0+, iPadOS 26.0+, Mac Catalyst 26.0+, macOS 26.0+, tvOS 26.0+, visionOS 26.0+, watchOS 26.0+)

| Member | Description |
|--------|-------------|
| `protocol NotificationCenter.MainActorMessage : SendableMetatype` | Message type bound to the main actor; delivered synchronously when posted |
| `protocol NotificationCenter.AsyncMessage` | Message type posted to an arbitrary isolation |
| `static var name: Notification.Name` | (protocol requirement, both protocols) Optional name used to interoperate with `Notification` posters and observers |
| `associatedtype Subject` | (protocol requirement) Type that can optionally be posted and observed along with the message |
| `static func makeMessage(_: Notification) -> Self?` | Converts a posted notification into the message type |
| `static func makeNotification(_: Self) -> Notification` | Converts a posted message into a notification (`MainActorMessage` form shown) |
| `addObserver(of:for:using:)` | Overloads for a subject instance or `Subject.Type`, with a `MessageIdentifier` or a `Message.Type`; closure is `(Message) -> Void` (main actor) or `(Message) async -> Void` (async). Returns `NotificationCenter.ObservationToken` |
| `removeObserver(_: NotificationCenter.ObservationToken)` | Stops the observation represented by the token |
| `messages(of:for:bufferSize:)` | Returns `some Sendable & AsyncSequence<Message, Never>` of messages |
| `post(_:subject:)` / `post(_:)` | Posts a main actor or asynchronous message, optionally with a subject |

## Notes

- Available iOS 2.0+, macOS 10.0+.
- Inherits from `NSObject`.
- Block-based observers must be explicitly removed (store the returned token; call `removeObserver(_:)` in `deinit` or cancellation).
- Notifications are dispatched synchronously on the posting thread; use `queue: .main` to receive on the main thread.
- `Notification` is `nonisolated`; the message types (iOS 26.0+) carry isolation information for Swift concurrency. Many system frameworks, including Foundation, UIKit, and AppKit, adopt `MainActorMessage` and `AsyncMessage` so their notifications can be used in concurrency-safe code (official "Notification center messages" article).
- Observation ends when the returned `ObservationToken` is discarded or after an explicit `removeObserver(_:)`.
- For inter-process notifications, use `DistributedNotificationCenter`.
- Source: https://developer.apple.com/documentation/foundation/notificationcenter , https://developer.apple.com/documentation/foundation/notification-center-messages , https://developer.apple.com/documentation/foundation/notificationcenter/mainactormessage , https://developer.apple.com/documentation/foundation/notificationcenter/asyncmessage (fetched 2026-10-16, iOS 27 SDK docs)

## Related

- [UserDefaults](./userdefaults.md)
