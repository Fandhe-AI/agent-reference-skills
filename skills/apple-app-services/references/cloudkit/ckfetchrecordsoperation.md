# CKFetchRecordsOperation

A `CKDatabaseOperation` subclass that retrieves one or more records by ID. Reports results per-record as they arrive and signals overall completion when done.

## Signature / Usage

```swift
let ids = [recordID1, recordID2]
let operation = CKFetchRecordsOperation(recordIDs: ids)
operation.desiredKeys = ["title", "thumbnail"]   // fetch subset of fields

operation.perRecordResultBlock = { recordID, result in
    switch result {
    case .success(let record): print(record["title"] ?? "")
    case .failure(let error):  print("Failed \(recordID): \(error)")
    }
}

operation.fetchRecordsResultBlock = { result in
    if case .failure(let error) = result {
        print("Operation failed: \(error)")
    }
}

CKContainer.default().privateCloudDatabase.add(operation)
```

## Options / Props

| Member | Type | Description |
|--------|------|-------------|
| `init(recordIDs:)` | `convenience init` | Creates an operation for the given record IDs |
| `fetchCurrentUserRecordOperation()` | `class func -> Self` | Returns an operation configured to fetch the current user's record |
| `recordIDs` | `[CKRecord.ID]?` | IDs of records to fetch |
| `desiredKeys` | `[CKRecord.FieldKey]?` | Fields to include; `nil` fetches all fields |
| `perRecordResultBlock` | `((CKRecord.ID, Result<CKRecord, Error>) -> Void)?` | Called for each fetched record |
| `fetchRecordsResultBlock` | `((Result<Void, Error>) -> Void)?` | Called after all records are processed |

## Notes

- Platforms: iOS 8.0+, macOS 10.10+, tvOS 9.0+, watchOS 3.0+, visionOS 1.0+
- Result blocks execute on an internal background queue; dispatch to main queue for UI updates
- Do not use `Operation.completionBlock` for processing results
- Do not store sensitive data (passwords etc.) in the user record returned by `fetchCurrentUserRecordOperation()` — discoverable user records in the public database are visible to other app users

## Related

- [CKRecord](./ckrecord.md)
- [CKRecord.ID](./ckrecord-id.md)
- [CKModifyRecordsOperation](./ckmodifyrecordsoperation.md)
- [CKDatabase](./ckdatabase.md)
