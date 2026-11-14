# SwiftDataError / DataStoreError

`SwiftDataError` is a type that describes a SwiftData error. `DataStoreError` is a type that describes a data store error.

## Signature / Usage

```swift
struct SwiftDataError

enum DataStoreError
```

Both conform to `Equatable`, `Error`, `Hashable`, `Sendable`, `SendableMetatype`.

## Options / Props

SwiftDataError (static members, each `static let X: SwiftDataError`)

| Group | Member | Description |
|-------|--------|-------------|
| Fetch errors | `includePendingChangesWithBatchSize` | No description in the official page |
| Fetch errors | `sortingPendingChangesWithIdentifiers` | No description in the official page |
| Fetch errors | `unsupportedKeyPath` | No description in the official page |
| Fetch errors | `unsupportedPredicate` | No description in the official page |
| Fetch errors | `unsupportedSortDescriptor` | No description in the official page |
| Fetch errors | `historyTokenExpired` | No description in the official page |
| Fetch errors | `invalidTransactionFetchRequest` | No description in the official page |
| Configuration errors | `configurationFileNameContainsInvalidCharacters` | No description in the official page |
| Configuration errors | `configurationFileNameTooLong` | No description in the official page |
| Configuration errors | `configurationSchemaNotFoundInContainerSchema` | No description in the official page |
| Configuration errors | `duplicateConfiguration` | No description in the official page |
| Container errors | `loadIssueModelContainer` | No description in the official page |
| Context errors | `modelValidationFailure` | No description in the official page |
| Context errors | `missingModelContext` | No description in the official page |
| Migration errors | `backwardMigration` | No description in the official page |
| Migration errors | `unknownSchema` | No description in the official page |
| Schema errors | `unknownDataStoreSchema` | An error that indicates the data store's schema is not recognized |
| Operators | `static func ~= (SwiftDataError, any Error) -> Bool` | Pattern-match operator |

DataStoreError (cases, "Getting error codes")

| Case | Description |
|------|-------------|
| `invalidPredicate` | No description in the official page |
| `preferInMemoryFilter` | No description in the official page |
| `preferInMemorySort` | No description in the official page |
| `unsupportedFeature` | No description in the official page |

## Notes

- SwiftDataError: iOS 17.0+, iPadOS 17.0+, Mac Catalyst 17.0+, macOS 14.0+, tvOS 17.0+, visionOS 1.0+, watchOS 10.0+, Swift 5.9+
- DataStoreError: iOS 18.0+, iPadOS 18.0+, Mac Catalyst 18.0+, macOS 15.0+, tvOS 18.0+, visionOS 2.0+, watchOS 10.0+ (as listed verbatim in the official page metadata), Swift 5.9+
- The official pages list the members above without per-member discussion; semantics beyond the names are not documented there
- `DataStoreError` is the error type for custom `DataStore` implementations
- Source: https://developer.apple.com/documentation/swiftdata/swiftdataerror , https://developer.apple.com/documentation/swiftdata/datastoreerror (fetched 2026-10-16, iOS 27 SDK docs)

### iOS 27.0: `unknownDataStoreSchema`

- Thrown when a `ModelContainer` loads a data store whose schema matches neither the current schema nor any schema in the provided migration plan. The official page suggests adding the missing schema version to the `SchemaMigrationPlan`, providing a custom migration stage, or deciding whether to recreate the store
- Only thrown by processes linked on or after iOS 27 / macOS 27; on earlier versions `loadIssueModelContainer` is thrown instead
- Source: https://developer.apple.com/documentation/swiftdata/swiftdataerror/unknowndatastoreschema (fetched 2026-11-14, DocC JSON of the iOS & iPadOS 27.3 beta SDK)

## Related

- [DataStore / DataStoreBatching](./data-store-protocol.md)
- [DefaultStore](./default-store.md)
- [ModelContainer](./model-container.md)
- [SchemaMigrationPlan](./schema-migration-plan.md)
