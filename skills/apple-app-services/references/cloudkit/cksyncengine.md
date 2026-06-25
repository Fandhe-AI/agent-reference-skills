# CKSyncEngine

Manages continuous synchronization of local and remote CloudKit records. Handles scheduling, batching, subscriptions, and transient error recovery automatically. Use for private database sync; do not use for the public database.

## Signature / Usage

```swift
// Initialize early in app launch (e.g., in App init or AppDelegate)
let configuration = CKSyncEngine.Configuration(
    database:  CKContainer.default().privateCloudDatabase,
    stateSerialization: savedState,   // restore from disk; nil on first launch
    delegate:  self
)
let engine = CKSyncEngine(configuration)

// Schedule local changes to be sent
engine.state.add(pendingRecordZoneChanges: [
    .saveRecord(record.recordID),
    .deleteRecord(staleID)
])

// Conform to CKSyncEngineDelegate
extension MySync: CKSyncEngineDelegate {

    func handleEvent(_ event: CKSyncEngine.Event, syncEngine: CKSyncEngine) async {
        switch event {
        case .fetchedRecordZoneChanges(let changes):
            for modification in changes.modifications {
                // Apply modification.record to local store
            }
            for deletion in changes.deletions {
                // Remove deletion.recordID from local store
            }
        case .stateUpdate(let update):
            // Persist update.stateSerialization to disk — required
            persist(update.stateSerialization)
        case .accountChange(let change):
            // Handle sign-in / sign-out
            handleAccountChange(change)
        default: break
        }
    }

    func nextRecordZoneChangeBatch(
        _ context: CKSyncEngine.SendChangesContext,
        syncEngine: CKSyncEngine
    ) async -> CKSyncEngine.RecordZoneChangeBatch? {
        let pending = syncEngine.state.pendingRecordZoneChanges
        return await CKSyncEngine.RecordZoneChangeBatch(
            pendingChanges: pending
        ) { recordID in
            localStore[recordID]   // provide current record or nil for deletes
        }
    }
}
```

## Options / Props

| Member | Type | Description |
|--------|------|-------------|
| `init(_:)` | `init(CKSyncEngine.Configuration)` | Creates the sync engine with a database, restored state, and delegate |
| `database` | `CKDatabase` | The database being synced |
| `state` | `CKSyncEngine.State` | Tracks pending changes and internal sync progress |
| `fetchChanges(_:)` | `func` | Immediately fetches pending remote changes |
| `sendChanges(_:)` | `func` | Immediately sends pending local changes |
| `cancelOperations()` | `func` | Cancels in-progress sync operations |

### CKSyncEngine.Event cases

| Event | When dispatched |
|-------|-----------------|
| `.willFetchChanges` | Before a fetch begins |
| `.fetchedDatabaseChanges` | Zone-level additions/deletions received |
| `.fetchedRecordZoneChanges` | Record-level modifications/deletions received |
| `.didFetchChanges` | After a fetch cycle completes |
| `.sentDatabaseChanges` | After zone changes are sent |
| `.sentRecordZoneChanges` | After record changes are sent |
| `.stateUpdate` | Internal state changed — **must persist to disk** |
| `.accountChange` | iCloud account signed in or out |

## Notes

- Platforms: iOS 17.0+, macOS 14.0+, tvOS 17.0+, watchOS 10.0+, visionOS 1.0+
- `CKSyncEngine` is a `final` class; do not subclass
- **Persist state**: the `stateUpdate` event carries an opaque serialization blob; save it on every event and restore it at next launch via `CKSyncEngine.Configuration.stateSerialization`
- The engine requires the **CloudKit** and **Remote Notifications** entitlements
- Batches are capped at 250 records per server request; `RecordZoneChangeBatch.init(pendingChanges:recordProvider:)` manages this automatically
- Only return changes that fall within `context.options.zoneIDs` from `nextRecordZoneChangeBatch`; returning out-of-scope changes causes the send to fail
- Transient errors (`notAuthenticated`, `networkFailure`, `requestRateLimited`, etc.) are retried automatically; application-level errors (e.g., `serverRecordChanged`) must be resolved in your delegate

## Related

- [CKDatabase](./ckdatabase.md)
- [CKRecordZone](./ckrecordzone.md)
- [CKError](./ckerror.md)
- [CKModifyRecordsOperation](./ckmodifyrecordsoperation.md)
