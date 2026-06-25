# CKRecord.Reference

Represents a many-to-one relationship between records within the same zone and database. Supports an optional cascading-delete ownership model.

## Signature / Usage

```swift
// Create a reference from an item to its owning list (cascading delete)
let ref = CKRecord.Reference(record: listRecord, action: .deleteSelf)
itemRecord["owningList"] = ref

// Query items belonging to a list
let predicate = NSPredicate(format: "owningList == %@",
    CKRecord.Reference(recordID: listRecord.recordID, action: .none))
let query = CKQuery(recordType: "Item", predicate: predicate)
```

## Options / Props

| Member | Type | Description |
|--------|------|-------------|
| `init(record:action:)` | `convenience init` | Creates a reference from a `CKRecord` object |
| `init(recordID:action:)` | `init` | Creates a reference from a `CKRecord.ID` |
| `recordID` | `CKRecord.ID` | The ID of the referenced (target) record |
| `action` | `CKRecord.ReferenceAction` | Deletion behavior when the target record is deleted |

### ReferenceAction values

| Value | Behavior |
|-------|----------|
| `.deleteSelf` | When the target is deleted, this record is automatically deleted (cascades) |
| `.none` | No automatic deletion |

## Notes

- Platforms: iOS 8.0+, macOS 10.10+, tvOS 9.0+, watchOS 3.0+, visionOS 1.0+
- References must point to records **within the same zone** — cross-zone references are not supported
- A single record may have at most **750** references with `.deleteSelf` action pointing to it
- When saving records with references between them, save the target (owner) first or include both in a single `CKModifyRecordsOperation`
- Creating a reference in memory alters the `recordChangeTag` of the referencing record on the server; re-fetch the record after creating references if you need the latest tag

## Related

- [CKRecord](./ckrecord.md)
- [CKRecord.ID](./ckrecord-id.md)
- [CKModifyRecordsOperation](./ckmodifyrecordsoperation.md)
