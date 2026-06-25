# CKQueryOperation

A concrete `CKDatabaseOperation` subclass that executes a `CKQuery` against a database zone and delivers matching records asynchronously. Supports cursor-based pagination for large result sets.

## Signature / Usage

```swift
let query = CKQuery(recordType: "Item", predicate: NSPredicate(value: true))
let operation = CKQueryOperation(query: query)
operation.resultsLimit = 50
operation.desiredKeys  = ["title", "creationDate"]

operation.recordMatchedBlock = { recordID, result in
    switch result {
    case .success(let record): print(record["title"] ?? "")
    case .failure(let error):  print(error)
    }
}

operation.queryResultBlock = { result in
    switch result {
    case .success(let cursor):
        if let cursor {
            // Fetch next page
            let next = CKQueryOperation(cursor: cursor)
            next.recordMatchedBlock   = operation.recordMatchedBlock
            next.queryResultBlock     = operation.queryResultBlock
            database.add(next)
        }
    case .failure(let error): print(error)
    }
}

database.add(operation)
```

## Options / Props

| Member | Type | Description |
|--------|------|-------------|
| `init(query:)` | `convenience init` | Creates an operation from a `CKQuery` |
| `init(cursor:)` | `convenience init` | Creates an operation to continue a previous paginated query |
| `query` | `CKQuery?` | The query to execute |
| `cursor` | `CKQueryOperation.Cursor?` | Cursor marking the restart point for pagination |
| `zoneID` | `CKRecordZone.ID?` | Limits search to a specific record zone |
| `resultsLimit` | `Int` | Maximum records to return per operation |
| `desiredKeys` | `[CKRecord.FieldKey]?` | Subset of fields to fetch; omit to fetch all fields |
| `recordMatchedBlock` | `((CKRecord.ID, Result<CKRecord, Error>) -> Void)?` | Called for each matched record |
| `queryResultBlock` | `((Result<CKQueryOperation.Cursor?, Error>) -> Void)?` | Called when the operation completes; cursor is non-nil if more results exist |

## Notes

- Platforms: iOS 8.0+, macOS 10.10+, tvOS 9.0+, watchOS 3.0+, visionOS 1.0+
- CloudKit restricts each operation to a **single record zone**; to search multiple zones, create one operation per zone
- Use `desiredKeys` to reduce data transfer when only a subset of fields is needed
- The deprecated `recordFetchedBlock` and `queryCompletionBlock` are replaced by `recordMatchedBlock` and `queryResultBlock`
- Do not use the `Operation.completionBlock` for result processing; use `queryResultBlock`

## Related

- [CKQuery](./ckquery.md)
- [CKDatabase](./ckdatabase.md)
- [CKFetchRecordsOperation](./ckfetchrecordsoperation.md)
