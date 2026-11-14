# CKOperationGroup

An explicit association between two or more operations.

## Signature / Usage

```swift
class CKOperationGroup
```

Adapted (not in the official docs): minimal usage built from the declared members; the official page has no code example. `group` is the property the official overview names for associating an operation with a group.

```swift
import CloudKit

func save(_ records: [CKRecord]) {
    let group = CKOperationGroup()
    group.name = "SaveCalendarEvent"
    group.expectedSendSize = .kilobytes

    let operation = CKModifyRecordsOperation(recordsToSave: records)
    operation.group = group
    CKContainer.default().privateCloudDatabase.add(operation)
}
```

## Options / Props

| Member | Type | Description |
|--------|------|-------------|
| `init()` | initializer | Creates an operation group |
| `defaultConfiguration` | `CKOperation.Configuration!` | Default configuration for operations in the group |
| `expectedReceiveSize` | `CKOperationGroup.TransferSize` | Estimated size of traffic to download from CloudKit |
| `expectedSendSize` | `CKOperationGroup.TransferSize` | Estimated size of traffic to upload to CloudKit |
| `name` | `String?` | The group's name |
| `operationGroupID` | `String` | The group's unique identifier |
| `quantity` | `Int` | Number of operations in the group |
| `TransferSize` | `enum` | `kilobytes`, `megabytes`, `gigabytes`, `tensOfMegabytes`, `tensOfGigabytes`, `hundredsOfMegabytes`, `hundredsOfGigabytes`, `unknown` |

## Notes

- Available iOS 11.0+, iPadOS 11.0+, Mac Catalyst 13.1+, macOS 10.13+, tvOS 11.0+, visionOS 1.0+, watchOS 4.0+. Inherits from `NSObject`.
- Grouping operations does not ensure atomicity.
- Associate a group with an operation by setting the operation's `group` property. Create a new group for each distinct user interaction (for example, fetching records, incremental fetches after a push notification, and saving several records when the user saves an event).
- Source: https://developer.apple.com/documentation/cloudkit/ckoperationgroup (fetched 2026-11-14)

## Related

- [CKModifyRecordsOperation](./ckmodifyrecordsoperation.md)
- [CKDatabase](./ckdatabase.md)
