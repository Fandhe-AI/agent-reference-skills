# CKSubscription

Abstract base class for persistent server-side queries that trigger push notifications when records change. Subclassed by `CKQuerySubscription`, `CKRecordZoneSubscription`, and `CKDatabaseSubscription`.

## Signature / Usage

```swift
// Concrete subclass example — see CKQuerySubscription for full usage
// Save a subscription to activate it
try await db.modifySubscriptions(saving: [subscription], deleting: [])

// Handle incoming push notification in AppDelegate
func application(_ application: UIApplication,
                 didReceiveRemoteNotification userInfo: [AnyHashable: Any],
                 fetchCompletionHandler completionHandler: @escaping (UIBackgroundFetchResult) -> Void) {
    let notification = CKNotification(fromRemoteNotificationDictionary: userInfo)
    // Inspect notification.subscriptionID, notification.notificationType, etc.
    completionHandler(.newData)
}
```

## Options / Props

| Member | Type | Description |
|--------|------|-------------|
| `subscriptionID` | `CKSubscription.ID` | Unique identifier for the subscription |
| `subscriptionType` | `CKSubscription.SubscriptionType` | Behavior type (`.query`, `.recordZone`, `.database`) |
| `notificationInfo` | `CKSubscription.NotificationInfo?` | Push notification configuration |

### CKSubscription.NotificationInfo key properties

| Member | Type | Description |
|--------|------|-------------|
| `desiredKeys` | `[CKRecord.FieldKey]?` | Record fields to include in the push payload |
| `alertBody` | `String?` | Alert message text |
| `shouldSendContentAvailable` | `Bool` | Send silent push (background fetch trigger) |
| `shouldSendMutableContent` | `Bool` | Allow notification service extension to modify the notification |

## Notes

- Platforms: iOS 8.0+, macOS 10.10+, tvOS 9.0+, watchOS 3.0+, visionOS 1.0+
- Subscriptions are not active until saved to the server and indexed; creation in the development environment first is required
- CloudKit automatically adds APNs entitlements when you enable CloudKit; no separate APNs setup is needed
- The device that initiates a change **does not** receive the resulting push notification
- APNs payload size is limited; if CloudKit truncates keys, use `CKFetchNotificationChangesOperation` to retrieve the full payload
- Subscriptions are per-user — each user must create their own subscriptions

## Related

- [CKQuerySubscription](./ckquerysubscription.md)
- [CKDatabase](./ckdatabase.md)
