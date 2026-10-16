# NSPersistentCloudKitContainer / NSPersistentCloudKitContainerOptions

A container that encapsulates the Core Data stack in your app, and mirrors select persistent stores to a CloudKit private database. `NSPersistentCloudKitContainerOptions` customizes how a store description aligns with a CloudKit database.

## Signature / Usage

```swift
class NSPersistentCloudKitContainer   // subclass of NSPersistentContainer

class NSPersistentCloudKitContainerOptions {
    var containerIdentifier: String
    var databaseScope: CKDatabase.Scope
    init(containerIdentifier: String)
}

// Creates the CloudKit schema for all stores in the container that manage a CloudKit database.
func initializeCloudKitSchema(options: NSPersistentCloudKitContainerSchemaInitializationOptions = []) throws
```

## Options / Props

`NSPersistentCloudKitContainer` members (signatures from the source topic list):

| Name | Signature | Description |
|------|-----------|-------------|
| `initializeCloudKitSchema(options:)` | `func initializeCloudKitSchema(options: NSPersistentCloudKitContainerSchemaInitializationOptions) throws` | Creates the CloudKit schema for all stores in the container that manage a CloudKit database. |
| `canDeleteRecord(forManagedObjectWith:)` | `func canDeleteRecord(forManagedObjectWith: NSManagedObjectID) -> Bool` | Whether the user can delete the managed object's underlying CloudKit record. |
| `canUpdateRecord(forManagedObjectWith:)` | `func canUpdateRecord(forManagedObjectWith: NSManagedObjectID) -> Bool` | Whether the user can modify the managed object's underlying CloudKit record. |
| `canModifyManagedObjects(in:)` | `func canModifyManagedObjects(in: NSPersistentStore) -> Bool` | Whether the user can modify the specified persistent store. |
| `eventChangedNotification` | `class let eventChangedNotification: NSNotification.Name` (`NSPersistentCloudKitContainerEventChangedNotification`) | Notification with details about an event in a persistent CloudKit container. Posted on the CloudKit private serial queue. |
| `eventNotificationUserInfoKey` | `class let eventNotificationUserInfoKey: String` (`NSPersistentCloudKitContainerEventUserInfoKey`) | The user info dictionary key for the container event. |

Other members listed (Objective-C selector names as given in the source): `acceptShareInvitationsFromMetadata:intoPersistentStore:completion:`, `fetchParticipantsMatchingLookupInfos:intoPersistentStore:completion:`, `fetchSharesInPersistentStore:error:`, `fetchSharesMatchingObjectIDs:error:`, `persistUpdatedShare:inPersistentStore:completion:`, `purgeObjectsAndRecordsInZoneWithID:inPersistentStore:completion:`, `recordForManagedObjectID:`, `recordIDForManagedObjectID:`, `recordIDsForManagedObjectIDs:`, `recordsForManagedObjectIDs:`, `shareManagedObjects:toShare:completion:`.

`NSPersistentCloudKitContainerOptions`:

| Name | Type | Description |
|------|------|-------------|
| `containerIdentifier` | `String` | The identifier of the CloudKit container associated with a given store description. |
| `databaseScope` | `CKDatabase.Scope` | The database scope (public, private, or shared) to use for a specified store. |
| `init(containerIdentifier:)` | `String` | Initializes container options using the given CloudKit container identifier. |

`NSPersistentCloudKitContainerSchemaInitializationOptions` (struct):

| Name | Description |
|------|-------------|
| `[]` / `NSPersistentCloudKitContainerSchemaInitializationOptionsNone` | No specified schema options. |
| `dryRun` | The container validates the model and generates the records, but doesn't upload them to CloudKit. |
| `printSchema` | Prints the generated records to the console. |
| `init(rawValue: UInt)` | Creates the options using the specified raw value. |

Event types:

| Name | Description |
|------|-------------|
| `NSPersistentCloudKitContainer.Event` | Represents activity in a persistent CloudKit container. Properties: `identifier: UUID`, `storeIdentifier: String`, `type: EventType`, `startDate: Date`, `endDate: Date?`, `succeeded: Bool`, `error: (any Error)?`. |
| `NSPersistentCloudKitContainer.EventType` | Enum with `setup` (setting up a store), `import` (importing records into a store; written with backticks in Swift), `export` (exporting managed objects from a store). |
| `NSPersistentCloudKitContainerEventRequest` | Request to fetch setup, import, or export events. Class methods: `fetchEvents(after: NSPersistentCloudKitContainer.Event?) -> Self`, `fetchEvents(after: Date) -> Self`, `fetchEvents(matchingFetch: NSFetchRequest<any NSFetchRequestResult>) -> Self`, `fetchForEvents() -> NSFetchRequest<any NSFetchRequestResult>`; property `resultType: NSPersistentCloudKitContainerEventResult.ResultType`. |
| `NSPersistentCloudKitContainerEventResult` | The result of a request to fetch persistent CloudKit container events. |

## Notes

- Availability (from the source JSON): `NSPersistentCloudKitContainer`, `NSPersistentCloudKitContainerOptions`, `initializeCloudKitSchema(options:)`: iOS 13.0+, iPadOS 13.0+, Mac Catalyst 13.1+, macOS 10.15+, tvOS 13.0+, visionOS 1.0+, watchOS 6.0+.
- `Event`, `EventType`, `NSPersistentCloudKitContainerEventRequest`, `eventChangedNotification`: iOS 14.0+, iPadOS 14.0+, Mac Catalyst 14.0+, macOS 11.0+, tvOS 14.0+, visionOS 1.0+, watchOS 7.0+.
- `NSPersistentCloudKitContainerSchemaInitializationOptions` has no `introducedAt` values in the source JSON (platforms listed without versions).
- It is a subclass of `NSPersistentContainer` capable of managing both CloudKit-backed and noncloud stores. By default it contains a single store description, which Core Data assigns to the first CloudKit container identifier in an app's entitlements. Use `NSPersistentCloudKitContainerOptions` to customize this behavior or create additional store descriptions backed by different containers.
- Eligibility (from "Mirroring a Core Data store with CloudKit"): the persistent store must be an `NSSQLiteStoreType` store, and the data model must be compatible with CloudKit limitations. CloudKit does not support unique constraints, undefined attributes, or required relationships.
- Core Data with CloudKit cannot use existing CloudKit containers: Core Data owns the CloudKit schema created from the Core Data model. If the app already uses CloudKit, add Core Data with CloudKit by synchronizing a store with a new container.
- Development needs an Apple Developer Program account and an iCloud account. Core Data uses a specific record zone in the CloudKit private database, accessible only to the current user. Apps can be tested in Simulator or on multiple physical devices logged into the same iCloud account.
- `initializeCloudKitSchema(options:)` creates representative `CKRecord` instances for all CloudKit-using stores and uploads them. After a successful upload the schema is visible in the CloudKit Dashboard and the container deletes the representative records. It also validates the managed object model for CloudKit, so a validation error may be returned.

## Related

- [NSPersistentContainer](./nspersistentcontainer.md)
- [NSPersistentStoreDescription](./nspersistentstoredescription.md)
- [NSManagedObjectModel](./nsmanagedobjectmodel.md)
- [Persistent history](./persistent-history.md)
