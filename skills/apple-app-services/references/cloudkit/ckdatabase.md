# CKDatabase

A collection of record zones and subscriptions. The primary interface for reading and writing CloudKit data. Not instantiated directly—accessed through `CKContainer`.

## Signature / Usage

```swift
let db = CKContainer.default().privateCloudDatabase

// Save a single record (async/await)
let saved = try await db.save(record)

// Fetch a single record
let record = try await db.record(for: recordID)

// Query records
let (results, cursor) = try await db.records(
    matching: CKQuery(recordType: "Item", predicate: NSPredicate(value: true)),
    inZoneWith: nil,
    desiredKeys: nil,
    resultsLimit: 50
)

// Modify records in batch
let (saveResults, deleteResults) = try await db.modifyRecords(
    saving: [record],
    deleting: [staleID],
    savePolicy: .ifServerRecordUnchanged,
    atomically: true
)
```

## Options / Props

| Member | Type | Description |
|--------|------|-------------|
| `databaseScope` | `CKDatabase.Scope` | Scope of this database (`.public`, `.private`, `.shared`) |
| `record(for:)` | `async throws -> CKRecord` | Fetches a single record by ID |
| `records(for:desiredKeys:)` | `async throws -> [CKRecord.ID: Result<CKRecord, Error>]` | Fetches multiple records; returns per-item results |
| `records(matching:inZoneWith:desiredKeys:resultsLimit:)` | `async throws` | Executes a query and returns matching records with optional cursor |
| `save(_:)` | `async throws -> CKRecord` | Saves a single record |
| `deleteRecord(withID:)` | `async throws -> CKRecord.ID` | Deletes a single record |
| `modifyRecords(saving:deleting:savePolicy:atomically:)` | `async throws` | Batch save and/or delete |
| `allRecordZones()` | `async throws -> [CKRecordZone]` | Returns all record zones |
| `modifyRecordZones(saving:deleting:)` | `async throws` | Creates or deletes record zones |
| `allSubscriptions()` | `async throws -> [CKSubscription]` | Returns all subscriptions |
| `modifySubscriptions(saving:deleting:)` | `async throws` | Saves or deletes subscriptions |
| `databaseChanges(since:resultsLimit:)` | `async throws` | Fetches zone-level changes since a server change token |
| `recordZoneChanges(inZoneWith:since:desiredKeys:resultsLimit:)` | `async throws` | Fetches record-level changes in a zone |
| `configuredWith(configuration:group:body:)` | `async rethrows` | Runs a block with custom QoS / operation group configuration |
| `add(_:)` | `func(CKDatabaseOperation)` | Adds a low-level operation to the database queue |

## Notes

- Platforms: iOS 8.0+, macOS 10.10+, tvOS 9.0+, watchOS 3.0+, visionOS 1.0+
- CloudKit defaults to low QoS; use `configuredWith(configuration:group:body:)` to raise it
- Batch methods return per-item `Result` types to handle partial failures gracefully
- Public database: readable unauthenticated, writable only with iCloud account
- Private and shared databases require an authenticated iCloud account

## Related

- [CKContainer](./ckcontainer.md)
- [CKRecord](./ckrecord.md)
- [CKRecordZone](./ckrecordzone.md)
- [CKQuery](./ckquery.md)
- [CKSubscription](./cksubscription.md)
