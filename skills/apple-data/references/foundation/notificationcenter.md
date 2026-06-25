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

## Notes

- Available iOS 2.0+, macOS 10.0+.
- Inherits from `NSObject`.
- Block-based observers must be explicitly removed (store the returned token; call `removeObserver(_:)` in `deinit` or cancellation).
- Notifications are dispatched synchronously on the posting thread; use `queue: .main` to receive on the main thread.
- For inter-process notifications, use `DistributedNotificationCenter`.

## Related

- [UserDefaults](./userdefaults.md)
