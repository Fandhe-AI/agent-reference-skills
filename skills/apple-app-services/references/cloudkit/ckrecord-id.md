# CKRecord.ID

Uniquely identifies a record in a CloudKit database. Composed of a name string and a zone ID.

## Signature / Usage

```swift
// In the default zone
let id = CKRecord.ID(recordName: "my-unique-key")

// In a custom zone
let zoneID = CKRecordZone.ID(zoneName: "Purchases")
let id = CKRecord.ID(recordName: "order-42", zoneID: zoneID)

// Use when creating or fetching a record
let record = CKRecord(recordType: "Order", recordID: id)
let fetched = try await db.record(for: id)
```

## Options / Props

| Member | Type | Description |
|--------|------|-------------|
| `init(recordName:)` | `init` | Creates an ID in the default zone |
| `init(recordName:zoneID:)` | `init` | Creates an ID in the specified zone |
| `recordName` | `String` | The record's name (ASCII, max 255 characters) |
| `zoneID` | `CKRecordZone.ID` | The zone that contains the record |

## Notes

- Platforms: iOS 8.0+, macOS 10.10+, tvOS 9.0+, watchOS 3.0+, visionOS 1.0+
- `recordName` must be ASCII with a maximum length of 255 characters
- When omitted from `CKRecord` initializers, CloudKit auto-generates a UUID-based name
- The same `recordName` can exist in different zones without conflict
- Persist `recordName` and `zoneID.zoneName` strings if you need to reconstruct IDs across launches
- Do not subclass `CKRecord.ID`

## Related

- [CKRecord](./ckrecord.md)
- [CKRecordZone](./ckrecordzone.md)
