# CKRecordZone

A named partition within a CloudKit database that groups related records. Custom zones are available only in the private database. All records in the public and private databases also have access to a single default zone.

## Signature / Usage

```swift
// Create a custom zone
let zone = CKRecordZone(zoneName: "UserLibrary")

// Save the zone before creating records in it
try await db.modifyRecordZones(saving: [zone], deleting: [])

// Create a record in the custom zone
let recordID = CKRecord.ID(recordName: "book-1", zoneID: zone.zoneID)
let record = CKRecord(recordType: "Book", recordID: recordID)

// Reference the default zone
let defaultZone = CKRecordZone.default()
```

## Options / Props

| Member | Type | Description |
|--------|------|-------------|
| `init(zoneName:)` | `init` | Creates a zone with the given name |
| `init(zoneID:)` | `init` | Creates a zone from an existing `CKRecordZone.ID` |
| `default()` | `class func -> CKRecordZone` | Returns the default record zone |
| `zoneID` | `CKRecordZone.ID` | The zone's unique identifier |
| `capabilities` | `CKRecordZone.Capabilities` | Server-reported capabilities of the zone |
| `share` | `CKRecord.Reference?` | Reference to the zone's share record (if zone-wide sharing is active) |
| `encryptionScope` | `CKRecordZone.EncryptionScope` | Granularity of encryption key storage within the zone |

### CKRecordZone.Capabilities values

| Capability | Meaning |
|------------|---------|
| `.fetchChanges` | Zone supports `CKFetchRecordZoneChangesOperation` |
| `.atomic` | Zone supports atomic multi-record writes |
| `.sharing` | Zone supports `CKShare` sharing |

## Notes

- Platforms: iOS 8.0+, macOS 10.10+, tvOS 9.0+, watchOS 3.0+, visionOS 1.0+
- Custom zones must be **explicitly saved** to the database before any records can be stored in them
- `CKRecord.Reference` cannot cross zone boundaries — references must point to records in the same zone
- Custom zones support atomic transactions: if any record in a batch fails, the entire batch is rolled back (when `isAtomic = true` on `CKModifyRecordsOperation`)
- Custom zones enable efficient incremental fetching via `CKFetchRecordZoneChangesOperation` and `CKSyncEngine`
- Do not subclass `CKRecordZone`

## Related

- [CKRecord.ID](./ckrecord-id.md)
- [CKRecord.Reference](./ckrecord-reference.md)
- [CKDatabase](./ckdatabase.md)
- [CKSyncEngine](./cksyncengine.md)
