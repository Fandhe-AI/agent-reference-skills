# CKShare

A specialized `CKRecord` subclass that manages a collection of shared records and their participants. Enables iCloud sharing of a record hierarchy or an entire custom record zone.

## Signature / Usage

```swift
// Share a record hierarchy
let share = CKShare(rootRecord: rootRecord)
share[CKShare.SystemFieldKey.title]             = "My Album" as CKRecordValue
share[CKShare.SystemFieldKey.shareType]         = "com.example.album" as CKRecordValue
share.publicPermission = .readOnly              // anyone with link can read

// Save share and root record together
let operation = CKModifyRecordsOperation(recordsToSave: [share, rootRecord])
CKContainer.default().privateCloudDatabase.add(operation)

// Present sharing UI (UIKit)
let controller = UICloudSharingController(share: share, container: CKContainer.default())
present(controller, animated: true)
```

## Options / Props

| Member | Type | Description |
|--------|------|-------------|
| `init(rootRecord:)` | `init` | Creates a share for a specific record hierarchy |
| `init(recordZoneID:)` | `init` | Creates a zone-wide share for an entire custom record zone |
| `owner` | `CKShare.Participant` | The participant representing the share owner |
| `participants` | `[CKShare.Participant]` | All participants in the share (max 100) |
| `currentUserParticipant` | `CKShare.Participant?` | The current user's participant entry |
| `publicPermission` | `CKShare.ParticipantPermission` | Permission granted to anyone with the share URL |
| `url` | `URL?` | The share invitation URL (available after the share is saved) |
| `allowsAccessRequests` | `Bool` | Whether users can request access to the share |
| `addParticipant(_:)` | `func` | Adds a participant to the share |
| `removeParticipant(_:)` | `func` | Removes a participant from the share |

### ParticipantPermission values

| Value | Access |
|-------|--------|
| `.none` | No access |
| `.readOnly` | Can read shared records |
| `.readWrite` | Can read and modify shared records |

### SystemFieldKey values (metadata customization)

| Key | Purpose |
|-----|---------|
| `CKShare.SystemFieldKey.title` | Display title shown to participants |
| `CKShare.SystemFieldKey.thumbnailImageData` | Thumbnail image data (`Data`) |
| `CKShare.SystemFieldKey.shareType` | UTI string identifying the content type |

## Notes

- Platforms: iOS 10.0+, macOS 10.12+, tvOS 10.0+, watchOS 3.0+, visionOS 1.0+
- Shared records must reside in a **custom record zone** in the owner's private database
- A record can belong to **only one share** at a time; attempting to add it to another returns `CKError.alreadyShared`
- Only the owner can delete the root record; participants with `.readWrite` permission can modify or delete any non-root record in the hierarchy
- Add `CKSharingSupported = true` to `Info.plist` so the system can launch your app when users open a share URL
- Distinguish hierarchy-sharing from zone-wide sharing by checking `metadata.share.recordID.recordName == CKRecordNameZoneWideShare`
- Use the `parent` property (not custom reference fields) to establish the sharing hierarchy between records

## Related

- [CKRecord](./ckrecord.md)
- [CKRecordZone](./ckrecordzone.md)
- [CKContainer](./ckcontainer.md)
- [CKError](./ckerror.md)
