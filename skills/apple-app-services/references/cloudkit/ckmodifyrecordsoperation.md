# CKModifyRecordsOperation

A `CKDatabaseOperation` subclass that saves and/or deletes records in a single request. Supports conflict policies and atomic transactions per zone.

## Signature / Usage

```swift
let operation = CKModifyRecordsOperation(
    recordsToSave:    [updatedRecord],
    recordIDsToDelete: [staleRecordID]
)

operation.savePolicy = .ifServerRecordUnchanged  // default; use .changedKeys to merge
operation.isAtomic   = true                      // all-or-nothing per zone

operation.perRecordSaveBlock = { recordID, result in
    switch result {
    case .success(let saved): print("Saved \(saved.recordID)")
    case .failure(let error): print("Error \(recordID): \(error)")
    }
}

operation.perRecordDeleteBlock = { recordID, result in
    if case .failure(let error) = result { print(error) }
}

operation.modifyRecordsResultBlock = { result in
    if case .failure(let error) = result { print("Batch error: \(error)") }
}

CKContainer.default().privateCloudDatabase.add(operation)
```

## Options / Props

| Member | Type | Description |
|--------|------|-------------|
| `init(recordsToSave:recordIDsToDelete:)` | `convenience init` | Creates an operation with records to save and/or IDs to delete |
| `recordsToSave` | `[CKRecord]?` | Records to save |
| `recordIDsToDelete` | `[CKRecord.ID]?` | IDs of records to delete permanently |
| `savePolicy` | `CKModifyRecordsOperation.RecordSavePolicy` | Conflict resolution strategy (see below) |
| `isAtomic` | `Bool` | If `true`, the entire zone batch fails if any record fails |
| `clientChangeTokenData` | `Data?` | Token for tracking local changes (used with `CKSyncEngine`) |
| `perRecordProgressBlock` | `((CKRecord, Double) -> Void)?` | Progress for individual records (0.0–1.0) |
| `perRecordSaveBlock` | `((CKRecord.ID, Result<CKRecord, Error>) -> Void)?` | Called when a record is saved |
| `perRecordDeleteBlock` | `((CKRecord.ID, Result<Void, Error>) -> Void)?` | Called when a record is deleted |
| `modifyRecordsResultBlock` | `((Result<Void, Error>) -> Void)?` | Called after all modifications complete |

### RecordSavePolicy values

| Value | Behavior |
|-------|----------|
| `.ifServerRecordUnchanged` | Only write if the server record's change tag matches (default); returns `serverRecordChanged` on conflict |
| `.changedKeys` | Overwrite only the locally changed keys on the server |
| `.allKeys` | Overwrite all keys on the server regardless of changes |

## Notes

- Platforms: iOS 8.0+, macOS 10.10+, tvOS 9.0+, watchOS 3.0+, visionOS 1.0+
- The server rejects overly large batches with `limitExceeded`; split into smaller operations and retry
- Result blocks execute on an internal background queue; dispatch to the main queue for UI work
- When saving records that reference each other, include all in the same operation or save the target first
- The `parent` reference target must already exist in the database or be included in the same operation

## Related

- [CKRecord](./ckrecord.md)
- [CKRecord.ID](./ckrecord-id.md)
- [CKError](./ckerror.md)
- [CKDatabase](./ckdatabase.md)
