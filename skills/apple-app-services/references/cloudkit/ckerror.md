# CKError

The error type for all CloudKit failures. Conforms to `Error`. Cast errors to `CKError` to access structured information for conflict resolution, retry logic, and partial-failure handling.

## Signature / Usage

```swift
do {
    try await db.save(record)
} catch let error as CKError {
    switch error.code {
    case .serverRecordChanged:
        // Merge client changes into error.serverRecord and retry
        if let serverRecord = error.serverRecord {
            serverRecord["field"] = localRecord["field"]
            try await db.save(serverRecord)
        }
    case .requestRateLimited:
        if let retryAfter = error.retryAfterSeconds {
            try await Task.sleep(nanoseconds: UInt64(retryAfter * 1_000_000_000))
            // retry
        }
    case .partialFailure:
        for (itemID, itemError) in error.partialErrorsByItemID ?? [:] {
            print("\(itemID): \(itemError)")
        }
    default:
        print(error)
    }
}
```

## Options / Props

| Member | Type | Description |
|--------|------|-------------|
| `code` | `CKError.Code` | The specific error code |
| `errorCode` | `Int` | Raw integer error code |
| `errorDomain` | `String` | `"CKErrorDomain"` |
| `retryAfterSeconds` | `Double?` | Seconds to wait before retrying (`.requestRateLimited`) |
| `partialErrorsByItemID` | `[AnyHashable: Error]?` | Per-item errors in batch operations (`.partialFailure`) |
| `ancestorRecord` | `CKRecord?` | Original version of the conflicted record (`.serverRecordChanged`) |
| `clientRecord` | `CKRecord?` | Local version with unsaved changes (`.serverRecordChanged`) |
| `serverRecord` | `CKRecord?` | Most recent server version — use this as the base for merge (`.serverRecordChanged`) |

### Key CKError.Code values

| Code | Meaning |
|------|---------|
| `.serverRecordChanged` | Server version is newer; conflict must be resolved |
| `.unknownItem` | Record or zone does not exist |
| `.partialFailure` | Batch operation partially succeeded; inspect `partialErrorsByItemID` |
| `.requestRateLimited` | CloudKit is rate-limiting; wait `retryAfterSeconds` |
| `.limitExceeded` | Request size too large; split into smaller batches |
| `.quotaExceeded` | User's iCloud storage quota exceeded |
| `.notAuthenticated` | User is not signed in to iCloud |
| `.permissionFailure` | User lacks permission for the operation |
| `.networkUnavailable` | No network connection |
| `.networkFailure` | Network available but CloudKit unreachable |
| `.serviceUnavailable` | CloudKit is temporarily unavailable |
| `.zoneNotFound` | Specified record zone does not exist |
| `.alreadyShared` | Record is already part of a share |
| `.operationCancelled` | Operation was cancelled |
| `.internalError` | Non-recoverable server error |
| `.batchRequestFailed` | Entire batch was rejected (atomic operation side-effect) |
| `.constraintViolation` | Unique field constraint violated |
| `.referenceViolation` | Reference target record not found |

## Notes

- Platforms: iOS 8.0+, macOS 10.10+, tvOS 9.0+, watchOS 3.0+, visionOS 1.0+
- For `.serverRecordChanged`, always use `serverRecord` (not `clientRecord`) as the base for merging and re-saving; `serverRecord` contains the current `recordChangeTag`
- `CKSyncEngine` automatically handles transient errors (`notAuthenticated`, `networkFailure`, `requestRateLimited`, etc.); manual retry is needed only for application-level errors

## Related

- [CKRecord](./ckrecord.md)
- [CKModifyRecordsOperation](./ckmodifyrecordsoperation.md)
- [CKSyncEngine](./cksyncengine.md)
