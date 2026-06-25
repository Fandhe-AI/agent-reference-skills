# CKQuery

Describes search criteria for finding records in a CloudKit database: a record type, an `NSPredicate`, and optional sort descriptors. Executed asynchronously via `CKQueryOperation` or `CKDatabase` async methods.

## Signature / Usage

```swift
// Fetch all records of a type
let query = CKQuery(
    recordType: "Item",
    predicate: NSPredicate(value: true)
)

// Filter by a field value
let predicate = NSPredicate(format: "color == %@", "red")
let query = CKQuery(recordType: "Widget", predicate: predicate)
query.sortDescriptors = [NSSortDescriptor(key: "creationDate", ascending: false)]

// Execute via CKDatabase (async)
let (results, cursor) = try await db.records(
    matching: query,
    inZoneWith: nil,
    desiredKeys: nil,
    resultsLimit: 100
)
```

## Options / Props

| Member | Type | Description |
|--------|------|-------------|
| `init(recordType:predicate:)` | `convenience init` | Creates a query; `recordType` and `predicate` are immutable after init |
| `recordType` | `CKRecord.RecordType` | The record type to search (read-only after init) |
| `predicate` | `NSPredicate` | Matching criteria (read-only after init) |
| `sortDescriptors` | `[NSSortDescriptor]?` | Ordering for results |

### Supported Predicate Operators

| Category | Operators |
|----------|-----------|
| Comparison | `==`, `!=`, `<`, `<=`, `>`, `>=`, `BETWEEN` |
| Boolean | `TRUEPREDICATE`, `FALSEPREDICATE` |
| Compound | `AND` (`&&`), `NOT` |
| String | `BEGINSWITH` |
| Membership | `IN`, `CONTAINS` |
| Location | `distanceToLocation:fromLocation:` |
| Full-text | `self CONTAINS 'token'` |

## Notes

- Platforms: iOS 8.0+, macOS 10.10+, tvOS 9.0+, watchOS 3.0+, visionOS 1.0+
- Predicates must be format-string based; value or block predicates are not supported
- Keys correspond to record field names or metadata names (e.g., `creationDate`); key paths across references are not supported
- `NOT` cannot be combined with `AND` predicates, tokenized queries, `distanceToLocation:fromLocation:`, or `BETWEEN`
- Location queries use a minimum resolution of 10 km
- Full-text search ignores common stop words (a, an, and, are, as, at, be, …)
- All fields are indexed during development; remove unused indexes before shipping to production
- A `CKQuery` instance can be reused across multiple `CKQueryOperation` instances

## Related

- [CKQueryOperation](./ckqueryoperation.md)
- [CKDatabase](./ckdatabase.md)
- [CKRecord](./ckrecord.md)
