# CKRecord

A dictionary of key-value pairs that stores app data in CloudKit. The fundamental unit of all CloudKit data transactions.

## Signature / Usage

```swift
// Create a record (auto-generated ID in default zone)
let record = CKRecord(recordType: "Employee")

// Create with explicit ID
let id = CKRecord.ID(recordName: "emp-001")
let record = CKRecord(recordType: "Employee", recordID: id)

// Set and get field values
record["name"]     = "Jane Doe" as NSString
record["salary"]   = 80_000 as NSNumber
record["hireDate"] = Date() as NSDate

if let name = record["name"] as? String {
    print(name)
}

// Save via database
let saved = try await CKContainer.default().privateCloudDatabase.save(record)
```

## Options / Props

| Member | Type | Description |
|--------|------|-------------|
| `recordID` | `CKRecord.ID` | Unique identifier of the record |
| `recordType` | `CKRecord.RecordType` | String tag identifying the schema type |
| `creationDate` | `Date?` | When CloudKit first saved the record |
| `modificationDate` | `Date?` | Most recent save time (server-assigned) |
| `creatorUserRecordID` | `CKRecord.ID?` | ID of the user who created the record |
| `lastModifiedUserRecordID` | `CKRecord.ID?` | ID of the user who last modified the record |
| `recordChangeTag` | `String?` | Opaque token used for conflict detection |
| `parent` | `CKRecord.Reference?` | Reference to the parent record (used by sharing hierarchies) |
| `share` | `CKRecord.Reference?` | Reference to the `CKShare` that governs this record |
| `encryptedValues` | `CKRecordKeyValueSetting` | Access point for end-to-end encrypted field values |
| `object(forKey:)` / `subscript` | `func` | Gets a field value by key |
| `setObject(_:forKey:)` | `func` | Sets a field value by key |
| `allKeys()` | `func -> [FieldKey]` | Returns all field keys stored on the record |
| `changedKeys()` | `func -> [FieldKey]` | Returns keys modified since the last save |
| `encodeSystemFields(with:)` | `func(NSCoder)` | Encodes metadata (ID, change tag) for local caching |
| `setParent(_:)` | `func(CKRecord? / CKRecord.ID?)` | Sets the parent reference for sharing |

## Supported Field Value Types

| Swift / ObjC Type | Notes |
|-------------------|-------|
| `String` / `NSString` | Use `CKAsset` for large text |
| `NSNumber` | Integers and floating-point |
| `Data` / `NSData` | Binary bytes; not searchable; use `CKAsset` for large blobs |
| `Date` / `NSDate` | Timestamps |
| `[Any]` / `NSArray` | Arrays of other supported types |
| `CLLocation` | Geographic coordinates |
| `CKAsset` | Disk-based file; does not count toward the 1 MB record limit |
| `CKRecord.Reference` | Link to a related record in the same zone |

## Notes

- Platforms: iOS 8.0+, macOS 10.10+, tvOS 9.0+, watchOS 3.0+, visionOS 1.0+
- Total record data (excluding assets) must not exceed **1 MB**
- In development, new field keys are accepted dynamically; in production the server returns an error for unknown record types or keys
- Use `encodeSystemFields(with:)` + `NSKeyedArchiver` to cache record metadata locally for sync workflows
- Do not subclass `CKRecord`

## Related

- [CKRecord.ID](./ckrecord-id.md)
- [CKRecord.Reference](./ckrecord-reference.md)
- [CKAsset](./ckasset.md)
- [CKDatabase](./ckdatabase.md)
- [CKModifyRecordsOperation](./ckmodifyrecordsoperation.md)
