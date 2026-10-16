# Persistent history (NSPersistentHistoryChangeRequest / Token / Transaction / Change / Result)

Use persistent history tracking to determine what changes have occurred in the store since history tracking was enabled, and to update a view context only as needed.

## Signature / Usage

```swift
// Pass the data model filename to the container’s initializer.
let container = PersistentContainer(name: "DataModel")

// Get the persistent store description.
let description = container.persistentStoreDescriptions.first

// Set the persistent history tracking key option.
description?.setOption(true as NSNumber, forKey: NSPersistentHistoryTrackingKey)

// Listen for remote change notifications.
description?.setOption(true as NSNumber, forKey: NSPersistentStoreRemoteChangeNotificationPostOptionKey)

// Fetch history since the last token, then purge old history.
let fetchHistoryRequest = NSPersistentHistoryChangeRequest.fetchHistory(after: lastToken)
let purgeHistoryRequest = NSPersistentHistoryChangeRequest.deleteHistory(before: sevenDaysAgo)
```

Merge relevant transactions into the view context (from the source article):

```swift
if filteredTransactions.isEmpty == false {
    // Iterate over filtered transactions and merge the changes in the
    // object ID notification that you specify.
    for transaction in filteredTransactions {
        await persistentContainer.viewContext.perform {
            self.persistentContainer.viewContext.mergeChanges(
                fromContextDidSave: transaction.objectIDNotification()
            )
        }
    }
}
```

## Options / Props

`NSPersistentHistoryChangeRequest` (class methods return `Self`):

| Name | Signature | Description |
|------|-----------|-------------|
| `fetchHistory(after:)` | `(NSPersistentHistoryToken?)` / `(NSPersistentHistoryTransaction?)` / `(Date)` | Retrieves history after a given token, transaction, or date. |
| `fetchHistory(withFetch:)` | `(NSFetchRequest<any NSFetchRequestResult>)` | Retrieves history based on a fetch request. |
| `deleteHistory(before:)` | `(NSPersistentHistoryToken?)` / `(NSPersistentHistoryTransaction?)` / `(Date)` | Purges history older than a given token, transaction, or date. |
| `fetchRequest` | `NSFetchRequest<any NSFetchRequestResult>?` | The specified fetch request, when retrieving history. |
| `resultType` | `NSPersistentHistoryResultType` | The type of result that the request returns. |
| `token` | `NSPersistentHistoryToken?` | The specified token, when retrieving history defined by a token. |

`NSPersistentHistoryTransaction` (a set of changes based on a context save or batch operation):

| Name | Type | Description |
|------|------|-------------|
| `author` | `String?` | A granular description of the context that made the change, if available. |
| `bundleID` | `String` | The originating bundle's identifier. |
| `changes` | `[NSPersistentHistoryChange]?` | The array of persistent history changes. |
| `contextName` | `String?` | The originating context's name. |
| `processID` | `String` | The originating process's identifier. |
| `storeID` | `String` | The originating store's identifier. |
| `timestamp` | `Date` | The date of the persistent history change. |
| `token` | `NSPersistentHistoryToken` | The token that represents this transaction in the persistent history. |
| `transactionNumber` | `Int64` | The transaction's numeric identifier. |
| `objectIDNotification()` | `() -> Notification` | Obtains a notification for use in merging the transaction's changes into a managed object context. |
| `entityDescription(with:)` | `class func (NSManagedObjectContext) -> NSEntityDescription?` | Entity description for the managed object type affected by the transaction. |

`NSPersistentHistoryChange` (insertion, update, or deletion of a managed object):

| Name | Type | Description |
|------|------|-------------|
| `changeID` | `Int64` | The change's numeric identifier. |
| `changeType` | `NSPersistentHistoryChangeType` | The type of change to the managed object. |
| `changedObjectID` | `NSManagedObjectID` | The identifier of the managed object that changed. |
| `tombstone` | `[AnyHashable : Any]?` | Attributes marked for preservation after deletion, and their values when deleted. |
| `transaction` | `NSPersistentHistoryTransaction?` | The transaction containing this change. |
| `updatedProperties` | `Set<NSPropertyDescription>?` | The set of properties that were updated. |

`NSPersistentHistoryToken` is a bookmark for the most recent history processed (`init?(coder: NSCoder)`; conforms to `NSCoding`, `NSCopying`, `NSSecureCoding`). `NSPersistentHistoryResult` has `result: Any?` and `resultType: NSPersistentHistoryResultType`; it inherits from `NSPersistentStoreResult`.

## Notes

- Availability (source JSON, all five types): iOS 11.0+, iPadOS 11.0+, Mac Catalyst 13.1+, macOS 10.13+, tvOS 11.0+, visionOS 1.0+, watchOS 4.0+.
- Persistent history keeps track of every transaction on the store. It solves the case where a batch operation save does not generate a context-save notification, and the case where a background context saves changes that do not affect the current view.
- Each history transaction automatically includes the originating context name, process, and bundle. Give each context a unique `name` (it becomes the transaction's `contextName`), and optionally set `transactionAuthor` before a save (it becomes the transaction's `author`). Reset `transactionAuthor` to `nil` after saving to prevent misattribution of future transactions.
- Save the `NSPersistentHistoryToken` to disk to track history across app launches.
- Execute history fetch requests on a background context to avoid blocking the main thread.
- To access attributes of deleted objects, select "Preserve After Deletion" on the attribute in the data model editor; deleted changes then carry those values in `tombstone`.
- History transactions take space on disk; define a cleanup strategy with `deleteHistory(before:)` and make sure your app and its clients have consumed the history first. Fetching purged history throws an expired token error.
- The original article (Consuming relevant store changes) filters transactions for entities relevant to the current view (the example uses `ShoppingItem`) and merges only those.

## Related

- [NSPersistentContainer](./nspersistentcontainer.md)
- [NSPersistentStoreDescription](./nspersistentstoredescription.md)
- [NSManagedObjectContext](./nsmanagedobjectcontext.md)
- [NSBatchInsertRequest](./nsbatchinsertrequest.md)
- [NSPersistentCloudKitContainer](./nspersistentcloudkitcontainer.md)
