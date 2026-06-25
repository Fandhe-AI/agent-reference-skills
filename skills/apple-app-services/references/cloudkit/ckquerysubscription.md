# CKQuerySubscription

A `CKSubscription` subclass that sends push notifications whenever records matching a given predicate are created, updated, or deleted.

## Signature / Usage

```swift
let predicate = NSPredicate(format: "topic == %@", "announcements")
let subscription = CKQuerySubscription(
    recordType: "Message",
    predicate:  predicate,
    subscriptionID: "new-messages",
    options: [.firesOnRecordCreation, .firesOnRecordUpdate]
)

let info = CKSubscription.NotificationInfo()
info.shouldSendContentAvailable = true   // silent push
subscription.notificationInfo = info

// Save once; track in UserDefaults to avoid redundant server trips
try await db.modifySubscriptions(saving: [subscription], deleting: [])
UserDefaults.standard.set(true, forKey: "subscriptionCreated")
```

## Options / Props

| Member | Type | Description |
|--------|------|-------------|
| `init(recordType:predicate:subscriptionID:options:)` | `convenience init` | Creates a named query subscription |
| `init(recordType:predicate:options:)` | `convenience init` | Creates a query subscription with an auto-generated ID |
| `predicate` | `NSPredicate` | Matching criteria for triggering notifications |
| `recordType` | `CKRecord.RecordType?` | The record type to watch |
| `querySubscriptionOptions` | `CKQuerySubscription.Options` | Bitmask of triggering events |
| `zoneID` | `CKRecordZone.ID?` | Limit notifications to a specific zone (`nil` = all zones) |

### CKQuerySubscription.Options values

| Option | Triggers when |
|--------|---------------|
| `.firesOnRecordCreation` | A matching record is created |
| `.firesOnRecordUpdate` | A matching record is updated |
| `.firesOnRecordDeletion` | A matching record is deleted |

## Notes

- Platforms: iOS 10.0+, macOS 10.12+, tvOS 10.0+, watchOS 6.0+, visionOS 1.0+
- Query subscriptions work only with **public and private** databases — not shared databases
- Create subscriptions at app launch and guard with `UserDefaults` to avoid duplicates
- On receiving a notification, re-query with `CKQueryOperation` (the same predicate) to obtain the actual record data; do not rely solely on the notification payload
- Subscriptions apply only to the user who creates them

## Related

- [CKSubscription](./cksubscription.md)
- [CKQuery](./ckquery.md)
- [CKDatabase](./ckdatabase.md)
